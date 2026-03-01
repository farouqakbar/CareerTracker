// ============================================================
// profilePage.js — Profile page handler
// Upload photo → Supabase Storage 'avatars' bucket
// Save display_name + profile_photo → users table
// ============================================================

document.addEventListener("DOMContentLoaded", async () => {
  const db       = window.supabaseClient;
  const username = localStorage.getItem("currentUser");
  if (!username || !db) return;

  const BUCKET   = "avatars";
  const MAX_SIZE = 2 * 1024 * 1024; // 2 MB

  const usernameDisplay  = document.getElementById("usernameDisplay");
  const displayNameInput = document.getElementById("displayNameInput");
  const photoInput       = document.getElementById("photoInput");
  const photoPreview     = document.getElementById("profilePhotoPreview");
  const defaultAvatar    = document.getElementById("defaultAvatar");
  const uploadPhotoBtn   = document.getElementById("uploadPhotoBtn");
  const removePhotoBtn   = document.getElementById("removePhotoBtn");
  const saveBtn          = document.getElementById("saveProfileBtn");
  const cancelBtn        = document.getElementById("cancelProfileBtn");
  const avatarName       = document.getElementById("avatarDisplayName");
  const avatarUser       = document.getElementById("avatarUsername");

  let currentPhotoUrl  = "";
  let pendingPhotoFile = null;

  function tr(k) { return (typeof t === "function") ? t(k) : k; }

  // ── Render photo ──────────────────────────────────────────
  function renderPhoto(url) {
    if (url) {
      const src = url + (url.includes("?") ? "&" : "?") + "cb=" + Date.now();
      if (photoPreview) { photoPreview.src = src; photoPreview.style.display = "block"; }
      if (defaultAvatar) defaultAvatar.style.display = "none";
    } else {
      if (photoPreview) { photoPreview.src = ""; photoPreview.style.display = "none"; }
      if (defaultAvatar) defaultAvatar.style.display = "block";
    }
  }

  // ── Update topbar avatar ──────────────────────────────────
  function updateTopbar(url) {
    const avatarEl = document.getElementById("topbarAvatar");
    if (!avatarEl) return;
    if (url) {
      const src = url + (url.includes("?") ? "&" : "?") + "cb=" + Date.now();
      avatarEl.innerHTML = '<img src="' + src + '" alt="Avatar" style="width:100%;height:100%;object-fit:cover;border-radius:50%;display:block;" onerror="this.parentElement.innerHTML=\'\';" />';
    } else {
      avatarEl.innerHTML = "";
    }
  }

  // ── Load user data ────────────────────────────────────────
  async function loadUserData() {
    const { data, error } = await db
      .from("users")
      .select("username, display_name, profile_photo")
      .eq("username", username)
      .single();

    if (error || !data) { console.error("loadUserData:", error?.message); return; }

    if (usernameDisplay)  usernameDisplay.value  = data.username    || username;
    if (displayNameInput) displayNameInput.value = data.display_name || username;
    if (avatarName)       avatarName.textContent  = data.display_name || username;
    if (avatarUser)       avatarUser.textContent  = "@" + (data.username || username);

    currentPhotoUrl = data.profile_photo || "";
    renderPhoto(currentPhotoUrl);
    updateTopbar(currentPhotoUrl);
    localStorage.setItem("displayName",  data.display_name || username);
    localStorage.setItem("profilePhoto", currentPhotoUrl);
  }

  // ── Photo selection ───────────────────────────────────────
  if (uploadPhotoBtn) uploadPhotoBtn.addEventListener("click", () => photoInput?.click());

  if (photoInput) {
    photoInput.addEventListener("change", () => {
      const file = photoInput.files?.[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        showAlert(tr("alert_photo_image")); photoInput.value = ""; return;
      }
      if (file.size > MAX_SIZE) {
        showAlert(tr("alert_photo_large")); photoInput.value = ""; return;
      }
      pendingPhotoFile = file;
      const reader = new FileReader();
      reader.onload = e => renderPhoto(e.target.result);
      reader.readAsDataURL(file);
    });
  }

  // ── Remove photo ──────────────────────────────────────────
  if (removePhotoBtn) {
    removePhotoBtn.addEventListener("click", () => {
      pendingPhotoFile = null; currentPhotoUrl = "";
      if (photoInput) photoInput.value = "";
      renderPhoto(""); updateTopbar("");
    });
  }

  // ── Cancel ────────────────────────────────────────────────
  if (cancelBtn) cancelBtn.addEventListener("click", () => { pendingPhotoFile = null; loadUserData(); });

  // ── Sync avatar name on input ─────────────────────────────
  if (displayNameInput && avatarName) {
    displayNameInput.addEventListener("input", () => { avatarName.textContent = displayNameInput.value || "—"; });
  }

  // ── Save ─────────────────────────────────────────────────
  if (saveBtn) {
    saveBtn.addEventListener("click", async () => {
      const newName = (displayNameInput?.value || "").trim();
      if (!newName) { showAlert(tr("alert_display_empty")); return; }

      saveBtn.disabled    = true;
      saveBtn.textContent = tr("loading") || "Saving...";

      try {
        let photoUrl = currentPhotoUrl;

        if (pendingPhotoFile) {
          const ext  = pendingPhotoFile.name.split(".").pop().toLowerCase();
          const path = username + "/avatar." + ext;
          const { error: upErr } = await db.storage.from(BUCKET).upload(path, pendingPhotoFile, {
            upsert: true, contentType: pendingPhotoFile.type,
          });
          if (upErr) {
            showAlert("Upload failed: " + upErr.message + "\n\nMake sure bucket 'avatars' exists and is public.");
            saveBtn.disabled = false; saveBtn.textContent = tr("profile_save"); return;
          }
          const { data: urlD } = db.storage.from(BUCKET).getPublicUrl(path);
          photoUrl = urlD?.publicUrl || "";
        } else if (!currentPhotoUrl) {
          photoUrl = "";
        }

        const { error: updErr } = await db.from("users")
          .update({ display_name: newName, profile_photo: photoUrl })
          .eq("username", username);

        if (updErr) {
          showAlert("Save failed: " + updErr.message);
          saveBtn.disabled = false; saveBtn.textContent = tr("profile_save"); return;
        }

        currentPhotoUrl  = photoUrl;
        pendingPhotoFile = null;
        if (photoInput) photoInput.value = "";
        localStorage.setItem("displayName",  newName);
        localStorage.setItem("profilePhoto", photoUrl);

        const nameEl = document.getElementById("topbarDisplayName");
        if (nameEl) nameEl.textContent = newName;
        if (avatarName) avatarName.textContent = newName;
        renderPhoto(photoUrl);
        updateTopbar(photoUrl);

        showAlert(tr("alert_saved"));
      } catch (e) {
        console.error("saveProfile:", e);
        showAlert(tr("error_generic"));
      }

      saveBtn.disabled    = false;
      saveBtn.textContent = tr("profile_save") || "Save Changes";
    });
  }

  await loadUserData();
});

// ============================================================
// profilePage.js — v2
// FIX: query users by id (UUID) not email-as-username
// FIX: changePassword / deleteAccount signatures updated
// FIX: UI label "Username" → "Email"
// ============================================================

document.addEventListener("DOMContentLoaded", async () => {
  const db = window.supabaseClient;
  const userId = localStorage.getItem("currentUserId");
  const email = localStorage.getItem("currentUserEmail");
  if (!userId || !db) return;

  const BUCKET = "avatars";
  const MAX_SIZE = 2 * 1024 * 1024; // 2 MB

  // DOM refs
  const emailDisplay = document.getElementById("usernameDisplay") || document.getElementById("emailDisplay"); // was usernameDisplay
  const displayNameInput = document.getElementById("displayNameInput");
  const photoInput = document.getElementById("photoInput");
  const photoPreview = document.getElementById("profilePhotoPreview");
  const defaultAvatar = document.getElementById("defaultAvatar");
  const uploadPhotoBtn = document.getElementById("uploadPhotoBtn");
  const removePhotoBtn = document.getElementById("removePhotoBtn");
  const saveBtn = document.getElementById("saveProfileBtn");
  const cancelBtn = document.getElementById("cancelProfileBtn");
  const avatarName = document.getElementById("avatarDisplayName");
  const avatarUser = document.getElementById("avatarUsername");

  // FIX: rename DOM element id in your HTML from "usernameDisplay" → "emailDisplay"
  // and change its label from "Username" to "Email"

  let currentPhotoUrl = "";
  let pendingPhotoFile = null;

  function tr(k) {
    return typeof t === "function" ? t(k) : k;
  }

  // ── Render photo ──────────────────────────────────────────
  function renderPhoto(url) {
    // Validate that required DOM elements exist
    if (!photoPreview && !defaultAvatar) {
      console.warn("[profilePage] Photo preview elements not found in DOM");
      return;
    }

    if (url) {
      const src = url + (url.includes("?") ? "&" : "?") + "cb=" + Date.now();
      if (photoPreview) {
        photoPreview.src = src;
        photoPreview.style.display = "block";
      }
      if (defaultAvatar) defaultAvatar.style.display = "none";
    } else {
      if (photoPreview) {
        photoPreview.src = "";
        photoPreview.style.display = "none";
      }
      if (defaultAvatar) defaultAvatar.style.display = "block";
    }
  }

  // ── Update topbar avatar (consistent: always <img>) ───────
  function updateTopbar(url) {
    const avatarEl = document.getElementById("topbarAvatar");
    if (!avatarEl) return;
    if (url) {
      const src = url + (url.includes("?") ? "&" : "?") + "cb=" + Date.now();
      const img = document.createElement("img");
      img.src = src;
      img.alt = "Avatar";
      img.style.cssText =
        "width:100%;height:100%;object-fit:cover;border-radius:50%;display:block;";
      img.onerror = () => {
        avatarEl.innerHTML = "";
      };
      avatarEl.innerHTML = "";
      avatarEl.appendChild(img);
    } else {
      avatarEl.innerHTML = "";
    }
  }

  // ── Load user data ────────────────────────────────────────
  // FIX: query by id (UUID), not by email treated as username
  async function loadUserData() {
    const { data, error } = await db
      .from("users")
      .select("id, email, display_name, profile_photo")
      .eq("id", userId)
      .single();

    if (error || !data) {
      console.error("loadUserData:", error?.message);
      return;
    }

    // FIX: show email in the read-only email field, not "username"
    if (emailDisplay) emailDisplay.value = data.email || email;
    if (displayNameInput) displayNameInput.value = data.display_name || email;
    if (avatarName) avatarName.textContent = data.display_name || email;
    if (avatarUser) avatarUser.textContent = data.email || email;

    currentPhotoUrl = data.profile_photo || "";
    renderPhoto(currentPhotoUrl);
    updateTopbar(currentPhotoUrl);
    localStorage.setItem("displayName", data.display_name || email);
    localStorage.setItem("profilePhoto", currentPhotoUrl);
  }

  // ── Photo selection ───────────────────────────────────────
  if (uploadPhotoBtn)
    uploadPhotoBtn.addEventListener("click", () => photoInput?.click());

  if (photoInput) {
    photoInput.addEventListener("change", () => {
      const file = photoInput.files?.[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        showAlert(tr("alert_photo_image"));
        photoInput.value = "";
        return;
      }
      if (file.size > MAX_SIZE) {
        showAlert(tr("alert_photo_large"));
        photoInput.value = "";
        return;
      }
      pendingPhotoFile = file;
      const reader = new FileReader();
      reader.onload = (e) => renderPhoto(e.target.result);
      reader.readAsDataURL(file);
    });
  }

  // ── Remove photo ──────────────────────────────────────────
  if (removePhotoBtn) {
    removePhotoBtn.addEventListener("click", () => {
      pendingPhotoFile = null;
      currentPhotoUrl = "";
      if (photoInput) photoInput.value = "";
      renderPhoto("");
      updateTopbar("");
    });
  }

  // ── Cancel ────────────────────────────────────────────────
  if (cancelBtn)
    cancelBtn.addEventListener("click", () => {
      pendingPhotoFile = null;
      loadUserData();
    });

  // ── Sync avatar name on input ─────────────────────────────
  if (displayNameInput && avatarName) {
    displayNameInput.addEventListener("input", () => {
      avatarName.textContent = displayNameInput.value || "—";
    });
  }

  // ── Save profile ──────────────────────────────────────────
  // FIX: update by id, not by email-as-username
  let saveInProgress = false; // Prevent concurrent save operations

  if (saveBtn) {
    saveBtn.addEventListener("click", async () => {
      if (saveInProgress) return; // Prevent concurrent saves

      const newName = (displayNameInput?.value || "").trim();
      if (!newName) {
        showAlert(tr("alert_display_empty"));
        return;
      }

      saveInProgress = true;
      saveBtn.disabled = true;
      saveBtn.textContent = tr("loading") || "Saving...";

      try {
        let photoUrl = currentPhotoUrl;

        if (pendingPhotoFile) {
          const ext = pendingPhotoFile.name.split(".").pop().toLowerCase();
          const path = userId + "/avatar." + ext;
          const { error: upErr } = await db.storage
            .from(BUCKET)
            .upload(path, pendingPhotoFile, {
              upsert: true,
              contentType: pendingPhotoFile.type,
            });
          if (upErr) {
            showAlert(
              "Upload failed: " +
                upErr.message +
                "\n\nMake sure bucket 'avatars' exists and is public.",
            );
            saveBtn.disabled = false;
            saveBtn.textContent = tr("profile_save");
            saveInProgress = false;
            return;
          }
          const { data: urlD } = db.storage.from(BUCKET).getPublicUrl(path);
          photoUrl = urlD?.publicUrl || "";
        } else if (!currentPhotoUrl) {
          photoUrl = "";
        }

        // FIX: filter by id
        const { error: updErr } = await db
          .from("users")
          .update({ display_name: newName, profile_photo: photoUrl })
          .eq("id", userId);

        if (updErr) {
          showAlert("Save failed: " + updErr.message);
          saveBtn.disabled = false;
          saveBtn.textContent = tr("profile_save");
          saveInProgress = false;
          return;
        }

        currentPhotoUrl = photoUrl;
        pendingPhotoFile = null;
        if (photoInput) photoInput.value = "";
        localStorage.setItem("displayName", newName);
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
      } finally {
        saveInProgress = false;
        saveBtn.disabled = false;
        saveBtn.textContent = tr("profile_save") || "Save Changes";
      }
    });
  }

  await loadUserData();
});

// ── Change Password ───────────────────────────────────────
// Tidak tersedia untuk akun Google (OAuth-only).
// Password dikelola oleh Google, bukan aplikasi ini.
document.addEventListener("DOMContentLoaded", () => {
  const changeBtn = document.getElementById("changePasswordBtn");
  const passwordSection = document.getElementById("changePasswordSection") || document.getElementById("changePasswordCard");

  // Sembunyikan seluruh section ganti password jika ada
  if (passwordSection) passwordSection.style.display = "none";

  // Jika tombol masih ada di HTML (tanpa section wrapper), nonaktifkan dengan pesan
  if (changeBtn && !passwordSection) {
    changeBtn.disabled = true;
    changeBtn.title = "Password dikelola oleh Google";
    changeBtn.textContent = "🔒 Password dikelola Google";
  }
});

// ── Delete Account ───────────────────────────────────────
// FIX: no username arg — auth.deleteAccount() uses session internally
document.addEventListener("DOMContentLoaded", () => {
  const deleteBtn = document.getElementById("deleteAccountBtn");
  if (!deleteBtn) return;

  deleteBtn.addEventListener("click", async () => {
    const confirmed = await showConfirm(
      "Are you sure? This will permanently delete your account and ALL your data. This cannot be undone.",
    );
    if (!confirmed) return;

    deleteBtn.disabled = true;
    deleteBtn.textContent = "Deleting...";

    // FIX: no argument — reads userId from localStorage internally
    const result = await window.auth.deleteAccount();

    if (result.success) {
      localStorage.clear();
      window.location.href = "login.html";
    } else {
      showAlert("Failed to delete account: " + result.error);
      deleteBtn.disabled = false;
      deleteBtn.textContent = "🗑️ Delete Account";
    }
  });
});

// ============================================================
// profilePage.js
// Halaman profile.html:
//   - Load data user (username, display_name, profile_photo)
//   - Simpan display_name ke tabel 'users' di Supabase
//   - Upload foto profil ke Supabase Storage bucket 'avatars' (maks 500 KB)
//   - Simpan URL foto ke users.profile_photo + localStorage
// ============================================================

document.addEventListener("DOMContentLoaded", async () => {
  const db = window.supabaseClient;
  const username = localStorage.getItem("currentUser");
  if (!username || !db) return;

  // ── Elemen DOM ──────────────────────────────────────────────
  const usernameDisplay   = document.getElementById("usernameDisplay");
  const displayNameInput  = document.getElementById("displayNameInput");
  const photoInput        = document.getElementById("photoInput");
  const photoPreview      = document.getElementById("profilePhotoPreview");
  const defaultAvatar     = document.getElementById("defaultAvatar");
  const uploadPhotoBtn    = document.getElementById("uploadPhotoBtn");
  const removePhotoBtn    = document.getElementById("removePhotoBtn");
  const saveBtn           = document.getElementById("saveProfileBtn");
  const cancelBtn         = document.getElementById("cancelProfileBtn");

  let currentPhotoUrl = "";  // URL foto yang sedang aktif
  let pendingPhotoFile = null; // File baru yang belum diupload

  // ── Load data user dari Supabase ────────────────────────────
  async function loadUserData() {
    const { data, error } = await db
      .from("users")
      .select("username, display_name, profile_photo")
      .eq("username", username)
      .single();

    if (error || !data) {
      console.error("loadUserData:", error);
      return;
    }

    if (usernameDisplay) usernameDisplay.value = data.username || username;
    if (displayNameInput) displayNameInput.value = data.display_name || username;

    currentPhotoUrl = data.profile_photo || "";
    renderPhoto(currentPhotoUrl);
  }

  // ── Tampilkan foto atau avatar default ──────────────────────
  function renderPhoto(url) {
    if (url) {
      photoPreview.src = url;
      photoPreview.style.display = "block";
      if (defaultAvatar) defaultAvatar.style.display = "none";
    } else {
      photoPreview.style.display = "none";
      if (defaultAvatar) defaultAvatar.style.display = "block";
    }
  }

  // ── Pilih foto baru (preview lokal dulu) ────────────────────
  if (uploadPhotoBtn) {
    uploadPhotoBtn.addEventListener("click", () => photoInput && photoInput.click());
  }

  if (photoInput) {
    photoInput.addEventListener("change", () => {
      const file = photoInput.files[0];
      if (!file) return;

      // Validasi ukuran maks 500 KB
      if (file.size > 500 * 1024) {
        showAlert("Foto terlalu besar. Maksimum ukuran foto adalah 500 KB.");
        photoInput.value = "";
        return;
      }
      // Validasi tipe
      if (!file.type.startsWith("image/")) {
        showAlert("File harus berupa gambar (JPG, PNG, dll).");
        photoInput.value = "";
        return;
      }

      pendingPhotoFile = file;
      // Preview lokal sebelum disimpan
      const reader = new FileReader();
      reader.onload = (e) => renderPhoto(e.target.result);
      reader.readAsDataURL(file);
    });
  }

  // ── Hapus foto ──────────────────────────────────────────────
  if (removePhotoBtn) {
    removePhotoBtn.addEventListener("click", () => {
      pendingPhotoFile = null;
      currentPhotoUrl = "";
      renderPhoto("");
      if (photoInput) photoInput.value = "";
    });
  }

  // ── Cancel: reset ke data awal ──────────────────────────────
  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      pendingPhotoFile = null;
      loadUserData();
    });
  }

  // ── Simpan perubahan ────────────────────────────────────────
  if (saveBtn) {
    saveBtn.addEventListener("click", async () => {
      const newDisplayName = (displayNameInput?.value || "").trim();
      if (!newDisplayName) {
        showAlert("Display name tidak boleh kosong.");
        return;
      }

      saveBtn.disabled = true;
      saveBtn.textContent = "Menyimpan...";

      try {
        let photoUrl = currentPhotoUrl;

        // 1. Upload foto baru jika ada
        if (pendingPhotoFile) {
          const ext = pendingPhotoFile.name.split(".").pop().toLowerCase();
          const filePath = `${username}/avatar.${ext}`;

          const { error: uploadError } = await db.storage
            .from("avatars")
            .upload(filePath, pendingPhotoFile, { upsert: true });

          if (uploadError) {
            console.error("Upload foto:", uploadError);
            showAlert("Gagal upload foto. Pastikan bucket 'avatars' sudah dibuat di Supabase Storage.");
            saveBtn.disabled = false;
            saveBtn.textContent = "Save Changes";
            return;
          }

          // Ambil public URL
          const { data: urlData } = db.storage
            .from("avatars")
            .getPublicUrl(filePath);
          photoUrl = urlData?.publicUrl || "";
        } else if (!currentPhotoUrl && !pendingPhotoFile) {
          // Foto dihapus → kosongkan
          photoUrl = "";
        }

        // 2. Update tabel users
        const { error: updateError } = await db
          .from("users")
          .update({
            display_name: newDisplayName,
            profile_photo: photoUrl,
          })
          .eq("username", username);

        if (updateError) {
          console.error("Update user:", updateError);
          showAlert("Gagal menyimpan perubahan: " + updateError.message);
          saveBtn.disabled = false;
          saveBtn.textContent = "Save Changes";
          return;
        }

        // 3. Perbarui localStorage agar topbar ikut update
        localStorage.setItem("displayName", newDisplayName);
        localStorage.setItem("profilePhoto", photoUrl);

        // 4. Update topbar langsung
        const nameEl = document.getElementById("topbarDisplayName");
        if (nameEl) nameEl.textContent = newDisplayName;
        const avatarEl = document.getElementById("topbarAvatar");
        if (avatarEl && photoUrl) {
          avatarEl.style.backgroundImage = "url(" + photoUrl + ")";
          avatarEl.style.backgroundSize = "cover";
          avatarEl.style.backgroundPosition = "center";
        } else if (avatarEl) {
          avatarEl.style.backgroundImage = "";
        }

        currentPhotoUrl = photoUrl;
        pendingPhotoFile = null;
        renderPhoto(photoUrl);

        showAlert("✅ Profil berhasil disimpan!");
      } catch (err) {
        console.error("saveProfile:", err);
        showAlert("Terjadi kesalahan. Coba lagi.");
      }

      saveBtn.disabled = false;
      saveBtn.textContent = "Save Changes";
    });
  }

  // ── Init ────────────────────────────────────────────────────
  await loadUserData();
});

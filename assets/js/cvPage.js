// ============================================================
// cvPage.js
// Halaman cv.html:
//   - Upload PDF ke Supabase Storage bucket 'cvs' (maks 1 MB)
//   - Tampilkan daftar CV yang sudah diupload (selector)
//   - Preview CV via iframe
//   - Hapus CV dari storage
//   - Bisa upload banyak file sekaligus, masing-masing dinamai
// ============================================================

document.addEventListener("DOMContentLoaded", async () => {
  const db = window.supabaseClient;
  const username = localStorage.getItem("currentUser");
  if (!username || !db) return;

  // Bucket & folder path
  const BUCKET = "cvs";
  const FOLDER = username + "/";
  const MAX_SIZE_BYTES = 1 * 1024 * 1024; // 1 MB

  // ── Elemen DOM ──────────────────────────────────────────────
  const cvInput        = document.getElementById("cvInput");
  const cvChooseLabel  = document.getElementById("cvChooseLabel");
  const cvUploadBtn    = document.getElementById("cvUploadBtn");
  const cvSelector     = document.getElementById("cvSelector");
  const cvViewer       = document.getElementById("cvViewer");
  const viewerSection  = document.getElementById("viewerSection");
  const cvContainer    = document.getElementById("cvContainer");
  const deleteCvBtn    = document.getElementById("deleteCvBtn");
  const nameModal      = document.getElementById("nameModal");
  const nameForm       = document.getElementById("nameForm");
  const nameConfirm    = document.getElementById("nameConfirm");
  const closeName      = nameModal?.querySelector(".close-name");

  let pendingFiles = [];      // File[] yang belum diupload, menunggu penamaan
  let pendingNames = [];      // Nama yang diisi user di modal

  // ── Muat daftar CV dari storage ─────────────────────────────
  async function loadCvList() {
    const { data, error } = await db.storage.from(BUCKET).list(FOLDER, {
      limit: 100,
      offset: 0,
      sortBy: { column: "created_at", order: "desc" },
    });

    if (error) {
      console.error("loadCvList:", error);
      showMessage("Gagal memuat daftar CV. Pastikan bucket 'cvs' sudah dibuat di Supabase Storage.", "error");
      return;
    }

    const files = (data || []).filter((f) => f.name && f.name !== ".emptyFolderPlaceholder");

    if (files.length === 0) {
      viewerSection.style.display = "none";
      showMessage("Belum ada CV yang diupload. Pilih file PDF lalu klik Upload.", "info");
      return;
    }

    // Isi selector
    viewerSection.style.display = "block";
    cvSelector.innerHTML = '<option value="">-- Pilih CV --</option>';
    files.forEach((f) => {
      const opt = document.createElement("option");
      opt.value = FOLDER + f.name;
      opt.textContent = f.name.replace(/\.pdf$/i, "");
      cvSelector.appendChild(opt);
    });

    // Preview CV pertama otomatis
    cvSelector.selectedIndex = 1;
    previewSelected();
    showMessage("", "");
  }

  // ── Preview CV yang dipilih ──────────────────────────────────
  function previewSelected() {
    const path = cvSelector.value;
    if (!path) {
      cvViewer.style.display = "none";
      return;
    }
    const { data } = db.storage.from(BUCKET).getPublicUrl(path);
    if (data?.publicUrl) {
      cvViewer.src = data.publicUrl;
      cvViewer.style.display = "block";
    }
  }

  cvSelector?.addEventListener("change", previewSelected);

  // ── Tampilkan pesan di cvContainer ──────────────────────────
  function showMessage(msg, type) {
    if (!cvContainer) return;
    if (!msg) { cvContainer.innerHTML = ""; return; }
    const colors = { error: "#e74c3c", info: "#5c667a", success: "#27ae60" };
    cvContainer.innerHTML = `<p style="color:${colors[type] || "#333"};margin-top:0.5rem">${msg}</p>`;
  }

  // ── Pilih file ───────────────────────────────────────────────
  cvInput?.addEventListener("change", () => {
    const files = Array.from(cvInput.files || []);
    if (files.length === 0) return;

    // Validasi ukuran setiap file
    const tooLarge = files.filter((f) => f.size > MAX_SIZE_BYTES);
    if (tooLarge.length > 0) {
      const names = tooLarge.map((f) => f.name).join(", ");
      showAlert(`File berikut melebihi batas 1 MB dan tidak dapat diupload:\n${names}`);
      // Filter hanya yang valid
      pendingFiles = files.filter((f) => f.size <= MAX_SIZE_BYTES);
    } else {
      pendingFiles = files;
    }

    if (pendingFiles.length === 0) {
      cvInput.value = "";
      return;
    }

    // Update label
    const label = pendingFiles.length === 1
      ? pendingFiles[0].name
      : `${pendingFiles.length} file dipilih`;
    if (cvChooseLabel) cvChooseLabel.textContent = "📁 " + label;
  });

  // ── Klik Upload → buka modal penamaan ───────────────────────
  cvUploadBtn?.addEventListener("click", () => {
    if (pendingFiles.length === 0) {
      showAlert("Pilih file PDF terlebih dahulu.");
      return;
    }
    openNameModal();
  });

  // ── Modal penamaan ───────────────────────────────────────────
  function openNameModal() {
    nameForm.innerHTML = "";
    pendingFiles.forEach((f, i) => {
      const defaultName = f.name.replace(/\.pdf$/i, "");
      const wrap = document.createElement("div");
      wrap.style.marginBottom = "0.75rem";
      wrap.innerHTML = `
        <label style="display:block;font-size:0.85rem;color:#666;margin-bottom:0.25rem">
          File: <strong>${f.name}</strong>
          <small style="color:${f.size > MAX_SIZE_BYTES ? '#e74c3c' : '#27ae60'}">
            (${(f.size / 1024).toFixed(0)} KB)
          </small>
        </label>
        <input type="text" data-index="${i}"
          value="${defaultName}"
          placeholder="Nama CV"
          style="width:100%;padding:0.5rem;border:1px solid #ddd;border-radius:0.375rem;box-sizing:border-box;font-family:Poppins,sans-serif"
        />
      `;
      nameForm.appendChild(wrap);
    });
    nameModal.style.display = "flex";
  }

  closeName?.addEventListener("click", () => { nameModal.style.display = "none"; });
  window.addEventListener("click", (e) => {
    if (e.target === nameModal) nameModal.style.display = "none";
  });

  // ── Konfirmasi upload ────────────────────────────────────────
  nameConfirm?.addEventListener("click", async () => {
    // Kumpulkan nama dari input
    const inputs = nameForm.querySelectorAll("input[type=text]");
    pendingNames = Array.from(inputs).map((inp) => inp.value.trim() || "CV");

    // Cek nama duplikat
    const names = new Set(pendingNames);
    if (names.size !== pendingNames.length) {
      showAlert("Nama CV tidak boleh sama. Harap beri nama berbeda untuk setiap file.");
      return;
    }

    nameModal.style.display = "none";
    nameConfirm.disabled = true;
    nameConfirm.textContent = "Mengupload...";

    let successCount = 0;
    let failMessages = [];

    for (let i = 0; i < pendingFiles.length; i++) {
      const file = pendingFiles[i];
      const fileName = pendingNames[i] + ".pdf";
      const filePath = FOLDER + fileName;

      const { error } = await db.storage.from(BUCKET).upload(filePath, file, {
        upsert: true,
        contentType: "application/pdf",
      });

      if (error) {
        console.error("Upload CV:", error);
        failMessages.push(`"${fileName}": ${error.message}`);
      } else {
        successCount++;
      }
    }

    // Reset
    pendingFiles = [];
    pendingNames = [];
    if (cvInput) cvInput.value = "";
    if (cvChooseLabel) cvChooseLabel.textContent = "📁 Choose CV files";
    nameConfirm.disabled = false;
    nameConfirm.textContent = "Confirm";

    if (failMessages.length > 0) {
      showAlert("Beberapa file gagal diupload:\n" + failMessages.join("\n"));
    }
    if (successCount > 0) {
      showMessage(`✅ ${successCount} CV berhasil diupload!`, "success");
    }

    await loadCvList();
  });

  // ── Hapus CV yang dipilih ────────────────────────────────────
  deleteCvBtn?.addEventListener("click", async () => {
    const path = cvSelector?.value;
    const name = cvSelector?.options[cvSelector.selectedIndex]?.text;
    if (!path) {
      showAlert("Pilih CV yang ingin dihapus dari dropdown.");
      return;
    }

    const confirmed = await customConfirm(
      "Hapus CV?",
      `CV "${name}" akan dihapus secara permanen. Yakin?`
    );
    if (!confirmed) return;

    const { error } = await db.storage.from(BUCKET).remove([path]);
    if (error) {
      console.error("Delete CV:", error);
      showAlert("Gagal menghapus CV: " + error.message);
      return;
    }

    cvViewer.style.display = "none";
    cvViewer.src = "";
    showMessage("✅ CV berhasil dihapus.", "success");
    await loadCvList();
  });

  // ── Init ────────────────────────────────────────────────────
  await loadCvList();
});

// ============================================================
// cvPage.js — CV upload, list, preview, delete
// Storage: Supabase 'cvs' bucket + 'cv_files' table
// ============================================================

document.addEventListener("DOMContentLoaded", async () => {
  const db = window.supabaseClient;
  const userId = localStorage.getItem("currentUserId");
  if (!userId || !db) return;

  const BUCKET = "cvs";
  const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

  const cvInput = document.getElementById("cvInput");
  const cvChooseLabel = document.getElementById("cvChooseLabel");
  const cvUploadBtn = document.getElementById("cvUploadBtn");
  const uploadConfirmRow = document.getElementById("uploadConfirmRow");
  const cvContainer = document.getElementById("cvContainer");
  const cvCountBadge = document.getElementById("cvCountBadge");
  const previewPanel = document.getElementById("previewPanel");
  const previewTitle = document.getElementById("previewTitle");
  const previewClose = document.getElementById("previewClose");
  const cvViewer = document.getElementById("cvViewer");
  const nameModal = document.getElementById("nameModal");
  const nameForm = document.getElementById("nameForm");
  const nameConfirm = document.getElementById("nameConfirm");
  const closeName = nameModal?.querySelector(".close-name");

  function tr(k) {
    return typeof t === "function" ? t(k) : k;
  }
  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function sanitize(n) {
    return n
      .replace(/[^a-zA-Z0-9\-_. ]/g, "")
      .replace(/\s+/g, "_")
      .substring(0, 80);
  }

  let pendingFiles = [],
    pendingNames = [],
    cvList = [];

  // ── Check if cv_files table exists ───────────────────────
  async function tableExists() {
    const { error } = await db.from("cv_files").select("id").limit(1);
    return !error;
  }

  // ── Load CV list ──────────────────────────────────────────
  async function loadCvList() {
    const hasTable = await tableExists();
    if (hasTable) {
      const { data, error } = await db
        .from("cv_files")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      if (!error) {
        cvList = (data || []).map((r) => ({
          id: r.id,
          name: r.cv_name,
          path: r.file_path,
          url: r.public_url,
          size: r.file_size || 0,
          created_at: r.created_at,
        }));
        renderList();
        return;
      }
    }
    // Fallback: storage list
    const folder = userId + "/";
    const { data } = await db.storage
      .from(BUCKET)
      .list(folder, {
        limit: 100,
        sortBy: { column: "created_at", order: "desc" },
      });
    cvList = (data || [])
      .filter((f) => f.name && f.name !== ".emptyFolderPlaceholder")
      .map((f) => {
        const path = folder + f.name;
        const { data: ud } = db.storage.from(BUCKET).getPublicUrl(path);
        return {
          id: f.id || f.name,
          name: f.name.replace(/\.pdf$/i, ""),
          path,
          url: ud?.publicUrl || "",
          size: f.metadata?.size || 0,
          created_at: f.created_at,
        };
      });
    renderList();
  }

  // ── Render CV list ────────────────────────────────────────
  function renderList() {
    if (!cvContainer) return;
    if (cvCountBadge) cvCountBadge.textContent = cvList.length;
    if (cvList.length === 0) {
      cvContainer.innerHTML =
        '<div class="cv-empty">' + tr("cv_empty") + "</div>";
      return;
    }
    cvContainer.innerHTML = "";
    cvList.forEach((cv) => {
      const sizeKB = cv.size ? (cv.size / 1024).toFixed(0) + " KB" : "";
      const dateStr = cv.created_at
        ? new Date(cv.created_at).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "";
      const item = document.createElement("div");
      item.className = "cv-item";
      item.dataset.id = cv.id;
      item.innerHTML =
        '<div class="cv-item-icon">📄</div>' +
        '<div class="cv-item-info">' +
        '<div class="cv-item-name">' +
        esc(cv.name) +
        "</div>" +
        '<div class="cv-item-meta">' +
        (sizeKB ? sizeKB + " · " : "") +
        (dateStr || "") +
        "</div>" +
        "</div>" +
        '<div class="cv-item-actions">' +
        '<button class="cv-action-btn view" data-id="' +
        esc(cv.id) +
        '" title="Preview">👁</button>' +
        '<button class="cv-action-btn del"  data-id="' +
        esc(cv.id) +
        '" title="Delete">🗑</button>' +
        "</div>";
      item.querySelector(".view").addEventListener("click", (e) => {
        e.stopPropagation();
        openPreview(cv);
      });
      item.querySelector(".del").addEventListener("click", (e) => {
        e.stopPropagation();
        deleteCv(cv);
      });
      item.addEventListener("click", () => openPreview(cv));
      cvContainer.appendChild(item);
    });
  }
  // Expose renderList for language-change re-renders
  window._cvRenderList = renderList;

  // ── Preview ───────────────────────────────────────────────
  function openPreview(cv) {
    if (!cv.url) {
      showAlert("Preview URL not available.");
      return;
    }
    if (cvViewer) cvViewer.src = cv.url + "?cb=" + Date.now();
    if (previewTitle) previewTitle.textContent = "Preview — " + cv.name;
    if (previewPanel) {
      previewPanel.style.display = "block";
      previewPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    document
      .querySelectorAll(".cv-item")
      .forEach((el) =>
        el.classList.toggle("active", el.dataset.id === String(cv.id)),
      );
  }
  previewClose?.addEventListener("click", () => {
    if (previewPanel) previewPanel.style.display = "none";
    if (cvViewer) cvViewer.src = "";
    document
      .querySelectorAll(".cv-item")
      .forEach((el) => el.classList.remove("active"));
  });

  // ── Delete ────────────────────────────────────────────────
  async function deleteCv(cv) {
    const ok =
      typeof customConfirm === "function"
        ? await customConfirm(
            "Delete CV?",
            '"' + cv.name + '" will be permanently deleted.',
          )
        : window.confirm('Delete "' + cv.name + '"?');
    if (!ok) return;

    try {
      // Delete from storage
      const { error: storageErr } = await db.storage
        .from(BUCKET)
        .remove([cv.path]);
      if (storageErr)
        throw new Error("Storage delete failed: " + storageErr.message);

      // Delete from database
      const { error: dbErr } = await db
        .from("cv_files")
        .delete()
        .eq("user_id", userId)
        .eq("file_path", cv.path);
      if (dbErr) throw new Error("Database delete failed: " + dbErr.message);

      await loadCvList();
      showAlert("CV deleted successfully");
    } catch (e) {
      console.error("deleteCv error:", e.message);
      showAlert("Error deleting CV: " + e.message);
    }
  }

  // ── File selection ────────────────────────────────────────
  cvInput?.addEventListener("change", () => {
    const files = Array.from(cvInput.files || []);
    if (files.length === 0) return;
    if (files.some((f) => f.type !== "application/pdf")) {
      showAlert(tr("alert_cv_pdf_only"));
      cvInput.value = "";
      return;
    }
    const tooBig = files.filter((f) => f.size > MAX_SIZE);
    if (tooBig.length) {
      showAlert(
        tr("alert_cv_too_large") +
          "\n" +
          tooBig.map((f) => "• " + f.name).join("\n"),
      );
      pendingFiles = files.filter((f) => f.size <= MAX_SIZE);
    } else {
      pendingFiles = files;
    }
    if (pendingFiles.length === 0) {
      cvInput.value = "";
      if (uploadConfirmRow) uploadConfirmRow.style.display = "none";
      return;
    }
    if (uploadConfirmRow) uploadConfirmRow.style.display = "block";
    const h3 = cvChooseLabel?.querySelector("h3");
    if (h3)
      h3.textContent =
        pendingFiles.length === 1
          ? "📁 " + pendingFiles[0].name
          : "📁 " + pendingFiles.length + " files selected";
  });

  // ── Upload button → naming modal ──────────────────────────
  cvUploadBtn?.addEventListener("click", () => {
    if (pendingFiles.length === 0) {
      showAlert("Please select a PDF file first.");
      return;
    }
    openNameModal();
  });

  function openNameModal() {
    if (!nameForm || !nameModal) return;
    nameForm.innerHTML = "";
    pendingFiles.forEach((f, i) => {
      const wrap = document.createElement("div");
      wrap.style.marginBottom = "0.875rem";
      wrap.innerHTML =
        '<label style="display:block;font-size:0.8rem;color:var(--muted);margin-bottom:0.3rem">File: <strong>' +
        esc(f.name) +
        "</strong>" +
        ' <small style="color:' +
        (f.size > MAX_SIZE ? "#e74c3c" : "#22c55e") +
        '">(' +
        (f.size / 1024).toFixed(0) +
        " KB)</small></label>" +
        '<input type="text" data-index="' +
        i +
        '" value="' +
        esc(f.name.replace(/\.pdf$/i, "")) +
        '" placeholder="' +
        tr("cv_name_placeholder") +
        '" />';
      nameForm.appendChild(wrap);
    });
    nameModal.style.display = "flex";
  }
  closeName?.addEventListener("click", () => {
    if (nameModal) nameModal.style.display = "none";
  });
  window.addEventListener("click", (e) => {
    if (e.target === nameModal) nameModal.style.display = "none";
  });

  // ── Confirm upload ────────────────────────────────────────
  nameConfirm?.addEventListener("click", async () => {
    const inputs = nameForm?.querySelectorAll("input[type=text]");
    pendingNames = Array.from(inputs || []).map(
      (i) => i.value.trim() || "CV_" + Date.now(),
    );
    if (new Set(pendingNames).size !== pendingNames.length) {
      showAlert(tr("alert_cv_name_dup"));
      return;
    }
    if (nameModal) nameModal.style.display = "none";
    if (nameConfirm) {
      nameConfirm.disabled = true;
      nameConfirm.textContent = "Uploading...";
    }

    const hasTable = await tableExists();
    let ok = 0;
    const errs = [];

    for (let i = 0; i < pendingFiles.length; i++) {
      const file = pendingFiles[i];
      const cvName = pendingNames[i];
      const fileName = sanitize(cvName) + ".pdf";
      const filePath = userId + "/" + fileName;

      const { error: upErr } = await db.storage
        .from(BUCKET)
        .upload(filePath, file, {
          upsert: true,
          contentType: "application/pdf",
        });
      if (upErr) {
        errs.push('"' + cvName + '": ' + upErr.message);
        continue;
      }

      const { data: ud } = db.storage.from(BUCKET).getPublicUrl(filePath);
      const publicUrl = ud?.publicUrl || "";

      if (hasTable) {
        const { error: dbErr } = await db.from("cv_files").upsert(
          {
            user_id: userId,
            cv_name: cvName,
            file_path: filePath,
            public_url: publicUrl,
            file_size: file.size,
          },
          { onConflict: "user_id,file_path" },
        );
        if (dbErr) {
          errs.push('"' + cvName + '" (DB error): ' + dbErr.message);
          continue;
        }
      }
      ok++;
    }

    pendingFiles = [];
    pendingNames = [];
    if (cvInput) cvInput.value = "";
    if (uploadConfirmRow) uploadConfirmRow.style.display = "none";
    const h3 = cvChooseLabel?.querySelector("h3");
    if (h3)
      h3.textContent = tr("cv_drop") || "Drop your CV here or click to upload";
    if (nameConfirm) {
      nameConfirm.disabled = false;
      nameConfirm.textContent = tr("btn_confirm") || "Confirm";
    }

    if (errs.length)
      showAlert(
        "Some files failed:\n" +
          errs.join("\n") +
          "\n\nMake sure bucket 'cvs' is created and public.",
      );
    if (ok > 0) {
      const msg = document.createElement("div");
      msg.style.cssText = "color:#22c55e;padding:.5rem 0;font-size:.875rem;";
      msg.textContent =
        "✅ " + ok + " CV" + (ok > 1 ? "s" : "") + " uploaded successfully!";
      if (cvContainer) {
        cvContainer.insertBefore(msg, cvContainer.firstChild);
        setTimeout(() => msg.remove(), 3000);
      }
    }
    await loadCvList();
  });

  await loadCvList();
});

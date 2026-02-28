// ============================================================
// applicationDetailPage.js  (v4 — rebuilt renderStages)
// 
// Perubahan dari versi sebelumnya:
//   ✅ Semua label di ATAS circle (class .step-label, bukan .top/.bottom)
//   ✅ .step-cell mendapat class done-cell / current-cell / upcoming-cell
//      untuk connector line styling
//   ✅ Edit note sekarang include time input juga
//   ✅ Stage box: deadline format lebih rapi
//   ✅ Stage modal: auto-focus name input saat dibuka
//   ✅ showStageDetail: highlight label teks yang sedang aktif
// ============================================================

let stageEditMode = false;   // toggle edit mode timeline
let currentApp    = null;    // referensi aplikasi yang sedang dibuka

// ────────────────────────────────────────────────────────────
// renderStages
// Semua label ada di ATAS circle. Tidak ada alternating lagi.
// ────────────────────────────────────────────────────────────
function renderStages(app) {
  const timeline  = document.querySelector(".timeline");
  const stageBox  = document.querySelector(".stage-box");
  if (!timeline) return;

  timeline.innerHTML = "";

  // Reset stage box
  if (stageBox) {
    stageBox.style.display = "none";
    stageBox.querySelector("h3").textContent = "";
    const deadlineEl = document.getElementById("detailDeadline");
    if (deadlineEl) deadlineEl.textContent = "-";
    const notesEl = stageBox.querySelector(".notes");
    if (notesEl) notesEl.innerHTML = "";
  }

  // Empty state
  if (!app.stages || app.stages.length === 0) {
    const ph = document.createElement("div");
    ph.className = "empty-stage";
    ph.textContent = "Add your Recruitment Process";
    timeline.appendChild(ph);
    return;
  }

  // Tentukan stage "current" = paling dekat dari sekarang ke depan
  const now = new Date();
  let minDiff = Infinity, nearestIdx = -1;
  app.stages.forEach((s, idx) => {
    if (s.date) {
      const diff = new Date(s.date + (s.time ? "T" + s.time : "")) - now;
      if (diff >= 0 && diff < minDiff) { minDiff = diff; nearestIdx = idx; }
    }
  });

  // Buat row columns
  const columnsRow = document.createElement("div");
  columnsRow.className = "timeline-columns";
  timeline.appendChild(columnsRow);

  app.stages.forEach((s, idx) => {
    // Tentukan status visual
    let statusCls = "upcoming";
    if (s.date) {
      const dt = new Date(s.date + (s.time ? "T" + s.time : ""));
      if (dt < now) {
        statusCls = "done";
      } else if (idx === nearestIdx) {
        statusCls = "current";
      }
    }

    // Format tanggal + waktu untuk label
    const dateText = s.date
      ? new Date(s.date).toLocaleDateString("id-ID", {
          day:   "numeric",
          month: "short",
          year:  "numeric",
        })
      : "";
    const fullDate = dateText + (s.time ? ", " + s.time : "");

    // ── Label (selalu di atas circle) ──────────────────────────
    const label = document.createElement("div");
    label.className = "step-label";

    const nameEl = document.createElement("div");
    nameEl.className = "step-name";
    nameEl.textContent = s.name || "";

    const dateEl = document.createElement("div");
    dateEl.className = "step-date";
    dateEl.textContent = fullDate || "—";

    label.appendChild(nameEl);
    label.appendChild(dateEl);

    // ── Circle ─────────────────────────────────────────────────
    const step = document.createElement("div");
    step.className = "step " + statusCls;

    const num = document.createElement("span");
    num.className = "step-number";
    num.textContent = idx + 1;
    step.appendChild(num);

    // Mode edit: tampilkan icon hapus saat hover
    if (stageEditMode) {
      const del = document.createElement("span");
      del.className = "delete-stage";
      del.textContent = "🗑";
      del.addEventListener("click", async (e) => {
        e.stopPropagation();
        const ok = await customConfirm("Hapus Stage", "Yakin ingin menghapus stage ini?");
        if (ok) {
          app.stages.splice(idx, 1);
          await updateApplication(app);
          renderStages(app);
        }
      });
      step.appendChild(del);
      step.addEventListener("mouseenter", () => step.classList.add("show-delete"));
      step.addEventListener("mouseleave", () => step.classList.remove("show-delete"));
    }

    step.addEventListener("click", () => showStageDetail(app, idx));

    // ── Cell ────────────────────────────────────────────────────
    const col = document.createElement("div");
    col.className = "step-cell " + statusCls + "-cell";
    col.appendChild(label);
    col.appendChild(step);
    columnsRow.appendChild(col);
  });
}

// ────────────────────────────────────────────────────────────
// showStageDetail
// Tampilkan detail stage yang diklik di stage-box bawah
// ────────────────────────────────────────────────────────────
function showStageDetail(app, index) {
  // Highlight circle yang aktif
  document.querySelectorAll(".timeline .step").forEach((st, i) => {
    st.classList.toggle("active", i === index);
  });

  const s        = app.stages[index];
  const stageBox = document.querySelector(".stage-box");
  if (!stageBox) return;

  stageBox.style.display = "block";
  stageBox.querySelector("h3").textContent = s.name || "—";

  // Format deadline
  const deadlineEl = document.getElementById("detailDeadline");
  if (deadlineEl) {
    if (s.date) {
      const formattedDate = new Date(s.date).toLocaleDateString("id-ID", {
        weekday: "short",
        day:     "numeric",
        month:   "long",
        year:    "numeric",
      });
      deadlineEl.textContent = s.time ? `${formattedDate}, ${s.time}` : formattedDate;
    } else {
      deadlineEl.textContent = "—";
    }
  }

  // Render catatan
  const notesEl = stageBox.querySelector(".notes");
  if (notesEl) {
    notesEl.innerHTML = s.notes
      ? `<p style="white-space:pre-wrap">${s.notes}</p>`
      : `<p style="color:var(--muted);font-style:italic;font-size:0.8rem">Belum ada catatan. Klik ✎ untuk menambahkan.</p>`;
  }

  // Edit note icon — reset handler setiap kali detail berganti
  const editIcon = document.getElementById("noteEdit");
  if (!editIcon) return;

  editIcon.textContent = "✎";
  editIcon.style.color  = "";

  editIcon.onclick = async () => {
    if (editIcon.textContent === "✎") {
      // ── Mode edit: tampilkan form ──
      notesEl.innerHTML = "";

      // Date + Time row
      const dtRow = document.createElement("div");
      dtRow.style.cssText = "display:flex;gap:.5rem;margin-bottom:.5rem;";

      const dateInput = document.createElement("input");
      dateInput.type  = "date";
      dateInput.value = s.date || "";
      dateInput.style.cssText = "flex:1;padding:.45rem .6rem;border:1.5px solid var(--border);border-radius:var(--radius-sm);font-family:Poppins,sans-serif;font-size:.8rem;color:var(--text);background:var(--surface);outline:none;";

      const timeInput = document.createElement("input");
      timeInput.type  = "time";
      timeInput.value = s.time || "";
      timeInput.style.cssText = dateInput.style.cssText + "flex:0 0 120px;";

      dtRow.appendChild(dateInput);
      dtRow.appendChild(timeInput);

      const textarea = document.createElement("textarea");
      textarea.value = s.notes || "";
      textarea.placeholder = "Tambahkan catatan…";
      textarea.style.cssText = "width:100%;min-height:90px;padding:.6rem .75rem;border:1.5px solid var(--border);border-radius:var(--radius-sm);font-family:Poppins,sans-serif;font-size:.85rem;line-height:1.6;color:var(--text);background:var(--surface);resize:vertical;outline:none;box-sizing:border-box;";

      notesEl.appendChild(dtRow);
      notesEl.appendChild(textarea);
      textarea.focus();

      editIcon.textContent = "✔";
      editIcon.style.color = "var(--green)";
    } else {
      // ── Mode simpan ──
      const dateInput = notesEl.querySelector("input[type=date]");
      const timeInput = notesEl.querySelector("input[type=time]");
      const textarea  = notesEl.querySelector("textarea");

      if (dateInput) s.date = dateInput.value || "";
      if (timeInput) s.time = timeInput.value || "";
      if (textarea)  s.notes = textarea.value || "";

      await updateApplication(app);

      // Re-render label di timeline agar tanggal ikut update
      renderStages(app);
      showStageDetail(app, index);

      editIcon.textContent = "✎";
      editIcon.style.color = "";
    }
  };
}

// ────────────────────────────────────────────────────────────
// loadDetail
// ────────────────────────────────────────────────────────────
function loadDetail(apps) {
  const params = new URLSearchParams(window.location.search);
  const id     = params.get("id");
  if (!id) return;
  const app = apps.find((a) => String(a.id) === id);
  if (!app) return;

  const h1 = document.querySelector(".company-name h1");
  const h3 = document.querySelector(".company-name h3");
  const jobTitleDisplay = app.jobTitle && app.jobTitle !== "-" ? app.jobTitle : "";

  h1.textContent = app.company;
  h3.textContent = app.program + (jobTitleDisplay ? ` — ${jobTitleDisplay}` : "");

  h1.style.cursor = "pointer";
  h1.title = "Double-click untuk edit nama perusahaan";
  h3.style.cursor = "pointer";
  h3.title = "Double-click untuk edit program & posisi";

  h1.addEventListener("dblclick", async () => {
    const val = prompt("Edit Company Name:", app.company);
    if (val !== null && val.trim()) {
      app.company = val.trim();
      await updateApplication(app);
      h1.textContent = app.company;
    }
  });

  h3.addEventListener("dblclick", async () => {
    const current = app.program + (jobTitleDisplay ? ` - ${jobTitleDisplay}` : "");
    const val = prompt("Edit Program - Position (pisahkan dengan ' - '):", current);
    if (val !== null) {
      const parts = val.split("-").map((s) => s.trim());
      app.program  = parts[0] || app.program;
      app.jobTitle = parts[1] || "";
      await updateApplication(app);
      h3.textContent = app.program + (app.jobTitle ? ` — ${app.jobTitle}` : "");
    }
  });

  renderStages(app);

  // Auto-buka stage yang paling relevan
  if (app.stages && app.stages.length > 0) {
    const now = new Date();
    let targetIdx = -1;

    // 1. Stage yang sedang "current" (terdekat dari now)
    let minDiff = Infinity;
    for (let i = 0; i < app.stages.length; i++) {
      if (app.stages[i].date) {
        const diff = new Date(app.stages[i].date + (app.stages[i].time ? "T" + app.stages[i].time : "")) - now;
        if (diff >= 0 && diff < minDiff) { minDiff = diff; targetIdx = i; }
      }
    }

    // 2. Stage terakhir yang sudah lewat
    if (targetIdx === -1) {
      for (let i = app.stages.length - 1; i >= 0; i--) {
        if (app.stages[i].date) {
          const dt = new Date(app.stages[i].date);
          if (dt < now) { targetIdx = i; break; }
        }
      }
    }

    // 3. Stage pertama kalau semua tanpa tanggal
    if (targetIdx === -1) targetIdx = 0;

    showStageDetail(app, targetIdx);
  }
}

// ────────────────────────────────────────────────────────────
// DOMContentLoaded — init semua event listener
// ────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", async () => {
  const data   = await getAllApplications();
  const params = new URLSearchParams(window.location.search);
  const id     = params.get("id");
  currentApp   = data.find((a) => String(a.id) === id);

  loadDetail(data);

  // ── Stage modal ──────────────────────────────────────────────
  const addBtn    = document.querySelector(".add-btn");
  const stageModal = document.getElementById("stageModal");
  const closeStage = stageModal.querySelector(".close-stage");
  const stageSave  = document.getElementById("stageSave");
  const numInput   = document.getElementById("stageNumber");
  const nameInput  = document.getElementById("stageName");
  const dateInput  = document.getElementById("stageDate");
  const timeInput  = document.getElementById("stageTime");

  function openStageModal() {
    numInput.value  = currentApp.stages ? currentApp.stages.length + 1 : 1;
    nameInput.value = "";
    dateInput.value = "";
    timeInput.value = "";
    stageModal.style.display = "flex";
    setTimeout(() => nameInput.focus(), 80);
  }
  function closeStageModal() { stageModal.style.display = "none"; }

  if (addBtn) addBtn.addEventListener("click", openStageModal);
  closeStage.addEventListener("click", closeStageModal);
  window.addEventListener("click", (e) => {
    if (e.target === stageModal) closeStageModal();
  });

  stageSave.addEventListener("click", async () => {
    const stepNum  = parseInt(numInput.value) || (currentApp.stages ? currentApp.stages.length + 1 : 1);
    const stageName = nameInput.value.trim();
    const stageDate = dateInput.value;
    const stageTime = timeInput.value;

    if (!stageName) { await showAlert("Stage name required"); return; }

    const newStage = {
      name:     stageName,
      date:     stageDate,
      time:     stageTime,
      datetime: stageDate && stageTime ? `${stageDate}T${stageTime}:00` : stageDate,
      status:   "upcoming",
      notes:    "",
    };

    if (!currentApp.stages) currentApp.stages = [];
    currentApp.stages.splice(stepNum - 1, 0, newStage);
    await updateApplication(currentApp);
    renderStages(currentApp);
    closeStageModal();

    // Auto-buka stage yang baru ditambahkan
    const newIdx = currentApp.stages.indexOf(newStage);
    if (newIdx !== -1) showStageDetail(currentApp, newIdx);
  });

  // ── Tombol back ─────────────────────────────────────────────
  const backBtn = document.getElementById("backBtn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      if (window.history.length > 1) window.history.back();
      else window.location.href = "applied.html";
    });
  }

  // ── Dropdown pilih aplikasi lain ─────────────────────────────
  const selectComp = document.getElementById("selectCompany");
  const compDrop   = document.getElementById("companyDropdown");
  if (selectComp && compDrop) {
    selectComp.addEventListener("click", (e) => {
      e.stopPropagation();
      if (compDrop.style.display === "block") {
        compDrop.style.display = "none";
      } else {
        compDrop.innerHTML = "";
        data.forEach((a) => {
          const div = document.createElement("div");
          div.textContent = a.company + (a.program ? ` · ${a.program}` : "");
          if (String(a.id) === id) div.style.fontWeight = "700";
          div.addEventListener("click", () => {
            window.location.href = "application-detail.html?id=" + a.id;
          });
          compDrop.appendChild(div);
        });
        compDrop.style.display = "block";
      }
    });
    window.addEventListener("click", (e) => {
      if (e.target !== selectComp) compDrop.style.display = "none";
    });
  }

  // ── Hapus aplikasi ───────────────────────────────────────────
  const deleteBtn = document.getElementById("deleteApp");
  if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {
      if (currentApp) deleteApplicationFull(currentApp, data);
    });
  }

  // ── Edit mode toggle (edit stage list) ───────────────────────
  const editBtn = document.getElementById("editStages");
  if (editBtn) {
    editBtn.addEventListener("click", async () => {
      stageEditMode = !stageEditMode;
      editBtn.textContent = stageEditMode ? "✔" : "✎";
      editBtn.classList.toggle("active", stageEditMode);

      const companyNameEl = document.querySelector(".company-name h1");
      const subTitleEl    = document.querySelector(".company-name h3");

      if (stageEditMode) {
        // Ganti teks dengan input
        const compInput = document.createElement("input");
        compInput.type  = "text";
        compInput.id    = "editCompanyInput";
        compInput.value = currentApp.company || "";
        compInput.style.cssText = "font-size:1.2em;font-weight:700;width:100%;border:none;border-bottom:2px solid var(--brand);outline:none;background:transparent;color:var(--text);padding:0;";

        const progInput = document.createElement("input");
        progInput.type  = "text";
        progInput.id    = "editProgramPositionInput";
        progInput.value = `${currentApp.program || ""}${currentApp.jobTitle && currentApp.jobTitle !== "-" ? " - " + currentApp.jobTitle : ""}`;
        progInput.style.cssText = "font-size:.875em;width:100%;border:none;border-bottom:1.5px solid var(--border);outline:none;background:transparent;color:var(--muted);padding:0;margin-top:4px;";

        companyNameEl.innerHTML = "";
        companyNameEl.appendChild(compInput);
        subTitleEl.innerHTML = "";
        subTitleEl.appendChild(progInput);
        compInput.focus();
      } else {
        // Simpan perubahan
        const compInput = document.getElementById("editCompanyInput");
        const progInput = document.getElementById("editProgramPositionInput");
        if (compInput) currentApp.company = compInput.value.trim();
        if (progInput) {
          const parts = progInput.value.trim().split(" - ");
          currentApp.program  = parts[0] || "";
          currentApp.jobTitle = parts[1] ? parts[1].trim() : "";
          if (!currentApp.jobTitle || currentApp.jobTitle === "-") currentApp.jobTitle = "";
        }
        await updateApplication(currentApp);
        companyNameEl.textContent = currentApp.company;
        subTitleEl.textContent    = currentApp.program + (currentApp.jobTitle ? ` — ${currentApp.jobTitle}` : "");
      }

      renderStages(currentApp);
    });
  }

  // ── Close delete modal ────────────────────────────────────────
  const closeDelete = document.querySelector("#deleteModal .close-delete");
  if (closeDelete) {
    closeDelete.addEventListener("click", () => {
      document.getElementById("deleteModal").style.display = "none";
    });
  }
  window.addEventListener("click", (e) => {
    if (e.target.id === "deleteModal") {
      document.getElementById("deleteModal").style.display = "none";
    }
  });

  // ── Auto-refresh setiap 60 detik ─────────────────────────────
  setInterval(async () => {
    const refreshed = await getAllApplications();
    if (currentApp) {
      const updated = refreshed.find((a) => a.id === currentApp.id);
      if (updated) { currentApp = updated; renderStages(currentApp); }
    }
  }, 60000);
});

// ────────────────────────────────────────────────────────────
// deleteApplicationFull
// Hapus aplikasi lengkap dengan confirm modal
// ────────────────────────────────────────────────────────────
async function deleteApplicationFull(app, allApps) {
  const now = new Date();
  let nextStage = null, doneCount = 0;

  if (app.stages && app.stages.length > 0) {
    for (const s of app.stages) {
      if (s.date) {
        const dt = new Date(s.date + (s.time ? "T" + s.time : ""));
        if (dt >= now && !nextStage) nextStage = s;
        if (dt < now) doneCount++;
      } else {
        doneCount++;
      }
    }
    if (!nextStage) nextStage = app.stages[app.stages.length - 1];
  }

  let stageText = "Belum ada stage";
  if (nextStage) {
    const dateStr = nextStage.date
      ? new Date(nextStage.date).toLocaleDateString("id-ID", {
          weekday: "short", year: "numeric", month: "short", day: "numeric",
        })
      : "—";
    stageText = `${nextStage.name} (${doneCount}/${app.stages.length})\n${dateStr}${nextStage.time ? ` | ${nextStage.time}` : ""}`;
  }

  const message = `Perusahaan: ${app.company}\nProgram: ${app.program}\nStage: ${stageText}\n\nYakin ingin menghapus aplikasi ini secara permanen?`;
  const confirmed = await customConfirm("Hapus Aplikasi", message);

  if (confirmed) {
    const base     = await getAllApplications();
    const filtered = base.filter((a) => a.id !== app.id);
    await saveApplicationsToServer(filtered);
    localStorage.removeItem("applications");
    window.location.href = "applied.html";
  }
}

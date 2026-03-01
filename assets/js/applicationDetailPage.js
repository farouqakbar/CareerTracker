// ============================================================
// applicationDetailPage.js  (v5 — proporsi & estetis)
//
// Fix dari screenshot v4:
//   ✅ Stage tanpa tanggal → tidak tampilkan "—", cukup kosong
//   ✅ Cell width auto (fit content, bukan fixed 108px)
//   ✅ Connector line: ketebalan 2px, warna gradasi sesuai state
//   ✅ Label: max-width sesuai cell, wrap tapi tidak overflow
//   ✅ Date/time: format lebih compact (2 Feb 2026, 08:30)
//   ✅ Active ring: lebih proporsional
// ============================================================

let stageEditMode = false;
let currentApp    = null;

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────
function formatStageDate(date, time) {
  if (!date) return "";
  const d = new Date(date);
  const dateStr = d.toLocaleDateString("id-ID", {
    day: "numeric", month: "short", year: "numeric",
  });
  return time ? `${dateStr}, ${time}` : dateStr;
}

function formatDeadlineFull(date, time) {
  if (!date) return "—";
  const d = new Date(date);
  const dateStr = d.toLocaleDateString("id-ID", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
  return time ? `${dateStr}, ${time}` : dateStr;
}

// Tentukan status semua stage sekaligus (done/current/upcoming)
function computeStageStatuses(stages) {
  const now = new Date();
  let minDiff = Infinity, nearestIdx = -1;

  stages.forEach((s, i) => {
    if (s.date) {
      const diff = new Date(s.date + (s.time ? "T" + s.time : "")) - now;
      if (diff >= 0 && diff < minDiff) { minDiff = diff; nearestIdx = i; }
    }
  });

  return stages.map((s, i) => {
    if (!s.date) return "upcoming";
    const dt = new Date(s.date + (s.time ? "T" + s.time : ""));
    if (dt < now) return "done";
    if (i === nearestIdx) return "current";
    return "upcoming";
  });
}

// ─────────────────────────────────────────────────────────────
// renderStages  — CORE VISUAL FUNCTION
// ─────────────────────────────────────────────────────────────
function renderStages(app) {
  const timeline = document.querySelector(".timeline");
  const stageBox = document.getElementById("stageDetailBox");
  if (!timeline) return;

  timeline.innerHTML = "";

  // Reset stage-box
  if (stageBox) {
    stageBox.style.display = "none";
    const titleEl = document.getElementById("stageBoxTitle");
    if (titleEl) titleEl.textContent = "";
    const deadlineEl = document.getElementById("detailDeadline");
    if (deadlineEl) deadlineEl.textContent = "—";
    const notesEl = document.getElementById("stageNotes");
    if (notesEl) notesEl.innerHTML = "";
  }

  if (!app.stages || app.stages.length === 0) {
    const ph = document.createElement("div");
    ph.className = "empty-stage";
    ph.textContent = "Tambahkan proses rekrutmen Anda";
    timeline.appendChild(ph);
    return;
  }

  const statuses   = computeStageStatuses(app.stages);
  const total      = app.stages.length;

  const columnsRow = document.createElement("div");
  columnsRow.className = "timeline-columns";
  columnsRow.setAttribute("data-count", total);
  timeline.appendChild(columnsRow);

  app.stages.forEach((s, idx) => {
    const status   = statuses[idx];
    const dateStr  = formatStageDate(s.date, s.time);
    const isLast   = idx === total - 1;

    // ── Cell wrapper ──────────────────────────────────────────
    const col = document.createElement("div");
    col.className = `step-cell ${status}-cell${isLast ? " last-cell" : ""}`;
    col.dataset.index = idx;

    // ── Label atas ────────────────────────────────────────────
    const label = document.createElement("div");
    label.className = "step-label";

    const nameEl = document.createElement("div");
    nameEl.className = "step-name";
    nameEl.textContent = s.name || "";
    label.appendChild(nameEl);

    // Hanya tampilkan date jika ada — TIDAK pakai fallback "—"
    if (dateStr) {
      const dateEl = document.createElement("div");
      dateEl.className = "step-date";
      dateEl.textContent = dateStr;
      label.appendChild(dateEl);
    }

    // ── Circle ────────────────────────────────────────────────
    const step = document.createElement("div");
    step.className = `step ${status}`;

    const num = document.createElement("span");
    num.className = "step-number";
    num.textContent = idx + 1;
    step.appendChild(num);

    // Mode edit: ikon hapus saat hover
    if (stageEditMode) {
      const del = document.createElement("span");
      del.className = "delete-stage";
      del.innerHTML = "&#128465;";
      del.addEventListener("click", async (e) => {
        e.stopPropagation();
        const ok = await customConfirm("Hapus Stage", `Hapus stage "${s.name}"?`);
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

    col.appendChild(label);
    col.appendChild(step);
    columnsRow.appendChild(col);
  });
}

// ─────────────────────────────────────────────────────────────
// showStageDetail
// ─────────────────────────────────────────────────────────────
function showStageDetail(app, index) {
  // Highlight circle aktif
  document.querySelectorAll(".timeline .step").forEach((st, i) => {
    st.classList.toggle("active", i === index);
  });

  const s        = app.stages[index];
  const stageBox = document.getElementById("stageDetailBox");
  if (!stageBox) return;

  stageBox.style.display = "block";
  const titleEl = document.getElementById("stageBoxTitle");
  if (titleEl) titleEl.textContent = s.name || "—";

  const deadlineEl = document.getElementById("detailDeadline");
  if (deadlineEl) deadlineEl.textContent = formatDeadlineFull(s.date, s.time);

  const notesEl = document.getElementById("stageNotes");
  if (notesEl) {
    notesEl.innerHTML = s.notes
      ? `<p style="white-space:pre-wrap;margin:0">${s.notes}</p>`
      : `<p class="empty-note">Belum ada catatan. Klik ✎ untuk menambahkan.</p>`;
  }

  const editIcon = document.getElementById("noteEdit");
  if (!editIcon) return;
  editIcon.textContent = "✎";
  editIcon.style.color = "";

  editIcon.onclick = async () => {
    if (editIcon.textContent === "✎") {
      // Mode edit
      notesEl.innerHTML = "";

      const dtRow = document.createElement("div");
      dtRow.style.cssText = "display:flex;gap:.5rem;margin-bottom:.625rem;";

      const dateInput = document.createElement("input");
      dateInput.type  = "date";
      dateInput.value = s.date || "";

      const timeInput = document.createElement("input");
      timeInput.type  = "time";
      timeInput.value = s.time || "";

      dtRow.appendChild(dateInput);
      dtRow.appendChild(timeInput);

      const textarea = document.createElement("textarea");
      textarea.value       = s.notes || "";
      textarea.placeholder = "Tambahkan catatan…";

      notesEl.appendChild(dtRow);
      notesEl.appendChild(textarea);
      textarea.focus();

      editIcon.textContent = "✔";
      editIcon.style.color = "var(--green)";
    } else {
      // Mode simpan
      const dateInput = notesEl.querySelector("input[type=date]");
      const timeInput = notesEl.querySelector("input[type=time]");
      const textarea  = notesEl.querySelector("textarea");

      if (dateInput) s.date  = dateInput.value  || "";
      if (timeInput) s.time  = timeInput.value  || "";
      if (textarea)  s.notes = textarea.value   || "";

      await updateApplication(app);

      // Re-render agar label tanggal ikut update
      renderStages(app);
      showStageDetail(app, index);

      editIcon.textContent = "✎";
      editIcon.style.color = "";
    }
  };
}

// ─────────────────────────────────────────────────────────────
// loadDetail
// ─────────────────────────────────────────────────────────────
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
  h1.title = "Double-click untuk edit";
  h3.title = "Double-click untuk edit";

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
    const val = prompt("Edit Program - Position (pisahkan ' - '):", current);
    if (val !== null) {
      const parts = val.split("-").map((s) => s.trim());
      app.program  = parts[0] || app.program;
      app.jobTitle = parts[1] ? parts[1].trim() : "";
      if (!app.jobTitle || app.jobTitle === "-") app.jobTitle = "";
      await updateApplication(app);
      h3.textContent = app.program + (app.jobTitle ? ` — ${app.jobTitle}` : "");
    }
  });

  renderStages(app);

  // Auto-buka stage paling relevan
  if (app.stages && app.stages.length > 0) {
    const now      = new Date();
    let targetIdx  = -1;
    let minDiff    = Infinity;

    // 1. Stage upcoming terdekat (current)
    for (let i = 0; i < app.stages.length; i++) {
      if (app.stages[i].date) {
        const diff = new Date(app.stages[i].date + (app.stages[i].time ? "T" + app.stages[i].time : "")) - now;
        if (diff >= 0 && diff < minDiff) { minDiff = diff; targetIdx = i; }
      }
    }

    // 2. Stage done terakhir
    if (targetIdx === -1) {
      for (let i = app.stages.length - 1; i >= 0; i--) {
        if (app.stages[i].date) {
          const dt = new Date(app.stages[i].date);
          if (dt < now) { targetIdx = i; break; }
        }
      }
    }

    if (targetIdx === -1) targetIdx = 0;
    showStageDetail(app, targetIdx);
  }
}

// ─────────────────────────────────────────────────────────────
// DOMContentLoaded
// ─────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", async () => {
  const data   = await getAllApplications();
  const params = new URLSearchParams(window.location.search);
  const id     = params.get("id");
  currentApp   = data.find((a) => String(a.id) === id);

  loadDetail(data);

  // ── Stage modal ────────────────────────────────────────────
  const addBtn     = document.querySelector(".add-btn");
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
  window.addEventListener("click", (e) => { if (e.target === stageModal) closeStageModal(); });

  stageSave.addEventListener("click", async () => {
    const stepNum   = parseInt(numInput.value) || (currentApp.stages ? currentApp.stages.length + 1 : 1);
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

    const newIdx = currentApp.stages.indexOf(newStage);
    if (newIdx !== -1) showStageDetail(currentApp, newIdx);
  });

  // ── Tombol back ───────────────────────────────────────────
  const backBtn = document.getElementById("backBtn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      if (window.history.length > 1) window.history.back();
      else window.location.href = "home.html";
    });
  }

  // ── Dropdown aplikasi lain ────────────────────────────────
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

  // ── Hapus aplikasi ────────────────────────────────────────
  const deleteBtn = document.getElementById("deleteApp");
  if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {
      if (currentApp) deleteApplicationFull(currentApp, data);
    });
  }

  // ── Edit mode (company/program + hapus stage) ────────────
  const editBtn = document.getElementById("editStages");
  if (editBtn) {
    editBtn.addEventListener("click", async () => {
      stageEditMode = !stageEditMode;
      editBtn.textContent = stageEditMode ? "✔" : "✎";
      editBtn.classList.toggle("active", stageEditMode);

      const companyNameEl = document.querySelector(".company-name h1");
      const subTitleEl    = document.querySelector(".company-name h3");

      if (stageEditMode) {
        const compInput = document.createElement("input");
        compInput.type  = "text";
        compInput.id    = "editCompanyInput";
        compInput.value = currentApp.company || "";
        compInput.style.cssText =
          "font-size:1.1em;font-weight:700;width:100%;border:none;border-bottom:2px solid var(--brand);outline:none;background:transparent;color:var(--text);padding:0 0 2px;";

        const progInput = document.createElement("input");
        progInput.type  = "text";
        progInput.id    = "editProgramPositionInput";
        progInput.value = `${currentApp.program || ""}${currentApp.jobTitle && currentApp.jobTitle !== "-" ? " - " + currentApp.jobTitle : ""}`;
        progInput.style.cssText =
          "font-size:.875em;width:100%;border:none;border-bottom:1.5px solid var(--border);outline:none;background:transparent;color:var(--muted);padding:0 0 2px;margin-top:4px;";

        companyNameEl.innerHTML = "";
        companyNameEl.appendChild(compInput);
        subTitleEl.innerHTML = "";
        subTitleEl.appendChild(progInput);
        compInput.focus();
      } else {
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

  // ── Close delete modal ────────────────────────────────────
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

  // ── Auto-refresh 60s ──────────────────────────────────────
  setInterval(async () => {
    const refreshed = await getAllApplications();
    if (currentApp) {
      const updated = refreshed.find((a) => a.id === currentApp.id);
      if (updated) { currentApp = updated; renderStages(currentApp); }
    }
  }, 60000);
});

// ─────────────────────────────────────────────────────────────
// deleteApplicationFull
// ─────────────────────────────────────────────────────────────
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
    window.location.href = "home.html";
  }
}

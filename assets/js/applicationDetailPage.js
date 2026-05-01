// ============================================================
// applicationDetailPage.js — v6
// Full English, i18n-ready, with card labels & progress bar
// ============================================================

let stageEditMode = false;
let currentApp = null;

// ── Helpers ──────────────────────────────────────────────────
function fmtDate(date, time) {
  if (!date) return "";
  const locale =
    typeof getLang === "function" && getLang() === "id" ? "id-ID" : "en-US";
  // Parse date in local timezone to avoid UTC shift issues
  const [y, m, d] = date.split("-").map(Number);
  const localDate = new Date(y, m - 1, d); // Create in local timezone, not UTC
  return (
    localDate.toLocaleDateString(locale, {
      day: "numeric",
      month: "short",
      year: "numeric",
    }) + (time ? ", " + time : "")
  );
}

function fmtDateFull(date, time) {
  if (!date) return "—";
  const locale =
    typeof getLang === "function" && getLang() === "id" ? "id-ID" : "en-US";
  // Parse date in local timezone to avoid UTC shift issues
  const [y, m, d] = date.split("-").map(Number);
  const localDate = new Date(y, m - 1, d); // Create in local timezone, not UTC
  return (
    localDate.toLocaleDateString(locale, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }) + (time ? ", " + time : "")
  );
}

function tr(key) {
  return typeof t === "function" ? t(key) : key;
}

function computeStatuses(stages) {
  const now = new Date();
  let minDiff = Infinity,
    nearestIdx = -1;
  stages.forEach((s, i) => {
    if (s.date) {
      // Parse date in local timezone to avoid UTC shift issues
      const [y, m, d] = s.date.split("-").map(Number);
      const stageDate = new Date(y, m - 1, d);
      const dt = s.time
        ? new Date(
            stageDate.getFullYear(),
            stageDate.getMonth(),
            stageDate.getDate(),
            parseInt(s.time.split(":")[0]),
            parseInt(s.time.split(":")[1]),
          )
        : stageDate;
      const diff = dt - now;
      if (diff >= 0 && diff < minDiff) {
        minDiff = diff;
        nearestIdx = i;
      }
    }
  });
  return stages.map((s, i) => {
    if (!s.date) return "upcoming";
    // Parse date in local timezone
    const [y, m, d] = s.date.split("-").map(Number);
    const stageDate = new Date(y, m - 1, d);
    const dt = s.time
      ? new Date(
          stageDate.getFullYear(),
          stageDate.getMonth(),
          stageDate.getDate(),
          parseInt(s.time.split(":")[0]),
          parseInt(s.time.split(":")[1]),
        )
      : stageDate;
    if (dt < now) return "done";
    if (i === nearestIdx) return "current";
    return "upcoming";
  });
}

// ── Progress bar ──────────────────────────────────────────────
function updateProgress(app) {
  const row = document.getElementById("progressRow");
  const bar = document.getElementById("progressBar");
  const pct = document.getElementById("progressPct");
  if (!row || !app.stages || app.stages.length === 0) {
    if (row) row.style.display = "none";
    return;
  }
  const now = new Date();
  const done = app.stages.filter((s) => {
    if (!s.date) return false;
    // Parse date in local timezone
    const [y, m, d] = s.date.split("-").map(Number);
    const stageDate = new Date(y, m - 1, d);
    const dt = s.time
      ? new Date(
          stageDate.getFullYear(),
          stageDate.getMonth(),
          stageDate.getDate(),
          parseInt(s.time.split(":")[0]),
          parseInt(s.time.split(":")[1]),
        )
      : stageDate;
    return dt < now;
  }).length;
  const p = Math.round((done / app.stages.length) * 100);
  row.style.display = "flex";
  if (bar) bar.style.width = p + "%";
  if (pct)
    pct.textContent =
      done + "/" + app.stages.length + " " + tr("detail_stage_done");
}

// ── Status badge ──────────────────────────────────────────────
function updateStatusBadge(app) {
  const badge = document.getElementById("appStatusBadge");
  if (!badge) return;
  const s = (app.status || "pending").toLowerCase();
  const icons = {
    active: "🟢",
    pending: "🟡",
    rejected: "🔴",
    discontinued: "⚫",
  };
  const cls = {
    active: "badge-active",
    pending: "badge-pending",
    rejected: "badge-rejected",
    discontinued: "badge-discontinued",
  };
  badge.className = "app-status-badge " + (cls[s] || "badge-pending");
  badge.textContent = (icons[s] || "🟡") + " " + tr("status_" + s);
}

// ── renderStages ──────────────────────────────────────────────
function renderStages(app) {
  const timeline = document.querySelector(".timeline");
  const stageBox = document.getElementById("stageDetailBox");
  const hintBox = document.getElementById("stageHintBox");
  if (!timeline) return;

  timeline.innerHTML = "";
  if (stageBox) {
    stageBox.style.display = "none";
  }
  if (hintBox) {
    hintBox.style.display = "none";
  }

  updateProgress(app);

  if (!app.stages || app.stages.length === 0) {
    const ph = document.createElement("div");
    ph.className = "empty-stage";
    ph.textContent = tr("detail_empty_stage");
    timeline.appendChild(ph);
    return;
  }

  const statuses = computeStatuses(app.stages);
  const total = app.stages.length;

  const row = document.createElement("div");
  row.className = "timeline-columns";
  row.setAttribute("data-count", total);
  timeline.appendChild(row);

  app.stages.forEach((s, idx) => {
    const status = statuses[idx];
    const dateStr = fmtDate(s.date, s.time);
    const isLast = idx === total - 1;

    const col = document.createElement("div");
    col.className = `step-cell ${status}-cell${isLast ? " last-cell" : ""}`;
    col.dataset.index = idx;

    const label = document.createElement("div");
    label.className = "step-label";

    const nameEl = document.createElement("div");
    nameEl.className = "step-name";
    nameEl.textContent = s.name || "";
    label.appendChild(nameEl);

    if (dateStr) {
      const dateEl = document.createElement("div");
      dateEl.className = "step-date";
      dateEl.textContent = dateStr;
      label.appendChild(dateEl);
    }

    const step = document.createElement("div");
    step.className = `step ${status}`;
    const num = document.createElement("span");
    num.className = "step-number";
    num.textContent = idx + 1;
    step.appendChild(num);

    if (stageEditMode) {
      const del = document.createElement("span");
      del.className = "delete-stage";
      del.innerHTML = "&#128465;";
      del.addEventListener("click", async (e) => {
        e.stopPropagation();
        const ok = await customConfirm(
          tr("modal_confirm"),
          `Delete stage "${s.name}"?`,
        );
        if (!ok) return;

        // Save the deleted stage for restoration if update fails
        const deletedStage = { ...app.stages[idx] };
        app.stages.splice(idx, 1);

        try {
          await updateApplication(app);
          renderStages(app);
        } catch (error) {
          // Restore the stage if deletion failed
          app.stages.splice(idx, 0, deletedStage);
          renderStages(app);
          await showAlert(
            "Failed to delete stage: " + (error.message || "Unknown error"),
          );
        }
      });
      step.appendChild(del);
      step.addEventListener("mouseenter", () =>
        step.classList.add("show-delete"),
      );
      step.addEventListener("mouseleave", () =>
        step.classList.remove("show-delete"),
      );
    }

    step.addEventListener("click", () => showStageDetail(app, idx));
    col.appendChild(label);
    col.appendChild(step);
    row.appendChild(col);
  });

  // Show hint box if stages exist
  if (hintBox && app.stages.length > 0) hintBox.style.display = "block";
}

// ── showStageDetail ───────────────────────────────────────────
function showStageDetail(app, index) {
  document
    .querySelectorAll(".timeline .step")
    .forEach((st, i) => st.classList.toggle("active", i === index));

  const s = app.stages[index];
  const stageBox = document.getElementById("stageDetailBox");
  const hintBox = document.getElementById("stageHintBox");
  if (!stageBox) return;

  if (hintBox) hintBox.style.display = "none";
  stageBox.style.display = "block";

  const titleEl = document.getElementById("stageBoxTitle");
  const deadlineEl = document.getElementById("detailDeadline");
  const notesEl = document.getElementById("stageNotes");
  const editIcon = document.getElementById("noteEdit");

  if (titleEl) titleEl.textContent = s.name || "—";
  if (deadlineEl) deadlineEl.textContent = fmtDateFull(s.date, s.time);
  if (notesEl) {
    notesEl.innerHTML = ""; // Clear previous content
    if (s.notes) {
      const p = document.createElement("p");
      p.style.cssText = "white-space:pre-wrap;margin:0";
      p.textContent = s.notes; // Use textContent to prevent XSS
      notesEl.appendChild(p);
    } else {
      const p = document.createElement("p");
      p.className = "empty-note";
      p.textContent = tr("detail_empty_note");
      notesEl.appendChild(p);
    }
  }
  if (!editIcon) return;
  editIcon.textContent = "✎";
  editIcon.style.color = "";

  editIcon.onclick = async () => {
    if (editIcon.textContent === "✎") {
      // Enter edit mode
      notesEl.innerHTML = "";
      const dtRow = document.createElement("div");
      dtRow.style.cssText = "display:flex;gap:.5rem;margin-bottom:.625rem;";
      const dateIn = Object.assign(document.createElement("input"), {
        type: "date",
        value: s.date || "",
      });
      const timeIn = Object.assign(document.createElement("input"), {
        type: "time",
        value: s.time || "",
      });
      dtRow.append(dateIn, timeIn);
      const ta = document.createElement("textarea");
      ta.value = s.notes || "";
      ta.placeholder = tr("detail_note_label") + "…";
      notesEl.append(dtRow, ta);
      ta.focus();
      editIcon.textContent = "✔";
      editIcon.style.color = "var(--green)";
    } else {
      // Save with error handling
      const dateIn = notesEl.querySelector("input[type=date]");
      const timeIn = notesEl.querySelector("input[type=time]");
      const ta = notesEl.querySelector("textarea");

      // Save old values for restoration if update fails
      const oldStage = { ...s };

      if (dateIn) s.date = dateIn.value || "";
      if (timeIn) s.time = timeIn.value || "";
      if (ta) s.notes = ta.value || "";

      try {
        await updateApplication(app);
        renderStages(app);
        showStageDetail(app, index);
        editIcon.textContent = "✎";
        editIcon.style.color = "";
      } catch (error) {
        // Restore old values if update failed
        Object.assign(s, oldStage);
        showStageDetail(app, index);
        await showAlert(
          "Failed to save stage: " + (error.message || "Unknown error"),
        );
      }
    }
  };
}

// ── loadDetail ────────────────────────────────────────────────
function loadDetail(apps) {
  const id = new URLSearchParams(window.location.search).get("id");
  if (!id) return;
  const app = apps.find((a) => String(a.id) === id);
  if (!app) {
    document.querySelector(".application-info").innerHTML =
      '<div style="padding:3rem;text-align:center;color:var(--muted)">Application not found. <a href="home.html">← Back</a></div>';
    return;
  }

  const h1 = document.getElementById("companyName");
  const h3 = document.getElementById("appSubtitle");
  const jt = app.jobTitle && app.jobTitle !== "-" ? app.jobTitle : "";

  if (h1) h1.textContent = app.company;
  if (h3) h3.textContent = app.program + (jt ? " — " + jt : "");

  updateStatusBadge(app);
  renderStages(app);

  // Auto-open most relevant stage
  if (app.stages && app.stages.length > 0) {
    const now = new Date();
    let idx = -1,
      minD = Infinity;
    for (let i = 0; i < app.stages.length; i++) {
      if (app.stages[i].date) {
        const diff =
          new Date(
            app.stages[i].date +
              (app.stages[i].time ? "T" + app.stages[i].time : ""),
          ) - now;
        if (diff >= 0 && diff < minD) {
          minD = diff;
          idx = i;
        }
      }
    }
    if (idx === -1) {
      for (let i = app.stages.length - 1; i >= 0; i--) {
        if (app.stages[i].date && new Date(app.stages[i].date) < now) {
          idx = i;
          break;
        }
      }
    }
    if (idx === -1) idx = 0;
    showStageDetail(app, idx);
  }
}

// ── DOMContentLoaded ──────────────────────────────────────────
document.addEventListener("DOMContentLoaded", async () => {
  const data = await getAllApplications();
  const id = new URLSearchParams(window.location.search).get("id");
  currentApp = data.find((a) => String(a.id) === id);

  loadDetail(data);

  // Stage modal
  const addBtn = document.querySelector(".add-btn");
  const stageModal = document.getElementById("stageModal");
  if (!stageModal) return;
  const closeStage = stageModal.querySelector(".close-stage");
  const stageSave = document.getElementById("stageSave");
  const numInput = document.getElementById("stageNumber");
  const nameInput = document.getElementById("stageName");
  const dateInput = document.getElementById("stageDate");
  const timeInput = document.getElementById("stageTime");

  function openStageModal() {
    if (!currentApp) return;
    if (numInput)
      numInput.value = currentApp.stages ? currentApp.stages.length + 1 : 1;
    if (nameInput) nameInput.value = "";
    if (dateInput) dateInput.value = "";
    if (timeInput) timeInput.value = "";
    stageModal.style.display = "flex";
    setTimeout(() => nameInput && nameInput.focus(), 80);
  }
  function closeStageModal() {
    stageModal.style.display = "none";
  }

  if (addBtn) addBtn.addEventListener("click", openStageModal);
  if (closeStage) closeStage.addEventListener("click", closeStageModal);
  window.addEventListener("click", (e) => {
    if (e.target === stageModal) closeStageModal();
  });

  if (stageSave) {
    stageSave.addEventListener("click", async () => {
      const stepNum =
        parseInt(numInput?.value) ||
        (currentApp.stages ? currentApp.stages.length + 1 : 1);
      const stageName = nameInput?.value.trim();
      if (!stageName) {
        await showAlert("Stage name is required.");
        return;
      }
      const stageDate = dateInput?.value;
      const stageTime = timeInput?.value;
      const newStage = {
        name: stageName,
        date: stageDate,
        time: stageTime,
        datetime:
          stageDate && stageTime ? `${stageDate}T${stageTime}:00` : stageDate,
        status: "upcoming",
        notes: "",
      };
      if (!currentApp.stages) currentApp.stages = [];
      currentApp.stages.splice(stepNum - 1, 0, newStage);
      await updateApplication(currentApp);
      renderStages(currentApp);
      closeStageModal();
      const newIdx = currentApp.stages.indexOf(newStage);
      if (newIdx !== -1) showStageDetail(currentApp, newIdx);
    });
  }

  // Back button
  const backBtn = document.getElementById("backBtn");
  if (backBtn)
    backBtn.addEventListener("click", () => {
      if (window.history.length > 1) window.history.back();
      else window.location.href = "home.html";
    });

  // Company dropdown (switch app)
  const selectComp = document.getElementById("selectCompany");
  const compDrop = document.getElementById("companyDropdown");
  if (selectComp && compDrop) {
    selectComp.addEventListener("click", (e) => {
      e.stopPropagation();
      if (compDrop.style.display === "block") {
        compDrop.style.display = "none";
        return;
      }
      compDrop.innerHTML = "";
      data.forEach((a) => {
        const div = document.createElement("div");
        div.textContent = a.company + (a.program ? " · " + a.program : "");
        if (String(a.id) === id) div.style.fontWeight = "700";
        div.addEventListener("click", () => {
          compDrop.style.display = "none"; // Close dropdown BEFORE navigation
          window.location.href = "application-detail.html?id=" + a.id;
        });
        compDrop.appendChild(div);
      });
      compDrop.style.display = "block";
    });
    window.addEventListener("click", (e) => {
      if (e.target !== selectComp) compDrop.style.display = "none";
    });
  }

  // Delete application
  const deleteBtn = document.getElementById("deleteApp");
  if (deleteBtn)
    deleteBtn.addEventListener("click", () => {
      if (currentApp) deleteAppFull(currentApp, data);
    });

  // Edit mode (stages + company name)
  const editBtn = document.getElementById("editStages");
  if (editBtn) {
    editBtn.addEventListener("click", async () => {
      stageEditMode = !stageEditMode;
      editBtn.textContent = stageEditMode ? "✔" : "✎";
      editBtn.classList.toggle("active", stageEditMode);
      const h1El = document.getElementById("companyName");
      const h3El = document.getElementById("appSubtitle");

      if (stageEditMode) {
        const ci = Object.assign(document.createElement("input"), {
          type: "text",
          id: "editCompInput",
          value: currentApp.company || "",
        });
        ci.style.cssText =
          "font-size:1.1em;font-weight:700;width:100%;border:none;border-bottom:2px solid var(--brand);outline:none;background:transparent;color:var(--text);padding:0 0 2px;";
        const pi = Object.assign(document.createElement("input"), {
          type: "text",
          id: "editProgInput",
          value:
            (currentApp.program || "") +
            (currentApp.jobTitle && currentApp.jobTitle !== "-"
              ? " - " + currentApp.jobTitle
              : ""),
        });
        pi.style.cssText =
          "font-size:.875em;width:100%;border:none;border-bottom:1.5px solid var(--border);outline:none;background:transparent;color:var(--muted);padding:0 0 2px;margin-top:4px;";
        if (h1El) {
          h1El.innerHTML = "";
          h1El.appendChild(ci);
        }
        if (h3El) {
          h3El.innerHTML = "";
          h3El.appendChild(pi);
        }
        ci.focus();
      } else {
        const ci = document.getElementById("editCompInput");
        const pi = document.getElementById("editProgInput");
        if (ci) currentApp.company = ci.value.trim();
        if (pi) {
          const pts = pi.value.trim().split(" - ");
          currentApp.program = pts[0] || "";
          currentApp.jobTitle = pts[1] ? pts[1].trim() : "";
          if (!currentApp.jobTitle || currentApp.jobTitle === "-")
            currentApp.jobTitle = "";
        }
        await updateApplication(currentApp);
        if (h1El) h1El.textContent = currentApp.company;
        if (h3El)
          h3El.textContent =
            currentApp.program +
            (currentApp.jobTitle ? " — " + currentApp.jobTitle : "");
        updateStatusBadge(currentApp);
      }
      renderStages(currentApp);
    });
  }

  // Close delete modal
  const closeDelete = document.querySelector("#deleteModal .close-delete");
  if (closeDelete)
    closeDelete.addEventListener("click", () => {
      document.getElementById("deleteModal").style.display = "none";
    });
  window.addEventListener("click", (e) => {
    if (e.target.id === "deleteModal")
      document.getElementById("deleteModal").style.display = "none";
  });

  // Auto-refresh every 60s
  setInterval(async () => {
    const refreshed = await getAllApplications();
    if (currentApp) {
      const updated = refreshed.find((a) => a.id === currentApp.id);
      if (updated) {
        currentApp = updated;
        renderStages(currentApp);
        updateStatusBadge(currentApp);
      }
    }
  }, 60000);

  // Re-apply i18n on language change
  document.addEventListener("ct_langchange", () => {
    if (currentApp) {
      renderStages(currentApp);
      updateStatusBadge(currentApp);
    }
  });
});

// ── deleteAppFull ─────────────────────────────────────────────
async function deleteAppFull(app, allApps) {
  const isID = typeof getLang === "function" && getLang() === "id";
  const now = new Date();
  let nextStage = null,
    doneCount = 0;

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

  const locale = isID ? "id-ID" : "en-US";
  let stageText = isID ? "Belum ada tahap" : "No stages yet";
  if (nextStage) {
    const ds = nextStage.date
      ? new Date(nextStage.date).toLocaleDateString(locale, {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "—";
    stageText = `${nextStage.name} (${doneCount}/${app.stages.length}) — ${ds}${nextStage.time ? " " + nextStage.time : ""}`;
  }

  const labels = isID
    ? {
        company: "Perusahaan",
        program: "Program",
        stage: "Tahap",
        warn: "Tindakan ini tidak dapat dibatalkan.",
      }
    : {
        company: "Company",
        program: "Program",
        stage: "Stage",
        warn: "This action cannot be undone.",
      };

  const msg = `${labels.company}: ${app.company}\n${labels.program}: ${app.program}\n${labels.stage}: ${stageText}\n\n${labels.warn}`;
  const ok = await customConfirm(tr("detail_delete_title"), msg);
  if (!ok) return;

  try {
    // ── Direct DELETE by primary key (fastest, no RLS filter needed beyond eq) ──
    const db = window.supabaseClient;
    if (!db) throw new Error("Supabase client not ready");

    const { error } = await db.from("applications").delete().eq("id", app.id);

    if (error) {
      console.error("deleteAppFull error:", error);
      const errMsg = isID
        ? `Gagal menghapus (${error.code}): ${error.message}`
        : `Delete failed (${error.code}): ${error.message}`;
      await showAlert(errMsg);
      return;
    }

    // Clear local cache and go home
    localStorage.removeItem("applications");
    window.location.href = "home.html";
  } catch (err) {
    console.error("deleteAppFull exception:", err);
    await showAlert((isID ? "Terjadi kesalahan: " : "Error: ") + err.message);
  }
}

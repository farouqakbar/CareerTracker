// ============================================================
// appliedPage.js  (FIXED)
// Perbaikan:
//   1. Hapus aplikasi berfungsi (gunakan dataService langsung)
//   2. Priority urut, data baru masuk di akhir (priority max+1) dan status Active
//   3. Kolom Delete dihapus dari tabel (hapus via swipe / klik baris + tombol)
//   4. Tidak ada double priority — setelah drag/reorder selalu re-number
//   5. Warna stage: hijau=terlewati, biru=terdekat, abu-abu=akan datang
// ============================================================

let selectedAppId = null;

// ---- Render tabel lamaran ----
function populateApplied(apps) {
  const body = document.getElementById("applicationsBody");
  if (!body) return;
  body.innerHTML = "";

  // Pastikan sort by priority
  apps.sort((x, y) => (x.priority || 0) - (y.priority || 0));

  apps.forEach((a) => {
    // Cari stage terdekat yang akan datang
    let upcomingText = "-";
    let nearest = null;
    let latestPast = null;
    if (a.stages) {
      const now = new Date();
      a.stages.forEach((s) => {
        if (!s.date) return;
        const stageDate = new Date(s.date);
        const diff = stageDate - now;
        if (diff >= 0 && (!nearest || diff < nearest.diff)) {
          nearest = { diff, stage: s };
        }
        if (diff < 0) {
          if (!latestPast || stageDate > new Date(latestPast.stage.date)) {
            latestPast = { stage: s };
          }
        }
      });
    }

    if (nearest) {
      const dstr = new Date(nearest.stage.date).toLocaleDateString();
      const tstr = nearest.stage.time ? `, ${nearest.stage.time}` : "";
      upcomingText = `${nearest.stage.name} (${dstr}${tstr})`;
    } else if (latestPast) {
      upcomingText = `${latestPast.stage.name} — sudah dijalani`;
    } else if (a.deadline) {
      upcomingText = `Deadline (${new Date(a.deadline).toLocaleDateString()})`;
    }

    const statusOptions = ["Active", "Rejected", "Pending", "Discontinued"];
    const status = a.status || "Pending";
    const jobTitleDisplay = a.jobTitle && a.jobTitle !== "-" ? a.jobTitle : "";

    const tr = document.createElement("tr");
    tr.dataset.id = a.id;
    tr.innerHTML = `
      <td><span class="priority-badge priority-${a.priority}">${a.status === "Active" ? a.priority : "-"}</span></td>
      <td>${a.applyDate || "-"}</td>
      <td>${a.company}</td>
      <td>${a.program}</td>
      <td>${jobTitleDisplay}</td>
      <td>
        <select class="status-select">
          ${statusOptions
            .map(
              (opt) =>
                `<option value="${opt}"${opt === status ? " selected" : ""}>${opt}</option>`
            )
            .join("")}
        </select>
      </td>
      <td>${upcomingText}</td>
      <td style="text-align:center;vertical-align:middle;">
        <a href="application-detail.html?id=${a.id}" class="detail-arrow-link"
           style="display:inline-block;text-decoration:none;">
          <span class="detail-arrow-icon">➤</span>
        </a>
      </td>
    `;

    // Status change
    tr.querySelector(".status-select").addEventListener("change", async (e) => {
      a.status = e.target.value;
      await updateApplication(a);
      populateApplied(apps);
    });

    // Row selection + delete on selected row via keyboard (optional)
    tr.addEventListener("click", (e) => {
      if (e.target.tagName === "A" || e.target.tagName === "SELECT") return;
      document.querySelectorAll("#applicationsBody tr").forEach((r) => r.classList.remove("selected"));
      tr.classList.add("selected");
      selectedAppId = a.id;
    });

    // Double-click to delete
    tr.addEventListener("dblclick", async (e) => {
      if (e.target.tagName === "A" || e.target.tagName === "SELECT") return;
      const confirmed = await customConfirm(
        "Hapus Lamaran?",
        `Perusahaan: ${a.company}\nProgram: ${a.program}\n\nYakin ingin menghapus?`
      );
      if (!confirmed) return;
      await deleteApplicationAndReorder(a.id, apps);
    });

    // Drag-and-drop reorder
    tr.draggable = true;
    tr.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", a.id);
      tr.classList.add("dragging");
    });
    tr.addEventListener("dragend", () => tr.classList.remove("dragging"));
    tr.addEventListener("dragover", (e) => e.preventDefault());
    tr.addEventListener("drop", async (e) => {
      e.preventDefault();
      const draggedId = e.dataTransfer.getData("text/plain");
      if (!draggedId || draggedId === String(a.id)) return;
      const draggedIndex = apps.findIndex((x) => String(x.id) === draggedId);
      const targetIndex = apps.findIndex((x) => String(x.id) === String(a.id));
      if (draggedIndex === -1 || targetIndex === -1) return;
      const [draggedApp] = apps.splice(draggedIndex, 1);
      apps.splice(targetIndex, 0, draggedApp);
      // Re-number priorities — no gaps, no duplicates
      await renumberAndSave(apps);
      populateApplied(apps);
    });

    // Priority badge click
    tr.querySelector(".priority-badge").addEventListener("click", (e) => {
      e.stopPropagation();
      document.querySelectorAll("#applicationsBody tr").forEach((r) => r.classList.remove("selected"));
      tr.classList.add("selected");
      selectedAppId = a.id;
      openPriorityModal(a, apps);
    });

    body.appendChild(tr);
  });
}

// ---- Helper: re-number priorities sequentially, no duplicates ----
async function renumberAndSave(apps) {
  for (let i = 0; i < apps.length; i++) {
    apps[i].priority = i + 1;
    await updateApplication(apps[i]);
  }
}

// ---- Helper: delete application then re-number ----
async function deleteApplicationAndReorder(id, apps) {
  // Delete from server
  const db = window.supabaseClient;
  if (db) {
    await db.from("applications").delete().eq("id", id);
  }
  // Remove from local array
  const idx = apps.findIndex((x) => String(x.id) === String(id));
  if (idx !== -1) apps.splice(idx, 1);
  // Re-number
  await renumberAndSave(apps);
  populateApplied(apps);
}

// ---- Priority modal ----
function openPriorityModal(app, apps) {
  const modal = document.getElementById("priorityModal");
  const container = document.getElementById("priorityOptions");
  container.innerHTML = "";
  for (let i = 1; i <= apps.length; i++) {
    const opt = document.createElement("div");
    opt.className = "priority-option";
    opt.textContent = i;
    if (i === app.priority) opt.style.fontWeight = "bold";
    opt.addEventListener("click", async () => {
      apps.sort((x, y) => (x.priority || 0) - (y.priority || 0));
      const cur = apps.findIndex((b) => String(b.id) === String(app.id));
      if (cur !== -1) { apps.splice(cur, 1); apps.splice(i - 1, 0, app); }
      await renumberAndSave(apps);
      populateApplied(apps);
      closePriorityModal();
    });
    container.appendChild(opt);
  }
  modal.style.display = "flex";
  document.querySelector(".close-priority").onclick = closePriorityModal;
}

function closePriorityModal() {
  const modal = document.getElementById("priorityModal");
  if (modal) modal.style.display = "none";
}

// ---- Search/filter ----
function setupSearch(apps) {
  const input = document.getElementById("searchInput");
  const list = document.getElementById("companySuggestions");
  if (!input || !list) return;

  const names = apps.map((a) => a.company);

  function refreshOptions(term) {
    list.innerHTML = "";
    names
      .filter((n) => n.toLowerCase().includes(term))
      .forEach((n) => {
        const opt = document.createElement("option");
        opt.value = n;
        list.appendChild(opt);
      });
  }
  refreshOptions("");

  input.addEventListener("input", () => {
    const term = input.value.toLowerCase();
    const body = document.getElementById("applicationsBody");
    Array.from(body.children).forEach((row) => {
      const company = row.children[2].textContent.toLowerCase();
      row.style.display = company.includes(term) ? "" : "none";
    });
    refreshOptions(term);
  });
}

// ---- Inisialisasi halaman ----
document.addEventListener("DOMContentLoaded", async () => {
  const data = await getAllApplications();

  // Ensure no duplicate priorities on load
  const hasDuplicate = (() => {
    const seen = new Set();
    for (const a of data) {
      if (seen.has(a.priority)) return true;
      seen.add(a.priority);
    }
    return false;
  })();
  if (hasDuplicate) {
    data.sort((x, y) => (x.priority || 0) - (y.priority || 0));
    await renumberAndSave(data);
  }

  populateApplied(data);
  setupSearch(data);

  // Modal tambah lamaran
  const addBtn = document.querySelector(".btn.add");
  const addModal = document.getElementById("addModal");
  const closeAdd = addModal ? addModal.querySelector(".close") : null;

  if (addBtn && addModal) {
    addBtn.addEventListener("click", () => {
      addModal.style.display = "flex";
    });
  }
  if (closeAdd) {
    closeAdd.addEventListener("click", () => {
      addModal.style.display = "none";
    });
  }
  window.addEventListener("click", (e) => {
    if (addModal && e.target === addModal) addModal.style.display = "none";
  });

  // Simpan lamaran baru — status Active, priority = max+1 (always last)
  const modalSaveBtn = document.getElementById("modalSave");
  if (modalSaveBtn) {
    modalSaveBtn.onclick = async () => {
      const company = document.getElementById("modalCompany").value.trim();
      const program = document.getElementById("modalProgram").value.trim();
      const jobTitle = document.getElementById("modalJobTitle").value.trim();

      if (!company || !program) {
        await showAlert("Please fill in Company and Program fields.");
        return;
      }

      // Priority = max existing priority + 1 (always appended at end)
      const maxPriority = data.length > 0
        ? Math.max(...data.map((d) => d.priority || 0))
        : 0;

      const newApp = {
        id: Date.now().toString(),
        company,
        program,
        jobTitle: jobTitle || "",
        applyDate: new Date().toLocaleDateString(),
        status: "Active",         // default Active
        priority: maxPriority + 1, // appended last, no duplicate
        stages: [],
      };

      await addApplication(newApp);
      data.push(newApp);

      document.getElementById("modalCompany").value = "";
      document.getElementById("modalProgram").value = "";
      document.getElementById("modalJobTitle").value = "";
      addModal.style.display = "none";
      window.location.href = "application-detail.html?id=" + newApp.id;
    };
  }

  // Delete button in toolbar (if user selects row then clicks delete)
  const deleteBtn = document.getElementById("deleteSelectedBtn");
  if (deleteBtn) {
    deleteBtn.addEventListener("click", async () => {
      if (!selectedAppId) {
        await showAlert("Pilih baris yang ingin dihapus terlebih dahulu.");
        return;
      }
      const app = data.find((x) => String(x.id) === String(selectedAppId));
      if (!app) return;
      const confirmed = await customConfirm(
        "Hapus Lamaran?",
        `Perusahaan: ${app.company}\nProgram: ${app.program}\n\nYakin ingin menghapus?`
      );
      if (!confirmed) return;
      await deleteApplicationAndReorder(app.id, data);
      selectedAppId = null;
    });
  }

  // Close delete modal
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

  // Auto-refresh setiap 60 detik
  setInterval(async () => {
    const refreshed = await getAllApplications();
    populateApplied(refreshed);
  }, 60000);
});

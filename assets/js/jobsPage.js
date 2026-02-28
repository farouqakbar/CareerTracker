// ============================================================
// jobsPage.js
// Logika untuk halaman jobs.html:
//   - Menampilkan tabel lowongan (populateJobs)
//   - Modal tambah lowongan
//   - Modal hapus lowongan
//   - Modal ganti prioritas lowongan
//   - Search/filter perusahaan
//   - Auto-refresh setiap 60 detik
// ============================================================

let selectedAppId = null; // ID vacancy yang sedang dipilih

// ---- Render tabel lowongan ----
function populateJobs(vacs) {
  const body = document.getElementById("vacanciesBody");
  if (!body) return;
  body.innerHTML = "";

  if (!vacs || vacs.length === 0) {
    const placeholder = document.createElement("tr");
    placeholder.innerHTML = `<td colspan="8" style="text-align:center;color:#888;">No vacancies added.</td>`;
    body.appendChild(placeholder);
    return;
  }

  // Sort: prioritas dulu, fallback ke deadline
  if (vacs.some((v) => v.priority != null)) {
    vacs.sort(
      (a, b) => (a.priority ?? 1e9) - (b.priority ?? 1e9)
    );
  } else {
    vacs.sort((x, y) => {
      if (x.deadline && y.deadline) return new Date(x.deadline) - new Date(y.deadline);
      return 0;
    });
  }

  vacs.forEach((v) => {
    const status = v.status || "Not Applied";
    const priorityDisplay = status === "Applied" ? "-" : (v.priority ?? "-");

    const tr = document.createElement("tr");
    tr.dataset.id = v.id;
    tr.innerHTML = `
      <td><span class="priority-badge priority-${v.priority}">${priorityDisplay}</span></td>
      <td>${v.company || "-"}</td>
      <td>${v.program || "-"}</td>
      <td>${v.jobTitle || "-"}</td>
      <td>${v.deadline ? new Date(v.deadline).toLocaleDateString() : "-"}</td>
      <td>
        <select class="vacancy-status-select">
          <option value="Applied"${status === "Applied" ? " selected" : ""}>Applied</option>
          <option value="Not Applied"${status === "Not Applied" ? " selected" : ""}>Not Applied</option>
        </select>
      </td>
      <td style="text-align:center;vertical-align:middle;">
        <a href="${v.link || "#"}" target="_blank" class="detail-arrow-link"
           style="display:inline-block;text-decoration:none;">
          <span class="detail-arrow-icon">➤</span>
        </a>
      </td>
      <td style="text-align:center;vertical-align:middle;">
        <span class="delete-row" style="cursor:pointer;">🗑️</span>
      </td>
    `;

    // Row selection
    tr.addEventListener("click", (e) => {
      if (e.target.closest("a") || e.target.classList.contains("delete-row")) return;
      selectedAppId = v.id;
    });

    // Status change
    const statusSelect = tr.querySelector(".vacancy-status-select");
    statusSelect.addEventListener("change", async (e) => {
      const newStatus = e.target.value;
      if (newStatus === "Applied") {
        v.priority = null;
        const others = vacs
          .filter((x) => x.id !== v.id && x.priority != null)
          .sort((a, b) => a.priority - b.priority);
        others.forEach((x, i) => (x.priority = i + 1));
      } else {
        if (v.priority == null) {
          const max = vacs.reduce((m, x) => Math.max(m, x.priority || 0), 0);
          v.priority = max + 1;
        }
      }
      v.status = newStatus;
      await saveVacanciesToServer(vacs);
      populateJobs(vacs);
    });

    // Delete icon
    const delIcon = tr.querySelector(".delete-row");
    delIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      selectedAppId = v.id;
      document.getElementById("delCompany").textContent = "🏢 Company: " + v.company;
      document.getElementById("delProgram").textContent = "🏷️ Program: " + v.program;
      document.getElementById("delStage").textContent = "📍 Position: " + v.jobTitle;
      const deleteModal = document.getElementById("deleteModal");
      if (deleteModal) deleteModal.style.display = "flex";
    });

    // Priority badge click
    const badge = tr.querySelector(".priority-badge");
    badge.addEventListener("click", (e) => {
      e.stopPropagation();
      if (v.status === "Applied") return;
      openVacancyPriorityModal(v, vacs);
    });

    body.appendChild(tr);
  });
}

// ---- Vacancy Priority modal ----
function openVacancyPriorityModal(vac, vacs) {
  const modal = document.getElementById("priorityModal");
  const container = document.getElementById("priorityOptions");
  container.innerHTML = "";

  for (let i = 1; i <= vacs.length; i++) {
    const opt = document.createElement("div");
    opt.className = "priority-option";
    opt.textContent = i;
    if (i === vac.priority) opt.style.fontWeight = "bold";
    opt.addEventListener("click", async () => {
      vacs.sort((x, y) => (x.priority || 9999) - (y.priority || 9999));
      const cur = vacs.findIndex((b) => b.id === vac.id);
      if (cur !== -1) { vacs.splice(cur, 1); vacs.splice(i - 1, 0, vac); }
      vacs.forEach((x, j) => (x.priority = j + 1));
      await saveVacanciesToServer(vacs);
      populateJobs(vacs);
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
function setupSearchVacancies(vacs) {
  const input = document.getElementById("searchInput");
  const list = document.getElementById("companySuggestions");
  if (!input || !list) return;

  const names = vacs.map((v) => v.company);

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
    const body = document.getElementById("vacanciesBody");
    Array.from(body.children).forEach((row) => {
      const company = row.children[1]?.textContent.toLowerCase() || "";
      row.style.display = company.includes(term) ? "" : "none";
    });
    refreshOptions(term);
  });
}

// ---- Inisialisasi halaman ----
document.addEventListener("DOMContentLoaded", async () => {
  const data = await getAllApplications(); // untuk updateHome
  const vacs = await getAllVacancies();
  populateJobs(vacs);
  setupSearchVacancies(vacs);

  // Modal tambah lowongan
  const addBtn = document.querySelector(".btn.add");
  const addModal = document.getElementById("addModal");
  const closeAdd = addModal ? addModal.querySelector(".close") : null;

  if (addBtn && addModal) {
    addBtn.addEventListener("click", () => { addModal.style.display = "flex"; });
  }
  if (closeAdd) {
    closeAdd.addEventListener("click", () => { addModal.style.display = "none"; });
  }
  window.addEventListener("click", (e) => {
    if (addModal && e.target === addModal) addModal.style.display = "none";
  });

  // Simpan lowongan baru
  const modalSaveBtn = document.getElementById("modalSave");
  if (modalSaveBtn) {
    modalSaveBtn.onclick = async () => {
      const company = document.getElementById("modalCompany").value.trim();
      const program = document.getElementById("modalProgram").value.trim();
      const jobTitle = document.getElementById("modalJobTitle").value.trim();
      const deadline = document.getElementById("modalDeadline").value;
      const link = document.getElementById("modalLink").value.trim();

      if (!company || !program || !link) {
        await showAlert("Please fill in Company, Program and Link fields.");
        return;
      }

      const fresh = await getAllVacancies();
      const newVac = {
        id: Date.now().toString(),
        company,
        program,
        jobTitle: jobTitle || "-",
        deadline: deadline || "",
        link,
        status: "Not Applied",
        priority: fresh.length + 1,
      };

      fresh.push(newVac);
      await saveVacanciesToServer(fresh);

      // Reset form
      ["modalCompany", "modalProgram", "modalJobTitle", "modalDeadline", "modalLink"].forEach(
        (id) => { document.getElementById(id).value = ""; }
      );
      addModal.style.display = "none";

      // Update lokal dan re-render
      vacs.length = 0;
      fresh.forEach((x) => vacs.push(x));
      populateJobs(vacs);
      setupSearchVacancies(vacs);
    };
  }

  // Hapus lowongan via modal konfirmasi
  const deleteConfirmBtn = document.getElementById("deleteConfirm");
  if (deleteConfirmBtn) {
    deleteConfirmBtn.onclick = async () => {
      if (!selectedAppId) return;
      const fresh = await getAllVacancies();
      const idx = fresh.findIndex((v) => String(v.id) === String(selectedAppId));
      if (idx !== -1) {
        fresh.splice(idx, 1);
        await saveVacanciesToServer(fresh);
        vacs.length = 0;
        fresh.forEach((x) => vacs.push(x));
        populateJobs(vacs);
        setupSearchVacancies(vacs);
      }
      const deleteModal = document.getElementById("deleteModal");
      if (deleteModal) deleteModal.style.display = "none";
      selectedAppId = null;
    };
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
    const refreshed = await getAllVacancies();
    populateJobs(refreshed);
    setupSearchVacancies(refreshed);
  }, 60000);
});

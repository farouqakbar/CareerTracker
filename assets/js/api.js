// ============================================================
// api.js
// Semua fungsi untuk mengambil & menyimpan data ke server
// via window.dataService (Supabase/backend)
// ============================================================

// ---- Applications ----

async function loadData() {
  try {
    return await window.dataService.getAllApplications();
  } catch (err) {
    console.error("loadData error", err);
    return [];
  }
}

async function getAllApplications() {
  return await loadData();
}

async function addApplication(app) {
  try {
    const result = await window.dataService.addApplication(app);
    localStorage.removeItem("applications");
    return result;
  } catch (err) {
    console.error("addApplication error:", err);
    return false;
  }
}

async function updateApplication(updated) {
  try {
    await window.dataService.updateApplication(updated);
    localStorage.removeItem("applications");
  } catch (err) {
    console.error("updateApplication error:", err);
  }
}

async function saveApplicationsToServer(allApps) {
  try {
    return await window.dataService.saveApplicationsToServer(allApps);
  } catch (err) {
    console.error("saveApplicationsToServer error:", err);
    return false;
  }
}

// ---- Vacancies ----

async function loadVacancies() {
  try {
    return await window.dataService.getAllVacancies();
  } catch (err) {
    console.error("loadVacancies error", err);
    return [];
  }
}

async function getAllVacancies() {
  return await loadVacancies();
}

async function updateVacancy(updated) {
  try {
    const base = await loadVacancies();
    const idx = base.findIndex((a) => a.id === updated.id);
    if (idx !== -1) {
      base[idx] = updated;
    } else {
      base.push(updated);
    }
    await saveVacanciesToServer(base);
  } catch (err) {
    console.error("updateVacancy error:", err);
  }
}

async function saveVacanciesToServer(allVacs) {
  try {
    return await window.dataService.saveVacanciesToServer(allVacs);
  } catch (err) {
    console.error("saveVacanciesToServer error:", err);
    return false;
  }
}

// ---- Utilities ----

function daysUntil(date) {
  const now = new Date();
  const d = new Date(date);
  return Math.ceil((d - now) / (1000 * 60 * 60 * 24));
}

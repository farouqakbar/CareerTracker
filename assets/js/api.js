// ============================================================
// api.js
// Semua fungsi untuk mengambil & menyimpan data ke server
// via window.dataService (Supabase/backend)
// Includes retry logic for transient failures
// ============================================================

// Helper: Retry with exponential backoff
async function retryWithBackoff(fn, retries = 3, delayMs = 1000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt === retries) throw err;
      const delay = Math.pow(2, attempt - 1) * delayMs;
      console.warn(
        `Retry attempt ${attempt}/${retries} after ${delay}ms:`,
        err.message,
      );
      await new Promise((r) => setTimeout(r, delay));
    }
  }
}

// ---- Applications ----

async function loadData() {
  try {
    return await retryWithBackoff(() =>
      window.dataService.getAllApplications(),
    );
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
    const result = await retryWithBackoff(() =>
      window.dataService.addApplication(app),
    );
    localStorage.removeItem("applications");
    return result;
  } catch (err) {
    console.error("addApplication error:", err);
    return false;
  }
}

async function updateApplication(updated) {
  try {
    await retryWithBackoff(() => window.dataService.updateApplication(updated));
    localStorage.removeItem("applications");
  } catch (err) {
    console.error("updateApplication error:", err);
    throw err; // Re-throw for caller to handle
  }
}

async function saveApplicationsToServer(allApps) {
  try {
    return await retryWithBackoff(() =>
      window.dataService.saveApplicationsToServer(allApps),
    );
  } catch (err) {
    console.error("saveApplicationsToServer error:", err);
    return false;
  }
}

async function deleteApplication(id, retries = 3) {
  try {
    // DELETE AFTER confirmation, not before!
    const result = await retryWithBackoff(
      () => window.dataService.deleteApplication(id),
      retries,
    );
    localStorage.removeItem("applications"); // Clear cache only after success
    return result;
  } catch (err) {
    console.error("deleteApplication error:", err);
    return false;
  }
}

// ---- Vacancies ----

async function loadVacancies() {
  try {
    return await retryWithBackoff(() => window.dataService.getAllVacancies());
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
    return await retryWithBackoff(() =>
      window.dataService.saveVacanciesToServer(allVacs),
    );
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

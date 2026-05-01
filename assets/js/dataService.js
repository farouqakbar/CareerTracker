// assets/js/dataService.js
// Semua operasi CRUD ke Supabase melalui window.supabaseClient

// Helper: ambil client Supabase (bisa dipanggil kapan saja, pastikan sudah di-load)
function getDb() {
  return window.supabaseClient;
}

window.dataService = {
  // ---- APPLICATIONS ----

  async getAllApplications() {
    const userId = localStorage.getItem("currentUserId");
    if (!userId) {
      console.error(
        "[dataService] No userId found - user may not be authenticated",
      );
      throw new Error("User not authenticated");
    }
    const { data, error } = await getDb()
      .from("applications")
      .select("*")
      .eq("user_id", userId)
      .order("priority", { ascending: true });
    if (error) {
      console.error("getAllApplications:", error);
      throw new Error("Failed to fetch applications: " + error.message);
    }
    // Kembalikan dalam format yang dipakai aplikasi
    return (data || []).map((row) => ({
      id: row.id,
      company: row.company,
      program: row.program,
      jobTitle: row.job_title,
      applyDate: row.apply_date,
      status: row.status,
      priority: row.priority,
      deadline: row.deadline,
      stages: row.stages || [],
    }));
  },

  async saveApplicationsToServer(allApps) {
    const userId = localStorage.getItem("currentUserId");
    if (!userId) return false;
    // Hapus semua data lama milik user ini, lalu insert baru (upsert)
    const rows = allApps.map((a) => ({
      id: a.id,
      user_id: userId,
      company: a.company,
      program: a.program,
      job_title: a.jobTitle || "",
      apply_date: a.applyDate || "",
      status: a.status || "Pending",
      priority: a.priority || 1,
      deadline: a.deadline || "",
      stages: a.stages || [],
      updated_at: new Date().toISOString(),
    }));
    const { error } = await getDb().from("applications").upsert(rows);
    if (error) {
      console.error("saveApplicationsToServer:", error);
      return false;
    }
    return true;
  },

  async addApplication(app) {
    const userId = localStorage.getItem("currentUserId");
    if (!userId) return false;
    const { error } = await getDb()
      .from("applications")
      .insert({
        id: app.id,
        user_id: userId,
        company: app.company,
        program: app.program,
        job_title: app.jobTitle || "",
        apply_date: app.applyDate || "",
        status: app.status || "Pending",
        priority: app.priority || 1,
        deadline: app.deadline || "",
        stages: app.stages || [],
      });
    if (error) {
      console.error("addApplication:", error);
      return false;
    }
    return true;
  },

  async updateApplication(updated) {
    const { error } = await getDb()
      .from("applications")
      .update({
        company: updated.company,
        program: updated.program,
        job_title: updated.jobTitle || "",
        status: updated.status || "Pending",
        priority: updated.priority,
        deadline: updated.deadline || "",
        stages: updated.stages || [],
        updated_at: new Date().toISOString(),
      })
      .eq("id", updated.id);
    if (error) {
      console.error("updateApplication:", error);
    }
  },

  async deleteApplication(id) {
    const { error } = await getDb().from("applications").delete().eq("id", id);
    if (error) {
      console.error("deleteApplication:", error);
      return false;
    }
    return true;
  },

  // ---- VACANCIES ----

  async getAllVacancies() {
    const userId = localStorage.getItem("currentUserId");
    if (!userId) return [];
    const { data, error } = await getDb()
      .from("vacancies")
      .select("*")
      .eq("user_id", userId)
      .order("priority", { ascending: true, nullsFirst: false });
    if (error) {
      console.error("getAllVacancies:", error);
      return [];
    }
    return (data || []).map((row) => ({
      id: row.id,
      company: row.company,
      program: row.program,
      jobTitle: row.job_title,
      deadline: row.deadline,
      link: row.link,
      status: row.status,
      priority: row.priority,
    }));
  },

  async saveVacanciesToServer(allVacs) {
    const userId = localStorage.getItem("currentUserId");
    if (!userId) return false;
    // Hapus data lama lalu upsert baru
    await getDb().from("vacancies").delete().eq("user_id", userId);
    if (allVacs.length === 0) return true;
    const rows = allVacs.map((v) => ({
      id: v.id,
      user_id: userId,
      company: v.company,
      program: v.program,
      job_title: v.jobTitle || "-",
      deadline: v.deadline || "",
      link: v.link || "",
      status: v.status || "Not Applied",
      priority: v.priority ?? null,
    }));
    const { error } = await getDb().from("vacancies").insert(rows);
    if (error) {
      console.error("saveVacanciesToServer:", error);
      return false;
    }
    return true;
  },
};

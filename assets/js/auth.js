// assets/js/auth.js
// Autentikasi berbasis tabel 'users' di Supabase

window.auth = {
  async login(username, password) {
    const db = window.supabaseClient; // ambil saat fungsi dipanggil, bukan saat file di-load
    if (!db) return { success: false, error: "Supabase not connected" };

    const { data, error } = await db
      .from("users")
      .select("*")
      .eq("username", username.trim())
      .single();

    if (error || !data) {
      return { success: false, error: "Username not found" };
    }

    if (data.password_hash !== password) {
      return { success: false, error: "Incorrect password" };
    }

    return {
      success: true,
      displayName: data.display_name || username,
      profilePhoto: data.profile_photo || "",
    };
  },

  async register(username, password) {
    const db = window.supabaseClient;
    if (!db) return { success: false, error: "Supabase not connected" };

    // Cek apakah username sudah ada
    const { data: existing } = await db
      .from("users")
      .select("username")
      .eq("username", username.trim())
      .single();

    if (existing) {
      return { success: false, error: "Username already taken" };
    }

    const { error } = await db.from("users").insert({
      username: username.trim(),
      password_hash: password,
      display_name: username.trim(),
    });

    if (error) {
      console.error("register error:", error);
      return { success: false, error: "Registration failed" };
    }

    return { success: true };
  },

  logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("displayName");
    localStorage.removeItem("profilePhoto");
    const path = window.location.pathname;
    const inPages = path.includes("/pages/");
    window.location.href = inPages ? "login.html" : "pages/login.html";
  },
};

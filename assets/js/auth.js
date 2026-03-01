// assets/js/auth.js — v2: SHA-256 hash, privacy policy, change password

async function hashPassword(password) {
  const enc = new TextEncoder();
  const salt = "CareerTracker_2026_salt";
  const data = enc.encode(salt + password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

window.auth = {
  hashPassword,

  async login(username, password) {
    const db = window.supabaseClient;
    if (!db) return { success: false, error: "Supabase not connected" };
    const { data, error } = await db.from("users").select("*").eq("username", username.trim()).single();
    if (error || !data) return { success: false, error: "Username not found" };
    const hashedInput = await hashPassword(password);
    const match = data.password_hash === hashedInput || data.password_hash === password;
    if (!match) return { success: false, error: "Incorrect password" };
    if (data.password_hash === password) {
      await db.from("users").update({ password_hash: hashedInput }).eq("username", username.trim());
    }
    return { success: true, displayName: data.display_name || username, profilePhoto: data.profile_photo || "" };
  },

  async register(username, password, privacyAccepted) {
    const db = window.supabaseClient;
    if (!db) return { success: false, error: "Supabase not connected" };
    if (!privacyAccepted) return { success: false, error: "You must accept the Privacy Policy to create an account." };
    const { data: existing } = await db.from("users").select("username").eq("username", username.trim()).single();
    if (existing) return { success: false, error: "Username already taken" };
    const hashed = await hashPassword(password);
    const { error } = await db.from("users").insert({ username: username.trim(), password_hash: hashed, display_name: username.trim(), privacy_accepted: true, privacy_accepted_at: new Date().toISOString() });
    if (error) return { success: false, error: "Registration failed: " + error.message };
    return { success: true };
  },

  async changePassword(username, currentPassword, newPassword) {
    const db = window.supabaseClient;
    if (!db) return { success: false, error: "Supabase not connected" };
    const { data, error } = await db.from("users").select("password_hash").eq("username", username).single();
    if (error || !data) return { success: false, error: "User not found" };
    const hashedCurrent = await hashPassword(currentPassword);
    const match = data.password_hash === hashedCurrent || data.password_hash === currentPassword;
    if (!match) return { success: false, error: "Current password is incorrect" };
    const hashedNew = await hashPassword(newPassword);
    const { error: updErr } = await db.from("users").update({ password_hash: hashedNew }).eq("username", username);
    if (updErr) return { success: false, error: "Failed to update password" };
    return { success: true };
  },

  async deleteAccount(username) {
    const db = window.supabaseClient;
    if (!db) return { success: false, error: "Supabase not connected" };
    await db.from("messages").delete().eq("from_username", username);
    await db.from("bug_reports").delete().eq("reporter_username", username);
    await db.from("feature_comments").delete().eq("author_username", username);
    await db.from("feature_votes").delete().eq("username", username);
    const { error } = await db.from("users").delete().eq("username", username);
    if (error) return { success: false, error: error.message };
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

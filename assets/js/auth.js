// assets/js/auth.js — FINAL (Supabase Auth Unified)

const supabaseUrl = "https://kojsyhaxcrtmmjlqxyme.supabase.co";
// Ganti nilai ini dengan anon key dari dashboard Supabase kamu:
// Project Settings → API → Project API keys → anon public
const supabaseKey = "YOUR_SUPABASE_ANON_KEY";

window.supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// ==========================
// 🔷 GET CURRENT USER
// ==========================
async function getCurrentUser() {
  try {
    const {
      data: { session },
    } = await window.supabaseClient.auth.getSession();
    return session?.user || null;
  } catch (e) {
    console.error("getCurrentUser error:", e);
    return null;
  }
}

// ==========================
// 🔷 SAVE USER TO LOCAL
// ==========================
function saveUser(user) {
  localStorage.setItem("currentUser", user.email);
  localStorage.setItem(
    "displayName",
    user.user_metadata?.full_name || user.email,
  );
  localStorage.setItem("profilePhoto", user.user_metadata?.avatar_url || "");
}

// ==========================
// 🔷 GOOGLE LOGIN
// ==========================
async function loginWithGoogle() {
  const { error } = await window.supabaseClient.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "https://farouqakbar.github.io/CareerTracker/pages/home.html",
    },
  });
  if (error) return { success: false, error: error.message };
  return { success: true };
}

// ==========================
// 🔷 EMAIL LOGIN
// ==========================
async function loginWithEmail(email, password) {
  const { data, error } = await window.supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { success: false, error: error.message };

  if (data?.user) saveUser(data.user);
  return { success: true };
}

// ==========================
// 🔷 REGISTER EMAIL
// ==========================
async function register(email, password) {
  const { data, error } = await window.supabaseClient.auth.signUp({
    email,
    password,
  });

  if (error) return { success: false, error: error.message };

  // Supabase mengirim email verifikasi — beri tahu user
  return { success: true, data };
}

// ==========================
// 🔷 SYNC USER KE DATABASE
// ==========================
async function syncUserToDB(user) {
  if (!user) return;

  const { error } = await window.supabaseClient.from("users").upsert(
    {
      username: user.email,
      display_name: user.user_metadata?.full_name || user.email,
      profile_photo: user.user_metadata?.avatar_url || "",
    },
    { onConflict: "username" },
  );

  if (error) console.error("syncUserToDB error:", error.message);
}

// ==========================
// 🔷 CHANGE PASSWORD
// ==========================
async function changePassword(newPassword) {
  const { error } = await window.supabaseClient.auth.updateUser({
    password: newPassword,
  });

  if (error) return { success: false, error: error.message };
  return { success: true };
}

// ==========================
// 🔷 LOGOUT
// ==========================
async function logout() {
  await window.supabaseClient.auth.signOut();
  localStorage.clear();

  const inPages = window.location.pathname.includes("/pages/");
  window.location.href = inPages ? "login.html" : "pages/login.html";
}

// ==========================
// EXPORT
// ==========================
window.auth = {
  getCurrentUser,
  saveUser,
  loginWithGoogle,
  loginWithEmail,
  register,
  syncUserToDB,
  changePassword,
  logout,
};

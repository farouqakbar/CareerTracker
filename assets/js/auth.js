// assets/js/auth.js — v5 FIXED
// Requires supabaseClient.js to be loaded FIRST (provides window.supabaseClient)
// login.html MUST include supabaseClient.js before this file

// ==========================
// 🔷 SAFE CLIENT GETTER
// Always use this instead of window.supabaseClient directly
// so we get a clear error if supabaseClient.js was not loaded
// ==========================
function getClient() {
  if (!window.supabaseClient) {
    console.error(
      "[auth.js] window.supabaseClient is undefined. " +
      "Make sure supabaseClient.js is loaded BEFORE auth.js in your HTML."
    );
    throw new Error("Supabase client not initialised. Load supabaseClient.js first.");
  }
  return window.supabaseClient;
}

// ==========================
// 🔷 DETECT BASE URL
// Works on GitHub Pages, Netlify, localhost, etc.
// ==========================
function getBaseUrl() {
  const loc  = window.location;
  const path = loc.pathname;
  // e.g. /Traqio/pages/login.html  → base = origin + /Traqio
  if (path.includes("/pages/")) {
    return loc.origin + path.substring(0, path.indexOf("/pages/"));
  }
  return loc.origin;
}

// ==========================
// 🔷 GET CURRENT USER
// ==========================
async function getCurrentUser() {
  try {
    const db = getClient();
    const { data: { session } } = await db.auth.getSession();
    return session?.user || null;
  } catch (e) {
    console.error("getCurrentUser error:", e);
    return null;
  }
}

// ==========================
// 🔷 SAVE USER TO LOCALSTORAGE
// ==========================
function saveUser(user) {
  localStorage.setItem("currentUser", user.email || user.id);
  localStorage.setItem(
    "displayName",
    user.user_metadata?.full_name || user.email || "User"
  );
  localStorage.setItem("profilePhoto", user.user_metadata?.avatar_url || "");
}

// ==========================
// 🔷 GOOGLE LOGIN
// ==========================
async function loginWithGoogle() {
  try {
    const db         = getClient();
    const redirectTo = getBaseUrl() + "/pages/home.html";

    const { error } = await db.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// ==========================
// 🔷 EMAIL LOGIN
// ==========================
async function loginWithEmail(email, password) {
  try {
    const db = getClient();
    const { data, error } = await db.auth.signInWithPassword({ email, password });
    if (error) return { success: false, error: error.message };
    if (data?.user) saveUser(data.user);
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// ==========================
// 🔷 REGISTER
// ==========================
async function register(email, password) {
  try {
    const db = getClient();
    const { data, error } = await db.auth.signUp({ email, password });
    if (error) return { success: false, error: error.message };
    return { success: true, data };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// ==========================
// 🔷 SYNC USER TO DATABASE
// ==========================
async function syncUserToDB(user) {
  if (!user) return;
  try {
    const db = getClient();
    await db.from("users").upsert(
      {
        username:      user.email || user.id,
        display_name:  user.user_metadata?.full_name || user.email || "User",
        profile_photo: user.user_metadata?.avatar_url || "",
      },
      { onConflict: "username" }
    );
  } catch (e) {
    console.error("syncUserToDB error:", e.message);
  }
}

// ==========================
// 🔷 CHANGE PASSWORD
// ==========================
async function changePassword(username, currentPw, newPassword) {
  try {
    const db = getClient();
    const { error } = await db.auth.updateUser({ password: newPassword });
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// ==========================
// 🔷 DELETE ACCOUNT
// ==========================
async function deleteAccount(username) {
  try {
    const db = getClient();
    await db.from("applications").delete().eq("username", username);
    await db.from("vacancies").delete().eq("username", username);
    await db.from("users").delete().eq("username", username);
    await db.auth.signOut();
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// ==========================
// 🔷 LOGOUT
// ==========================
async function logout() {
  try {
    const db = getClient();
    await db.auth.signOut();
  } catch (e) {
    console.warn("logout error:", e.message);
  }
  localStorage.clear();
  const inPages = window.location.pathname.includes("/pages/");
  window.location.href = inPages ? "login.html" : "pages/login.html";
}

// ==========================
// 🔷 OAUTH REDIRECT HANDLER
// Catches Google redirect back — runs on every page load
// ==========================
(function setupAuthListener() {
  try {
    const db = getClient();
    db.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        saveUser(session.user);
        await syncUserToDB(session.user);
        // Only redirect if currently on login page
        if (window.location.pathname.includes("login.html")) {
          window.location.href = "home.html";
        }
      }
    });
  } catch (e) {
    // supabaseClient not ready yet — listener will be set up later
    console.warn("Auth listener deferred:", e.message);
  }
})();

// ==========================
// 🔷 EXPORT
// ==========================
window.auth = {
  getCurrentUser,
  saveUser,
  loginWithGoogle,
  loginWithEmail,
  register,
  syncUserToDB,
  changePassword,
  deleteAccount,
  logout,
};

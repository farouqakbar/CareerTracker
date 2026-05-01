// assets/js/auth.js — v6 GitHub Pages
// Requires supabaseClient.js to be loaded FIRST

// ==========================
// 🔷 SAFE CLIENT GETTER
// ==========================
function getClient() {
  if (!window.supabaseClient) {
    console.error("[auth.js] window.supabaseClient is undefined.");
    throw new Error(
      "Supabase client not initialised. Load supabaseClient.js first.",
    );
  }
  return window.supabaseClient;
}

// ==========================
// 🔷 DETECT BASE URL
// Detects root of the project, works for:
//   - GitHub Pages: https://user.github.io/repo-name/pages/login.html
//   - Root deploy:  https://myapp.com/pages/login.html
//   - localhost:    http://localhost:5500/pages/login.html
// ==========================
function getBaseUrl() {
  const loc = window.location;
  const path = loc.pathname;

  // If inside /pages/ subfolder, base = everything before /pages/
  if (path.includes("/pages/")) {
    const base = path.substring(0, path.indexOf("/pages/"));
    return loc.origin + base;
  }

  // If at root or index.html level
  const lastSlash = path.lastIndexOf("/");
  return loc.origin + path.substring(0, lastSlash);
}

// Build the full login page URL dynamically
function getLoginUrl() {
  return getBaseUrl() + "/pages/login.html";
}

// Build the full home page URL dynamically
function getHomeUrl() {
  return getBaseUrl() + "/pages/home.html";
}

// ==========================
// 🔷 GET CURRENT USER
// ==========================
async function getCurrentUser() {
  try {
    const db = getClient();
    const {
      data: { session },
    } = await db.auth.getSession();
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
    user.user_metadata?.full_name || user.email || "User",
  );
  localStorage.setItem("profilePhoto", user.user_metadata?.avatar_url || "");
}

// ==========================
// 🔷 GOOGLE LOGIN
// redirectTo = login.html — Supabase will redirect back here with #access_token
// which our hash handler below will catch and forward to home.html
// ==========================
async function loginWithGoogle() {
  try {
    const db = getClient();
    const redirectTo = getLoginUrl();

    console.log("[auth] Google OAuth redirectTo:", redirectTo);

    const { error } = await db.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
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
    const { data, error } = await db.auth.signInWithPassword({
      email,
      password,
    });
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
        username: user.email || user.id,
        display_name: user.user_metadata?.full_name || user.email || "User",
        profile_photo: user.user_metadata?.avatar_url || "",
      },
      { onConflict: "username" },
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
  window.location.href = getLoginUrl();
}

// ==========================
// 🔷 OAUTH REDIRECT HANDLER
// Handles the #access_token=... hash that Supabase appends after Google login.
// This fires on EVERY page load — safe because it only acts when hash is present.
// ==========================
(function setupAuthListener() {
  try {
    const db = getClient();

    // ── Case 1: OAuth returned a hash token on this page ──
    // e.g. https://user.github.io/repo/#access_token=...
    //   or https://user.github.io/repo/pages/login.html#access_token=...
    const hash = window.location.hash;
    if (hash && hash.includes("access_token=")) {
      // Supabase v2 auto-processes the hash when getSession() is called
      db.auth.getSession().then(({ data: { session }, error }) => {
        if (error) {
          console.error("OAuth session error:", error.message);
          return;
        }
        if (session?.user) {
          saveUser(session.user);
          syncUserToDB(session.user).then(() => {
            // Clear the hash then go to home
            window.location.replace(getHomeUrl());
          });
        } else {
          // Token invalid/expired — go back to login
          window.location.replace(getLoginUrl());
        }
      });
      return; // Stop — wait for the redirect above
    }

    // ── Case 2: Normal auth state change (email login, session restore) ──
    db.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        saveUser(session.user);
        await syncUserToDB(session.user);
        // Only auto-redirect when on the login page itself
        if (window.location.pathname.includes("login.html")) {
          window.location.href = getHomeUrl();
        }
      }
    });
  } catch (e) {
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

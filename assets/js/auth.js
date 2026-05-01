// assets/js/auth.js — v9 (Google-only login)
// Requires supabaseClient.js to be loaded FIRST

// ==========================
// SAFE CLIENT GETTER
// ==========================
function getClient() {
  if (!window.supabaseClient) {
    console.error("[auth.js] window.supabaseClient is undefined.");
    throw new Error("Supabase client not initialised. Load supabaseClient.js first.");
  }
  return window.supabaseClient;
}

// ==========================
// DETECT BASE URL
// ==========================
function getBaseUrl() {
  const path = window.location.pathname;
  if (path.includes("/pages/")) {
    return window.location.origin + path.substring(0, path.indexOf("/pages/"));
  }
  const lastSlash = path.lastIndexOf("/");
  return window.location.origin + path.substring(0, lastSlash);
}

function getLoginUrl() {
  return getBaseUrl() + "/pages/login.html";
}

function getHomeUrl() {
  return getBaseUrl() + "/pages/home.html";
}

// ==========================
// GET CURRENT USER
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
// SAVE USER TO LOCALSTORAGE
// FIX: use consistent key "currentUserId" (auth UUID) and "currentUserEmail"
// ==========================
function saveUser(user) {
  localStorage.setItem("currentUserId",    user.id);
  localStorage.setItem("currentUserEmail", user.email || "");
  localStorage.setItem(
    "displayName",
    user.user_metadata?.full_name || user.email || "User"
  );
  localStorage.setItem("profilePhoto", user.user_metadata?.avatar_url || "");
}

// ==========================
// GOOGLE LOGIN
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
// SYNC USER TO DATABASE
// FIX: use user.id (UUID) as PK, store email separately
// Table schema expected:
//   id            uuid PRIMARY KEY   ← auth UUID
//   email         text UNIQUE
//   display_name  text
//   profile_photo text
// ==========================
async function syncUserToDB(user) {
  if (!user) return;
  try {
    const db = getClient();
    await db.from("users").upsert(
      {
        id:            user.id,
        email:         user.email || "",
        display_name:  user.user_metadata?.full_name || user.email || "User",
        profile_photo: user.user_metadata?.avatar_url || "",
      },
      { onConflict: "id" }
    );
  } catch (e) {
    console.error("syncUserToDB error:", e.message);
  }
}


// ==========================
// DELETE ACCOUNT
// FIX: also deletes Supabase Auth user via Edge Function or admin API
// Note: Supabase JS client cannot delete auth users client-side.
// You need a Supabase Edge Function "delete-user" that calls admin.deleteUser(id).
// Falls back to DB-only deletion if Edge Function is unavailable.
// ==========================
async function deleteAccount() {
  try {
    const db  = getClient();
    const userId = localStorage.getItem("currentUserId");
    const email  = localStorage.getItem("currentUserEmail");

    if (!userId) return { success: false, error: "No active session." };

    // Delete user's data rows (use id or email depending on your FK setup)
    await db.from("applications").delete().eq("user_id", userId);
    await db.from("vacancies").delete().eq("user_id", userId);
    await db.from("users").delete().eq("id", userId);

    // Delete Supabase Auth user via Edge Function
    try {
      const { data: { session } } = await db.auth.getSession();
      const token = session?.access_token;
      if (token) {
        await fetch(`${db.supabaseUrl}/functions/v1/delete-user`, {
          method:  "POST",
          headers: {
            "Content-Type":  "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ user_id: userId }),
        });
      }
    } catch (efErr) {
      // Edge function optional — log but don't block
      console.warn("delete-user edge function unavailable:", efErr.message);
    }

    await db.auth.signOut();
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// ==========================
// LOGOUT
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
// ADMIN CHECK
// FIX: expose isAdmin helper for menu show/hide
// Add an "is_admin" boolean column to your users table.
// ==========================
async function isAdmin() {
  try {
    const db     = getClient();
    const userId = localStorage.getItem("currentUserId");
    if (!userId) return false;
    const { data } = await db
      .from("users")
      .select("is_admin")
      .eq("id", userId)
      .single();
    return data?.is_admin === true;
  } catch {
    return false;
  }
}

// ==========================
// AUTH STATE LISTENER
// ==========================
(function setupAuthListener() {
  try {
    const db = getClient();

    db.auth.onAuthStateChange(async (event, session) => {
      console.log("[auth] event:", event, "| user:", session?.user?.email || "none");

      if (event === "SIGNED_IN" && session?.user) {
        saveUser(session.user);
        await syncUserToDB(session.user);

        if (window.location.pathname.includes("login.html")) {
          window.location.replace(getHomeUrl());
        }
      }

      if (event === "SIGNED_OUT") {
        if (!window.location.pathname.includes("login.html")) {
          window.location.replace(getLoginUrl());
        }
      }
    });

  } catch (e) {
    console.warn("Auth listener deferred:", e.message);
  }
})();

// ==========================
// EXPORT
// ==========================
window.auth = {
  getCurrentUser,
  saveUser,
  loginWithGoogle,
  syncUserToDB,
  deleteAccount,
  logout,
  isAdmin,
};

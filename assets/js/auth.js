// assets/js/auth.js — v10 (Google-only, GitHub Pages ready)
// Requires: supabaseClient.js dimuat SEBELUM file ini

// ==========================
// SAFE CLIENT GETTER
// ==========================
function getClient() {
  if (!window.supabaseClient) {
    throw new Error("[auth.js] window.supabaseClient belum tersedia. Muat supabaseClient.js lebih dulu.");
  }
  return window.supabaseClient;
}

// ==========================
// URL HELPERS
// Bekerja untuk:
//   GitHub Pages : https://farouqakbar.github.io/CareerTracker/pages/login.html
//   Localhost    : http://localhost:5500/pages/login.html
//   Custom domain: https://myapp.com/pages/login.html
// ==========================
function getBaseUrl() {
  const { origin, pathname } = window.location;
  const pagesIdx = pathname.indexOf("/pages/");
  if (pagesIdx !== -1) {
    return origin + pathname.substring(0, pagesIdx);
  }
  return origin + pathname.substring(0, pathname.lastIndexOf("/"));
}

function getLoginUrl() { return getBaseUrl() + "/pages/login.html"; }
function getHomeUrl()  { return getBaseUrl() + "/pages/home.html";  }

// Debug — panggil window.auth._debug() di console
function _debug() {
  console.table({
    pathname: window.location.pathname,
    baseUrl:  getBaseUrl(),
    loginUrl: getLoginUrl(),
    homeUrl:  getHomeUrl(),
  });
}

// ==========================
// SIMPAN USER KE LOCALSTORAGE
// ==========================
function saveUser(user) {
  if (!user) return;
  localStorage.setItem("currentUserId",    user.id);
  localStorage.setItem("currentUserEmail", user.email || "");
  localStorage.setItem("displayName",
    user.user_metadata?.full_name || user.email || "User"
  );
  localStorage.setItem("profilePhoto", user.user_metadata?.avatar_url || "");
}

// ==========================
// SYNC USER KE DATABASE
// Schema users: id uuid PK, email text, display_name text, profile_photo text
// ==========================
async function syncUserToDB(user) {
  if (!user) return;
  try {
    const db = getClient();
    const { error } = await db.from("users").upsert(
      {
        id:            user.id,
        email:         user.email || "",
        display_name:  user.user_metadata?.full_name || user.email || "User",
        profile_photo: user.user_metadata?.avatar_url || "",
      },
      { onConflict: "id" }
    );
    if (error) console.warn("[auth] syncUserToDB:", error.message);
  } catch (e) {
    console.error("[auth] syncUserToDB error:", e.message);
  }
}

// ==========================
// GET CURRENT USER
// ==========================
async function getCurrentUser() {
  try {
    const { data: { session } } = await getClient().auth.getSession();
    return session?.user || null;
  } catch (e) {
    console.error("[auth] getCurrentUser:", e.message);
    return null;
  }
}

// ==========================
// LOGIN DENGAN GOOGLE
// redirectTo HARUS didaftarkan di:
//   Supabase Dashboard → Authentication → URL Configuration → Redirect URLs
// Tambahkan: https://farouqakbar.github.io/CareerTracker/pages/login.html
// ==========================
async function loginWithGoogle() {
  try {
    const db         = getClient();
    const redirectTo = getLoginUrl();
    console.log("[auth] loginWithGoogle → redirectTo:", redirectTo);

    const { error } = await db.auth.signInWithOAuth({
      provider: "google",
      options:  { redirectTo },
    });

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// ==========================
// LOGOUT
// ==========================
async function logout() {
  try { await getClient().auth.signOut(); }
  catch (e) { console.warn("[auth] logout:", e.message); }
  localStorage.clear();
  window.location.href = getLoginUrl();
}

// ==========================
// HAPUS AKUN
// ==========================
async function deleteAccount() {
  try {
    const db     = getClient();
    const userId = localStorage.getItem("currentUserId");
    if (!userId) return { success: false, error: "Tidak ada sesi aktif." };

    await db.from("applications").delete().eq("user_id", userId);
    await db.from("vacancies").delete().eq("user_id", userId);
    await db.from("users").delete().eq("id", userId);

    // Coba hapus auth user via Edge Function (opsional)
    try {
      const { data: { session } } = await db.auth.getSession();
      if (session?.access_token) {
        await fetch(`${db.supabaseUrl}/functions/v1/delete-user`, {
          method:  "POST",
          headers: {
            "Content-Type":  "application/json",
            "Authorization": `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ user_id: userId }),
        });
      }
    } catch { /* Edge function opsional */ }

    await db.auth.signOut();
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// ==========================
// CEK ADMIN
// ==========================
async function isAdmin() {
  try {
    const userId = localStorage.getItem("currentUserId");
    if (!userId) return false;
    const { data } = await getClient()
      .from("users").select("is_admin").eq("id", userId).single();
    return data?.is_admin === true;
  } catch { return false; }
}

// ==========================
// AUTH STATE LISTENER
// Menangani redirect setelah Google OAuth callback
// ==========================
(function setupAuthListener() {
  try {
    const db = getClient();

    db.auth.onAuthStateChange(async (event, session) => {
      console.log("[auth] event:", event, "user:", session?.user?.email || "-");

      if (event === "SIGNED_IN" && session?.user) {
        saveUser(session.user);
        await syncUserToDB(session.user);

        // Redirect ke home jika masih di halaman login
        if (window.location.pathname.includes("login")) {
          console.log("[auth] SIGNED_IN di login page → redirect ke", getHomeUrl());
          // Bersihkan #access_token dari URL sebelum redirect
          history.replaceState(null, "", window.location.pathname + window.location.search);
          window.location.href = getHomeUrl();
        }
      }

      if (event === "SIGNED_OUT") {
        if (!window.location.pathname.includes("login")) {
          window.location.href = getLoginUrl();
        }
      }
    });

  } catch (e) {
    console.warn("[auth] listener error:", e.message);
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
  _debug,
  _getHomeUrl:  getHomeUrl,
  _getLoginUrl: getLoginUrl,
};

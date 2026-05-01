// assets/js/supabaseClient.js
// Singleton pattern — hanya buat client SEKALI untuk mencegah lock contention
// Versi: v2 — lebih robust dengan PKCE flow & guard yang lebih ketat

(function () {
  const SUPABASE_URL = "https://kojsyhaxcrtmmjlqxyme.supabase.co";
  const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvanN5aGF4Y3J0bW1qbHF4eW1lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1NzQ0NDgsImV4cCI6MjA4NzE1MDQ0OH0.JSi5n22QLouHwKO66oSTy8GV6IT2jXRQlA7T8ar8iXk";

  // Guard: jika sudah ada client yang valid, jangan buat ulang
  if (window.supabaseClient && typeof window.supabaseClient.auth === "object") {
    console.log("[supabaseClient] Reused existing singleton.");
    return;
  }

  // Pastikan library Supabase sudah dimuat
  if (typeof window.supabase === "undefined" || typeof window.supabase.createClient !== "function") {
    console.error(
      "[supabaseClient] FATAL: window.supabase belum tersedia. " +
      "Pastikan <script src='supabase.js'> dimuat SEBELUM supabaseClient.js."
    );
    return;
  }

  try {
    window.supabaseClient = window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_ANON_KEY,
      {
        auth: {
          storage: window.localStorage,
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true,
          storageKey: "sb-traqio-auth-token",
        },
        global: {
          headers: { "x-app-name": "Traqio" },
        },
      }
    );
    console.log("[supabaseClient] Client created successfully.");
  } catch (err) {
    console.error("[supabaseClient] Gagal membuat client:", err.message);
  }
})();

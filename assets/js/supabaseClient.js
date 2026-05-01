// assets/js/supabaseClient.js
// Singleton pattern — hanya buat client SEKALI untuk mencegah lock contention

const SUPABASE_URL = "https://kojsyhaxcrtmmjlqxyme.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvanN5aGF4Y3J0bW1qbHF4eW1lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1NzQ0NDgsImV4cCI6MjA4NzE1MDQ0OH0.JSi5n22QLouHwKO66oSTy8GV6IT2jXRQlA7T8ar8iXk";

// Guard: jika sudah ada client, jangan buat ulang
if (!window.supabaseClient) {
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
    }
  );
  console.log("Supabase client ready:", window.supabaseClient);
} else {
  console.log("Supabase client reused (singleton)");
}

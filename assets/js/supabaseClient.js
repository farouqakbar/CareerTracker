// assets/js/supabaseClient.js

const SUPABASE_URL = "https://kojsyhaxcrtmmjlqxyme.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvanN5aGF4Y3J0bW1qbHF4eW1lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1NzQ0NDgsImV4cCI6MjA4NzE1MDQ0OH0.JSi5n22QLouHwKO66oSTy8GV6IT2jXRQlA7T8ar8iXk";

// Supabase v2 CDN mengekspos dirinya sebagai window.supabase (bukan variabel global langsung)
window.supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
);

console.log("✅ Supabase client ready:", window.supabaseClient);

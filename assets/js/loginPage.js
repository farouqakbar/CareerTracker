// assets/js/loginPage.js — v4 (Supabase Auth Clean + Modal Fix)

document.addEventListener("DOMContentLoaded", async () => {

  // ==========================
  // 🔷 CEK SESSION (Supabase)
  // ==========================
  const user = await window.auth.getCurrentUser();

  if (user) {
    window.location.href = "home.html";
    return;
  }

  // ==========================
  // 🔷 ELEMENT
  // ==========================
  const loginBtn       = document.getElementById("loginBtn");
  const googleBtn      = document.getElementById("googleLoginBtn");
  const emailInput     = document.getElementById("usernameInput");
  const passwordInput  = document.getElementById("passwordInput");

  // Modal elements
  const signupModal    = document.getElementById("signupModal");
  const signupLink     = document.getElementById("signupLink");
  const closeSignup    = document.getElementById("closeSignup");
  const loginLink      = document.getElementById("loginLink");

  // ==========================
  // 🔷 MODAL OPEN / CLOSE
  // ==========================
  function openModal() {
    if (signupModal) signupModal.style.display = "flex";
  }

  function closeModal() {
    if (signupModal) signupModal.style.display = "none";
  }

  if (signupLink)  signupLink.addEventListener("click",  (e) => { e.preventDefault(); openModal(); });
  if (closeSignup) closeSignup.addEventListener("click", closeModal);
  if (loginLink)   loginLink.addEventListener("click",   (e) => { e.preventDefault(); closeModal(); });

  // Klik di luar modal → tutup
  window.addEventListener("click", (e) => {
    if (e.target === signupModal) closeModal();
  });

  // ==========================
  // 🔷 LOGIN EMAIL
  // ==========================
  async function doLogin() {
    const email    = (emailInput?.value    || "").trim();
    const password = (passwordInput?.value || "").trim();

    if (!email || !password) {
      await showAlert("Please enter email and password");
      return;
    }

    // Validasi format email sederhana
    if (!/\S+@\S+\.\S+/.test(email)) {
      await showAlert("Please enter a valid email address");
      return;
    }

    loginBtn.disabled    = true;
    loginBtn.textContent = "Signing in...";

    const result = await window.auth.loginWithEmail(email, password);

    if (result.success) {
      window.location.href = "home.html";
    } else {
      await showAlert(result.error || "Login failed. Check your email and password.");
      loginBtn.disabled    = false;
      loginBtn.textContent = "Sign In";
    }
  }

  // ==========================
  // 🔷 GOOGLE LOGIN
  // ==========================
  if (googleBtn) {
    googleBtn.addEventListener("click", async () => {
      googleBtn.disabled    = true;
      googleBtn.textContent = "Redirecting...";
      await window.auth.loginWithGoogle();
      // Jika gagal (misal popup diblokir), re-enable tombol
      setTimeout(() => {
        googleBtn.disabled    = false;
        googleBtn.innerHTML   = `<svg width="18" height="18" viewBox="0 0 24 24" style="vertical-align:middle;margin-right:6px;"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>Sign in with Google`;
      }, 3000);
    });
  }

  // ==========================
  // 🔷 BUTTON LOGIN
  // ==========================
  if (loginBtn) {
    loginBtn.addEventListener("click", doLogin);
  }

  // Enter key di password
  if (passwordInput) {
    passwordInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") doLogin();
    });
  }

  // Enter key di email → pindah ke password
  if (emailInput) {
    emailInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") passwordInput?.focus();
    });
  }

  // ==========================
  // 🔷 SIGNUP (EMAIL)
  // ==========================
  const signupBtn = document.getElementById("signupBtn");

  if (signupBtn) {
    signupBtn.addEventListener("click", async () => {
      const email           = (document.getElementById("signupUsername")?.value        || "").trim();
      const password        = (document.getElementById("signupPassword")?.value        || "").trim();
      const confirmPassword = (document.getElementById("signupConfirmPassword")?.value || "").trim();
      const privacyChecked  =  document.getElementById("privacyCheck")?.checked;

      if (!email || !password || !confirmPassword) {
        await showAlert("Please fill all fields");
        return;
      }

      if (!/\S+@\S+\.\S+/.test(email)) {
        await showAlert("Please enter a valid email address");
        return;
      }

      if (password !== confirmPassword) {
        await showAlert("Passwords do not match");
        return;
      }

      if (password.length < 8) {
        await showAlert("Password must be at least 8 characters");
        return;
      }

      if (!privacyChecked) {
        await showAlert("Please agree to the Privacy Policy and Terms of Service");
        return;
      }

      signupBtn.disabled    = true;
      signupBtn.textContent = "Creating...";

      const result = await window.auth.register(email, password);

      if (result.success) {
        closeModal();
        await showAlert("Account created! Please check your email to verify your account.");
      } else {
        await showAlert(result.error || "Registration failed. Please try again.");
      }

      signupBtn.disabled    = false;
      signupBtn.textContent = "Sign Up";
    });
  }
});

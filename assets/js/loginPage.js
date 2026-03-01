// assets/js/loginPage.js
// Handler semua tombol & form di halaman login.html

document.addEventListener("DOMContentLoaded", () => {

  // ── Cek jika sudah login, langsung redirect ──────────────────
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    window.location.href = "home.html";
    return;
  }

  // ── Elemen DOM ───────────────────────────────────────────────
  const loginCard   = document.querySelector(".login-card");
  const welcomeCard = document.getElementById("welcomeCard");
  const loginBtn    = document.getElementById("loginBtn");
  const usernameInput = document.getElementById("usernameInput");
  const passwordInput = document.getElementById("passwordInput");

  // ── Fungsi Login ─────────────────────────────────────────────
  async function doLogin() {
    const username = (usernameInput?.value || "").trim();
    const password = (passwordInput?.value || "").trim();

    if (!username || !password) {
      await showAlert("Please enter username and password");
      return;
    }

    // Disable tombol saat proses
    loginBtn.disabled = true;
    loginBtn.textContent = "Signing in...";

    try {
      const result = await window.auth.login(username, password);

      if (result && result.success) {
        localStorage.setItem("currentUser", username);
        localStorage.setItem("displayName", result.displayName || username);
        localStorage.setItem("profilePhoto", result.profilePhoto || "");
        window.location.href = "home.html";
      } else {
        await showAlert(result?.error || "Login failed");
        loginBtn.disabled = false;
        loginBtn.textContent = "Sign In";
      }
    } catch (err) {
      console.error("Login error:", err);
      await showAlert("Error logging in. Check your connection.");
      loginBtn.disabled = false;
      loginBtn.textContent = "Sign In";
    }
  }

  // Tombol Sign In
  if (loginBtn) {
    loginBtn.addEventListener("click", doLogin);
  }

  // Enter di password field
  if (passwordInput) {
    passwordInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") doLogin();
    });
  }

  // ── Social buttons (visual only) ─────────────────────────────
  document.querySelectorAll(".social-btn[data-msg]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      await showAlert(btn.dataset.msg);
    });
  });

  // ── Modal Signup ─────────────────────────────────────────────
  const signupModal = document.getElementById("signupModal");

  // Buka modal signup
  const signupLink = document.getElementById("signupLink");
  if (signupLink) {
    signupLink.addEventListener("click", (e) => {
      e.preventDefault();
      if (signupModal) signupModal.style.display = "flex";
    });
  }

  // Tutup modal signup via link "Sign In"
  const loginLink = document.getElementById("loginLink");
  if (loginLink) {
    loginLink.addEventListener("click", (e) => {
      e.preventDefault();
      if (signupModal) signupModal.style.display = "none";
    });
  }

  // Tutup modal signup via tombol ×
  const closeSignup = document.getElementById("closeSignup");
  if (closeSignup) {
    closeSignup.addEventListener("click", () => {
      if (signupModal) signupModal.style.display = "none";
    });
  }

  // Tutup modal jika klik di luar
  window.addEventListener("click", (e) => {
    if (e.target === signupModal) signupModal.style.display = "none";
  });

  // Tombol Sign Up
  const signupBtn = document.getElementById("signupBtn");
  if (signupBtn) {
    signupBtn.addEventListener("click", async () => {
      const username        = document.getElementById("signupUsername")?.value || "";
      const password        = document.getElementById("signupPassword")?.value || "";
      const confirmPassword = document.getElementById("signupConfirmPassword")?.value || "";

      if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
        await showAlert("Please fill all fields");
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
      if (!/\d/.test(password)) {
        await showAlert("Password must contain at least one number (e.g. myPass1)");
        return;
      }

      signupBtn.disabled = true;
      signupBtn.textContent = "Creating...";

      try {
        const result = await window.auth.register(username.trim(), password);
        if (result && result.success) {
          await showAlert("Account created! Please log in.");
          if (signupModal) signupModal.style.display = "none";
          // Reset form
          document.getElementById("signupUsername").value = "";
          document.getElementById("signupPassword").value = "";
          document.getElementById("signupConfirmPassword").value = "";
        } else {
          await showAlert(result?.error || "Registration failed");
        }
      } catch (err) {
        console.error("Signup error:", err);
        await showAlert("Error creating account.");
      }

      signupBtn.disabled = false;
      signupBtn.textContent = "Sign Up";
    });
  }

  // ── Welcome card (jika ada user tersimpan sebelumnya) ────────
  const showLoginForm = document.getElementById("showLoginForm");
  if (showLoginForm) {
    showLoginForm.addEventListener("click", () => {
      if (welcomeCard) welcomeCard.style.display = "none";
      if (loginCard)   loginCard.style.display   = "block";
    });
  }
});

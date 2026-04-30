// assets/js/main.js — FINAL (Auth + UI Init)

(async () => {
  // ==========================
  // 🔷 CEK USER LOGIN
  // ==========================
  const user = await window.auth.getCurrentUser();

  if (!user) {
    const inPages = window.location.pathname.includes("/pages/");
    window.location.href = inPages ? "login.html" : "pages/login.html";
    return;
  }

  // ==========================
  // 🔷 SIMPAN USER
  // ==========================
  window.auth.saveUser(user);

  // ==========================
  // 🔷 SYNC KE DATABASE
  // ==========================
  await window.auth.syncUserToDB(user);

  // ==========================
  // 🔷 TAMPILKAN NAMA
  // ==========================
  const nameEl = document.getElementById("topbarDisplayName");
  if (nameEl) {
    nameEl.textContent = localStorage.getItem("displayName");
  }

  // ==========================
  // 🔷 TAMPILKAN FOTO
  // ==========================
  const avatar = document.getElementById("topbarAvatar");
  const photo = localStorage.getItem("profilePhoto");

  if (avatar && photo) {
    avatar.style.backgroundImage = `url(${photo})`;
    avatar.style.backgroundSize = "cover";
    avatar.style.backgroundPosition = "center";
  }

  // ==========================
  // 🔷 LOGOUT BUTTON
  // ==========================
  const logoutBtn = document.querySelector(".logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      await window.auth.logout();
    });
  }
})();

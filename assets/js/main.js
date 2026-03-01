// main.js - sidebar, topbar, auth guard, profile display

document.addEventListener("DOMContentLoaded", () => {
  // ── Auth Guard: redirect ke login jika belum login ──────────
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    const path = window.location.pathname;
    const inPages = path.includes("/pages/");
    window.location.href = inPages ? "login.html" : "pages/login.html";
    return;
  }

  // ── Tampilkan nama & foto user dari localStorage ──────────
  const displayName =
    localStorage.getItem("displayName") ||
    localStorage.getItem("currentUser") ||
    "-";
  const nameEl = document.getElementById("topbarDisplayName");
  if (nameEl) nameEl.textContent = displayName;

  // Load profile photo ke avatar jika ada
  const profilePhoto = localStorage.getItem("profilePhoto");
  const avatarEl = document.getElementById("topbarAvatar");
  if (avatarEl && profilePhoto) {
    avatarEl.style.backgroundImage = "url(" + profilePhoto + ")";
    avatarEl.style.backgroundSize = "cover";
    avatarEl.style.backgroundPosition = "center";
    avatarEl.style.backgroundRepeat = "no-repeat";
  }

  // ── Sidebar toggle ─────────────────────────────────────────
  const toggleBtn = document.getElementById("toggleBtn");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebarOverlay");

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
      if (overlay) overlay.classList.toggle("active");
    });
  }
  if (overlay) {
    overlay.addEventListener("click", () => {
      sidebar.classList.remove("open");
      overlay.classList.remove("active");
    });
  }

  // ── Profile dropdown ───────────────────────────────────────
  const profileBtn = document.getElementById("profileBtn");
  const dropdown = document.getElementById("dropdown");
  if (profileBtn && dropdown) {
    profileBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.classList.toggle("show");
    });
    window.addEventListener("click", () => dropdown.classList.remove("show"));
  }

  // ── Logout ─────────────────────────────────────────────────
  const logoutBtn = document.querySelector(".logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.clear();
      const path = window.location.pathname;
      const inPages = path.includes("/pages/");
      window.location.href = inPages ? "login.html" : "pages/login.html";
    });
  }

  // ── CV link ────────────────────────────────────────────────
  const cvLink = document.getElementById("cvLink");
  if (cvLink) {
    cvLink.addEventListener("click", () => {
      window.location.href = "cv.html";
    });
  }

  // ── Profile link ───────────────────────────────────────────
  const profileLink = document.querySelector(
    ".profile-dropdown div:first-child"
  );
  if (profileLink) {
    profileLink.addEventListener("click", () => {
      window.location.href = "profile.html";
    });
  }

  // ── Active menu highlight ──────────────────────────────────
  const currentPage = window.location.pathname.split("/").pop();
  document.querySelectorAll(".menu-item").forEach((item) => {
    if (item.getAttribute("href") === currentPage) {
      item.classList.add("active");
    }
  });
});

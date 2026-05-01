// assets/js/main.js — v5 (Traqio)
// FIX v5: Pisahkan DOM wiring (sync) dari auth check (async)
// Sebelumnya semua diletakkan SETELAH await → sidebar/dropdown mati selama 200-2000ms

// ============================================================
// TAHAP 1 — SYNC: Wire semua tombol UI segera saat DOM siap
// Tidak perlu menunggu auth check
// ============================================================
(function wireSyncUI() {
  function init() {
    // ── Topbar: profile dropdown toggle ──────────────────────
    const profileBtn = document.getElementById("profileBtn");
    const dropdown   = document.getElementById("dropdown");

    if (profileBtn && dropdown) {
      dropdown.style.display = "none";
      profileBtn.style.cursor = "pointer";

      profileBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        const isVisible = dropdown.style.display !== "none";
        dropdown.style.display = isVisible ? "none" : "block";
      });

      document.addEventListener("click", function (e) {
        if (!dropdown.contains(e.target) && !profileBtn.contains(e.target)) {
          dropdown.style.display = "none";
        }
      });
    }

    // ── Dropdown nav links ────────────────────────────────────
    // BUG FIX: tambahkan id="profileLink" ke elemen Profile di semua HTML
    const navLinks = {
      profileLink: "profile.html",
      cvLink:      "cv.html",
      contactLink: "contact.html",
    };
    for (const [id, page] of Object.entries(navLinks)) {
      const el = document.getElementById(id);
      if (el) {
        el.style.cursor = "pointer";
        el.addEventListener("click", function () {
          if (dropdown) dropdown.style.display = "none";
          window.location.href = page;
        });
      }
    }

    // ── Logout ───────────────────────────────────────────────
    const logoutBtn = document.querySelector(".logout");
    if (logoutBtn) {
      logoutBtn.style.cursor = "pointer";
      logoutBtn.addEventListener("click", async function (e) {
        e.preventDefault();
        if (dropdown) dropdown.style.display = "none";
        await window.auth.logout();
      });
    }

    // ── Sidebar (hamburger) ───────────────────────────────────
    const toggleBtn      = document.getElementById("toggleBtn");
    const sidebar        = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    function openSidebar() {
      sidebar?.classList.add("open");
      sidebarOverlay?.classList.add("open");
      document.body.style.overflow = "hidden";
    }
    function closeSidebar() {
      sidebar?.classList.remove("open");
      sidebarOverlay?.classList.remove("open");
      document.body.style.overflow = "";
    }

    if (toggleBtn) toggleBtn.style.cursor = "pointer";
    toggleBtn?.addEventListener("click", openSidebar);
    sidebarOverlay?.addEventListener("click", closeSidebar);

    // Tutup sidebar saat klik link navigasi (mobile)
    sidebar?.querySelectorAll(".menu-item").forEach(function (link) {
      link.addEventListener("click", closeSidebar);
    });

    // ── Active nav link ───────────────────────────────────────
    const currentPage = window.location.pathname.split("/").pop();
    document.querySelectorAll(".menu-item").forEach(function (item) {
      const href = item.getAttribute("href") || "";
      item.classList.toggle("active", href === currentPage);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

// ============================================================
// TAHAP 2 — ASYNC: Auth check + update user-specific UI
// ============================================================
(async function initAuth() {
  // Cek apakah user sudah login
  const user = await window.auth.getCurrentUser();

  if (!user) {
    // Redirect ke login
    const inPages = window.location.pathname.includes("/pages/");
    window.location.href = inPages ? "login.html" : "pages/login.html";
    return;
  }

  // Simpan data user ke localStorage
  window.auth.saveUser(user);
  await window.auth.syncUserToDB(user);

  // ── Update topbar: nama & avatar ─────────────────────────
  const nameEl = document.getElementById("topbarDisplayName");
  if (nameEl) nameEl.textContent = localStorage.getItem("displayName") || "";

  const avatar = document.getElementById("topbarAvatar");
  const photo  = localStorage.getItem("profilePhoto");
  if (avatar) {
    if (photo) {
      const src = photo + (photo.includes("?") ? "&" : "?") + "cb=" + Date.now();
      const img = document.createElement("img");
      img.src  = src;
      img.alt  = "Avatar";
      img.style.cssText = "width:100%;height:100%;object-fit:cover;border-radius:50%;display:block;";
      img.onerror = function () { avatar.innerHTML = ""; };
      avatar.innerHTML = "";
      avatar.appendChild(img);
    } else {
      avatar.innerHTML = "";
    }
  }

  // ── Admin menu ────────────────────────────────────────────
  const adminMenu = document.getElementById("adminMenu");
  if (adminMenu) {
    const admin = await window.auth.isAdmin();
    adminMenu.style.display = admin ? "block" : "none";
  }
})();

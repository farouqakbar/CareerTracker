// assets/js/main.js — v3
// Auto-detect sidebar & profile dropdown elements
// Tidak bergantung pada id tertentu — cocok dengan struktur HTML apapun

(async () => {
  // ==========================
  // 🔷 CEK LOGIN
  // ==========================
  const user = await window.auth.getCurrentUser();

  if (!user) {
    const inPages = window.location.pathname.includes("/pages/");
    window.location.href = inPages ? "login.html" : "pages/login.html";
    return;
  }

  window.auth.saveUser(user);
  await window.auth.syncUserToDB(user);

  // ==========================
  // 🔷 TOPBAR — NAMA & FOTO
  // ==========================
  const nameEl = document.getElementById("topbarDisplayName");
  if (nameEl) nameEl.textContent = localStorage.getItem("displayName") || "";

  const avatar = document.getElementById("topbarAvatar");
  const photo = localStorage.getItem("profilePhoto");
  if (avatar) {
    if (photo) {
      const src = `${photo}${photo.includes("?") ? "&" : "?"}cb=${Date.now()}`;
      avatar.innerHTML = `<img src="${src}" alt="Avatar"
        style="width:100%;height:100%;object-fit:cover;border-radius:50%;display:block;"
        onerror="this.parentElement.innerHTML='';">`;
    } else {
      avatar.innerHTML = "";
    }
  }

  // ==========================
  // 🔷 PROFILE DROPDOWN
  // Coba beberapa id/class yang umum dipakai
  // ==========================
  const profileToggle =
    document.getElementById("profileDropdownToggle") ||
    document.getElementById("profileToggle") ||
    document.getElementById("topbarAvatar") ||
    document.querySelector(".profile-toggle") ||
    document.querySelector(".topbar-profile") ||
    document.querySelector(".user-avatar");

  const profileMenu =
    document.getElementById("profileDropdownMenu") ||
    document.getElementById("profileMenu") ||
    document.querySelector(".profile-dropdown") ||
    document.querySelector(".dropdown-menu");

  if (profileToggle && profileMenu) {
    // Pastikan menu punya posisi & bisa disembunyikan
    if (!profileMenu.style.display && !profileMenu.classList.contains("open")) {
      profileMenu.style.display = "none";
    }

    profileToggle.style.cursor = "pointer";

    profileToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen =
        profileMenu.classList.contains("open") ||
        profileMenu.style.display === "block";

      if (isOpen) {
        profileMenu.classList.remove("open");
        profileMenu.style.display = "none";
      } else {
        profileMenu.classList.add("open");
        profileMenu.style.display = "block";
      }
    });

    document.addEventListener("click", (e) => {
      if (
        !profileMenu.contains(e.target) &&
        !profileToggle.contains(e.target)
      ) {
        profileMenu.classList.remove("open");
        profileMenu.style.display = "none";
      }
    });

    console.log(
      "[main] profile dropdown: OK",
      profileToggle.id || profileToggle.className,
    );
  } else {
    console.warn("[main] profile dropdown tidak ditemukan.", {
      toggle: profileToggle,
      menu: profileMenu,
    });
  }

  // Link di dalam dropdown
  const NAV_MAP = {
    profileLink: "profile.html",
    cvLink: "cv.html",
    contactLink: "contact.html",
  };
  for (const [id, page] of Object.entries(NAV_MAP)) {
    const el = document.getElementById(id);
    if (el)
      el.addEventListener("click", () => {
        window.location.href = page;
      });
  }

  // ==========================
  // 🔷 LOGOUT
  // ==========================
  const logoutBtn =
    document.querySelector(".logout") ||
    document.getElementById("logoutBtn") ||
    document.querySelector("[data-action='logout']");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      await window.auth.logout();
    });
  }

  // ==========================
  // 🔷 SIDEBAR
  // Auto-detect tombol buka/tutup & overlay
  // ==========================
  const sidebar =
    document.getElementById("sidebar") ||
    document.querySelector(".sidebar") ||
    document.querySelector("nav.side-nav");

  const sidebarOverlay =
    document.getElementById("sidebarOverlay") ||
    document.getElementById("overlay") ||
    document.querySelector(".sidebar-overlay") ||
    document.querySelector(".overlay");

  // Tombol buka sidebar: hamburger, menu icon, dll
  const sidebarOpenBtn =
    document.getElementById("sidebarOpenBtn") ||
    document.getElementById("menuBtn") ||
    document.getElementById("hamburgerBtn") ||
    document.querySelector(".sidebar-toggle") ||
    document.querySelector(".hamburger") ||
    document.querySelector("[data-toggle='sidebar']") ||
    document.querySelector(".menu-toggle");

  // Tombol tutup sidebar: × di dalam sidebar
  const sidebarCloseBtn =
    document.getElementById("sidebarCloseBtn") ||
    document.getElementById("closeBtn") ||
    document.querySelector(".sidebar-close") ||
    document.querySelector(".close-sidebar");

  function openSidebar() {
    sidebar?.classList.add("open");
    sidebarOverlay?.classList.add("open");
    if (sidebarOverlay) sidebarOverlay.style.display = "block";
    document.body.style.overflow = "hidden";
    console.log("[main] sidebar opened");
  }

  function closeSidebar() {
    sidebar?.classList.remove("open");
    sidebarOverlay?.classList.remove("open");
    if (sidebarOverlay) sidebarOverlay.style.display = "none";
    document.body.style.overflow = "";
    console.log("[main] sidebar closed");
  }

  if (sidebarOpenBtn) {
    sidebarOpenBtn.addEventListener("click", openSidebar);
    console.log(
      "[main] sidebarOpenBtn: OK",
      sidebarOpenBtn.id || sidebarOpenBtn.className,
    );
  } else {
    console.warn(
      "[main] sidebarOpenBtn tidak ditemukan. Tambahkan id='sidebarOpenBtn' ke tombol hamburger.",
    );
  }

  if (sidebarCloseBtn) sidebarCloseBtn.addEventListener("click", closeSidebar);
  if (sidebarOverlay) sidebarOverlay.addEventListener("click", closeSidebar);

  // Tutup sidebar saat klik link navigasi (mobile)
  if (sidebar) {
    sidebar.querySelectorAll("a, .menu-item").forEach((link) => {
      link.addEventListener("click", closeSidebar);
    });
  }

  if (sidebar) {
    console.log("[main] sidebar: OK", sidebar.id || sidebar.className);
  } else {
    console.warn("[main] sidebar tidak ditemukan.");
  }

  // ==========================
  // 🔷 ACTIVE NAV LINK
  // ==========================
  const currentPage = window.location.pathname.split("/").pop();
  document
    .querySelectorAll(".menu-item, .nav-link, .sidebar a")
    .forEach((item) => {
      const href = item.getAttribute("href") || "";
      item.classList.toggle(
        "active",
        href === currentPage || href.endsWith("/" + currentPage),
      );
    });

  // ==========================
  // 🔷 ADMIN MENU
  // ==========================
  const adminEls = document.querySelectorAll(".admin-only");
  if (adminEls.length) {
    const admin = await window.auth.isAdmin();
    adminEls.forEach((el) => {
      el.style.display = admin ? "" : "none";
    });
  }

  // ==========================
  // 🔷 DIAGNOSTIC TOOL
  // Ketik window._diagnose() di console untuk debug
  // ==========================
  window._diagnose = () => {
    const els = {
      topbarDisplayName: document.getElementById("topbarDisplayName"),
      topbarAvatar: document.getElementById("topbarAvatar"),
      profileDropdownToggle: document.getElementById("profileDropdownToggle"),
      profileDropdownMenu: document.getElementById("profileDropdownMenu"),
      sidebar: document.getElementById("sidebar"),
      sidebarOverlay: document.getElementById("sidebarOverlay"),
      sidebarOpenBtn: document.getElementById("sidebarOpenBtn"),
      sidebarCloseBtn: document.getElementById("sidebarCloseBtn"),
      "logoutBtn (.logout)": document.querySelector(".logout"),
    };
    console.table(
      Object.fromEntries(
        Object.entries(els).map(([k, v]) => [
          k,
          v ? "✅ ditemukan" : "❌ tidak ada",
        ]),
      ),
    );
    console.log("Halaman saat ini:", window.location.pathname);
    console.log("User:", localStorage.getItem("currentUserEmail"));
  };

  console.log(
    "[main] init selesai. Ketik window._diagnose() untuk cek elemen.",
  );
})();

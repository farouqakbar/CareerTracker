// assets/js/main.js — v4 (disesuaikan dengan home.html Traqio)

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
      const img = document.createElement("img");
      img.src = src;
      img.alt = "Avatar";
      img.style.cssText =
        "width:100%;height:100%;object-fit:cover;border-radius:50%;display:block;";
      img.onerror = () => {
        avatar.innerHTML = "";
      };
      avatar.innerHTML = "";
      avatar.appendChild(img);
    } else {
      avatar.innerHTML = "";
    }
  }

  // ==========================
  // 🔷 PROFILE DROPDOWN
  // HTML: id="profileBtn" → toggle
  //       id="dropdown"   → menu
  // ==========================
  const profileBtn = document.getElementById("profileBtn");
  const dropdown = document.getElementById("dropdown");

  if (profileBtn && dropdown) {
    // Sembunyikan dropdown secara default via JS (kalau CSS belum handle)
    dropdown.style.display = "none";

    profileBtn.style.cursor = "pointer";

    profileBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isVisible = dropdown.style.display !== "none";
      dropdown.style.display = isVisible ? "none" : "block";
    });

    // Klik di luar → tutup dropdown
    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target) && !profileBtn.contains(e.target)) {
        dropdown.style.display = "none";
      }
    });
  }

  // Link di dalam dropdown → navigasi ke halaman
  // HTML sudah punya: id="cvLink", id="contactLink"
  // Tambahkan id="profileLink" ke item Profile di dropdown jika perlu
  const navLinks = {
    profileLink: "profile.html",
    cvLink: "cv.html",
    contactLink: "contact.html",
  };
  for (const [id, page] of Object.entries(navLinks)) {
    const el = document.getElementById(id);
    if (el) {
      el.style.cursor = "pointer";
      el.addEventListener("click", () => {
        dropdown.style.display = "none";
        window.location.href = page;
      });
    }
  }

  // ==========================
  // 🔷 LOGOUT
  // HTML: class="logout" di dalam #dropdown
  // ==========================
  const logoutBtn = document.querySelector(".logout");
  if (logoutBtn) {
    logoutBtn.style.cursor = "pointer";
    logoutBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      dropdown.style.display = "none";
      await window.auth.logout();
    });
  }

  // ==========================
  // 🔷 SIDEBAR
  // HTML: id="toggleBtn"      → tombol hamburger (buka)
  //       id="sidebar"        → panel sidebar
  //       id="sidebarOverlay" → overlay gelap
  // Tidak ada tombol close di dalam sidebar → klik overlay untuk tutup
  // ==========================
  const toggleBtn = document.getElementById("toggleBtn");
  const sidebar = document.getElementById("sidebar");
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

  toggleBtn?.addEventListener("click", openSidebar);
  sidebarOverlay?.addEventListener("click", closeSidebar);

  // Tutup sidebar saat klik link navigasi (mobile)
  sidebar?.querySelectorAll(".menu-item").forEach((link) => {
    link.addEventListener("click", closeSidebar);
  });

  // ==========================
  // 🔷 ACTIVE NAV LINK
  // ==========================
  const currentPage = window.location.pathname.split("/").pop();
  document.querySelectorAll(".menu-item").forEach((item) => {
    const href = item.getAttribute("href") || "";
    item.classList.toggle("active", href === currentPage);
  });

  // ==========================
  // 🔷 ADMIN MENU
  // HTML: id="adminMenu" dengan style="display:none"
  // ==========================
  const adminMenu = document.getElementById("adminMenu");
  if (adminMenu) {
    const admin = await window.auth.isAdmin();
    adminMenu.style.display = admin ? "block" : "none";
  }
})();

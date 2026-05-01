// assets/js/main.js — v2

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
    nameEl.textContent = localStorage.getItem("displayName") || "";
  }

  // ==========================
  // 🔷 TAMPILKAN FOTO
  // FIX: use <img> consistently (same as profilePage.js updateTopbar)
  // ==========================
  const avatar = document.getElementById("topbarAvatar");
  const photo  = localStorage.getItem("profilePhoto");

  if (avatar) {
    if (photo) {
      const src = photo + (photo.includes("?") ? "&" : "?") + "cb=" + Date.now();
      avatar.innerHTML = `<img src="${src}" alt="Avatar"
        style="width:100%;height:100%;object-fit:cover;border-radius:50%;display:block;"
        onerror="this.parentElement.innerHTML='';" />`;
    } else {
      avatar.innerHTML = "";
    }
  }

  // ==========================
  // 🔷 PROFILE DROPDOWN
  // FIX: wire dropdown links to actual pages
  // ==========================
  const profileToggle = document.getElementById("profileDropdownToggle");
  const profileMenu   = document.getElementById("profileDropdownMenu");

  if (profileToggle && profileMenu) {
    profileToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      profileMenu.classList.toggle("open");
    });
    document.addEventListener("click", () => profileMenu.classList.remove("open"));
  }

  // Wire profile nav links (add these ids to your dropdown HTML)
  const NAV_MAP = {
    profileLink:  "profile.html",
    cvLink:       "cv.html",
    contactLink:  "contact.html",
  };
  for (const [id, page] of Object.entries(NAV_MAP)) {
    const el = document.getElementById(id);
    if (el) el.addEventListener("click", () => { window.location.href = page; });
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

  // ==========================
  // 🔷 SIDEBAR OVERLAY
  // FIX: universal handler — works on every page that includes main.js
  // ==========================
  const sidebar        = document.getElementById("sidebar");
  const sidebarOverlay = document.getElementById("sidebarOverlay");
  const sidebarOpen    = document.getElementById("sidebarOpenBtn");
  const sidebarClose   = document.getElementById("sidebarCloseBtn");

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

  sidebarOpen?.addEventListener("click",   openSidebar);
  sidebarClose?.addEventListener("click",  closeSidebar);
  sidebarOverlay?.addEventListener("click", closeSidebar);

  // Close sidebar on nav link click (mobile UX)
  document.querySelectorAll("#sidebar .menu-item").forEach(link => {
    link.addEventListener("click", closeSidebar);
  });

  // ==========================
  // 🔷 MARK ACTIVE NAV
  // ==========================
  const page = window.location.pathname.split("/").pop();
  document.querySelectorAll(".menu-item").forEach(item => {
    item.classList.toggle("active", item.getAttribute("href") === page);
  });

  // ==========================
  // 🔷 ADMIN MENU SHOW/HIDE
  // FIX: only show admin-only elements when user is admin
  // Add class "admin-only" to any element that should be hidden for non-admins
  // ==========================
  const adminEls = document.querySelectorAll(".admin-only");
  if (adminEls.length) {
    const admin = await window.auth.isAdmin();
    adminEls.forEach(el => {
      el.style.display = admin ? "" : "none";
    });
  }
})();

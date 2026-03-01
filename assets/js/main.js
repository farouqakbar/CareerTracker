// main.js — CareerTracker v2
// Handles: auth guard, topbar display, sidebar, profile dropdown, logout

document.addEventListener("DOMContentLoaded", async () => {

  // ── Auth Guard ────────────────────────────────────────────
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    const inPages = window.location.pathname.includes("/pages/");
    window.location.href = inPages ? "login.html" : "pages/login.html";
    return;
  }

  const isAdmin = currentUser === "admin";

  // ── Admin sidebar section ─────────────────────────────────
  const adminMenu = document.getElementById("adminMenu");
  if (adminMenu) adminMenu.style.display = isAdmin ? "block" : "none";

  // ── Topbar: display name ──────────────────────────────────
  const nameEl = document.getElementById("topbarDisplayName");
  if (nameEl) {
    nameEl.textContent = localStorage.getItem("displayName") || currentUser;
  }

  // ── Topbar: avatar photo ──────────────────────────────────
  const avatarEl = document.getElementById("topbarAvatar");

  function setAvatarImg(url) {
    if (!avatarEl) return;
    avatarEl.innerHTML = url
      ? '<img src="' + url + '" alt="Avatar" style="width:100%;height:100%;object-fit:cover;border-radius:50%;display:block;" onerror="this.parentElement.innerHTML=\'\';" />'
      : "";
  }

  const localPhoto = localStorage.getItem("profilePhoto");
  if (localPhoto) setAvatarImg(localPhoto);

  // ── Background sync from Supabase ────────────────────────
  (async () => {
    try {
      const db = window.supabaseClient;
      if (!db) return;
      const { data } = await db
        .from("users")
        .select("display_name, profile_photo")
        .eq("username", currentUser)
        .single();
      if (!data) return;

      const dn = data.display_name || currentUser;
      localStorage.setItem("displayName", dn);
      if (nameEl) nameEl.textContent = dn;

      const photo = data.profile_photo || "";
      if (photo !== (localStorage.getItem("profilePhoto") || "")) {
        localStorage.setItem("profilePhoto", photo);
        setAvatarImg(photo);
      }
    } catch (e) {
      console.warn("main.js sync error:", e.message);
    }
  })();

  // ── Sidebar toggle ────────────────────────────────────────
  const toggleBtn = document.getElementById("toggleBtn");
  const sidebar   = document.getElementById("sidebar");
  const overlay   = document.getElementById("sidebarOverlay");

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

  // ── Profile dropdown ──────────────────────────────────────
  const profileBtn = document.getElementById("profileBtn");
  const dropdown   = document.getElementById("dropdown");
  if (profileBtn && dropdown) {
    profileBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.classList.toggle("show");
    });
    window.addEventListener("click", () => dropdown.classList.remove("show"));
  }

  // ── Dropdown: Profile ─────────────────────────────────────
  const profileLink = document.querySelector(".profile-dropdown div:first-child");
  if (profileLink) {
    profileLink.addEventListener("click", () => {
      window.location.href = "profile.html";
    });
  }

  // ── Dropdown: My CV ───────────────────────────────────────
  const cvLink = document.getElementById("cvLink");
  if (cvLink) {
    cvLink.addEventListener("click", () => {
      window.location.href = "cv.html";
    });
  }

  // ── Dropdown: Contact Us ──────────────────────────────────
  const contactLink = document.getElementById("contactLink");
  if (contactLink) {
    contactLink.addEventListener("click", () => {
      window.location.href = "contact.html";
    });
  }

  // ── Logout ────────────────────────────────────────────────
  const logoutBtn = document.querySelector(".logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.clear();
      const inPages = window.location.pathname.includes("/pages/");
      window.location.href = inPages ? "login.html" : "pages/login.html";
    });
  }

  // ── Active menu item highlight ────────────────────────────
  const currentPage = window.location.pathname.split("/").pop();
  document.querySelectorAll(".menu-item").forEach((item) => {
    const href = item.getAttribute("href");
    if (href && href === currentPage) {
      item.classList.add("active");
    }
  });

});

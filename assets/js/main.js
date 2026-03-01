// main.js - sidebar, topbar, auth guard, profile display

document.addEventListener("DOMContentLoaded", async () => {
  // ── Auth Guard ──────────────────────────────────────────────
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    const path = window.location.pathname;
    const inPages = path.includes("/pages/");
    window.location.href = inPages ? "login.html" : "pages/login.html";
    return;
  }

  // ── Tampilkan nama dari localStorage (cepat, sebelum fetch) ──
  const displayName = localStorage.getItem("displayName") || currentUser;
  const nameEl = document.getElementById("topbarDisplayName");
  if (nameEl) nameEl.textContent = displayName;

  // ── Tampilkan foto dari localStorage (cepat) ─────────────────
  const localPhoto = localStorage.getItem("profilePhoto");
  const avatarEl   = document.getElementById("topbarAvatar");

  function setAvatarImg(url) {
    if (!avatarEl) return;
    if (url) {
      avatarEl.innerHTML =
        '<img src="' + url + '" alt="Avatar" ' +
        'style="width:100%;height:100%;object-fit:cover;border-radius:50%;display:block;" ' +
        'onerror="this.parentElement.innerHTML=\'\';" />';
    } else {
      avatarEl.innerHTML = "";
    }
  }

  if (localPhoto) setAvatarImg(localPhoto);

  // ── Sync foto dari Supabase (background, tidak blokir UI) ────
  (async () => {
    try {
      const db = window.supabaseClient;
      if (!db) return;

      const { data } = await db
        .from("users")
        .select("display_name, profile_photo")
        .eq("username", currentUser)
        .single();

      if (data) {
        // Update display name
        const dn = data.display_name || currentUser;
        localStorage.setItem("displayName", dn);
        if (nameEl) nameEl.textContent = dn;

        // Update foto
        const photo = data.profile_photo || "";
        const cachedPhoto = localStorage.getItem("profilePhoto") || "";

        if (photo !== cachedPhoto) {
          localStorage.setItem("profilePhoto", photo);
          setAvatarImg(photo);
        }
      }
    } catch (e) {
      // Tidak blokir UI jika gagal
      console.warn("main.js: gagal sync profil dari Supabase:", e.message);
    }
  })();

  // ── Sidebar toggle ─────────────────────────────────────────
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

  // ── Profile dropdown ───────────────────────────────────────
  const profileBtn = document.getElementById("profileBtn");
  const dropdown   = document.getElementById("dropdown");
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
  const profileLink = document.querySelector(".profile-dropdown div:first-child");
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

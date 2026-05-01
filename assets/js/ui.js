// ui.js — v2

// ── showAlert ─────────────────────────────────────────────
// Uses custom modal if available, falls back to native alert
function showAlert(message) {
  return new Promise((resolve) => {
    const modal  = document.getElementById("customAlertModal");
    const msgEl  = document.getElementById("alertMessage");
    const okBtn  = document.getElementById("alertOk");

    if (modal && msgEl && okBtn) {
      msgEl.textContent     = message;
      modal.style.display   = "flex";

      const cleanup = () => {
        modal.style.display = "none";
        okBtn.onclick       = null;
      };
      okBtn.onclick = () => { cleanup(); resolve(); };
    } else {
      alert(message);
      resolve();
    }
  });
}

// ── customConfirm ─────────────────────────────────────────
function customConfirm(title, message) {
  return new Promise((resolve) => {
    const modal  = document.getElementById("customConfirmModal");
    const titleEl = document.getElementById("confirmTitle");
    const msgEl  = document.getElementById("confirmMessage");
    const yesBtn = document.getElementById("confirmYes");
    const noBtn  = document.getElementById("confirmNo");

    if (!modal || !yesBtn || !noBtn) {
      resolve(confirm(message));
      return;
    }

    if (titleEl) titleEl.textContent = title;
    if (msgEl)   msgEl.textContent   = message;
    modal.style.display = "flex";

    const cleanup = () => {
      modal.style.display = "none";
      yesBtn.onclick = null;
      noBtn.onclick  = null;
    };

    yesBtn.onclick = () => { cleanup(); resolve(true);  };
    noBtn.onclick  = () => { cleanup(); resolve(false); };
  });
}

// ── showConfirm ───────────────────────────────────────────
// FIX: was a plain confirm() wrapper; now delegates to customConfirm for consistent UI
function showConfirm(message, title = "Confirm") {
  return customConfirm(title, message);
}

// ── markActive ────────────────────────────────────────────
function markActive() {
  const page = window.location.pathname.split("/").pop();
  document.querySelectorAll(".menu-item").forEach((item) => {
    item.classList.toggle("active", item.getAttribute("href") === page);
  });
}

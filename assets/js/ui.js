// ui.js - helper modal alert dan confirm

function showAlert(message) {
  return new Promise((resolve) => {
    alert(message);
    resolve();
  });
}

function customConfirm(title, message) {
  return new Promise((resolve) => {
    const modal = document.getElementById("customConfirmModal");
    const titleEl = document.getElementById("confirmTitle");
    const msgEl = document.getElementById("confirmMessage");
    const yesBtn = document.getElementById("confirmYes");
    const noBtn = document.getElementById("confirmNo");

    if (!modal) {
      resolve(confirm(message));
      return;
    }

    if (titleEl) titleEl.textContent = title;
    if (msgEl) msgEl.textContent = message;
    modal.style.display = "flex";

    const cleanup = () => {
      modal.style.display = "none";
    };

    yesBtn.onclick = () => {
      cleanup();
      resolve(true);
    };
    noBtn.onclick = () => {
      cleanup();
      resolve(false);
    };
  });
}

function markActive() {
  const page = window.location.pathname.split("/").pop();
  document.querySelectorAll(".menu-item").forEach((item) => {
    item.classList.toggle("active", item.getAttribute("href") === page);
  });
}

// showConfirm - simple confirm wrapper
function showConfirm(message) {
  return new Promise(resolve => resolve(confirm(message)));
}

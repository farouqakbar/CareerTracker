// darkMode.js — unified dark mode toggle for all pages
// Attach to any button with id="darkModeToggle"
(function () {
  function syncIcon() {
    const btn = document.getElementById("darkModeToggle");
    if (!btn) return;
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    btn.textContent = isDark ? "☀️" : "🌙";
    btn.title = isDark ? "Switch to light mode" : "Switch to dark mode";
  }

  function init() {
    syncIcon();
    const btn = document.getElementById("darkModeToggle");
    if (!btn) return;
    btn.addEventListener("click", function () {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      if (isDark) {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      }
      syncIcon();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

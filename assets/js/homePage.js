// ============================================================
// homePage.js — PATCHED v3
//
// Root cause fixes:
//   1. REMOVED card.style.display = "flex"  ← was overriding CSS grid
//   2. REMOVED container.style.display = "block"  ← was collapsing width
//   3. Empty span for arrow — CSS draws the arrow, no emoji needed
//   4. Empty state uses .no-events-msg class (styled in home.css)
// ============================================================

function updateHome(apps, vacancies) {
  // ── Stat card: job count ──
  const jobCountEl = document.getElementById("jobCount");
  if (jobCountEl) jobCountEl.textContent = vacancies ? vacancies.length : "-";

  // ── Stat card: active applications ──
  const activeApps = apps.filter((a) => a.status === "Active");
  const activeCountEl = document.getElementById("activeCount");
  if (activeCountEl) activeCountEl.textContent = activeApps.length;

  // ── Events in next 7 days ──
  const now = new Date();
  // Calculate week boundaries in local timezone, not UTC
  const localMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );
  const weekEnd = new Date(localMidnight);
  weekEnd.setDate(localMidnight.getDate() + 7);

  let weeklyCount = 0;
  const weekEvents = [];

  activeApps.forEach((a) => {
    if (!a.stages) return;
    a.stages.forEach((s) => {
      if (!s.date) return;
      // Parse date in local timezone to avoid UTC shift issues
      const [y, m, d] = s.date.split("-").map(Number);
      const stageDate = new Date(y, m - 1, d); // Create in local timezone
      const dt = s.time
        ? new Date(
            stageDate.getFullYear(),
            stageDate.getMonth(),
            stageDate.getDate(),
            parseInt(s.time.split(":")[0]),
            parseInt(s.time.split(":")[1]),
          )
        : stageDate;
      if (dt >= localMidnight && dt <= weekEnd) {
        weeklyCount++;
        weekEvents.push({ app: a, stage: s, dateTime: dt });
      }
    });
  });

  const weeklyCountEl = document.getElementById("weeklyCount");
  if (weeklyCountEl) weeklyCountEl.textContent = weeklyCount;

  // ── Render upcoming cards ──
  const container = document.getElementById("upcomingContainer");
  if (!container) return;

  weekEvents.sort((a, b) => a.dateTime - b.dateTime);
  container.innerHTML = "";

  if (weekEvents.length === 0) {
    const placeholder = document.createElement("div");
    placeholder.className = "no-events-msg";
    placeholder.textContent = "No events scheduled this week.";
    container.appendChild(placeholder);
    return;
  }

  weekEvents.forEach((ev) => {
    const dateStr = ev.stage.date
      ? new Date(ev.stage.date).toLocaleDateString()
      : "-";
    const diffDays = Math.ceil((ev.dateTime - now) / (1000 * 60 * 60 * 24));
    const diffTime = ev.stage.time || "-";

    const card = document.createElement("div");
    card.className = "upcoming-card";
    card.dataset.id = ev.app.id;

    // NOTE: NO card.style.display set here.
    // CSS `display: grid !important` controls layout.
    // Arrow span is empty — CSS ::pseudo draws the arrow.

    card.innerHTML = `
      <div class="ws-left">
        <div class="ws-company">${ev.app.company}</div>
        <div class="ws-activity">${ev.stage.name}</div>
        <div class="ws-date">${dateStr}</div>
      </div>
      <div class="ws-center">
        <div class="ws-status">Upcoming</div>
        <div class="ws-days">${diffDays} Day(s) left</div>
        <div class="ws-time">${diffTime}</div>
      </div>
      <div class="ws-right">
        <a href="application-detail.html?id=${ev.app.id}"
           class="detail-arrow-link"
           onclick="event.stopPropagation()">
          <span class="detail-arrow-icon"></span>
        </a>
      </div>
    `;

    card.addEventListener("click", () => {
      window.location.href = "application-detail.html?id=" + ev.app.id;
    });

    container.appendChild(card);
  });

  // NOTE: NO container.style.display = "block" here.
  // The container is a flex column (#upcomingContainer in CSS).
}

// ── Init: load data and start 5s polling ──
let homePagePollingId = null; // Global reference for cleanup

function stopHomePagePolling() {
  if (homePagePollingId !== null) {
    clearInterval(homePagePollingId);
    homePagePollingId = null;
    console.log("[homePage] Polling stopped");
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Stop any existing polling before starting new one
    stopHomePagePolling();

    const data = await getAllApplications();
    const vacs = await getAllVacancies();
    updateHome(data, vacs);

    let lastDataStr = JSON.stringify(data);
    let lastVacsStr = JSON.stringify(vacs);

    // Store polling interval ID for cleanup
    homePagePollingId = setInterval(async () => {
      try {
        const newData = await getAllApplications();
        const newVacs = await getAllVacancies();
        const newDataStr = JSON.stringify(newData);
        const newVacsStr = JSON.stringify(newVacs);

        if (newDataStr !== lastDataStr || newVacsStr !== lastVacsStr) {
          updateHome(newData, newVacs);
          lastDataStr = newDataStr;
          lastVacsStr = newVacsStr;
        }
      } catch (e) {
        console.warn("Polling error:", e.message);
      }
    }, 5000);

    // Clean up polling on page unload (both beforeunload and pagehide)
    window.addEventListener("beforeunload", stopHomePagePolling);
    window.addEventListener("pagehide", stopHomePagePolling);

    // Clean up when navigating via links (SPA navigation)
    document.addEventListener("click", (e) => {
      if (e.target?.tagName === "A" && !e.target.target) {
        stopHomePagePolling();
      }
    });
  } catch (e) {
    console.error("Home page initialization error:", e.message);
    const errorMsg = document.createElement("div");
    errorMsg.style.cssText =
      "color: #e74c3c; padding: 1rem; text-align: center; font-size: 0.9rem;";
    errorMsg.textContent =
      "Error loading data: " + e.message + ". Please refresh the page.";
    document.body.insertBefore(errorMsg, document.body.firstChild);
  }
});

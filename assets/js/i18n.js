// ============================================================
// i18n.js — Traqio Professional Auto-Translate System
// Version: 3.0
//
// ✦ Auto-detects browser language (ANY language supported)
// ✦ Translates via Google Translate (unofficial, free, no key)
// ✦ Caches translations in localStorage (no re-translate)
// ✦ Professional globe selector with native language names
// ✦ English is the single source of truth
// ============================================================

// ── BASE STRINGS (English) ─────────────────────────────────
var TRAQIO_BASE = {
  // Nav / Sidebar
  nav_home: "Home",
  nav_how_to_use: "How to Use",
  nav_about: "About",
  nav_profile: "👤 Profile",
  nav_my_cv: "📄 My CV",
  nav_contact: "💬 Contact Us",
  nav_sign_out: "🚪 Sign Out",
  // Carousel cards
  card_job_vacancy: "Job Vacancy",
  card_job_sub: "Saved openings",
  card_weekly: "Weekly Schedule",
  card_weekly_sub: "Events this week",
  card_active: "Active Applications",
  card_active_sub: "In progress",
  // Panels / Tables
  panel_weekly: "Weekly Schedule",
  panel_applied: "Active Applications",
  panel_jobs: "Job Vacancy",
  th_priority: "Priority",
  th_date: "Date",
  th_company: "Company",
  th_program: "Program",
  th_position: "Position",
  th_status: "Status",
  th_stage: "Stage",
  th_detail: "Detail",
  th_deadline: "Deadline",
  th_link: "Link",
  th_delete: "Delete",
  // Buttons
  btn_add: "+ Add",
  btn_save: "Save",
  btn_cancel: "Cancel",
  btn_delete: "Delete",
  btn_yes: "Yes",
  btn_no: "No",
  btn_confirm: "Confirm",
  btn_upload: "Upload",
  // Status
  status_active: "Active",
  status_rejected: "Rejected",
  status_pending: "Pending",
  status_discontinued: "Discontinued",
  status_applied: "Applied",
  status_not_applied: "Not Applied",
  // Modals
  modal_add_app: "Add Application",
  modal_add_vacancy: "Add Vacancy",
  modal_delete_vacancy: "Delete Vacancy?",
  modal_change_priority: "Change Priority",
  modal_add_stage: "Add Stage",
  modal_confirm: "Confirm",
  // Form labels
  label_company: "Company Name",
  label_program: "Program Name",
  label_position: "Position",
  label_deadline: "Application Deadline",
  label_link: "Registration Link",
  label_step_no: "Step Number",
  label_stage_name: "Stage Name",
  label_date: "Date",
  label_time: "Time",
  label_search: "Search company...",
  // App Detail
  detail_info: "Application Info",
  detail_stage_label: "Recruitment Stage",
  detail_deadline_label: "Date & Time",
  detail_note_label: "Notes",
  detail_empty_note: "No notes yet. Click ✎ to add.",
  detail_empty_stage: "Add your first recruitment stage to get started.",
  detail_stage_done: "completed",
  detail_delete_title: "Delete Application",
  // Stage box
  stagebox_card_label: "Stage Information Card",
  stagebox_hint: "Click a stage circle above to view details",
  stagebox_info: "Application Summary Card",
  // Danger Zone
  danger_title: "⚠️ Danger Zone",
  danger_desc: "Permanently delete this application and all its stage data. This action cannot be undone.",
  danger_btn: "🗑️ Delete Application",
  danger_account_desc: "Once you delete your account, all data will be permanently removed.",
  danger_account_btn: "🗑️ Delete Account",
  // Weekly
  ws_upcoming: "Upcoming",
  ws_days_left: "day(s) left",
  ws_no_events: "No events scheduled this week.",
  // Empty states
  empty_apps: "No applications yet. Click + Add to start.",
  empty_vacs: "No vacancies yet. Click + Add to start.",
  // Profile
  profile_title: "Profile Settings",
  profile_subtitle: "Manage your account information and preferences.",
  profile_account_info: "👤 Account Information",
  profile_username: "Username",
  profile_username_hint: "Username cannot be changed after registration.",
  profile_display: "Display Name",
  profile_display_hint: "This name will appear across the app.",
  profile_save: "Save Changes",
  profile_cancel: "Cancel",
  profile_upload: "📷 Upload Photo",
  profile_remove: "✕ Remove",
  profile_change_pw: "🔑 Change Password",
  profile_current_pw: "Current Password",
  profile_new_pw: "New Password",
  profile_confirm_pw: "Confirm New Password",
  profile_pw_hint: "Min. 8 characters, letters & numbers.",
  profile_pw_btn: "🔒 Change Password",
  profile_privacy_title: "🔒 Privacy & Security",
  profile_danger_title: "⚠️ Danger Zone",
  profile_danger_desc: "Once you delete your account, all your data will be permanently removed. This cannot be undone.",
  profile_delete_btn: "🗑️ Delete Account",
  // CV
  cv_title: "My CV",
  cv_subtitle: "Upload and manage your CV files. Preview PDFs directly in the app.",
  cv_drop: "Drop your CV here or click to upload",
  cv_supports: "Supports PDF files. You can upload multiple versions.",
  cv_choose: "📁 Choose Files",
  cv_upload_btn: "⬆️ Upload Selected Files",
  cv_your_cvs: "📄 Your CVs",
  cv_empty: "No CV uploaded yet. Upload your first CV above.",
  cv_name_modal: "Name Your CV Files",
  cv_name_placeholder: "CV name (e.g. CV_Software_Engineer)",
  // Alerts
  alert_fill_required: "Please fill in all required fields.",
  alert_cv_pdf_only: "Only PDF files are allowed.",
  alert_cv_too_large: "File exceeds 5 MB limit.",
  alert_cv_name_dup: "CV names must be unique.",
  alert_photo_large: "Photo exceeds 2 MB limit.",
  alert_photo_image: "File must be an image (JPG, PNG, WebP).",
  alert_display_empty: "Display name cannot be empty.",
  alert_saved: "✅ Profile saved successfully!",
  alert_cv_uploaded: "CV uploaded successfully!",
  // General
  loading: "Loading...",
  error_generic: "Something went wrong. Please try again.",
  priority_current: "(current)",
  // About page
  about_tagline: "A personal job application management platform to help you navigate the recruitment process with clarity and confidence.",
  about_version: "✦ Version 1.0 · 2026",
  about_stat_apps: "Applications Stored",
  about_stat_sync: "Cloud Sync",
  about_stat_free: "Forever",
  about_mission_title: "🎯 Our Mission",
  about_m1_title: "One Place, All Applications",
  about_m1_desc: "No more messy spreadsheets or scattered notes. All your application info is centralized in one easy-to-access platform.",
  about_m2_title: "Never Miss a Thing",
  about_m2_desc: "Weekly Schedule ensures you always know upcoming interview schedules, so you can prepare with confidence.",
  about_m3_title: "Progress Visualization",
  about_m3_desc: "Visual timelines for each application make it easy to see exactly how far each recruitment process has progressed.",
  about_m4_title: "Smart Notes",
  about_m4_desc: "Save important notes at each recruitment stage — from the interviewer's name to technical questions that came up.",
  about_m5_title: "Privacy First",
  about_m5_desc: "Your data belongs to you. We never sell or share your personal information with third parties.",
  about_m6_title: "Always Free",
  about_m6_desc: "Traqio is completely free to use — no subscriptions, no hidden fees, no premium walls blocking core features.",
  about_story_title: "📖 Background",
  about_story_p1: "Traqio was born from a real-life experience navigating a complex job search. Applying to multiple companies at once, attending various interview sessions, and keeping track of every detail can be overwhelming without a proper system.",
  about_story_p2: "We believe every job seeker deserves a tool to stay organized without paying a premium or learning complex software. Traqio is designed to be simple, fast, and immediately useful from day one.",
  about_story_p3: "With modern cloud technology, all your data syncs automatically and is accessible from any device — laptop, tablet, or smartphone.",
  about_contact_title: "💬 Contact Us",
  about_email_title: "Email",
  about_email_desc: "Send questions or suggestions to our admin",
  about_email_page_title: "Email Admin",
  about_bug_page_title: "Report a Bug",
  about_bug_title: "Report a Bug",
  about_bug_desc: "Found an issue? Help us fix it",
  about_feature_title: "Feature Request",
  about_feature_desc: "Have a feature idea? We'd love to hear it",
  about_feature_page_title: "Feature Requests",
  // How to Use
  htu_badge: "📖 User Guide",
  htu_title: "How to Use Traqio",
  htu_subtitle: "Learn how to get the most out of Traqio and streamline your entire job search process from start to finish.",
  htu_quickstart: "🚀 Get Started in 3 Steps",
  htu_s1_title: "Save Job Vacancies",
  htu_s1_desc: "Browse openings and save roles you want to apply for in the Job Vacancy list before committing to apply.",
  htu_s2_title: "Log Your Applications",
  htu_s2_desc: "Once you've applied, move the role to Active Applications and start adding recruitment stages.",
  htu_s3_title: "Track Every Stage",
  htu_s3_desc: "View all upcoming interviews in Weekly Schedule and manage each recruitment stage with ease.",
  htu_features: "⚡ Key Features",
  htu_f1_title: "Job Vacancy — Manage Openings",
  htu_f1_desc: "Save job openings you want to apply for. Each card shows the company name, position, and date added. Click ➤ to view details or + to add a new vacancy.",
  htu_f2_title: "Active Application — Track Applied Roles",
  htu_f2_desc: "Track all applications you've submitted. Each one has a dedicated detail page where you can add recruitment stages like CV Screening, HR Interview, Technical Test, and more.",
  htu_f3_title: "Weekly Schedule — Next 7 Days",
  htu_f3_desc: "Automatically shows all interview schedules and deadlines within the next 7 days, sorted by nearest date — so you never walk into a session unprepared.",
  htu_f4_title: "Recruitment Stage Timeline",
  htu_f4_desc: "On the application detail page, add each recruitment stage with date, time, and notes. The timeline is visualized horizontally — completed stages are green, active is blue, and upcoming is grey.",
  htu_f5_title: "CV Manager",
  htu_f5_desc: "Upload and manage your CV files directly from your profile. Access quickly via the profile menu in the top right. Preview and download your CV anytime.",
  htu_tips: "💡 Tips & Tricks",
  htu_tip1_title: "Add Deadlines Right Away",
  htu_tip1_desc: "When adding a stage, always fill in the date and time so it appears automatically in Weekly Schedule.",
  htu_tip2_title: "Use the Notes Feature",
  htu_tip2_desc: "Click the ✎ icon on any stage detail to save important notes like the interviewer's name or questions that came up.",
  htu_tip3_title: "Dark Mode",
  htu_tip3_desc: "Enable dark mode via the 🌙 button in the top right for a more comfortable view at night.",
  htu_tip4_title: "Mobile Friendly",
  htu_tip4_desc: "Traqio works on smartphones. Open your browser, navigate to the same URL — all features are available.",
  htu_tip5_title: "Auto Sync",
  htu_tip5_desc: "All data is saved to the cloud in real time. Log in from any device and your data is always there.",
  htu_tip6_title: "Clean Up Old Data",
  htu_tip6_desc: "Delete irrelevant applications via the Danger Zone on the detail page to keep your list clean.",
  htu_cta_title: "Ready to Start Tracking?",
  htu_cta_desc: "Open the dashboard and add your first application now.",
  htu_cta_btn: "Open Dashboard →",
  htu_restart_tour: "Restart Interactive Tour",
  htu_restart_tour_hint: "Takes about 2 minutes. You can skip anytime.",
  // Contact
  email_title: "Email Admin",
  email_subtitle: "Send messages, questions, or suggestions. Admin will reply directly here.",
  email_new_msg: "New Message",
  email_select_msg: "Select a message or start a new one",
  email_compose_title: "New Message to Admin",
  email_inbox: "My Messages",
  email_all_inbox: "All User Inbox",
  admin_mode_msg: "👑 Admin Mode — viewing all user messages and can reply to them.",
  bug_title: "Report a Bug",
  bug_subtitle: "Found something broken? Help us fix it fast with a detailed report.",
  bug_guide_title: "How to write a great bug report",
  bug_guide_1: "Describe what you expected to happen",
  bug_guide_2: "Describe what actually happened",
  bug_guide_3: "List the steps to reproduce it",
  bug_guide_4: "Note which page/feature was affected",
  bug_form_title: "Submit a Bug Report",
  bug_form_note: "Your username will be attached for follow-up.",
  bug_submit_btn: "🐛 Submit Report",
  filter_all: "All",
  filter_open: "Open",
  filter_progress: "In Progress",
  filter_resolved: "Resolved",
  feat_title: "Feature Requests",
  feat_subtitle: "Help shape the future of Traqio",
  feat_vote: "Vote",
  feat_voted: "Voted",
  contact_title: "Contact Us",
  contact_subtitle: "Questions, bug reports, or feature ideas? Pick a channel or send a quick message below.",
  contact_channels: "Contact Channels",
  contact_quick: "Quick Message",
  contact_faq: "FAQ",
  contact_send: "Send Message →",
  contact_success: "✅ Message sent! We'll get back to you soon.",
};

// ── CACHE CONFIG ───────────────────────────────────────────
var I18N_CACHE_VER = "t3_"; // bump to invalidate all caches

// ── ACTIVE TRANSLATIONS (loaded after detect/translate) ───
var _strings = TRAQIO_BASE;
var _currentLang = "en";
var _isTranslating = false;

// ── LANGUAGE DETECTION ─────────────────────────────────────
function detectBrowserLang() {
  var nav = navigator.language || navigator.userLanguage || "en";
  // Return full tag (e.g. "id", "fr", "zh-CN", "pt-BR")
  return nav.toLowerCase();
}

function getLangCode() {
  var stored = localStorage.getItem("ct_lang");
  if (stored) return stored;
  var detected = detectBrowserLang();
  localStorage.setItem("ct_lang", detected);
  return detected;
}

function setLang(lang) {
  localStorage.setItem("ct_lang", lang);
  localStorage.setItem("ct_lang_manual", "1");
  _currentLang = lang;
  initLang(); // re-run translation
}

function getLang() {
  return _currentLang;
}

// ── TRANSLATION ENGINE ─────────────────────────────────────
// Uses Google Translate unofficial endpoint (same as Chrome extension)
// No API key required. Results cached in localStorage.
async function translateText(text, targetLang) {
  if (!text || !targetLang || targetLang.startsWith("en")) return text;
  try {
    var url = "https://translate.googleapis.com/translate_a/single" +
      "?client=gtx" +
      "&sl=en" +
      "&tl=" + encodeURIComponent(targetLang) +
      "&dt=t" +
      "&q=" + encodeURIComponent(text);
    var res = await fetch(url);
    if (!res.ok) return text;
    var data = await res.json();
    // data[0] is array of [translated, original, ...] segments
    var result = (data[0] || []).map(function(seg) { return seg[0] || ""; }).join("");
    return result || text;
  } catch (e) {
    return text;
  }
}

async function loadTranslations(langCode) {
  // English: use base directly
  if (langCode.startsWith("en")) return TRAQIO_BASE;

  // Check cache
  var cacheKey = "traqio_i18n_" + I18N_CACHE_VER + langCode;
  var cached = localStorage.getItem(cacheKey);
  if (cached) {
    try {
      var parsed = JSON.parse(cached);
      if (Object.keys(parsed).length > 10) return parsed;
    } catch (e) {}
  }

  // Translate all base strings
  var keys = Object.keys(TRAQIO_BASE);
  var translated = {};

  // Batch in groups of 20 parallel requests
  var BATCH = 20;
  for (var i = 0; i < keys.length; i += BATCH) {
    var batch = keys.slice(i, i + BATCH);
    var results = await Promise.all(
      batch.map(function(k) { return translateText(TRAQIO_BASE[k], langCode); })
    );
    batch.forEach(function(k, j) { translated[k] = results[j]; });
  }

  // Cache result
  try { localStorage.setItem(cacheKey, JSON.stringify(translated)); } catch(e) {}

  return translated;
}

// ── APPLY TO DOM ───────────────────────────────────────────
function applyStrings(strings) {
  document.querySelectorAll("[data-i18n]").forEach(function(el) {
    var k = el.getAttribute("data-i18n");
    var val = strings[k];
    if (val === undefined) return;
    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
      if (el.type === "submit" || el.type === "button") el.value = val;
    } else {
      el.textContent = val;
    }
  });
  document.querySelectorAll("[data-i18n-ph]").forEach(function(el) {
    var val = strings[el.getAttribute("data-i18n-ph")];
    if (val) el.placeholder = val;
  });
  document.querySelectorAll("[data-i18n-title]").forEach(function(el) {
    var val = strings[el.getAttribute("data-i18n-title")];
    if (val) el.title = val;
  });
}

// ── TRANSLATION HELPER ─────────────────────────────────────
function t(key) {
  return (_strings && _strings[key]) || (TRAQIO_BASE[key]) || key;
}

// ── LANGUAGE SELECTOR UI ───────────────────────────────────
// Replaces the old flag button. Shows globe + current language name.
function buildLangSelector() {
  var existing = document.getElementById("traqioLangSelector");
  if (existing) existing.remove();

  // Get native language name
  var langName = "English";
  var langCode = getLangCode();
  try {
    var dn = new Intl.DisplayNames([langCode], { type: "language" });
    var name = dn.of(langCode.split("-")[0]);
    if (name) langName = name.charAt(0).toUpperCase() + name.slice(1);
  } catch(e) {}

  // Replace .lang-btn content (keep button, update its content)
  document.querySelectorAll(".lang-btn").forEach(function(btn) {
    btn.innerHTML = "🌐 <span class='lang-name'>" + langName + "</span>";
    btn.title = "Change language";
    btn.setAttribute("aria-label", "Current language: " + langName);
    btn.setAttribute("data-lang-trigger", "1");
  });
}

// ── LANGUAGE PICKER MODAL ──────────────────────────────────
// Opens a minimal language picker when user clicks the globe button
var POPULAR_LANGS = [
  { code: "en",    name: "English" },
  { code: "id",    name: "Bahasa Indonesia" },
  { code: "ms",    name: "Bahasa Melayu" },
  { code: "zh-CN", name: "中文（简体）" },
  { code: "zh-TW", name: "中文（繁體）" },
  { code: "ja",    name: "日本語" },
  { code: "ko",    name: "한국어" },
  { code: "ar",    name: "العربية" },
  { code: "fr",    name: "Français" },
  { code: "de",    name: "Deutsch" },
  { code: "es",    name: "Español" },
  { code: "pt",    name: "Português" },
  { code: "ru",    name: "Русский" },
  { code: "hi",    name: "हिन्दी" },
  { code: "th",    name: "ภาษาไทย" },
  { code: "vi",    name: "Tiếng Việt" },
  { code: "tr",    name: "Türkçe" },
  { code: "it",    name: "Italiano" },
  { code: "nl",    name: "Nederlands" },
  { code: "pl",    name: "Polski" },
];

function openLangPicker() {
  var existing = document.getElementById("traqioLangModal");
  if (existing) { existing.remove(); return; }

  var current = getLangCode();

  // Inject style
  if (!document.getElementById("traqioLangStyle")) {
    var s = document.createElement("style");
    s.id = "traqioLangStyle";
    s.textContent = [
      "#traqioLangModal{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.55);backdrop-filter:blur(4px);animation:traqioFadeIn .2s ease}",
      "@keyframes traqioFadeIn{from{opacity:0}to{opacity:1}}",
      ".traqio-lang-box{background:var(--card-bg,#fff);border:1px solid var(--border,#e2e6ed);border-radius:16px;padding:1.5rem;width:min(420px,90vw);max-height:80vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 24px 60px rgba(0,0,0,.3);font-family:'Poppins',sans-serif}",
      ".traqio-lang-box h3{font-size:.95rem;font-weight:700;color:var(--text,#2c3344);margin-bottom:1rem;display:flex;align-items:center;gap:.5rem}",
      ".traqio-lang-grid{display:grid;grid-template-columns:1fr 1fr;gap:.5rem;overflow-y:auto;max-height:55vh;padding-right:.25rem}",
      ".traqio-lang-grid::-webkit-scrollbar{width:4px}.traqio-lang-grid::-webkit-scrollbar-track{background:transparent}.traqio-lang-grid::-webkit-scrollbar-thumb{background:var(--border,#e2e6ed);border-radius:4px}",
      ".traqio-lang-item{padding:.55rem .8rem;border-radius:8px;border:1.5px solid var(--border,#e2e6ed);background:var(--surface,#f8f9fb);cursor:pointer;font-size:.82rem;font-weight:500;color:var(--text,#2c3344);transition:all .15s;text-align:left;display:flex;align-items:center;gap:.4rem}",
      ".traqio-lang-item:hover{border-color:var(--brand,#5c667a);background:rgba(92,102,122,.06)}",
      ".traqio-lang-item.active{border-color:var(--brand,#5c667a);background:rgba(92,102,122,.1);font-weight:700}",
      ".traqio-lang-item .check{margin-left:auto;color:var(--brand,#5c667a);font-size:.9rem}",
      ".traqio-lang-close{margin-top:1rem;width:100%;padding:.6rem;border-radius:8px;border:1.5px solid var(--border,#e2e6ed);background:transparent;cursor:pointer;font-size:.82rem;font-weight:600;color:var(--muted,#6b7280);font-family:inherit;transition:all .15s}",
      ".traqio-lang-close:hover{border-color:var(--brand,#5c667a);color:var(--brand,#5c667a)}",
      ".traqio-translating{display:flex;align-items:center;gap:.5rem;font-size:.78rem;color:var(--muted,#6b7280);margin-top:.75rem;padding:.5rem .75rem;background:rgba(92,102,122,.06);border-radius:8px}",
      ".traqio-spinner{width:14px;height:14px;border:2px solid rgba(92,102,122,.2);border-top-color:var(--brand,#5c667a);border-radius:50%;animation:traqioSpin .7s linear infinite;flex-shrink:0}",
      "@keyframes traqioSpin{to{transform:rotate(360deg)}}",
      "[data-theme='dark'] .traqio-lang-box{background:var(--card-bg,#1e2235);color:var(--text,#d1d5db)}",
      "[data-theme='dark'] .traqio-lang-item{background:rgba(255,255,255,.04);color:var(--text,#d1d5db)}",
    ].join("");
    document.head.appendChild(s);
  }

  var modal = document.createElement("div");
  modal.id = "traqioLangModal";

  var box = document.createElement("div");
  box.className = "traqio-lang-box";

  var title = document.createElement("h3");
  title.innerHTML = "🌐 Select Language";
  box.appendChild(title);

  var grid = document.createElement("div");
  grid.className = "traqio-lang-grid";

  POPULAR_LANGS.forEach(function(lang) {
    var item = document.createElement("button");
    item.className = "traqio-lang-item" + (current.startsWith(lang.code.split("-")[0]) || lang.code === current ? " active" : "");
    item.innerHTML = lang.name + (current === lang.code || current.startsWith(lang.code.split("-")[0]) && lang.code.split("-").length === 1 ? ' <span class="check">✓</span>' : "");
    item.onclick = function() {
      modal.remove();
      if (!current.startsWith(lang.code.split("-")[0])) {
        setLang(lang.code);
      }
    };
    grid.appendChild(item);
  });

  box.appendChild(grid);

  // Translating indicator (shown when translation is running)
  if (_isTranslating) {
    var indicator = document.createElement("div");
    indicator.className = "traqio-translating";
    indicator.innerHTML = '<div class="traqio-spinner"></div> Translating interface...';
    box.appendChild(indicator);
  }

  var closeBtn = document.createElement("button");
  closeBtn.className = "traqio-lang-close";
  closeBtn.textContent = "Cancel";
  closeBtn.onclick = function() { modal.remove(); };
  box.appendChild(closeBtn);

  modal.appendChild(box);
  document.body.appendChild(modal);

  // Close on backdrop click
  modal.addEventListener("click", function(e) {
    if (e.target === modal) modal.remove();
  });
}

// ── TRANSLATING STATUS BAR ─────────────────────────────────
var _statusBar = null;
function showTranslatingBar(langName) {
  if (_statusBar) return;
  _statusBar = document.createElement("div");
  _statusBar.id = "traqioTransBar";
  Object.assign(_statusBar.style, {
    position: "fixed", top: "0", left: "0", right: "0",
    zIndex: "99998", background: "var(--brand, #5c667a)",
    color: "#fff", fontSize: ".75rem", fontFamily: "'Poppins', sans-serif",
    fontWeight: "600", padding: ".4rem 1rem",
    display: "flex", alignItems: "center", gap: ".5rem",
    boxShadow: "0 2px 8px rgba(0,0,0,.2)",
    animation: "traqioSlideDown .3s ease",
  });
  if (!document.getElementById("traqioBarStyle")) {
    var s = document.createElement("style");
    s.id = "traqioBarStyle";
    s.textContent = "@keyframes traqioSlideDown{from{transform:translateY(-100%)}to{transform:translateY(0)}}";
    document.head.appendChild(s);
  }
  var spin = document.createElement("div");
  spin.style.cssText = "width:12px;height:12px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:traqioSpin .7s linear infinite;flex-shrink:0";
  _statusBar.appendChild(spin);
  _statusBar.appendChild(document.createTextNode("Translating to " + langName + "…"));
  document.body.appendChild(_statusBar);
}
function hideTranslatingBar() {
  if (_statusBar) { _statusBar.remove(); _statusBar = null; }
}

// ── INIT ───────────────────────────────────────────────────
async function initLang() {
  var langCode = getLangCode();
  _currentLang = langCode;

  // Apply base English immediately (no flicker)
  _strings = TRAQIO_BASE;
  document.documentElement.lang = langCode.split("-")[0];
  applyStrings(TRAQIO_BASE);
  buildLangSelector();

  // If English — done
  if (langCode.startsWith("en")) {
    // Wire lang-btn click
    wireLangBtn();
    document.dispatchEvent(new CustomEvent("ct_langchange", { detail: { lang: langCode } }));
    return;
  }

  // Non-English: translate
  _isTranslating = true;

  // Show language name for status bar
  var langName = langCode;
  try {
    var dn = new Intl.DisplayNames(["en"], { type: "language" });
    langName = dn.of(langCode.split("-")[0]) || langCode;
  } catch(e) {}

  // Only show bar if NOT cached (will need network)
  var cacheKey = "traqio_i18n_" + I18N_CACHE_VER + langCode;
  var hasCached = !!localStorage.getItem(cacheKey);
  if (!hasCached) showTranslatingBar(langName);

  try {
    var translated = await loadTranslations(langCode);
    _strings = translated;
    applyStrings(translated);
    buildLangSelector();
    document.documentElement.lang = langCode.split("-")[0];
    document.dispatchEvent(new CustomEvent("ct_langchange", { detail: { lang: langCode } }));
  } catch(e) {
    console.warn("[i18n] Translation failed, using English:", e);
  } finally {
    _isTranslating = false;
    hideTranslatingBar();
    wireLangBtn();
  }
}

function wireLangBtn() {
  document.querySelectorAll(".lang-btn").forEach(function(btn) {
    // Remove old listeners by cloning
    var fresh = btn.cloneNode(true);
    btn.parentNode.replaceChild(fresh, btn);
    fresh.addEventListener("click", function(e) {
      e.stopPropagation();
      openLangPicker();
    });
  });
}

// ── EXPORTS ────────────────────────────────────────────────
window.t           = t;
window.setLang     = setLang;
window.getLang     = getLang;
window.getLangCode = getLangCode;
window.initLang    = initLang;
window.openLangPicker = openLangPicker;

// ── START ──────────────────────────────────────────────────
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLang);
} else {
  initLang();
}

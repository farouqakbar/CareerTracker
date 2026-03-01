// ============================================================
// i18n.js — CareerTracker Bilingual System (EN / ID)
// Usage: t('key') → translated string
//        setLang('en'|'id') → switch language
//        initLang() → call on DOMContentLoaded
// ============================================================

const CT_LANG = {
  en: {
    // Nav / Sidebar
    nav_home: "Home",
    nav_how_to_use: "How to Use",
    nav_about: "About",
    nav_profile: "👤 Profile",
    nav_my_cv: "📄 My CV",
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
    // Stage box card labels
    stagebox_card_label: "Stage Information Card",
    stagebox_hint: "Click a stage circle above to view details",
    stagebox_info: "Application Summary Card",
    // Danger Zone
    danger_title: "⚠️ Danger Zone",
    danger_desc:
      "Permanently delete this application and all its stage data. This action cannot be undone.",
    danger_btn: "🗑️ Delete Application",
    danger_account_desc:
      "Once you delete your account, all data will be permanently removed.",
    danger_account_btn: "🗑️ Delete Account",
    // Weekly
    ws_upcoming: "Upcoming",
    ws_days_left: "day(s) left",
    ws_no_events: "No events scheduled this week.",
    // Empty states
    empty_apps: "No applications yet. Click + Add to start.",
    empty_vacs: "No vacancies yet. Click + Add to start.",
    // Login
    login_title: "Sign In",
    login_signup: "Sign Up",
    login_no_account: "Don't have an account?",
    login_have_account: "Already have an account?",
    login_create: "Create Account",
    login_get_started: "Get Started",
    login_i_have: "I have an account",
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
    // CV
    cv_title: "My CV",
    cv_subtitle:
      "Upload and manage your CV files. Preview PDFs directly in the app.",
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

    // ── About page ──
    about_tagline:
      "A personal job application management platform to help you navigate the recruitment process with clarity and confidence.",
    about_version: "✦ Version 1.0 · 2026",
    about_stat_apps: "Applications Stored",
    about_stat_sync: "Cloud Sync",
    about_stat_free: "Forever",
    about_mission_title: "🎯 Our Mission",
    about_m1_title: "One Place, All Applications",
    about_m1_desc:
      "No more messy spreadsheets or scattered notes. All your application info is centralized in one easy-to-access platform.",
    about_m2_title: "Never Miss a Thing",
    about_m2_desc:
      "Weekly Schedule ensures you always know upcoming interview schedules, so you can prepare with confidence.",
    about_m3_title: "Progress Visualization",
    about_m3_desc:
      "Visual timelines for each application make it easy to see exactly how far each recruitment process has progressed.",
    about_m4_title: "Smart Notes",
    about_m4_desc:
      "Save important notes at each recruitment stage — from the interviewer's name to technical questions that came up, for future reference.",
    about_m5_title: "Privacy First",
    about_m5_desc:
      "Your data belongs to you. We never sell or share your personal information with third parties.",
    about_m6_title: "Always Free",
    about_m6_desc:
      "CareerTracker is completely free to use — no subscriptions, no hidden fees, no premium walls blocking core features.",
    about_story_title: "📖 Background",
    about_story_p1:
      "CareerTracker was born from a real-life experience navigating a complex job search. Applying to multiple companies at once, attending various interview sessions, and keeping track of every detail — it can be overwhelming without a proper system.",
    about_story_p2:
      "We believe every job seeker deserves a tool to stay organized without paying a premium or learning complex software. CareerTracker is designed to be simple, fast, and immediately useful from day one.",
    about_story_p3:
      "With modern cloud technology, all your data syncs automatically and is accessible from any device — laptop, tablet, or smartphone.",
    about_contact_title: "💬 Contact Us",
    about_email_title: "Email",
    about_email_desc: "Send questions or suggestions to our email",
    about_bug_title: "Report a Bug",
    about_bug_desc: "Found an issue? Help us fix it",
    about_feature_title: "Feature Request",
    about_feature_desc: "Have a feature idea? We'd love to hear it",

    // ── How to Use page ──
    htu_badge: "📖 User Guide",
    htu_title: "How to Use CareerTracker",
    htu_subtitle:
      "Learn how to get the most out of CareerTracker and streamline your entire job search process from start to finish.",
    htu_quickstart: "🚀 Get Started in 3 Steps",
    htu_s1_title: "Save Job Vacancies",
    htu_s1_desc:
      "Browse openings and save roles you want to apply for in the Job Vacancy list before committing to apply.",
    htu_s2_title: "Log Your Applications",
    htu_s2_desc:
      "Once you've applied, move the role to Active Applications and start adding recruitment stages.",
    htu_s3_title: "Track Every Stage",
    htu_s3_desc:
      "View all upcoming interviews in Weekly Schedule and manage each recruitment stage with ease.",
    htu_features: "⚡ Key Features",
    htu_f1_title: "Job Vacancy — Manage Openings",
    htu_f1_desc:
      "Save job openings you want to apply for. Each card shows the company name, position, and date added. Click ➤ to view details or + to add a new vacancy.",
    htu_f2_title: "Active Application — Track Applied Roles",
    htu_f2_desc:
      "Track all applications you've submitted. Each one has a dedicated detail page where you can add recruitment stages like CV Screening, HR Interview, Technical Test, and more.",
    htu_f3_title: "Weekly Schedule — Next 7 Days",
    htu_f3_desc:
      "Automatically shows all interview schedules and deadlines within the next 7 days, sorted by nearest date — so you never walk into a session unprepared.",
    htu_f4_title: "Recruitment Stage Timeline",
    htu_f4_desc:
      "On the application detail page, add each recruitment stage with date, time, and notes. The timeline is visualized horizontally — completed stages are green, active is blue, and upcoming is grey.",
    htu_f5_title: "CV Manager",
    htu_f5_desc:
      "Upload and manage your CV files directly from your profile. Access quickly via the profile menu in the top right. Preview and download your CV anytime.",
    htu_tips: "💡 Tips & Tricks",
    htu_tip1_title: "Add Deadlines Right Away",
    htu_tip1_desc:
      "When adding a stage, always fill in the date and time so it appears automatically in Weekly Schedule.",
    htu_tip2_title: "Use the Notes Feature",
    htu_tip2_desc:
      "Click the ✎ icon on any stage detail to save important notes like the interviewer's name or questions that came up.",
    htu_tip3_title: "Dark Mode",
    htu_tip3_desc:
      "Enable dark mode via the 🌙 button in the top right for a more comfortable view at night.",
    htu_tip4_title: "Mobile Friendly",
    htu_tip4_desc:
      "CareerTracker works on smartphones. Open your browser, navigate to the same URL — all features are available.",
    htu_tip5_title: "Auto Sync",
    htu_tip5_desc:
      "All data is saved to the cloud in real time. Log in from any device and your data is always there.",
    htu_tip6_title: "Clean Up Old Data",
    htu_tip6_desc:
      "Delete irrelevant applications via the Danger Zone on the detail page to keep your list clean.",
    htu_cta_title: "Ready to Start Tracking?",
    htu_cta_desc: "Open the dashboard and add your first application now.",
    htu_cta_btn: "Open Dashboard →",
  },
  id: {
    // Nav / Sidebar
    nav_home: "Beranda",
    nav_how_to_use: "Cara Pakai",
    nav_about: "Tentang",
    nav_profile: "👤 Profil",
    nav_my_cv: "📄 CV Saya",
    nav_sign_out: "🚪 Keluar",
    // Carousel cards
    card_job_vacancy: "Lowongan Kerja",
    card_job_sub: "Lowongan tersimpan",
    card_weekly: "Jadwal Mingguan",
    card_weekly_sub: "Event minggu ini",
    card_active: "Lamaran Aktif",
    card_active_sub: "Sedang berjalan",
    // Panels / Tables
    panel_weekly: "Jadwal Mingguan",
    panel_applied: "Lamaran Aktif",
    panel_jobs: "Lowongan Kerja",
    th_priority: "Prioritas",
    th_date: "Tanggal",
    th_company: "Perusahaan",
    th_program: "Program",
    th_position: "Posisi",
    th_status: "Status",
    th_stage: "Tahap",
    th_detail: "Detail",
    th_deadline: "Batas Waktu",
    th_link: "Tautan",
    th_delete: "Hapus",
    // Buttons
    btn_add: "+ Tambah",
    btn_save: "Simpan",
    btn_cancel: "Batal",
    btn_delete: "Hapus",
    btn_yes: "Ya",
    btn_no: "Tidak",
    btn_confirm: "Konfirmasi",
    btn_upload: "Unggah",
    // Status
    status_active: "Aktif",
    status_rejected: "Ditolak",
    status_pending: "Tertunda",
    status_discontinued: "Dibatalkan",
    status_applied: "Sudah Melamar",
    status_not_applied: "Belum Melamar",
    // Modals
    modal_add_app: "Tambah Lamaran",
    modal_add_vacancy: "Tambah Lowongan",
    modal_delete_vacancy: "Hapus Lowongan?",
    modal_change_priority: "Ubah Prioritas",
    modal_add_stage: "Tambah Tahap",
    modal_confirm: "Konfirmasi",
    // Form labels
    label_company: "Nama Perusahaan",
    label_program: "Nama Program",
    label_position: "Posisi",
    label_deadline: "Batas Waktu Lamaran",
    label_link: "Tautan Pendaftaran",
    label_step_no: "Nomor Langkah",
    label_stage_name: "Nama Tahap",
    label_date: "Tanggal",
    label_time: "Waktu",
    label_search: "Cari perusahaan...",
    // App Detail
    detail_info: "Info Lamaran",
    detail_stage_label: "Tahap Rekrutmen",
    detail_deadline_label: "Tanggal & Waktu",
    detail_note_label: "Catatan",
    detail_empty_note: "Belum ada catatan. Klik ✎ untuk menambahkan.",
    detail_empty_stage: "Tambahkan tahap rekrutmen pertama Anda.",
    detail_stage_done: "selesai",
    detail_delete_title: "Hapus Lamaran",
    // Stage box card labels
    stagebox_card_label: "Kartu Informasi Tahap",
    stagebox_hint: "Klik lingkaran tahap di atas untuk melihat detail",
    stagebox_info: "Kartu Ringkasan Lamaran",
    // Danger Zone
    danger_title: "⚠️ Zona Berbahaya",
    danger_desc:
      "Hapus permanen lamaran ini beserta semua data tahapnya. Tindakan ini tidak dapat dibatalkan.",
    danger_btn: "🗑️ Hapus Lamaran",
    danger_account_desc:
      "Setelah akun dihapus, semua data akan dihapus permanen.",
    danger_account_btn: "🗑️ Hapus Akun",
    // Weekly
    ws_upcoming: "Akan Datang",
    ws_days_left: "hari lagi",
    ws_no_events: "Tidak ada jadwal minggu ini.",
    // Empty states
    empty_apps: "Belum ada lamaran. Klik + Tambah untuk mulai.",
    empty_vacs: "Belum ada lowongan. Klik + Tambah untuk mulai.",
    // Login
    login_title: "Masuk",
    login_signup: "Daftar",
    login_no_account: "Belum punya akun?",
    login_have_account: "Sudah punya akun?",
    login_create: "Buat Akun",
    login_get_started: "Mulai Sekarang",
    login_i_have: "Saya punya akun",
    // Profile
    profile_title: "Pengaturan Profil",
    profile_subtitle: "Kelola informasi akun dan preferensi Anda.",
    profile_account_info: "👤 Informasi Akun",
    profile_username: "Nama Pengguna",
    profile_username_hint:
      "Nama pengguna tidak dapat diubah setelah pendaftaran.",
    profile_display: "Nama Tampilan",
    profile_display_hint: "Nama ini akan muncul di seluruh aplikasi.",
    profile_save: "Simpan Perubahan",
    profile_cancel: "Batal",
    profile_upload: "📷 Upload Foto",
    profile_remove: "✕ Hapus",
    // CV
    cv_title: "CV Saya",
    cv_subtitle:
      "Upload dan kelola file CV Anda. Preview PDF langsung di aplikasi.",
    cv_drop: "Jatuhkan CV di sini atau klik untuk upload",
    cv_supports: "Mendukung file PDF. Bisa upload beberapa versi.",
    cv_choose: "📁 Pilih File",
    cv_upload_btn: "⬆️ Upload File Terpilih",
    cv_your_cvs: "📄 CV Anda",
    cv_empty: "Belum ada CV. Upload CV pertama Anda di atas.",
    cv_name_modal: "Beri Nama File CV",
    cv_name_placeholder: "Nama CV (misal: CV_Software_Engineer)",
    // Alerts
    alert_fill_required: "Mohon isi semua kolom yang diperlukan.",
    alert_cv_pdf_only: "Hanya file PDF yang diperbolehkan.",
    alert_cv_too_large: "File melebihi batas 5 MB.",
    alert_cv_name_dup: "Nama CV tidak boleh sama.",
    alert_photo_large: "Foto melebihi batas 2 MB.",
    alert_photo_image: "File harus berupa gambar (JPG, PNG, WebP).",
    alert_display_empty: "Nama tampilan tidak boleh kosong.",
    alert_saved: "✅ Profil berhasil disimpan!",
    alert_cv_uploaded: "CV berhasil diupload!",
    // General
    loading: "Memuat...",
    error_generic: "Terjadi kesalahan. Silakan coba lagi.",
    priority_current: "(saat ini)",

    // ── About page ──
    about_tagline:
      "Platform manajemen lamaran kerja pribadi untuk membantu Anda menavigasi proses rekrutmen dengan jelas dan percaya diri.",
    about_version: "✦ Versi 1.0 · 2026",
    about_stat_apps: "Lamaran Tersimpan",
    about_stat_sync: "Sinkronisasi Cloud",
    about_stat_free: "Selamanya",
    about_mission_title: "🎯 Misi Kami",
    about_m1_title: "Satu Tempat, Semua Lamaran",
    about_m1_desc:
      "Tidak perlu lagi spreadsheet berantakan atau catatan tersebar. Semua info lamaran Anda terpusat di satu platform yang mudah diakses.",
    about_m2_title: "Jangan Sampai Ketinggalan",
    about_m2_desc:
      "Jadwal Mingguan memastikan Anda selalu tahu jadwal wawancara yang akan datang, sehingga Anda bisa mempersiapkan diri dengan percaya diri.",
    about_m3_title: "Visualisasi Progres",
    about_m3_desc:
      "Timeline visual untuk setiap lamaran memudahkan Anda melihat seberapa jauh setiap proses rekrutmen telah berlangsung.",
    about_m4_title: "Catatan Cerdas",
    about_m4_desc:
      "Simpan catatan penting di setiap tahap rekrutmen — mulai dari nama pewawancara hingga pertanyaan teknis yang muncul, untuk referensi di masa mendatang.",
    about_m5_title: "Privasi Terjaga",
    about_m5_desc:
      "Data Anda milik Anda sendiri. Kami tidak pernah menjual atau membagikan informasi pribadi Anda kepada pihak ketiga.",
    about_m6_title: "Selalu Gratis",
    about_m6_desc:
      "CareerTracker sepenuhnya gratis — tanpa langganan, tanpa biaya tersembunyi, tanpa fitur inti yang dikunci di balik paywall.",
    about_story_title: "📖 Latar Belakang",
    about_story_p1:
      "CareerTracker lahir dari pengalaman nyata dalam menavigasi pencarian kerja yang kompleks. Melamar ke banyak perusahaan sekaligus, menghadiri berbagai sesi wawancara, dan melacak setiap detail — semuanya bisa sangat melelahkan tanpa sistem yang tepat.",
    about_story_p2:
      "Kami percaya setiap pencari kerja berhak mendapatkan alat untuk tetap terorganisir tanpa harus membayar mahal atau mempelajari perangkat lunak yang rumit. CareerTracker dirancang untuk sederhana, cepat, dan langsung berguna sejak hari pertama.",
    about_story_p3:
      "Dengan teknologi cloud modern, semua data Anda tersinkronisasi secara otomatis dan dapat diakses dari perangkat apa pun — laptop, tablet, atau smartphone.",
    about_contact_title: "💬 Hubungi Kami",
    about_email_title: "Email",
    about_email_desc: "Kirim pertanyaan atau saran ke email kami",
    about_bug_title: "Laporkan Bug",
    about_bug_desc: "Menemukan masalah? Bantu kami memperbaikinya",
    about_feature_title: "Permintaan Fitur",
    about_feature_desc: "Punya ide fitur? Kami ingin mendengarnya",

    // ── How to Use page ──
    htu_badge: "📖 Panduan Pengguna",
    htu_title: "Cara Menggunakan CareerTracker",
    htu_subtitle:
      "Pelajari cara memaksimalkan CareerTracker dan sederhanakan seluruh proses pencarian kerja Anda dari awal hingga akhir.",
    htu_quickstart: "🚀 Mulai dalam 3 Langkah",
    htu_s1_title: "Simpan Lowongan Kerja",
    htu_s1_desc:
      "Temukan lowongan dan simpan posisi yang ingin Anda lamar di daftar Lowongan Kerja sebelum mulai melamar.",
    htu_s2_title: "Catat Lamaran Anda",
    htu_s2_desc:
      "Setelah melamar, pindahkan posisi tersebut ke Lamaran Aktif dan mulai tambahkan tahap rekrutmen.",
    htu_s3_title: "Lacak Setiap Tahap",
    htu_s3_desc:
      "Lihat semua wawancara mendatang di Jadwal Mingguan dan kelola setiap tahap rekrutmen dengan mudah.",
    htu_features: "⚡ Fitur Utama",
    htu_f1_title: "Lowongan Kerja — Kelola Lowongan",
    htu_f1_desc:
      "Simpan lowongan yang ingin Anda lamar. Setiap kartu menampilkan nama perusahaan, posisi, dan tanggal ditambahkan. Klik ➤ untuk melihat detail atau + untuk menambah lowongan baru.",
    htu_f2_title: "Lamaran Aktif — Lacak Lamaran",
    htu_f2_desc:
      "Lacak semua lamaran yang telah Anda kirim. Setiap lamaran memiliki halaman detail tersendiri tempat Anda dapat menambahkan tahap rekrutmen seperti Seleksi CV, Wawancara HR, Tes Teknis, dan lainnya.",
    htu_f3_title: "Jadwal Mingguan — 7 Hari ke Depan",
    htu_f3_desc:
      "Menampilkan secara otomatis semua jadwal wawancara dan tenggat waktu dalam 7 hari ke depan, diurutkan berdasarkan tanggal terdekat — agar Anda tidak pernah masuk sesi tanpa persiapan.",
    htu_f4_title: "Timeline Tahap Rekrutmen",
    htu_f4_desc:
      "Di halaman detail lamaran, tambahkan setiap tahap rekrutmen dengan tanggal, waktu, dan catatan. Timeline divisualisasikan secara horizontal — tahap selesai berwarna hijau, aktif berwarna biru, dan yang akan datang berwarna abu-abu.",
    htu_f5_title: "Manajer CV",
    htu_f5_desc:
      "Upload dan kelola file CV Anda langsung dari profil. Akses cepat melalui menu profil di pojok kanan atas. Preview dan unduh CV Anda kapan saja.",
    htu_tips: "💡 Tips & Trik",
    htu_tip1_title: "Tambahkan Tenggat Waktu Segera",
    htu_tip1_desc:
      "Saat menambahkan tahap, selalu isi tanggal dan waktu agar otomatis muncul di Jadwal Mingguan.",
    htu_tip2_title: "Gunakan Fitur Catatan",
    htu_tip2_desc:
      "Klik ikon ✎ pada detail tahap mana pun untuk menyimpan catatan penting seperti nama pewawancara atau pertanyaan yang muncul.",
    htu_tip3_title: "Mode Gelap",
    htu_tip3_desc:
      "Aktifkan mode gelap melalui tombol 🌙 di pojok kanan atas untuk tampilan yang lebih nyaman di malam hari.",
    htu_tip4_title: "Ramah Mobile",
    htu_tip4_desc:
      "CareerTracker berfungsi di smartphone. Buka browser, navigasikan ke URL yang sama — semua fitur tersedia.",
    htu_tip5_title: "Sinkronisasi Otomatis",
    htu_tip5_desc:
      "Semua data tersimpan ke cloud secara real time. Login dari perangkat mana pun dan data Anda selalu ada.",
    htu_tip6_title: "Bersihkan Data Lama",
    htu_tip6_desc:
      "Hapus lamaran yang tidak relevan melalui Zona Berbahaya di halaman detail agar daftar Anda tetap rapi.",
    htu_cta_title: "Siap Mulai Melacak?",
    htu_cta_desc: "Buka dashboard dan tambahkan lamaran pertama Anda sekarang.",
    htu_cta_btn: "Buka Dashboard →",
  },
};

(function () {
  function getLang() {
    return localStorage.getItem("ct_lang") || "en";
  }

  function setLang(lang) {
    if (!CT_LANG[lang]) return;
    localStorage.setItem("ct_lang", lang);
    applyAll();
    updateToggles();
    // Dispatch event so dynamic JS can re-render
    document.dispatchEvent(
      new CustomEvent("ct_langchange", { detail: { lang } }),
    );
  }

  function t(key) {
    const l = getLang();
    return (
      (CT_LANG[l] && CT_LANG[l][key]) || (CT_LANG.en && CT_LANG.en[key]) || key
    );
  }

  function applyAll() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const k = el.getAttribute("data-i18n");
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        if (el.type !== "submit" && el.type !== "button") return;
        el.value = t(k);
      } else {
        el.textContent = t(k);
      }
    });
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
      el.placeholder = t(el.getAttribute("data-i18n-ph"));
    });
    document.querySelectorAll("[data-i18n-title]").forEach((el) => {
      el.title = t(el.getAttribute("data-i18n-title"));
    });
    document.documentElement.lang = getLang() === "id" ? "id" : "en";
  }

  function updateToggles() {
    const l = getLang();
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.textContent = l === "id" ? "🇮🇩 ID" : "🇬🇧 EN";
      btn.title =
        l === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia";
    });
  }

  function initLang() {
    applyAll();
    updateToggles();
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".lang-btn");
      if (!btn) return;
      setLang(getLang() === "id" ? "en" : "id");
    });
  }

  window.t = t;
  window.setLang = setLang;
  window.getLang = getLang;
  window.initLang = initLang;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLang);
  } else {
    initLang();
  }
})();

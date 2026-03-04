// ============================================================
// onboarding.js — CareerTracker Interactive Tutorial  v4.0
// Live interactive demos · Task-based learning · Pro design
// ============================================================
(function () {
  'use strict';

  /* ══════════════════════════════════════════════════════════
     TRANSLATIONS
  ══════════════════════════════════════════════════════════ */
  const OB_LANG = {
    en: {
      welcome_title:    "Welcome to CareerTracker! 🎉",
      welcome_subtitle: "Learn by doing — our interactive tutorial walks you through each feature with live demos.",
      welcome_time:     "~2 minutes",
      welcome_feat1:    "Live interactive demos",
      welcome_feat2:    "Spotlight what matters",
      welcome_feat3:    "Step-by-step guidance",
      start_btn:        "Start Interactive Tour →",
      skip_btn:         "Skip",
      lang_title:       "Choose Your Language",
      lang_subtitle:    "Select the language you'd like to use throughout CareerTracker.",
      lang_confirm:     "Continue →",
      prev:             "← Back",
      next:             "Next →",
      finish:           "Let's Go! 🚀",
      step_of:          "of",
      skip_confirm:     "Skip the tutorial? You can restart it anytime from the How to Use page.",
      skip_yes:         "Skip",
      skip_no:          "Continue Tour",

      s1_title: "Add Your First Application",
      s1_desc:  "Click the <strong>Active Applications</strong> card in the carousel to open the applications panel, then hit <strong>+ Add</strong> to log a new job application.",
      s1_tip:   "Each application gets its own detail page with a full recruitment timeline.",
      s1_demo_title: "Try it below:",

      s1b_title: "How to Add an Application",
      s1b_desc:  "Fill in the <strong>Company Name</strong>, <strong>Program Name</strong>, and <strong>Position</strong> fields in the modal, then click <strong>Save</strong>. You'll be taken straight to the Application Detail page.",
      s1b_tip:   "Company and Program are required. Position is optional but recommended.",

      s2_title: "Application Detail Page",
      s2_desc:  "Click <strong>📋 Detail</strong> in any row to open the full Application Info page. Track every recruitment stage from screening to job offer.",
      s2_tip:   "Click any stage circle to view notes, dates, and deadlines for that step.",
      s2_demo_title: "Recruitment flow:",

      s2b_title: "How to Add a Stage",
      s2b_desc:  "On the Application Detail page, click the <strong>＋ (Add Stage)</strong> button to create a new recruitment step. Type the stage name (e.g. \"HR Interview\") and press <strong>Enter</strong> or click <strong>Add</strong>.",
      s2b_tip:   "After adding a stage, click its circle to set the date, time, and notes.",

      s3_title: "Active Applications Table",
      s3_desc:  "The <strong>Active Applications</strong> table shows all your ongoing applications — priority, date, company, program, position, status, and current stage.",
      s3_tip:   "Click the priority number to reorder. Use the search bar to filter quickly.",
      s3_demo_title: "Live search preview:",

      s4_title: "Job Vacancies",
      s4_desc:  "The <strong>Job Vacancy</strong> card is your personal job board. Save openings with deadlines and links so nothing slips through.",
      s4_tip:   "Mark a vacancy as 'Applied' once you've submitted your application.",

      s5_title: "My CV Manager",
      s5_desc:  "Access your <strong>CV Manager</strong> from the profile menu. Upload multiple CV versions as PDFs, preview them directly, and keep them organized.",
      s5_tip:   "Name each CV clearly (e.g. CV_Software_2026) so you always pick the right version.",
      s5_demo_title: "CV Manager preview:",

      s6_title: "Contact & Support",
      s6_desc:  "Have a question, found a bug, or want to suggest a feature? Open <strong>Contact Us</strong> from the profile menu to reach admin directly.",
      s6_tip:   "Feature requests with the most votes get prioritized for development!",

      done_title: "You're all set! 🎉",
      done_desc:  "Your CareerTracker workspace is ready. Start by adding your first application!",
      done_btn:   "Start Tracking! 🚀",

      dt1_title: "Application Summary",
      dt1_desc:  "This card shows the <strong>company name</strong>, <strong>program</strong>, and current <strong>status badge</strong> at a glance. The status updates automatically as recruitment progresses.",
      dt1_tip:   "Click the ✎ edit button to rename the company or program anytime.",

      dt2_title: "Edit & Add Stage Buttons",
      dt2_desc:  "The <strong>✎ Edit</strong> and <strong>＋ Add Stage</strong> buttons are now at the top-right of the <strong>Recruitment Stage</strong> section. Use ✎ to rename company/program, and ＋ to insert a new stage.",
      dt2_tip:   "Edit mode also lets you delete individual stages by clicking the 🗑 icon on each stage circle.",

      dt3_title: "Recruitment Progress",
      dt3_desc:  "The <strong>progress bar</strong> shows how far you are through recruitment. It automatically counts stages whose scheduled date has already passed.",
      dt3_tip:   "A stage turns green ✅ once its scheduled date has passed.",

      dt4_title: "Timeline Stages",
      dt4_desc:  "Each numbered circle is a <strong>recruitment stage</strong>. Green = done ✅, Blue = current/upcoming 🔵, Grey = no date set yet. Click any circle to view its details.",
      dt4_tip:   "Click 'Watch Demo' to see a live simulation of clicking a stage!",

      dt5_title: "Stage Detail Card",
      dt5_desc:  "After clicking a stage, this card shows the <strong>stage name</strong>, <strong>scheduled date & time</strong>, and your <strong>personal notes</strong>. Everything is editable.",
      dt5_tip:   "Click ✎ on the card to edit date, time, and add notes about that recruitment step.",

      dt6_title: "Danger Zone",
      dt6_desc:  "At the bottom sits the <strong>Danger Zone</strong>. Use this only to permanently delete an entire application and all its stage data. A confirmation dialog will appear first.",
      dt6_tip:   "Deleted applications cannot be recovered — use with care!",

      dt_done_title: "Detail Page Tour Complete! ✅",
      dt_done_desc:  "You now know everything about the Application Detail page. Go track your recruitment journey!",
      dt_done_btn:   "Got It! 🚀",

      sim_btn: "Watch Demo ▶",
    },

    id: {
      welcome_title:    "Selamat Datang di CareerTracker! 🎉",
      welcome_subtitle: "Belajar sambil praktik — tutorial interaktif kami membimbing kamu dengan demo langsung.",
      welcome_time:     "~2 menit",
      welcome_feat1:    "Demo interaktif langsung",
      welcome_feat2:    "Sorot fitur penting",
      welcome_feat3:    "Panduan langkah demi langkah",
      start_btn:        "Mulai Tur Interaktif →",
      skip_btn:         "Lewati",
      lang_title:       "Pilih Bahasa Anda",
      lang_subtitle:    "Pilih bahasa yang ingin kamu gunakan di CareerTracker.",
      lang_confirm:     "Lanjutkan →",
      prev:             "← Kembali",
      next:             "Lanjut →",
      finish:           "Ayo Mulai! 🚀",
      step_of:          "dari",
      skip_confirm:     "Lewati tutorial? Kamu bisa memulainya kembali kapan saja dari halaman Cara Penggunaan.",
      skip_yes:         "Lewati",
      skip_no:          "Lanjutkan Tur",

      s1_title: "Tambah Lamaran Pertamamu",
      s1_desc:  "Klik kartu <strong>Active Applications</strong> di carousel lalu klik <strong>+ Add</strong> untuk mencatat lamaran baru.",
      s1_tip:   "Setiap lamaran punya halaman detail dengan timeline rekrutmen lengkap.",
      s1_demo_title: "Coba di sini:",

      s1b_title: "Cara Menambah Lamaran",
      s1b_desc:  "Isi kolom <strong>Nama Perusahaan</strong>, <strong>Nama Program</strong>, dan <strong>Posisi</strong> di modal, lalu klik <strong>Save</strong>. Kamu akan langsung diarahkan ke halaman Detail Lamaran.",
      s1b_tip:   "Perusahaan dan Program wajib diisi. Posisi opsional namun disarankan.",

      s2_title: "Halaman Detail Lamaran",
      s2_desc:  "Klik tombol <strong>📋 Detail</strong> di baris mana pun untuk membuka halaman Application Info. Lacak setiap tahap rekrutmen dari seleksi hingga penawaran kerja.",
      s2_tip:   "Klik lingkaran tahap mana pun untuk melihat catatan, tanggal, dan tenggat waktu.",
      s2_demo_title: "Alur rekrutmen:",

      s2b_title: "Cara Menambah Tahap",
      s2b_desc:  "Di halaman Detail Lamaran, klik tombol <strong>＋ (Tambah Tahap)</strong> untuk membuat langkah rekrutmen baru. Ketik nama tahap (mis. \"Interview HR\") lalu tekan <strong>Enter</strong> atau klik <strong>Add</strong>.",
      s2b_tip:   "Setelah menambah tahap, klik lingkarannya untuk mengatur tanggal, waktu, dan catatan.",

      s3_title: "Tabel Active Applications",
      s3_desc:  "Tabel <strong>Active Applications</strong> menampilkan semua lamaranmu — prioritas, tanggal, perusahaan, program, posisi, status, dan tahap saat ini.",
      s3_tip:   "Klik angka prioritas untuk mengubah urutan. Gunakan kotak pencarian untuk filter cepat.",
      s3_demo_title: "Coba pencarian langsung:",

      s4_title: "Job Vacancies",
      s4_desc:  "Kartu <strong>Job Vacancy</strong> adalah papan lowongan pribadimu. Simpan lowongan beserta tenggat waktu dan link pendaftaran agar tidak terlewat.",
      s4_tip:   "Tandai lowongan sebagai 'Applied' setelah kamu mendaftar.",

      s5_title: "Manajer CV",
      s5_desc:  "Akses <strong>CV Manager</strong> dari menu profil. Upload beberapa versi CV dalam format PDF, preview langsung di aplikasi, dan kelola dengan rapi.",
      s5_tip:   "Beri nama CV dengan jelas (mis. CV_Software_2026) agar selalu memilih versi yang tepat.",
      s5_demo_title: "Pratinjau CV Manager:",

      s6_title: "Kontak & Dukungan",
      s6_desc:  "Punya pertanyaan, menemukan bug, atau ingin mengajukan fitur? Buka <strong>Contact Us</strong> dari menu profil untuk menghubungi admin.",
      s6_tip:   "Permintaan fitur dengan dukungan terbanyak akan diprioritaskan untuk pengembangan!",

      done_title: "Semua siap! 🎉",
      done_desc:  "Ruang kerja CareerTracker kamu sudah siap. Mulai dengan menambahkan lamaran pertama!",
      done_btn:   "Mulai Lacak! 🚀",

      dt1_title: "Ringkasan Lamaran",
      dt1_desc:  "Kartu ini menampilkan <strong>nama perusahaan</strong>, <strong>program</strong>, dan <strong>badge status</strong> saat ini. Status diperbarui otomatis sesuai progres rekrutmen.",
      dt1_tip:   "Klik tombol ✎ edit untuk mengganti nama perusahaan atau program kapan saja.",

      dt2_title: "Tombol Edit & Tambah Tahap",
      dt2_desc:  "Tombol <strong>✎ Edit</strong> dan <strong>＋ Tambah Tahap</strong> kini berada di pojok kanan atas bagian <strong>Recruitment Stage</strong>. Gunakan ✎ untuk mengubah nama perusahaan/program, dan ＋ untuk menambah tahap baru.",
      dt2_tip:   "Mode edit juga memungkinkan kamu menghapus tahap individual dengan klik ikon 🗑 di setiap lingkaran tahap.",

      dt3_title: "Progres Rekrutmen",
      dt3_desc:  "Bar <strong>progress</strong> menunjukkan seberapa jauh proses rekrutmenmu. Dihitung otomatis dari tahap yang tanggalnya sudah lewat.",
      dt3_tip:   "Tahap berubah hijau ✅ begitu tanggal yang dijadwalkan sudah lewat.",

      dt4_title: "Tahapan Timeline",
      dt4_desc:  "Setiap lingkaran bernomor adalah <strong>tahap rekrutmen</strong>. Hijau = selesai ✅, Biru = aktif 🔵, Abu = belum ada tanggal. Klik untuk melihat detail.",
      dt4_tip:   "Klik 'Lihat Demo' di bawah untuk melihat simulasi langsung klik tahap!",

      dt5_title: "Kartu Detail Tahap",
      dt5_desc:  "Setelah klik tahap, kartu ini muncul menampilkan <strong>nama tahap</strong>, <strong>tanggal & waktu</strong>, dan <strong>catatan pribadi</strong>. Semua bisa diedit.",
      dt5_tip:   "Klik ✎ di kartu untuk mengedit tanggal, waktu, dan menambah catatan.",

      dt6_title: "Zona Berbahaya",
      dt6_desc:  "Di bagian bawah terdapat <strong>Danger Zone</strong>. Gunakan ini hanya untuk menghapus lamaran beserta semua data tahapnya secara permanen. Dialog konfirmasi akan muncul terlebih dahulu.",
      dt6_tip:   "Lamaran yang dihapus tidak dapat dipulihkan — gunakan dengan hati-hati!",

      dt_done_title: "Tur Halaman Detail Selesai! ✅",
      dt_done_desc:  "Kamu sekarang sudah tahu semua tentang halaman Application Detail. Mulai lacak perjalanan rekrutmenmu!",
      dt_done_btn:   "Mengerti! 🚀",

      sim_btn: "Lihat Demo ▶",
    }
  };

  /* ══════════════════════════════════════════════════════════
     STATE
  ══════════════════════════════════════════════════════════ */
  let lang        = 'en';
  let currentStep = 0;
  let tourActive  = false;

  function t(key) {
    return (OB_LANG[lang] && OB_LANG[lang][key]) || (OB_LANG.en[key]) || key;
  }

  /* ══════════════════════════════════════════════════════════
     INTERACTIVE DEMO BUILDERS  — pixel-perfect CareerTracker replicas
  ══════════════════════════════════════════════════════════ */

  /* ── Step 1: Active Applications table + "+ Add" button ── */
  function buildAddDemo() {
    const addLabel = lang === 'id' ? '+ Tambah' : '+ Add';
    const addedMsg = lang === 'id' ? '✓ Ditambahkan!' : '✓ Added!';
    const ph       = lang === 'id' ? 'Cari perusahaan...' : 'Search company...';
    const rows = [
      { pri: 1, date: '01/03/2026', co: 'Google LLC',   prog: 'SWE Intern',   pos: 'Engineer',   status: 'Active',    stage: 'Interview' },
      { pri: 2, date: '15/02/2026', co: 'Shopee',       prog: 'Product Mgmt', pos: 'PM',          status: 'Active',    stage: 'Applied'   },
    ];
    return `<div class="ob-sim-wrap">
      <div class="ob-sim-toolbar">
        <div class="ob-sim-search-box">
          <input class="ob-sim-search-input" placeholder="${ph}" disabled />
        </div>
        <button class="ob-sim-add-btn" id="ob-demo-add-btn" data-label="${addLabel}" data-added="${addedMsg}">${addLabel}</button>
      </div>
      <div class="ob-sim-table-wrap">
        <table class="ob-sim-table">
          <thead><tr>
            <th>${lang==='id'?'Prioritas':'Priority'}</th>
            <th>${lang==='id'?'Tanggal':'Date'}</th>
            <th>${lang==='id'?'Perusahaan':'Company'}</th>
            <th>${lang==='id'?'Program':'Program'}</th>
            <th>Status</th>
            <th>${lang==='id'?'Tahap':'Stage'}</th>
            <th>${lang==='id'?'Detail':'Detail'}</th>
          </tr></thead>
          <tbody id="ob-sim-tbody">
            ${rows.map(r=>`<tr>
              <td><span class="ob-sim-pri ob-sim-pri-${r.pri}">${r.pri}</span></td>
              <td style="font-size:.7rem;color:var(--muted,#6b7280)">${r.date}</td>
              <td style="font-weight:600">${r.co}</td>
              <td>${r.prog}</td>
              <td><span class="ob-sim-status-badge ob-sim-badge-active">${r.status}</span></td>
              <td style="font-size:.75rem">${r.stage}</td>
              <td><span class="ob-sim-detail-btn">📋</span></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div class="ob-sim-new-row" id="ob-sim-new-row" style="display:none">
        <span class="ob-sim-new-icon">✨</span>
        <span style="font-size:.76rem;font-weight:600;color:var(--text,#2c3344)">${lang==='id'?'Lamaran baru ditambahkan!':'New application added!'}</span>
      </div>
    </div>`;
  }

  /* ── Step 2: Application Detail — timeline stages ── */
  function buildStatusDemo() {
    const stages = [
      { name: lang==='id'?'Seleksi Adm.':'Admin Check', date: '05/01',  state: 'done' },
      { name: lang==='id'?'Interview HR':'HR Interview', date: '12/01',  state: 'done' },
      { name: lang==='id'?'Interview User':'User Interview', date: '20/01', state: 'current' },
      { name: lang==='id'?'Penawaran':'Offer',           date: '—',      state: 'upcoming' },
    ];
    return `<div class="ob-sim-detail-wrap">
      <div class="ob-sim-app-summary">
        <div class="ob-sim-company-info">
          <div class="ob-sim-company-name">Google LLC</div>
          <div class="ob-sim-company-prog">Software Engineer Intern</div>
        </div>
        <span class="ob-sim-status-badge ob-sim-badge-active">● Active</span>
      </div>
      <div class="ob-sim-progress-row">
        <span class="ob-sim-prog-label">${lang==='id'?'Progres':'Progress'}</span>
        <div class="ob-sim-prog-track"><div class="ob-sim-prog-fill" style="width:50%"></div></div>
        <span class="ob-sim-prog-count">2/4</span>
      </div>
      <div class="ob-sim-timeline">
        ${stages.map((s,i)=>`
          <div class="ob-sim-step-cell${i===stages.length-1?' ob-sim-last':''}">
            <div class="ob-sim-step-label">
              <div class="ob-sim-step-name">${s.name}</div>
              <div class="ob-sim-step-date">${s.date}</div>
            </div>
            <div class="ob-sim-step ob-sim-step-${s.state}" id="ob-sim-step-${i}">
              <span class="ob-sim-step-num">${s.state==='done'?'✓':i+1}</span>
            </div>
          </div>`).join('')}
      </div>
      <div class="ob-sim-stage-hint" id="ob-sim-stage-hint">${lang==='id'?'👆 Klik lingkaran tahap untuk lihat detail':'👆 Click a stage circle to see its details'}</div>
    </div>`;
  }

  /* ── Step 3: Active Applications table with live search ── */
  function buildTableDemo() {
    const ph = lang === 'id' ? 'Cari perusahaan...' : 'Search company...';
    const rows = [
      { pri: 1, co: 'Google LLC', prog: 'SWE Intern',    status: 'Active',   stage: 'Interview', cls: 'ob-sim-badge-active' },
      { pri: 2, co: 'Shopee',     prog: 'Product Mgmt',  status: 'Active',   stage: 'Applied',   cls: 'ob-sim-badge-active' },
      { pri: 3, co: 'Grab',       prog: 'Data Analyst',  status: 'Active',   stage: 'Offer',     cls: 'ob-sim-badge-offer'  },
    ];
    return `<div class="ob-sim-wrap">
      <div class="ob-sim-toolbar">
        <div class="ob-sim-search-box">
          <input class="ob-sim-search-input" id="ob-demo-search" placeholder="${ph}" autocomplete="off" />
        </div>
      </div>
      <div class="ob-sim-table-wrap">
        <table class="ob-sim-table">
          <thead><tr>
            <th>#</th>
            <th>${lang==='id'?'Perusahaan':'Company'}</th>
            <th>${lang==='id'?'Program':'Program'}</th>
            <th>Status</th>
            <th>${lang==='id'?'Tahap':'Stage'}</th>
            <th>Detail</th>
          </tr></thead>
          <tbody id="ob-demo-table">
            ${rows.map(r=>`<tr data-co="${r.co.toLowerCase()}">
              <td><span class="ob-sim-pri ob-sim-pri-${r.pri}">${r.pri}</span></td>
              <td style="font-weight:600">${r.co}</td>
              <td style="font-size:.75rem">${r.prog}</td>
              <td><span class="ob-sim-status-badge ${r.cls}">${r.status}</span></td>
              <td style="font-size:.75rem">${r.stage}</td>
              <td><span class="ob-sim-detail-btn">📋</span></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
  }

  /* ── Step 5: CV Manager (profile dropdown entry → cv page) ── */
  function buildCVDemo() {
    const cvs = ['CV_Software_2026.pdf', 'CV_Design_2026.pdf'];
    const uploadLabel = lang === 'id' ? '+ Upload CV Baru' : '+ Upload New CV';
    const prevLabel   = lang === 'id' ? 'Preview' : 'Preview';
    return `<div class="ob-sim-cv-wrap">
      <div class="ob-sim-cv-header">
        <span class="ob-sim-cv-title">📄 ${lang==='id'?'CV Manager':'CV Manager'}</span>
        <span class="ob-sim-cv-count">${cvs.length} ${lang==='id'?'file':'files'}</span>
      </div>
      <div class="ob-sim-cv-list">
        ${cvs.map(cv=>`
          <div class="ob-sim-cv-item">
            <span class="ob-sim-cv-icon">📄</span>
            <span class="ob-sim-cv-name">${cv}</span>
            <button class="ob-sim-cv-btn">${prevLabel}</button>
          </div>`).join('')}
        <div class="ob-sim-cv-upload">${uploadLabel}</div>
      </div>
    </div>`;
  }

  /* ══════════════════════════════════════════════════════════
     STEPS
  ══════════════════════════════════════════════════════════ */
  function getHomeSteps() {
    return [
      {
        target: '#appliedAddBtn', fallback: '#panel-applied',
        placement: 'bottom', icon: '➕', pulse: true,
        title: t('s1_title'), desc: t('s1_desc'), tip: t('s1_tip'),
        sim: null, demoBuilder: buildAddDemo, demoInit: initAddDemo,
      },
      {
        target: '#addAppModal, #panel-applied', fallback: '.main',
        placement: 'center', icon: '📝', pulse: false,
        title: t('s1b_title'), desc: t('s1b_desc'), tip: t('s1b_tip'),
        sim: null, demoBuilder: buildAddAppModalDemo, demoInit: initAddAppModalDemo,
      },
      {
        target: '.applied-table tbody tr:first-child, #applicationsBody tr:first-child',
        fallback: '.applied-table',
        placement: 'top', icon: '📋', pulse: false,
        title: t('s2_title'), desc: t('s2_desc'), tip: t('s2_tip'),
        sim: null, demoBuilder: buildStatusDemo, demoInit: initStatusDemo,
      },
      {
        target: '.detail-actions .add-btn, #panel-applied', fallback: '.main',
        placement: 'center', icon: '🔄', pulse: false,
        title: t('s2b_title'), desc: t('s2b_desc'), tip: t('s2b_tip'),
        sim: null, demoBuilder: buildAddStageDemo, demoInit: initAddStageDemo,
      },
      {
        target: '#panel-applied', fallback: '.applied-table',
        placement: 'top', icon: '📊', pulse: false,
        title: t('s3_title'), desc: t('s3_desc'), tip: t('s3_tip'),
        sim: null, demoBuilder: buildTableDemo, demoInit: initTableDemo,
      },
      {
        target: '[data-type="jobs"], .carousel-card[data-index="0"]',
        fallback: '.card-carousel-section',
        placement: 'bottom', icon: '📁', pulse: true,
        title: t('s4_title'), desc: t('s4_desc'), tip: t('s4_tip'),
        sim: null, demoBuilder: null, demoInit: null,
      },
      {
        target: '#cvLink', fallback: '#dropdown, #profileBtn',
        placement: 'bottom', icon: '📄', pulse: true,
        title: t('s5_title'), desc: t('s5_desc'), tip: t('s5_tip'),
        sim: null, demoBuilder: buildCVDemo, demoInit: null,
      },
      {
        target: '#contactLink', fallback: '#dropdown',
        placement: 'bottom', icon: '💬', pulse: false,
        title: t('s6_title'), desc: t('s6_desc'), tip: t('s6_tip'),
        sim: null, demoBuilder: null, demoInit: null,
      },
    ];
  }

  function getDetailSteps() {
    return [
      { target: '.app-summary',         fallback: '.application-info', placement: 'bottom', icon: '🏢', pulse: false, title: t('dt1_title'), desc: t('dt1_desc'), tip: t('dt1_tip'), sim: null, demoBuilder: null, demoInit: null },
      { target: '.stage-header-actions',fallback: '.section-label',    placement: 'bottom', icon: '🛠️', pulse: true,  title: t('dt2_title'), desc: t('dt2_desc'), tip: t('dt2_tip'), sim: simActions, demoBuilder: null, demoInit: null },
      { target: '#progressRow',         fallback: '.app-summary',      placement: 'bottom', icon: '📊', pulse: false, title: t('dt3_title'), desc: t('dt3_desc'), tip: t('dt3_tip'), sim: simProgress, demoBuilder: null, demoInit: null },
      { target: '.timeline',            fallback: '.application-info', placement: 'top',    icon: '🔄', pulse: true,  title: t('dt4_title'), desc: t('dt4_desc'), tip: t('dt4_tip'), sim: simTimeline, demoBuilder: null, demoInit: null },
      { target: '#stageDetailBox',      fallback: '.application-info', placement: 'top',    icon: '📋', pulse: false, title: t('dt5_title'), desc: t('dt5_desc'), tip: t('dt5_tip'), sim: simStageDetail, demoBuilder: null, demoInit: null },
      { target: '.danger-zone',         fallback: '.application-info', placement: 'top',    icon: '⚠️', pulse: false, title: t('dt6_title'), desc: t('dt6_desc'), tip: t('dt6_tip'), sim: null, demoBuilder: null, demoInit: null },
    ];
  }

  /* ── Step 1b: Add Application — modal demo ── */
  function buildAddAppModalDemo() {
    const coLbl   = lang === 'id' ? 'Nama Perusahaan' : 'Company Name';
    const prLbl   = lang === 'id' ? 'Nama Program'    : 'Program Name';
    const posLbl  = lang === 'id' ? 'Posisi'          : 'Position';
    const saveLbl = lang === 'id' ? 'Simpan'          : 'Save';
    const reqTxt  = lang === 'id' ? '* Wajib diisi'   : '* Required';
    const eg1     = lang === 'id' ? 'mis. Google LLC'       : 'e.g. Google LLC';
    const eg2     = lang === 'id' ? 'mis. Software Engineer Intern' : 'e.g. Software Engineer Intern';
    const eg3     = lang === 'id' ? 'mis. Backend Engineer' : 'e.g. Backend Engineer';
    return `<div class="ob-modal-demo">
      <div class="ob-modal-header">
        <span class="ob-modal-title">➕ ${lang==='id'?'Tambah Lamaran':'Add Application'}</span>
        <span class="ob-modal-close">✕</span>
      </div>
      <div class="ob-modal-body">
        <div class="ob-modal-field">
          <label class="ob-modal-label">${coLbl} <span class="ob-modal-req">${reqTxt}</span></label>
          <input class="ob-modal-input" placeholder="${eg1}" id="ob-demo-co" />
        </div>
        <div class="ob-modal-field">
          <label class="ob-modal-label">${prLbl} <span class="ob-modal-req">${reqTxt}</span></label>
          <input class="ob-modal-input" placeholder="${eg2}" id="ob-demo-pr" />
        </div>
        <div class="ob-modal-field">
          <label class="ob-modal-label">${posLbl}</label>
          <input class="ob-modal-input" placeholder="${eg3}" id="ob-demo-pos" />
        </div>
        <button class="ob-modal-save" id="ob-demo-save">${saveLbl}</button>
        <div class="ob-modal-feedback" id="ob-demo-feedback" style="display:none"></div>
      </div>
    </div>`;
  }

  /* ── Step 2b: Add Stage — demo ── */
  function buildAddStageDemo() {
    const ph     = lang === 'id' ? 'mis. Interview HR...' : 'e.g. HR Interview...';
    const addLbl = lang === 'id' ? 'Tambah'  : 'Add';
    const presets = lang === 'id'
      ? ['Seleksi Adm.', 'Interview HR', 'Interview User', 'Tes Psikologi', 'Penawaran']
      : ['Admin Check', 'HR Interview', 'User Interview', 'Psych Test', 'Job Offer'];
    const existingStages = lang === 'id'
      ? [{ name: 'Seleksi Adm.', state: 'done', date: '05 Jan' }, { name: 'Interview HR', state: 'current', date: '12 Jan' }]
      : [{ name: 'Admin Check', state: 'done', date: '05 Jan' }, { name: 'HR Interview', state: 'current', date: '12 Jan' }];
    return `<div class="ob-addstage-demo">
      <div class="ob-as-timeline" id="ob-as-tl">
        ${existingStages.map((s,i)=>`
          <div class="ob-as-cell">
            <div class="ob-as-label"><div class="ob-as-name">${s.name}</div><div class="ob-as-date">${s.date}</div></div>
            <div class="ob-as-circle ob-as-${s.state}">${s.state==='done'?'✓':i+1}</div>
          </div>`).join('')}
        <div class="ob-as-cell ob-as-new-placeholder" id="ob-as-placeholder" style="display:none">
          <div class="ob-as-label"><div class="ob-as-name ob-as-new-name" id="ob-as-new-name">—</div><div class="ob-as-date">—</div></div>
          <div class="ob-as-circle ob-as-upcoming" id="ob-as-new-circle">3</div>
        </div>
      </div>
      <div class="ob-as-input-row">
        <input class="ob-as-input" id="ob-as-input" placeholder="${ph}" maxlength="30" />
        <button class="ob-as-btn" id="ob-as-add">${addLbl}</button>
      </div>
      <div class="ob-as-presets">
        ${presets.map(p=>`<span class="ob-as-preset" data-val="${p}">${p}</span>`).join('')}
      </div>
    </div>`;
  }
  function initAddDemo() {
    const btn    = document.getElementById('ob-demo-add-btn');
    const newRow = document.getElementById('ob-sim-new-row');
    if (!btn) return;
    let added = false;
    btn.addEventListener('click', () => {
      if (added) return;
      added = true;
      btn.style.transform = 'scale(.96)';
      setTimeout(() => { btn.style.transform = ''; }, 120);
      newRow.style.display = 'flex';
      const orig = btn.textContent;
      btn.textContent = btn.dataset.added;
      btn.style.background = '#22c55e';
      btn.style.color      = '#fff';
      setTimeout(() => {
        btn.textContent      = orig;
        btn.style.background = '';
        btn.style.color      = '';
        newRow.style.display = 'none';
        added = false;
      }, 2200);
    });
  }

  function initStatusDemo() {
    const steps = document.querySelectorAll('.ob-sim-step');
    const hint  = document.getElementById('ob-sim-stage-hint');
    if (!steps.length) return;
    steps.forEach((step, i) => {
      step.style.cursor = 'pointer';
      step.addEventListener('click', () => {
        steps.forEach(s => s.classList.remove('ob-sim-step-active-ring'));
        step.classList.add('ob-sim-step-active-ring');
        if (hint) {
          const names = lang === 'id'
            ? ['Seleksi Adm.', 'Interview HR', 'Interview User', 'Penawaran']
            : ['Admin Check', 'HR Interview', 'User Interview', 'Offer'];
          const dates = ['05 Jan 2026', '12 Jan 2026', '20 Jan 2026', '—'];
          const notes = lang === 'id'
            ? ['Lulus ke tahap berikutnya ✅', 'Wawancara 45 menit bersama HR', 'Menunggu konfirmasi jadwal', 'Belum ada update']
            : ['Passed to next stage ✅', '45-min interview with HR team', 'Waiting for schedule confirmation', 'No update yet'];
          hint.innerHTML = `<div class="ob-sim-stage-card">
            <div class="ob-sim-sc-header">${names[i]}</div>
            <div class="ob-sim-sc-body">
              <div class="ob-sim-sc-row"><strong>📅 ${lang==='id'?'Tanggal':'Date'}</strong><span>${dates[i]}</span></div>
              <div class="ob-sim-sc-note"><strong>📝 ${lang==='id'?'Catatan':'Notes'}</strong><p>${notes[i]}</p></div>
            </div>
          </div>`;
        }
      });
    });
  }

  // Stores the app created during tutorial so stage demo can add to it
  let _obTutorialApp = null;

  function initAddAppModalDemo() {
    const coInput  = document.getElementById('ob-demo-co');
    const prInput  = document.getElementById('ob-demo-pr');
    const posInput = document.getElementById('ob-demo-pos');
    const saveBtn  = document.getElementById('ob-demo-save');
    const feedback = document.getElementById('ob-demo-feedback');
    if (!saveBtn) return;

    const doSave = async () => {
      const co = coInput?.value.trim();
      const pr = prInput?.value.trim();
      const jt = posInput?.value.trim() || '';
      if (!co || !pr) {
        feedback.style.display = 'flex';
        feedback.className = 'ob-modal-feedback ob-modal-err';
        feedback.textContent = lang === 'id' ? '⚠ Nama Perusahaan dan Program wajib diisi!' : '⚠ Company and Program are required!';
        setTimeout(() => { feedback.style.display = 'none'; }, 2500);
        return;
      }
      saveBtn.disabled = true;
      saveBtn.textContent = lang === 'id' ? 'Menyimpan...' : 'Saving...';

      try {
        // Actually call the real API if available
        if (typeof addApplication === 'function' && typeof getAllApplications === 'function') {
          const allApps = await getAllApplications();
          const maxP = allApps.length ? Math.max(...allApps.map(d => d.priority || 0)) : 0;
          const newApp = {
            id: Date.now().toString(),
            company: co, program: pr, jobTitle: jt,
            applyDate: new Date().toLocaleDateString(),
            status: 'Active', priority: maxP + 1, stages: []
          };
          await addApplication(newApp);
          _obTutorialApp = newApp;
        } else {
          // Fallback: just store locally for stage demo
          _obTutorialApp = { id: Date.now().toString(), company: co, program: pr, jobTitle: jt, stages: [] };
        }
        saveBtn.textContent = lang === 'id' ? '✓ Tersimpan!' : '✓ Saved!';
        saveBtn.style.background = '#22c55e';
        feedback.style.display = 'flex';
        feedback.className = 'ob-modal-feedback ob-modal-ok';
        feedback.textContent = lang === 'id'
          ? `✅ Lamaran "${co}" berhasil ditambahkan ke database!`
          : `✅ Application for "${co}" saved to database!`;
        setTimeout(() => {
          feedback.style.display = 'none';
          if (coInput)  coInput.value  = '';
          if (prInput)  prInput.value  = '';
          if (posInput) posInput.value = '';
          saveBtn.disabled = false;
          saveBtn.textContent = lang === 'id' ? 'Simpan' : 'Save';
          saveBtn.style.background = '';
        }, 2800);
      } catch (err) {
        feedback.style.display = 'flex';
        feedback.className = 'ob-modal-feedback ob-modal-err';
        feedback.textContent = (lang === 'id' ? '⚠ Gagal menyimpan: ' : '⚠ Save failed: ') + err.message;
        saveBtn.disabled = false;
        saveBtn.textContent = lang === 'id' ? 'Simpan' : 'Save';
      }
    };

    saveBtn.addEventListener('click', doSave);
    [coInput, prInput, posInput].forEach(inp => inp?.addEventListener('keydown', e => { if (e.key === 'Enter') doSave(); }));
  }

  function initAddStageDemo() {
    const input     = document.getElementById('ob-as-input');
    const addBtn    = document.getElementById('ob-as-add');
    const ph        = document.getElementById('ob-as-placeholder');
    const newName   = document.getElementById('ob-as-new-name');
    const presets   = document.querySelectorAll('.ob-as-preset');
    if (!addBtn || !input) return;

    presets.forEach(p => {
      p.addEventListener('click', () => {
        input.value = p.dataset.val;
        input.focus();
      });
    });

    const doAdd = async () => {
      const val = input.value.trim();
      if (!val) { input.focus(); return; }

      addBtn.disabled = true;
      input.disabled  = true;
      addBtn.textContent = '...';

      try {
        // If we have a real app from previous step, add stage to it
        if (_obTutorialApp && typeof updateApplication === 'function') {
          if (!_obTutorialApp.stages) _obTutorialApp.stages = [];
          const newStage = { name: val, date: '', time: '', status: 'upcoming', notes: '' };
          _obTutorialApp.stages.push(newStage);
          await updateApplication(_obTutorialApp);
        }
        // Show in mini-timeline regardless
        newName.textContent = val;
        ph.style.display = 'flex';
        ph.style.animation = 'none';
        requestAnimationFrame(() => {
          ph.style.animation = '_ob_rowIn .35s cubic-bezier(.34,1.2,.64,1) both';
        });
        addBtn.textContent = '✓';
        addBtn.style.background = '#22c55e';
        input.value = '';

        setTimeout(() => {
          ph.style.display = 'none';
          addBtn.textContent = lang === 'id' ? 'Tambah' : 'Add';
          addBtn.style.background = '';
          input.disabled = false;
          addBtn.disabled = false;
          input.focus();
        }, 2400);
      } catch (err) {
        addBtn.textContent = '✗';
        addBtn.style.background = '#ef4444';
        setTimeout(() => {
          addBtn.textContent = lang === 'id' ? 'Tambah' : 'Add';
          addBtn.style.background = '';
          input.disabled = false;
          addBtn.disabled = false;
        }, 1500);
      }
    };

    addBtn.addEventListener('click', doAdd);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') doAdd(); });
  }

  function initTableDemo() {
    const search = document.getElementById('ob-demo-search');
    const rows   = document.querySelectorAll('#ob-demo-table tr');
    if (!search || !rows.length) return;
    search.addEventListener('input', () => {
      const q = search.value.toLowerCase();
      rows.forEach(r => {
        const co = (r.dataset.co || '');
        r.style.display = (!q || co.includes(q)) ? '' : 'none';
      });
    });
  }

  /* ══════════════════════════════════════════════════════════
     SIMULATIONS (Detail page)
  ══════════════════════════════════════════════════════════ */
  function simActions() {
    const btns = document.querySelectorAll('.stage-header-actions .edit-stages, .stage-header-actions .add-btn, .detail-actions #selectCompany');
    btns.forEach((btn, i) => {
      setTimeout(() => {
        btn.style.transition = 'transform .2s ease, box-shadow .2s ease';
        btn.style.transform  = 'scale(1.25)';
        btn.style.boxShadow  = '0 0 0 6px rgba(99,120,255,.25)';
        setTimeout(() => { btn.style.transform = ''; btn.style.boxShadow = ''; }, 500);
      }, i * 250);
    });
  }

  function simProgress() {
    const fill = document.getElementById('progressBar');
    const row  = document.getElementById('progressRow');
    if (!fill) return;
    const orig = fill.style.width;
    if (row) row.style.display = 'flex';
    fill.style.transition = 'width 1s cubic-bezier(.4,0,.2,1)';
    fill.style.width = '0%';
    setTimeout(() => {
      fill.style.width = '75%';
      setTimeout(() => { fill.style.width = orig || '0%'; }, 1200);
    }, 100);
  }

  function simTimeline() {
    const steps = document.querySelectorAll('.timeline .step');
    if (!steps.length) return;
    steps.forEach((s, i) => {
      setTimeout(() => {
        s.style.transition = 'transform .2s cubic-bezier(.34,1.4,.64,1), box-shadow .2s ease';
        s.style.transform  = 'scale(1.35)';
        s.style.boxShadow  = '0 0 0 8px rgba(99,120,255,.3)';
        setTimeout(() => { s.style.transform = ''; s.style.boxShadow = ''; }, 450);
      }, i * 160);
    });
  }

  function simStageDetail() {
    const firstStep = document.querySelector('.timeline .step');
    if (!firstStep) return;
    firstStep.style.transition = 'transform .2s cubic-bezier(.34,1.4,.64,1), box-shadow .2s ease';
    firstStep.style.transform  = 'scale(1.3)';
    firstStep.style.boxShadow  = '0 0 0 8px rgba(99,120,255,.35)';
    setTimeout(() => {
      firstStep.style.transform = '';
      firstStep.style.boxShadow = '';
      firstStep.click();
      setTimeout(() => {
        const box = document.getElementById('stageDetailBox');
        if (box && box.style.display !== 'none') {
          box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          box.style.transition = 'box-shadow .3s ease';
          box.style.boxShadow  = '0 0 0 3px rgba(99,120,255,.4), 0 8px 32px rgba(99,120,255,.2)';
          setTimeout(() => { box.style.boxShadow = ''; }, 1500);
        }
      }, 200);
    }, 500);
  }

  /* ══════════════════════════════════════════════════════════
     CSS INJECTION
  ══════════════════════════════════════════════════════════ */
  function injectStyles() {
    if (document.getElementById('ob-styles')) return;
    const s = document.createElement('style');
    s.id = 'ob-styles';
    s.textContent = `
/* ── Keyframes ─────────────────────────────────────────────── */
@keyframes _ob_fadeUp   { from { opacity:0; transform:translateY(20px) scale(.96) } to { opacity:1; transform:translateY(0) scale(1) } }
@keyframes _ob_scaleIn  { from { opacity:0; transform:scale(.85) translateY(14px) } to { opacity:1; transform:scale(1) translateY(0) } }
@keyframes _ob_float    { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-8px) } }
@keyframes _ob_shimmer  { 0% { background-position:-200% 0 } 100% { background-position:200% 0 } }
@keyframes _ob_glow     { 0%,100% { box-shadow:0 0 0 0 rgba(79,99,240,.55),0 0 0 4px rgba(79,99,240,.12) } 55% { box-shadow:0 0 0 16px rgba(79,99,240,0),0 0 0 4px rgba(79,99,240,.12) } }
@keyframes _ob_pulse2   { 0%,100% { box-shadow:0 0 0 0 rgba(79,99,240,.55) } 70% { box-shadow:0 0 0 16px rgba(79,99,240,0) } }
@keyframes _ob_tipSlide { from { opacity:0; transform:translateY(6px) } to { opacity:1; transform:translateY(0) } }
@keyframes _ob_confFall { 0% { transform:translateY(-8px) rotate(0) scale(1); opacity:1 } 85% { opacity:.9 } 100% { transform:translateY(105vh) rotate(680deg) scale(.5); opacity:0 } }
@keyframes _ob_sway     { 0%,100% { margin-left:0 } 30% { margin-left:16px } 70% { margin-left:-16px } }
@keyframes _ob_bgFlow   { 0%,100% { background-position:0% 60% } 50% { background-position:100% 40% } }
@keyframes _ob_bounce   { 0% { transform:scale(.2) rotate(-18deg); opacity:0 } 55% { transform:scale(1.1) rotate(4deg); opacity:1 } 75% { transform:scale(.94) rotate(-1deg) } 100% { transform:scale(1) rotate(0) } }
@keyframes _ob_dotPop   { from { transform:scaleX(0) } to { transform:scaleX(1) } }
@keyframes _ob_rowIn    { from { opacity:0; transform:translateX(-6px) } to { opacity:1; transform:translateX(0) } }
@keyframes _ob_badgePop { from { transform:scale(0.6); opacity:0 } to { transform:scale(1); opacity:1 } }

/* ── Backdrop ──────────────────────────────────────────────── */
#ob-backdrop { position:fixed; inset:0; z-index:99990; pointer-events:none; display:none }
#ob-backdrop.ob-on { display:block }
.ob-shade {
  position:fixed; background:rgba(4,6,18,.8); backdrop-filter:blur(2px);
  transition:all .3s cubic-bezier(.4,0,.2,1); display:none }

/* ── Spotlight ring ────────────────────────────────────────── */
#ob-ring {
  position:fixed; z-index:99991; border-radius:14px; pointer-events:none; display:none;
  border:2.5px solid rgba(79,99,240,.75);
  box-shadow:0 0 0 4px rgba(79,99,240,.12), 0 0 28px rgba(79,99,240,.18), inset 0 0 0 1px rgba(255,255,255,.07);
  transition:all .36s cubic-bezier(.4,0,.2,1) }
#ob-ring.ob-on { display:block }
#ob-ring::after { content:''; position:absolute; inset:-7px; border-radius:19px; pointer-events:none; border:1.5px solid rgba(79,99,240,.22) }
#ob-ring.ob-pulse { animation:_ob_glow 2s ease-in-out infinite }

/* ── Arrow ─────────────────────────────────────────────────── */
#ob-arrow { position:fixed; z-index:99993; pointer-events:none; width:22px; height:22px; display:none }
#ob-arrow.ob-on { display:block }
#ob-arrow::before { content:''; position:absolute; width:0; height:0 }
#ob-arrow.a-top::before    { border-left:11px solid transparent; border-right:11px solid transparent; border-bottom:11px solid var(--surface,#fff); filter:drop-shadow(0 -3px 5px rgba(0,0,0,.1)) }
#ob-arrow.a-bottom::before { border-left:11px solid transparent; border-right:11px solid transparent; border-top:11px solid var(--surface,#fff); filter:drop-shadow(0 3px 5px rgba(0,0,0,.1)) }
[data-theme="dark"] #ob-arrow.a-top::before    { border-bottom-color:#161b2e }
[data-theme="dark"] #ob-arrow.a-bottom::before { border-top-color:#161b2e }

/* ── Tooltip shell ─────────────────────────────────────────── */
#ob-tooltip {
  position:fixed; z-index:99992; display:none;
  background:var(--surface,#fff);
  border-radius:22px; overflow:hidden;
  box-shadow:0 0 0 1px rgba(0,0,0,.05), 0 4px 6px rgba(0,0,0,.04),
             0 24px 48px rgba(0,0,0,.16), 0 0 80px rgba(79,99,240,.1);
  font-family:'Inter','Poppins',system-ui,sans-serif;
  max-height:92vh; flex-direction:column; display:none }
#ob-tooltip.ob-in { animation:_ob_fadeUp .34s cubic-bezier(.34,1.1,.64,1) both }
[data-theme="dark"] #ob-tooltip { background:#161b2e; box-shadow:0 0 0 1px rgba(255,255,255,.05), 0 24px 48px rgba(0,0,0,.5) }

/* ── Tooltip header ────────────────────────────────────────── */
.ob-th {
  padding:.95rem 1.1rem .72rem;
  background:linear-gradient(140deg,#f4f6ff 0%,#eef0ff 100%);
  border-bottom:1px solid rgba(79,99,240,.09);
  position:relative; overflow:hidden }
[data-theme="dark"] .ob-th { background:linear-gradient(140deg,#191e38 0%,#1c2240 100%); border-color:rgba(79,99,240,.14) }
.ob-th::before {
  content:''; position:absolute; top:0; left:0; right:0; height:3px;
  background:linear-gradient(90deg,#4f63f0,#818cf8,#a78bfa,#4f63f0);
  background-size:200% 100%; animation:_ob_shimmer 3s linear infinite }
.ob-th-row { display:flex; align-items:center; justify-content:space-between; margin-bottom:.55rem }
.ob-badge {
  font-size:.67rem; font-weight:700; letter-spacing:.05em; text-transform:uppercase;
  background:rgba(79,99,240,.1); border:1px solid rgba(79,99,240,.18);
  border-radius:2rem; padding:.2rem .65rem; color:#4f63f0 }
[data-theme="dark"] .ob-badge { color:#818cf8; background:rgba(99,120,255,.16); border-color:rgba(99,120,255,.28) }
.ob-skip {
  background:none; border:none; cursor:pointer; font-size:.72rem;
  font-family:inherit; color:var(--muted,#9ca3af); padding:.2rem .4rem; border-radius:6px;
  transition:all .15s }
.ob-skip:hover { color:var(--text,#374151); background:rgba(0,0,0,.05) }
[data-theme="dark"] .ob-skip:hover { color:#e2e8f0; background:rgba(255,255,255,.06) }
.ob-th-body { display:flex; align-items:center; gap:.65rem }
.ob-icon-wrap {
  width:44px; height:44px; border-radius:13px; display:flex; align-items:center; justify-content:center;
  font-size:1.3rem; flex-shrink:0;
  background:linear-gradient(135deg,rgba(79,99,240,.14),rgba(129,140,248,.08));
  border:1.5px solid rgba(79,99,240,.16); box-shadow:0 2px 8px rgba(79,99,240,.1) }
[data-theme="dark"] .ob-icon-wrap { background:rgba(99,120,255,.15); border-color:rgba(99,120,255,.24) }
.ob-title { font-size:.96rem; font-weight:800; color:var(--dark,#111827); letter-spacing:-.02em; line-height:1.22 }
[data-theme="dark"] .ob-title { color:#f1f5f9 }
.ob-tour-tag { font-size:.62rem; font-weight:700; text-transform:uppercase; letter-spacing:.08em; color:#4f63f0; opacity:.65; margin-top:.1rem }
[data-theme="dark"] .ob-tour-tag { color:#818cf8 }

/* ── Progress bar ──────────────────────────────────────────── */
.ob-prog { height:3px; background:rgba(79,99,240,.1); overflow:hidden }
[data-theme="dark"] .ob-prog { background:rgba(79,99,240,.16) }
.ob-prog-fill {
  height:100%;
  background:linear-gradient(90deg,#4f63f0,#818cf8,#a78bfa);
  background-size:200% 100%; animation:_ob_shimmer 2s linear infinite;
  transition:width .5s cubic-bezier(.4,0,.2,1) }

/* ── Body ──────────────────────────────────────────────────── */
.ob-body { padding:.88rem 1.1rem 0; overflow-y:auto; flex:1; min-height:0 }
.ob-desc {
  font-size:.84rem; color:var(--text,#374151); line-height:1.72; margin-bottom:.6rem;
  animation:_ob_tipSlide .3s ease .05s both }
[data-theme="dark"] .ob-desc { color:#cbd5e1 }
.ob-desc strong {
  font-weight:700;
  background:linear-gradient(135deg,#4f63f0,#818cf8);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text }
[data-theme="dark"] .ob-desc strong {
  background:linear-gradient(135deg,#818cf8,#c4b5fd);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text }

/* ── Tip ───────────────────────────────────────────────────── */
.ob-tip {
  position:relative; border-radius:11px;
  background:rgba(79,99,240,.05); border:1px solid rgba(79,99,240,.11);
  padding:.5rem .88rem .5rem 2.2rem;
  font-size:.775rem; color:var(--muted,#6b7280); line-height:1.58; margin-bottom:.88rem;
  animation:_ob_tipSlide .3s ease .12s both }
.ob-tip::before { content:'💡'; position:absolute; left:.6rem; top:.48rem; font-size:.84rem }
[data-theme="dark"] .ob-tip { background:rgba(79,99,240,.1); border-color:rgba(79,99,240,.2); color:#94a3b8 }

/* ── Sim button ────────────────────────────────────────────── */
.ob-sim-btn {
  display:inline-flex; align-items:center; gap:.45rem;
  background:rgba(79,99,240,.08); border:1.5px solid rgba(79,99,240,.26); border-radius:9px;
  padding:.42rem .9rem; font-size:.77rem; font-weight:700; color:#4f63f0; cursor:pointer;
  font-family:inherit; margin-bottom:.88rem;
  transition:all .2s cubic-bezier(.34,1.2,.64,1); animation:_ob_tipSlide .3s ease .1s both }
.ob-sim-btn:hover { background:rgba(79,99,240,.15); border-color:rgba(79,99,240,.48); transform:translateY(-1px) }
[data-theme="dark"] .ob-sim-btn { color:#818cf8; border-color:rgba(129,140,248,.3) }

/* ── Footer ────────────────────────────────────────────────── */
.ob-footer {
  padding:.62rem 1.1rem .95rem; display:flex; align-items:center;
  justify-content:space-between; gap:.5rem;
  border-top:1px solid rgba(0,0,0,.05); flex-shrink:0 }
[data-theme="dark"] .ob-footer { border-color:rgba(255,255,255,.05) }
.ob-dots { display:flex; gap:5px; align-items:center }
.ob-dot { width:6px; height:6px; border-radius:50%; background:var(--border,#e5e7eb); transition:all .3s cubic-bezier(.34,1.3,.64,1) }
[data-theme="dark"] .ob-dot { background:#2d3555 }
.ob-dot.d-done { background:rgba(79,99,240,.35) }
.ob-dot.d-now  { width:22px; border-radius:3px; background:linear-gradient(90deg,#4f63f0,#a5b4fc); box-shadow:0 2px 8px rgba(79,99,240,.4); animation:_ob_dotPop .3s cubic-bezier(.34,1.4,.64,1) }
.ob-nav { display:flex; gap:.4rem }
.ob-btn {
  font-family:inherit; font-size:.78rem; font-weight:700;
  padding:.47rem 1rem; border-radius:10px; border:none; cursor:pointer;
  transition:transform .18s cubic-bezier(.34,1.2,.64,1), box-shadow .18s ease }
.ob-btn:active { transform:scale(.95)!important }
.ob-btn-prev { background:var(--card-bg,#f3f4f6); border:1.5px solid var(--border,#e5e7eb); color:var(--muted,#6b7280) }
.ob-btn-prev:hover { background:var(--border,#e5e7eb); color:var(--text,#374151); transform:translateY(-1px) }
[data-theme="dark"] .ob-btn-prev { background:#252a40; border-color:#3a4160; color:#94a3b8 }
[data-theme="dark"] .ob-btn-prev:hover { background:#3a4160; color:#e2e8f0 }
.ob-btn-next { background:linear-gradient(135deg,#3045d4,#4f63f0); color:#fff; box-shadow:0 4px 12px rgba(79,99,240,.4) }
.ob-btn-next:hover { transform:translateY(-2px); box-shadow:0 8px 20px rgba(79,99,240,.55) }
.ob-btn-finish { background:linear-gradient(135deg,#059669,#10b981); color:#fff; box-shadow:0 4px 12px rgba(16,185,129,.4) }
.ob-btn-finish:hover { transform:translateY(-2px); box-shadow:0 8px 20px rgba(16,185,129,.55) }

/* ══ PIXEL-PERFECT CareerTracker DEMO REPLICAS ══════════════ */

/* ── Shared wrapper ── */
.ob-sim-wrap, .ob-sim-detail-wrap, .ob-sim-cv-wrap {
  border-radius:12px; overflow:hidden;
  border:1px solid rgba(0,0,0,.07);
  background:var(--surface,#fff);
  margin-bottom:.85rem;
  box-shadow:0 1px 3px rgba(0,0,0,.06);
  animation:_ob_tipSlide .3s ease .07s both;
  font-family:'Poppins',system-ui,sans-serif }
[data-theme="dark"] .ob-sim-wrap,
[data-theme="dark"] .ob-sim-detail-wrap,
[data-theme="dark"] .ob-sim-cv-wrap { background:#1a1d2e; border-color:#2a2f45 }

/* ── Toolbar (search + add btn) ── */
.ob-sim-toolbar {
  display:flex; align-items:center; gap:.5rem; flex-wrap:wrap;
  padding:.55rem .75rem; background:#f8f9fb; border-bottom:1px solid #e2e6ed }
[data-theme="dark"] .ob-sim-toolbar { background:#1e2235; border-color:#2a2f45 }
.ob-sim-search-box { flex:1; min-width:80px; position:relative }
.ob-sim-search-input {
  width:100%; padding:.32rem .75rem .32rem 1.75rem; border:1.5px solid #e2e6ed;
  border-radius:2rem; font-size:.72rem; color:#2c3344; background:#fff;
  font-family:inherit; outline:none; transition:border-color .2s;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cline x1='21' y1='21' x2='16.65' y2='16.65'/%3E%3C/svg%3E");
  background-repeat:no-repeat; background-position:.6rem center }
.ob-sim-search-input:focus { border-color:#5c667a }
[data-theme="dark"] .ob-sim-search-input { background:#1a1d2e; border-color:#2a2f45; color:#e2e8f0 }

.ob-sim-add-btn {
  padding:.3rem .75rem; border:none; border-radius:6px; cursor:pointer;
  font-size:.72rem; font-weight:700; font-family:inherit;
  background:#5c667a; color:#fff;
  transition:all .18s cubic-bezier(.34,1.2,.64,1); white-space:nowrap }
.ob-sim-add-btn:hover { background:#4a5268; transform:translateY(-1px) }

/* ── Table ── */
.ob-sim-table-wrap { overflow-x:auto }
.ob-sim-table { width:100%; border-collapse:collapse; min-width:300px }
.ob-sim-table thead { background:#f8f9fb; border-bottom:1.5px solid #e2e6ed }
[data-theme="dark"] .ob-sim-table thead { background:#1e2235; border-color:#2a2f45 }
.ob-sim-table th {
  padding:.42rem .55rem; font-size:.62rem; font-weight:700; text-transform:uppercase;
  letter-spacing:.5px; color:#6b7280; text-align:center; white-space:nowrap }
.ob-sim-table td {
  padding:.42rem .55rem; text-align:center; font-size:.72rem; color:#2c3344;
  border-bottom:1px solid #e2e6ed; vertical-align:middle }
[data-theme="dark"] .ob-sim-table td { color:#e2e8f0; border-color:#2a2f45 }
.ob-sim-table tbody tr:last-child td { border-bottom:none }
.ob-sim-table tbody tr:hover { background:#fafbfc }
[data-theme="dark"] .ob-sim-table tbody tr:hover { background:rgba(255,255,255,.03) }

/* ── Priority badge (exact match) ── */
.ob-sim-pri {
  display:inline-flex; align-items:center; justify-content:center;
  width:1.4rem; height:1.4rem; border-radius:4px;
  font-size:.68rem; font-weight:700; color:#fff; background:#6b7280 }
.ob-sim-pri-1 { background:#f4b960; color:#1a1d2e }
.ob-sim-pri-2 { background:#3b82f6 }
.ob-sim-pri-3 { background:#ef4444 }

/* ── Status badges (exact app badge) ── */
.ob-sim-status-badge {
  display:inline-flex; align-items:center; gap:.2rem;
  font-size:.62rem; font-weight:700; padding:.18rem .6rem; border-radius:2rem; white-space:nowrap }
.ob-sim-badge-active { background:rgba(34,197,94,.1); color:#16a34a }
.ob-sim-badge-offer  { background:rgba(59,130,246,.1); color:#1d4ed8 }
.ob-sim-badge-new    { background:rgba(34,197,94,.12); color:#16a34a; border:1px dashed rgba(34,197,94,.4) }

/* ── Detail button ── */
.ob-sim-detail-btn { font-size:.85rem; cursor:pointer; opacity:.8; transition:opacity .15s }
.ob-sim-detail-btn:hover { opacity:1 }

/* ── New row notification ── */
.ob-sim-new-row {
  display:flex; align-items:center; gap:.5rem; padding:.45rem .75rem;
  background:rgba(34,197,94,.06); border-top:1px solid rgba(34,197,94,.2);
  font-size:.72rem; color:#16a34a; animation:_ob_rowIn .35s cubic-bezier(.34,1.2,.64,1) both }
.ob-sim-new-icon { font-size:.9rem }

/* ═══ DETAIL PAGE SIMULATION ═══════════════════════════════ */
.ob-sim-detail-wrap { padding:0 }

/* ── App summary card ── */
.ob-sim-app-summary {
  display:flex; align-items:center; justify-content:space-between; gap:.5rem;
  padding:.75rem 1rem; border-bottom:1px solid #e2e6ed; background:#fff }
[data-theme="dark"] .ob-sim-app-summary { background:#1a1d2e; border-color:#2a2f45 }
.ob-sim-company-info { flex:1; min-width:0 }
.ob-sim-company-name { font-size:.88rem; font-weight:700; color:#1a1d2e; letter-spacing:-.01em }
[data-theme="dark"] .ob-sim-company-name { color:#f0f4ff }
.ob-sim-company-prog { font-size:.72rem; color:#6b7280; margin-top:.1rem }
[data-theme="dark"] .ob-sim-company-prog { color:#8892a4 }

/* ── Progress row ── */
.ob-sim-progress-row {
  display:flex; align-items:center; gap:.5rem; padding:.5rem 1rem;
  border-bottom:1px solid #e2e6ed }
[data-theme="dark"] .ob-sim-progress-row { border-color:#2a2f45 }
.ob-sim-prog-label { font-size:.62rem; color:#6b7280; font-weight:600; white-space:nowrap; flex-shrink:0 }
.ob-sim-prog-track { flex:1; height:5px; background:#e2e6ed; border-radius:4px; overflow:hidden }
[data-theme="dark"] .ob-sim-prog-track { background:#2a2f45 }
.ob-sim-prog-fill  { height:100%; background:linear-gradient(90deg,#5c667a,#7c8aff); border-radius:4px; transition:width .5s ease }
.ob-sim-prog-count { font-size:.64rem; font-weight:700; color:#5c667a; white-space:nowrap; flex-shrink:0 }
[data-theme="dark"] .ob-sim-prog-count { color:#7b8ba3 }

/* ── Timeline ── */
.ob-sim-timeline {
  display:flex; padding:.875rem 1rem 1rem; overflow-x:auto; gap:0 }
.ob-sim-step-cell {
  display:flex; flex-direction:column; align-items:center; flex:1; min-width:62px;
  position:relative }
.ob-sim-step-cell:not(.ob-sim-last)::after {
  content:''; position:absolute; bottom:20px;
  left:calc(50% + 18px); right:calc(-50% + 18px);
  height:2px; background:#e2e6ed; z-index:0 }
[data-theme="dark"] .ob-sim-step-cell:not(.ob-sim-last)::after { background:#2a2f45 }
.ob-sim-step-label {
  display:flex; flex-direction:column; align-items:center; justify-content:flex-end;
  min-height:46px; padding:0 4px 8px; text-align:center; gap:2px; width:100% }
.ob-sim-step-name { font-size:.63rem; font-weight:600; color:#2c3344; line-height:1.3; text-align:center; word-break:break-word }
[data-theme="dark"] .ob-sim-step-name { color:#e2e8f0 }
.ob-sim-step-date { font-size:.56rem; color:#6b7280; text-align:center; white-space:nowrap }

/* ── Stage circles (exact match) ── */
.ob-sim-step {
  width:40px; height:40px; border-radius:50%; display:flex; align-items:center; justify-content:center;
  cursor:pointer; position:relative; z-index:1; transition:transform .18s ease, box-shadow .2s ease;
  flex-shrink:0 }
.ob-sim-step:hover { transform:translateY(-2px) scale(1.08) }
.ob-sim-step-num { font-size:.8rem; font-weight:800; color:#fff; user-select:none }

.ob-sim-step-done    { background:#22c55e; box-shadow:0 3px 10px rgba(34,197,94,.35) }
.ob-sim-step-current { background:#3b82f6; box-shadow:0 3px 12px rgba(59,130,246,.45) }
.ob-sim-step-upcoming{ background:#d1d5db; box-shadow:0 1px 4px rgba(0,0,0,.1) }
[data-theme="dark"] .ob-sim-step-done     { background:#16a34a }
[data-theme="dark"] .ob-sim-step-current  { background:#2563eb }
[data-theme="dark"] .ob-sim-step-upcoming { background:#374151 }

/* Active ring on click */
.ob-sim-step-active-ring.ob-sim-step-done    { box-shadow:0 0 0 3px #fff,0 0 0 5px #22c55e,0 4px 14px rgba(34,197,94,.3); transform:translateY(-2px) scale(1.1) }
.ob-sim-step-active-ring.ob-sim-step-current { box-shadow:0 0 0 3px #fff,0 0 0 5px #3b82f6,0 4px 14px rgba(59,130,246,.35); transform:translateY(-2px) scale(1.1) }
.ob-sim-step-active-ring.ob-sim-step-upcoming{ box-shadow:0 0 0 3px #fff,0 0 0 5px #9ca3af,0 3px 10px rgba(0,0,0,.12); transform:translateY(-2px) scale(1.1) }
[data-theme="dark"] .ob-sim-step-active-ring.ob-sim-step-done,
[data-theme="dark"] .ob-sim-step-active-ring.ob-sim-step-current { box-shadow:0 0 0 3px #1a1d2e,0 0 0 5px currentColor }

/* ── Stage hint / detail card ── */
.ob-sim-stage-hint {
  padding:.5rem 1rem .75rem; font-size:.72rem; color:#6b7280;
  text-align:center; border-top:1px solid #e2e6ed }
[data-theme="dark"] .ob-sim-stage-hint { border-color:#2a2f45; color:#8892a4 }

.ob-sim-stage-card { text-align:left; border-radius:8px; overflow:hidden; border:1px solid #e2e6ed }
[data-theme="dark"] .ob-sim-stage-card { border-color:#2a2f45 }
.ob-sim-sc-header {
  background:linear-gradient(90deg,#5c667a,#4a5268); color:#fff;
  padding:.45rem .875rem; font-size:.75rem; font-weight:700 }
[data-theme="dark"] .ob-sim-sc-header { background:linear-gradient(90deg,#3d4559,#2d3252) }
.ob-sim-sc-body { padding:.5rem .875rem .6rem; background:#fff }
[data-theme="dark"] .ob-sim-sc-body { background:#1a1d2e }
.ob-sim-sc-row {
  display:flex; align-items:center; gap:.5rem; font-size:.7rem;
  color:#2c3344; margin-bottom:.25rem }
[data-theme="dark"] .ob-sim-sc-row { color:#e2e8f0 }
.ob-sim-sc-row strong { color:#6b7280; font-size:.62rem; text-transform:uppercase; min-width:55px; font-weight:700 }
.ob-sim-sc-note { font-size:.7rem; color:#2c3344 }
[data-theme="dark"] .ob-sim-sc-note { color:#e2e8f0 }
.ob-sim-sc-note strong { color:#6b7280; font-size:.62rem; text-transform:uppercase; font-weight:700; display:block; margin-bottom:.2rem }
.ob-sim-sc-note p {
  background:#f8f9fb; border:1px solid #e2e6ed; border-radius:6px;
  padding:.35rem .55rem; margin:0; line-height:1.55; color:#2c3344 }
[data-theme="dark"] .ob-sim-sc-note p { background:#252a40; border-color:#3a4160; color:#cbd5e1 }

/* ═══ ADD APPLICATION MODAL DEMO ════════════════════════════ */
.ob-modal-demo {
  border-radius:12px; overflow:hidden;
  border:1px solid rgba(0,0,0,.07); background:var(--surface,#fff);
  margin-bottom:.85rem; box-shadow:0 2px 12px rgba(0,0,0,.09);
  animation:_ob_tipSlide .3s ease .07s both;
  font-family:'Poppins',system-ui,sans-serif }
[data-theme="dark"] .ob-modal-demo { background:#1a1d2e; border-color:#2a2f45 }
.ob-modal-header {
  display:flex; align-items:center; justify-content:space-between;
  padding:.6rem .9rem; background:#f8f9fb; border-bottom:1px solid #e2e6ed }
[data-theme="dark"] .ob-modal-header { background:#1e2235; border-color:#2a2f45 }
.ob-modal-title { font-size:.82rem; font-weight:700; color:#2c3344 }
[data-theme="dark"] .ob-modal-title { color:#e2e8f0 }
.ob-modal-close { font-size:.85rem; color:#9ca3af; cursor:pointer; line-height:1; opacity:.7 }
.ob-modal-body { padding:.65rem .9rem .7rem }
.ob-modal-field { margin-bottom:.52rem }
.ob-modal-label {
  display:block; font-size:.68rem; font-weight:700; text-transform:uppercase;
  letter-spacing:.04em; color:#6b7280; margin-bottom:.22rem }
[data-theme="dark"] .ob-modal-label { color:#8892a4 }
.ob-modal-req { font-size:.6rem; color:#ef4444; font-weight:600; text-transform:none; letter-spacing:0 }
.ob-modal-input {
  width:100%; padding:.38rem .65rem; border:1.5px solid #e2e6ed; border-radius:8px;
  font-size:.76rem; color:#2c3344; background:#fff; font-family:inherit;
  outline:none; transition:border-color .2s, box-shadow .2s; box-sizing:border-box }
.ob-modal-input:focus { border-color:#5c667a; box-shadow:0 0 0 3px rgba(92,102,122,.1) }
[data-theme="dark"] .ob-modal-input { background:#1e2235; border-color:#2a2f45; color:#e2e8f0 }
.ob-modal-save {
  width:100%; padding:.42rem; border:none; border-radius:8px; cursor:pointer;
  font-family:inherit; font-size:.78rem; font-weight:700;
  background:#22c55e; color:#fff; margin-top:.35rem;
  transition:all .2s cubic-bezier(.34,1.2,.64,1) }
.ob-modal-save:hover { background:#16a34a; transform:translateY(-1px) }
.ob-modal-feedback {
  margin-top:.35rem; padding:.32rem .65rem; border-radius:8px;
  font-size:.72rem; font-weight:600; align-items:center; gap:.35rem }
.ob-modal-ok  { background:rgba(34,197,94,.1);  color:#16a34a; border:1px solid rgba(34,197,94,.2) }
.ob-modal-err { background:rgba(239,68,68,.08); color:#dc2626; border:1px solid rgba(239,68,68,.15) }

/* ═══ ADD STAGE DEMO ════════════════════════════════════════ */
.ob-addstage-demo {
  border-radius:12px; overflow:hidden; border:1px solid rgba(0,0,0,.07);
  background:var(--surface,#fff); margin-bottom:.85rem;
  box-shadow:0 1px 4px rgba(0,0,0,.06);
  animation:_ob_tipSlide .3s ease .07s both;
  font-family:'Poppins',system-ui,sans-serif }
[data-theme="dark"] .ob-addstage-demo { background:#1a1d2e; border-color:#2a2f45 }

/* Timeline mini inside demo */
.ob-as-timeline {
  display:flex; align-items:flex-end; padding:.75rem .9rem .5rem; gap:0; overflow-x:auto }
.ob-as-cell {
  display:flex; flex-direction:column; align-items:center; flex:1; min-width:60px; position:relative }
.ob-as-cell:not(:last-child)::after {
  content:''; position:absolute; bottom:18px;
  left:calc(50% + 16px); right:calc(-50% + 16px);
  height:2px; background:#e2e6ed; z-index:0 }
[data-theme="dark"] .ob-as-cell:not(:last-child)::after { background:#2a2f45 }
.ob-as-label {
  display:flex; flex-direction:column; align-items:center;
  min-height:40px; padding:0 4px 6px; text-align:center; gap:2px; width:100% }
.ob-as-name  { font-size:.62rem; font-weight:600; color:#2c3344; line-height:1.3; text-align:center; word-break:break-word }
[data-theme="dark"] .ob-as-name { color:#e2e8f0 }
.ob-as-date  { font-size:.56rem; color:#9ca3af; text-align:center }
.ob-as-circle {
  width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center;
  font-size:.75rem; font-weight:800; color:#fff; position:relative; z-index:1; flex-shrink:0 }
.ob-as-done     { background:#22c55e; box-shadow:0 2px 8px rgba(34,197,94,.3) }
.ob-as-current  { background:#3b82f6; box-shadow:0 2px 10px rgba(59,130,246,.35) }
.ob-as-upcoming { background:#d1d5db }
[data-theme="dark"] .ob-as-done    { background:#16a34a }
[data-theme="dark"] .ob-as-current { background:#2563eb }
[data-theme="dark"] .ob-as-upcoming{ background:#374151 }
.ob-as-new-placeholder { animation:_ob_rowIn .35s cubic-bezier(.34,1.2,.64,1) both }
.ob-as-new-name { color:#6b7280; font-style:italic }

/* Input row */
.ob-as-input-row {
  display:flex; gap:.45rem; padding:.45rem .9rem .35rem;
  border-top:1px solid #e2e6ed }
[data-theme="dark"] .ob-as-input-row { border-color:#2a2f45 }
.ob-as-input {
  flex:1; padding:.32rem .65rem; border:1.5px solid #e2e6ed; border-radius:8px;
  font-size:.75rem; color:#2c3344; background:#fff; font-family:inherit;
  outline:none; transition:border-color .2s; min-width:0 }
.ob-as-input:focus { border-color:#5c667a }
[data-theme="dark"] .ob-as-input { background:#1e2235; border-color:#2a2f45; color:#e2e8f0 }
.ob-as-btn {
  padding:.32rem .7rem; border:none; border-radius:8px; cursor:pointer;
  font-size:.73rem; font-weight:700; font-family:inherit;
  background:#5c667a; color:#fff; white-space:nowrap;
  transition:all .18s cubic-bezier(.34,1.2,.64,1); flex-shrink:0 }
.ob-as-btn:hover { background:#4a5268; transform:translateY(-1px) }

/* Preset chips */
.ob-as-presets {
  display:flex; flex-wrap:wrap; gap:.28rem; padding:.3rem .9rem .6rem }
.ob-as-preset {
  font-size:.62rem; font-weight:600; padding:.15rem .5rem; border-radius:2rem; cursor:pointer;
  background:rgba(92,102,122,.08); border:1px solid rgba(92,102,122,.18); color:#5c667a;
  transition:all .15s; white-space:nowrap }
.ob-as-preset:hover { background:#5c667a; color:#fff; border-color:#5c667a }
[data-theme="dark"] .ob-as-preset { background:rgba(123,139,163,.12); border-color:rgba(123,139,163,.22); color:#7b8ba3 }
[data-theme="dark"] .ob-as-preset:hover { background:#5c667a; color:#fff }
.ob-sim-cv-header {
  display:flex; align-items:center; justify-content:space-between;
  padding:.55rem .875rem; background:#f8f9fb; border-bottom:1px solid #e2e6ed }
[data-theme="dark"] .ob-sim-cv-header { background:#1e2235; border-color:#2a2f45 }
.ob-sim-cv-title { font-size:.8rem; font-weight:700; color:#2c3344 }
[data-theme="dark"] .ob-sim-cv-title { color:#e2e8f0 }
.ob-sim-cv-count { font-size:.68rem; color:#6b7280; background:#e2e6ed; padding:.12rem .5rem; border-radius:2rem; font-weight:600 }
[data-theme="dark"] .ob-sim-cv-count { background:#2a2f45; color:#8892a4 }
.ob-sim-cv-list { padding:.5rem .75rem .6rem }
.ob-sim-cv-item {
  display:flex; align-items:center; gap:.5rem; padding:.38rem .55rem; border-radius:8px;
  border:1px solid #e2e6ed; background:#fff; margin-bottom:.3rem;
  transition:all .18s ease; cursor:pointer }
[data-theme="dark"] .ob-sim-cv-item { background:#1e2235; border-color:#2a2f45 }
.ob-sim-cv-item:hover { border-color:#5c667a; transform:translateX(2px); box-shadow:0 2px 8px rgba(0,0,0,.07) }
.ob-sim-cv-icon { font-size:.95rem; flex-shrink:0 }
.ob-sim-cv-name { flex:1; font-size:.72rem; font-weight:600; color:#2c3344; overflow:hidden; text-overflow:ellipsis; white-space:nowrap }
[data-theme="dark"] .ob-sim-cv-name { color:#e2e8f0 }
.ob-sim-cv-btn {
  font-size:.65rem; font-weight:700; padding:.15rem .5rem; border-radius:6px; border:none;
  background:rgba(92,102,122,.12); color:#5c667a; cursor:pointer; font-family:inherit;
  transition:all .18s; flex-shrink:0 }
.ob-sim-cv-btn:hover { background:#5c667a; color:#fff }
[data-theme="dark"] .ob-sim-cv-btn { background:rgba(123,139,163,.15); color:#7b8ba3 }
.ob-sim-cv-upload {
  padding:.35rem .5rem; border-radius:8px; border:1.5px dashed #e2e6ed;
  font-size:.7rem; font-weight:600; color:#5c667a; text-align:center; cursor:pointer;
  transition:all .18s; margin-top:.15rem }
.ob-sim-cv-upload:hover { background:rgba(92,102,122,.06); border-color:#5c667a }
[data-theme="dark"] .ob-sim-cv-upload { border-color:#2a2f45; color:#7b8ba3 }

/* ── Language picker ───────────────────────────────────────── */
#ob-lang-modal {
  position:fixed; inset:0; z-index:99999; display:none;
  align-items:center; justify-content:center; padding:1rem;
  background:rgba(5,7,20,.9); backdrop-filter:blur(12px) }
#ob-lang-modal.ob-on { display:flex }
.ob-lang-box {
  background:var(--surface,#fff); border-radius:28px;
  padding:2.5rem 2rem 2rem; max-width:440px; width:100%; text-align:center;
  box-shadow:0 0 0 1px rgba(79,99,240,.08), 0 32px 80px rgba(0,0,0,.32);
  animation:_ob_scaleIn .45s cubic-bezier(.34,1.15,.64,1) both;
  position:relative; overflow:hidden }
[data-theme="dark"] .ob-lang-box { background:#161b2e }
.ob-lang-box::before {
  content:''; position:absolute; top:0; left:0; right:0; height:3px;
  background:linear-gradient(90deg,#4f63f0,#818cf8,#a78bfa,#4f63f0);
  background-size:200% 100%; animation:_ob_shimmer 2.5s linear infinite }
.ob-lang-logo { font-size:1.5rem; font-weight:900; letter-spacing:-.04em; color:var(--dark,#111827); margin:.25rem 0 .1rem }
[data-theme="dark"] .ob-lang-logo { color:#f1f5f9 }
.ob-lang-logo span { color:#4f63f0 }
.ob-lang-title { font-size:1.05rem; font-weight:800; color:var(--dark,#111827); margin:1.1rem 0 .3rem }
[data-theme="dark"] .ob-lang-title { color:#f1f5f9 }
.ob-lang-sub { font-size:.82rem; color:var(--muted,#6b7280); margin-bottom:1.6rem; line-height:1.55 }
[data-theme="dark"] .ob-lang-sub { color:#94a3b8 }
.ob-lang-opts { display:flex; gap:.75rem; justify-content:center; margin-bottom:1.4rem }
.ob-lang-opt {
  flex:1; max-width:170px; padding:1.1rem .875rem; text-align:center;
  border:2px solid var(--border,#e5e7eb); border-radius:18px; cursor:pointer;
  background:var(--card-bg,#f9fafb); font-family:inherit;
  transition:all .24s cubic-bezier(.34,1.2,.64,1); position:relative; overflow:hidden }
[data-theme="dark"] .ob-lang-opt { background:#1e2540; border-color:#2d3555 }
.ob-lang-opt:hover { border-color:#4f63f0; transform:translateY(-3px); box-shadow:0 8px 24px rgba(79,99,240,.18) }
.ob-lang-opt.ob-sel { border-color:#4f63f0; background:rgba(79,99,240,.07); box-shadow:0 0 0 4px rgba(79,99,240,.12), 0 8px 24px rgba(79,99,240,.18); transform:translateY(-3px) }
[data-theme="dark"] .ob-lang-opt.ob-sel { background:rgba(79,99,240,.14) }
.ob-lang-flag { font-size:2.2rem; margin-bottom:.45rem; display:block; animation:_ob_float 5s ease-in-out infinite }
.ob-lang-name { font-size:.875rem; font-weight:700; color:var(--dark,#111827); display:block }
[data-theme="dark"] .ob-lang-name { color:#e2e8f0 }
.ob-lang-tag  { font-size:.68rem; color:var(--muted,#6b7280); display:block; margin-top:.1rem }
.ob-lang-chk {
  position:absolute; top:.6rem; right:.6rem; width:18px; height:18px;
  background:#4f63f0; border-radius:50%; color:#fff;
  display:flex; align-items:center; justify-content:center; font-size:.65rem;
  opacity:0; transform:scale(0); transition:all .25s cubic-bezier(.34,1.4,.64,1) }
.ob-lang-opt.ob-sel .ob-lang-chk { opacity:1; transform:scale(1) }
.ob-lang-confirm {
  width:100%; padding:.9rem; border:none; border-radius:14px;
  background:linear-gradient(135deg,#2d42c8,#4f63f0,#818cf8); background-size:200% 100%;
  color:#fff; font-family:inherit; font-size:.92rem; font-weight:700; cursor:pointer;
  box-shadow:0 4px 18px rgba(79,99,240,.45); transition:transform .2s cubic-bezier(.34,1.2,.64,1), box-shadow .2s }
.ob-lang-confirm:hover { transform:translateY(-2px); box-shadow:0 10px 28px rgba(79,99,240,.55) }

/* ── Welcome ───────────────────────────────────────────────── */
#ob-welcome {
  position:fixed; inset:0; z-index:99998; display:none;
  align-items:center; justify-content:center; padding:1rem;
  background:rgba(5,7,20,.92); backdrop-filter:blur(14px) }
#ob-welcome.ob-on { display:flex }
.ob-wbox {
  background:var(--surface,#fff); border-radius:28px; max-width:480px; width:100%; overflow:hidden;
  box-shadow:0 0 0 1px rgba(79,99,240,.1), 0 32px 80px rgba(0,0,0,.35);
  animation:_ob_scaleIn .48s cubic-bezier(.34,1.15,.64,1) both }
[data-theme="dark"] .ob-wbox { background:#161b2e }
.ob-whero {
  padding:2.5rem 2rem 2rem; text-align:center; position:relative; overflow:hidden;
  background:linear-gradient(135deg,#1a1f6a,#2e47d4,#5b21b6,#1e1b4b);
  background-size:300% 300%; animation:_ob_bgFlow 10s ease infinite }
.ob-whero::before {
  content:''; position:absolute; inset:0; pointer-events:none;
  background:radial-gradient(circle at 50% 0%,rgba(139,92,246,.5) 0%,transparent 55%),
             radial-gradient(circle at 20% 82%,rgba(59,130,246,.28) 0%,transparent 45%) }
.ob-wemoji { font-size:3.5rem; display:block; margin-bottom:.875rem; position:relative; z-index:1; animation:_ob_float 3.6s ease-in-out infinite }
.ob-wtitle { font-size:1.38rem; font-weight:900; color:#fff; margin-bottom:.55rem; position:relative; z-index:1; letter-spacing:-.03em }
.ob-wsub   { font-size:.875rem; color:rgba(255,255,255,.75); line-height:1.65; position:relative; z-index:1; max-width:350px; margin:0 auto }
.ob-wbody  { padding:1.5rem 2rem 2rem }
.ob-wfeats { display:flex; flex-direction:column; gap:.42rem; margin-bottom:1.35rem }
.ob-wfeat  {
  display:flex; align-items:center; gap:.65rem; padding:.48rem .72rem; border-radius:11px;
  background:rgba(79,99,240,.06); border:1px solid rgba(79,99,240,.1);
  font-size:.8rem; color:var(--text,#374151); font-weight:500;
  animation:_ob_tipSlide .35s ease both }
[data-theme="dark"] .ob-wfeat { background:rgba(79,99,240,.1); border-color:rgba(79,99,240,.18); color:#cbd5e1 }
.ob-wfeat-icon { font-size:1rem; flex-shrink:0 }
.ob-wtime {
  display:inline-flex; align-items:center; gap:.5rem; margin-bottom:1.25rem;
  background:rgba(79,99,240,.07); border:1px solid rgba(79,99,240,.14);
  border-radius:2rem; padding:.28rem .88rem; font-size:.75rem; font-weight:600; color:#4f63f0 }
[data-theme="dark"] .ob-wtime { color:#818cf8; background:rgba(79,99,240,.12); border-color:rgba(79,99,240,.22) }
.ob-wacts  { display:flex; flex-direction:column; gap:.58rem }
.ob-wstart {
  width:100%; padding:.9rem; border:none; border-radius:14px;
  background:linear-gradient(135deg,#2d42c8,#4f63f0,#818cf8); background-size:200% 100%;
  color:#fff; font-family:inherit; font-size:.95rem; font-weight:700; cursor:pointer;
  box-shadow:0 4px 18px rgba(79,99,240,.45); transition:transform .22s cubic-bezier(.34,1.2,.64,1), box-shadow .2s }
.ob-wstart:hover { transform:translateY(-2px); box-shadow:0 10px 28px rgba(79,99,240,.55) }
.ob-wskip {
  background:none; border:none; cursor:pointer; font-family:inherit; font-size:.8rem;
  color:var(--muted,#9ca3af); transition:color .15s; padding:.3rem; text-align:center }
.ob-wskip:hover { color:var(--text,#374151) }
[data-theme="dark"] .ob-wskip:hover { color:#e2e8f0 }

/* ── Skip dialog ───────────────────────────────────────────── */
#ob-skip-dlg {
  position:fixed; inset:0; z-index:100000; display:none;
  align-items:center; justify-content:center; padding:1rem;
  background:rgba(5,7,20,.75); backdrop-filter:blur(8px) }
#ob-skip-dlg.ob-on { display:flex }
.ob-sbox {
  background:var(--surface,#fff); border-radius:22px;
  padding:2rem 1.75rem 1.75rem; max-width:340px; width:100%; text-align:center;
  box-shadow:0 28px 60px rgba(0,0,0,.3);
  animation:_ob_scaleIn .3s cubic-bezier(.34,1.2,.64,1) both }
[data-theme="dark"] .ob-sbox { background:#161b2e }
.ob-s-icon { font-size:2.25rem; margin-bottom:.625rem; display:block; animation:_ob_float 3s ease-in-out infinite }
.ob-s-head { font-size:.95rem; font-weight:800; color:var(--dark,#111827); margin-bottom:.4rem }
[data-theme="dark"] .ob-s-head { color:#f1f5f9 }
.ob-s-text { font-size:.84rem; color:var(--muted,#6b7280); line-height:1.6; margin-bottom:1.25rem }
[data-theme="dark"] .ob-s-text { color:#94a3b8 }
.ob-s-acts { display:flex; gap:.625rem }
.ob-s-yes,.ob-s-no { flex:1; padding:.65rem; border-radius:12px; font-family:inherit; font-size:.82rem; font-weight:700; cursor:pointer; border:none; transition:all .2s cubic-bezier(.34,1.2,.64,1) }
.ob-s-yes { background:var(--card-bg,#f3f4f6); border:1.5px solid var(--border,#e5e7eb); color:var(--muted,#6b7280) }
.ob-s-yes:hover { background:var(--border,#e5e7eb); transform:translateY(-1px) }
.ob-s-no  { background:linear-gradient(135deg,#2d42c8,#4f63f0); color:#fff; box-shadow:0 4px 14px rgba(79,99,240,.38) }
.ob-s-no:hover  { transform:translateY(-2px); box-shadow:0 8px 22px rgba(79,99,240,.52) }
[data-theme="dark"] .ob-s-yes { background:#252a40; border-color:#3a4160; color:#94a3b8 }

/* ── Done screen ───────────────────────────────────────────── */
#ob-done {
  position:fixed; inset:0; z-index:99998; display:none;
  align-items:center; justify-content:center; padding:1rem;
  background:rgba(5,7,20,.92); backdrop-filter:blur(14px) }
#ob-done.ob-on { display:flex }
.ob-dbox {
  background:var(--surface,#fff); border-radius:28px; max-width:440px; width:100%; overflow:hidden;
  box-shadow:0 0 0 1px rgba(16,185,129,.1), 0 40px 100px rgba(0,0,0,.32);
  animation:_ob_scaleIn .48s cubic-bezier(.34,1.15,.64,1) both }
[data-theme="dark"] .ob-dbox { background:#161b2e }
.ob-dhero {
  padding:2.25rem 2rem 1.75rem; text-align:center; position:relative; overflow:hidden;
  background:linear-gradient(135deg,#064e3b,#059669,#065f46,#022c22);
  background-size:300% 300%; animation:_ob_bgFlow 8s ease infinite }
.ob-dhero::before {
  content:''; position:absolute; inset:0; pointer-events:none;
  background:radial-gradient(circle at 50% 0%,rgba(52,211,153,.45) 0%,transparent 55%) }
.ob-demoji { font-size:3.75rem; display:block; position:relative; z-index:1; margin-bottom:.875rem; animation:_ob_bounce .6s cubic-bezier(.34,1.2,.64,1) .15s both }
.ob-dtitle { font-size:1.3rem; font-weight:900; color:#fff; position:relative; z-index:1; letter-spacing:-.03em }
.ob-dbody  { padding:1.625rem 1.75rem 1.875rem; text-align:center }
.ob-ddesc  { font-size:.875rem; color:var(--text,#374151); line-height:1.7; margin-bottom:1.25rem }
[data-theme="dark"] .ob-ddesc { color:#cbd5e1 }
.ob-dfeats { display:flex; gap:.45rem; flex-wrap:wrap; justify-content:center; margin-bottom:1.25rem }
.ob-dfeat  {
  display:inline-flex; align-items:center; gap:.3rem;
  background:rgba(16,185,129,.08); border:1px solid rgba(16,185,129,.18);
  border-radius:2rem; padding:.24rem .72rem; font-size:.72rem; font-weight:600; color:#059669;
  animation:_ob_tipSlide .4s ease both }
[data-theme="dark"] .ob-dfeat { color:#34d399; background:rgba(16,185,129,.12); border-color:rgba(16,185,129,.25) }
.ob-dbtn {
  width:100%; padding:.9rem; border:none; border-radius:14px;
  background:linear-gradient(135deg,#059669,#10b981,#34d399); background-size:200% 100%;
  color:#fff; font-family:inherit; font-size:.95rem; font-weight:700; cursor:pointer;
  box-shadow:0 4px 18px rgba(16,185,129,.42); transition:transform .22s cubic-bezier(.34,1.2,.64,1), box-shadow .2s }
.ob-dbtn:hover { transform:translateY(-2px); box-shadow:0 10px 28px rgba(16,185,129,.55) }

/* ── Confetti ──────────────────────────────────────────────── */
.ob-cf {
  position:fixed; z-index:100001; pointer-events:none; border-radius:2px;
  animation:_ob_confFall linear forwards, _ob_sway ease-in-out infinite }

/* ── Mobile ────────────────────────────────────────────────── */
/* ── Mobile: tooltip + all demos fully responsive ── */
@media (max-width:600px) {
  #ob-tooltip {
    width:calc(100vw - 1rem) !important;
    max-width:calc(100vw - 1rem) !important;
    left:.5rem !important;
    right:.5rem !important;
    max-height:88vh;
    border-radius:18px;
  }
  .ob-body { max-height:52vh }
}
@media (max-width:480px) {
  #ob-tooltip { border-radius:16px; max-height:85vh }
  .ob-th { padding:.7rem .875rem .6rem }
  .ob-icon-wrap { width:36px; height:36px; font-size:1.1rem; border-radius:10px }
  .ob-title { font-size:.84rem }
  .ob-tour-tag { font-size:.56rem }
  .ob-badge { font-size:.6rem; padding:.15rem .5rem }
  .ob-desc { font-size:.78rem; line-height:1.6 }
  .ob-tip { font-size:.7rem; padding:.42rem .75rem .42rem 1.9rem }
  .ob-tip::before { font-size:.75rem }
  .ob-body { padding:.72rem .875rem 0; max-height:50vh }
  .ob-footer { padding:.5rem .875rem .8rem }
  .ob-btn { font-size:.72rem; padding:.4rem .78rem; border-radius:8px }
  .ob-dots { gap:4px }
  .ob-dot { width:5px; height:5px }
  .ob-dot.d-now { width:18px }
  /* Demo tables: tighter on small screens */
  .ob-sim-table th, .ob-sim-table td { padding:.3rem .4rem; font-size:.65rem }
  .ob-sim-search-input { font-size:.67rem }
  .ob-sim-add-btn { font-size:.67rem; padding:.25rem .55rem }
  /* Modal demo */
  .ob-modal-input { font-size:.71rem }
  .ob-modal-save { font-size:.73rem }
  /* Add stage demo */
  .ob-as-name { font-size:.58rem }
  .ob-as-circle { width:30px; height:30px; font-size:.68rem }
  .ob-as-preset { font-size:.58rem; padding:.12rem .4rem }
  /* Lang box */
  .ob-lang-box { padding:1.75rem 1.25rem 1.5rem }
  .ob-lang-opts { flex-direction:column }
  .ob-lang-opt { max-width:100%; display:flex; flex-direction:row; align-items:center; gap:.875rem; text-align:left }
  .ob-lang-flag { font-size:1.75rem; margin-bottom:0; flex-shrink:0 }
  /* Welcome / done */
  .ob-whero { padding:1.875rem 1.25rem 1.5rem }
  .ob-wbody { padding:1.25rem 1.375rem 1.625rem }
  .ob-dhero { padding:1.75rem 1.25rem 1.5rem }
  .ob-dbody { padding:1.375rem 1.25rem 1.625rem }
}
@media (max-width:360px) {
  .ob-title { font-size:.8rem }
  .ob-desc { font-size:.74rem }
  .ob-btn { font-size:.68rem; padding:.36rem .65rem }
  .ob-body { max-height:46vh }
  .ob-sim-table th, .ob-sim-table td { padding:.25rem .3rem; font-size:.6rem }
}
    `;
    document.head.appendChild(s);
  }

  /* ══════════════════════════════════════════════════════════
     BUILD DOM
  ══════════════════════════════════════════════════════════ */
  function mkEl(tag, props) {
    const e = document.createElement(tag);
    if (props) Object.keys(props).forEach(k => e[k] = props[k]);
    return e;
  }

  function buildDOM() {
    if (document.getElementById('ob-backdrop')) return;

    const bd = mkEl('div', { id: 'ob-backdrop' });
    bd.innerHTML = '<div class="ob-shade" id="ob-s-t"></div><div class="ob-shade" id="ob-s-b"></div><div class="ob-shade" id="ob-s-l"></div><div class="ob-shade" id="ob-s-r"></div>';
    document.body.appendChild(bd);

    document.body.appendChild(mkEl('div', { id: 'ob-ring' }));
    document.body.appendChild(mkEl('div', { id: 'ob-arrow' }));
    document.body.appendChild(mkEl('div', { id: 'ob-tooltip' }));

    const lm = mkEl('div', { id: 'ob-lang-modal' });
    lm.innerHTML = `<div class="ob-lang-box">
      <div class="ob-lang-logo">Career<span>Tracker</span></div>
      <div class="ob-lang-title" id="ob-lt">Choose Your Language</div>
      <div class="ob-lang-sub"   id="ob-ls">Select the language you'd like to use.</div>
      <div class="ob-lang-opts">
        <div class="ob-lang-opt ob-sel" data-lang="en">
          <span class="ob-lang-flag">🇬🇧</span>
          <span class="ob-lang-name">English</span>
          <span class="ob-lang-tag">English</span>
          <span class="ob-lang-chk">✓</span>
        </div>
        <div class="ob-lang-opt" data-lang="id">
          <span class="ob-lang-flag">🇮🇩</span>
          <span class="ob-lang-name">Bahasa Indonesia</span>
          <span class="ob-lang-tag">Indonesia</span>
          <span class="ob-lang-chk">✓</span>
        </div>
      </div>
      <button class="ob-lang-confirm" id="ob-lc">Continue →</button>
    </div>`;
    document.body.appendChild(lm);

    const wm = mkEl('div', { id: 'ob-welcome' });
    wm.innerHTML = `<div class="ob-wbox">
      <div class="ob-whero">
        <span class="ob-wemoji">👋</span>
        <div class="ob-wtitle" id="ob-wt"></div>
        <div class="ob-wsub"   id="ob-ws"></div>
      </div>
      <div class="ob-wbody">
        <div class="ob-wtime">⏱ <span id="ob-wtime"></span></div>
        <div class="ob-wfeats" id="ob-wfeats"></div>
        <div class="ob-wacts">
          <button class="ob-wstart" id="ob-wstart"></button>
          <button class="ob-wskip"  id="ob-wskip"></button>
        </div>
      </div>
    </div>`;
    document.body.appendChild(wm);

    const sd = mkEl('div', { id: 'ob-skip-dlg' });
    sd.innerHTML = `<div class="ob-sbox">
      <span class="ob-s-icon">🤔</span>
      <div class="ob-s-head">Are you sure?</div>
      <div class="ob-s-text" id="ob-st"></div>
      <div class="ob-s-acts">
        <button class="ob-s-yes" id="ob-sy"></button>
        <button class="ob-s-no"  id="ob-sn"></button>
      </div>
    </div>`;
    document.body.appendChild(sd);

    const dm = mkEl('div', { id: 'ob-done' });
    dm.innerHTML = `<div class="ob-dbox">
      <div class="ob-dhero">
        <span class="ob-demoji">🎊</span>
        <div class="ob-dtitle" id="ob-dt"></div>
      </div>
      <div class="ob-dbody">
        <div class="ob-ddesc"  id="ob-dd"></div>
        <div class="ob-dfeats" id="ob-df"></div>
        <button class="ob-dbtn" id="ob-db"></button>
      </div>
    </div>`;
    document.body.appendChild(dm);
  }

  /* ══════════════════════════════════════════════════════════
     SPOTLIGHT
  ══════════════════════════════════════════════════════════ */
  const PAD = 12;

  function getEl(step) {
    for (const s of (step.target || '').split(',').map(x => x.trim())) {
      const e = document.querySelector(s);
      if (e && e.offsetParent !== null) return e;
    }
    for (const s of (step.fallback || '').split(',').map(x => x.trim())) {
      const e = document.querySelector(s);
      if (e && e.offsetParent !== null) return e;
    }
    return null;
  }

  function setSpotlight(tgt, pulse) {
    const bd   = document.getElementById('ob-backdrop');
    const ring = document.getElementById('ob-ring');
    const sT   = document.getElementById('ob-s-t');
    const sB   = document.getElementById('ob-s-b');
    const sL   = document.getElementById('ob-s-l');
    const sR   = document.getElementById('ob-s-r');

    bd.classList.add('ob-on');
    ring.classList.toggle('ob-pulse', !!pulse);

    if (!tgt) {
      ring.classList.remove('ob-on');
      [sT,sB,sL,sR].forEach(s => { s.style.display = 'none'; });
      sT.style.cssText = 'top:0;left:0;right:0;bottom:0;display:block';
      return;
    }

    tgt.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => {
      const r  = tgt.getBoundingClientRect();
      const vw = window.innerWidth, vh = window.innerHeight;
      const tp = Math.max(0, r.top - PAD),    lt = Math.max(0, r.left - PAD);
      const bt = Math.min(vh, r.bottom + PAD), rt = Math.min(vw, r.right + PAD);
      const w  = rt - lt, h  = bt - tp;

      sT.style.cssText = `top:0;left:0;right:0;height:${tp}px;display:block`;
      sB.style.cssText = `bottom:0;left:0;right:0;height:${vh-bt}px;display:block`;
      sL.style.cssText = `top:${tp}px;left:0;width:${lt}px;height:${h}px;display:block`;
      sR.style.cssText = `top:${tp}px;right:0;width:${vw-rt}px;height:${h}px;display:block`;

      ring.style.top    = tp + 'px';
      ring.style.left   = lt + 'px';
      ring.style.width  = w  + 'px';
      ring.style.height = h  + 'px';
      ring.classList.add('ob-on');
    }, 160);
  }

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(v, hi)); }

  function posTooltip(tgt, placement) {
    const tt  = document.getElementById('ob-tooltip');
    const ar  = document.getElementById('ob-arrow');
    const vw  = window.innerWidth, vh = window.innerHeight;
    const isMobile = vw <= 600;
    const TTW = isMobile ? vw - 16 : Math.min(400, vw - 20);
    const GAP = 12;
    const MAX_H = Math.floor(vh * (isMobile ? 0.88 : 0.92));

    tt.style.width    = TTW + 'px';
    tt.style.maxHeight = MAX_H + 'px';
    tt.style.display  = 'flex';
    const TTH = Math.min(tt.scrollHeight || 400, MAX_H);
    tt.style.display  = 'none';

    // Center placement — always show in middle of screen (for modal demos)
    if (placement === 'center' || !tgt) {
      tt.style.left = (isMobile ? '8px' : ((vw - TTW) / 2) + 'px');
      tt.style.top  = clamp((vh - TTH) / 2, 8, vh - TTH - 8) + 'px';
      ar.className  = '';
      showTT(); return;
    }

    const r  = tgt.getBoundingClientRect();
    const tp = Math.max(0, r.top - PAD),    lt = Math.max(0, r.left - PAD);
    const bt = Math.min(vh, r.bottom + PAD), rt = Math.min(vw, r.right + PAD);
    const cx = (lt + rt) / 2;

    let pl = placement;
    if (pl === 'bottom' && bt + GAP + TTH > vh) pl = 'top';
    if (pl === 'top'    && tp - GAP - TTH < 0)  pl = 'bottom';

    let tx, ty, ac;
    if      (pl === 'bottom') { ty = bt + GAP; tx = clamp(cx - TTW/2, 8, vw-TTW-8); ac = 'a-top'; }
    else if (pl === 'top'   ) { ty = tp - GAP - TTH; tx = clamp(cx - TTW/2, 8, vw-TTW-8); ac = 'a-bottom'; }
    else if (pl === 'right' ) { tx = rt + GAP; ty = clamp((tp+bt)/2 - TTH/2, 8, vh-TTH-8); ac = 'a-left'; }
    else                      { tx = lt - GAP - TTW; ty = clamp((tp+bt)/2 - TTH/2, 8, vh-TTH-8); ac = 'a-right'; }

    ty = clamp(ty, 8, vh - TTH - 8);
    tx = clamp(tx, 8, vw - TTW - 8);

    tt.style.left = tx + 'px';
    tt.style.top  = ty + 'px';

    ar.style.left = clamp(cx - 11, tx + 16, tx + TTW - 36) + 'px';
    ar.style.top  = (pl === 'bottom' ? bt + GAP - 11 : pl === 'top' ? tp - GAP : 0) + 'px';
    ar.className  = 'ob-on ' + ac;

    showTT();
  }

  function showTT() {
    const tt = document.getElementById('ob-tooltip');
    tt.classList.remove('ob-in');
    tt.style.display = 'none';
    requestAnimationFrame(() => {
      tt.style.display = 'flex';
      requestAnimationFrame(() => tt.classList.add('ob-in'));
    });
  }

  /* ══════════════════════════════════════════════════════════
     RENDER STEP
  ══════════════════════════════════════════════════════════ */
  function renderStep(steps, idx) {
    const step   = steps[idx];
    const total  = steps.length;
    const isLast = idx === total - 1;
    const tgt    = getEl(step);

    setSpotlight(tgt, step.pulse);

    const pct  = Math.round(((idx + 1) / total) * 100);
    const dots = steps.map((_, i) => `<span class="ob-dot ${i < idx ? 'd-done' : i === idx ? 'd-now' : ''}"></span>`).join('');
    const label = lang === 'id' ? `Langkah ${idx+1} ${t('step_of')} ${total}` : `Step ${idx+1} ${t('step_of')} ${total}`;
    const tipTxt = step.tip.replace(/^💡\s*/i, '');
    const tourLabel = lang === 'id' ? 'Tur Interaktif' : 'Interactive Tour';

    // Always build demo fresh so state resets on Back/Next
    const freshDemo = step.demoBuilder ? step.demoBuilder() : (step.demoHtml || '');

    document.getElementById('ob-tooltip').innerHTML = `
      <div class="ob-th">
        <div class="ob-th-row">
          <span class="ob-badge">${label}</span>
          <button class="ob-skip" id="ob-skip-btn">${t('skip_btn')}</button>
        </div>
        <div class="ob-th-body">
          <div class="ob-icon-wrap">${step.icon}</div>
          <div class="ob-title-wrap">
            <div class="ob-title">${step.title}</div>
            <div class="ob-tour-tag">${tourLabel}</div>
          </div>
        </div>
      </div>
      <div class="ob-prog"><div class="ob-prog-fill" style="width:${pct}%"></div></div>
      <div class="ob-body">
        <div class="ob-desc">${step.desc}</div>
        ${freshDemo}
        ${step.sim ? `<button class="ob-sim-btn" id="ob-sim-run">${t('sim_btn')}</button>` : ''}
        <div class="ob-tip">${tipTxt}</div>
      </div>
      <div class="ob-footer">
        <div class="ob-dots">${dots}</div>
        <div class="ob-nav">
          ${idx > 0 ? `<button class="ob-btn ob-btn-prev" id="ob-prev">${t('prev')}</button>` : ''}
          ${isLast
            ? `<button class="ob-btn ob-btn-finish" id="ob-next">${t('finish')}</button>`
            : `<button class="ob-btn ob-btn-next"   id="ob-next">${t('next')}</button>`}
        </div>
      </div>`;

    requestAnimationFrame(() => {
      posTooltip(tgt, step.placement);

      if (step.demoInit) {
        requestAnimationFrame(() => step.demoInit());
      }

      document.getElementById('ob-next')?.addEventListener('click', () => {
        if (isLast) showDone(steps);
        else { currentStep = idx + 1; renderStep(steps, idx + 1); }
      });
      document.getElementById('ob-prev')?.addEventListener('click', () => {
        currentStep = idx - 1; renderStep(steps, idx - 1);
      });
      document.getElementById('ob-skip-btn')?.addEventListener('click', showSkipDlg);
      document.getElementById('ob-sim-run')?.addEventListener('click', () => step.sim && step.sim());
    });
  }

  /* ══════════════════════════════════════════════════════════
     DONE SCREEN
  ══════════════════════════════════════════════════════════ */
  function showDone(steps) {
    const isDetail = steps && steps[0] && steps[0].target && steps[0].target.includes('app-summary');
    document.getElementById('ob-tooltip').style.display = 'none';
    document.getElementById('ob-backdrop').classList.remove('ob-on');
    document.getElementById('ob-ring').classList.remove('ob-on', 'ob-pulse');
    document.getElementById('ob-arrow').className = '';

    document.getElementById('ob-dt').textContent = isDetail ? t('dt_done_title') : t('done_title');
    document.getElementById('ob-dd').textContent = isDetail ? t('dt_done_desc')  : t('done_desc');
    document.getElementById('ob-db').textContent = isDetail ? t('dt_done_btn')   : t('done_btn');

    const feats = isDetail
      ? (lang === 'id' ? ['✅ Tahap terlacak', '📋 Catatan tersimpan', '📊 Progres terpantau'] : ['✅ Stages tracked', '📋 Notes saved', '📊 Progress monitored'])
      : (lang === 'id' ? ['✅ Lamaran terlacak', '📋 Tahap terpantau', '📄 CV terorganisir'] : ['✅ Applications tracked', '📋 Stages monitored', '📄 CV organized']);

    document.getElementById('ob-df').innerHTML = feats.map((f, i) =>
      `<span class="ob-dfeat" style="animation-delay:${.08+i*.1}s">${f}</span>`).join('');

    document.getElementById('ob-done').classList.add('ob-on');
    launchConfetti();

    document.getElementById('ob-db').onclick = () => {
      document.getElementById('ob-done').classList.remove('ob-on');
      closeTour();
    };
  }

  /* ══════════════════════════════════════════════════════════
     CONFETTI
  ══════════════════════════════════════════════════════════ */
  function launchConfetti() {
    const colors = ['#4f63f0','#818cf8','#10b981','#34d399','#f59e0b','#fcd34d','#ec4899','#f9a8d4','#fff'];
    for (let i = 0; i < 80; i++) {
      const p = document.createElement('div');
      p.className = 'ob-cf';
      const sz  = Math.random() * 9 + 5;
      const dur = Math.random() * 2.4 + 1.8;
      const sw  = Math.random() * 1.6 + 0.8;
      p.style.cssText = `left:${Math.random()*100}vw;top:-10px;background:${colors[Math.floor(Math.random()*colors.length)]};width:${sz}px;height:${sz*(Math.random()>.5?1:1.8)}px;border-radius:${Math.random()>.5?'50%':'2px'};animation-duration:${dur}s,${sw}s;animation-delay:${Math.random()*.9}s,0s;animation-timing-function:linear,ease-in-out;opacity:${Math.random()*.5+.5}`;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), (dur + 1.2) * 1000);
    }
  }

  /* ══════════════════════════════════════════════════════════
     SKIP DIALOG
  ══════════════════════════════════════════════════════════ */
  function showSkipDlg() {
    document.getElementById('ob-st').textContent = t('skip_confirm');
    document.getElementById('ob-sy').textContent = t('skip_yes');
    document.getElementById('ob-sn').textContent = t('skip_no');
    document.getElementById('ob-skip-dlg').classList.add('ob-on');

    document.getElementById('ob-sy').onclick = () => {
      document.getElementById('ob-skip-dlg').classList.remove('ob-on');
      closeTour();
    };
    document.getElementById('ob-sn').onclick = () => {
      document.getElementById('ob-skip-dlg').classList.remove('ob-on');
    };
  }

  /* ══════════════════════════════════════════════════════════
     CLOSE
  ══════════════════════════════════════════════════════════ */
  function closeTour() {
    tourActive = false;
    localStorage.setItem('ct_tour_done', '1');
    ['ob-backdrop','ob-ring','ob-arrow','ob-tooltip','ob-lang-modal','ob-welcome','ob-done','ob-skip-dlg'].forEach(id => {
      const e = document.getElementById(id);
      if (!e) return;
      e.classList.remove('ob-on','ob-pulse','ob-in');
      e.style.display = 'none';
    });
    setTimeout(() => document.getElementById('ob-styles')?.remove(), 500);
  }

  /* ══════════════════════════════════════════════════════════
     LANG PICKER
  ══════════════════════════════════════════════════════════ */
  function showLangPicker() {
    return new Promise(resolve => {
      const modal = document.getElementById('ob-lang-modal');
      modal.style.display = '';
      modal.classList.add('ob-on');
      let picked = 'en';
      modal.querySelectorAll('.ob-lang-opt').forEach(opt => {
        opt.addEventListener('click', () => {
          modal.querySelectorAll('.ob-lang-opt').forEach(o => o.classList.remove('ob-sel'));
          opt.classList.add('ob-sel');
          picked = opt.dataset.lang;
        });
      });
      document.getElementById('ob-lc').addEventListener('click', () => {
        modal.classList.remove('ob-on');
        setTimeout(() => { modal.style.display = 'none'; resolve(picked); }, 150);
      });
    });
  }

  /* ══════════════════════════════════════════════════════════
     WELCOME
  ══════════════════════════════════════════════════════════ */
  function showWelcome() {
    return new Promise(resolve => {
      document.getElementById('ob-wt').textContent     = t('welcome_title');
      document.getElementById('ob-ws').textContent     = t('welcome_subtitle');
      document.getElementById('ob-wtime').textContent  = t('welcome_time');
      document.getElementById('ob-wstart').textContent = t('start_btn');
      document.getElementById('ob-wskip').textContent  = t('skip_btn');

      const feats = [
        { icon: '🎯', text: t('welcome_feat1') },
        { icon: '💡', text: t('welcome_feat2') },
        { icon: '🗺️', text: t('welcome_feat3') },
      ];
      document.getElementById('ob-wfeats').innerHTML = feats.map((f, i) =>
        `<div class="ob-wfeat" style="animation-delay:${.1+i*.08}s">
          <span class="ob-wfeat-icon">${f.icon}</span><span>${f.text}</span>
        </div>`).join('');

      const w = document.getElementById('ob-welcome');
      w.style.display = '';
      w.classList.add('ob-on');

      document.getElementById('ob-wstart').onclick = () => {
        w.classList.remove('ob-on');
        setTimeout(() => { w.style.display = 'none'; resolve(true); }, 150);
      };
      document.getElementById('ob-wskip').onclick = () => {
        w.classList.remove('ob-on');
        setTimeout(() => { w.style.display = 'none'; resolve(false); }, 150);
      };
    });
  }

  /* ══════════════════════════════════════════════════════════
     RESIZE / SCROLL
  ══════════════════════════════════════════════════════════ */
  let _rszTimer;
  function attachHandlers(steps) {
    window.addEventListener('resize', () => {
      clearTimeout(_rszTimer);
      _rszTimer = setTimeout(() => {
        if (!tourActive) return;
        const step = steps[currentStep];
        const tgt  = getEl(step);
        setSpotlight(tgt, step.pulse);
        posTooltip(tgt, step.placement);
      }, 200);
    });
    window.addEventListener('scroll', () => {
      if (!tourActive) return;
      const step = steps[currentStep];
      const tgt  = getEl(step);
      if (tgt) setSpotlight(tgt, step.pulse);
    }, { passive: true });
  }

  /* ══════════════════════════════════════════════════════════
     ENTRIES
  ══════════════════════════════════════════════════════════ */

  async function startOnboarding() {
    injectStyles();
    buildDOM();

    const chosen = await showLangPicker();
    lang = chosen;
    if (typeof setLang === 'function') setLang(lang);
    localStorage.setItem('ct_lang', lang);
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.innerHTML = lang === 'id'
        ? '🇮🇩 <span class="lang-btn-text">ID</span>'
        : '🇬🇧 <span class="lang-btn-text">EN</span>';
    });

    const go = await showWelcome();
    if (!go) { closeTour(); return; }

    document.getElementById('ob-backdrop').classList.add('ob-on');
    tourActive  = true;
    currentStep = 0;
    const steps = getHomeSteps();
    renderStep(steps, 0);
    attachHandlers(steps);
  }

  function startDetailTour() {
    lang = localStorage.getItem('ct_lang') || 'en';
    injectStyles();
    buildDOM();

    document.getElementById('ob-backdrop').classList.add('ob-on');
    tourActive  = true;
    currentStep = 0;
    const steps = getDetailSteps();
    renderStep(steps, 0);
    attachHandlers(steps);
  }

  /* ══════════════════════════════════════════════════════════
     PUBLIC API
  ══════════════════════════════════════════════════════════ */
  window.startCareerTrackerTour = startOnboarding;
  window.startDetailPageTour    = startDetailTour;

  function checkAutoStart() {
    const done  = localStorage.getItem('ct_tour_done');
    const isNew = localStorage.getItem('ct_tour_new_user');
    if (!done && isNew) {
      localStorage.removeItem('ct_tour_new_user');
      setTimeout(startOnboarding, 800);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAutoStart);
  } else {
    checkAutoStart();
  }

})();

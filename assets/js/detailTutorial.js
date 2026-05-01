// ============================================================
// detailTutorial.js — Traqio Application Detail Tutorial
// Interactive tutorial with LIVE simulation & animations
// Inject via: <script src="../assets/js/detailTutorial.js"></script>
// Trigger via: window.startDetailTutorial()
// ============================================================
(function () {
  'use strict';

  /* ══════════════════════════════════════════════════════════
     MOCK DATA — simulated application used in the tutorial
     ══════════════════════════════════════════════════════════ */
  const MOCK = {
    company:  'Google Indonesia',
    program:  'Software Engineer Intern',
    jobTitle: '2026',
    status:   'active',
    stages: [
      { name: 'CV Screening',         date: '2025-12-10', time: '09:00', notes: 'Submit CV + cover letter via email.' },
      { name: 'Online Assessment',    date: '2026-01-15', time: '13:00', notes: 'Coding test: 3 algorithmic problems. Duration 90 min.' },
      { name: 'Technical Interview',  date: '2026-02-05', time: '10:00', notes: 'Live coding + system design. Zoom meeting.' },
      { name: 'HR Interview',         date: '2026-02-20', time: '14:00', notes: '' },
      { name: 'Job Offer',            date: '',            time: '',       notes: '' },
    ],
  };

  /* ══════════════════════════════════════════════════════════
     i18n
     ══════════════════════════════════════════════════════════ */
  function getLangNow() {
    return (typeof getLang === 'function' ? getLang() : null) || localStorage.getItem('ct_lang') || 'en';
  }
  const T = {
    en: {
      title:        'Application Detail Tutorial',
      skip:         'Skip',
      next:         'Next →',
      prev:         '← Back',
      finish:       'Got it! 🎉',
      step_of:      'of',
      // Step content
      s0_title:     '📋 Application Summary Card',
      s0_desc:      'This card shows the <strong>company name</strong>, program, and current status. Use the action buttons on the right to edit, add stages, or switch to another application.',
      s0_tip:       'Click the ✎ pencil icon to edit the company name and program directly inline.',
      s1_title:     '🔄 Recruitment Timeline',
      s1_desc:      'Each circle represents a <strong>recruitment stage</strong>. The color shows its status: <span style="color:#6366f1">●</span> current, <span style="color:#22c55e">●</span> done, <span style="color:#94a3b8">●</span> upcoming.',
      s1_tip:       'Stages are automatically ordered by date. Past dates appear as "done".',
      s2_title:     '👆 Click a Stage Circle',
      s2_desc:      'Tap any stage circle to open its <strong>detail card</strong> below. Let\'s simulate clicking the <em>Online Assessment</em> stage now.',
      s2_tip:       'The active stage is highlighted with a glowing ring.',
      s3_title:     '📄 Stage Detail Card',
      s3_desc:      'This card shows the stage <strong>name</strong>, <strong>date & time</strong>, and your <strong>notes</strong>. Click the ✎ icon to edit notes and update the date.',
      s3_tip:       'Notes support free text — write interview tips, links, or reminders here.',
      s4_title:     '➕ Add a New Stage',
      s4_desc:      'Click the <strong>+</strong> button in the summary card to add a new recruitment stage. Set the step number, name, date, and time.',
      s4_tip:       'You can reorder stages by changing the step number when adding.',
      s5_title:     '📊 Progress Bar',
      s5_desc:      'The <strong>progress bar</strong> shows how many stages are completed vs total. A stage is "done" once its date has passed.',
      s5_tip:       'Track your momentum — aim to complete every stage on time!',
      s6_title:     '⚠️ Danger Zone',
      s6_desc:      'Scroll down to find the <strong>Danger Zone</strong>. Use the delete button to permanently remove this application and all its stage data.',
      s6_tip:       'This action cannot be undone — a confirmation dialog will appear first.',
      done_title:   'Tutorial Complete! 🎉',
      done_desc:    "You now know how to use the Application Detail page. Track every recruitment stage, update notes, and stay on top of your job applications!",
      btn_done:     'Start Tracking!',
    },
    id: {
      title:        'Tutorial Detail Lamaran',
      skip:         'Lewati',
      next:         'Lanjut →',
      prev:         '← Kembali',
      finish:       'Mengerti! 🎉',
      step_of:      'dari',
      s0_title:     '📋 Kartu Ringkasan Lamaran',
      s0_desc:      'Kartu ini menampilkan <strong>nama perusahaan</strong>, program, dan status saat ini. Gunakan tombol aksi di kanan untuk mengedit, menambah tahap, atau berpindah ke lamaran lain.',
      s0_tip:       'Klik ikon ✎ pensil untuk mengedit nama perusahaan dan program secara langsung.',
      s1_title:     '🔄 Timeline Rekrutmen',
      s1_desc:      'Setiap lingkaran mewakili <strong>tahap rekrutmen</strong>. Warna menunjukkan statusnya: <span style="color:#6366f1">●</span> saat ini, <span style="color:#22c55e">●</span> selesai, <span style="color:#94a3b8">●</span> akan datang.',
      s1_tip:       'Tahap diurutkan otomatis berdasarkan tanggal. Tanggal yang sudah lewat muncul sebagai "selesai".',
      s2_title:     '👆 Klik Lingkaran Tahap',
      s2_desc:      'Sentuh lingkaran tahap mana pun untuk membuka <strong>kartu detail</strong> di bawah. Mari simulasikan klik tahap <em>Online Assessment</em> sekarang.',
      s2_tip:       'Tahap yang aktif ditandai dengan cincin bercahaya.',
      s3_title:     '📄 Kartu Detail Tahap',
      s3_desc:      'Kartu ini menampilkan <strong>nama</strong> tahap, <strong>tanggal & waktu</strong>, dan <strong>catatan</strong>. Klik ikon ✎ untuk mengedit catatan dan memperbarui tanggal.',
      s3_tip:       'Catatan mendukung teks bebas — tulis tips wawancara, tautan, atau pengingat di sini.',
      s4_title:     '➕ Tambah Tahap Baru',
      s4_desc:      'Klik tombol <strong>+</strong> di kartu ringkasan untuk menambah tahap rekrutmen baru. Atur nomor langkah, nama, tanggal, dan waktu.',
      s4_tip:       'Kamu bisa mengurutkan ulang tahap dengan mengubah nomor langkah saat menambahkan.',
      s5_title:     '📊 Progress Bar',
      s5_desc:      '<strong>Progress bar</strong> menunjukkan berapa tahap yang sudah selesai dibanding total. Tahap dianggap "selesai" setelah tanggalnya lewat.',
      s5_tip:       'Pantau kemajuanmu — usahakan menyelesaikan setiap tahap tepat waktu!',
      s6_title:     '⚠️ Zona Bahaya',
      s6_desc:      'Gulir ke bawah untuk menemukan <strong>Zona Bahaya</strong>. Gunakan tombol hapus untuk menghapus lamaran ini beserta semua data tahapnya secara permanen.',
      s6_tip:       'Tindakan ini tidak dapat dibatalkan — dialog konfirmasi akan muncul terlebih dahulu.',
      done_title:   'Tutorial Selesai! 🎉',
      done_desc:    'Sekarang kamu tahu cara menggunakan halaman Detail Lamaran. Lacak setiap tahap rekrutmen, perbarui catatan, dan tetap pantau lamaranmu!',
      btn_done:     'Mulai Melacak!',
    },
  };

  function t(k) {
    const l = getLangNow();
    return (T[l] && T[l][k]) || T.en[k] || k;
  }

  /* ══════════════════════════════════════════════════════════
     STEPS CONFIG
     ══════════════════════════════════════════════════════════ */
  function getSteps() {
    return [
      { id: 'summary',   target: '.app-summary',    place: 'bottom', sim: null,          icon: '📋' },
      { id: 'timeline',  target: '.timeline',        place: 'top',    sim: null,          icon: '🔄' },
      { id: 'click',     target: '.timeline',        place: 'top',    sim: 'clickStage',  icon: '👆' },
      { id: 'stagebox',  target: '#stageDetailBox',  place: 'top',    sim: null,          icon: '📄' },
      { id: 'addbtn',    target: '.detail-actions .add-btn', place: 'bottom', sim: 'addHighlight', icon: '➕' },
      { id: 'progress',  target: '#progressRow',     place: 'bottom', sim: null,          icon: '📊' },
      { id: 'danger',    target: '.danger-zone',     place: 'top',    sim: 'scrollDanger',icon: '⚠️' },
    ];
  }

  /* ══════════════════════════════════════════════════════════
     CSS
     ══════════════════════════════════════════════════════════ */
  function injectCSS() {
    if (document.getElementById('_dt_css')) return;
    const s = document.createElement('style');
    s.id = '_dt_css';
    s.textContent = `
/* ── detailTutorial v1.0 ── */
#_dt_wrap { position:fixed;inset:0;z-index:88000;pointer-events:none; }
#_dt_wrap.active { pointer-events:all; }
._dt_shade { position:fixed;background:rgba(4,6,20,.8);transition:all .38s cubic-bezier(.4,0,.2,1);pointer-events:all;display:none; }

/* spotlight */
#_dt_ring {
  position:fixed;z-index:88010;pointer-events:none;border-radius:12px;
  border:2px solid rgba(99,120,255,.8);
  box-shadow:0 0 0 5px rgba(99,120,255,.1),0 0 40px rgba(99,120,255,.2);
  transition:all .38s cubic-bezier(.4,0,.2,1);opacity:0;
}
#_dt_ring.show { opacity:1; }
#_dt_ring.pulse { animation:_dt_pulse 2s ease infinite; }
@keyframes _dt_pulse {
  0%,100%{box-shadow:0 0 0 5px rgba(99,120,255,.1),0 0 0 0 rgba(99,120,255,.4);}
  50%{box-shadow:0 0 0 5px rgba(99,120,255,.1),0 0 0 16px rgba(99,120,255,0);}
}

/* tooltip */
#_dt_tip {
  position:fixed;z-index:88020;pointer-events:all;
  width:min(390px,calc(100vw - 1.25rem));
  background:var(--surface,#fff);border:1px solid var(--border,#e5e7eb);
  border-radius:18px;
  box-shadow:0 8px 32px rgba(0,0,0,.15),0 40px 80px rgba(0,0,0,.1);
  overflow:hidden;display:none;
  opacity:0;transform:translateY(10px) scale(.96);
  transition:opacity .26s ease,transform .26s cubic-bezier(.34,1.3,.64,1);
}
#_dt_tip.show { display:block;opacity:1;transform:translateY(0) scale(1); }

._dt_hdr {
  background:linear-gradient(135deg,#1b2575,#3348d4,#1a2060);
  padding:.9rem 1.1rem .8rem;position:relative;overflow:hidden;
}
._dt_hdr::before { content:'';position:absolute;inset:0;background:radial-gradient(circle at 75% 35%,rgba(120,100,255,.35) 0%,transparent 55%); }
._dt_hdr::after {
  content:'';position:absolute;top:0;left:-120%;width:60%;height:100%;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent);
  animation:_dt_shine 4s ease infinite;
}
@keyframes _dt_shine { 0%{left:-120%} 40%,100%{left:150%} }
._dt_hdr_row { display:flex;align-items:center;justify-content:space-between;margin-bottom:.6rem;position:relative;z-index:1; }
._dt_badge { font-size:.63rem;font-weight:700;letter-spacing:.6px;color:rgba(255,255,255,.6);text-transform:uppercase;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);border-radius:2rem;padding:.16rem .55rem; }
._dt_skip { background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);border-radius:8px;color:rgba(255,255,255,.6);font-size:.65rem;font-weight:600;font-family:"Poppins",sans-serif;padding:.16rem .55rem;cursor:pointer;transition:.15s; }
._dt_skip:hover { background:rgba(255,255,255,.2);color:#fff; }
._dt_hdr_main { display:flex;align-items:center;gap:.7rem;position:relative;z-index:1; }
._dt_icon { width:42px;height:42px;flex-shrink:0;background:rgba(255,255,255,.15);border:1.5px solid rgba(255,255,255,.2);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.35rem;animation:_dt_float 3.5s ease-in-out infinite; }
@keyframes _dt_float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
._dt_title { font-size:.92rem;font-weight:800;color:#fff;letter-spacing:-.01em;line-height:1.3; }

._dt_prog_wrap { height:3px;background:rgba(255,255,255,.12);overflow:hidden; }
._dt_prog_bar { height:100%;border-radius:0 2px 2px 0;background:linear-gradient(90deg,#a5b4fc,#6366f1,#a5b4fc);background-size:200% 100%;animation:_dt_ps 2.5s linear infinite;transition:width .4s cubic-bezier(.4,0,.2,1); }
@keyframes _dt_ps { 0%{background-position:200% 0}100%{background-position:-200% 0} }

._dt_body { padding:.85rem 1.1rem 0; }
._dt_desc { font-size:.838rem;color:var(--text,#374151);line-height:1.68;margin-bottom:.6rem;animation:_dt_fi .28s ease .06s both; }
._dt_desc strong { color:#5065f0;font-weight:700; }
[data-theme=dark] ._dt_desc strong { color:#818cf8; }
._dt_tipbox { background:rgba(99,120,255,.06);border:1px solid rgba(99,120,255,.13);border-radius:10px;padding:.5rem .85rem .5rem 2.1rem;font-size:.76rem;color:var(--muted,#6b7280);line-height:1.52;margin-bottom:.8rem;position:relative;animation:_dt_fi .28s ease .12s both; }
._dt_tipbox::before { content:'💡';position:absolute;left:.6rem;top:.48rem;font-size:.85rem; }
[data-theme=dark] ._dt_tipbox { background:rgba(99,120,255,.1);border-color:rgba(99,120,255,.2);color:#94a3b8; }
@keyframes _dt_fi { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:translateY(0)} }

._dt_foot { padding:.6rem 1.1rem .85rem;display:flex;align-items:center;justify-content:space-between;gap:.5rem; }
._dt_dots { display:flex;gap:5px;align-items:center; }
._dt_dot { width:6px;height:6px;border-radius:50%;background:var(--border,#e5e7eb);transition:all .3s cubic-bezier(.34,1.3,.64,1); }
._dt_dot.done { background:rgba(99,120,255,.35); }
._dt_dot.cur  { width:20px;border-radius:3px;background:#6366f1;box-shadow:0 2px 8px rgba(99,120,255,.38); }
._dt_nav { display:flex;gap:.4rem; }
._dt_btn { font-family:"Poppins",sans-serif;font-size:.765rem;font-weight:700;padding:.43rem .9rem;border-radius:9px;border:none;cursor:pointer;transition:transform .18s cubic-bezier(.34,1.3,.64,1),box-shadow .18s;position:relative;overflow:hidden; }
._dt_btn::after { content:'';position:absolute;inset:0;background:radial-gradient(circle at center,rgba(255,255,255,.3) 0%,transparent 70%);opacity:0;transform:scale(0);transition:.25s; }
._dt_btn:active::after { opacity:1;transform:scale(2.5);transition:0s; }
._dt_prev { background:var(--card-bg,#f3f4f6);border:1.5px solid var(--border,#e5e7eb);color:var(--muted,#6b7280); }
._dt_prev:hover { transform:translateY(-2px) translateX(-1px);box-shadow:0 4px 10px rgba(0,0,0,.08); }
[data-theme=dark] ._dt_prev { background:#252a40;border-color:#3a4160;color:#94a3b8; }
._dt_next { background:linear-gradient(135deg,#3045c8,#6366f1);color:#fff;box-shadow:0 4px 14px rgba(99,120,255,.35); }
._dt_next:hover { transform:translateY(-2px);box-shadow:0 8px 22px rgba(99,120,255,.48); }
._dt_fin  { background:linear-gradient(135deg,#059669,#10b981);color:#fff;box-shadow:0 4px 14px rgba(16,185,129,.35); }
._dt_fin:hover  { transform:translateY(-2px);box-shadow:0 8px 22px rgba(16,185,129,.48); }

/* arrow */
#_dt_arr { position:fixed;z-index:88015;pointer-events:none;width:0;height:0;opacity:0;transition:opacity .2s ease; }
#_dt_arr.show { opacity:1; }
#_dt_arr.a-b { border-left:10px solid transparent;border-right:10px solid transparent;border-top:10px solid var(--surface,#fff); }
#_dt_arr.a-t { border-left:10px solid transparent;border-right:10px solid transparent;border-bottom:10px solid var(--surface,#fff); }
#_dt_arr.a-r { border-top:10px solid transparent;border-bottom:10px solid transparent;border-left:10px solid var(--surface,#fff); }
#_dt_arr.a-l { border-top:10px solid transparent;border-bottom:10px solid transparent;border-right:10px solid var(--surface,#fff); }

/* ── SIMULATION EFFECTS ── */

/* Stage click ripple animation */
@keyframes _dt_ripple {
  0%   { transform:scale(0);opacity:.6; }
  100% { transform:scale(3.5);opacity:0; }
}
._dt_sim_ripple {
  position:absolute;inset:0;border-radius:50%;pointer-events:none;
  background:rgba(99,120,255,.5);
  animation:_dt_ripple .7s ease forwards;
  z-index:2;
}

/* Simulated click cursor */
@keyframes _dt_cursor_click {
  0%,100%{ transform:scale(1); }
  40%    { transform:scale(0.85); }
}
#_dt_cursor {
  position:fixed;z-index:88050;pointer-events:none;
  width:28px;height:28px;
  background:rgba(255,255,255,.95);border:2px solid rgba(99,120,255,.8);
  border-radius:50%;box-shadow:0 4px 14px rgba(0,0,0,.25);
  display:none;
  transition:left .5s cubic-bezier(.4,0,.2,1), top .5s cubic-bezier(.4,0,.2,1);
}
#_dt_cursor::after { content:'👆';position:absolute;bottom:-6px;right:-6px;font-size:.85rem; }
#_dt_cursor.active { display:block; }
#_dt_cursor.clicking { animation:_dt_cursor_click .4s ease; }

/* Button pulse sim */
@keyframes _dt_btn_pulse {
  0%,100% { box-shadow:0 0 0 0 rgba(99,120,255,.6); }
  50%     { box-shadow:0 0 0 10px rgba(99,120,255,0); }
}
._dt_highlighted { animation:_dt_btn_pulse 1.2s ease infinite !important; }

/* Stage sim highlight */
@keyframes _dt_stage_sim {
  0%   { box-shadow: 0 0 0 0 rgba(99,120,255,.7), 0 0 0 4px rgba(99,120,255,.15); }
  50%  { box-shadow: 0 0 0 12px rgba(99,120,255,0), 0 0 0 4px rgba(99,120,255,.15); }
  100% { box-shadow: 0 0 0 0 rgba(99,120,255,0), 0 0 0 4px rgba(99,120,255,.15); }
}
._dt_stage_hl { animation:_dt_stage_sim 1s ease 2 !important; }

/* Done overlay */
#_dt_done {
  position:fixed;inset:0;z-index:88060;display:none;align-items:center;justify-content:center;padding:1rem;
  background:rgba(4,6,20,.88);backdrop-filter:blur(10px);
}
#_dt_done.open { display:flex; }
._dt_done_card {
  background:var(--surface,#fff);border-radius:22px;max-width:420px;width:100%;overflow:hidden;
  box-shadow:0 0 0 1px rgba(16,185,129,.12),0 24px 64px rgba(0,0,0,.28);
  animation:_dt_popIn .42s cubic-bezier(.34,1.15,.64,1) both;
  position:relative;
}
@keyframes _dt_popIn { from{opacity:0;transform:scale(.88) translateY(16px)} to{opacity:1;transform:scale(1) translateY(0)} }
._dt_done_card::before { content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#10b981,#34d399,#6366f1,#10b981);background-size:200% 100%;animation:_dt_ps 2.5s linear infinite; }
._dt_done_hero { background:linear-gradient(135deg,#064e3b,#059669 45%,#065f46 80%,#022c22);padding:2rem 1.875rem 1.625rem;text-align:center;position:relative;overflow:hidden; }
._dt_done_hero::before { content:'';position:absolute;inset:0;background:radial-gradient(circle at 50% 0%,rgba(52,211,153,.45) 0%,transparent 55%); }
._dt_done_emoji { font-size:3.5rem;display:block;margin-bottom:.75rem;position:relative;z-index:1;animation:_dt_bIn .55s cubic-bezier(.34,1.2,.64,1) .1s both; }
@keyframes _dt_bIn { 0%{transform:scale(.3) rotate(-15deg);opacity:0} 60%{transform:scale(1.1) rotate(4deg);opacity:1} 80%{transform:scale(.95)} 100%{transform:scale(1) rotate(0)} }
._dt_done_title { font-size:1.2rem;font-weight:800;color:#fff;position:relative;z-index:1;letter-spacing:-.02em; }
._dt_done_body  { padding:1.5rem 1.75rem 1.75rem;text-align:center; }
._dt_done_desc  { font-size:.845rem;color:var(--text,#374151);line-height:1.68;margin-bottom:1.25rem; }
._dt_done_cta   { width:100%;padding:.85rem;border:none;border-radius:11px;font-family:"Poppins",sans-serif;font-size:.9rem;font-weight:700;cursor:pointer;background:linear-gradient(135deg,#059669,#10b981);color:#fff;box-shadow:0 4px 16px rgba(16,185,129,.38);transition:transform .2s cubic-bezier(.34,1.2,.64,1),box-shadow .2s; }
._dt_done_cta:hover { transform:translateY(-2px);box-shadow:0 8px 24px rgba(16,185,129,.5); }

/* confetti */
._dt_cf { position:fixed;z-index:88090;pointer-events:none;animation:_dt_cfF linear forwards,_dt_cfS ease-in-out infinite; }
@keyframes _dt_cfF { from{transform:translateY(-10px) rotate(0)} to{transform:translateY(105vh) rotate(540deg);opacity:0} }
@keyframes _dt_cfS { 0%,100%{margin-left:0} 40%{margin-left:18px} 70%{margin-left:-18px} }

/* ── Mock content overlay ── */
#_dt_mock_overlay {
  position:fixed;inset:0;z-index:87990;display:none;pointer-events:none;
}
._dt_mock_badge {
  position:fixed;top:0.6rem;left:50%;transform:translateX(-50%);
  background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;
  border-radius:2rem;padding:.3rem .9rem;font-size:.72rem;font-weight:700;
  box-shadow:0 4px 16px rgba(99,120,255,.4);z-index:88001;
  animation:_dt_fi .3s ease both;pointer-events:none;white-space:nowrap;
  display:none;
}

@media(max-width:480px){
  #_dt_tip{width:calc(100vw - 1.1rem);border-radius:15px;}
}
    `;
    document.head.appendChild(s);
  }

  /* ══════════════════════════════════════════════════════════
     BUILD DOM
     ══════════════════════════════════════════════════════════ */
  function buildDOM() {
    if (document.getElementById('_dt_wrap')) return;
    document.body.insertAdjacentHTML('beforeend', `
<div id="_dt_wrap">
  <div class="_dt_shade" id="_dt_sT"></div><div class="_dt_shade" id="_dt_sB"></div>
  <div class="_dt_shade" id="_dt_sL"></div><div class="_dt_shade" id="_dt_sR"></div>
  <div id="_dt_ring"></div><div id="_dt_arr"></div><div id="_dt_tip"></div>
</div>
<div id="_dt_cursor"></div>
<div class="_dt_mock_badge" id="_dt_mock_badge">🎓 Tutorial Mode — Simulated Data</div>
<div id="_dt_done">
  <div class="_dt_done_card">
    <div class="_dt_done_hero"><span class="_dt_done_emoji">🎉</span><div class="_dt_done_title" id="_dt_done_t"></div></div>
    <div class="_dt_done_body"><div class="_dt_done_desc" id="_dt_done_d"></div><button class="_dt_done_cta" id="_dt_done_btn"></button></div>
  </div>
</div>
    `);
  }

  /* ══════════════════════════════════════════════════════════
     MOCK RENDERING — inject simulated data into the real page
     ══════════════════════════════════════════════════════════ */
  let _origHTML = {}; // store originals to restore after

  function savePage() {
    const ids = ['companyName','appSubtitle','appStatusBadge','progressRow','progressBar','progressPct'];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) _origHTML[id] = { html: el.innerHTML, style: el.style.cssText };
    });
    const timeline = document.querySelector('.timeline');
    if (timeline) _origHTML['timeline'] = timeline.innerHTML;
    const stagebox = document.getElementById('stageDetailBox');
    if (stagebox) _origHTML['stagebox'] = { html: stagebox.innerHTML, display: stagebox.style.display };
    const hintbox  = document.getElementById('stageHintBox');
    if (hintbox)  _origHTML['hintbox']  = { display: hintbox.style.display };
  }

  function injectMockData() {
    const cn = document.getElementById('companyName');
    const cs = document.getElementById('appSubtitle');
    const badge = document.getElementById('appStatusBadge');
    const pRow = document.getElementById('progressRow');
    const pBar = document.getElementById('progressBar');
    const pPct = document.getElementById('progressPct');

    if (cn) cn.textContent = MOCK.company;
    if (cs) cs.textContent = MOCK.program + ' — ' + MOCK.jobTitle;
    if (badge) {
      badge.className = 'app-status-badge badge-active';
      badge.textContent = '🟢 Active';
    }

    // Progress
    const now = new Date();
    const done = MOCK.stages.filter(s => s.date && new Date(s.date) < now).length;
    const total = MOCK.stages.length;
    const pct = Math.round((done / total) * 100);
    if (pRow) pRow.style.display = 'flex';
    if (pBar) setTimeout(() => { pBar.style.width = pct + '%'; }, 300);
    if (pPct) pPct.textContent = done + '/' + total + ' completed';

    // Timeline
    renderMockTimeline();

    // Show mock badge
    const mb = document.getElementById('_dt_mock_badge');
    if (mb) mb.style.display = 'block';
  }

  function renderMockTimeline(activeIdx) {
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;

    const now = new Date();
    const statuses = MOCK.stages.map(s => {
      if (!s.date) return 'upcoming';
      const d = new Date(s.date);
      return d < now ? 'done' : 'current';
    });
    // Only first non-done is current
    let foundCurrent = false;
    for (let i = 0; i < statuses.length; i++) {
      if (statuses[i] === 'current' && !foundCurrent) { foundCurrent = true; }
      else if (statuses[i] === 'current') statuses[i] = 'upcoming';
    }

    const total = MOCK.stages.length;
    timeline.innerHTML = '';
    const row = document.createElement('div');
    row.className = 'timeline-columns';
    row.setAttribute('data-count', total);
    timeline.appendChild(row);

    MOCK.stages.forEach((s, idx) => {
      const status = statuses[idx];
      const isActive = idx === activeIdx;
      const isLast = idx === total - 1;
      const col = document.createElement('div');
      col.className = `step-cell ${status}-cell${isLast ? ' last-cell' : ''}`;
      col.dataset.index = idx;

      const label = document.createElement('div');
      label.className = 'step-label';
      const nameEl = document.createElement('div');
      nameEl.className = 'step-name';
      nameEl.textContent = s.name;
      label.appendChild(nameEl);
      if (s.date) {
        const dateEl = document.createElement('div');
        dateEl.className = 'step-date';
        const d = new Date(s.date);
        dateEl.textContent = d.toLocaleDateString('en-US', { day:'numeric', month:'short' });
        label.appendChild(dateEl);
      }

      const step = document.createElement('div');
      step.className = `step ${status}${isActive ? ' active' : ''}`;
      if (isActive) step.style.cssText = 'outline:3px solid rgba(99,120,255,.7);outline-offset:3px;';
      const num = document.createElement('span');
      num.className = 'step-number';
      num.textContent = idx + 1;
      step.appendChild(num);

      // Click handler for simulation
      step.addEventListener('click', () => showMockStageDetail(idx));

      col.appendChild(label);
      col.appendChild(step);
      row.appendChild(col);
    });

    const hintbox = document.getElementById('stageHintBox');
    if (hintbox) hintbox.style.display = 'none';
  }

  function showMockStageDetail(idx) {
    const s = MOCK.stages[idx];
    const stagebox = document.getElementById('stageDetailBox');
    const hintbox  = document.getElementById('stageHintBox');
    if (!stagebox) return;
    if (hintbox) hintbox.style.display = 'none';

    const titleEl    = document.getElementById('stageBoxTitle');
    const deadlineEl = document.getElementById('detailDeadline');
    const notesEl    = document.getElementById('stageNotes');
    const editIcon   = document.getElementById('noteEdit');

    const locale = getLangNow() === 'id' ? 'id-ID' : 'en-US';
    const dateStr = s.date
      ? new Date(s.date).toLocaleDateString(locale, { weekday:'long', day:'numeric', month:'long', year:'numeric' }) + (s.time ? ', ' + s.time : '')
      : '—';

    if (titleEl)    titleEl.textContent    = s.name;
    if (deadlineEl) deadlineEl.textContent = dateStr;
    if (notesEl)    notesEl.innerHTML = s.notes
      ? `<p style="white-space:pre-wrap;margin:0">${s.notes}</p>`
      : `<p class="empty-note">No notes yet. Click ✎ to add.</p>`;
    if (editIcon) { editIcon.textContent = '✎'; editIcon.style.color = ''; editIcon.onclick = null; }

    stagebox.style.display = 'block';
    // Animate in
    stagebox.style.animation = 'none';
    stagebox.offsetHeight; // reflow
    stagebox.style.animation = '_dt_fi .3s ease both';

    // Highlight active step in timeline
    renderMockTimeline(idx);
  }

  function restorePage() {
    const ids = ['companyName','appSubtitle','appStatusBadge','progressRow','progressBar','progressPct'];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el && _origHTML[id]) {
        el.innerHTML = _origHTML[id].html;
        el.style.cssText = _origHTML[id].style || '';
      }
    });
    const timeline = document.querySelector('.timeline');
    if (timeline && _origHTML['timeline'] !== undefined) timeline.innerHTML = _origHTML['timeline'];
    const stagebox = document.getElementById('stageDetailBox');
    if (stagebox && _origHTML['stagebox']) {
      stagebox.innerHTML = _origHTML['stagebox'].html;
      stagebox.style.display = _origHTML['stagebox'].display;
    }
    const hintbox = document.getElementById('stageHintBox');
    if (hintbox && _origHTML['hintbox']) hintbox.style.display = _origHTML['hintbox'].display;
    const mb = document.getElementById('_dt_mock_badge');
    if (mb) mb.style.display = 'none';
    _origHTML = {};
  }

  /* ══════════════════════════════════════════════════════════
     SPOTLIGHT
     ══════════════════════════════════════════════════════════ */
  const PAD = 14;

  function findEl(selector) {
    if (!selector) return null;
    for (const sel of selector.split(',').map(s => s.trim())) {
      const el = document.querySelector(sel);
      if (el && el.offsetParent !== null) return el;
    }
    return null;
  }

  function spotlight(el, pulse) {
    const ring = document.getElementById('_dt_ring');
    const [sT,sB,sL,sR] = ['_dt_sT','_dt_sB','_dt_sL','_dt_sR'].map(id => document.getElementById(id));
    document.getElementById('_dt_wrap').classList.add('active');

    if (!el) {
      ring.classList.remove('show','pulse');
      [sT,sB,sL,sR].forEach(s => { s.style.display = 'none'; });
      return;
    }

    el.scrollIntoView({ behavior: 'smooth', block: 'center' });

    setTimeout(() => {
      const r = el.getBoundingClientRect();
      const vw = window.innerWidth, vh = window.innerHeight;
      const t = Math.max(0, r.top - PAD), b = Math.min(vh, r.bottom + PAD);
      const l = Math.max(0, r.left - PAD), ri = Math.min(vw, r.right + PAD);
      const w = ri - l, h = b - t;

      sT.style.cssText = `position:fixed;top:0;left:0;right:0;height:${t}px;display:block;`;
      sB.style.cssText = `position:fixed;bottom:0;left:0;right:0;height:${vh-b}px;display:block;`;
      sL.style.cssText = `position:fixed;top:${t}px;left:0;width:${l}px;height:${h}px;display:block;`;
      sR.style.cssText = `position:fixed;top:${t}px;right:0;width:${vw-ri}px;height:${h}px;display:block;`;
      ring.style.cssText = `top:${t}px;left:${l}px;width:${w}px;height:${h}px;`;
      ring.classList.add('show');
      pulse ? ring.classList.add('pulse') : ring.classList.remove('pulse');
    }, 160);
  }

  /* ══════════════════════════════════════════════════════════
     TOOLTIP PLACEMENT
     ══════════════════════════════════════════════════════════ */
  function placeTip(el, place) {
    const tip = document.getElementById('_dt_tip');
    const arr = document.getElementById('_dt_arr');
    const vw = window.innerWidth, vh = window.innerHeight;
    const TW = Math.min(390, vw - 20), GAP = 16;

    tip.style.width = TW + 'px';
    tip.style.visibility = 'hidden'; tip.style.display = 'block'; tip.classList.remove('show');
    const TH = tip.offsetHeight || 260;
    tip.style.visibility = ''; tip.style.display = 'none';

    if (!el) {
      tip.style.left = ((vw - TW) / 2) + 'px';
      tip.style.top  = ((vh - TH) / 2) + 'px';
      arr.className = ''; showTip(); return;
    }

    const r = el.getBoundingClientRect();
    const t = Math.max(0, r.top - PAD), b = Math.min(vh, r.bottom + PAD);
    const l = Math.max(0, r.left - PAD), ri = Math.min(vw, r.right + PAD);
    const cx = (l + ri) / 2;

    let pl = place;
    if (pl === 'bottom' && b + GAP + TH > vh) pl = 'top';
    if (pl === 'top'    && t - GAP - TH < 0)  pl = 'bottom';

    let tx, ty, ac;
    if (pl === 'bottom') { ty = b + GAP; tx = Math.min(Math.max(8, cx - TW/2), vw - TW - 8); ac = 'a-t'; }
    else if (pl === 'top') { ty = t - GAP - TH; tx = Math.min(Math.max(8, cx - TW/2), vw - TW - 8); ac = 'a-b'; }
    else if (pl === 'right') { tx = ri + GAP; ty = Math.min(Math.max(8, (t+b)/2 - TH/2), vh - TH - 8); ac = 'a-l'; }
    else { tx = l - GAP - TW; ty = Math.min(Math.max(8, (t+b)/2 - TH/2), vh - TH - 8); ac = 'a-r'; }

    ty = Math.max(8, Math.min(ty, vh - TH - 8));
    tx = Math.max(8, Math.min(tx, vw - TW - 8));
    tip.style.left = tx + 'px'; tip.style.top = ty + 'px';

    arr.style.left = Math.min(Math.max(cx - 10, tx + 14), tx + TW - 34) + 'px';
    arr.style.top  = (pl === 'bottom' ? b + GAP - 10 : pl === 'top' ? t - GAP : 0) + 'px';
    arr.className  = (pl === 'center' ? '' : 'show ' + ac);
    showTip();
  }

  function showTip() {
    const tip = document.getElementById('_dt_tip');
    tip.style.display = 'block';
    tip.classList.remove('show');
    requestAnimationFrame(() => requestAnimationFrame(() => tip.classList.add('show')));
  }

  /* ══════════════════════════════════════════════════════════
     CURSOR SIMULATION
     ══════════════════════════════════════════════════════════ */
  function moveCursor(targetEl, callback) {
    const cursor = document.getElementById('_dt_cursor');
    if (!cursor || !targetEl) { if (callback) callback(); return; }

    const r = targetEl.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top  + r.height / 2;

    cursor.classList.add('active');
    // Start from center-bottom of screen
    const startX = window.innerWidth / 2;
    const startY = window.innerHeight * 0.85;
    cursor.style.left = startX + 'px';
    cursor.style.top  = startY + 'px';
    cursor.style.transition = 'none';
    cursor.offsetHeight; // reflow

    setTimeout(() => {
      cursor.style.transition = 'left .55s cubic-bezier(.4,0,.2,1), top .55s cubic-bezier(.4,0,.2,1)';
      cursor.style.left = (cx - 14) + 'px';
      cursor.style.top  = (cy - 14) + 'px';

      setTimeout(() => {
        cursor.classList.add('clicking');
        // Add ripple to the target step
        const ripple = document.createElement('div');
        ripple.className = '_dt_sim_ripple';
        targetEl.style.position = 'relative';
        targetEl.appendChild(ripple);
        setTimeout(() => ripple.remove(), 700);

        setTimeout(() => {
          cursor.classList.remove('clicking');
          cursor.classList.remove('active');
          if (callback) callback();
        }, 500);
      }, 600);
    }, 50);
  }

  /* ══════════════════════════════════════════════════════════
     SIMULATIONS
     ══════════════════════════════════════════════════════════ */
  function runSim(simName, onDone) {
    if (!simName) { if (onDone) onDone(); return; }

    if (simName === 'clickStage') {
      // Find the 2nd stage circle (Online Assessment)
      const steps = document.querySelectorAll('.timeline .step');
      const target = steps[1] || steps[0];
      if (!target) { if (onDone) onDone(); return; }

      setTimeout(() => {
        moveCursor(target, () => {
          showMockStageDetail(1);
          if (onDone) setTimeout(onDone, 600);
        });
      }, 400);
      return;
    }

    if (simName === 'addHighlight') {
      const btn = findEl('.detail-actions .add-btn');
      if (btn) {
        btn.classList.add('_dt_highlighted');
        setTimeout(() => { btn.classList.remove('_dt_highlighted'); if (onDone) onDone(); }, 2000);
      } else { if (onDone) onDone(); }
      return;
    }

    if (simName === 'scrollDanger') {
      const dz = document.querySelector('.danger-zone');
      if (dz) dz.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => { if (onDone) onDone(); }, 600);
      return;
    }

    if (onDone) onDone();
  }

  /* ══════════════════════════════════════════════════════════
     RENDER STEP
     ══════════════════════════════════════════════════════════ */
  let _steps = [], _currentIdx = 0, _simDone = false;

  function renderStep(idx) {
    _currentIdx = idx;
    _simDone = false;
    const step  = _steps[idx];
    const total = _steps.length;
    const isLast = idx === total - 1;
    const key    = step.id;

    const el = findEl(step.target);
    spotlight(el, step.id === 'addbtn');

    const pct   = Math.round(((idx + 1) / total) * 100);
    const label = getLangNow() === 'id'
      ? `Langkah ${idx+1} ${t('step_of')} ${total}`
      : `Step ${idx+1} ${t('step_of')} ${total}`;
    const dots  = _steps.map((_,i) => `<span class="_dt_dot${i < idx ? ' done' : i === idx ? ' cur' : ''}"></span>`).join('');
    const titleKey = `s${idx}_title`, descKey = `s${idx}_desc`, tipKey = `s${idx}_tip`;

    const tip = document.getElementById('_dt_tip');
    tip.classList.remove('show'); tip.style.display = 'none';

    tip.innerHTML = `
      <div class="_dt_hdr">
        <div class="_dt_hdr_row">
          <span class="_dt_badge">${label}</span>
          <button class="_dt_skip" id="_dt_skip">${t('skip')}</button>
        </div>
        <div class="_dt_hdr_main">
          <div class="_dt_icon">${step.icon}</div>
          <div class="_dt_title">${t(titleKey)}</div>
        </div>
      </div>
      <div class="_dt_prog_wrap"><div class="_dt_prog_bar" style="width:${pct}%"></div></div>
      <div class="_dt_body">
        <div class="_dt_desc">${t(descKey)}</div>
        <div class="_dt_tipbox">${t(tipKey)}</div>
      </div>
      <div class="_dt_foot">
        <div class="_dt_dots">${dots}</div>
        <div class="_dt_nav">
          ${idx > 0 ? `<button class="_dt_btn _dt_prev" id="_dt_prev">${t('prev')}</button>` : ''}
          <button class="_dt_btn ${isLast ? '_dt_fin' : '_dt_next'}" id="_dt_next">
            ${isLast ? t('finish') : t('next')}
          </button>
        </div>
      </div>
    `;

    requestAnimationFrame(() => placeTip(el, step.place));

    document.getElementById('_dt_next').onclick = () => {
      if (isLast) { showDone(); return; }
      // If this step has a sim, run it before advancing
      if (step.sim && !_simDone) {
        _simDone = true;
        const btn = document.getElementById('_dt_next');
        if (btn) { btn.disabled = true; btn.style.opacity = '.6'; }
        runSim(step.sim, () => {
          if (btn) { btn.disabled = false; btn.style.opacity = ''; }
          renderStep(idx + 1);
        });
      } else {
        renderStep(idx + 1);
      }
    };

    document.getElementById('_dt_prev')?.addEventListener('click', () => renderStep(idx - 1));
    document.getElementById('_dt_skip').onclick = closeTutorial;
  }

  /* ══════════════════════════════════════════════════════════
     DONE SCREEN
     ══════════════════════════════════════════════════════════ */
  function confetti() {
    const cs = ['#6366f1','#a5b4fc','#10b981','#34d399','#f59e0b','#ec4899','#fff'];
    for (let i = 0; i < 70; i++) {
      const p = document.createElement('div');
      p.className = '_dt_cf';
      const sz = Math.random()*8+5, d = Math.random()*2.4+1.6, sw = Math.random()*1.6+0.8;
      p.style.cssText = `left:${Math.random()*100}vw;top:-12px;width:${sz}px;height:${sz*(Math.random()>.5?1:1.8)}px;background:${cs[~~(Math.random()*cs.length)]};border-radius:${Math.random()>.5?'50%':'2px'};animation-duration:${d}s,${sw}s;animation-delay:${Math.random()*.7}s,0s;`;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), (d + 1) * 1000);
    }
  }

  function showDone() {
    const tip = document.getElementById('_dt_tip');
    const ring = document.getElementById('_dt_ring');
    const arr  = document.getElementById('_dt_arr');

    tip.classList.remove('show'); tip.style.display = 'none';
    ring.classList.remove('show','pulse'); arr.className = '';
    document.getElementById('_dt_wrap').classList.remove('active');
    ['_dt_sT','_dt_sB','_dt_sL','_dt_sR'].forEach(id => { document.getElementById(id).style.display = 'none'; });

    document.getElementById('_dt_done_t').textContent = t('done_title');
    document.getElementById('_dt_done_d').textContent = t('done_desc');
    document.getElementById('_dt_done_btn').textContent = t('btn_done');
    document.getElementById('_dt_done').classList.add('open');
    confetti();
    document.getElementById('_dt_done_btn').onclick = closeTutorial;
  }

  /* ══════════════════════════════════════════════════════════
     CLOSE
     ══════════════════════════════════════════════════════════ */
  function closeTutorial() {
    restorePage();
    document.getElementById('_dt_wrap')?.classList.remove('active');
    document.getElementById('_dt_done')?.classList.remove('open');
    const tip = document.getElementById('_dt_tip');
    if (tip) { tip.classList.remove('show'); tip.style.display = 'none'; }
    document.getElementById('_dt_ring')?.classList.remove('show','pulse');
    document.getElementById('_dt_arr')?.classList.remove('show');
    ['_dt_sT','_dt_sB','_dt_sL','_dt_sR'].forEach(id => { const e = document.getElementById(id); if(e) e.style.display = 'none'; });
    document.getElementById('_dt_cursor')?.classList.remove('active');
    setTimeout(() => document.getElementById('_dt_css')?.remove(), 500);
  }

  /* ══════════════════════════════════════════════════════════
     ENTRY
     ══════════════════════════════════════════════════════════ */
  function startDetailTutorial() {
    injectCSS();
    buildDOM();
    savePage();
    injectMockData();

    _steps = getSteps();
    _currentIdx = 0;

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      renderStep(0);

      let rt;
      window.addEventListener('resize', () => {
        clearTimeout(rt);
        rt = setTimeout(() => {
          const step = _steps[_currentIdx];
          spotlight(findEl(step.target), step.id === 'addbtn');
          placeTip(findEl(step.target), step.place);
        }, 200);
      });
    }, 400);
  }

  window.startDetailTutorial = startDetailTutorial;

  // Auto-trigger if URL has ?tutorial=detail
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (new URLSearchParams(window.location.search).get('tutorial') === 'detail') {
        setTimeout(startDetailTutorial, 1000);
      }
    });
  } else {
    if (new URLSearchParams(window.location.search).get('tutorial') === 'detail') {
      setTimeout(startDetailTutorial, 1000);
    }
  }
})();

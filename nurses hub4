import React, { useState, useEffect } from "react";

// ─── IN-MEMORY STORE ────────────────────────────────────────────────
const _store = {};
const _listeners = {};
const ls = (k, d) => { const v = _store[k]; return v !== undefined ? v : d; };
const lsSet = (k, v) => {
  _store[k] = v;
  (_listeners[k] || []).forEach(fn => fn(v));
};
const useLs = (key, def) => {
  const [v, setV] = React.useState(() => ls(key, def));
  React.useEffect(() => {
    if (!_listeners[key]) _listeners[key] = [];
    _listeners[key].push(setV);
    return () => { _listeners[key] = _listeners[key].filter(f => f !== setV); };
  }, [key]);
  return [v, (val) => lsSet(key, val)];
};

// ─── DEFAULT DATA ───────────────────────────────────────────────────
const DEFAULT_CLASSES = [
  { id:"nd1", label:"ND ONE", desc:"National Diploma Year One", courses:["Anatomy & Physiology","Community Health","Pharmacology","Nursing Fundamentals"], color:"#3E8E95" },
  { id:"nd2", label:"ND TWO", desc:"National Diploma Year Two", courses:["Medical-Surgical Nursing","Maternal Health","Paediatrics","Mental Health"], color:"#3E8E95" },
  { id:"hnd1", label:"HND ONE", desc:"Higher National Diploma Year One", courses:["Advanced Pharmacology","Research Methods","Epidemiology","Clinical Practicum"], color:"#5aada0" },
  { id:"hnd2", label:"HND TWO", desc:"Higher National Diploma Year Two", courses:["Health Policy","Nursing Leadership","Evidence-Based Practice","Thesis"], color:"#5aada0" },
  { id:"cn1", label:"CN YEAR 1", desc:"Community Nursing Year One", courses:["Community Assessment","Health Promotion","Family Nursing","Biostatistics","Environmental Health"], color:"#facc15" },
  { id:"cn2", label:"CN YEAR 2", desc:"Community Nursing Year Two", courses:["Occupational Health","School Health","Geriatric Care","Disaster Nursing","Practicum"], color:"#facc15" },
  { id:"bnsc1", label:"BNSc 1", desc:"Bachelor of Nursing Science Year One", courses:["Human Anatomy","Physiology","Biochemistry","Sociology","Nursing Theory"], color:"#a78bfa" },
  { id:"bnsc2", label:"BNSc 2", desc:"Bachelor of Nursing Science Year Two", courses:["Pathophysiology","Pharmacology","Med-Surg Nursing","Nutrition","Psychology"], color:"#a78bfa" },
  { id:"bnsc3", label:"BNSc 3", desc:"Bachelor of Nursing Science Year Three", courses:["Maternal-Child Nursing","Psychiatric Nursing","Critical Care","Research I","Practicum"], color:"#f472b6" },
  { id:"bnsc4", label:"BNSc 4", desc:"Bachelor of Nursing Science Year Four", courses:["Advanced Practice","Health Systems","Leadership","Research II","Elective"], color:"#f472b6" },
  { id:"bnscf", label:"BNSc FINAL", desc:"Bachelor of Nursing Science Final Year", courses:["Capstone Project","Clinical Leadership","Health Policy","Advanced Practicum","Dissertation"], color:"#fb923c" },
];
const DEFAULT_DRUGS = [
  { id:1, name:"Paracetamol", class:"Analgesic/Antipyretic", dose:"500-1000mg every 4-6h", max:"4g/day", uses:"Pain, fever", contraindications:"Liver disease", side_effects:"Rare at therapeutic doses; overdose causes hepatotoxicity" },
  { id:2, name:"Amoxicillin", class:"Penicillin Antibiotic", dose:"250-500mg every 8h", max:"3g/day", uses:"Bacterial infections", contraindications:"Penicillin allergy", side_effects:"Rash, diarrhea, nausea" },
  { id:3, name:"Metronidazole", class:"Antiprotozoal/Antibiotic", dose:"400-500mg every 8h", max:"4g/day", uses:"Anaerobic infections, H.pylori", contraindications:"1st trimester pregnancy", side_effects:"Metallic taste, nausea, disulfiram-like reaction with alcohol" },
  { id:4, name:"Ibuprofen", class:"NSAID", dose:"400-600mg every 6-8h", max:"2400mg/day", uses:"Pain, inflammation, fever", contraindications:"Peptic ulcer, renal impairment", side_effects:"GI irritation, renal impairment, CVS risk" },
  { id:5, name:"Omeprazole", class:"Proton Pump Inhibitor", dose:"20-40mg once daily", max:"80mg/day", uses:"GERD, peptic ulcer", contraindications:"Hypersensitivity", side_effects:"Headache, diarrhea, hypomagnesemia" },
];
const DEFAULT_LABS = [
  { id:1, test:"Haemoglobin (Hb)", male:"13.5–17.5 g/dL", female:"12.0–15.5 g/dL", notes:"Low = anaemia; High = polycythaemia" },
  { id:2, test:"WBC Count", male:"4.5–11.0 ×10³/μL", female:"4.5–11.0 ×10³/μL", notes:"High = infection/inflammation; Low = immunosuppression" },
  { id:3, test:"Platelets", male:"150–400 ×10³/μL", female:"150–400 ×10³/μL", notes:"Low = bleeding risk; High = thrombosis risk" },
  { id:4, test:"Random Blood Sugar", male:"<11.1 mmol/L", female:"<11.1 mmol/L", notes:"≥11.1 mmol/L suggests diabetes" },
  { id:5, test:"Fasting Blood Sugar", male:"3.9–5.5 mmol/L", female:"3.9–5.5 mmol/L", notes:"5.6–6.9 = prediabetes; ≥7.0 = diabetes" },
];
const DEFAULT_PQ = [
  { id:1, subject:"Anatomy & Physiology", year:"2023", questions:[
    { q:"Which part of the brain controls balance and coordination?", options:["Cerebrum","Cerebellum","Medulla Oblongata","Thalamus"], ans:1 },
    { q:"The normal adult heart rate is:", options:["40–60 bpm","60–100 bpm","100–120 bpm","120–140 bpm"], ans:1 },
  ]},
  { id:2, subject:"Pharmacology", year:"2023", questions:[
    { q:"The antidote for paracetamol overdose is:", options:["Naloxone","Flumazenil","N-Acetylcysteine","Atropine"], ans:2 },
  ]},
];
const DEFAULT_DECKS = [
  { id:"vital-signs", name:"Vital Signs", cards:[
    { id:1, front:"Normal adult temperature", back:"36.1°C – 37.2°C (97°F – 99°F)" },
    { id:2, front:"Normal adult pulse rate", back:"60–100 bpm" },
    { id:3, front:"Normal SpO2", back:"95–100%" },
  ]},
  { id:"nursing-procedures", name:"Nursing Procedures", cards:[
    { id:1, front:"5 Rights of Medication", back:"Right Patient, Right Drug, Right Dose, Right Route, Right Time" },
    { id:2, front:"Glasgow Coma Scale range", back:"3–15 (3 = deep coma, 15 = fully conscious)" },
  ]},
];
const DEFAULT_DICT = [
  { id:1, term:"Aetiology", def:"The cause or origin of a disease or condition" },
  { id:2, term:"Analgesia", def:"Absence of pain sensation without loss of consciousness" },
  { id:3, term:"Bradycardia", def:"A heart rate below 60 beats per minute" },
  { id:4, term:"Cyanosis", def:"Bluish discolouration of skin due to inadequate oxygen" },
  { id:5, term:"Dyspnoea", def:"Difficulty breathing or shortness of breath" },
];
const DEFAULT_SKILLS = [
  { id:1, name:"IV cannulation" }, { id:2, name:"Urinary catheterisation" },
  { id:3, name:"Wound dressing" }, { id:4, name:"Blood glucose monitoring" },
  { id:5, name:"Basic Life Support (BLS)" },
];
const DEFAULT_ANNOUNCEMENTS = [
  { id:1, title:"Welcome to NurseVault!", body:"Your nursing study platform is ready. Explore all features.", date:"Today", pinned:true },
];

// ─── INIT STORAGE ───────────────────────────────────────────────────
const ADMIN_ACCOUNT = {username:"admin",password:"admin123",role:"admin",class:"",joined:"System"};

const initData = () => {
  if (!_store["nv-classes"]) lsSet("nv-classes", DEFAULT_CLASSES);
  if (!_store["nv-drugs"]) lsSet("nv-drugs", DEFAULT_DRUGS);
  if (!_store["nv-labs"]) lsSet("nv-labs", DEFAULT_LABS);
  if (!_store["nv-pq"]) lsSet("nv-pq", DEFAULT_PQ);
  if (!_store["nv-decks"]) lsSet("nv-decks", DEFAULT_DECKS);
  if (!_store["nv-dict"]) lsSet("nv-dict", DEFAULT_DICT);
  if (!_store["nv-skillsdb"]) lsSet("nv-skillsdb", DEFAULT_SKILLS);
  if (!_store["nv-announcements"]) lsSet("nv-announcements", DEFAULT_ANNOUNCEMENTS);
  if (!_store["nv-folders"]) lsSet("nv-folders", []);
  if (!_store["nv-handouts"]) lsSet("nv-handouts", []);
  if (!_store["nv-exams"]) lsSet("nv-exams", []);
  const users = ls("nv-users", []);
  const hasAdmin = users.some(u => u.username === "admin" && u.role === "admin");
  if (!hasAdmin) {
    lsSet("nv-users", [ADMIN_ACCOUNT, ...users.filter(u => u.username !== "admin")]);
  }
};

// ─── STYLES ─────────────────────────────────────────────────────────
const CSS = `
*{margin:0;padding:0;box-sizing:border-box;}
*,*::before,*::after{font-family:'Times New Roman',Times,serif!important;font-weight:700!important;}
:root{
  --bg:#1a3a40;--bg2:#163238;--bg3:#122b30;--bg4:#0f2428;
  --card:#1e4048;--card2:#244850;
  --accent:#3E8E95;--accent2:#5aada0;--accent3:#BFD2C5;
  --warn:#fb923c;--danger:#f87171;--success:#4ade80;--purple:#a78bfa;
  --border:rgba(255,255,255,0.09);--border2:rgba(255,255,255,0.18);
  --text:#e8f4f5;--text2:#a8c5c8;--text3:#5a8a8e;
  --radius:14px;--radius2:10px;
  --admin:#7c3aed;--admin2:#6d28d9;
}
body{font-family:'Times New Roman',Times,serif;font-weight:700;background:var(--bg);color:var(--text);min-height:100vh;overflow-x:hidden;}
body.light{
  --bg:#eef5f6;--bg2:#e0ecee;--bg3:#d2e4e7;--bg4:#c2d8dc;
  --card:#ddeef0;--card2:#cde4e7;
  --border:rgba(0,80,90,0.12);--border2:rgba(0,80,90,0.24);
  --text:#0f2d32;--text2:#2a6068;--text3:#6a9ea4;
}
body.midnight{
  --bg:#0a0a0f;--bg2:#0e0e16;--bg3:#111120;--bg4:#080810;
  --card:#13131f;--card2:#181828;
  --accent:#818cf8;--accent2:#a78bfa;--accent3:#c4b5fd;
  --border:rgba(130,130,255,0.1);--border2:rgba(130,130,255,0.2);
  --text:#e2e2ff;--text2:#a0a0c8;--text3:#5a5a88;
}
::-webkit-scrollbar{width:5px;height:5px;}
::-webkit-scrollbar-thumb{background:var(--accent);border-radius:10px;}
@keyframes fadeUp{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
@keyframes slideIn{from{transform:translateX(110%);opacity:0;}to{transform:translateX(0);opacity:1;}}
@keyframes spin{to{transform:rotate(360deg);}}

/* AUTH */
.auth-page{min-height:100vh;display:flex;align-items:center;justify-content:center;background:radial-gradient(ellipse at 30% 20%,rgba(62,142,149,.2),transparent 50%),radial-gradient(ellipse at 80% 80%,rgba(90,173,160,.1),transparent 50%),var(--bg);padding:20px;}
.auth-card{background:var(--bg3);border:1px solid var(--border2);border-radius:22px;padding:38px 34px;width:100%;max-width:420px;animation:fadeUp .5s ease;box-shadow:0 40px 80px rgba(0,0,0,.4);}
.auth-logo{display:flex;align-items:center;gap:10px;margin-bottom:5px;}
.auth-logo-icon{width:40px;height:40px;border-radius:11px;background:linear-gradient(135deg,var(--accent),var(--accent2));display:flex;align-items:center;justify-content:center;font-size:20px;}
.auth-logo-name{font-family:'Syne',sans-serif;font-size:26px;font-weight:800;color:var(--accent);}
.auth-sub{font-family:'DM Mono',monospace;font-size:11px;color:var(--text3);margin-bottom:26px;}
.auth-tabs{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:20px;}
.auth-tab{padding:9px;text-align:center;border-radius:9px;border:1px solid var(--border);font-family:'DM Mono',monospace;font-size:12px;cursor:pointer;color:var(--text3);background:transparent;transition:all .2s;}
.auth-tab.active{background:rgba(62,142,149,.15);border-color:var(--accent);color:var(--accent);}
.admin-tab-hint{text-align:center;margin-bottom:14px;font-size:11px;font-family:'DM Mono',monospace;color:var(--admin);background:rgba(124,58,237,.08);border:1px solid rgba(124,58,237,.2);border-radius:8px;padding:6px;}
.lbl{font-family:'DM Mono',monospace;font-size:10px;color:var(--text3);letter-spacing:.08em;text-transform:uppercase;margin-bottom:5px;display:block;}
.inp{width:100%;background:var(--bg4);border:1px solid var(--border);border-radius:9px;padding:11px 14px;color:var(--text);font-size:14px;font-family:'Instrument Sans',sans-serif;outline:none;transition:border-color .2s;margin-bottom:13px;}
.inp:focus{border-color:var(--accent);}
.inp-wrap{position:relative;margin-bottom:13px;}
.inp-wrap .inp{margin-bottom:0;}
.inp-eye{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;color:var(--text3);cursor:pointer;font-size:15px;}
.btn-primary{width:100%;padding:13px;background:linear-gradient(135deg,var(--accent),var(--accent2));border:none;border-radius:10px;font-family:'Syne',sans-serif;font-size:15px;font-weight:700;color:white;cursor:pointer;transition:all .2s;margin-top:4px;}
.btn-primary:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(62,142,149,.3);}
.btn-admin{background:linear-gradient(135deg,var(--admin),var(--admin2));}
.btn-admin:hover{box-shadow:0 8px 24px rgba(124,58,237,.3);}
.auth-switch{text-align:center;margin-top:12px;font-size:12px;color:var(--text3);font-family:'DM Mono',monospace;}
.auth-switch span{color:var(--accent);cursor:pointer;text-decoration:underline;}
.auth-notice{background:rgba(251,191,36,.07);border:1px solid rgba(251,191,36,.2);border-radius:10px;padding:10px 14px;font-size:11px;color:#fbbf24;font-family:'DM Mono',monospace;margin-top:16px;line-height:1.6;display:flex;gap:8px;}

/* SHELL */
.app-shell{display:flex;height:100vh;overflow:hidden;}
.sidebar{width:240px;min-width:240px;background:var(--bg3);border-right:1px solid var(--border);display:flex;flex-direction:column;overflow-y:auto;padding:0 0 20px;z-index:10;transition:transform .3s;}
.sidebar-head{padding:16px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:9px;}
.sidebar-logo-icon{width:34px;height:34px;border-radius:9px;background:linear-gradient(135deg,var(--accent),var(--accent2));display:flex;align-items:center;justify-content:center;font-size:17px;}
.sidebar-logo-name{font-family:'Syne',sans-serif;font-size:19px;font-weight:800;color:var(--accent);}
.admin-badge-side{display:inline-flex;align-items:center;gap:4px;background:rgba(124,58,237,.15);border:1px solid rgba(124,58,237,.3);border-radius:20px;padding:2px 8px;font-size:10px;font-family:'DM Mono',monospace;color:var(--purple);margin-left:auto;}
.nav-sec{padding:12px 16px 3px;font-family:'DM Mono',monospace;font-size:9px;color:var(--text3);letter-spacing:1.5px;text-transform:uppercase;}
.nav-item{display:flex;align-items:center;gap:9px;padding:9px 16px;margin:1px 8px;border-radius:9px;cursor:pointer;font-size:13.5px;color:var(--text2);transition:all .15s;user-select:none;}
.nav-item:hover{background:rgba(62,142,149,.1);color:var(--text);}
.nav-item.active{background:rgba(62,142,149,.18);color:var(--accent);}
.nav-item.admin-nav{color:var(--purple);}
.nav-item.admin-nav:hover{background:rgba(124,58,237,.1);}
.nav-item.admin-nav.active{background:rgba(124,58,237,.18);color:var(--purple);}
.nav-icon{font-size:15px;width:20px;text-align:center;flex-shrink:0;}
.class-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0;}
.main-area{flex:1;display:flex;flex-direction:column;overflow:hidden;}
.topbar{padding:13px 22px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--border);background:var(--bg3);flex-shrink:0;gap:10px;}
.topbar-left{display:flex;align-items:center;gap:10px;}
.topbar-title{font-family:'Syne',sans-serif;font-size:16px;font-weight:700;}
.topbar-right{display:flex;align-items:center;gap:8px;}
.theme-btn{background:rgba(62,142,149,.1);border:1px solid var(--border);border-radius:20px;padding:5px 12px;font-size:11px;font-family:'DM Mono',monospace;color:var(--text2);cursor:pointer;transition:all .2s;}
.theme-btn:hover{border-color:var(--accent);color:var(--accent);}
.icon-btn{width:34px;height:34px;border-radius:50%;background:rgba(62,142,149,.1);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:15px;transition:all .2s;}
.icon-btn:hover{border-color:var(--accent);}
.page-content{flex:1;overflow-y:auto;padding:22px 24px;}
.hamburger{display:none;background:none;border:none;color:var(--text);font-size:22px;cursor:pointer;}
.sidebar-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9;}

/* CARDS / COMMON */
.card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:18px;}
.card2{background:var(--card2);border:1px solid var(--border);border-radius:var(--radius2);padding:14px;}
.grid2{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;}
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;}
.grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;}
.grid5{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;}
.stat-card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:16px;animation:fadeUp .4s ease both;}
.stat-lbl{font-family:'DM Mono',monospace;font-size:9px;color:var(--text3);letter-spacing:1px;text-transform:uppercase;margin-bottom:5px;}
.stat-val{font-family:'Syne',sans-serif;font-size:28px;font-weight:800;color:var(--accent);}
.stat-sub{font-size:11px;color:var(--text3);margin-top:3px;}
.sec-title{font-family:'Syne',sans-serif;font-size:18px;font-weight:700;margin-bottom:4px;}
.sec-sub{font-size:12px;color:var(--text3);font-family:'DM Mono',monospace;margin-bottom:16px;}
.search-wrap{position:relative;margin-bottom:18px;}
.search-wrap input{width:100%;background:var(--card);border:1px solid var(--border);border-radius:10px;padding:10px 14px 10px 36px;color:var(--text);font-size:14px;font-family:'Instrument Sans',sans-serif;outline:none;transition:border-color .2s;}
.search-wrap input:focus{border-color:var(--accent);}
.search-ico{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--text3);font-size:14px;}
.class-card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:16px;cursor:pointer;transition:all .2s;animation:fadeUp .4s ease both;position:relative;overflow:hidden;}
.class-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--cc);}
.class-card:hover{border-color:var(--cc);transform:translateY(-2px);}
.class-tag{display:inline-block;padding:2px 8px;border-radius:5px;font-size:10px;font-family:'DM Mono',monospace;font-weight:600;margin-bottom:8px;color:var(--cc);background:rgba(62,142,149,.1);}
.class-name{font-family:'Syne',sans-serif;font-size:16px;font-weight:700;margin-bottom:4px;}
.class-desc{font-size:12px;color:var(--text3);margin-bottom:10px;line-height:1.5;}
.class-meta{display:flex;gap:14px;font-size:11px;color:var(--text3);font-family:'DM Mono',monospace;}

/* BUTTONS */
.btn{padding:8px 16px;border-radius:9px;border:1px solid var(--border);font-family:'Instrument Sans',sans-serif;font-size:13px;cursor:pointer;transition:all .2s;background:transparent;color:var(--text2);}
.btn:hover{border-color:var(--border2);color:var(--text);}
.btn:disabled{opacity:.4;cursor:not-allowed;}
.btn-accent{background:var(--accent);border-color:var(--accent);color:white;font-weight:600;}
.btn-accent:hover{background:var(--accent2);border-color:var(--accent2);}
.btn-sm{padding:5px 11px;font-size:12px;border-radius:7px;}
.btn-danger{background:rgba(248,113,113,.1);border-color:rgba(248,113,113,.3);color:var(--danger);}
.btn-danger:hover{background:rgba(248,113,113,.22);}
.btn-purple{background:var(--admin);border-color:var(--admin);color:white;font-weight:600;}
.btn-purple:hover{background:var(--admin2);}
.btn-success{background:rgba(74,222,128,.15);border-color:rgba(74,222,128,.3);color:var(--success);font-weight:600;}
.btn-warn{background:rgba(251,146,60,.12);border-color:rgba(251,146,60,.3);color:var(--warn);}

/* MODAL */
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.65);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:1000;padding:16px;animation:fadeIn .2s;}
.modal{background:var(--bg2);border:1px solid var(--border2);border-radius:18px;padding:26px;width:100%;max-width:540px;max-height:88vh;overflow-y:auto;animation:fadeUp .3s ease;}
.modal.lg{max-width:720px;}
.modal.xl{max-width:900px;}
.modal-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;}
.modal-title{font-family:'Syne',sans-serif;font-size:17px;font-weight:700;}
.modal-close{background:none;border:none;color:var(--text3);font-size:20px;cursor:pointer;padding:2px 8px;border-radius:6px;transition:all .2s;}
.modal-close:hover{background:rgba(255,255,255,.08);color:var(--text);}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;}

/* TABLES */
.tbl{width:100%;border-collapse:collapse;}
.tbl th{padding:10px 12px;text-align:left;font-size:10px;font-family:'DM Mono',monospace;color:var(--text3);text-transform:uppercase;letter-spacing:.06em;border-bottom:1px solid var(--border);}
.tbl td{padding:11px 12px;border-bottom:1px solid var(--border);font-size:13px;vertical-align:middle;}
.tbl tbody tr:hover{background:rgba(62,142,149,.05);}
.tbl tbody tr:last-child td{border-bottom:none;}
.tbl-actions{display:flex;gap:6px;align-items:center;}

/* TAGS */
.tag{display:inline-block;padding:2px 8px;border-radius:20px;font-size:10px;font-family:'DM Mono',monospace;border:1px solid var(--border);}
.tag-accent{background:rgba(62,142,149,.15);border-color:var(--accent);color:var(--accent);}
.tag-success{background:rgba(74,222,128,.1);border-color:var(--success);color:var(--success);}
.tag-warn{background:rgba(251,146,60,.1);border-color:var(--warn);color:var(--warn);}
.tag-danger{background:rgba(248,113,113,.1);border-color:var(--danger);color:var(--danger);}
.tag-purple{background:rgba(167,139,250,.1);border-color:var(--purple);color:var(--purple);}

/* TOAST */
.toast-wrap{position:fixed;bottom:22px;right:22px;display:flex;flex-direction:column;gap:8px;z-index:9999;}
.toast{background:var(--bg2);border:1px solid var(--border2);border-radius:10px;padding:11px 15px;font-size:13px;font-family:'DM Mono',monospace;animation:slideIn .3s ease;box-shadow:0 8px 24px rgba(0,0,0,.3);display:flex;align-items:center;gap:8px;min-width:220px;}
.toast.success{border-left:3px solid var(--success);}
.toast.error{border-left:3px solid var(--danger);}
.toast.info{border-left:3px solid var(--accent);}
.toast.warn{border-left:3px solid var(--warn);}

/* ADMIN SPECIFIC */
.admin-header{background:linear-gradient(135deg,rgba(124,58,237,.15),rgba(109,40,217,.08));border:1px solid rgba(124,58,237,.25);border-radius:14px;padding:20px 22px;margin-bottom:22px;display:flex;align-items:center;gap:14px;}
.admin-header-icon{width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,var(--admin),var(--admin2));display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;}
.admin-header-title{font-family:'Syne',sans-serif;font-size:20px;font-weight:800;}
.admin-header-sub{font-size:12px;color:var(--text3);font-family:'DM Mono',monospace;margin-top:2px;}
.admin-tabs{display:flex;gap:6px;margin-bottom:20px;flex-wrap:wrap;}
.admin-tab{padding:7px 14px;border-radius:8px;border:1px solid var(--border);font-family:'DM Mono',monospace;font-size:12px;cursor:pointer;color:var(--text3);background:transparent;transition:all .2s;}
.admin-tab:hover{border-color:rgba(124,58,237,.4);color:var(--purple);}
.admin-tab.active{background:rgba(124,58,237,.18);border-color:var(--admin);color:var(--purple);}
.paste-box{width:100%;background:var(--bg4);border:1px dashed var(--border2);border-radius:9px;padding:12px 14px;color:var(--text);font-size:13px;font-family:'DM Mono',monospace;outline:none;resize:vertical;min-height:90px;margin-bottom:10px;line-height:1.6;}
.paste-box:focus{border-color:var(--accent);}
.parse-preview{background:var(--bg4);border:1px solid var(--border);border-radius:9px;padding:12px;margin-bottom:12px;max-height:200px;overflow-y:auto;}
.parse-item{display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid var(--border);font-size:12px;font-family:'DM Mono',monospace;}
.parse-item:last-child{border-bottom:none;}
.parse-check{color:var(--success);font-size:14px;}
.section-divider{border:none;border-top:1px solid var(--border);margin:18px 0;}
.user-row{display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--bg4);border-radius:10px;margin-bottom:8px;}
.user-av{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--accent2));display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:700;font-family:'Syne',sans-serif;color:white;flex-shrink:0;}
.progress-wrap{background:var(--bg4);border-radius:20px;height:6px;overflow:hidden;}
.progress-fill{height:100%;border-radius:20px;transition:width .5s;}

/* FLASHCARD */
.flashcard{width:100%;min-height:180px;perspective:1000px;cursor:pointer;}
.flashcard-inner{position:relative;width:100%;min-height:180px;transition:transform .6s;transform-style:preserve-3d;}
.flashcard-inner.flipped{transform:rotateY(180deg);}
.flashcard-front,.flashcard-back{position:absolute;width:100%;min-height:180px;backface-visibility:hidden;-webkit-backface-visibility:hidden;background:var(--card2);border:1px solid var(--border);border-radius:var(--radius);display:flex;align-items:center;justify-content:center;padding:24px;text-align:center;flex-direction:column;}
.flashcard-back{transform:rotateY(180deg);background:linear-gradient(135deg,rgba(62,142,149,.15),rgba(90,173,160,.08));border-color:var(--accent);}
.fc-lbl{font-family:'DM Mono',monospace;font-size:9px;color:var(--text3);margin-bottom:8px;text-transform:uppercase;letter-spacing:.08em;}
.fc-text{font-family:'Syne',sans-serif;font-size:17px;font-weight:600;line-height:1.4;}

/* QUIZ */
.quiz-opt{padding:11px 15px;border:1px solid var(--border);border-radius:10px;cursor:pointer;margin-bottom:7px;transition:all .2s;font-size:14px;}
.quiz-opt:hover:not(.answered){border-color:var(--border2);background:rgba(255,255,255,.04);}
.quiz-opt.correct{border-color:var(--success);background:rgba(74,222,128,.1);color:var(--success);}
.quiz-opt.wrong{border-color:var(--danger);background:rgba(248,113,113,.1);color:var(--danger);}
.quiz-opt.reveal{border-color:var(--success);background:rgba(74,222,128,.06);}

/* GPA */
.gpa-bar-wrap{background:var(--bg4);border-radius:20px;height:8px;margin:12px 0;overflow:hidden;}
.gpa-bar{height:100%;background:linear-gradient(90deg,var(--accent),var(--accent2));border-radius:20px;transition:width .6s ease;}
.course-row{display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--bg4);border-radius:10px;margin-bottom:8px;}

/* TT */
.tt-badge{display:inline-block;padding:3px 9px;border-radius:6px;font-size:11px;font-family:'DM Mono',monospace;font-weight:600;}

/* LECTURER */
.lect-header{background:linear-gradient(135deg,rgba(20,160,100,.13),rgba(16,130,80,.07));border:1px solid rgba(20,160,100,.28);border-radius:14px;padding:20px 22px;margin-bottom:22px;display:flex;align-items:center;gap:14px;}
.lect-header-icon{width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,#14a064,#0e7a50);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;}
.lect-header-title{font-family:'Syne',sans-serif;font-size:20px;font-weight:800;}
.lect-header-sub{font-size:12px;color:var(--text3);font-family:'DM Mono',monospace;margin-top:2px;}
.lect-tabs{display:flex;gap:6px;margin-bottom:20px;flex-wrap:wrap;}
.lect-tab{padding:7px 14px;border-radius:8px;border:1px solid var(--border);font-family:'DM Mono',monospace;font-size:12px;cursor:pointer;color:var(--text3);background:transparent;transition:all .2s;}
.lect-tab:hover{border-color:rgba(20,160,100,.4);color:#14a064;}
.lect-tab.active{background:rgba(20,160,100,.15);border-color:#14a064;color:#14a064;}
.lect-card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:16px;margin-bottom:12px;border-left:3px solid #14a064;}
.lect-note-card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:16px;margin-bottom:12px;transition:all .2s;}
.lect-note-card:hover{border-color:#14a064;}
.lect-msg{padding:9px 14px;border-radius:12px;font-size:13px;line-height:1.6;margin-bottom:8px;max-width:80%;}
.lect-msg.mine{background:linear-gradient(135deg,#14a064,#0e7a50);color:white;margin-left:auto;border-radius:14px 14px 4px 14px;}
.lect-msg.other{background:var(--card2);border-radius:14px 14px 14px 4px;}
.lect-badge{display:inline-flex;align-items:center;gap:4px;background:rgba(20,160,100,.12);border:1px solid rgba(20,160,100,.3);border-radius:20px;padding:2px 8px;font-size:10px;font-family:'DM Mono',monospace;color:#14a064;}

/* DROPDOWN NAV */
.nav-group{}
.nav-group-header{display:flex;align-items:center;justify-content:space-between;padding:9px 16px;margin:1px 8px;border-radius:9px;cursor:pointer;font-size:13.5px;color:var(--text2);transition:all .15s;user-select:none;}
.nav-group-header:hover{background:rgba(62,142,149,.1);color:var(--text);}
.nav-group-arrow{font-size:10px;transition:transform .2s;}
.nav-group-arrow.open{transform:rotate(180deg);}
.nav-group-items{overflow:hidden;transition:max-height .3s ease;}
.nav-sub-item{display:flex;align-items:center;gap:9px;padding:7px 16px 7px 32px;margin:1px 8px;border-radius:9px;cursor:pointer;font-size:13px;color:var(--text3);transition:all .15s;}
.nav-sub-item:hover{background:rgba(62,142,149,.08);color:var(--text2);}
.nav-sub-item.active{background:rgba(62,142,149,.15);color:var(--accent);}
/* CLASS CHAT */
.chat-wrap{display:flex;flex-direction:column;height:420px;}
.chat-msgs{flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:6px;padding:14px;background:var(--card);border:1px solid var(--border);border-radius:var(--radius);margin-bottom:10px;}
.chat-bubble{max-width:78%;padding:9px 14px;border-radius:14px;font-size:13px;line-height:1.6;}
.chat-bubble.mine{background:linear-gradient(135deg,var(--accent),var(--accent2));color:white;align-self:flex-end;border-radius:14px 14px 4px 14px;}
.chat-bubble.other{background:var(--card2);align-self:flex-start;border-radius:14px 14px 14px 4px;}
.chat-bubble.system{background:transparent;border:1px dashed var(--border2);align-self:center;font-size:11px;color:var(--text3);font-family:"DM Mono",monospace;border-radius:20px;padding:3px 12px;max-width:90%;}
/* AI CHAT */
.ai-wrap{display:flex;flex-direction:column;height:500px;}
.ai-msgs{flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:10px;padding:14px;background:var(--card);border:1px solid var(--border);border-radius:var(--radius);margin-bottom:10px;}
.ai-bubble-user{background:linear-gradient(135deg,var(--accent),var(--accent2));color:white;align-self:flex-end;padding:10px 14px;border-radius:14px 14px 4px 14px;max-width:80%;font-size:13px;line-height:1.6;}
.ai-bubble-ai{background:var(--card2);border:1px solid var(--border);align-self:flex-start;padding:12px 16px;border-radius:14px 14px 14px 4px;max-width:85%;font-size:13px;line-height:1.7;white-space:pre-wrap;}
.ai-typing{display:flex;gap:4px;align-items:center;padding:10px 14px;}
.ai-dot{width:7px;height:7px;border-radius:50%;background:var(--accent);animation:aiPulse 1.2s infinite;}
.ai-dot:nth-child(2){animation-delay:.2s;}
.ai-dot:nth-child(3){animation-delay:.4s;}
@keyframes aiPulse{0%,100%{opacity:.3;transform:scale(.8);}50%{opacity:1;transform:scale(1.2);}}
/* EXAM MODE */
.exam-header{background:linear-gradient(135deg,rgba(248,113,113,.12),rgba(251,146,60,.08));border:1px solid rgba(248,113,113,.25);border-radius:14px;padding:18px 22px;margin-bottom:18px;}
.exam-timer{font-family:"Syne",sans-serif;font-size:28px;font-weight:800;color:var(--danger);}
.exam-progress{background:var(--bg4);border-radius:20px;height:6px;overflow:hidden;margin:10px 0;}
.exam-progress-fill{height:100%;background:linear-gradient(90deg,var(--accent),var(--accent2));border-radius:20px;transition:width .3s;}
/* RESULTS UPLOAD */
.result-card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:16px;margin-bottom:10px;border-left:3px solid var(--accent);}

/* FOLDERS */
.folder-row{display:flex;align-items:center;gap:10px;padding:11px 16px;background:var(--card);border:1px solid var(--border);border-radius:10px;margin-bottom:8px;cursor:pointer;transition:all .2s;}
.folder-row:hover{border-color:var(--accent);background:var(--card2);}
.folder-row.open{border-color:var(--accent);background:rgba(62,142,149,.08);}
.folder-icon{font-size:20px;flex-shrink:0;}
.folder-name{font-family:"Syne",sans-serif;font-weight:700;font-size:15px;flex:1;}
.folder-meta{font-size:11px;color:var(--text3);font-family:"DM Mono",monospace;}
.folder-arrow{font-size:11px;color:var(--text3);transition:transform .2s;}
.folder-arrow.open{transform:rotate(90deg);}
.folder-contents{background:var(--bg4);border:1px solid var(--border);border-top:none;border-radius:0 0 10px 10px;padding:10px;margin-top:-8px;margin-bottom:8px;}
.handout-item{display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--card);border:1px solid var(--border);border-radius:9px;margin-bottom:6px;cursor:pointer;transition:all .2s;}
.handout-item:hover{border-color:var(--accent2);background:var(--card2);}
.handout-item:last-child{margin-bottom:0;}
.handout-icon{font-size:16px;flex-shrink:0;}
.handout-name{flex:1;font-weight:600;font-size:13px;}
.handout-badge{font-size:10px;padding:2px 7px;border-radius:5px;font-family:"DM Mono",monospace;background:rgba(62,142,149,.1);border:1px solid var(--accent);color:var(--accent);}
.folder-empty{text-align:center;padding:20px;color:var(--text3);font-family:"DM Mono",monospace;font-size:12px;}

/* ADMIN GEAR BUTTON */
.admin-gear-btn{position:fixed;bottom:22px;left:50%;transform:translateX(-50%);width:38px;height:38px;border-radius:50%;background:rgba(30,40,50,.7);border:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:16px;z-index:50;transition:all .25s;backdrop-filter:blur(6px);opacity:0.35;}
.admin-gear-btn:hover{opacity:1;background:rgba(124,58,237,.25);border-color:rgba(124,58,237,.5);transform:translateX(-50%) rotate(30deg);}
.admin-verify-form{display:flex;flex-direction:column;gap:4px;}

/* RESPONSIVE */
@media(max-width:900px){
  .sidebar{position:fixed;top:0;left:0;height:100vh;transform:translateX(-100%);}
  .sidebar.open{transform:translateX(0);}
  .sidebar-overlay.open{display:block;}
  .hamburger{display:block;}
  .grid5{grid-template-columns:repeat(3,1fr);}
  .grid4{grid-template-columns:repeat(2,1fr);}
  .grid3{grid-template-columns:repeat(2,1fr);}
}
@media(max-width:600px){
  .grid5,.grid4{grid-template-columns:repeat(2,1fr);}
  .grid3,.grid2{grid-template-columns:1fr;}
  .page-content{padding:14px;}
  .topbar{padding:11px 14px;}
  .form-row{grid-template-columns:1fr;}
}
`;

// ─── TOAST ──────────────────────────────────────────────────────────
function Toasts({ list }) {
  return <div className="toast-wrap">{list.map(t=><div key={t.id} className={`toast ${t.type}`}><span>{t.type==="success"?"✅":t.type==="error"?"❌":t.type==="warn"?"⚠️":"ℹ️"}</span>{t.msg}</div>)}</div>;
}

// ════════════════════════════════════════════════════════════════════
// ADMIN PANEL
// ════════════════════════════════════════════════════════════════════
function AdminPanel({ toast, currentUser }) {
  const [tab, setTab] = useState("overview");

  const TABS = [
    { key:"overview", label:"📊 Overview" },
    { key:"users", label:"👥 Users" },
    { key:"lecturers", label:"🎓 Lecturers" },
    { key:"classes", label:"🏫 Classes" },
    { key:"drugs", label:"💊 Drugs" },
    { key:"labs", label:"🧪 Labs" },
    { key:"pq", label:"❓ Questions" },
    { key:"flashcards", label:"🃏 Flashcards" },
    { key:"dictionary", label:"📖 Dictionary" },
    { key:"skills", label:"✅ Skills" },
    { key:"announcements", label:"📢 Announcements" },
    { key:"handouts", label:"📄 Handouts" },
  ];

  return (
    <div>
      <div className="admin-header">
        <div className="admin-header-icon">🛡️</div>
        <div>
          <div className="admin-header-title">Admin Control Panel</div>
          <div className="admin-header-sub">Logged in as <b style={{color:"var(--purple)"}}>{currentUser}</b> · Full system access</div>
        </div>
      </div>
      <div className="admin-tabs">
        {TABS.map(t=><div key={t.key} className={`admin-tab${tab===t.key?" active":""}`} onClick={()=>setTab(t.key)}>{t.label}</div>)}
      </div>
      {tab==="overview" && <AdminOverview toast={toast} />}
      {tab==="users" && <AdminUsers toast={toast} />}
      {tab==="lecturers" && <AdminLecturers toast={toast} />}
      {tab==="classes" && <AdminClasses toast={toast} />}
      {tab==="drugs" && <AdminDrugs toast={toast} />}
      {tab==="labs" && <AdminLabs toast={toast} />}
      {tab==="pq" && <AdminPQ toast={toast} />}
      {tab==="flashcards" && <AdminFlashcards toast={toast} />}
      {tab==="dictionary" && <AdminDictionary toast={toast} />}
      {tab==="skills" && <AdminSkills toast={toast} />}
      {tab==="announcements" && <AdminAnnouncements toast={toast} />}
      {tab==="handouts" && <AdminHandouts toast={toast} />}
    </div>
  );
}

// ── Admin Overview ───────────────────────────────────────────────────
function AdminOverview({ toast }) {
  const users = ls("nv-users", []);
  const drugs = ls("nv-drugs", []);
  const labs = ls("nv-labs", []);
  const pq = ls("nv-pq", []);
  const decks = ls("nv-decks", []);
  const dict = ls("nv-dict", []);
  const skills = ls("nv-skillsdb", []);
  const classes = ls("nv-classes", []);
  const handouts = ls("nv-handouts", []);
  const announcements = ls("nv-announcements", []);

  const stats = [
    {lbl:"Users",val:users.length,icon:"👥",color:"var(--accent)"},
    {lbl:"Classes",val:classes.length,icon:"🏫",color:"var(--accent2)"},
    {lbl:"Drugs",val:drugs.length,icon:"💊",color:"var(--warn)"},
    {lbl:"Lab Tests",val:labs.length,icon:"🧪",color:"var(--success)"},
    {lbl:"Question Banks",val:pq.length,icon:"❓",color:"var(--purple)"},
    {lbl:"Flashcard Decks",val:decks.length,icon:"🃏",color:"var(--accent)"},
    {lbl:"Dict Terms",val:dict.length,icon:"📖",color:"var(--accent2)"},
    {lbl:"Skills",val:skills.length,icon:"✅",color:"var(--success)"},
    {lbl:"Handouts",val:handouts.length,icon:"📄",color:"var(--warn)"},
    {lbl:"Announcements",val:announcements.length,icon:"📢",color:"var(--purple)"},
  ];

  const exportAll = () => {
    const data = { users, classes, drugs, labs, pq, decks, dict, skills, handouts, announcements, exported: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type:"application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "nursevault-backup.json"; a.click();
    toast("Backup exported!", "success");
  };

  const importAll = (e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (data.classes) lsSet("nv-classes", data.classes);
        if (data.drugs) lsSet("nv-drugs", data.drugs);
        if (data.labs) lsSet("nv-labs", data.labs);
        if (data.pq) lsSet("nv-pq", data.pq);
        if (data.decks) lsSet("nv-decks", data.decks);
        if (data.dict) lsSet("nv-dict", data.dict);
        if (data.skills) lsSet("nv-skillsdb", data.skills);
        if (data.announcements) lsSet("nv-announcements", data.announcements);
        toast("Backup restored! Refresh to see changes.", "success");
      } catch { toast("Invalid backup file", "error"); }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <div className="grid5" style={{marginBottom:20}}>
        {stats.map((s,i)=>(
          <div key={s.lbl} className="stat-card" style={{animationDelay:`${i*.04}s`}}>
            <div style={{fontSize:22,marginBottom:6}}>{s.icon}</div>
            <div className="stat-val" style={{color:s.color,fontSize:24}}>{s.val}</div>
            <div className="stat-lbl" style={{marginTop:4}}>{s.lbl}</div>
          </div>
        ))}
      </div>
      <div className="card" style={{marginBottom:16}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,marginBottom:14}}>💾 Backup & Restore</div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <button className="btn btn-accent" onClick={exportAll}>⬇️ Export Backup (JSON)</button>
          <label className="btn btn-warn" style={{cursor:"pointer"}}>
            ⬆️ Import Backup
            <input type="file" accept=".json" style={{display:"none"}} onChange={importAll} />
          </label>
          <button className="btn btn-danger" onClick={()=>{{Object.keys(_store).forEach(k=>delete _store[k]);initData();toast("Data reset to defaults","warn");}}}>🔄 Reset to Defaults</button>
        </div>
      </div>
      <div className="card">
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,marginBottom:14}}>👥 Recent Users</div>
        {users.slice(-5).reverse().map(u=>(
          <div key={u.username} className="user-row">
            <div className="user-av">{u.username[0].toUpperCase()}</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:600,fontSize:14}}>{u.username}</div>
              <div style={{fontSize:11,color:"var(--text3)",fontFamily:"'DM Mono',monospace"}}>{u.class||"No class"} · Joined {u.joined}</div>
            </div>
            <span className={`tag ${u.role==="admin"?"tag-purple":"tag-accent"}`}>{u.role||"student"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Admin Users ──────────────────────────────────────────────────────
function AdminUsers({ toast }) {
  const [users, setUsers] = useState(()=>ls("nv-users",[]));
  const [edit, setEdit] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({username:"",password:"",role:"student",class:""});
  const classes = ls("nv-classes", DEFAULT_CLASSES);
  const [search, setSearch] = useState("");

  const save = () => {
    if (!form.username||!form.password) return toast("Username & password required","error");
    if (!edit && users.find(u=>u.username===form.username)) return toast("Username already exists","error");
    let u;
    if (edit) { u = users.map(x=>x.username===edit?{...x,...form}:x); toast("User updated","success"); }
    else { u = [...users,{...form,joined:new Date().toLocaleDateString()}]; toast("User added","success"); }
    setUsers(u); lsSet("nv-users",u); setEdit(null); setShowAdd(false); setForm({username:"",password:"",role:"student",class:""});
  };

  const del = (username) => {
    if (username==="admin") return toast("Cannot delete admin","error");
    const u = users.filter(x=>x.username!==username); setUsers(u); lsSet("nv-users",u); toast("User deleted","success");
  };

  const filtered = users.filter(u=>u.username.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:10}}>
        <div><div className="sec-title">👥 Users ({users.length})</div></div>
        <button className="btn btn-purple" onClick={()=>{setShowAdd(true);setEdit(null);setForm({username:"",password:"",role:"student",class:""});}}>+ Add User</button>
      </div>
      <div className="search-wrap"><span className="search-ico">🔍</span><input placeholder="Search users..." value={search} onChange={e=>setSearch(e.target.value)} /></div>
      <div className="card" style={{padding:0,overflow:"hidden"}}>
        <table className="tbl">
          <thead><tr><th>Username</th><th>Role</th><th>Class</th><th>Joined</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.map(u=>(
              <tr key={u.username}>
                <td><div style={{display:"flex",alignItems:"center",gap:9}}><div className="user-av" style={{width:30,height:30,fontSize:13}}>{u.username[0].toUpperCase()}</div><span style={{fontWeight:600}}>{u.username}</span></div></td>
                <td><span className={`tag ${u.role==="admin"?"tag-purple":"tag-accent"}`}>{u.role||"student"}</span></td>
                <td style={{fontSize:12,color:"var(--text3)"}}>{u.class||"—"}</td>
                <td style={{fontSize:12,color:"var(--text3)",fontFamily:"'DM Mono',monospace"}}>{u.joined||"—"}</td>
                <td><div className="tbl-actions">
                  <button className="btn btn-sm" onClick={()=>{setEdit(u.username);setForm({username:u.username,password:u.password,role:u.role||"student",class:u.class||""});setShowAdd(true);}}>✏️ Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={()=>del(u.username)}>🗑️ Del</button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAdd&&(
        <div className="modal-overlay" onClick={()=>setShowAdd(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-head"><div className="modal-title">{edit?"Edit User":"Add User"}</div><button className="modal-close" onClick={()=>setShowAdd(false)}>✕</button></div>
            <label className="lbl">Username</label><input className="inp" value={form.username} onChange={e=>setForm({...form,username:e.target.value})} disabled={!!edit} />
            <label className="lbl">Password</label><input className="inp" type="text" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
            <label className="lbl">Role</label>
            <select className="inp" value={form.role} onChange={e=>setForm({...form,role:e.target.value})}>
              <option value="student">Student</option><option value="lecturer">Lecturer</option><option value="admin">Admin</option>
            </select>
            <label className="lbl">Class</label>
            <select className="inp" value={form.class} onChange={e=>setForm({...form,class:e.target.value})}>
              <option value="">None</option>
              {classes.map(c=><option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
            <div style={{display:"flex",gap:8}}><button className="btn btn-purple" style={{flex:1}} onClick={save}>Save</button><button className="btn" onClick={()=>setShowAdd(false)}>Cancel</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Admin Lecturers ──────────────────────────────────────────────────
function AdminLecturers({ toast }) {
  const [users, setUsers] = useState(()=>ls("nv-users",[]));
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({username:"",password:"",title:"",department:"",specialization:"",bio:""});

  const lecturers = users.filter(u=>u.role==="lecturer");

  const save = () => {
    if (!form.username||!form.password) return toast("Username & password required","error");
    if (!edit && users.find(u=>u.username===form.username)) return toast("Username already exists","error");
    let u;
    if (edit) {
      u = users.map(x=>x.username===edit?{...x,...form,role:"lecturer"}:x);
      toast("Lecturer updated","success");
    } else {
      u = [...users,{...form,role:"lecturer",joined:new Date().toLocaleDateString()}];
      toast("Lecturer account created!","success");
    }
    setUsers(u); lsSet("nv-users",u);
    setShowModal(false); setEdit(null); setForm({username:"",password:"",title:"",department:"",specialization:"",bio:""});
  };

  const del = (username) => {
    const u=users.filter(x=>x.username!==username); setUsers(u); lsSet("nv-users",u); toast("Removed","success");
  };

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:10}}>
        <div>
          <div className="sec-title">🎓 Lecturers ({lecturers.length})</div>
          <div className="sec-sub">Manage lecturer accounts — they get their own portal</div>
        </div>
        <button className="btn btn-accent" style={{background:"#14a064",borderColor:"#14a064"}} onClick={()=>{setShowModal(true);setEdit(null);setForm({username:"",password:"",title:"",department:"",specialization:"",bio:""});}}>+ Add Lecturer</button>
      </div>

      {lecturers.length===0&&(
        <div style={{textAlign:"center",padding:"50px",color:"var(--text3)"}}>
          <div style={{fontSize:48}}>🎓</div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,marginTop:12}}>No lecturers added yet.<br/>Create a lecturer account to get started.</div>
        </div>
      )}

      {lecturers.map(l=>(
        <div key={l.username} className="lect-card">
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{width:46,height:46,borderRadius:50,background:"linear-gradient(135deg,#14a064,#0e7a50)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,fontWeight:700,color:"white",fontFamily:"'Syne',sans-serif",flexShrink:0}}>{l.username[0].toUpperCase()}</div>
            <div style={{flex:1}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:15}}>{l.title?`${l.title} `:""}{l.username}</div>
              <div style={{fontSize:12,color:"var(--text3)",fontFamily:"'DM Mono',monospace"}}>{l.department||"No department"}{l.specialization?` · ${l.specialization}`:""}</div>
              {l.bio&&<div style={{fontSize:12,color:"var(--text2)",marginTop:4}}>{l.bio}</div>}
              <div style={{fontSize:10,color:"var(--text3)",marginTop:4}}>Joined: {l.joined||"—"}</div>
            </div>
            <div style={{display:"flex",gap:6,flexShrink:0}}>
              <button className="btn btn-sm" onClick={()=>{setEdit(l.username);setForm({username:l.username,password:l.password,title:l.title||"",department:l.department||"",specialization:l.specialization||"",bio:l.bio||""});setShowModal(true);}}>✏️ Edit</button>
              <button className="btn btn-sm btn-danger" onClick={()=>del(l.username)}>🗑️</button>
            </div>
          </div>
        </div>
      ))}

      {showModal&&(
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-head">
              <div className="modal-title" style={{color:"#14a064"}}>{edit?"Edit":"Add"} Lecturer</div>
              <button className="modal-close" onClick={()=>setShowModal(false)}>✕</button>
            </div>
            <div className="form-row">
              <div><label className="lbl">Username</label><input className="inp" value={form.username} onChange={e=>setForm({...form,username:e.target.value})} disabled={!!edit} placeholder="lecturer username" /></div>
              <div><label className="lbl">Password</label><input className="inp" type="text" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="set a password" /></div>
            </div>
            <div className="form-row">
              <div><label className="lbl">Title / Rank</label><input className="inp" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Dr., Prof., Mr., Mrs." /></div>
              <div><label className="lbl">Specialization</label><input className="inp" value={form.specialization} onChange={e=>setForm({...form,specialization:e.target.value})} placeholder="e.g. Pharmacology" /></div>
            </div>
            <label className="lbl">Department</label>
            <input className="inp" value={form.department} onChange={e=>setForm({...form,department:e.target.value})} placeholder="e.g. Department of Medical-Surgical Nursing" />
            <label className="lbl">Bio (optional)</label>
            <textarea className="inp" rows={2} style={{resize:"vertical"}} value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})} placeholder="Brief bio..." />
            <div style={{fontSize:11,color:"var(--text3)",fontFamily:"'DM Mono',monospace",background:"rgba(20,160,100,.07)",border:"1px solid rgba(20,160,100,.2)",borderRadius:8,padding:"7px 12px",marginBottom:12}}>
              🎓 This account will log in via the normal Sign In page. The Lecturer Portal will be available in their sidebar.
            </div>
            <div style={{display:"flex",gap:8}}>
              <button className="btn btn-accent" style={{flex:1,background:"#14a064",borderColor:"#14a064"}} onClick={save}>Save Lecturer</button>
              <button className="btn" onClick={()=>setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Admin Classes ────────────────────────────────────────────────────
function AdminClasses({ toast }) {
  const [classes, setClasses] = useState(()=>ls("nv-classes",DEFAULT_CLASSES));
  const [edit, setEdit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [pasteMode, setPasteMode] = useState(false);
  const [pasteText, setPasteText] = useState("");
  const [parsed, setParsed] = useState([]);
  const COLORS = ["#3E8E95","#5aada0","#facc15","#a78bfa","#f472b6","#fb923c","#4ade80","#f87171","#60a5fa"];
  const [form, setForm] = useState({id:"",label:"",desc:"",courses:"",color:"#3E8E95"});

  const parsePaste = () => {
    // Supports formats:
    // Line per class: "LABEL | Description | Course1, Course2"
    // Or just names, one per line
    const lines = pasteText.trim().split("\n").filter(l=>l.trim());
    const items = lines.map(line => {
      const parts = line.split("|").map(p=>p.trim());
      if (parts.length>=3) return { label:parts[0], desc:parts[1], courses:parts[2].split(",").map(c=>c.trim()).filter(Boolean) };
      if (parts.length===2) return { label:parts[0], desc:parts[1], courses:[] };
      return { label:parts[0], desc:`${parts[0]} Class`, courses:[] };
    });
    setParsed(items);
  };

  const importParsed = () => {
    const newItems = parsed.map((p,i)=>({
      id:`cls_${Date.now()}_${i}`, label:p.label, desc:p.desc,
      courses:p.courses, color:COLORS[i%COLORS.length]
    }));
    const u = [...classes, ...newItems]; setClasses(u); lsSet("nv-classes",u);
    toast(`${newItems.length} classes imported!`,"success"); setPasteText(""); setParsed([]); setPasteMode(false);
  };

  const save = () => {
    if (!form.label) return toast("Label required","error");
    const courses = form.courses.split(",").map(c=>c.trim()).filter(Boolean);
    if (edit) {
      const u = classes.map(c=>c.id===edit?{...c,...form,courses}:c); setClasses(u); lsSet("nv-classes",u); toast("Updated","success");
    } else {
      const item = {...form, id:`cls_${Date.now()}`, courses}; const u=[...classes,item]; setClasses(u); lsSet("nv-classes",u); toast("Class added","success");
    }
    setShowModal(false); setEdit(null); setForm({id:"",label:"",desc:"",courses:"",color:"#3E8E95"});
  };

  const del = (id) => { const u=classes.filter(c=>c.id!==id); setClasses(u); lsSet("nv-classes",u); toast("Deleted","success"); };

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:10}}>
        <div className="sec-title">🏫 Classes & Courses ({classes.length})</div>
        <div style={{display:"flex",gap:8}}>
          <button className="btn btn-success btn-sm" onClick={()=>setPasteMode(p=>!p)}>📋 Paste & Import</button>
          <button className="btn btn-purple" onClick={()=>{setShowModal(true);setEdit(null);setForm({id:"",label:"",desc:"",courses:"",color:"#3E8E95"});}}>+ Add Class</button>
        </div>
      </div>

      {pasteMode&&(
        <div className="card" style={{marginBottom:18}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,marginBottom:8}}>📋 Paste & Auto-Import Classes</div>
          <div style={{fontSize:12,color:"var(--text3)",fontFamily:"'DM Mono',monospace",marginBottom:8}}>Format: <b style={{color:"var(--accent)"}}>LABEL | Description | Course1, Course2, Course3</b><br/>Or just paste class names, one per line.</div>
          <textarea className="paste-box" placeholder={"BNSc 5 | Bachelor of Nursing Science Year Five | Advanced Research, Clinical Leadership, Thesis\nND THREE | National Diploma Year Three | Paediatrics, Community Health\nHND THREE | Higher National Diploma Year Three | Health Policy, Nursing Management"} value={pasteText} onChange={e=>setPasteText(e.target.value)} />
          <div style={{display:"flex",gap:8,marginBottom:parsed.length?10:0}}>
            <button className="btn btn-accent" onClick={parsePaste}>🔍 Parse</button>
            {parsed.length>0&&<button className="btn btn-success" onClick={importParsed}>✅ Import {parsed.length} Classes</button>}
            <button className="btn" onClick={()=>{setPasteMode(false);setParsed([]);setPasteText("");}}>Cancel</button>
          </div>
          {parsed.length>0&&(
            <div className="parse-preview">
              {parsed.map((p,i)=>(
                <div key={i} className="parse-item">
                  <span className="parse-check">✓</span>
                  <b>{p.label}</b> — {p.desc} — <span style={{color:"var(--text3)"}}>{p.courses.length} courses</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="grid2">
        {classes.map((c,i)=>(
          <div key={c.id} className="card" style={{borderLeft:`3px solid ${c.color}`,animation:`fadeUp .3s ease ${i*.04}s both`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
              <div>
                <span style={{display:"inline-block",background:`${c.color}20`,color:c.color,borderRadius:5,padding:"2px 8px",fontSize:10,fontFamily:"'DM Mono',monospace",marginBottom:6}}>{c.label}</span>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:15}}>{c.label}</div>
                <div style={{fontSize:12,color:"var(--text3)",marginTop:2}}>{c.desc}</div>
              </div>
              <div style={{display:"flex",gap:5,flexShrink:0}}>
                <button className="btn btn-sm" onClick={()=>{setEdit(c.id);setForm({...c,courses:c.courses.join(", ")});setShowModal(true);}}>✏️</button>
                <button className="btn btn-sm btn-danger" onClick={()=>del(c.id)}>🗑️</button>
              </div>
            </div>
            <div style={{fontSize:11,color:"var(--text3)",fontFamily:"'DM Mono',monospace"}}>{c.courses.length} courses: {c.courses.slice(0,3).join(", ")}{c.courses.length>3?` +${c.courses.length-3} more`:""}</div>
          </div>
        ))}
      </div>

      {showModal&&(
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-head"><div className="modal-title">{edit?"Edit Class":"Add Class"}</div><button className="modal-close" onClick={()=>setShowModal(false)}>✕</button></div>
            <label className="lbl">Label (e.g. BNSc 5)</label><input className="inp" value={form.label} onChange={e=>setForm({...form,label:e.target.value})} />
            <label className="lbl">Description</label><input className="inp" value={form.desc} onChange={e=>setForm({...form,desc:e.target.value})} />
            <label className="lbl">Courses (comma-separated)</label>
            <textarea className="inp" rows={3} style={{resize:"vertical"}} placeholder="Anatomy, Pharmacology, Nursing Theory..." value={form.courses} onChange={e=>setForm({...form,courses:e.target.value})} />
            <label className="lbl">Color</label>
            <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
              {COLORS.map(c=><div key={c} onClick={()=>setForm({...form,color:c})} style={{width:28,height:28,borderRadius:50,background:c,cursor:"pointer",border:form.color===c?"3px solid white":"3px solid transparent",transition:"all .2s"}} />)}
              <input type="color" value={form.color} onChange={e=>setForm({...form,color:e.target.value})} style={{width:28,height:28,border:"none",background:"none",cursor:"pointer",borderRadius:50}} />
            </div>
            <div style={{display:"flex",gap:8}}><button className="btn btn-purple" style={{flex:1}} onClick={save}>Save</button><button className="btn" onClick={()=>setShowModal(false)}>Cancel</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Admin Drugs ──────────────────────────────────────────────────────
function AdminDrugs({ toast }) {
  const [drugs, setDrugs] = useState(()=>ls("nv-drugs",DEFAULT_DRUGS));
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(null);
  const [pasteMode, setPasteMode] = useState(false);
  const [pasteText, setPasteText] = useState("");
  const [parsed, setParsed] = useState([]);
  const [search, setSearch] = useState("");
  const blank = {name:"",class:"",dose:"",max:"",uses:"",contraindications:"",side_effects:""};
  const [form, setForm] = useState(blank);

  const parsePaste = () => {
    // Format: DrugName | Class | Dose | MaxDose | Uses | Contraindications | SideEffects
    // Or just names
    const lines = pasteText.trim().split("\n").filter(l=>l.trim());
    const items = lines.map(line=>{
      const p = line.split("|").map(x=>x.trim());
      return { name:p[0]||"", class:p[1]||"", dose:p[2]||"", max:p[3]||"", uses:p[4]||"", contraindications:p[5]||"", side_effects:p[6]||"" };
    });
    setParsed(items);
  };

  const importParsed = () => {
    const items = parsed.map(p=>({...p,id:Date.now()+Math.random()}));
    const u=[...drugs,...items]; setDrugs(u); lsSet("nv-drugs",u);
    toast(`${items.length} drugs imported!`,"success"); setPasteText(""); setParsed([]); setPasteMode(false);
  };

  const save = () => {
    if (!form.name) return toast("Drug name required","error");
    let u;
    if (edit!==null) { u = drugs.map((d,i)=>i===edit?{...form,id:d.id}:d); toast("Updated","success"); }
    else { u = [...drugs,{...form,id:Date.now()}]; toast("Drug added","success"); }
    setDrugs(u); lsSet("nv-drugs",u); setShowModal(false); setEdit(null); setForm(blank);
  };

  const del = (id) => { const u=drugs.filter(d=>d.id!==id); setDrugs(u); lsSet("nv-drugs",u); toast("Deleted","success"); };
  const filtered = drugs.filter(d=>d.name.toLowerCase().includes(search.toLowerCase())||d.class.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:10}}>
        <div className="sec-title">💊 Drug Guide ({drugs.length} drugs)</div>
        <div style={{display:"flex",gap:8}}>
          <button className="btn btn-success btn-sm" onClick={()=>setPasteMode(p=>!p)}>📋 Paste</button>
          <button className="btn btn-purple" onClick={()=>{setShowModal(true);setEdit(null);setForm(blank);}}>+ Add Drug</button>
        </div>
      </div>

      {pasteMode&&(
        <div className="card" style={{marginBottom:18}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,marginBottom:6}}>📋 Paste Drugs</div>
          <div style={{fontSize:12,color:"var(--text3)",fontFamily:"'DM Mono',monospace",marginBottom:8}}>Format: <b style={{color:"var(--accent)"}}>Name | Class | Dose | MaxDose | Uses | Contraindications | SideEffects</b></div>
          <textarea className="paste-box" placeholder={"Aspirin | NSAID/Antiplatelet | 75-325mg daily | 4g/day | Pain, antiplatelet | Peptic ulcer, asthma | GI bleeding, Reye's syndrome\nFurosemide | Loop Diuretic | 20-80mg daily | 600mg/day | Oedema, heart failure | Allergy, anuria | Hypokalaemia, ototoxicity"} value={pasteText} onChange={e=>setPasteText(e.target.value)} />
          <div style={{display:"flex",gap:8,marginBottom:parsed.length?10:0}}>
            <button className="btn btn-accent" onClick={parsePaste}>🔍 Parse</button>
            {parsed.length>0&&<button className="btn btn-success" onClick={importParsed}>✅ Import {parsed.length}</button>}
            <button className="btn" onClick={()=>{setPasteMode(false);setParsed([]);setPasteText("");}}>Cancel</button>
          </div>
          {parsed.length>0&&<div className="parse-preview">{parsed.map((p,i)=><div key={i} className="parse-item"><span className="parse-check">✓</span><b>{p.name}</b> — {p.class||"No class"} — {p.dose||"No dose"}</div>)}</div>}
        </div>
      )}

      <div className="search-wrap"><span className="search-ico">🔍</span><input placeholder="Search drugs..." value={search} onChange={e=>setSearch(e.target.value)} /></div>
      <div className="card" style={{padding:0,overflow:"hidden"}}>
        <table className="tbl">
          <thead><tr><th>Drug Name</th><th>Class</th><th>Dose</th><th>Uses</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.map((d,i)=>(
              <tr key={d.id}>
                <td style={{fontWeight:700}}>{d.name}</td>
                <td><span className="tag">{d.class}</span></td>
                <td style={{fontSize:12,color:"var(--text3)"}}>{d.dose}</td>
                <td style={{fontSize:12,color:"var(--text2)",maxWidth:150}}>{d.uses}</td>
                <td><div className="tbl-actions">
                  <button className="btn btn-sm" onClick={()=>{setEdit(drugs.indexOf(d));setForm({...d});setShowModal(true);}}>✏️</button>
                  <button className="btn btn-sm btn-danger" onClick={()=>del(d.id)}>🗑️</button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal&&(
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-head"><div className="modal-title">{edit!==null?"Edit Drug":"Add Drug"}</div><button className="modal-close" onClick={()=>setShowModal(false)}>✕</button></div>
            {Object.keys(blank).map(k=>(
              <div key={k}><label className="lbl">{k.replace(/_/g," ")}</label><input className="inp" value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} placeholder={k==="name"?"e.g. Aspirin":k==="class"?"e.g. NSAID":""} /></div>
            ))}
            <div style={{display:"flex",gap:8}}><button className="btn btn-purple" style={{flex:1}} onClick={save}>Save</button><button className="btn" onClick={()=>setShowModal(false)}>Cancel</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Admin Labs ───────────────────────────────────────────────────────
function AdminLabs({ toast }) {
  const [labs, setLabs] = useState(()=>ls("nv-labs",DEFAULT_LABS));
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(null);
  const [pasteMode, setPasteMode] = useState(false);
  const [pasteText, setPasteText] = useState("");
  const [parsed, setParsed] = useState([]);
  const blank = {test:"",male:"",female:"",notes:""};
  const [form, setForm] = useState(blank);

  const parsePaste = () => {
    const lines = pasteText.trim().split("\n").filter(l=>l.trim());
    const items = lines.map(line=>{
      const p = line.split("|").map(x=>x.trim());
      return { test:p[0]||"", male:p[1]||p[0]||"", female:p[2]||p[1]||"", notes:p[3]||"" };
    });
    setParsed(items);
  };

  const importParsed = () => {
    const items = parsed.map(p=>({...p,id:Date.now()+Math.random()}));
    const u=[...labs,...items]; setLabs(u); lsSet("nv-labs",u);
    toast(`${items.length} lab tests imported!`,"success"); setPasteText(""); setParsed([]); setPasteMode(false);
  };

  const save = () => {
    if (!form.test) return toast("Test name required","error");
    let u;
    if (edit!==null) { u=labs.map((l,i)=>i===edit?{...form,id:l.id}:l); toast("Updated","success"); }
    else { u=[...labs,{...form,id:Date.now()}]; toast("Lab test added","success"); }
    setLabs(u); lsSet("nv-labs",u); setShowModal(false); setEdit(null); setForm(blank);
  };

  const del = (id) => { const u=labs.filter(l=>l.id!==id); setLabs(u); lsSet("nv-labs",u); toast("Deleted","success"); };

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:10}}>
        <div className="sec-title">🧪 Lab Reference ({labs.length} tests)</div>
        <div style={{display:"flex",gap:8}}>
          <button className="btn btn-success btn-sm" onClick={()=>setPasteMode(p=>!p)}>📋 Paste</button>
          <button className="btn btn-purple" onClick={()=>{setShowModal(true);setEdit(null);setForm(blank);}}>+ Add Test</button>
        </div>
      </div>

      {pasteMode&&(
        <div className="card" style={{marginBottom:18}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,marginBottom:6}}>📋 Paste Lab Values</div>
          <div style={{fontSize:12,color:"var(--text3)",fontFamily:"'DM Mono',monospace",marginBottom:8}}>Format: <b style={{color:"var(--accent)"}}>Test Name | Male Range | Female Range | Notes</b></div>
          <textarea className="paste-box" placeholder={"Bilirubin (Total) | 0-17 μmol/L | 0-17 μmol/L | Elevated in jaundice\nAST | 10-40 U/L | 10-35 U/L | Liver enzyme"} value={pasteText} onChange={e=>setPasteText(e.target.value)} />
          <div style={{display:"flex",gap:8,marginBottom:parsed.length?10:0}}>
            <button className="btn btn-accent" onClick={parsePaste}>🔍 Parse</button>
            {parsed.length>0&&<button className="btn btn-success" onClick={importParsed}>✅ Import {parsed.length}</button>}
            <button className="btn" onClick={()=>{setPasteMode(false);setParsed([]);setPasteText("");}}>Cancel</button>
          </div>
          {parsed.length>0&&<div className="parse-preview">{parsed.map((p,i)=><div key={i} className="parse-item"><span className="parse-check">✓</span><b>{p.test}</b> — M: {p.male} — F: {p.female}</div>)}</div>}
        </div>
      )}

      <div className="card" style={{padding:0,overflow:"hidden"}}>
        <table className="tbl">
          <thead><tr><th>Test</th><th>Male</th><th>Female</th><th>Notes</th><th>Actions</th></tr></thead>
          <tbody>
            {labs.map((l,i)=>(
              <tr key={l.id}>
                <td style={{fontWeight:700}}>{l.test}</td>
                <td style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:"var(--accent)"}}>{l.male}</td>
                <td style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:"var(--accent2)"}}>{l.female}</td>
                <td style={{fontSize:12,color:"var(--text3)"}}>{l.notes}</td>
                <td><div className="tbl-actions">
                  <button className="btn btn-sm" onClick={()=>{setEdit(i);setForm({...l});setShowModal(true);}}>✏️</button>
                  <button className="btn btn-sm btn-danger" onClick={()=>del(l.id)}>🗑️</button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal&&(
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-head"><div className="modal-title">{edit!==null?"Edit":"Add"} Lab Test</div><button className="modal-close" onClick={()=>setShowModal(false)}>✕</button></div>
            <label className="lbl">Test Name</label><input className="inp" value={form.test} onChange={e=>setForm({...form,test:e.target.value})} />
            <div className="form-row">
              <div><label className="lbl">Male Range</label><input className="inp" value={form.male} onChange={e=>setForm({...form,male:e.target.value})} /></div>
              <div><label className="lbl">Female Range</label><input className="inp" value={form.female} onChange={e=>setForm({...form,female:e.target.value})} /></div>
            </div>
            <label className="lbl">Notes</label><input className="inp" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} />
            <div style={{display:"flex",gap:8}}><button className="btn btn-purple" style={{flex:1}} onClick={save}>Save</button><button className="btn" onClick={()=>setShowModal(false)}>Cancel</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Admin Past Questions ─────────────────────────────────────────────
function AdminPQ({ toast }) {
  const [banks, setBanks] = React.useState(()=>ls("nv-pq",DEFAULT_PQ));
  const [selBank, setSelBank] = React.useState(null);
  const [showBankModal, setShowBankModal] = React.useState(false);
  const [showQModal, setShowQModal] = React.useState(false);
  const [editBank, setEditBank] = React.useState(null);
  const [editQ, setEditQ] = React.useState(null);
  const [pasteOpen, setPasteOpen] = React.useState(false);
  const [pasteText, setPasteText] = React.useState("");
  const [parsed, setParsed] = React.useState([]);
  const [warnings, setWarnings] = React.useState([]);
  const [destination, setDestination] = React.useState("existing");
  const [newSubject, setNewSubject] = React.useState("");
  const [newYear, setNewYear] = React.useState("");
  const [bankForm, setBankForm] = React.useState({subject:"",year:""});
  const [qForm, setQForm] = React.useState({q:"",options:["","","",""],ans:0});

  const saveBanks = (u) => { setBanks(u); lsSet("nv-pq", u); };

  const autoParse = () => {
    const text = pasteText.trim();
    if (!text) return toast("Paste some questions first","error");
    const warns = [], items = [];

    // Split by blank lines first, fall back to numbered splits
    let blocks = text.split(/\n\s*\n/).map(b=>b.trim()).filter(Boolean);
    if (blocks.length < 2) {
      blocks = text.split(/(?=^\s*\d+[.)]\s)/m).map(b=>b.trim()).filter(Boolean);
    }
    if (blocks.length < 1) blocks = [text];

    blocks.forEach((block, bi) => {
      const lines = block.split("\n").map(l=>l.trim()).filter(Boolean);
      if (!lines.length) return;
      let q="", opts=["","","",""], ans=-1;

      const hasQLabel = lines.some(l=>/^q:/i.test(l));
      if (hasQLabel) {
        lines.forEach(l => {
          if (/^q:/i.test(l))        q       = l.slice(2).trim();
          else if (/^a:/i.test(l))   opts[0] = l.slice(2).trim();
          else if (/^b:/i.test(l))   opts[1] = l.slice(2).trim();
          else if (/^c:/i.test(l))   opts[2] = l.slice(2).trim();
          else if (/^d:/i.test(l))   opts[3] = l.slice(2).trim();
          else if (/^ans(wer)?:/i.test(l)) {
            const a = l.replace(/^ans(wer)?:\s*/i,"").trim()[0].toUpperCase();
            ans = "ABCD".indexOf(a);
          }
        });
      } else {
        q = lines[0].replace(/^\s*\d+[.)]\s*/,"").trim();
        const optRe = /^[([]?([A-Da-d])[.):\]]\s+(.+)/;
        const ansRe = /^(?:ans(?:wer)?|correct(?:\s+answer)?|key)\s*[:\-]?\s*([A-Da-d])/i;
        for (let i=1; i<lines.length; i++) {
          const am = lines[i].match(ansRe);
          if (am) { ans = "ABCDabcd".indexOf(am[1]) % 4; continue; }
          const om = lines[i].match(optRe);
          if (om) { const idx="ABCDabcd".indexOf(om[1])%4; if(idx>=0) opts[idx]=om[2].trim(); }
        }
        if (ans < 0) {
          const em = block.match(/(?:ans(?:wer)?|correct)\s*(?:is|[:=])\s*[([]?([A-Da-d])[)\]]?/i);
          if (em) ans = "ABCDabcd".indexOf(em[1]) % 4;
        }
      }
      q = q.replace(/^\s*\d+[.)]\s*/,"").trim();
      if (!q) { warns.push(`Block ${bi+1}: no question found, skipped`); return; }
      if (opts.every(o=>!o)) { warns.push(`Block ${bi+1}: no options found, using placeholders`); opts=["Option A","Option B","Option C","Option D"]; }
      if (ans<0) { warns.push(`Block ${bi+1}: no answer found, defaulted to A`); ans=0; }
      items.push({q, options:opts, ans});
    });

    setParsed(items);
    setWarnings(warns);
    if (!items.length) return toast("No questions parsed. Check format.","error");
    toast(`Parsed ${items.length} question${items.length>1?"s":""}${warns.length?` (${warns.length} warnings)`:""}`, warns.length?"warn":"success");
  };

  const doImport = () => {
    if (!parsed.length) return;
    let u;
    if (destination === "new") {
      const subj = newSubject.trim() || "Imported Questions";
      const yr = newYear.trim() || String(new Date().getFullYear());
      const nb = {id:Date.now(), subject:subj, year:yr, questions:parsed.map(p=>({...p}))};
      u = [...banks, nb];
      setSelBank(nb.id);
      toast(`Bank "${subj}" created with ${parsed.length} questions!`, "success");
    } else {
      if (!selBank) return toast("Select a bank first","error");
      u = banks.map(b=>b.id===selBank?{...b,questions:[...b.questions,...parsed.map(p=>({...p}))]}:b);
      toast(`${parsed.length} questions imported!`, "success");
    }
    saveBanks(u);
    setPasteText(""); setParsed([]); setWarnings([]); setPasteOpen(false);
    setNewSubject(""); setNewYear("");
  };

  const saveBank = () => {
    if (!bankForm.subject) return toast("Subject required","error");
    let u = editBank!==null
      ? banks.map((b,i)=>i===editBank?{...b,...bankForm}:b)
      : [...banks,{...bankForm,id:Date.now(),questions:[]}];
    saveBanks(u);
    toast(editBank!==null?"Updated":"Bank created","success");
    setShowBankModal(false); setEditBank(null); setBankForm({subject:"",year:""});
  };

  const delBank = (id) => {
    saveBanks(banks.filter(b=>b.id!==id));
    if (selBank===id) setSelBank(null);
    toast("Deleted","success");
  };

  const saveQ = () => {
    if (!qForm.q) return toast("Question required","error");
    const u = banks.map(b=>{
      if (b.id!==selBank) return b;
      const qs = editQ!==null
        ? b.questions.map((q,i)=>i===editQ?{...qForm}:q)
        : [...b.questions,{...qForm}];
      toast(editQ!==null?"Updated":"Added","success");
      return {...b,questions:qs};
    });
    saveBanks(u);
    setShowQModal(false); setEditQ(null); setQForm({q:"",options:["","","",""],ans:0});
  };

  const delQ = (bankId, qi) => {
    saveBanks(banks.map(b=>b.id===bankId?{...b,questions:b.questions.filter((_,i)=>i!==qi)}:b));
    toast("Deleted","success");
  };

  const cur = banks.find(b=>b.id===selBank);

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:10}}>
        <div>
          <div className="sec-title">Past Questions ({banks.length})</div>
          <div className="sec-sub">Create banks and manage question sets</div>
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          <button className="btn btn-success" onClick={()=>{setPasteOpen(o=>!o);setParsed([]);setWarnings([]);setPasteText("");}}>
            {pasteOpen?"✕ Close":"📋 Paste & Auto-Parse"}
          </button>
          <button className="btn btn-purple" onClick={()=>{setShowBankModal(true);setEditBank(null);setBankForm({subject:"",year:""});}}>+ New Bank</button>
        </div>
      </div>

      {pasteOpen && (
        <div className="card" style={{marginBottom:20,borderColor:"var(--accent)",borderWidth:2}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:15,marginBottom:4}}>📋 Paste & Auto-Parse Questions</div>
          <div style={{fontSize:11,color:"var(--text3)",fontFamily:"'DM Mono',monospace",marginBottom:10,lineHeight:1.7}}>
            Paste in any format. Supports labeled blocks (Q:/ANS:), numbered lists (1.), lettered options (A. A) A:).
          </div>

          <div style={{background:"var(--bg4)",borderRadius:8,padding:"10px 12px",marginBottom:10,fontSize:11,fontFamily:"'DM Mono',monospace",color:"var(--text3)",lineHeight:1.8}}>
            <span style={{color:"var(--accent)"}}>Format 1:</span> Q: ... / A: / B: / C: / D: / ANS: B
            {"  |  "}
            <span style={{color:"var(--accent)"}}>Format 2:</span> 1. Question / A) opt / Answer: A
            {"  |  "}
            <span style={{color:"var(--accent)"}}>Format 3:</span> 1. Question / A. opt / Correct: C
          </div>

          <textarea
            className="paste-box"
            rows={10}
            placeholder={"Paste questions here (any format):\n\n1. Antidote for paracetamol overdose?\nA) Naloxone\nB) Flumazenil\nC) N-Acetylcysteine\nD) Atropine\nAnswer: C\n\n2. Normal adult heart rate:\nA. 40-60 bpm\nB. 60-100 bpm\nC. 100-120 bpm\nD. 120-140 bpm\nANS: B"}
            value={pasteText}
            onChange={e=>{setPasteText(e.target.value);setParsed([]);setWarnings([]);}}
          />

          <div style={{background:"var(--bg4)",borderRadius:8,padding:"12px",marginBottom:10,border:"1px solid var(--border)"}}>
            <div style={{fontSize:10,color:"var(--text3)",fontFamily:"'DM Mono',monospace",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>Import to</div>
            <div style={{display:"flex",gap:16,marginBottom:8}}>
              <label style={{display:"flex",alignItems:"center",gap:6,cursor:"pointer",fontSize:13}}>
                <input type="radio" checked={destination==="existing"} onChange={()=>setDestination("existing")} />
                Existing bank
              </label>
              <label style={{display:"flex",alignItems:"center",gap:6,cursor:"pointer",fontSize:13}}>
                <input type="radio" checked={destination==="new"} onChange={()=>setDestination("new")} />
                New bank
              </label>
            </div>
            {destination==="existing" ? (
              <select className="inp" style={{marginBottom:0}} value={selBank||""} onChange={e=>setSelBank(e.target.value||null)}>
                <option value="">— Select a bank —</option>
                {banks.map(b=><option key={b.id} value={b.id}>{b.subject} ({b.year||"—"}) · {b.questions.length}q</option>)}
              </select>
            ) : (
              <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                <div style={{flex:2,minWidth:160}}>
                  <label className="lbl">Bank Name</label>
                  <input className="inp" style={{marginBottom:0}} placeholder="e.g. Pharmacology 2024" value={newSubject} onChange={e=>setNewSubject(e.target.value)}/>
                </div>
                <div style={{flex:1,minWidth:90}}>
                  <label className="lbl">Year</label>
                  <input className="inp" style={{marginBottom:0}} placeholder="2024" value={newYear} onChange={e=>setNewYear(e.target.value)}/>
                </div>
              </div>
            )}
          </div>

          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <button className="btn btn-accent" style={{flex:1}} onClick={autoParse}>🔍 Parse Questions</button>
            {parsed.length>0 && (
              <button className="btn btn-success" style={{flex:1}} onClick={doImport}>
                ✅ Import {parsed.length} Q{parsed.length>1?"s":""}
              </button>
            )}
            <button className="btn" onClick={()=>{setPasteOpen(false);setParsed([]);setWarnings([]);setPasteText("");}}>Cancel</button>
          </div>

          {parsed.length>0 && (
            <div style={{marginTop:12}}>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"var(--success)",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6}}>
                ✅ {parsed.length} question{parsed.length>1?"s":""} parsed
              </div>
              <div style={{maxHeight:220,overflowY:"auto",border:"1px solid var(--border)",borderRadius:8}}>
                {parsed.map((p,i)=>(
                  <div key={i} style={{padding:"8px 12px",borderBottom:"1px solid var(--border)",fontSize:12}}>
                    <div style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:5}}>
                      <span style={{color:"var(--success)",fontSize:11,marginTop:1}}>✓</span>
                      <span style={{flex:1,fontWeight:600,lineHeight:1.4}}>{i+1}. {p.q}</span>
                      <span style={{fontSize:10,padding:"1px 6px",borderRadius:4,background:"rgba(74,222,128,.15)",border:"1px solid var(--success)",color:"var(--success)",fontFamily:"'DM Mono',monospace",flexShrink:0}}>
                        ANS: {"ABCD"[p.ans]}
                      </span>
                    </div>
                    <div style={{paddingLeft:18,display:"flex",flexWrap:"wrap",gap:4}}>
                      {p.options.map((o,oi)=>(
                        <span key={oi} style={{fontSize:10,padding:"1px 7px",borderRadius:4,
                          background:oi===p.ans?"rgba(74,222,128,.12)":"var(--bg4)",
                          border:`1px solid ${oi===p.ans?"var(--success)":"var(--border)"}`,
                          color:oi===p.ans?"var(--success)":"var(--text3)",fontFamily:"'DM Mono',monospace"}}>
                          {"ABCD"[oi]}. {o||"—"}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {warnings.length>0 && (
            <div style={{marginTop:8,background:"rgba(251,146,60,.08)",border:"1px solid rgba(251,146,60,.25)",borderRadius:8,padding:"8px 12px"}}>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"var(--warn)",marginBottom:4}}>⚠️ {warnings.length} warning{warnings.length>1?"s":""}</div>
              {warnings.map((w,i)=><div key={i} style={{fontSize:11,color:"var(--warn)",fontFamily:"'DM Mono',monospace"}}>• {w}</div>)}
            </div>
          )}
        </div>
      )}

      {banks.length===0 && !pasteOpen && (
        <div style={{textAlign:"center",padding:"50px 20px",color:"var(--text3)"}}>
          <div style={{fontSize:48,marginBottom:12}}>❓</div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:13}}>No question banks yet.</div>
        </div>
      )}

      <div className="grid2" style={{marginBottom:20}}>
        {banks.map((b,i)=>(
          <div key={b.id} className="card" style={{cursor:"pointer",border:selBank===b.id?"1.5px solid var(--purple)":"1px solid var(--border)",transition:"border .15s",animation:`fadeUp .3s ease ${i*.05}s both`}} onClick={()=>setSelBank(b.id)}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div style={{flex:1}}>
                {selBank===b.id&&<div style={{fontSize:9,fontFamily:"'DM Mono',monospace",color:"var(--purple)",marginBottom:2,letterSpacing:"0.1em"}}>● SELECTED</div>}
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:14}}>{b.subject}</div>
                <div style={{fontSize:11,color:"var(--text3)",marginTop:2}}>{b.year||"—"} · {b.questions.length} question{b.questions.length!==1?"s":""}</div>
              </div>
              <div style={{display:"flex",gap:4,flexShrink:0}}>
                <button className="btn btn-sm" onClick={e=>{e.stopPropagation();setEditBank(i);setBankForm({subject:b.subject,year:b.year||""});setShowBankModal(true);}}>✏️</button>
                <button className="btn btn-sm btn-danger" onClick={e=>{e.stopPropagation();delBank(b.id);}}>🗑️</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {cur && (
        <div className="card">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,flexWrap:"wrap",gap:8}}>
            <div>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:15}}>{cur.subject}</div>
              <div style={{fontSize:11,color:"var(--text3)",fontFamily:"'DM Mono',monospace"}}>{cur.questions.length} question{cur.questions.length!==1?"s":""} · {cur.year||"—"}</div>
            </div>
            <button className="btn btn-purple btn-sm" onClick={()=>{setShowQModal(true);setEditQ(null);setQForm({q:"",options:["","","",""],ans:0});}}>+ Add Question</button>
          </div>

          {cur.questions.length===0&&(
            <div style={{textAlign:"center",padding:"24px",color:"var(--text3)",fontFamily:"'DM Mono',monospace",fontSize:12}}>
              No questions yet. Use Paste above or Add Question.
            </div>
          )}

          {cur.questions.map((q,qi)=>(
            <div key={qi} className="card2" style={{marginBottom:8}}>
              <div style={{display:"flex",justifyContent:"space-between",gap:10}}>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600,fontSize:13,marginBottom:7,lineHeight:1.5}}>{qi+1}. {q.q}</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                    {q.options.map((opt,oi)=>(
                      <span key={oi} style={{fontSize:11,padding:"3px 9px",borderRadius:5,
                        background:oi===q.ans?"rgba(74,222,128,.15)":"rgba(255,255,255,.04)",
                        border:`1px solid ${oi===q.ans?"var(--success)":"var(--border)"}`,
                        color:oi===q.ans?"var(--success)":"var(--text3)"}}>
                        {"ABCD"[oi]}. {opt} {oi===q.ans?"✓":""}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{display:"flex",gap:4,flexShrink:0}}>
                  <button className="btn btn-sm" onClick={()=>{setEditQ(qi);setQForm({...q,options:[...q.options]});setShowQModal(true);}}>✏️</button>
                  <button className="btn btn-sm btn-danger" onClick={()=>delQ(cur.id,qi)}>🗑️</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showBankModal&&(
        <div className="modal-overlay" onClick={()=>setShowBankModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-head"><div className="modal-title">{editBank!==null?"Edit":"New"} Question Bank</div><button className="modal-close" onClick={()=>setShowBankModal(false)}>✕</button></div>
            <label className="lbl">Subject</label>
            <input className="inp" value={bankForm.subject} onChange={e=>setBankForm({...bankForm,subject:e.target.value})} placeholder="e.g. Medical-Surgical Nursing"/>
            <label className="lbl">Year</label>
            <input className="inp" value={bankForm.year} onChange={e=>setBankForm({...bankForm,year:e.target.value})} placeholder="e.g. 2024"/>
            <div style={{display:"flex",gap:8}}>
              <button className="btn btn-purple" style={{flex:1}} onClick={saveBank}>Save</button>
              <button className="btn" onClick={()=>setShowBankModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showQModal&&(
        <div className="modal-overlay" onClick={()=>setShowQModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-head"><div className="modal-title">{editQ!==null?"Edit":"Add"} Question</div><button className="modal-close" onClick={()=>setShowQModal(false)}>✕</button></div>
            <label className="lbl">Question</label>
            <textarea className="inp" rows={3} style={{resize:"vertical"}} value={qForm.q} onChange={e=>setQForm({...qForm,q:e.target.value})} placeholder="Enter the question..."/>
            {["A","B","C","D"].map((l,i)=>(
              <div key={l}>
                <label className="lbl">Option {l}</label>
                <input className="inp" value={qForm.options[i]} placeholder={`Option ${l}...`} onChange={e=>{const o=[...qForm.options];o[i]=e.target.value;setQForm({...qForm,options:o});}}/>
              </div>
            ))}
            <label className="lbl">Correct Answer</label>
            <select className="inp" value={qForm.ans} onChange={e=>setQForm({...qForm,ans:+e.target.value})}>
              {["A","B","C","D"].map((l,i)=><option key={l} value={i}>{l}: {qForm.options[i]||`Option ${l}`}</option>)}
            </select>
            <div style={{display:"flex",gap:8}}>
              <button className="btn btn-purple" style={{flex:1}} onClick={saveQ}>Save</button>
              <button className="btn" onClick={()=>setShowQModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


// ── Admin Flashcards ─────────────────────────────────────────────────
function AdminFlashcards({ toast }) {
  const [decks, setDecks] = useState(()=>ls("nv-decks",DEFAULT_DECKS));
  const [selDeck, setSelDeck] = useState(null);
  const [showDeckModal, setShowDeckModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [editDeck, setEditDeck] = useState(null);
  const [editCard, setEditCard] = useState(null);
  const [pasteMode, setPasteMode] = useState(false);
  const [pasteText, setPasteText] = useState("");
  const [parsed, setParsed] = useState([]);
  const [deckForm, setDeckForm] = useState({name:""});
  const [cardForm, setCardForm] = useState({front:"",back:""});

  const parsePaste = () => {
    // Front | Back  (one per line)
    const lines = pasteText.trim().split("\n").filter(l=>l.trim());
    const items = lines.map(line=>{
      const p = line.split("|").map(x=>x.trim());
      return { front:p[0]||"", back:p[1]||"" };
    }).filter(c=>c.front);
    setParsed(items);
  };

  const importParsed = () => {
    if (!selDeck) return toast("Select a deck first","error");
    const items = parsed.map(p=>({...p,id:Date.now()+Math.random()}));
    const u = decks.map(d=>d.id===selDeck?{...d,cards:[...d.cards,...items]}:d);
    setDecks(u); lsSet("nv-decks",u); toast(`${items.length} cards imported!`,"success"); setPasteText(""); setParsed([]); setPasteMode(false);
  };

  const saveDeck = () => {
    if (!deckForm.name) return toast("Name required","error");
    let u;
    if (editDeck!==null) { u=decks.map(d=>d.id===editDeck?{...d,...deckForm}:d); toast("Updated","success"); }
    else { u=[...decks,{...deckForm,id:`deck_${Date.now()}`,cards:[]}]; toast("Deck created","success"); }
    setDecks(u); lsSet("nv-decks",u); setShowDeckModal(false); setEditDeck(null); setDeckForm({name:""});
  };

  const delDeck = (id) => { const u=decks.filter(d=>d.id!==id); setDecks(u); lsSet("nv-decks",u); if(selDeck===id)setSelDeck(null); toast("Deleted","success"); };

  const saveCard = () => {
    if (!cardForm.front) return toast("Front required","error");
    const u = decks.map(d=>{
      if (d.id!==selDeck) return d;
      let cards;
      if (editCard!==null) { cards=d.cards.map((c,i)=>i===editCard?{...cardForm,id:c.id}:c); toast("Updated","success"); }
      else { cards=[...d.cards,{...cardForm,id:Date.now()}]; toast("Card added","success"); }
      return {...d,cards};
    });
    setDecks(u); lsSet("nv-decks",u); setShowCardModal(false); setEditCard(null); setCardForm({front:"",back:""});
  };

  const delCard = (deckId, cardIdx) => { const u=decks.map(d=>d.id===deckId?{...d,cards:d.cards.filter((_,i)=>i!==cardIdx)}:d); setDecks(u); lsSet("nv-decks",u); toast("Deleted","success"); };
  const currentDeck = decks.find(d=>d.id===selDeck);

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:10}}>
        <div className="sec-title">🃏 Flashcard Decks ({decks.length})</div>
        <button className="btn btn-purple" onClick={()=>{setShowDeckModal(true);setEditDeck(null);setDeckForm({name:""});}}>+ New Deck</button>
      </div>

      <div className="grid3" style={{marginBottom:20}}>
        {decks.map(d=>(
          <div key={d.id} className="card" style={{cursor:"pointer",border:selDeck===d.id?"1px solid var(--purple)":"1px solid var(--border)"}} onClick={()=>setSelDeck(d.id)}>
            <div style={{display:"flex",justifyContent:"space-between"}}>
              <div>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:15}}>{d.name}</div>
                <div style={{fontSize:12,color:"var(--text3)",marginTop:3}}>{d.cards.length} cards</div>
              </div>
              <div style={{display:"flex",gap:5}}>
                <button className="btn btn-sm" onClick={e=>{e.stopPropagation();setEditDeck(d.id);setDeckForm({name:d.name});setShowDeckModal(true);}}>✏️</button>
                <button className="btn btn-sm btn-danger" onClick={e=>{e.stopPropagation();delDeck(d.id);}}>🗑️</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {currentDeck&&(
        <div className="card">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:8}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700}}>{currentDeck.name} — Cards ({currentDeck.cards.length})</div>
            <div style={{display:"flex",gap:8}}>
              <button className="btn btn-success btn-sm" onClick={()=>setPasteMode(p=>!p)}>📋 Paste</button>
              <button className="btn btn-purple btn-sm" onClick={()=>{setShowCardModal(true);setEditCard(null);setCardForm({front:"",back:""});}}>+ Add Card</button>
            </div>
          </div>

          {pasteMode&&(
            <div style={{marginBottom:16}}>
              <div style={{fontSize:12,color:"var(--text3)",fontFamily:"'DM Mono',monospace",marginBottom:8}}>Format: <b style={{color:"var(--accent)"}}>Front text | Back text</b> (one card per line)</div>
              <textarea className="paste-box" placeholder={"Normal adult SpO2 | 95-100%\nNormal adult temperature | 36.1-37.2°C\nGlasgow Coma Scale max score | 15"} value={pasteText} onChange={e=>setPasteText(e.target.value)} />
              <div style={{display:"flex",gap:8,marginBottom:parsed.length?10:0}}>
                <button className="btn btn-accent" onClick={parsePaste}>🔍 Parse</button>
                {parsed.length>0&&<button className="btn btn-success" onClick={importParsed}>✅ Import {parsed.length}</button>}
                <button className="btn" onClick={()=>{setPasteMode(false);setParsed([]);setPasteText("");}}>Cancel</button>
              </div>
              {parsed.length>0&&<div className="parse-preview">{parsed.map((p,i)=><div key={i} className="parse-item"><span className="parse-check">✓</span><b>{p.front}</b> → {p.back}</div>)}</div>}
            </div>
          )}

          <div className="grid2">
            {currentDeck.cards.map((c,ci)=>(
              <div key={c.id||ci} className="card2">
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                  <div style={{flex:1}}>
                    <div style={{fontSize:12,color:"var(--text3)",fontFamily:"'DM Mono',monospace",marginBottom:3}}>FRONT</div>
                    <div style={{fontWeight:600,fontSize:13,marginBottom:8}}>{c.front}</div>
                    <div style={{fontSize:12,color:"var(--text3)",fontFamily:"'DM Mono',monospace",marginBottom:3}}>BACK</div>
                    <div style={{fontSize:13,color:"var(--accent)"}}>{c.back}</div>
                  </div>
                  <div style={{display:"flex",gap:4,flexShrink:0}}>
                    <button className="btn btn-sm" onClick={()=>{setEditCard(ci);setCardForm({front:c.front,back:c.back});setShowCardModal(true);}}>✏️</button>
                    <button className="btn btn-sm btn-danger" onClick={()=>delCard(currentDeck.id,ci)}>🗑️</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showDeckModal&&(
        <div className="modal-overlay" onClick={()=>setShowDeckModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-head"><div className="modal-title">{editDeck?"Edit":"New"} Deck</div><button className="modal-close" onClick={()=>setShowDeckModal(false)}>✕</button></div>
            <label className="lbl">Deck Name</label><input className="inp" value={deckForm.name} onChange={e=>setDeckForm({name:e.target.value})} placeholder="e.g. Cardiology Drugs" />
            <div style={{display:"flex",gap:8}}><button className="btn btn-purple" style={{flex:1}} onClick={saveDeck}>Save</button><button className="btn" onClick={()=>setShowDeckModal(false)}>Cancel</button></div>
          </div>
        </div>
      )}

      {showCardModal&&(
        <div className="modal-overlay" onClick={()=>setShowCardModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-head"><div className="modal-title">{editCard!==null?"Edit":"Add"} Card</div><button className="modal-close" onClick={()=>setShowCardModal(false)}>✕</button></div>
            <label className="lbl">Front (Question)</label><textarea className="inp" rows={3} style={{resize:"vertical"}} value={cardForm.front} onChange={e=>setCardForm({...cardForm,front:e.target.value})} />
            <label className="lbl">Back (Answer)</label><textarea className="inp" rows={3} style={{resize:"vertical"}} value={cardForm.back} onChange={e=>setCardForm({...cardForm,back:e.target.value})} />
            <div style={{display:"flex",gap:8}}><button className="btn btn-purple" style={{flex:1}} onClick={saveCard}>Save</button><button className="btn" onClick={()=>setShowCardModal(false)}>Cancel</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Admin Dictionary ─────────────────────────────────────────────────
function AdminDictionary({ toast }) {
  const [dict, setDict] = useState(()=>ls("nv-dict",DEFAULT_DICT));
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(null);
  const [pasteMode, setPasteMode] = useState(false);
  const [pasteText, setPasteText] = useState("");
  const [parsed, setParsed] = useState([]);
  const [form, setForm] = useState({term:"",def:""});
  const [search, setSearch] = useState("");

  const parsePaste = () => {
    const lines = pasteText.trim().split("\n").filter(l=>l.trim());
    const items = lines.map(line=>{
      const idx = line.indexOf("|");
      if (idx>-1) return {term:line.slice(0,idx).trim(),def:line.slice(idx+1).trim()};
      const idx2 = line.indexOf(":");
      if (idx2>-1) return {term:line.slice(0,idx2).trim(),def:line.slice(idx2+1).trim()};
      return {term:line.trim(),def:""};
    }).filter(x=>x.term);
    setParsed(items);
  };

  const importParsed = () => {
    const items = parsed.map(p=>({...p,id:Date.now()+Math.random()}));
    const u=[...dict,...items]; setDict(u); lsSet("nv-dict",u);
    toast(`${items.length} terms imported!`,"success"); setPasteText(""); setParsed([]); setPasteMode(false);
  };

  const save = () => {
    if (!form.term) return toast("Term required","error");
    let u;
    if (edit!==null) { u=dict.map((d,i)=>i===edit?{...form,id:d.id}:d); toast("Updated","success"); }
    else { u=[...dict,{...form,id:Date.now()}]; toast("Term added","success"); }
    setDict(u); lsSet("nv-dict",u); setShowModal(false); setEdit(null); setForm({term:"",def:""});
  };

  const del = (id) => { const u=dict.filter(d=>d.id!==id); setDict(u); lsSet("nv-dict",u); toast("Deleted","success"); };
  const filtered = dict.filter(d=>d.term.toLowerCase().includes(search.toLowerCase())||d.def.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:10}}>
        <div className="sec-title">📖 Dictionary ({dict.length} terms)</div>
        <div style={{display:"flex",gap:8}}>
          <button className="btn btn-success btn-sm" onClick={()=>setPasteMode(p=>!p)}>📋 Paste</button>
          <button className="btn btn-purple" onClick={()=>{setShowModal(true);setEdit(null);setForm({term:"",def:""});}}>+ Add Term</button>
        </div>
      </div>

      {pasteMode&&(
        <div className="card" style={{marginBottom:18}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,marginBottom:6}}>📋 Paste Dictionary Terms</div>
          <div style={{fontSize:12,color:"var(--text3)",fontFamily:"'DM Mono',monospace",marginBottom:8}}>Format: <b style={{color:"var(--accent)"}}>Term | Definition</b> or <b style={{color:"var(--accent)"}}>Term: Definition</b> (one per line)</div>
          <textarea className="paste-box" placeholder={"Haemoptysis | Coughing up blood from the respiratory tract\nTachypnoea: Abnormally rapid breathing rate above 20 breaths/min\nOliguria | Reduced urine output below 400mL/day in adults"} value={pasteText} onChange={e=>setPasteText(e.target.value)} />
          <div style={{display:"flex",gap:8,marginBottom:parsed.length?10:0}}>
            <button className="btn btn-accent" onClick={parsePaste}>🔍 Parse</button>
            {parsed.length>0&&<button className="btn btn-success" onClick={importParsed}>✅ Import {parsed.length}</button>}
            <button className="btn" onClick={()=>{setPasteMode(false);setParsed([]);setPasteText("");}}>Cancel</button>
          </div>
          {parsed.length>0&&<div className="parse-preview">{parsed.map((p,i)=><div key={i} className="parse-item"><span className="parse-check">✓</span><b style={{color:"var(--accent)"}}>{p.term}</b> — {p.def}</div>)}</div>}
        </div>
      )}

      <div className="search-wrap"><span className="search-ico">🔍</span><input placeholder="Search terms..." value={search} onChange={e=>setSearch(e.target.value)} /></div>
      <div className="card" style={{padding:0,overflow:"hidden"}}>
        <table className="tbl">
          <thead><tr><th>Term</th><th>Definition</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.map((d,i)=>(
              <tr key={d.id}>
                <td style={{fontFamily:"'Syne',sans-serif",fontWeight:700,color:"var(--accent)",width:200}}>{d.term}</td>
                <td style={{fontSize:13,color:"var(--text2)"}}>{d.def}</td>
                <td style={{width:90}}><div className="tbl-actions">
                  <button className="btn btn-sm" onClick={()=>{setEdit(i);setForm({term:d.term,def:d.def});setShowModal(true);}}>✏️</button>
                  <button className="btn btn-sm btn-danger" onClick={()=>del(d.id)}>🗑️</button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal&&(
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-head"><div className="modal-title">{edit!==null?"Edit":"Add"} Term</div><button className="modal-close" onClick={()=>setShowModal(false)}>✕</button></div>
            <label className="lbl">Term</label><input className="inp" value={form.term} onChange={e=>setForm({...form,term:e.target.value})} placeholder="e.g. Dyspnoea" />
            <label className="lbl">Definition</label><textarea className="inp" rows={3} style={{resize:"vertical"}} value={form.def} onChange={e=>setForm({...form,def:e.target.value})} placeholder="Clear medical definition..." />
            <div style={{display:"flex",gap:8}}><button className="btn btn-purple" style={{flex:1}} onClick={save}>Save</button><button className="btn" onClick={()=>setShowModal(false)}>Cancel</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Admin Skills ─────────────────────────────────────────────────────
function AdminSkills({ toast }) {
  const [skills, setSkills] = useState(()=>ls("nv-skillsdb",DEFAULT_SKILLS));
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(null);
  const [pasteMode, setPasteMode] = useState(false);
  const [pasteText, setPasteText] = useState("");
  const [parsed, setParsed] = useState([]);
  const [form, setForm] = useState({name:""});

  const parsePaste = () => {
    const items = pasteText.trim().split("\n").map(l=>l.trim()).filter(l=>l).map(l=>({name:l.replace(/^[\d\.\-\*]+\s*/,"")}));
    setParsed(items);
  };

  const importParsed = () => {
    const items = parsed.map(p=>({...p,id:Date.now()+Math.random()}));
    const u=[...skills,...items]; setSkills(u); lsSet("nv-skillsdb",u);
    toast(`${items.length} skills imported!`,"success"); setPasteText(""); setParsed([]); setPasteMode(false);
  };

  const save = () => {
    if (!form.name) return toast("Skill name required","error");
    let u;
    if (edit!==null) { u=skills.map((s,i)=>i===edit?{...s,name:form.name}:s); toast("Updated","success"); }
    else { u=[...skills,{name:form.name,id:Date.now()}]; toast("Skill added","success"); }
    setSkills(u); lsSet("nv-skillsdb",u); setShowModal(false); setEdit(null); setForm({name:""});
  };

  const del = (id) => { const u=skills.filter(s=>s.id!==id); setSkills(u); lsSet("nv-skillsdb",u); toast("Deleted","success"); };

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:10}}>
        <div className="sec-title">✅ Skills Checklist ({skills.length})</div>
        <div style={{display:"flex",gap:8}}>
          <button className="btn btn-success btn-sm" onClick={()=>setPasteMode(p=>!p)}>📋 Paste</button>
          <button className="btn btn-purple" onClick={()=>{setShowModal(true);setEdit(null);setForm({name:""});}}>+ Add Skill</button>
        </div>
      </div>

      {pasteMode&&(
        <div className="card" style={{marginBottom:18}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,marginBottom:6}}>📋 Paste Skills</div>
          <div style={{fontSize:12,color:"var(--text3)",fontFamily:"'DM Mono',monospace",marginBottom:8}}>One skill per line. Numbers/bullets at the start are auto-removed.</div>
          <textarea className="paste-box" placeholder={"1. Nasogastric tube insertion\n2. Tracheostomy care\n- Chest physiotherapy\nCardiovascular assessment\nPain assessment (PQRST)"} value={pasteText} onChange={e=>setPasteText(e.target.value)} />
          <div style={{display:"flex",gap:8,marginBottom:parsed.length?10:0}}>
            <button className="btn btn-accent" onClick={parsePaste}>🔍 Parse</button>
            {parsed.length>0&&<button className="btn btn-success" onClick={importParsed}>✅ Import {parsed.length}</button>}
            <button className="btn" onClick={()=>{setPasteMode(false);setParsed([]);setPasteText("");}}>Cancel</button>
          </div>
          {parsed.length>0&&<div className="parse-preview">{parsed.map((p,i)=><div key={i} className="parse-item"><span className="parse-check">✓</span>{p.name}</div>)}</div>}
        </div>
      )}

      {skills.map((s,i)=>(
        <div key={s.id} className="card2" style={{marginBottom:8,display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:24,height:24,borderRadius:6,background:"rgba(62,142,149,.15)",border:"1px solid var(--accent)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:"var(--accent)",flexShrink:0}}>{i+1}</div>
          <div style={{flex:1,fontWeight:500,fontSize:14}}>{s.name}</div>
          <button className="btn btn-sm" onClick={()=>{setEdit(i);setForm({name:s.name});setShowModal(true);}}>✏️</button>
          <button className="btn btn-sm btn-danger" onClick={()=>del(s.id)}>🗑️</button>
        </div>
      ))}

      {showModal&&(
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-head"><div className="modal-title">{edit!==null?"Edit":"Add"} Skill</div><button className="modal-close" onClick={()=>setShowModal(false)}>✕</button></div>
            <label className="lbl">Skill Name</label><input className="inp" value={form.name} onChange={e=>setForm({name:e.target.value})} placeholder="e.g. IV cannulation" />
            <div style={{display:"flex",gap:8}}><button className="btn btn-purple" style={{flex:1}} onClick={save}>Save</button><button className="btn" onClick={()=>setShowModal(false)}>Cancel</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Admin Announcements ──────────────────────────────────────────────
function AdminAnnouncements({ toast }) {
  const [items, setItems] = useState(()=>ls("nv-announcements",DEFAULT_ANNOUNCEMENTS));
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({title:"",body:"",pinned:false});

  const save = () => {
    if (!form.title) return toast("Title required","error");
    let u;
    const item = {...form,date:new Date().toLocaleDateString(),id:edit||Date.now()};
    if (edit) { u=items.map(a=>a.id===edit?item:a); toast("Updated","success"); }
    else { u=[item,...items]; toast("Announcement posted!","success"); }
    setItems(u); lsSet("nv-announcements",u); setShowModal(false); setEdit(null); setForm({title:"",body:"",pinned:false});
  };

  const del = (id) => { const u=items.filter(a=>a.id!==id); setItems(u); lsSet("nv-announcements",u); toast("Deleted","success"); };
  const togglePin = (id) => { const u=items.map(a=>a.id===id?{...a,pinned:!a.pinned}:a); setItems(u); lsSet("nv-announcements",u); };

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:10}}>
        <div className="sec-title">📢 Announcements ({items.length})</div>
        <button className="btn btn-purple" onClick={()=>{setShowModal(true);setEdit(null);setForm({title:"",body:"",pinned:false});}}>+ Post Announcement</button>
      </div>
      {items.map(a=>(
        <div key={a.id} className="card" style={{marginBottom:12,borderLeft:a.pinned?"3px solid var(--warn)":"3px solid var(--border)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                {a.pinned&&<span className="tag tag-warn">📌 Pinned</span>}
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:15}}>{a.title}</div>
              </div>
              <div style={{fontSize:13,color:"var(--text2)",lineHeight:1.6,marginBottom:8}}>{a.body}</div>
              <div style={{fontSize:10,color:"var(--text3)",fontFamily:"'DM Mono',monospace"}}>{a.date}</div>
            </div>
            <div style={{display:"flex",gap:5,flexShrink:0}}>
              <button className="btn btn-sm" title="Toggle pin" onClick={()=>togglePin(a.id)}>{a.pinned?"📌":"📍"}</button>
              <button className="btn btn-sm" onClick={()=>{setEdit(a.id);setForm({title:a.title,body:a.body,pinned:a.pinned});setShowModal(true);}}>✏️</button>
              <button className="btn btn-sm btn-danger" onClick={()=>del(a.id)}>🗑️</button>
            </div>
          </div>
        </div>
      ))}

      {showModal&&(
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-head"><div className="modal-title">{edit?"Edit":"Post"} Announcement</div><button className="modal-close" onClick={()=>setShowModal(false)}>✕</button></div>
            <label className="lbl">Title</label><input className="inp" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="e.g. Exam timetable released" />
            <label className="lbl">Body</label><textarea className="inp" rows={4} style={{resize:"vertical"}} value={form.body} onChange={e=>setForm({...form,body:e.target.value})} placeholder="Announcement details..." />
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
              <input type="checkbox" id="pin" checked={form.pinned} onChange={e=>setForm({...form,pinned:e.target.checked})} />
              <label htmlFor="pin" style={{fontSize:13,cursor:"pointer"}}>📌 Pin this announcement</label>
            </div>
            <div style={{display:"flex",gap:8}}><button className="btn btn-purple" style={{flex:1}} onClick={save}>Post</button><button className="btn" onClick={()=>setShowModal(false)}>Cancel</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Admin Handouts ───────────────────────────────────────────────────
function AdminHandouts({ toast }) {
  const [folders, setFolders] = useState(()=>ls("nv-folders",[]));
  const [handouts, setHandouts] = useState(()=>ls("nv-handouts",[]));
  const [openFolders, setOpenFolders] = useState({});
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [showHandoutModal, setShowHandoutModal] = useState(false);
  const [editFolder, setEditFolder] = useState(null);
  const [editHandout, setEditHandout] = useState(null);
  const [targetFolderId, setTargetFolderId] = useState(null);
  const [viewItem, setViewItem] = useState(null);
  const [filterClass, setFilterClass] = useState("");
  const [search, setSearch] = useState("");
  const classes = ls("nv-classes", DEFAULT_CLASSES);
  const TYPES = ["Handout","Note","Assignment","Resource","Announcement","Lecture Slides","Past Questions"];
  const FOLDER_COLORS = ["#3E8E95","#5aada0","#a78bfa","#f472b6","#fb923c","#facc15","#4ade80","#f87171","#60a5fa","#14a064"];

  const [folderForm, setFolderForm] = useState({name:"",description:"",classId:"",color:"#3E8E95",icon:"📁"});
  const [handoutForm, setHandoutForm] = useState({title:"",content:"",classId:"",course:"",type:"Handout",folderId:"",tags:""});

  const FOLDER_ICONS = ["📁","📂","📚","📖","📝","📋","🗂️","🏥","💊","🧬","🔬","📐","🩺","📊","🗒️"];

  const saveFolder = () => {
    if (!folderForm.name) return toast("Folder name required","error");
    const item = {...folderForm, id: editFolder||`folder_${Date.now()}`, createdAt: new Date().toLocaleDateString(), handoutCount: 0};
    let u;
    if (editFolder) { u = folders.map(f=>f.id===editFolder?{...f,...folderForm}:f); toast("Folder updated","success"); }
    else { u = [...folders, item]; toast("Folder created!","success"); }
    setFolders(u); lsSet("nv-folders", u);
    setShowFolderModal(false); setEditFolder(null); setFolderForm({name:"",description:"",classId:"",color:"#3E8E95",icon:"📁"});
  };

  const delFolder = (id) => {
    const u = folders.filter(f=>f.id!==id); setFolders(u); lsSet("nv-folders",u);
    const h = handouts.filter(h=>h.folderId!==id); setHandouts(h); lsSet("nv-handouts",h);
    toast("Folder deleted","success");
  };

  const saveHandout = () => {
    if (!handoutForm.title) return toast("Title required","error");
    const item = {...handoutForm, id: editHandout||Date.now(), date: new Date().toLocaleDateString(), author:"Admin", fromAdmin:true};
    let u;
    if (editHandout) { u = handouts.map(h=>h.id===editHandout?item:h); toast("Handout updated","success"); }
    else { u = [item,...handouts]; toast("Handout added!","success"); }
    setHandouts(u); lsSet("nv-handouts",u);
    setShowHandoutModal(false); setEditHandout(null); setTargetFolderId(null);
    setHandoutForm({title:"",content:"",classId:"",course:"",type:"Handout",folderId:"",tags:""});
  };

  const delHandout = (id) => {
    const u = handouts.filter(h=>h.id!==id); setHandouts(u); lsSet("nv-handouts",u); toast("Deleted","success");
  };

  const toggleFolder = (id) => setOpenFolders(p=>({...p,[id]:!p[id]}));

  const typeIcon = (t) => {
    const m = {"Handout":"📄","Note":"📝","Assignment":"✏️","Resource":"🔗","Announcement":"📢","Lecture Slides":"🎞️","Past Questions":"❓"};
    return m[t]||"📄";
  };

  // Filter logic
  const filteredFolders = folders.filter(f=>{
    if (filterClass && f.classId && f.classId!==filterClass) return false;
    if (search && !f.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const folderHandouts = (folderId) => {
    return handouts.filter(h=>h.folderId===folderId && (!search || h.title.toLowerCase().includes(search.toLowerCase())));
  };

  // Unfiled handouts (no folder assigned)
  const unfiledHandouts = handouts.filter(h=>!h.folderId && (!filterClass||h.classId===filterClass) && (!search||h.title.toLowerCase().includes(search.toLowerCase())));

  const cls = (id) => classes.find(c=>c.id===id);

  return (
    <div>
      {/* Header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:10}}>
        <div>
          <div className="sec-title">🗂️ Handout Folders</div>
          <div className="sec-sub">{folders.length} folder{folders.length!==1?"s":""} · {handouts.length} handout{handouts.length!==1?"s":""}</div>
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          <button className="btn btn-success btn-sm" onClick={()=>{setShowHandoutModal(true);setEditHandout(null);setHandoutForm({title:"",content:"",classId:"",course:"",type:"Handout",folderId:"",tags:""});}}>+ Add Handout</button>
          <button className="btn btn-purple" onClick={()=>{setShowFolderModal(true);setEditFolder(null);setFolderForm({name:"",description:"",classId:"",color:"#3E8E95",icon:"📁"});}}>📁 New Folder</button>
        </div>
      </div>

      {/* Filters */}
      <div style={{display:"flex",gap:10,marginBottom:16,flexWrap:"wrap"}}>
        <div className="search-wrap" style={{flex:1,minWidth:180,marginBottom:0}}><span className="search-ico">🔍</span><input placeholder="Search folders & handouts..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
        <select className="inp" style={{width:180,marginBottom:0}} value={filterClass} onChange={e=>setFilterClass(e.target.value)}>
          <option value="">All Classes</option>
          {classes.map(c=><option key={c.id} value={c.id}>{c.label}</option>)}
        </select>
      </div>

      {/* Folders */}
      {filteredFolders.length===0 && unfiledHandouts.length===0 && (
        <div style={{textAlign:"center",padding:"60px 20px",color:"var(--text3)"}}>
          <div style={{fontSize:56,marginBottom:12}}>🗂️</div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:13}}>No folders yet. Create a folder to organise handouts.</div>
        </div>
      )}

      {filteredFolders.map(folder=>{
        const isOpen = openFolders[folder.id];
        const fh = folderHandouts(folder.id);
        const allFh = handouts.filter(h=>h.folderId===folder.id);
        const clsObj = cls(folder.classId);
        return (
          <div key={folder.id} style={{marginBottom:4}}>
            {/* Folder header row */}
            <div className={`folder-row${isOpen?" open":""}`} style={{borderLeft:`4px solid ${folder.color||"var(--accent)"}`}} onClick={()=>toggleFolder(folder.id)}>
              <span className="folder-icon">{folder.icon||"📁"}</span>
              <div style={{flex:1}}>
                <div className="folder-name">{folder.name}</div>
                <div className="folder-meta">
                  {allFh.length} handout{allFh.length!==1?"s":""}
                  {clsObj&&<span> · {clsObj.label}</span>}
                  {folder.description&&<span> · {folder.description}</span>}
                </div>
              </div>
              {clsObj&&<span className="tag tag-accent" style={{fontSize:10}}>{clsObj.label}</span>}
              <div style={{display:"flex",gap:5}} onClick={e=>e.stopPropagation()}>
                <button className="btn btn-sm" title="Add handout to folder" onClick={()=>{setTargetFolderId(folder.id);setHandoutForm({title:"",content:"",classId:folder.classId||"",course:"",type:"Handout",folderId:folder.id,tags:""});setShowHandoutModal(true);}}>+📄</button>
                <button className="btn btn-sm" onClick={()=>{setEditFolder(folder.id);setFolderForm({name:folder.name,description:folder.description||"",classId:folder.classId||"",color:folder.color||"#3E8E95",icon:folder.icon||"📁"});setShowFolderModal(true);}}>✏️</button>
                <button className="btn btn-sm btn-danger" onClick={()=>delFolder(folder.id)}>🗑️</button>
              </div>
              <span className={`folder-arrow${isOpen?" open":""}`}>▶</span>
            </div>

            {/* Folder contents */}
            {isOpen&&(
              <div className="folder-contents">
                {fh.length===0?(
                  <div className="folder-empty">
                    📭 Empty folder
                    <button className="btn btn-sm btn-accent" style={{marginLeft:12}} onClick={()=>{setTargetFolderId(folder.id);setHandoutForm({title:"",content:"",classId:folder.classId||"",course:"",type:"Handout",folderId:folder.id,tags:""});setShowHandoutModal(true);}}>+ Add first handout</button>
                  </div>
                ):fh.map(h=>(
                  <div key={h.id} className="handout-item" onClick={()=>setViewItem(h)}>
                    <span className="handout-icon">{typeIcon(h.type)}</span>
                    <div style={{flex:1}}>
                      <div className="handout-name">{h.title}</div>
                      <div style={{fontSize:11,color:"var(--text3)",fontFamily:"'DM Mono',monospace",marginTop:1}}>
                        {h.course&&<span>{h.course} · </span>}
                        {h.date}
                        {h.tags&&<span style={{marginLeft:6,color:"var(--accent2)"}}>{h.tags}</span>}
                      </div>
                    </div>
                    <span className="handout-badge">{h.type||"Handout"}</span>
                    <div style={{display:"flex",gap:4}} onClick={e=>e.stopPropagation()}>
                      <button className="btn btn-sm" onClick={()=>{setEditHandout(h.id);setHandoutForm({title:h.title,content:h.content||"",classId:h.classId||"",course:h.course||"",type:h.type||"Handout",folderId:h.folderId||"",tags:h.tags||""});setShowHandoutModal(true);}}>✏️</button>
                      <button className="btn btn-sm btn-danger" onClick={()=>delHandout(h.id)}>🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Unfiled handouts */}
      {unfiledHandouts.length>0&&(
        <div style={{marginTop:16}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"var(--text3)",letterSpacing:"1px",textTransform:"uppercase",marginBottom:8,padding:"0 4px"}}>📎 Unfiled Handouts ({unfiledHandouts.length})</div>
          {unfiledHandouts.map(h=>(
            <div key={h.id} className="handout-item" onClick={()=>setViewItem(h)}>
              <span className="handout-icon">{typeIcon(h.type)}</span>
              <div style={{flex:1}}>
                <div className="handout-name">{h.title}</div>
                <div style={{fontSize:11,color:"var(--text3)",fontFamily:"'DM Mono',monospace",marginTop:1}}>
                  {cls(h.classId)&&<span>{cls(h.classId).label} · </span>}
                  {h.course&&<span>{h.course} · </span>}
                  {h.date}
                </div>
              </div>
              <span className="handout-badge">{h.type||"Handout"}</span>
              <div style={{display:"flex",gap:4}} onClick={e=>e.stopPropagation()}>
                <button className="btn btn-sm" onClick={()=>{setEditHandout(h.id);setHandoutForm({title:h.title,content:h.content||"",classId:h.classId||"",course:h.course||"",type:h.type||"Handout",folderId:h.folderId||"",tags:h.tags||""});setShowHandoutModal(true);}}>✏️</button>
                <button className="btn btn-sm btn-danger" onClick={()=>delHandout(h.id)}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── NEW FOLDER MODAL ─── */}
      {showFolderModal&&(
        <div className="modal-overlay" onClick={()=>{setShowFolderModal(false);setEditFolder(null);}}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-head">
              <div className="modal-title">{editFolder?"✏️ Edit":"📁 New"} Folder</div>
              <button className="modal-close" onClick={()=>{setShowFolderModal(false);setEditFolder(null);}}>✕</button>
            </div>

            {/* Icon picker */}
            <label className="lbl">Folder Icon</label>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:13}}>
              {FOLDER_ICONS.map(ic=>(
                <div key={ic} onClick={()=>setFolderForm(p=>({...p,icon:ic}))} style={{width:34,height:34,borderRadius:8,border:`2px solid ${folderForm.icon===ic?"var(--accent)":"var(--border)"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,cursor:"pointer",background:folderForm.icon===ic?"rgba(62,142,149,.15)":"transparent",transition:"all .15s"}}>{ic}</div>
              ))}
            </div>

            <label className="lbl">Folder Name</label>
            <input className="inp" placeholder="e.g. Pharmacology Notes, Week 1 Lectures..." value={folderForm.name} onChange={e=>setFolderForm(p=>({...p,name:e.target.value}))}/>

            <label className="lbl">Description (optional)</label>
            <input className="inp" placeholder="Brief description..." value={folderForm.description} onChange={e=>setFolderForm(p=>({...p,description:e.target.value}))}/>

            <div className="form-row">
              <div>
                <label className="lbl">Target Class</label>
                <select className="inp" value={folderForm.classId} onChange={e=>setFolderForm(p=>({...p,classId:e.target.value}))}>
                  <option value="">All Classes</option>
                  {classes.map(c=><option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>
              <div>
                <label className="lbl">Folder Color</label>
                <div style={{display:"flex",flexWrap:"wrap",gap:6,paddingTop:4}}>
                  {FOLDER_COLORS.map(col=>(
                    <div key={col} onClick={()=>setFolderForm(p=>({...p,color:col}))} style={{width:26,height:26,borderRadius:50,background:col,border:`3px solid ${folderForm.color===col?"white":"transparent"}`,cursor:"pointer",outline:folderForm.color===col?`2px solid ${col}`:"none",transition:"all .15s"}}/>
                  ))}
                </div>
              </div>
            </div>

            <div style={{display:"flex",gap:8,marginTop:4}}>
              <button className="btn btn-purple" style={{flex:1}} onClick={saveFolder}>
                {editFolder?"Update Folder":"Create Folder"}
              </button>
              <button className="btn" onClick={()=>{setShowFolderModal(false);setEditFolder(null);}}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ─── ADD / EDIT HANDOUT MODAL ─── */}
      {showHandoutModal&&(
        <div className="modal-overlay" onClick={()=>{setShowHandoutModal(false);setEditHandout(null);setTargetFolderId(null);}}>
          <div className="modal lg" onClick={e=>e.stopPropagation()}>
            <div className="modal-head">
              <div className="modal-title">{editHandout?"✏️ Edit Handout":"📄 Add Handout"}</div>
              <button className="modal-close" onClick={()=>{setShowHandoutModal(false);setEditHandout(null);setTargetFolderId(null);}}>✕</button>
            </div>

            <div className="form-row">
              <div>
                <label className="lbl">Type</label>
                <select className="inp" value={handoutForm.type} onChange={e=>setHandoutForm(p=>({...p,type:e.target.value}))}>
                  {TYPES.map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="lbl">Save to Folder</label>
                <select className="inp" value={handoutForm.folderId} onChange={e=>setHandoutForm(p=>({...p,folderId:e.target.value}))}>
                  <option value="">📎 No folder (unfiled)</option>
                  {folders.map(f=><option key={f.id} value={f.id}>{f.icon} {f.name}</option>)}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div>
                <label className="lbl">Target Class</label>
                <select className="inp" value={handoutForm.classId} onChange={e=>setHandoutForm(p=>({...p,classId:e.target.value}))}>
                  <option value="">All Classes</option>
                  {classes.map(c=><option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>
              <div>
                <label className="lbl">Course / Subject</label>
                <input className="inp" placeholder="e.g. Pharmacology..." value={handoutForm.course} onChange={e=>setHandoutForm(p=>({...p,course:e.target.value}))}/>
              </div>
            </div>

            <label className="lbl">Title</label>
            <input className="inp" placeholder="Handout title..." value={handoutForm.title} onChange={e=>setHandoutForm(p=>({...p,title:e.target.value}))}/>

            <label className="lbl">Tags (optional, comma-separated)</label>
            <input className="inp" placeholder="e.g. week1, exam, important..." value={handoutForm.tags} onChange={e=>setHandoutForm(p=>({...p,tags:e.target.value}))}/>

            <label className="lbl">Content</label>
            <textarea className="inp" rows={7} style={{resize:"vertical"}} placeholder="Paste lecture notes, assignment details, or any content..." value={handoutForm.content} onChange={e=>setHandoutForm(p=>({...p,content:e.target.value}))}/>

            <div style={{display:"flex",gap:8}}>
              <button className="btn btn-purple" style={{flex:1}} onClick={saveHandout}>
                {editHandout?"Update Handout":"Add Handout"}
              </button>
              <button className="btn" onClick={()=>{setShowHandoutModal(false);setEditHandout(null);setTargetFolderId(null);}}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ─── VIEW HANDOUT MODAL ─── */}
      {viewItem&&(
        <div className="modal-overlay" onClick={()=>setViewItem(null)}>
          <div className="modal lg" onClick={e=>e.stopPropagation()}>
            <div className="modal-head">
              <div className="modal-title">{typeIcon(viewItem.type)} {viewItem.title}</div>
              <button className="modal-close" onClick={()=>setViewItem(null)}>✕</button>
            </div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
              {viewItem.type&&<span className="tag tag-accent">{viewItem.type}</span>}
              {cls(viewItem.classId)&&<span className="tag tag-purple">{cls(viewItem.classId).label}</span>}
              {viewItem.course&&<span className="tag">{viewItem.course}</span>}
              {viewItem.folderId&&<span className="tag" style={{borderColor:"var(--warn)",color:"var(--warn)"}}>{folders.find(f=>f.id===viewItem.folderId)?.icon} {folders.find(f=>f.id===viewItem.folderId)?.name}</span>}
            </div>
            {viewItem.tags&&<div style={{fontSize:11,color:"var(--accent2)",fontFamily:"'DM Mono',monospace",marginBottom:12}}>🏷️ {viewItem.tags}</div>}
            <div style={{fontSize:14,lineHeight:1.9,color:"var(--text2)",whiteSpace:"pre-wrap",background:"var(--bg4)",borderRadius:10,padding:"16px",maxHeight:400,overflowY:"auto"}}>{viewItem.content||"No content."}</div>
            <div style={{fontSize:10,color:"var(--text3)",fontFamily:"'DM Mono',monospace",marginTop:12}}>Added by {viewItem.author||"Unknown"} · {viewItem.date}</div>
          </div>
        </div>
      )}
    </div>
  );
}


// ════════════════════════════════════════════════════════════════════
// STUDENT VIEWS
// ════════════════════════════════════════════════════════════════════
function Dashboard({ user, onNavigate }) {
  const handouts = ls("nv-handouts",[]);
  const classes = ls("nv-classes", DEFAULT_CLASSES);
  const announcements = ls("nv-announcements",[]).filter(a=>a.pinned);
  const [openGroup, setOpenGroup] = useState(null);

  const GROUPS = [
    { key:"nd-hnd", label:"ND / HND", icon:"📗", ids:["nd1","nd2","hnd1","hnd2"], color:"#3E8E95" },
    { key:"cn",     label:"Community Nursing", icon:"📙", ids:["cn1","cn2"], color:"#facc15" },
    { key:"bnsc",   label:"BNSc", icon:"📘", ids:["bnsc1","bnsc2","bnsc3","bnsc4","bnscf"], color:"#a78bfa" },
  ];

  const toggleGroup = (key) => setOpenGroup(p => p===key ? null : key);

  return (
    <div>
      {announcements.length>0&&announcements.map(a=>(
        <div key={a.id} style={{background:"rgba(251,146,60,.08)",border:"1px solid rgba(251,146,60,.25)",borderRadius:12,padding:"12px 16px",marginBottom:16,display:"flex",gap:10}}>
          <span>📌</span>
          <div><div style={{fontWeight:700,marginBottom:2}}>{a.title}</div><div style={{fontSize:13,color:"var(--text2)"}}>{a.body}</div></div>
        </div>
      ))}
      <div className="search-wrap"><span className="search-ico">🔍</span><input placeholder="Search handouts, courses, tools..." /></div>
      <div className="grid5" style={{marginBottom:24}}>
        {[
          {lbl:"CLASSES",val:classes.length,sub:"Active programs"},
          {lbl:"COURSES",val:classes.reduce((s,c)=>s+c.courses.length,0),sub:"Across all classes"},
          {lbl:"HANDOUTS",val:handouts.length,sub:"Total uploaded"},
          {lbl:"RESULTS",val:ls("nv-results",[]).length,sub:"Test & exam scores"},
          {lbl:"USERS",val:ls("nv-users",[]).length,sub:"Registered accounts"},
        ].map((s,i)=>(
          <div key={s.lbl} className="stat-card" style={{animationDelay:`${i*.06}s`}}>
            <div className="stat-lbl">{s.lbl}</div>
            <div className="stat-val">{s.val}</div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="sec-title">Classes</div>
      <div className="sec-sub">Select a programme to browse courses and handouts</div>

      <div style={{display:"flex",gap:12,flexWrap:"wrap",marginTop:14}}>
        {GROUPS.map(grp => {
          const grpClasses = classes.filter(c=>grp.ids.includes(c.id));
          const isOpen = openGroup===grp.key;
          return (
            <div key={grp.key} style={{position:"relative"}}>
              <button
                onClick={()=>toggleGroup(grp.key)}
                style={{
                  display:"flex",alignItems:"center",gap:8,
                  padding:"10px 18px",borderRadius:10,cursor:"pointer",
                  background: isOpen ? `rgba(${grp.color==="#3E8E95"?"62,142,149":grp.color==="#facc15"?"250,204,21":grp.color==="#a78bfa"?"167,139,250":"62,142,149"},.18)` : "var(--card)",
                  border:`1.5px solid ${isOpen?grp.color:"var(--border)"}`,
                  color: isOpen ? grp.color : "var(--text2)",
                  fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:14,
                  transition:"all .2s",
                }}>
                <span style={{fontSize:17}}>{grp.icon}</span>
                {grp.label}
                <span style={{fontSize:11,marginLeft:4,opacity:.7,fontFamily:"'DM Mono',monospace",fontWeight:400}}>{grpClasses.length}</span>
                <span style={{fontSize:10,marginLeft:2,transition:"transform .2s",display:"inline-block",transform:isOpen?"rotate(180deg)":"rotate(0deg)"}}>▼</span>
              </button>

              {isOpen && (
                <div style={{
                  position:"absolute",top:"calc(100% + 8px)",left:0,zIndex:50,
                  background:"var(--bg3)",border:"1px solid var(--border2)",
                  borderRadius:12,padding:8,minWidth:260,
                  boxShadow:"0 16px 48px rgba(0,0,0,.4)",
                  animation:"fadeUp .18s ease"
                }}
                onClick={e=>e.stopPropagation()}>
                  {grpClasses.map(c=>(
                    <div key={c.id}
                      onClick={()=>{ onNavigate("handouts",c); setOpenGroup(null); }}
                      style={{
                        display:"flex",alignItems:"center",gap:12,padding:"10px 12px",
                        borderRadius:8,cursor:"pointer",transition:"background .15s",
                      }}
                      onMouseEnter={e=>e.currentTarget.style.background="rgba(62,142,149,.1)"}
                      onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                      <div style={{width:8,height:8,borderRadius:"50%",background:c.color,flexShrink:0}}/>
                      <div style={{flex:1}}>
                        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:13,color:"var(--text)"}}>{c.label}</div>
                        <div style={{fontSize:11,color:"var(--text3)",marginTop:1}}>{c.desc}</div>
                      </div>
                      <div style={{fontSize:10,color:"var(--text3)",fontFamily:"'DM Mono',monospace",flexShrink:0}}>
                        {c.courses.length} courses · {handouts.filter(h=>h.classId===c.id).length} notes
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Click-outside to close */}
      {openGroup && (
        <div style={{position:"fixed",inset:0,zIndex:49}} onClick={()=>setOpenGroup(null)} />
      )}
    </div>
  );
}

function Handouts({ selectedClass, toast }) {
  const classes     = ls("nv-classes", DEFAULT_CLASSES);
  const [folders,   setFolders]   = useState(()=>ls("nv-folders",[]));
  const [handouts,  setHandouts]  = useState(()=>ls("nv-handouts",[]));
  const [openFolders, setOpenFolders] = useState({});
  const [viewItem,  setViewItem]  = useState(null);
  const [search,    setSearch]    = useState("");
  const [filterClass, setFilterClass] = useState(selectedClass?.id||"");

  // Re-read from storage when selectedClass changes
  useEffect(()=>{
    setFolders(ls("nv-folders",[]));
    setHandouts(ls("nv-handouts",[]));
    if(selectedClass?.id) setFilterClass(selectedClass.id);
  },[selectedClass]);

  const cls    = id => classes.find(c=>c.id===id);
  const toggle = id => setOpenFolders(p=>({...p,[id]:!p[id]}));

  const typeIcon = t => ({
    "Handout":"📄","Note":"📝","Assignment":"✏️","Resource":"🔗",
    "Announcement":"📢","Lecture Slides":"🎞️","Past Questions":"❓"
  }[t]||"📄");

  /* ---------- filtered sets ---------- */
  const q = search.toLowerCase();

  const visibleFolders = folders.filter(f=>{
    if (filterClass && f.classId && f.classId !== filterClass) return false;
    if (q && !f.name.toLowerCase().includes(q)) return false;
    return true;
  });

  const folderItems = fid =>
    handouts.filter(h =>
      h.folderId === fid &&
      (!filterClass || !h.classId || h.classId === filterClass) &&
      (!q || h.title.toLowerCase().includes(q) || (h.course||"").toLowerCase().includes(q))
    );

  // Unfiled = no folderId, matches filters
  const unfiled = handouts.filter(h =>
    !h.folderId &&
    (!filterClass || !h.classId || h.classId === filterClass) &&
    (!q || h.title.toLowerCase().includes(q) || (h.course||"").toLowerCase().includes(q))
  );

  const totalVisible =
    visibleFolders.reduce((s,f)=>s+folderItems(f.id).length, 0) + unfiled.length;

  return (
    <div>
      {/* ── Page header ── */}
      <div style={{marginBottom:18}}>
        <div className="sec-title">
          {selectedClass ? `${selectedClass.label} — Handouts` : "📚 All Handouts"}
        </div>
        <div className="sec-sub">
          {visibleFolders.length} folder{visibleFolders.length!==1?"s":""} · {totalVisible} item{totalVisible!==1?"s":""}
        </div>
      </div>

      {/* ── Filters row ── */}
      <div style={{display:"flex",gap:10,marginBottom:18,flexWrap:"wrap"}}>
        <div className="search-wrap" style={{flex:1,minWidth:180,marginBottom:0}}>
          <span className="search-ico">🔍</span>
          <input
            placeholder="Search folders and handouts..."
            value={search}
            onChange={e=>setSearch(e.target.value)}
          />
        </div>
        <select
          className="inp"
          style={{width:190,marginBottom:0}}
          value={filterClass}
          onChange={e=>setFilterClass(e.target.value)}
        >
          <option value="">All Classes</option>
          {classes.map(c=><option key={c.id} value={c.id}>{c.label}</option>)}
        </select>
      </div>

      {/* ── Empty state ── */}
      {visibleFolders.length===0 && unfiled.length===0 && (
        <div style={{textAlign:"center",padding:"70px 20px",color:"var(--text3)"}}>
          <div style={{fontSize:60,marginBottom:14}}>📂</div>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:16,marginBottom:6}}>
            No handouts yet
          </div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:12}}>
            Your lecturer or admin hasn't posted any handouts for this class yet.
          </div>
        </div>
      )}

      {/* ── Folders ── */}
      {visibleFolders.map(folder=>{
        const isOpen  = openFolders[folder.id];
        const items   = folderItems(folder.id);
        const allItems = handouts.filter(h=>h.folderId===folder.id);
        const clsObj  = cls(folder.classId);

        return (
          <div key={folder.id} style={{marginBottom:6}}>
            {/* Folder header */}
            <div
              className={`folder-row${isOpen?" open":""}`}
              style={{borderLeft:`4px solid ${folder.color||"var(--accent)"}`}}
              onClick={()=>toggle(folder.id)}
            >
              <span className="folder-icon">{folder.icon||"📁"}</span>
              <div style={{flex:1}}>
                <div className="folder-name">{folder.name}</div>
                <div className="folder-meta">
                  {allItems.length} file{allItems.length!==1?"s":""}
                  {clsObj && <span> · {clsObj.label}</span>}
                  {folder.description && <span> · {folder.description}</span>}
                </div>
              </div>
              {clsObj && (
                <span className="tag tag-accent" style={{fontSize:10}}>
                  {clsObj.label}
                </span>
              )}
              <span className={`folder-arrow${isOpen?" open":""}`}>▶</span>
            </div>

            {/* Folder contents */}
            {isOpen && (
              <div className="folder-contents">
                {items.length===0 ? (
                  <div className="folder-empty">📭 No files match your search</div>
                ) : items.map(h=>(
                  <div
                    key={h.id}
                    className="handout-item"
                    onClick={()=>setViewItem(h)}
                  >
                    <span className="handout-icon">{typeIcon(h.type)}</span>
                    <div style={{flex:1}}>
                      <div className="handout-name">{h.title}</div>
                      <div style={{fontSize:11,color:"var(--text3)",fontFamily:"'DM Mono',monospace",marginTop:2}}>
                        {h.course && <span>{h.course} · </span>}
                        {h.date}
                        {h.tags && <span style={{marginLeft:8,color:"var(--accent2)"}}>🏷️ {h.tags}</span>}
                      </div>
                    </div>
                    <span className="handout-badge">{h.type||"Handout"}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* ── Unfiled handouts ── */}
      {unfiled.length>0 && (
        <div style={{marginTop:18}}>
          <div style={{
            fontFamily:"'DM Mono',monospace",fontSize:10,color:"var(--text3)",
            letterSpacing:"1.2px",textTransform:"uppercase",marginBottom:10,padding:"0 4px"
          }}>
            📎 Other Handouts ({unfiled.length})
          </div>
          {unfiled.map(h=>(
            <div key={h.id} className="handout-item" onClick={()=>setViewItem(h)}>
              <span className="handout-icon">{typeIcon(h.type)}</span>
              <div style={{flex:1}}>
                <div className="handout-name">{h.title}</div>
                <div style={{fontSize:11,color:"var(--text3)",fontFamily:"'DM Mono',monospace",marginTop:2}}>
                  {cls(h.classId) && <span>{cls(h.classId).label} · </span>}
                  {h.course && <span>{h.course} · </span>}
                  {h.date}
                </div>
              </div>
              <span className="handout-badge">{h.type||"Handout"}</span>
            </div>
          ))}
        </div>
      )}

      {/* ── View handout modal ── */}
      {viewItem && (
        <div className="modal-overlay" onClick={()=>setViewItem(null)}>
          <div
            className="modal"
            style={{maxWidth:620}}
            onClick={e=>e.stopPropagation()}
          >
            <div className="modal-head">
              <div className="modal-title">
                {typeIcon(viewItem.type)} {viewItem.title}
              </div>
              <button className="modal-close" onClick={()=>setViewItem(null)}>✕</button>
            </div>

            {/* Meta tags */}
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14}}>
              {viewItem.type && (
                <span className="tag tag-accent">{viewItem.type}</span>
              )}
              {cls(viewItem.classId) && (
                <span className="tag tag-purple">{cls(viewItem.classId).label}</span>
              )}
              {viewItem.course && (
                <span className="tag">{viewItem.course}</span>
              )}
              {viewItem.folderId && (()=>{
                const f = folders.find(x=>x.id===viewItem.folderId);
                return f ? (
                  <span className="tag" style={{borderColor:"var(--warn)",color:"var(--warn)"}}>
                    {f.icon} {f.name}
                  </span>
                ):null;
              })()}
            </div>

            {viewItem.tags && (
              <div style={{
                fontSize:11,color:"var(--accent2)",fontFamily:"'DM Mono',monospace",marginBottom:14
              }}>🏷️ {viewItem.tags}</div>
            )}

            {/* Content */}
            <div style={{
              fontSize:14,lineHeight:1.9,color:"var(--text2)",
              whiteSpace:"pre-wrap",background:"var(--bg4)",
              borderRadius:10,padding:"18px",
              maxHeight:420,overflowY:"auto",
              border:"1px solid var(--border)"
            }}>
              {viewItem.content || viewItem.note || "No content attached."}
            </div>

            <div style={{
              fontSize:10,color:"var(--text3)",
              fontFamily:"'DM Mono',monospace",marginTop:14
            }}>
              Posted by {viewItem.author||"Admin"} · {viewItem.date}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


function Results({ toast }) {
  const [results, setResults] = useState(()=>ls("nv-results",[]));
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({subject:"",score:"",total:"",type:"",date:""});
  const save=()=>{if(!form.subject||!form.score)return toast("Fill required fields","error");const item={...form,id:Date.now(),pct:Math.round((+form.score/+(form.total||100))*100)};const u=[...results,item];setResults(u);lsSet("nv-results",u);setForm({subject:"",score:"",total:"",type:"",date:""});setShowAdd(false);toast("Result saved!","success");};
  return(
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,flexWrap:"wrap",gap:10}}>
        <div><div className="sec-title">📊 Results</div><div className="sec-sub">Track your scores</div></div>
        <button className="btn btn-accent" onClick={()=>setShowAdd(true)}>+ Add Result</button>
      </div>
      {results.length===0?<div style={{textAlign:"center",padding:"60px 20px",color:"var(--text3)"}}><div style={{fontSize:48}}>📊</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:13,marginTop:12}}>No results yet!</div></div>:(
        <div className="card" style={{padding:0,overflow:"hidden"}}>
          <table className="tbl"><thead><tr><th>Subject</th><th>Type</th><th>Score</th><th>%</th><th>Date</th><th></th></tr></thead>
          <tbody>{results.map(r=><tr key={r.id}><td style={{fontWeight:600}}>{r.subject}</td><td><span className="tag">{r.type||"Test"}</span></td><td>{r.score}/{r.total||100}</td><td><span className={`tag ${r.pct>=70?"tag-success":r.pct>=50?"tag-warn":"tag-danger"}`}>{r.pct}%</span></td><td style={{fontSize:12,color:"var(--text3)"}}>{r.date}</td><td><button className="btn btn-sm btn-danger" onClick={()=>{const u=results.filter(x=>x.id!==r.id);setResults(u);lsSet("nv-results",u);}}>✕</button></td></tr>)}</tbody>
          </table>
        </div>
      )}
      {showAdd&&<div className="modal-overlay" onClick={()=>setShowAdd(false)}><div className="modal" onClick={e=>e.stopPropagation()}><div className="modal-head"><div className="modal-title">Add Result</div><button className="modal-close" onClick={()=>setShowAdd(false)}>✕</button></div>{["subject","score","total","type","date"].map(f=><div key={f}><label className="lbl">{f==="total"?"Total Marks":f}</label><input className="inp" type={f==="score"||f==="total"?"number":"text"} value={form[f]} onChange={e=>setForm({...form,[f]:e.target.value})} /></div>)}<div style={{display:"flex",gap:8}}><button className="btn btn-accent" style={{flex:1}} onClick={save}>Save</button><button className="btn" onClick={()=>setShowAdd(false)}>Cancel</button></div></div></div>}
    </div>
  );
}




function FlashcardsView() {
  const [decks] = useState(()=>ls("nv-decks",DEFAULT_DECKS));
  const [selDeck, setSelDeck] = useState(null);
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  if(selDeck){
    const deck=decks.find(d=>d.id===selDeck);
    const card=deck.cards[cardIdx];
    return (
      <div>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}>
          <button className="btn btn-sm" onClick={()=>setSelDeck(null)}>← Back</button>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:16}}>{deck.name}</div>
          <div style={{marginLeft:"auto",fontFamily:"'DM Mono',monospace",fontSize:12,color:"var(--text3)"}}>{cardIdx+1}/{deck.cards.length}</div>
        </div>
        <div className="progress-wrap" style={{marginBottom:18}}>
          <div className="progress-fill" style={{width:`${((cardIdx+1)/deck.cards.length)*100}%`,background:"var(--accent)"}} />
        </div>
        <div className="flashcard" onClick={()=>setFlipped(f=>!f)}>
          <div className={`flashcard-inner${flipped?" flipped":""}`}>
            <div className="flashcard-front"><div className="fc-lbl">QUESTION — tap to flip</div><div className="fc-text">{card.front}</div></div>
            <div className="flashcard-back"><div className="fc-lbl">ANSWER</div><div className="fc-text">{card.back}</div></div>
          </div>
        </div>
        <div style={{display:"flex",gap:10,marginTop:18,justifyContent:"center"}}>
          <button className="btn" disabled={cardIdx===0} onClick={()=>{setCardIdx(i=>i-1);setFlipped(false);}}>← Prev</button>
          <button className="btn btn-accent" onClick={()=>setFlipped(f=>!f)}>Flip 🔄</button>
          <button className="btn" disabled={cardIdx>=deck.cards.length-1} onClick={()=>{setCardIdx(i=>i+1);setFlipped(false);}}>Next →</button>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="sec-title">🃏 Flashcards</div>
      <div className="sec-sub">Study with interactive cards</div>
      <div className="grid2">
        {decks.map((d,i)=>(
          <div key={d.id} className="card" style={{cursor:"pointer",animation:`fadeUp .4s ease ${i*.08}s both`}} onClick={()=>{setSelDeck(d.id);setCardIdx(0);setFlipped(false);}}>
            <div style={{fontSize:32,marginBottom:8}}>🃏</div>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:16,marginBottom:4}}>{d.name}</div>
            <div style={{fontSize:12,color:"var(--text3)"}}>{d.cards.length} cards</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DrugGuideView() {
  const [drugs] = useState(()=>ls("nv-drugs",DEFAULT_DRUGS));
  const [search, setSearch] = useState("");
  const [sel, setSel] = useState(null);
  const filtered = drugs.filter(d=>d.name.toLowerCase().includes(search.toLowerCase())||d.class.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <div className="sec-title">💊 Drug Guide</div>
      <div className="sec-sub">Quick reference for medications</div>
      <div className="search-wrap"><span className="search-ico">🔍</span><input placeholder="Search drugs..." value={search} onChange={e=>setSearch(e.target.value)} /></div>
      <div className="grid2">
        {filtered.map((d,i)=>(
          <div key={d.id} className="card" style={{cursor:"pointer",animation:`fadeUp .3s ease ${i*.05}s both`}} onClick={()=>setSel(d)}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:15}}>{d.name}</div>
              <span className="tag tag-accent">{d.class?.split("/")[0]}</span>
            </div>
            <div style={{fontSize:12,color:"var(--text3)"}}><b style={{color:"var(--text2)"}}>Dose:</b> {d.dose}</div>
            <div style={{fontSize:12,color:"var(--text3)",marginTop:4}}><b style={{color:"var(--text2)"}}>Uses:</b> {d.uses}</div>
          </div>
        ))}
      </div>
      {sel&&(
        <div className="modal-overlay" onClick={()=>setSel(null)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-head"><div className="modal-title">{sel.name}</div><button className="modal-close" onClick={()=>setSel(null)}>✕</button></div>
            <span className="tag tag-accent" style={{marginBottom:16,display:"inline-block"}}>{sel.class}</span>
            {[["💊 Dose",sel.dose],["📊 Max",sel.max],["✅ Uses",sel.uses],["⚠️ Contraindications",sel.contraindications],["⚡ Side Effects",sel.side_effects]].map(([l,v])=>(
              <div key={l} style={{marginBottom:14}}>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"var(--text3)",marginBottom:4,textTransform:"uppercase",letterSpacing:"1px"}}>{l}</div>
                <div style={{fontSize:14,color:"var(--text2)"}}>{v||"—"}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function LabReferenceView() {
  const [labs] = useState(()=>ls("nv-labs",DEFAULT_LABS));
  const [search, setSearch] = useState("");
  const filtered = labs.filter(l=>l.test.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <div className="sec-title">🧪 Lab Reference</div>
      <div className="sec-sub">Normal laboratory values</div>
      <div className="search-wrap"><span className="search-ico">🔍</span><input placeholder="Search test name..." value={search} onChange={e=>setSearch(e.target.value)} /></div>
      <div className="card" style={{padding:0,overflow:"hidden"}}>
        <table className="tbl">
          <thead><tr><th>Test</th><th>Male</th><th>Female</th><th>Notes</th></tr></thead>
          <tbody>
            {filtered.map(r=>(
              <tr key={r.id}>
                <td style={{fontWeight:700}}>{r.test}</td>
                <td style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:"var(--accent)"}}>{r.male}</td>
                <td style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:"var(--accent2)"}}>{r.female}</td>
                <td style={{fontSize:12,color:"var(--text3)"}}>{r.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DictionaryView() {
  const [dict] = useState(()=>ls("nv-dict",DEFAULT_DICT));
  const [search, setSearch] = useState("");
  const filtered = dict.filter(d=>d.term.toLowerCase().includes(search.toLowerCase())||d.def.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <div className="sec-title">📖 Medical Dictionary</div>
      <div className="sec-sub">{dict.length} terms</div>
      <div className="search-wrap"><span className="search-ico">🔍</span><input placeholder="Search terms..." value={search} onChange={e=>setSearch(e.target.value)} /></div>
      <div className="grid2">
        {filtered.map((t,i)=>(
          <div key={t.id} className="card2" style={{animation:`fadeUp .3s ease ${i*.03}s both`}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:15,color:"var(--accent)",marginBottom:5}}>{t.term}</div>
            <div style={{fontSize:13,color:"var(--text2)",lineHeight:1.5}}>{t.def}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsView() {
  const [skillsDb] = useState(()=>ls("nv-skillsdb",DEFAULT_SKILLS));
  const [done, setDone] = useState(()=>ls("nv-skills-done",{}));
  const toggle=(id)=>{const u={...done,[id]:!done[id]};setDone(u);lsSet("nv-skills-done",u);};
  const count = skillsDb.filter(s=>done[s.id]).length;
  return (
    <div>
      <div className="sec-title">✅ Skills Checklist</div>
      <div className="sec-sub">Track clinical competencies</div>
      <div className="card" style={{marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
          <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:"var(--text3)"}}>Progress</span>
          <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:"var(--accent)"}}>{count}/{skillsDb.length}</span>
        </div>
        <div className="progress-wrap"><div className="progress-fill" style={{width:`${skillsDb.length>0?(count/skillsDb.length)*100:0}%`,background:"linear-gradient(90deg,var(--accent),var(--accent2))"}} /></div>
      </div>
      {skillsDb.map(s=>(
        <div key={s.id} className="card2" style={{marginBottom:8,display:"flex",alignItems:"center",gap:12,cursor:"pointer",opacity:done[s.id]?.6:1}} onClick={()=>toggle(s.id)}>
          <div style={{width:22,height:22,borderRadius:6,border:`2px solid ${done[s.id]?"var(--success)":"var(--border2)"}`,background:done[s.id]?"var(--success)":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .2s"}}>
            {done[s.id]&&<span style={{fontSize:12,color:"white"}}>✓</span>}
          </div>
          <div style={{fontSize:14,fontWeight:500,textDecoration:done[s.id]?"line-through":"none",flex:1}}>{s.name}</div>
          {done[s.id]&&<span className="tag tag-success">Done</span>}
        </div>
      ))}
    </div>
  );
}

function GPACalc({ toast }) {
  const [courses, setCourses] = useState(()=>ls("nv-gpa-courses",[]));
  const [form, setForm] = useState({name:"",units:"",grade:""});
  const GRADES=[{l:"A",p:"5.0"},{l:"B",p:"4.0"},{l:"C",p:"3.0"},{l:"D",p:"2.0"},{l:"E",p:"1.0"},{l:"F",p:"0.0"}];
  const add=()=>{if(!form.name||!form.units||!form.grade)return toast("Fill all fields","error");const u=[...courses,{...form,id:Date.now(),units:+form.units,grade:+form.grade}];setCourses(u);lsSet("nv-gpa-courses",u);setForm({name:"",units:"",grade:""});};
  const tp=courses.reduce((s,c)=>s+c.units*c.grade,0),tu=courses.reduce((s,c)=>s+c.units,0),gpa=tu>0?tp/tu:0;
  const cls=gpa>=4.5?"First Class":gpa>=3.5?"Second Class Upper":gpa>=2.5?"Second Class Lower":gpa>=1.5?"Third Class":"Fail";
  const clsColor=gpa>=4.5?"var(--accent)":gpa>=3.5?"var(--accent2)":gpa>=2.5?"var(--warn)":"var(--danger)";
  return (
    <div>
      <div className="sec-title">🎓 GPA Calculator</div>
      <div className="sec-sub">5.0 scale</div>
      {courses.length>0&&(
        <div className="card" style={{marginBottom:18,textAlign:"center"}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"var(--text3)",marginBottom:6,textTransform:"uppercase",letterSpacing:"1px"}}>Your GPA</div>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:56,fontWeight:800,color:"var(--accent)"}}>{gpa.toFixed(2)}</div>
          <div style={{fontSize:16,color:clsColor,fontWeight:600,marginBottom:8}}>{cls}</div>
          <div className="gpa-bar-wrap"><div className="gpa-bar" style={{width:`${(gpa/5)*100}%`}} /></div>
        </div>
      )}
      <div className="card" style={{marginBottom:14}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,marginBottom:12}}>Add Course</div>
        <div className="grid3" style={{gap:10,alignItems:"end"}}>
          <div><label className="lbl">Course</label><input className="inp" style={{marginBottom:0}} placeholder="Pharmacology" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /></div>
          <div><label className="lbl">Units</label><input className="inp" style={{marginBottom:0}} type="number" min="1" max="6" value={form.units} onChange={e=>setForm({...form,units:e.target.value})} /></div>
          <div><label className="lbl">Grade</label>
            <select className="inp" style={{marginBottom:0}} value={form.grade} onChange={e=>setForm({...form,grade:e.target.value})}>
              <option value="">Select...</option>
              {GRADES.map(g=><option key={g.l} value={g.p}>{g.l} ({g.p})</option>)}
            </select>
          </div>
        </div>
        <button className="btn btn-accent" style={{marginTop:10}} onClick={add}>Add</button>
      </div>
      {courses.map((c,i)=>(
        <div key={c.id} className="course-row">
          <div style={{flex:1}}>
            <div style={{fontWeight:600,fontSize:13}}>{c.name}</div>
            <div style={{fontSize:11,color:"var(--text3)"}}>{c.units} unit{c.units>1?"s":""}</div>
          </div>
          <div style={{width:36,height:36,borderRadius:9,background:"rgba(62,142,149,.1)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Syne',sans-serif",fontWeight:700,color:"var(--accent)"}}>{GRADES.find(g=>+g.p===c.grade)?.l}</div>
          <button className="btn btn-sm btn-danger" onClick={()=>{const u=courses.filter(x=>x.id!==c.id);setCourses(u);lsSet("nv-gpa-courses",u);}}>✕</button>
        </div>
      ))}
      {courses.length>0&&<button className="btn btn-sm btn-danger" style={{marginTop:8}} onClick={()=>{setCourses([]);lsSet("nv-gpa-courses",[]);}}>Clear All</button>}
    </div>
  );
}

function MedCalc() {
  const [dose,setDose]=useState("");
  const [weight,setWeight]=useState("");
  const [avail,setAvail]=useState("");
  const [vol,setVol]=useState("");
  const result=dose&&weight?(+dose*+weight).toFixed(2):null;
  const volume=result&&avail&&vol?((+result/+avail)*+vol).toFixed(2):null;
  const [bmi,setBmi]=useState({h:"",w:""});
  const bmiVal=bmi.h&&bmi.w?(+bmi.w/(+bmi.h/100)**2).toFixed(1):null;
  const bmiCls=bmiVal?+bmiVal<18.5?"Underweight":+bmiVal<25?"Normal":+bmiVal<30?"Overweight":"Obese":null;
  return (
    <div>
      <div className="sec-title">🧮 Med Calculator</div>
      <div className="sec-sub">Drug dosage &amp; BMI</div>
      <div className="grid2">
        <div className="card">
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,marginBottom:12}}>💊 Dose Calculator</div>
          <label className="lbl">Dose (mg/kg)</label>
          <input className="inp" type="number" placeholder="10" value={dose} onChange={e=>setDose(e.target.value)} />
          <label className="lbl">Weight (kg)</label>
          <input className="inp" type="number" placeholder="70" value={weight} onChange={e=>setWeight(e.target.value)} />
          {result&&(
            <div className="card2" style={{textAlign:"center",marginBottom:12}}>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"var(--text3)"}}>REQUIRED DOSE</div>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:26,fontWeight:800,color:"var(--accent)"}}>{result} mg</div>
            </div>
          )}
          <label className="lbl">Drug Available (mg)</label>
          <input className="inp" type="number" value={avail} onChange={e=>setAvail(e.target.value)} />
          <label className="lbl">Available Volume (mL)</label>
          <input className="inp" type="number" value={vol} onChange={e=>setVol(e.target.value)} />
          {volume&&(
            <div className="card2" style={{textAlign:"center"}}>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"var(--text3)"}}>GIVE</div>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:26,fontWeight:800,color:"var(--accent2)"}}>{volume} mL</div>
            </div>
          )}
        </div>
        <div className="card">
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,marginBottom:12}}>⚖️ BMI</div>
          <label className="lbl">Height (cm)</label>
          <input className="inp" type="number" value={bmi.h} onChange={e=>setBmi({...bmi,h:e.target.value})} />
          <label className="lbl">Weight (kg)</label>
          <input className="inp" type="number" value={bmi.w} onChange={e=>setBmi({...bmi,w:e.target.value})} />
          {bmiVal&&(
            <div className="card2" style={{textAlign:"center"}}>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"var(--text3)"}}>BMI</div>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:48,fontWeight:800,color:"var(--accent)"}}>{bmiVal}</div>
              <div style={{color:+bmiVal<18.5?"var(--warn)":+bmiVal<25?"var(--success)":+bmiVal<30?"var(--warn)":"var(--danger)",fontWeight:600}}>{bmiCls}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StudyPlanner({ toast }) {
  const [tasks, setTasks] = useState(()=>ls("nv-tasks",[]));
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({task:"",subject:"",due:"",priority:"Medium"});
  const save=()=>{if(!form.task)return toast("Enter task","error");const u=[...tasks,{...form,id:Date.now(),done:false}];setTasks(u);lsSet("nv-tasks",u);setForm({task:"",subject:"",due:"",priority:"Medium"});setShowAdd(false);toast("Task added!","success");};
  const toggle=(id)=>{const u=tasks.map(t=>t.id===id?{...t,done:!t.done}:t);setTasks(u);lsSet("nv-tasks",u);};
  const del=(id)=>{const u=tasks.filter(t=>t.id!==id);setTasks(u);lsSet("nv-tasks",u);};
  const pColor={High:"var(--danger)",Medium:"var(--warn)",Low:"var(--accent)"};
  const pending=tasks.filter(t=>!t.done).length;
  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,flexWrap:"wrap",gap:10}}>
        <div><div className="sec-title">📅 Study Planner</div><div className="sec-sub">{pending} task{pending!==1?"s":""} pending</div></div>
        <button className="btn btn-accent" onClick={()=>setShowAdd(true)}>+ Add Task</button>
      </div>
      {tasks.length===0&&(
        <div style={{textAlign:"center",padding:"60px",color:"var(--text3)"}}>
          <div style={{fontSize:48}}>✅</div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,marginTop:12}}>No tasks!</div>
        </div>
      )}
      {tasks.map(t=>(
        <div key={t.id} className="card2" style={{marginBottom:8,display:"flex",alignItems:"center",gap:12,opacity:t.done?.5:1}}>
          <div style={{width:22,height:22,borderRadius:6,border:`2px solid ${t.done?"var(--success)":"var(--border2)"}`,background:t.done?"var(--success)":"transparent",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .2s"}} onClick={()=>toggle(t.id)}>
            {t.done&&<span style={{fontSize:12,color:"white"}}>✓</span>}
          </div>
          <div style={{flex:1}}>
            <div style={{fontWeight:600,fontSize:14,textDecoration:t.done?"line-through":"none"}}>{t.task}</div>
            {(t.subject||t.due)&&<div style={{fontSize:11,color:"var(--text3)",fontFamily:"'DM Mono',monospace"}}>{t.subject}{t.subject&&t.due?" · ":""}{t.due}</div>}
          </div>
          <span className="tag" style={{borderColor:pColor[t.priority],color:pColor[t.priority]}}>{t.priority}</span>
          <button className="btn btn-sm btn-danger" onClick={()=>del(t.id)}>✕</button>
        </div>
      ))}
      {showAdd&&(
        <div className="modal-overlay" onClick={()=>setShowAdd(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-head"><div className="modal-title">Add Task</div><button className="modal-close" onClick={()=>setShowAdd(false)}>✕</button></div>
            <label className="lbl">Task</label><input className="inp" value={form.task} onChange={e=>setForm({...form,task:e.target.value})} />
            <label className="lbl">Subject</label><input className="inp" value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} />
            <label className="lbl">Due Date</label><input className="inp" type="date" value={form.due} onChange={e=>setForm({...form,due:e.target.value})} />
            <label className="lbl">Priority</label>
            <select className="inp" value={form.priority} onChange={e=>setForm({...form,priority:e.target.value})}>
              {["High","Medium","Low"].map(p=><option key={p}>{p}</option>)}
            </select>
            <div style={{display:"flex",gap:8}}>
              <button className="btn btn-accent" style={{flex:1}} onClick={save}>Add</button>
              <button className="btn" onClick={()=>setShowAdd(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Messages({ user, toast }) {
  const [msgs, setMsgs] = useState(()=>ls("nv-messages",[{id:1,from:"System",text:"Welcome to NurseVault! 🎉",time:"Now",read:true}]));
  const [input, setInput] = useState("");
  const announcements = ls("nv-announcements",[]);
  const send=()=>{if(!input.trim())return;const msg={id:Date.now(),from:user,text:input,time:"Just now",read:true,mine:true};const u=[...msgs,msg];setMsgs(u);lsSet("nv-messages",u);setInput("");};
  return (
    <div>
      <div className="sec-title">💬 Messages</div>
      <div className="sec-sub">Notifications and chat</div>
      {announcements.filter(a=>a.pinned).map(a=>(
        <div key={a.id} style={{background:"rgba(251,146,60,.08)",border:"1px solid rgba(251,146,60,.2)",borderRadius:10,padding:"10px 14px",marginBottom:10,fontSize:13}}>
          <b>📌 {a.title}:</b> {a.body}
        </div>
      ))}
      <div className="card" style={{marginBottom:14,minHeight:250,display:"flex",flexDirection:"column",gap:8,padding:14}}>
        {msgs.map(m=>(
          <div key={m.id} style={{display:"flex",gap:8,alignItems:"flex-start",justifyContent:m.mine?"flex-end":"flex-start"}}>
            {!m.mine&&<div style={{width:30,height:30,borderRadius:50,background:"linear-gradient(135deg,var(--accent),var(--accent2))",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0}}>📢</div>}
            <div style={{maxWidth:"75%"}}>
              {!m.mine&&<div style={{fontSize:10,color:"var(--text3)",fontFamily:"'DM Mono',monospace",marginBottom:3}}>{m.from} · {m.time}</div>}
              <div style={{background:m.mine?"linear-gradient(135deg,var(--accent),var(--accent2))":"var(--card2)",borderRadius:m.mine?"14px 14px 4px 14px":"14px 14px 14px 4px",padding:"9px 13px",fontSize:14,color:m.mine?"white":"var(--text)"}}>{m.text}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",gap:8}}>
        <input className="inp" style={{flex:1,marginBottom:0}} placeholder="Type a message..." value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} />
        <button className="btn btn-accent" onClick={send}>Send</button>
      </div>
    </div>
  );
}

function StudyProgress() {
  const results=ls("nv-results",[]);
  const tasks=ls("nv-tasks",[]);
  const skillsDb=ls("nv-skillsdb",DEFAULT_SKILLS);
  const done=ls("nv-skills-done",{});
  const doneTasks=tasks.filter(t=>t.done).length;
  const doneSkills=skillsDb.filter(s=>done[s.id]).length;
  const avg=results.length>0?Math.round(results.reduce((s,r)=>s+r.pct,0)/results.length):0;
  return (
    <div>
      <div className="sec-title">📈 Study Progress</div>
      <div className="sec-sub">Your academic overview</div>
      <div className="grid3" style={{marginBottom:20}}>
        {[{lbl:"Avg Score",val:`${avg}%`,sub:`${results.length} results`,color:"var(--accent)"},{lbl:"Tasks Done",val:`${doneTasks}/${tasks.length}`,sub:"Completed",color:"var(--success)"},{lbl:"Skills",val:`${doneSkills}/${skillsDb.length}`,sub:"Competencies",color:"var(--accent2)"}].map(s=>(
          <div key={s.lbl} className="stat-card">
            <div className="stat-lbl">{s.lbl}</div>
            <div className="stat-val" style={{color:s.color,fontSize:24}}>{s.val}</div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>
      {results.length>0&&(
        <div className="card">
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,marginBottom:12}}>Recent Results</div>
          {results.slice(-5).reverse().map(r=>(
            <div key={r.id} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 0",borderBottom:"1px solid var(--border)"}}>
              <div style={{flex:1}}>
                <div style={{fontWeight:600,fontSize:13}}>{r.subject}</div>
                <div style={{fontSize:11,color:"var(--text3)"}}>{r.type} · {r.date}</div>
              </div>
              <div style={{flex:1,background:"var(--bg4)",borderRadius:20,height:6,overflow:"hidden"}}>
                <div style={{height:"100%",borderRadius:20,width:`${r.pct}%`,background:r.pct>=70?"var(--success)":r.pct>=50?"var(--warn)":"var(--danger)"}} />
              </div>
              <span style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:14,color:r.pct>=70?"var(--success)":r.pct>=50?"var(--warn)":"var(--danger)",minWidth:40,textAlign:"right"}}>{r.pct}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


// ════════════════════════════════════════════════════════════════════
// ════════════════════════════════════════════════════════════════════
// AI CHAT COMPONENT (visible to all)
// ════════════════════════════════════════════════════════════════════
function AIChat({ currentUser }) {
  const [msgs, setMsgs] = useState([{role:"ai",text:"Hi! I'm your NurseVault AI assistant 🩺 Ask me anything about nursing, pharmacology, anatomy, exam questions, or any topic you're studying!"}]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = React.useRef(null);

  const scroll = () => setTimeout(()=>endRef.current?.scrollIntoView({behavior:"smooth"}),50);

  const send = async () => {
    if (!input.trim()||loading) return;
    const q = input.trim(); setInput("");
    const newMsgs = [...msgs,{role:"user",text:q}];
    setMsgs(newMsgs); setLoading(true); scroll();
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1000,
          system:"You are a helpful nursing education assistant for NurseVault, a Nigerian nursing school platform. You help students understand nursing concepts, pharmacology, anatomy, physiology, and exam questions. Be concise, accurate, and encouraging. Use simple language appropriate for nursing students.",
          messages:newMsgs.filter(m=>m.role!=="ai"||newMsgs.indexOf(m)>0).map(m=>({role:m.role==="ai"?"assistant":"user",content:m.text}))
        })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Sorry, I couldn't get a response. Please try again.";
      setMsgs(prev=>[...prev,{role:"ai",text:reply}]);
    } catch {
      setMsgs(prev=>[...prev,{role:"ai",text:"Connection error. Please check your internet and try again."}]);
    }
    setLoading(false); scroll();
  };

  return (
    <div>
      <div style={{marginBottom:16}}>
        <div className="sec-title">🤖 AI Study Assistant</div>
        <div className="sec-sub">Powered by Claude AI · Ask anything about nursing</div>
      </div>
      <div className="ai-wrap">
        <div className="ai-msgs">
          {msgs.map((m,i)=>(
            <div key={i} className={m.role==="user"?"ai-bubble-user":"ai-bubble-ai"}>
              {m.role==="ai"&&<div style={{fontSize:10,color:"var(--accent)",fontFamily:"'DM Mono',monospace",marginBottom:4}}>🤖 NurseVault AI</div>}
              {m.text}
            </div>
          ))}
          {loading&&<div className="ai-bubble-ai"><div className="ai-typing"><div className="ai-dot"/><div className="ai-dot"/><div className="ai-dot"/></div></div>}
          <div ref={endRef}/>
        </div>
        <div style={{display:"flex",gap:8}}>
          <input className="inp" style={{flex:1,marginBottom:0}} placeholder="Ask about nursing topics, drugs, anatomy..." value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} disabled={loading}/>
          <button className="btn btn-accent" onClick={send} disabled={loading}>{loading?"...":"Ask"}</button>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// CLASS GROUP CHAT
// ════════════════════════════════════════════════════════════════════
function ClassGroupChat({ currentUser, classId, className: className_ }) {
  const key = `nv-class-chat-${classId}`;
  const [msgs, setMsgs] = useState(()=>ls(key,[{id:1,from:"System",text:`Welcome to the ${className_} group chat! 👋`,role:"system",time:new Date().toLocaleTimeString()}]));
  const [input, setInput] = useState("");
  const [dmTarget, setDmTarget] = useState(null);
  const [dmInput, setDmInput] = useState("");
  const [search, setSearch] = useState("");
  const [showUsers, setShowUsers] = useState(false);
  const [selClass, setSelClass] = useState(classId);
  const classes = ls("nv-classes", DEFAULT_CLASSES);
  const users = ls("nv-users",[]);
  const endRef = React.useRef(null);

  const classUsers = users.filter(u=>u.class===selClass&&u.role==="student");
  const filtered = classUsers.filter(u=>u.username.toLowerCase().includes(search.toLowerCase()));

  const send = () => {
    if (!input.trim()) return;
    const users2 = ls("nv-users",[]);
    const me = users2.find(u=>u.username===currentUser);
    const msg = {id:Date.now(),from:currentUser,text:input.trim(),role:me?.role||"student",time:new Date().toLocaleTimeString()};
    const u=[...msgs,msg]; setMsgs(u); lsSet(key,u); setInput("");
    setTimeout(()=>endRef.current?.scrollIntoView({behavior:"smooth"}),50);
  };

  const sendDM = () => {
    if (!dmInput.trim()||!dmTarget) return;
    const dmKey = `nv-dm-${[currentUser,dmTarget].sort().join("-")}`;
    const dms = ls(dmKey,[]);
    const msg = {id:Date.now(),from:currentUser,to:dmTarget,text:dmInput.trim(),time:new Date().toLocaleTimeString(),date:new Date().toLocaleDateString()};
    lsSet(dmKey,[...dms,msg]); setDmInput(""); setDmTarget(null);
  };

  const roleColor = r=>r==="admin"?"var(--purple)":r==="lecturer"?"#14a064":r==="system"?"var(--text3)":"var(--accent)";

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:10}}>
        <div>
          <div className="sec-title">💬 {className_} — Group Chat</div>
          <div className="sec-sub">Class channel · All members can message</div>
        </div>
        <button className="btn btn-sm btn-accent" onClick={()=>setShowUsers(p=>!p)}>👥 Class Members</button>
      </div>

      {showUsers&&(
        <div className="card" style={{marginBottom:14}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,marginBottom:10,fontSize:14}}>
            👥 Members — Select class to view:
          </div>
          <select className="inp" value={selClass} onChange={e=>setSelClass(e.target.value)} style={{marginBottom:10}}>
            {classes.map(c=><option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
          <div className="search-wrap" style={{marginBottom:8}}><span className="search-ico">🔍</span><input placeholder="Search student..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
          {filtered.length===0?<div style={{textAlign:"center",color:"var(--text3)",fontSize:12,padding:"10px 0"}}>No students in this class</div>:filtered.map(u=>(
            <div key={u.username} className="user-row" style={{marginBottom:6}}>
              <div className="user-av" style={{width:30,height:30,fontSize:13}}>{u.username[0].toUpperCase()}</div>
              <div style={{flex:1,fontSize:13,fontWeight:600}}>{u.username}</div>
              <button className="btn btn-sm btn-accent" onClick={()=>setDmTarget(u.username)}>💬 DM</button>
            </div>
          ))}
        </div>
      )}

      <div className="chat-msgs" style={{minHeight:300,maxHeight:400}}>
        {msgs.map(m=>{
          const isMe=m.from===currentUser; const isSys=m.role==="system";
          if(isSys) return <div key={m.id} className="chat-bubble system">{m.text}</div>;
          return (
            <div key={m.id} style={{display:"flex",flexDirection:"column",alignItems:isMe?"flex-end":"flex-start"}}>
              {!isMe&&<div style={{fontSize:10,color:roleColor(m.role),fontFamily:"'DM Mono',monospace",marginBottom:2}}>{m.from}</div>}
              <div className={`chat-bubble${isMe?" mine":" other"}`}>{m.text}</div>
              <div style={{fontSize:9,color:"var(--text3)",fontFamily:"'DM Mono',monospace",marginTop:1}}>{m.time}</div>
            </div>
          );
        })}
        <div ref={endRef}/>
      </div>
      <div style={{display:"flex",gap:8,marginTop:8}}>
        <input className="inp" style={{flex:1,marginBottom:0}} placeholder="Send to group..." value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}/>
        <button className="btn btn-accent" onClick={send}>Send</button>
      </div>

      {dmTarget&&(
        <div className="modal-overlay" onClick={()=>setDmTarget(null)}>
          <div className="modal" style={{maxWidth:380}} onClick={e=>e.stopPropagation()}>
            <div className="modal-head"><div className="modal-title">💬 DM to {dmTarget}</div><button className="modal-close" onClick={()=>setDmTarget(null)}>✕</button></div>
            <textarea className="inp" rows={4} style={{resize:"vertical"}} placeholder={`Message to ${dmTarget}...`} value={dmInput} onChange={e=>setDmInput(e.target.value)}/>
            <div style={{display:"flex",gap:8}}><button className="btn btn-accent" style={{flex:1}} onClick={sendDM}>Send Message</button><button className="btn" onClick={()=>setDmTarget(null)}>Cancel</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// ENHANCED PAST QUESTIONS — EXAM + STUDY MODE WITH AI
// ════════════════════════════════════════════════════════════════════
function PastQuestionsView({ toast, currentUser, userRole }) {
  const banks = ls("nv-pq", DEFAULT_PQ);
  const [selBank, setSelBank] = useState(null);
  const [mode, setMode] = useState(null); // "study"|"exam"
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [aiExplain, setAiExplain] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(()=>{
    if(!timerActive) return;
    const t=setInterval(()=>setTimer(p=>p>0?p-1:(clearInterval(t),setShowResult(true),0)),1000);
    return ()=>clearInterval(t);
  },[timerActive]);

  const bank = banks.find(b=>b.id===selBank);
  const questions = bank?.questions||[];
  const q = questions[idx];

  const getAI = async (question, correctAns, options) => {
    setAiLoading(true); setAiExplain("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",max_tokens:500,
          messages:[{role:"user",content:`Nursing exam question: "${question}"\nOptions: ${options.map((o,i)=>`${String.fromCharCode(65+i)}. ${o}`).join(", ")}\nCorrect answer: ${String.fromCharCode(65+correctAns)}. ${options[correctAns]}\n\nGive a brief, clear explanation of why this is correct and key points to remember. Keep it under 150 words.`}]
        })
      });
      const d = await res.json(); setAiExplain(d.content?.[0]?.text||"Could not load explanation.");
    } catch { setAiExplain("AI explanation unavailable offline."); }
    setAiLoading(false);
  };

  const startExam = () => { setMode("exam"); setIdx(0); setAnswers({}); setScore(0); setShowResult(false); setTimer(questions.length*90); setTimerActive(true); };
  const startStudy = () => { setMode("study"); setIdx(0); setSelected(null); setAnswered(false); setAiExplain(""); };

  const handleStudyAns = (i) => {
    if(answered) return; setSelected(i); setAnswered(true);
    if(i===q.ans) setScore(s=>s+1);
    getAI(q.q, q.ans, q.options);
  };

  const nextStudy = () => { setIdx(p=>p+1); setSelected(null); setAnswered(false); setAiExplain(""); };

  const handleExamAns = (qi, ai) => { setAnswers(p=>({...p,[qi]:ai})); };

  const submitExam = () => {
    setTimerActive(false);
    let s=0; questions.forEach((q2,i)=>{ if(answers[i]===q2.ans) s++; }); setScore(s); setShowResult(true);
  };

  const fmt = (s) => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

  if(!selBank) return (
    <div>
      <div className="sec-title">❓ Past Questions</div>
      <div className="sec-sub">Select a question bank to study or take an exam</div>
      <div className="search-wrap" style={{marginTop:14}}><span className="search-ico">🔍</span><input placeholder="Search question banks..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
      <div className="grid2">
        {banks.filter(b=>b.subject.toLowerCase().includes(search.toLowerCase())).map(b=>(
          <div key={b.id} className="card" style={{cursor:"pointer",transition:"all .2s"}} onClick={()=>setSelBank(b.id)}>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:16,marginBottom:4}}>{b.subject}</div>
            <div style={{fontSize:12,color:"var(--text3)"}}>{b.year||"General"} · {b.questions.length} questions</div>
            <div style={{display:"flex",gap:6,marginTop:10}}>
              <span className="tag tag-accent">📖 Study</span>
              <span className="tag tag-warn">⏱ Exam</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if(!mode) return (
    <div>
      <button className="btn btn-sm" style={{marginBottom:16}} onClick={()=>setSelBank(null)}>← Back</button>
      <div className="sec-title">{bank?.subject}</div>
      <div className="sec-sub">{bank?.year||"General"} · {questions.length} questions</div>
      <div className="grid2" style={{marginTop:20}}>
        <div className="card" style={{textAlign:"center",cursor:"pointer",border:"2px solid var(--accent)"}} onClick={startStudy}>
          <div style={{fontSize:40,marginBottom:10}}>📖</div>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:18}}>Study Mode</div>
          <div style={{fontSize:12,color:"var(--text3)",marginTop:6}}>Learn at your own pace with AI explanations after each question</div>
        </div>
        <div className="card" style={{textAlign:"center",cursor:"pointer",border:"2px solid var(--warn)"}} onClick={startExam}>
          <div style={{fontSize:40,marginBottom:10}}>⏱️</div>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:18}}>Exam Mode</div>
          <div style={{fontSize:12,color:"var(--text3)",marginTop:6}}>Timed exam with all questions at once. Score at the end</div>
        </div>
      </div>
    </div>
  );

  if(showResult) return (
    <div>
      <div className="exam-header" style={{textAlign:"center"}}>
        <div style={{fontSize:48,marginBottom:8}}>🎓</div>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:28}}>{score}/{questions.length}</div>
        <div style={{fontSize:14,color:"var(--text2)",marginTop:4}}>{Math.round(score/questions.length*100)}% · {score>=questions.length*.7?"Pass ✅":"Needs Review ❌"}</div>
      </div>
      <div style={{display:"flex",gap:10}}>
        <button className="btn btn-accent" onClick={()=>{setMode(null);setShowResult(false);}} style={{flex:1}}>Try Again</button>
        <button className="btn" onClick={()=>{setSelBank(null);setMode(null);setShowResult(false);}}>← Banks</button>
      </div>
    </div>
  );

  if(mode==="study") {
    if(idx>=questions.length) return (
      <div style={{textAlign:"center",padding:"40px"}}>
        <div style={{fontSize:48}}>🏆</div>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:24,marginTop:8}}>Complete! {score}/{questions.length}</div>
        <div style={{marginTop:16,display:"flex",gap:10,justifyContent:"center"}}>
          <button className="btn btn-accent" onClick={startStudy}>Restart</button>
          <button className="btn" onClick={()=>{setSelBank(null);setMode(null);}}>← Banks</button>
        </div>
      </div>
    );
    return (
      <div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <button className="btn btn-sm" onClick={()=>setMode(null)}>← Exit</button>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:"var(--text3)"}}>{idx+1}/{questions.length} · Score: {score}</div>
        </div>
        <div className="exam-progress"><div className="exam-progress-fill" style={{width:`${(idx/questions.length)*100}%`}}/></div>
        <div className="card" style={{marginBottom:14}}>
          <div style={{fontWeight:700,fontSize:15,lineHeight:1.5,marginBottom:16}}>{idx+1}. {q.q}</div>
          {q.options.map((o,i)=>{
            let cls="quiz-opt";
            if(answered){ if(i===q.ans) cls+=" correct"; else if(i===selected&&i!==q.ans) cls+=" wrong"; }
            return <div key={i} className={cls} onClick={()=>handleStudyAns(i)}><b>{"ABCD"[i]}.</b> {o}</div>;
          })}
        </div>
        {answered&&(
          <div className="card" style={{borderLeft:"3px solid var(--accent)",marginBottom:14}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"var(--accent)",marginBottom:6}}>🤖 AI EXPLANATION</div>
            {aiLoading?<div className="ai-typing"><div className="ai-dot"/><div className="ai-dot"/><div className="ai-dot"/></div>:<div style={{fontSize:13,lineHeight:1.7,color:"var(--text2)"}}>{aiExplain}</div>}
          </div>
        )}
        {answered&&idx<questions.length-1&&<button className="btn btn-accent" style={{width:"100%"}} onClick={nextStudy}>Next Question →</button>}
        {answered&&idx===questions.length-1&&<button className="btn btn-accent" style={{width:"100%"}} onClick={()=>setIdx(questions.length)}>See Results 🏆</button>}
      </div>
    );
  }

  // EXAM MODE
  return (
    <div>
      <div className="exam-header">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
          <div>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:"var(--text3)"}}>⏱️ EXAM MODE</div>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:16}}>{bank?.subject}</div>
          </div>
          <div className="exam-timer">{fmt(timer)}</div>
        </div>
        <div className="exam-progress"><div className="exam-progress-fill" style={{width:`${Object.keys(answers).length/questions.length*100}%`}}/></div>
        <div style={{fontSize:11,color:"var(--text3)",fontFamily:"'DM Mono',monospace"}}>{Object.keys(answers).length}/{questions.length} answered</div>
      </div>
      {questions.map((qu,qi)=>(
        <div key={qi} className="card" style={{marginBottom:12}}>
          <div style={{fontWeight:700,fontSize:14,lineHeight:1.5,marginBottom:12}}>{qi+1}. {qu.q}</div>
          {qu.options.map((o,oi)=>(
            <div key={oi} className="quiz-opt" style={{background:answers[qi]===oi?"rgba(62,142,149,.15)":"",borderColor:answers[qi]===oi?"var(--accent)":""}} onClick={()=>handleExamAns(qi,oi)}>
              <b>{"ABCD"[oi]}.</b> {o}
            </div>
          ))}
        </div>
      ))}
      <button className="btn btn-accent" style={{width:"100%",padding:14,fontSize:15,marginBottom:30}} onClick={submitExam}>Submit Exam 📋</button>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// STUDENT EXAM VIEW
// ════════════════════════════════════════════════════════════════════
function StudentExams({ toast, currentUser }) {
  const classes = ls("nv-classes", DEFAULT_CLASSES);
  const users = ls("nv-users", []);
  const me = users.find(u=>u.username===currentUser);
  const myClassId = me?.class||"";
  const [exams] = useLs("nv-exams", []);
  const [selExam, setSelExam] = useState(null);
  const [mode, setMode] = useState(null); // null | "taking" | "result"
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [search, setSearch] = useState("");

  const pubExams = exams.filter(e=>e.published && (e.classId===myClassId||!myClassId));
  const filtered = pubExams.filter(e=>(e.title+e.course+e.type).toLowerCase().includes(search.toLowerCase()));
  const cur = exams.find(e=>e.id===selExam);
  const cls = id=>classes.find(c=>c.id===id);

  useEffect(()=>{
    if(!timerActive) return;
    const t=setInterval(()=>{
      setTimer(p=>{
        if(p<=1){ clearInterval(t); return 0; }
        return p-1;
      });
    },1000);
    return ()=>clearInterval(t);
  },[timerActive]);

  // Auto-submit when timer hits 0
  useEffect(()=>{
    if(timerActive && timer===0){ submitExam(); }
  },[timer, timerActive]);

  const startExam = (exam) => {
    setSelExam(exam.id); setMode("taking");
    setAnswers({}); setScore(0); setShowResult(false);
    setTimer(exam.duration*60); setTimerActive(true);
  };

  const submitExam = () => {
    setTimerActive(false);
    const curExam = exams.find(e=>e.id===selExam);
    const qs = curExam?.questions||[];
    let s=0; qs.forEach((q,i)=>{ if(answers[i]===q.ans) s++; });
    setScore(s); setShowResult(true); setMode("result");
  };

  const fmt = s => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
  const pct = () => cur ? Math.round(score/cur.questions.length*100) : 0;

  if (showResult && cur) return (
    <div>
      <div className="exam-header" style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:52,marginBottom:8}}>{pct()>=70?"🏆":"📊"}</div>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:32}}>{score}/{cur.questions.length}</div>
        <div style={{fontSize:16,color:"var(--text2)",margin:"6px 0"}}>{pct()}%</div>
        <div style={{fontWeight:700,fontSize:18,color:pct()>=70?"var(--success)":"var(--danger)"}}>{pct()>=70?"Pass ✅":"Needs Review ❌"}</div>
        <div style={{fontSize:13,color:"var(--text3)",marginTop:4}}>{cur.title} · {cur.course}</div>
      </div>
      {/* Review answers */}
      <div className="card" style={{marginBottom:16}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,marginBottom:12}}>📝 Answer Review</div>
        {cur.questions.map((q,qi)=>{
          const userAns = answers[qi];
          const correct = q.ans;
          const isRight = userAns===correct;
          return (
            <div key={qi} className="card2" style={{marginBottom:8,borderLeft:`3px solid ${isRight?"var(--success)":"var(--danger)"}`}}>
              <div style={{fontWeight:600,fontSize:13,marginBottom:6,lineHeight:1.4}}>{qi+1}. {q.q}</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                {q.options.map((opt,oi)=>{
                  let bg="rgba(255,255,255,.04)"; let border="var(--border)"; let color="var(--text3)";
                  if(oi===correct){ bg="rgba(74,222,128,.12)"; border="var(--success)"; color="var(--success)"; }
                  if(oi===userAns&&!isRight&&oi!==correct){ bg="rgba(248,113,113,.12)"; border="var(--danger)"; color="var(--danger)"; }
                  return <span key={oi} style={{fontSize:11,padding:"3px 9px",borderRadius:5,background:bg,border:`1px solid ${border}`,color}}><b>{"ABCD"[oi]}.</b> {opt}{oi===correct?" ✓":""}{oi===userAns&&oi!==correct?" ✗":""}</span>;
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{display:"flex",gap:10}}>
        <button className="btn btn-accent" style={{flex:1}} onClick={()=>{setSelExam(null);setMode(null);setShowResult(false);}}>← Back to Exams</button>
        <button className="btn btn-success" onClick={()=>startExam(cur)}>🔄 Retake</button>
      </div>
    </div>
  );

  if (mode==="taking" && cur) return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,flexWrap:"wrap",gap:8}}>
        <div>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:17}}>{cur.title}</div>
          <div style={{fontSize:12,color:"var(--text3)",fontFamily:"'DM Mono',monospace"}}>{cur.course} · {Object.keys(answers).length}/{cur.questions.length} answered</div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:18,fontWeight:700,color:timer<300?"var(--danger)":"var(--warn)",padding:"6px 12px",background:"var(--card2)",borderRadius:8}}>⏱ {fmt(timer)}</div>
          <button className="btn btn-success" onClick={submitExam}>Submit →</button>
        </div>
      </div>
      <div className="exam-progress" style={{marginBottom:18}}>
        <div className="exam-progress-fill" style={{width:`${(Object.keys(answers).length/cur.questions.length)*100}%`}}/>
      </div>
      {cur.instructions&&(
        <div style={{background:"rgba(62,142,149,.08)",border:"1px solid rgba(62,142,149,.2)",borderRadius:8,padding:"10px 14px",fontSize:13,color:"var(--text2)",marginBottom:14,fontFamily:"'DM Mono',monospace"}}>
          📌 {cur.instructions}
        </div>
      )}
      {cur.questions.map((q,qi)=>(
        <div key={qi} className="card" style={{marginBottom:12}}>
          <div style={{fontWeight:600,fontSize:14,lineHeight:1.5,marginBottom:10}}>{qi+1}. {q.q}</div>
          {q.options.map((opt,oi)=>(
            <div key={oi}
              onClick={()=>setAnswers(p=>({...p,[qi]:oi}))}
              className="quiz-opt"
              style={{
                background:answers[qi]===oi?"rgba(62,142,149,.18)":"",
                borderColor:answers[qi]===oi?"var(--accent)":"",
                color:answers[qi]===oi?"var(--text)":"",
                cursor:"pointer"
              }}>
              <b>{"ABCD"[oi]}.</b> {opt}
            </div>
          ))}
        </div>
      ))}
      <div style={{display:"flex",gap:10,marginTop:8}}>
        <button className="btn btn-success" style={{flex:1}} onClick={submitExam}>Submit Exam →</button>
        <button className="btn btn-danger" onClick={()=>{setTimerActive(false);setSelExam(null);setMode(null);}}>✕ Abandon</button>
      </div>
    </div>
  );

  // Exam list view
  return (
    <div>
      <div style={{marginBottom:16}}>
        <div className="sec-title">📋 My Exams & Tests</div>
        <div className="sec-sub">{filtered.length} available for {myClassId ? cls(myClassId)?.label||"your class" : "all classes"}</div>
      </div>
      <div className="search-wrap"><span className="search-ico">🔍</span><input placeholder="Search exams..." value={search} onChange={e=>setSearch(e.target.value)}/></div>

      {filtered.length===0&&(
        <div style={{textAlign:"center",padding:"60px",color:"var(--text3)"}}>
          <div style={{fontSize:48}}>📋</div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,marginTop:12}}>No published exams for your class yet.<br/>Check back later!</div>
        </div>
      )}

      <div className="grid2">
        {filtered.map((ex,i)=>(
          <div key={ex.id} className="card" style={{animationDelay:`${i*.04}s`}}>
            <div style={{display:"flex",gap:6,marginBottom:8,flexWrap:"wrap"}}>
              <span className="tag" style={{background:"rgba(62,142,149,.1)",borderColor:"var(--accent)",color:"var(--accent)"}}>{ex.type}</span>
              {cls(ex.classId)&&<span className="tag tag-purple">{cls(ex.classId).label}</span>}
              <span className="tag tag-success">📢 Live</span>
            </div>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:16,marginBottom:4}}>{ex.title}</div>
            <div style={{fontSize:12,color:"var(--text3)",fontFamily:"'DM Mono',monospace",marginBottom:6}}>{ex.course}</div>
            <div style={{display:"flex",gap:14,fontSize:11,color:"var(--text3)",fontFamily:"'DM Mono',monospace",marginBottom:12}}>
              <span>❓ {ex.questions.length} questions</span>
              <span>⏱ {ex.duration} min</span>
              <span>📅 {ex.date}</span>
            </div>
            {ex.instructions&&<div style={{fontSize:11,color:"var(--text2)",background:"var(--card2)",borderRadius:6,padding:"6px 10px",marginBottom:10}}>{ex.instructions}</div>}
            <button className="btn btn-accent" style={{width:"100%"}} onClick={()=>startExam(ex)} disabled={ex.questions.length===0}>
              {ex.questions.length===0?"No questions yet":"Start Exam →"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// LECTURER EXAMS & TEST QUESTIONS
// ════════════════════════════════════════════════════════════════════
function LecturerExams({ toast, currentUser }) {
  const classes = ls("nv-classes", DEFAULT_CLASSES);
  const [exams, setExams] = useLs("nv-exams", []);
  const [selExam, setSelExam] = useState(null);

  // Exam list/create state
  const [showExamModal, setShowExamModal] = useState(false);
  const [editExam, setEditExam] = useState(null);
  const [examForm, setExamForm] = useState({ title:"", classId:"", course:"", type:"Exam", duration:60, instructions:"" });

  // Question state
  const [showQModal, setShowQModal] = useState(false);
  const [editQ, setEditQ] = useState(null);
  const [qForm, setQForm] = useState({ q:"", options:["","","",""], ans:0 });

  // Paste mode
  const [pasteMode, setPasteMode] = useState(false);
  const [pasteText, setPasteText] = useState("");
  const [pasteAnswers, setPasteAnswers] = useState("");
  const [parsed, setParsed] = useState([]);

  const myExams = exams.filter(e => e.author === currentUser);
  const cur = exams.find(e => e.id === selExam);
  const cls = id => classes.find(c => c.id === id);

  // ── Exam CRUD ──
  const saveExam = () => {
    if (!examForm.title) return toast("Exam title required","error");
    if (!examForm.classId) return toast("Please select a class","error");
    if (!examForm.course) return toast("Please enter a course/subject","error");
    const item = { ...examForm, id: editExam||`exam_${Date.now()}`, author: currentUser, date: new Date().toLocaleDateString(), questions: editExam ? (exams.find(e=>e.id===editExam)?.questions||[]) : [], published: false };
    let u;
    if (editExam) { u = exams.map(e=>e.id===editExam?{...e,...examForm}:e); toast("Exam updated","success"); }
    else { u = [item, ...exams]; toast("Exam created! Now add questions.","success"); setSelExam(item.id); }
    setExams(u); lsSet("nv-exams",u);
    setShowExamModal(false); setEditExam(null); setExamForm({title:"",classId:"",course:"",type:"Exam",duration:60,instructions:""});
  };

  const delExam = (id) => {
    const u = exams.filter(e=>e.id!==id); setExams(u); lsSet("nv-exams",u);
    if (selExam===id) setSelExam(null);
    toast("Exam deleted","success");
  };

  const togglePublish = (id) => {
    const u = exams.map(e=>e.id===id?{...e,published:!e.published}:e);
    setExams(u); lsSet("nv-exams",u);
    const exam = u.find(e=>e.id===id);
    toast(exam.published?"📢 Exam published! Students can now see it.":"Exam unpublished.","success");
  };

  // ── Question CRUD ──
  const saveQ = () => {
    if (!qForm.q.trim()) return toast("Question text required","error");
    if (qForm.options.some(o=>!o.trim())) return toast("All 4 options required","error");
    const u = exams.map(e=>{
      if (e.id!==selExam) return e;
      const qs = editQ!==null ? e.questions.map((q,i)=>i===editQ?{...qForm}:q) : [...e.questions,{...qForm,options:[...qForm.options]}];
      return {...e, questions:qs};
    });
    setExams(u); lsSet("nv-exams",u);
    toast(editQ!==null?"Question updated":"Question added","success");
    setShowQModal(false); setEditQ(null); setQForm({q:"",options:["","","",""],ans:0});
  };

  const delQ = (qi) => {
    const u = exams.map(e=>e.id===selExam?{...e,questions:e.questions.filter((_,i)=>i!==qi)}:e);
    setExams(u); lsSet("nv-exams",u); toast("Question deleted","success");
  };

  // ── Parse helpers ──
  const parseAnswerKey = (raw) => {
    if (!raw) return 0;
    const cleaned = raw.trim().replace(/[^a-dA-D1-4]/g,"").toUpperCase();
    if (["A","B","C","D"].includes(cleaned[0])) return ["A","B","C","D"].indexOf(cleaned[0]);
    if (!isNaN(cleaned)) return Math.min(3, Math.max(0, parseInt(cleaned)-1));
    return 0;
  };

  const parseQuestionsBlock = (text) => {
    const lines = text.split("\n").map(l=>l.trim()).filter(l=>l);
    const items = [];

    // Pipe-delimited: Question | A | B | C | D  (answer optional at end)
    if (lines.some(l => (l.match(/\|/g)||[]).length >= 3)) {
      lines.forEach(line => {
        if ((line.match(/\|/g)||[]).length < 3) return;
        const p = line.split("|").map(x=>x.trim());
        const qText = p[0].replace(/^\d+[\.\)\s]+/,"").trim();
        const options = [p[1]||"", p[2]||"", p[3]||"", p[4]||""];
        const ans = p[5] ? parseAnswerKey(p[5]) : 0;
        if (qText && options.some(o=>o)) items.push({ q:qText, options, ans });
      });
      return items;
    }

    // Numbered MCQ blocks:
    // 1. Question\nA. opt\nB. opt\nC. opt\nD. opt
    // also handles "a)" "A)" "(A)" "(a)"
    let cur = null;
    lines.forEach(line => {
      // Question line: starts with number
      const qMatch = line.match(/^(\d+)[\.\)\s]+(.+)/);
      // Option line: starts with A/B/C/D letter
      const optMatch = line.match(/^[\(\[]?([A-Da-d])[\.\)\]\s]+(.+)/);

      if (qMatch && !optMatch) {
        if (cur) items.push(cur);
        cur = { q: qMatch[2].trim(), options:["","","",""], ans:0 };
      } else if (optMatch && cur) {
        const idx = ["A","B","C","D"].indexOf(optMatch[1].toUpperCase());
        if (idx >= 0) cur.options[idx] = optMatch[2].trim();
      } else if (!qMatch && !optMatch && cur && !cur.q.endsWith("?") && line.length > 0) {
        // continuation of question text
        cur.q += " " + line;
      }
    });
    if (cur) items.push(cur);
    return items.filter(i => i.q && i.options.filter(o=>o).length >= 2);
  };

  const parseAnswersBlock = (text) => {
    if (!text.trim()) return [];
    const answers = [];

    // Pattern: "1. A" or "1) A" or "1- A" or "1A" or "1:A"
    const numbered = /(\d+)[\.:\)\-\s]+([A-Da-d])/g;
    let m, found = false;
    while ((m = numbered.exec(text)) !== null) {
      const idx = parseInt(m[1]) - 1;
      answers[idx] = ["A","B","C","D"].indexOf(m[2].toUpperCase());
      found = true;
    }
    if (found) return answers;

    // Fallback: just letters in order (space/comma/newline separated)
    const letters = text.match(/[A-Da-d]/g) || [];
    return letters.map(l => ["A","B","C","D"].indexOf(l.toUpperCase()));
  };

  // ── Parse & match ──
  const parseSplit = () => {
    if (!pasteText.trim()) return toast("Paste your questions first","error");
    const qItems = parseQuestionsBlock(pasteText);
    if (qItems.length === 0) return toast("Could not parse questions. Check the format — use numbered questions with A. B. C. D. options.","error");

    if (pasteAnswers.trim()) {
      const answerKey = parseAnswersBlock(pasteAnswers);
      qItems.forEach((item, i) => {
        if (answerKey[i] !== undefined && answerKey[i] >= 0) item.ans = answerKey[i];
      });
      toast(`✅ ${qItems.length} questions parsed, answers matched!`, "success");
    } else {
      toast(`${qItems.length} questions parsed. No answers provided — you can set them after importing.`, "warn");
    }
    setParsed(qItems);
  };

  const importParsed = () => {
    if (!selExam) return toast("Select an exam first","error");
    const u = exams.map(e => {
      if (e.id !== selExam) return e;
      return {...e, questions:[...e.questions, ...parsed]};
    });
    setExams(u); lsSet("nv-exams", u);
    toast(`${parsed.length} questions added to exam!`, "success");
    setPasteText(""); setPasteAnswers(""); setParsed([]); setPasteMode(false);
  };

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:10}}>
        <div>
          <div className="sec-title">📋 My Exams & Tests</div>
          <div className="sec-sub">{myExams.length} exam{myExams.length!==1?"s":""} created</div>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button className="btn btn-success" onClick={()=>{setPasteMode(true);setParsed([]);setPasteText("");setPasteAnswers("");}}>📋 Paste & Parse</button>
          <button className="btn btn-accent" style={{background:"#14a064",borderColor:"#14a064"}} onClick={()=>{setShowExamModal(true);setEditExam(null);setExamForm({title:"",classId:"",course:"",type:"Exam",duration:60,instructions:""});}}>+ Create Exam</button>
        </div>
      </div>

      {/* Exam list */}
      {myExams.length===0&&!selExam&&(
        <div style={{textAlign:"center",padding:"50px",color:"var(--text3)"}}>
          <div style={{fontSize:48}}>📋</div>
          <div style={{fontSize:13,marginTop:12}}>No exams yet.<br/>Click "+ Create Exam" to get started.</div>
        </div>
      )}

      <div className="grid2" style={{marginBottom:18}}>
        {myExams.map((ex,i)=>(
          <div key={ex.id} className="card" style={{cursor:"pointer",border:selExam===ex.id?"1.5px solid #14a064":"1px solid var(--border)",transition:"border .15s",animationDelay:`${i*.04}s`}} onClick={()=>setSelExam(ex.id)}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
              <div style={{flex:1}}>
                {selExam===ex.id&&<div style={{fontSize:9,color:"#14a064",marginBottom:2}}>● SELECTED</div>}
                <div style={{display:"flex",gap:6,marginBottom:6,flexWrap:"wrap"}}>
                  <span className="tag" style={{background:"rgba(20,160,100,.12)",borderColor:"#14a064",color:"#14a064"}}>{ex.type}</span>
                  {ex.published ? <span className="tag tag-success">📢 Published</span> : <span className="tag" style={{color:"var(--text3)"}}>Draft</span>}
                </div>
                <div style={{fontSize:15,marginBottom:3}}>{ex.title}</div>
                <div style={{fontSize:11,color:"var(--text3)"}}>{cls(ex.classId)?.label||"No class"} · {ex.course} · {ex.questions.length} Q · {ex.duration} min</div>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:4,flexShrink:0}}>
                <button className="btn btn-sm" onClick={e=>{e.stopPropagation();setEditExam(ex.id);setExamForm({title:ex.title,classId:ex.classId,course:ex.course,type:ex.type,duration:ex.duration,instructions:ex.instructions||""});setShowExamModal(true);}}>✏️</button>
                <button className="btn btn-sm btn-danger" onClick={e=>{e.stopPropagation();delExam(ex.id);}}>🗑️</button>
                <button className={`btn btn-sm ${ex.published?"btn-warn":"btn-success"}`} onClick={e=>{e.stopPropagation();togglePublish(ex.id);}}>{ex.published?"🔒":"📢"}</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Question manager for selected exam */}
      {cur && (
        <div className="card">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,flexWrap:"wrap",gap:8}}>
            <div>
              <div style={{fontSize:16}}>{cur.title}</div>
              <div style={{fontSize:11,color:"var(--text3)"}}>{cls(cur.classId)?.label} · {cur.course} · {cur.questions.length} question{cur.questions.length!==1?"s":""} · {cur.duration} min</div>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button className="btn btn-accent btn-sm" style={{background:"#14a064",borderColor:"#14a064"}} onClick={()=>{setShowQModal(true);setEditQ(null);setQForm({q:"",options:["","","",""],ans:0});}}>+ Add Question</button>
            </div>
          </div>

          {cur.questions.length===0&&(
            <div style={{textAlign:"center",padding:"24px",color:"var(--text3)",fontSize:13}}>
              No questions yet. Click <b>"📋 Paste & Parse"</b> to bulk-add or <b>"+ Add Question"</b> for one at a time.
            </div>
          )}

          {cur.questions.map((q,qi)=>(
            <div key={qi} className="card2" style={{marginBottom:8}}>
              <div style={{display:"flex",justifyContent:"space-between",gap:10}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,marginBottom:8,lineHeight:1.5}}>{qi+1}. {q.q}</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                    {q.options.map((opt,oi)=>(
                      <span key={oi} style={{fontSize:11,padding:"3px 9px",borderRadius:5,
                        background:oi===q.ans?"rgba(74,222,128,.15)":"rgba(255,255,255,.04)",
                        border:`1px solid ${oi===q.ans?"var(--success)":"var(--border)"}`,
                        color:oi===q.ans?"var(--success)":"var(--text3)"}}>
                        <b>{"ABCD"[oi]}.</b> {opt} {oi===q.ans?"✓":""}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{display:"flex",gap:4,flexShrink:0}}>
                  <button className="btn btn-sm" onClick={()=>{setEditQ(qi);setQForm({q:q.q,options:[...q.options],ans:q.ans});setShowQModal(true);}}>✏️</button>
                  <button className="btn btn-sm btn-danger" onClick={()=>delQ(qi)}>🗑️</button>
                </div>
              </div>
            </div>
          ))}

          {cur.questions.length > 0 && (
            <div style={{marginTop:14,padding:"10px 14px",background:cur.published?"rgba(74,222,128,.08)":"rgba(251,146,60,.08)",border:`1px solid ${cur.published?"rgba(74,222,128,.2)":"rgba(251,146,60,.2)"}`,borderRadius:8,fontSize:12,color:cur.published?"var(--success)":"var(--warn)"}}>
              {cur.published ? `📢 Live — ${cls(cur.classId)?.label} students can see and take this.` : `🔒 Draft — click 📢 to publish for ${cls(cur.classId)?.label} students.`}
            </div>
          )}
        </div>
      )}

      {/* ── PASTE MODAL ── */}
      {pasteMode&&(
        <div className="modal-overlay" onClick={()=>{setPasteMode(false);setParsed([]);setPasteText("");setPasteAnswers("");}}>
          <div className="modal lg" style={{maxWidth:640,maxHeight:"90vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <div className="modal-title">📋 Paste & Auto-Parse Questions</div>
                <div style={{fontSize:11,color:"var(--text3)",marginTop:2}}>
                  {cur ? <>Adding to: <b style={{color:"#14a064"}}>{cur.title}</b></> : "Select an exam below to add questions"}
                </div>
              </div>
              <button className="modal-close" onClick={()=>{setPasteMode(false);setParsed([]);setPasteText("");setPasteAnswers("");}}>✕</button>
            </div>

            {/* Exam selector if none selected */}
            {!cur&&(
              <div style={{marginBottom:16}}>
                <label style={{fontSize:12,color:"var(--text3)",display:"block",marginBottom:6}}>Select exam to add questions to:</label>
                {myExams.length===0
                  ? <div style={{padding:"12px",background:"var(--bg4)",borderRadius:8,fontSize:13,color:"var(--text3)"}}>No exams yet. Create an exam first, then paste questions.</div>
                  : <select className="inp" onChange={e=>setSelExam(e.target.value)} value={selExam||""}>
                      <option value="">— Choose an exam —</option>
                      {myExams.map(e=><option key={e.id} value={e.id}>{e.title} ({e.questions.length} questions)</option>)}
                    </select>
                }
              </div>
            )}

            {/* STEP 1 — Questions */}
            <div style={{marginBottom:16}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                <div style={{width:24,height:24,borderRadius:"50%",background:"var(--accent)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:"white",flexShrink:0}}>1</div>
                <div>
                  <div style={{fontSize:13}}>Paste your exam questions</div>
                  <div style={{fontSize:11,color:"var(--text3)"}}>Numbered questions with A. B. C. D. options — one question block at a time</div>
                </div>
              </div>
              <div style={{background:"var(--bg4)",border:"1px solid rgba(62,142,149,.25)",borderRadius:9,padding:"8px 10px",fontSize:10,color:"var(--text3)",marginBottom:8,lineHeight:1.8}}>
                <b style={{color:"var(--accent)"}}>Example format:</b><br/>
                1. Which part of the brain controls balance?<br/>
                A. Cerebrum &nbsp;&nbsp; B. Cerebellum &nbsp;&nbsp; C. Medulla &nbsp;&nbsp; D. Thalamus<br/><br/>
                2. Normal adult heart rate is:<br/>
                A. 40–60 bpm &nbsp;&nbsp; B. 60–100 bpm &nbsp;&nbsp; C. 100–120 bpm &nbsp;&nbsp; D. 120–140 bpm
              </div>
              <textarea
                style={{width:"100%",background:"var(--card)",border:`1.5px solid ${pasteText?"rgba(62,142,149,.5)":"rgba(62,142,149,.2)"}`,borderRadius:9,padding:"11px 13px",color:"var(--text)",fontSize:13,resize:"vertical",outline:"none",lineHeight:1.7,transition:"border-color .2s"}}
                rows={8}
                placeholder={"1. Which part of the brain controls balance and coordination?\nA. Cerebrum\nB. Cerebellum\nC. Medulla Oblongata\nD. Thalamus\n\n2. The antidote for paracetamol overdose is:\nA. Naloxone\nB. Atropine\nC. N-Acetylcysteine\nD. Flumazenil"}
                value={pasteText}
                onChange={e=>{ setPasteText(e.target.value); setParsed([]); }}
              />
            </div>

            {/* STEP 2 — Answers */}
            <div style={{marginBottom:16}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                <div style={{width:24,height:24,borderRadius:"50%",background:"var(--success)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:"white",flexShrink:0}}>2</div>
                <div>
                  <div style={{fontSize:13}}>Paste the answer key <span style={{color:"var(--text3)",fontWeight:400}}>(optional)</span></div>
                  <div style={{fontSize:11,color:"var(--text3)"}}>Answer 1 matches Question 1, Answer 2 matches Question 2, and so on</div>
                </div>
              </div>
              <div style={{background:"var(--bg4)",border:"1px solid rgba(74,222,128,.2)",borderRadius:9,padding:"8px 10px",fontSize:10,color:"var(--text3)",marginBottom:8,lineHeight:1.8}}>
                <b style={{color:"var(--success)"}}>Any of these formats work:</b><br/>
                <span style={{color:"var(--text2)"}}>1. B &nbsp;&nbsp; 2. C &nbsp;&nbsp; 3. A &nbsp;&nbsp; 4. D</span> &nbsp;·&nbsp;
                <span style={{color:"var(--text2)"}}>1-B, 2-C, 3-A</span> &nbsp;·&nbsp;
                <span style={{color:"var(--text2)"}}>B C A D</span> &nbsp;·&nbsp;
                <span style={{color:"var(--text2)"}}>B{"\n"}C{"\n"}A</span>
              </div>
              <textarea
                style={{width:"100%",background:"var(--card)",border:`1.5px solid ${pasteAnswers?"rgba(74,222,128,.4)":"rgba(74,222,128,.2)"}`,borderRadius:9,padding:"11px 13px",color:"var(--text)",fontSize:13,resize:"vertical",outline:"none",lineHeight:1.7,transition:"border-color .2s"}}
                rows={4}
                placeholder={"1. B\n2. C\n3. A\n4. D\n\n— or —\n\nB C A D"}
                value={pasteAnswers}
                onChange={e=>{ setPasteAnswers(e.target.value); setParsed([]); }}
              />
            </div>

            {/* Parse button */}
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:parsed.length?0:4}}>
              <button className="btn btn-accent" style={{flex:1,padding:"11px"}} onClick={parseSplit}>
                🔍 Parse & Match Answers
              </button>
              {parsed.length>0&&(
                <button className="btn btn-success" style={{flex:1,padding:"11px"}} onClick={importParsed}>
                  ✅ Import {parsed.length} Question{parsed.length>1?"s":" "}into Exam
                </button>
              )}
            </div>

            {/* Preview */}
            {parsed.length>0&&(
              <div style={{marginTop:16,borderTop:"1px solid var(--border)",paddingTop:14}}>
                <div style={{fontSize:11,color:"var(--text3)",marginBottom:10,display:"flex",alignItems:"center",gap:8}}>
                  <span style={{width:7,height:7,borderRadius:"50%",background:"var(--success)",display:"inline-block",flexShrink:0}}/>
                  <b style={{color:"var(--text)"}}>{parsed.length} question{parsed.length>1?"s":""} parsed</b> — review then click Import
                </div>
                {parsed.map((p,i)=>(
                  <div key={i} style={{background:"var(--bg4)",border:"1px solid var(--border)",borderRadius:9,padding:"10px 12px",marginBottom:8}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8,marginBottom:8}}>
                      <div style={{fontSize:13,lineHeight:1.4,flex:1}}><b>{i+1}.</b> {p.q}</div>
                      <span style={{fontSize:11,color:"var(--success)",flexShrink:0,background:"rgba(74,222,128,.12)",border:"1px solid rgba(74,222,128,.3)",borderRadius:5,padding:"2px 9px"}}>
                        ✓ Ans: <b>{"ABCD"[p.ans]}</b>
                      </span>
                    </div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                      {p.options.map((opt,oi)=>(
                        <span key={oi} style={{
                          fontSize:11,padding:"3px 9px",borderRadius:5,
                          background:oi===p.ans?"rgba(74,222,128,.13)":"rgba(255,255,255,.03)",
                          border:`1px solid ${oi===p.ans?"var(--success)":"var(--border)"}`,
                          color:oi===p.ans?"var(--success)":"var(--text3)"
                        }}>
                          <b>{"ABCD"[oi]}.</b> {opt||<i style={{opacity:.35}}>—</i>}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                <button className="btn btn-success" style={{width:"100%",padding:"11px",marginTop:4}} onClick={importParsed}>
                  ✅ Import {parsed.length} Question{parsed.length>1?"s":""} into Exam
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Exam create/edit modal */}
      {showExamModal&&(
        <div className="modal-overlay" onClick={()=>setShowExamModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-head">
              <div className="modal-title" style={{color:"#14a064"}}>{editExam?"Edit Exam":"Create New Exam"}</div>
              <button className="modal-close" onClick={()=>setShowExamModal(false)}>✕</button>
            </div>
            <label className="lbl">Exam Title</label>
            <input className="inp" placeholder="e.g. Pharmacology Mid-Semester Exam" value={examForm.title} onChange={e=>setExamForm({...examForm,title:e.target.value})}/>
            <div className="form-row">
              <div>
                <label className="lbl">Class</label>
                <select className="inp" value={examForm.classId} onChange={e=>setExamForm({...examForm,classId:e.target.value})}>
                  <option value="">Select class...</option>
                  {classes.map(c=><option key={c.id} value={c.id}>{c.label} — {c.desc}</option>)}
                </select>
              </div>
              <div>
                <label className="lbl">Course / Subject</label>
                <select className="inp" value={examForm.course} onChange={e=>setExamForm({...examForm,course:e.target.value})}>
                  <option value="">Select course...</option>
                  {examForm.classId && classes.find(c=>c.id===examForm.classId)?.courses.map(co=><option key={co} value={co}>{co}</option>)}
                  {!examForm.classId && <option disabled>Select a class first</option>}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div>
                <label className="lbl">Type</label>
                <select className="inp" value={examForm.type} onChange={e=>setExamForm({...examForm,type:e.target.value})}>
                  {["Exam","Test","CA","Quiz","Practical"].map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="lbl">Duration (minutes)</label>
                <input className="inp" type="number" min="5" max="300" value={examForm.duration} onChange={e=>setExamForm({...examForm,duration:+e.target.value})}/>
              </div>
            </div>
            <label className="lbl">Instructions (optional)</label>
            <textarea className="inp" rows={2} style={{resize:"vertical"}} placeholder="e.g. Answer all questions. No negative marking." value={examForm.instructions} onChange={e=>setExamForm({...examForm,instructions:e.target.value})}/>
            <div style={{display:"flex",gap:8}}>
              <button className="btn btn-accent" style={{flex:1,background:"#14a064",borderColor:"#14a064"}} onClick={saveExam}>{editExam?"Update Exam":"Create Exam →"}</button>
              <button className="btn" onClick={()=>setShowExamModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Question modal */}
      {showQModal&&(
        <div className="modal-overlay" onClick={()=>setShowQModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-head">
              <div className="modal-title">{editQ!==null?"Edit":"Add"} Question</div>
              <button className="modal-close" onClick={()=>setShowQModal(false)}>✕</button>
            </div>
            <label className="lbl">Question</label>
            <textarea className="inp" rows={3} style={{resize:"vertical"}} value={qForm.q} onChange={e=>setQForm({...qForm,q:e.target.value})} placeholder="Enter question text..."/>
            {["A","B","C","D"].map((l,i)=>(
              <div key={l}>
                <label className="lbl">Option {l}</label>
                <input className="inp" value={qForm.options[i]} placeholder={`Option ${l}...`} onChange={e=>{const o=[...qForm.options];o[i]=e.target.value;setQForm({...qForm,options:o});}}/>
              </div>
            ))}
            <label className="lbl">Correct Answer</label>
            <select className="inp" value={qForm.ans} onChange={e=>setQForm({...qForm,ans:+e.target.value})}>
              {["A","B","C","D"].map((l,i)=><option key={l} value={i}>{l}: {qForm.options[i]||`Option ${l}`}</option>)}
            </select>
            <div style={{display:"flex",gap:8}}>
              <button className="btn btn-accent" style={{flex:1,background:"#14a064",borderColor:"#14a064"}} onClick={saveQ}>Save Question</button>
              <button className="btn" onClick={()=>setShowQModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// LECTURER RESULTS UPLOAD
// ════════════════════════════════════════════════════════════════════
function LecturerResults({ toast, currentUser }) {
  const [results, setResults] = useState(()=>ls("nv-lect-results",[]));
  const [showModal, setShowModal] = useState(false);
  const [pasteMode, setPasteMode] = useState(false);
  const [pasteText, setPasteText] = useState("");
  const [parsed, setParsed] = useState([]);
  const [edit, setEdit] = useState(null);
  const classes = ls("nv-classes",DEFAULT_CLASSES);
  const [form, setForm] = useState({studentName:"",regNum:"",score:"",grade:"",subject:"",classId:"",type:"CA",semester:"1st",session:""});

  const GRADES = ["A","B","C","D","E","F"];
  const myResults = results.filter(r=>r.addedBy===currentUser);

  const gradeFromScore = (s) => {
    const n=+s; if(n>=70)return"A"; if(n>=60)return"B"; if(n>=50)return"C"; if(n>=45)return"D"; if(n>=40)return"E"; return"F";
  };

  const parsePaste = () => {
    // Format: Name | RegNum | Score | Subject (one per line)
    const lines = pasteText.trim().split("\n").filter(l=>l.trim());
    const items = lines.map(line=>{
      const p=line.split("|").map(x=>x.trim());
      return {studentName:p[0]||"",regNum:p[1]||"",score:p[2]||"",subject:p[3]||form.subject,grade:gradeFromScore(p[2]||0)};
    }).filter(r=>r.studentName);
    setParsed(items);
  };

  const importParsed = () => {
    const items=parsed.map(p=>({...p,id:Date.now()+Math.random(),classId:form.classId,type:form.type,semester:form.semester,session:form.session,addedBy:currentUser,date:new Date().toLocaleDateString()}));
    const u=[...results,...items]; setResults(u); lsSet("nv-lect-results",u);
    toast(`${items.length} results uploaded!`,"success"); setPasteText(""); setParsed([]); setPasteMode(false);
  };

  const save = () => {
    if(!form.studentName||!form.score) return toast("Name and score required","error");
    const item={...form,grade:gradeFromScore(form.score),id:edit||Date.now(),addedBy:currentUser,date:new Date().toLocaleDateString()};
    let u;
    if(edit){u=results.map(r=>r.id===edit?item:r);toast("Updated","success");}
    else{u=[item,...results];toast("Result added","success");}
    setResults(u); lsSet("nv-lect-results",u); setShowModal(false); setEdit(null); setForm({studentName:"",regNum:"",score:"",grade:"",subject:"",classId:"",type:"CA",semester:"1st",session:""});
  };

  const del=(id)=>{const u=results.filter(r=>r.id!==id);setResults(u);lsSet("nv-lect-results",u);toast("Deleted","success");};
  const cls=(id)=>classes.find(c=>c.id===id);
  const gradeColor=(g)=>g==="A"?"var(--success)":g==="B"?"var(--accent)":g==="C"?"var(--accent2)":g==="D"||g==="E"?"var(--warn)":"var(--danger)";

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:10}}>
        <div><div className="sec-title">📊 Exam Results</div><div className="sec-sub">{myResults.length} results uploaded by you</div></div>
        <div style={{display:"flex",gap:8}}>
          <button className="btn btn-success btn-sm" onClick={()=>{setPasteMode(p=>!p);setShowModal(false);}}>📋 Paste & Import</button>
          <button className="btn btn-accent" style={{background:"#14a064",borderColor:"#14a064"}} onClick={()=>{setShowModal(true);setEdit(null);setForm({studentName:"",regNum:"",score:"",grade:"",subject:"",classId:"",type:"CA",semester:"1st",session:""});}}>+ Add Single</button>
        </div>
      </div>

      {pasteMode&&(
        <div className="card" style={{marginBottom:16}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,marginBottom:8}}>📋 Paste Results</div>
          <div style={{fontSize:12,color:"var(--text3)",fontFamily:"'DM Mono',monospace",marginBottom:10}}>Format per line: <b style={{color:"var(--accent)"}}>Student Name | Reg Number | Score | Subject</b></div>
          <div className="form-row" style={{marginBottom:10}}>
            <div><label className="lbl">Class</label>
              <select className="inp" value={form.classId} onChange={e=>setForm({...form,classId:e.target.value})}>
                <option value="">Select class</option>
                {classes.map(c=><option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>
            <div><label className="lbl">Type</label>
              <select className="inp" value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
                {["CA","Exam","Practical","Total"].map(t=><option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="form-row" style={{marginBottom:10}}>
            <div><label className="lbl">Semester</label>
              <select className="inp" value={form.semester} onChange={e=>setForm({...form,semester:e.target.value})}>
                {["1st","2nd","3rd"].map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
            <div><label className="lbl">Session</label><input className="inp" placeholder="e.g. 2024/2025" value={form.session} onChange={e=>setForm({...form,session:e.target.value})}/></div>
          </div>
          <textarea className="paste-box" rows={8} placeholder={"John Doe | NUR/2021/001 | 72 | Pharmacology\nJane Smith | NUR/2021/002 | 65 | Pharmacology\nMike Johnson | NUR/2021/003 | 88 | Pharmacology"} value={pasteText} onChange={e=>setPasteText(e.target.value)}/>
          <div style={{display:"flex",gap:8,marginBottom:parsed.length?10:0}}>
            <button className="btn btn-accent" onClick={parsePaste}>🔍 Parse</button>
            {parsed.length>0&&<button className="btn btn-success" onClick={importParsed}>✅ Import {parsed.length}</button>}
            <button className="btn" onClick={()=>{setPasteMode(false);setParsed([]);setPasteText("");}}>Cancel</button>
          </div>
          {parsed.length>0&&(
            <div className="parse-preview">
              {parsed.map((p,i)=>(
                <div key={i} className="parse-item">
                  <span className="parse-check">✓</span>
                  <span style={{flex:1}}>{p.studentName}</span>
                  <span style={{color:"var(--text3)"}}>{p.regNum}</span>
                  <span style={{marginLeft:10,color:gradeColor(p.grade),fontWeight:700}}>{p.score}% ({p.grade})</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {myResults.length===0&&!pasteMode&&<div style={{textAlign:"center",padding:"40px",color:"var(--text3)"}}><div style={{fontSize:40}}>📊</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:13,marginTop:10}}>No results uploaded yet.</div></div>}

      {myResults.map(r=>(
        <div key={r.id} className="result-card">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:4}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:15}}>{r.studentName}</div>
                <div style={{fontSize:30,fontWeight:800,color:gradeColor(r.grade),fontFamily:"'Syne',sans-serif",lineHeight:1}}>{r.grade}</div>
              </div>
              <div style={{fontSize:12,color:"var(--text3)",fontFamily:"'DM Mono',monospace"}}>{r.regNum&&`${r.regNum} · `}{r.subject&&`${r.subject} · `}{cls(r.classId)?.label||""}{r.type&&` · ${r.type}`}{r.semester&&` · ${r.semester} Sem`}{r.session&&` · ${r.session}`}</div>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,color:gradeColor(r.grade),marginTop:4}}>{r.score}%</div>
            </div>
            <div style={{display:"flex",gap:6}}>
              <button className="btn btn-sm" onClick={()=>{setEdit(r.id);setForm({studentName:r.studentName,regNum:r.regNum||"",score:r.score,grade:r.grade,subject:r.subject||"",classId:r.classId||"",type:r.type||"CA",semester:r.semester||"1st",session:r.session||""});setShowModal(true);}}>✏️</button>
              <button className="btn btn-sm btn-danger" onClick={()=>del(r.id)}>🗑️</button>
            </div>
          </div>
        </div>
      ))}

      {showModal&&(
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-head"><div className="modal-title">{edit?"Edit":"Add"} Result</div><button className="modal-close" onClick={()=>setShowModal(false)}>✕</button></div>
            <div className="form-row">
              <div><label className="lbl">Student Name</label><input className="inp" value={form.studentName} onChange={e=>setForm({...form,studentName:e.target.value})} placeholder="Full name"/></div>
              <div><label className="lbl">Reg Number</label><input className="inp" value={form.regNum} onChange={e=>setForm({...form,regNum:e.target.value})} placeholder="e.g. NUR/2021/001"/></div>
            </div>
            <div className="form-row">
              <div><label className="lbl">Score (%)</label><input className="inp" type="number" min="0" max="100" value={form.score} onChange={e=>setForm({...form,score:e.target.value})} placeholder="0-100"/></div>
              <div><label className="lbl">Subject</label><input className="inp" value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} placeholder="e.g. Pharmacology"/></div>
            </div>
            <div className="form-row">
              <div><label className="lbl">Class</label>
                <select className="inp" value={form.classId} onChange={e=>setForm({...form,classId:e.target.value})}>
                  <option value="">Select class</option>
                  {classes.map(c=><option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>
              <div><label className="lbl">Type</label>
                <select className="inp" value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
                  {["CA","Exam","Practical","Total"].map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div><label className="lbl">Semester</label>
                <select className="inp" value={form.semester} onChange={e=>setForm({...form,semester:e.target.value})}>
                  {["1st","2nd","3rd"].map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
              <div><label className="lbl">Session</label><input className="inp" value={form.session} onChange={e=>setForm({...form,session:e.target.value})} placeholder="e.g. 2024/2025"/></div>
            </div>
            <div style={{display:"flex",gap:8}}><button className="btn btn-accent" style={{flex:1,background:"#14a064",borderColor:"#14a064"}} onClick={save}>Save</button><button className="btn" onClick={()=>setShowModal(false)}>Cancel</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// TIMETABLE WITH LECTURER NOTIFICATIONS
// ════════════════════════════════════════════════════════════════════
function TimetableView({ toast, currentUser, userRole }) {
  const [tt, setTt] = useState(()=>ls("nv-timetable",[]));
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({day:"Monday",time:"",subject:"",venue:"",type:"Lecture",classId:"",lecturer:""});
  const DAYS=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const COLORS={Lecture:"var(--accent)",Practical:"var(--warn)",Tutorial:"var(--accent2)",Clinical:"var(--danger)"};
  const classes=ls("nv-classes",DEFAULT_CLASSES);
  const users=ls("nv-users",[]);
  const lecturers=users.filter(u=>u.role==="lecturer"||u.role==="admin");
  const isPrivileged=userRole==="admin"||userRole==="lecturer";

  // Check for upcoming classes for lecturer
  const myClasses = userRole==="lecturer"?tt.filter(t=>t.lecturer===currentUser):[];
  const now=new Date(); const nowDay=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][now.getDay()];
  const upcoming=myClasses.filter(t=>t.day===nowDay).sort((a,b)=>a.time.localeCompare(b.time));

  const save=()=>{
    if(!form.time||!form.subject) return toast("Fill required fields","error");
    const u=[...tt,{...form,id:Date.now()}]; setTt(u); lsSet("nv-timetable",u); setShowAdd(false);
    toast("Class added to timetable!","success");
  };

  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,flexWrap:"wrap",gap:10}}>
        <div><div className="sec-title">📅 Timetable</div><div className="sec-sub">Weekly class schedule</div></div>
        {isPrivileged&&<button className="btn btn-accent" onClick={()=>setShowAdd(true)}>+ Add Class</button>}
      </div>

      {/* Lecturer notification banner */}
      {upcoming.length>0&&(
        <div style={{background:"rgba(251,146,60,.1)",border:"1px solid rgba(251,146,60,.3)",borderRadius:10,padding:"12px 16px",marginBottom:16}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,marginBottom:6,color:"var(--warn)"}}>🔔 Your Classes Today ({nowDay})</div>
          {upcoming.map(c=>(
            <div key={c.id} style={{fontSize:13,color:"var(--text2)",display:"flex",gap:10,alignItems:"center"}}>
              <span style={{fontFamily:"'DM Mono',monospace",fontWeight:600,color:"var(--warn)"}}>{c.time}</span>
              <span>{c.subject}</span>
              {c.venue&&<span style={{color:"var(--text3)"}}>@ {c.venue}</span>}
              {c.classId&&<span className="tag tag-accent" style={{fontSize:10}}>{classes.find(x=>x.id===c.classId)?.label||c.classId}</span>}
            </div>
          ))}
        </div>
      )}

      {DAYS.map(day=>{
        const dc=tt.filter(t=>t.day===day);
        if(!dc.length) return null;
        return (
          <div key={day} style={{marginBottom:18}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:"var(--text3)",marginBottom:8,textTransform:"uppercase",letterSpacing:"1px",display:"flex",alignItems:"center",gap:8}}>
              {day} {day===nowDay&&<span className="tag tag-accent" style={{fontSize:9}}>Today</span>}
            </div>
            {dc.sort((a,b)=>a.time.localeCompare(b.time)).map(c=>(
              <div key={c.id} className="card2" style={{marginBottom:7,display:"flex",alignItems:"center",gap:12,borderLeft:`3px solid ${COLORS[c.type]||"var(--accent)"}`}}>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,fontWeight:600,color:"var(--accent)",minWidth:48}}>{c.time}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600,fontSize:14}}>{c.subject}</div>
                  <div style={{fontSize:11,color:"var(--text3)",display:"flex",gap:8,flexWrap:"wrap",marginTop:2}}>
                    {c.venue&&<span>📍 {c.venue}</span>}
                    {c.classId&&<span>🎓 {classes.find(x=>x.id===c.classId)?.label||c.classId}</span>}
                    {c.lecturer&&<span>👤 {c.lecturer}</span>}
                  </div>
                </div>
                <span className="tt-badge" style={{background:`${COLORS[c.type]||"var(--accent)"}20`,color:COLORS[c.type]||"var(--accent)"}}>{c.type}</span>
                {isPrivileged&&<button className="btn btn-sm btn-danger" onClick={()=>{const u=tt.filter(x=>x.id!==c.id);setTt(u);lsSet("nv-timetable",u);}}>✕</button>}
              </div>
            ))}
          </div>
        );
      })}
      {tt.length===0&&<div style={{textAlign:"center",padding:"50px",color:"var(--text3)"}}><div style={{fontSize:48}}>📅</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:13,marginTop:12}}>No classes added yet.</div></div>}

      {showAdd&&(
        <div className="modal-overlay" onClick={()=>setShowAdd(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-head"><div className="modal-title">Add Class to Timetable</div><button className="modal-close" onClick={()=>setShowAdd(false)}>✕</button></div>
            <div className="form-row">
              <div><label className="lbl">Day</label>
                <select className="inp" value={form.day} onChange={e=>setForm({...form,day:e.target.value})}>
                  {DAYS.map(d=><option key={d}>{d}</option>)}
                </select>
              </div>
              <div><label className="lbl">Time</label><input className="inp" type="time" value={form.time} onChange={e=>setForm({...form,time:e.target.value})}/></div>
            </div>
            <label className="lbl">Subject</label><input className="inp" value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} placeholder="e.g. Pharmacology"/>
            <div className="form-row">
              <div><label className="lbl">Venue</label><input className="inp" value={form.venue} onChange={e=>setForm({...form,venue:e.target.value})} placeholder="e.g. Hall A"/></div>
              <div><label className="lbl">Type</label>
                <select className="inp" value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
                  {["Lecture","Practical","Tutorial","Clinical"].map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div><label className="lbl">Class</label>
                <select className="inp" value={form.classId} onChange={e=>setForm({...form,classId:e.target.value})}>
                  <option value="">All classes</option>
                  {classes.map(c=><option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>
              <div><label className="lbl">Lecturer</label>
                <select className="inp" value={form.lecturer} onChange={e=>setForm({...form,lecturer:e.target.value})}>
                  <option value="">Unassigned</option>
                  {lecturers.map(l=><option key={l.username} value={l.username}>{l.title?`${l.title} `:""}{l.username}</option>)}
                </select>
              </div>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button className="btn btn-accent" style={{flex:1}} onClick={save}>Add to Timetable</button>
              <button className="btn" onClick={()=>setShowAdd(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// LECTURER PANEL
// ════════════════════════════════════════════════════════════════════
function LecturerPanel({ toast, currentUser }) {
  const [tab, setTab] = useState("notes");
  const TABS = [
    { key:"notes", label:"📝 Notes & Handouts" },
    { key:"exams", label:"📋 Exams & Tests" },
    { key:"results", label:"📊 Exam Results" },
    { key:"timetable", label:"📅 Timetable" },
    { key:"group", label:"💬 Group Chat" },
    { key:"profile", label:"👤 Profile" },
  ];
  return (
    <div>
      <div className="lect-header">
        <div className="lect-header-icon">🎓</div>
        <div>
          <div className="lect-header-title">Lecturer Portal</div>
          <div className="lect-header-sub">Welcome, <b style={{color:"#14a064"}}>{currentUser}</b> · Lecturer access</div>
        </div>
      </div>
      <div className="lect-tabs">
        {TABS.map(t=><div key={t.key} className={`lect-tab${tab===t.key?" active":""}`} onClick={()=>setTab(t.key)}>{t.label}</div>)}
      </div>
      {tab==="notes"     && <LecturerNotes toast={toast} currentUser={currentUser} />}
      {tab==="exams"     && <LecturerExams toast={toast} currentUser={currentUser} />}
      {tab==="results"   && <LecturerResults toast={toast} currentUser={currentUser} />}
      {tab==="timetable" && <TimetableView toast={toast} currentUser={currentUser} userRole="lecturer" />}
      {tab==="group"     && <LecturerGroupChat toast={toast} currentUser={currentUser} />}
      {tab==="profile"   && <LecturerProfile toast={toast} currentUser={currentUser} />}
    </div>
  );
}

function LecturerNotes({ toast, currentUser }) {
  const [notes, setNotes] = useState(()=>ls("nv-lect-notes",[]));
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(null);
  const [search, setSearch] = useState("");
  const classes = ls("nv-classes", DEFAULT_CLASSES);
  const [form, setForm] = useState({title:"",content:"",classId:"",course:"",type:"Note"});
  const TYPES = ["Note","Handout","Assignment","Announcement","Resource"];

  const save = () => {
    if (!form.title||!form.content) return toast("Title and content required","error");
    const item = {...form, id:edit||Date.now(), author:currentUser, date:new Date().toLocaleDateString(), time:new Date().toLocaleTimeString()};
    let u;
    if (edit) { u=notes.map(n=>n.id===edit?item:n); toast("Note updated","success"); }
    else { u=[item,...notes]; toast("Note posted!","success"); }
    // Also push handouts to nv-handouts so students see them
    if (form.classId) {
      const handouts = ls("nv-handouts",[]);
      const existing = handouts.find(h=>h.id===item.id);
      const handout = {id:item.id,title:item.title,content:item.content,classId:item.classId,course:item.course,author:item.author,date:item.date,type:item.type,fromLecturer:true};
      const updatedH = existing ? handouts.map(h=>h.id===item.id?handout:h) : [handout,...handouts];
      lsSet("nv-handouts", updatedH);
    }
    setNotes(u); lsSet("nv-lect-notes",u);
    setShowModal(false); setEdit(null); setForm({title:"",content:"",classId:"",course:"",type:"Note"});
  };

  const del = (id) => {
    const u=notes.filter(n=>n.id!==id); setNotes(u); lsSet("nv-lect-notes",u);
    // Also remove from handouts
    const handouts=ls("nv-handouts",[]); lsSet("nv-handouts",handouts.filter(h=>h.id!==id));
    toast("Deleted","success");
  };

  const myNotes = notes.filter(n=>n.author===currentUser&&(n.title.toLowerCase().includes(search.toLowerCase())||n.content.toLowerCase().includes(search.toLowerCase())));
  const cls = (id)=>classes.find(c=>c.id===id);

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:10}}>
        <div><div className="sec-title">📝 My Notes & Handouts</div><div className="sec-sub">{myNotes.length} item{myNotes.length!==1?"s":""} posted</div></div>
        <button className="btn btn-accent" style={{background:"#14a064",borderColor:"#14a064"}} onClick={()=>{setShowModal(true);setEdit(null);setForm({title:"",content:"",classId:"",course:"",type:"Note"});}}>+ Add Note</button>
      </div>
      <div className="search-wrap"><span className="search-ico">🔍</span><input placeholder="Search notes..." value={search} onChange={e=>setSearch(e.target.value)} /></div>

      {myNotes.length===0&&<div style={{textAlign:"center",padding:"50px",color:"var(--text3)"}}>
        <div style={{fontSize:48}}>📝</div>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,marginTop:12}}>No notes yet. Click "+ Add Note" to post one.</div>
      </div>}

      {myNotes.map(n=>(
        <div key={n.id} className="lect-note-card">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6,flexWrap:"wrap"}}>
                <span className="tag" style={{background:"rgba(20,160,100,.12)",borderColor:"#14a064",color:"#14a064"}}>{n.type}</span>
                {n.classId&&<span className="tag tag-accent">{cls(n.classId)?.label||n.classId}</span>}
                {n.course&&<span className="tag">{n.course}</span>}
              </div>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:16,marginBottom:6}}>{n.title}</div>
              <div style={{fontSize:13,color:"var(--text2)",lineHeight:1.7,whiteSpace:"pre-wrap",marginBottom:8}}>{n.content}</div>
              <div style={{fontSize:10,color:"var(--text3)",fontFamily:"'DM Mono',monospace"}}>{n.date} · {n.time}</div>
            </div>
            <div style={{display:"flex",gap:6,flexShrink:0}}>
              <button className="btn btn-sm" onClick={()=>{setEdit(n.id);setForm({title:n.title,content:n.content,classId:n.classId||"",course:n.course||"",type:n.type||"Note"});setShowModal(true);}}>✏️</button>
              <button className="btn btn-sm btn-danger" onClick={()=>del(n.id)}>🗑️</button>
            </div>
          </div>
        </div>
      ))}

      {showModal&&(
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal lg" onClick={e=>e.stopPropagation()}>
            <div className="modal-head">
              <div className="modal-title">{edit?"Edit":"New"} Note / Handout</div>
              <button className="modal-close" onClick={()=>setShowModal(false)}>✕</button>
            </div>
            <div className="form-row">
              <div>
                <label className="lbl">Type</label>
                <select className="inp" value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
                  {TYPES.map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="lbl">Target Class (optional)</label>
                <select className="inp" value={form.classId} onChange={e=>setForm({...form,classId:e.target.value})}>
                  <option value="">All / General</option>
                  {classes.map(c=><option key={c.id} value={c.id}>{c.label} — {c.desc}</option>)}
                </select>
              </div>
            </div>
            <label className="lbl">Course / Subject (optional)</label>
            <input className="inp" placeholder="e.g. Pharmacology, Anatomy..." value={form.course} onChange={e=>setForm({...form,course:e.target.value})} />
            <label className="lbl">Title</label>
            <input className="inp" placeholder="Note title..." value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
            <label className="lbl">Content</label>
            <textarea className="inp" rows={8} style={{resize:"vertical"}} placeholder="Write your note, handout content, or assignment details here..." value={form.content} onChange={e=>setForm({...form,content:e.target.value})} />
            <div style={{fontSize:11,color:"var(--text3)",fontFamily:"'DM Mono',monospace",marginBottom:12,background:"rgba(20,160,100,.07)",border:"1px solid rgba(20,160,100,.2)",borderRadius:8,padding:"7px 12px"}}>
              📢 If you select a class, this will also appear in students' Handouts section.
            </div>
            <div style={{display:"flex",gap:8}}>
              <button className="btn btn-accent" style={{flex:1,background:"#14a064",borderColor:"#14a064"}} onClick={save}>Post Note</button>
              <button className="btn" onClick={()=>setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LecturerGroupChat({ toast, currentUser }) {
  const [msgs, setMsgs] = useState(()=>ls("nv-lect-chat",[
    {id:1,from:"System",text:"Welcome to the Lecturer Group Chat! 🎓 Share updates, coordinate schedules, and collaborate here.",time:new Date().toLocaleTimeString(),date:new Date().toLocaleDateString(),role:"system"}
  ]));
  const [input, setInput] = useState("");
  const chatRef = React.useRef(null);

  const send = () => {
    if (!input.trim()) return;
    const users = ls("nv-users",[]);
    const me = users.find(u=>u.username===currentUser);
    const msg = {id:Date.now(),from:currentUser,text:input.trim(),time:new Date().toLocaleTimeString(),date:new Date().toLocaleDateString(),role:me?.role||"lecturer"};
    const u=[...msgs,msg]; setMsgs(u); lsSet("nv-lect-chat",u); setInput("");
    setTimeout(()=>{ if(chatRef.current) chatRef.current.scrollTop=chatRef.current.scrollHeight; },50);
  };

  const del = (id) => { const u=msgs.filter(m=>m.id!==id); setMsgs(u); lsSet("nv-lect-chat",u); };

  const roleColor = (r) => r==="admin"?"var(--purple)":r==="system"?"var(--text3)":"#14a064";

  return (
    <div>
      <div style={{marginBottom:14}}>
        <div className="sec-title">💬 Lecturer Group Chat</div>
        <div className="sec-sub">Private channel for lecturers & admin</div>
      </div>
      <div ref={chatRef} className="card" style={{minHeight:340,maxHeight:420,overflowY:"auto",display:"flex",flexDirection:"column",gap:6,padding:14,marginBottom:12}}>
        {msgs.map(m=>{
          const isMe = m.from===currentUser;
          const isSys = m.role==="system";
          if (isSys) return (
            <div key={m.id} style={{textAlign:"center",padding:"6px 0"}}>
              <span style={{fontSize:11,color:"var(--text3)",fontFamily:"'DM Mono',monospace",background:"var(--bg4)",borderRadius:20,padding:"3px 12px"}}>{m.text}</span>
            </div>
          );
          return (
            <div key={m.id} style={{display:"flex",flexDirection:"column",alignItems:isMe?"flex-end":"flex-start"}}>
              {!isMe&&<div style={{fontSize:10,color:roleColor(m.role),fontFamily:"'DM Mono',monospace",marginBottom:2,paddingLeft:4}}>{m.from} <span style={{color:"var(--text3)"}}>· {m.role}</span></div>}
              <div style={{display:"flex",alignItems:"flex-end",gap:6,flexDirection:isMe?"row-reverse":"row"}}>
                <div className={`lect-msg${isMe?" mine":" other"}`}>{m.text}</div>
                {isMe&&<button style={{background:"none",border:"none",color:"var(--text3)",cursor:"pointer",fontSize:11,paddingBottom:4}} onClick={()=>del(m.id)}>🗑️</button>}
              </div>
              <div style={{fontSize:9,color:"var(--text3)",fontFamily:"'DM Mono',monospace",marginTop:2,paddingLeft:4}}>{m.time}</div>
            </div>
          );
        })}
      </div>
      <div style={{display:"flex",gap:8}}>
        <input className="inp" style={{flex:1,marginBottom:0}} placeholder="Send a message to the group..." value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} />
        <button className="btn btn-accent" style={{background:"#14a064",borderColor:"#14a064"}} onClick={send}>Send</button>
      </div>
    </div>
  );
}

function LecturerProfile({ toast, currentUser }) {
  const [users, setUsers] = useState(()=>ls("nv-users",[]));
  const me = users.find(u=>u.username===currentUser)||{};
  const [form, setForm] = useState({department:me.department||"",title:me.title||"",specialization:me.specialization||"",bio:me.bio||""});

  const save = () => {
    const u = users.map(x=>x.username===currentUser?{...x,...form}:x);
    setUsers(u); lsSet("nv-users",u); toast("Profile updated!","success");
  };

  const lecturers = users.filter(u=>u.role==="lecturer"||u.role==="admin");

  return (
    <div>
      <div className="sec-title" style={{marginBottom:4}}>👤 My Profile</div>
      <div className="sec-sub" style={{marginBottom:16}}>Manage your lecturer details</div>
      <div className="card" style={{marginBottom:18}}>
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:18}}>
          <div style={{width:56,height:56,borderRadius:50,background:"linear-gradient(135deg,#14a064,#0e7a50)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,fontWeight:700,color:"white",fontFamily:"'Syne',sans-serif"}}>{currentUser[0].toUpperCase()}</div>
          <div>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:18}}>{currentUser}</div>
            <span className="lect-badge">{me.role||"lecturer"}</span>
          </div>
        </div>
        <label className="lbl">Title / Rank</label>
        <input className="inp" placeholder="e.g. Dr., Prof., Mr., Mrs." value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
        <label className="lbl">Department</label>
        <input className="inp" placeholder="e.g. Department of Medical-Surgical Nursing" value={form.department} onChange={e=>setForm({...form,department:e.target.value})} />
        <label className="lbl">Specialization</label>
        <input className="inp" placeholder="e.g. Pharmacology, Maternal Health..." value={form.specialization} onChange={e=>setForm({...form,specialization:e.target.value})} />
        <label className="lbl">Bio / About</label>
        <textarea className="inp" rows={3} style={{resize:"vertical"}} placeholder="Brief bio..." value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})} />
        <button className="btn btn-accent" style={{background:"#14a064",borderColor:"#14a064"}} onClick={save}>Save Profile</button>
      </div>

      <div className="sec-title" style={{marginBottom:12,fontSize:15}}>👥 All Lecturers ({lecturers.length})</div>
      {lecturers.map(l=>(
        <div key={l.username} className="user-row" style={{borderLeft:"3px solid #14a064"}}>
          <div className="user-av" style={{background:"linear-gradient(135deg,#14a064,#0e7a50)"}}>{l.username[0].toUpperCase()}</div>
          <div style={{flex:1}}>
            <div style={{fontWeight:600,fontSize:14}}>{l.title?`${l.title} `:""}{l.username}</div>
            <div style={{fontSize:11,color:"var(--text3)",fontFamily:"'DM Mono',monospace"}}>{l.department||"No department"}{l.specialization?` · ${l.specialization}`:""}</div>
          </div>
          <span className={`tag ${l.role==="admin"?"tag-purple":"lect-badge"}`}>{l.role}</span>
        </div>
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// MAIN APP
// ════════════════════════════════════════════════════════════════════
export default function App() {
  useEffect(() => { initData(); }, []);

  const [page, setPage] = useState("auth");
  const [authTab, setAuthTab] = useState("signin");
  const [loginType, setLoginType] = useState("student"); // "student" | "admin"
  const [username, setUsername] = useState(""); const [password, setPassword] = useState(""); const [showPw, setShowPw] = useState(false);
  const [regUser, setRegUser] = useState(""); const [regPw, setRegPw] = useState(""); const [regClass, setRegClass] = useState("");
  const [activeNav, setActiveNav] = useState("dashboard"); const [activeTool, setActiveTool] = useState(null);
  const [theme, setTheme] = useState("dark"); const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openNavGroup, setOpenNavGroup] = useState({});
  const [toasts, setToasts] = useState([]); const [currentUser, setCurrentUser] = useState(""); const [isAdmin, setIsAdmin] = useState(false); const [isLecturer, setIsLecturer] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminAuthUser, setAdminAuthUser] = useState("");
  const [adminAuthPw, setAdminAuthPw] = useState("");

  useEffect(() => { document.body.className = theme==="light"?"light":theme==="midnight"?"midnight":""; }, [theme]);
  const cycleTheme = () => setTheme(t=>t==="dark"?"light":t==="light"?"midnight":"dark");
  const themeLabel = theme==="dark"?"☀️ Light":theme==="light"?"🌑 Midnight":"🌊 Dark";

  const toast = (msg, type="info") => {
    const id = Date.now() + Math.random();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3200);
  };

  const login = () => {
    if (!username || !password) return toast("Fill in all fields", "error");
    const users = ls("nv-users", []);
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) return toast("Invalid credentials", "error");
    setCurrentUser(username); setIsAdmin(user.role === "admin"); setIsLecturer(user.role === "lecturer"); setPage("app");
    toast(`Welcome back, ${username}! 👋`, "success");
  };

  const register = () => {
    if (!regUser || !regPw) return toast("Fill in all fields", "error");
    const users = ls("nv-users", []);
    if (users.find(u => u.username === regUser)) return toast("Username taken", "error");
    const newUsers = [...users, { username: regUser, password: regPw, role: "student", class: regClass, joined: new Date().toLocaleDateString() }];
    lsSet("nv-users", newUsers); setCurrentUser(regUser); setIsAdmin(false); setIsLecturer(false); setPage("app");
    toast(`Welcome, ${regUser}! 🎉`, "success");
  };

  const navigate = (section, cls = null) => {
    setActiveNav(section); setActiveTool(null); if (cls) setSelectedClass(cls); setSidebarOpen(false);
  };
  const navTool = (tool) => { setActiveTool(tool); setActiveNav(null); setSidebarOpen(false); };

  const greeting = () => { const h = new Date().getHours(); return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening"; };

  const verifyAdminAccess = () => {
    if (!adminAuthUser || !adminAuthPw) return toast("Enter credentials", "error");
    // Backend verification: check users store for role=admin match
    const users = ls("nv-users", []);
    const user = users.find(u => u.username === adminAuthUser && u.password === adminAuthPw && u.role === "admin");
    if (!user) return toast("Access denied — invalid admin credentials", "error");
    setCurrentUser(adminAuthUser);
    setIsAdmin(true);
    setAdminAuthUser(""); setAdminAuthPw("");
    setShowAdminModal(false);
    navigate("admin");
    toast("🛡️ Admin access granted", "success");
  };

  const classes = ls("nv-classes", DEFAULT_CLASSES);

  const renderContent = () => {
    if (activeNav === "admin") return <AdminPanel toast={toast} currentUser={currentUser} />;
    if (activeNav === "lecturer") return <LecturerPanel toast={toast} currentUser={currentUser} />;
    if (activeTool === "drug-guide") return <DrugGuideView />;
    if (activeTool === "lab-ref") return <LabReferenceView />;
    if (activeTool === "flashcards") return <FlashcardsView />;
    if (activeTool === "med-calc") return <MedCalc />;
    if (activeTool === "study-planner") return <StudyPlanner toast={toast} />;
    if (activeTool === "skills") return <SkillsView />;
    if (activeTool === "dictionary") return <DictionaryView />;
    if (activeTool === "gpa") return <GPACalc toast={toast} />;
    if (activeTool === "progress") return <StudyProgress />;
    if (activeNav === "ai-chat") return <AIChat currentUser={currentUser} />;
    if (activeNav && activeNav.startsWith("class-chat-")) {
      const cid = activeNav.replace("class-chat-","");
      const cls2 = classes.find(c=>c.id===cid);
      return <ClassGroupChat currentUser={currentUser} classId={cid} className={cls2?.label||cid} />;
    }
    switch (activeNav) {
      case "dashboard": return <Dashboard user={currentUser} onNavigate={navigate} />;
      case "timetable": return <TimetableView toast={toast} currentUser={currentUser} userRole={isAdmin?"admin":isLecturer?"lecturer":"student"} />;
      case "handouts": return <Handouts selectedClass={selectedClass} toast={toast} />;
      case "results": return <Results toast={toast} />;
      case "exams": return <StudentExams toast={toast} currentUser={currentUser} />;
      case "questions": return <PastQuestionsView toast={toast} currentUser={currentUser} userRole={isAdmin?"admin":isLecturer?"lecturer":"student"} />;
      case "messages": return <Messages user={currentUser} toast={toast} />;
      default: return <Dashboard user={currentUser} onNavigate={navigate} />;
    }
  };

  const NAV = [
    { icon:"⊞", label:"Dashboard", key:"dashboard" },
    { icon:"📅", label:"Timetable", key:"timetable" },
    { icon:"📄", label:"All Handouts", key:"handouts" },
    { icon:"📊", label:"Results", key:"results" },
    { icon:"📋", label:"My Exams", key:"exams" },
    { icon:"❓", label:"Past Questions", key:"questions" },
    { icon:"💬", label:"Messages", key:"messages" },
  ];
  const TOOLS = [
    { icon:"🧪", label:"Lab Reference", key:"lab-ref" },
    { icon:"💊", label:"Drug Guide", key:"drug-guide" },
    { icon:"🃏", label:"Flashcards", key:"flashcards" },
    { icon:"🧮", label:"Med Calculator", key:"med-calc" },
    { icon:"📅", label:"Study Planner", key:"study-planner" },
    { icon:"✅", label:"Skills Checklist", key:"skills" },
    { icon:"📖", label:"Dictionary", key:"dictionary" },
    { icon:"🎓", label:"GPA Calculator", key:"gpa" },
    { icon:"📈", label:"Study Progress", key:"progress" },
  ];

  if (page === "auth") return (
    <>
      <style>{CSS}</style>
      <div className="auth-page">
        <div className="auth-wrap" style={{width:"100%",maxWidth:440,padding:20,margin:"auto"}}>
          <div className="auth-card">
            <div className="auth-logo">
              <div className="auth-logo-icon">🏥</div>
              <div className="auth-logo-name">NurseVault</div>
              <span style={{marginLeft:4,fontSize:20}}>🌙</span>
            </div>
            <div className="auth-sub">// nursing school handouts &amp; resources</div>



            <div className="auth-tabs">
              <div className={`auth-tab${authTab==="signin"?" active":""}`} onClick={()=>setAuthTab("signin")}>Sign In</div>
              <div className={`auth-tab${authTab==="register"?" active":""}`} onClick={()=>setAuthTab("register")}>Create Account</div>
            </div>

            {authTab==="signin" ? (
              <>
                <label className="lbl">Username</label>
                <input className="inp" placeholder="Enter username" value={username} onChange={e=>setUsername(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()} />
                <label className="lbl">Password</label>
                <div className="inp-wrap">
                  <input className="inp" type={showPw?"text":"password"} placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()} />
                  <button className="inp-eye" onClick={()=>setShowPw(p=>!p)}>{showPw?"🙈":"👁"}</button>
                </div>
                <button className="btn-primary" onClick={login}>
                  Sign In →
                </button>
                <div className="auth-switch">No account? <span onClick={()=>setAuthTab("register")}>Register here</span></div>
              </>
            ) : (
              <>
                <label className="lbl">Username</label>
                <input className="inp" placeholder="Choose username" value={regUser} onChange={e=>setRegUser(e.target.value)} />
                <label className="lbl">Password</label>
                <input className="inp" type="password" placeholder="Choose password" value={regPw} onChange={e=>setRegPw(e.target.value)} />
                <label className="lbl">Your Class</label>
                <select className="inp" value={regClass} onChange={e=>setRegClass(e.target.value)}>
                  <option value="">Select class...</option>
                  {classes.map(c=><option key={c.id} value={c.id}>{c.label} — {c.desc}</option>)}
                </select>
                <button className="btn-primary" onClick={register}>Create Account →</button>
                <div className="auth-switch">Have account? <span onClick={()=>setAuthTab("signin")}>Sign in</span></div>
              </>
            )}
          </div>
        </div>
      </div>
      <Toasts list={toasts} />
    </>
  );

  return (
    <>
      <style>{CSS}</style>
      <div className="app-shell">
        <div className={`sidebar-overlay${sidebarOpen?" open":""}`} onClick={()=>setSidebarOpen(false)} />
        <div className={`sidebar${sidebarOpen?" open":""}`}>
          <div className="sidebar-head">
            <div className="sidebar-logo-icon">🏥</div>
            <div className="sidebar-logo-name">NurseVault</div>
            {isAdmin&&<span className="admin-badge-side">🛡️ Admin</span>}
          </div>

          {isAdmin&&(
            <>
              <div className="nav-sec">Admin</div>
              <div className={`nav-item admin-nav${activeNav==="admin"?" active":""}`} onClick={()=>navigate("admin")}>
                <span className="nav-icon">🛡️</span>Admin Panel
              </div>
            </>
          )}

          {(isLecturer||isAdmin)&&(
            <>
              <div className="nav-sec">Lecturer</div>
              <div className={`nav-item${activeNav==="lecturer"?" active":""}`} style={{color:"#14a064"}} onClick={()=>navigate("lecturer")}>
                <span className="nav-icon">🎓</span>Lecturer Portal
              </div>
            </>
          )}

          <div className="nav-sec">Navigation</div>
          {NAV.map(item=>(
            <div key={item.key} className={`nav-item${activeNav===item.key&&!activeTool?" active":""}`} onClick={()=>navigate(item.key)}>
              <span className="nav-icon">{item.icon}</span>{item.label}
            </div>
          ))}

          <div className="nav-item" style={{color:"var(--accent2)"}} onClick={()=>navigate("ai-chat")}>
            <span className="nav-icon">🤖</span>AI Assistant
          </div>

          <div className="nav-sec" style={{marginTop:6}}>Clinical Tools</div>
          {TOOLS.map(item=>(
            <div key={item.key} className={`nav-item${activeTool===item.key?" active":""}`} onClick={()=>navTool(item.key)}>
              <span className="nav-icon">{item.icon}</span>{item.label}
            </div>
          ))}

          <div className="nav-sec" style={{marginTop:6}}>Class Groups</div>
          {[
            {key:"nd-hnd",label:"ND / HND",icon:"📗",ids:["nd1","nd2","hnd1","hnd2"]},
            {key:"cn",label:"Community Nursing",icon:"📙",ids:["cn1","cn2"]},
            {key:"bnsc",label:"BNSc",icon:"📘",ids:["bnsc1","bnsc2","bnsc3","bnsc4","bnscf"]},
          ].map(grp=>{
            const open=openNavGroup[grp.key];
            return (
              <div key={grp.key} className="nav-group">
                <div className="nav-group-header" onClick={()=>setOpenNavGroup(p=>({...p,[grp.key]:!p[grp.key]}))}>
                  <div style={{display:"flex",alignItems:"center",gap:9}}><span className="nav-icon">{grp.icon}</span>{grp.label}</div>
                  <span className={`nav-group-arrow${open?" open":""}`}>▼</span>
                </div>
                <div className="nav-group-items" style={{maxHeight:open?500:0,overflow:"hidden",transition:"max-height .3s ease"}}>
                  {classes.filter(c=>grp.ids.includes(c.id)).map(c=>(
                    <div key={c.id}>
                      <div className={`nav-sub-item${activeNav==="handouts"&&selectedClass?.id===c.id?" active":""}`} onClick={()=>navigate("handouts",c)}>
                        <span className="class-dot" style={{background:c.color}}/>{c.label}
                      </div>
                      <div className={`nav-sub-item${activeNav===`class-chat-${c.id}`?" active":""}`} style={{fontSize:12,paddingLeft:44,color:"var(--text3)"}} onClick={()=>navigate(`class-chat-${c.id}`)}>
                        💬 Group Chat
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          <div style={{padding:"16px 8px 0"}}>
            <div className="nav-item" style={{color:"var(--danger)"}} onClick={()=>{setPage("auth");setCurrentUser("");setIsAdmin(false);setIsLecturer(false);}}>
              <span className="nav-icon">🚪</span>Sign Out
            </div>
          </div>
        </div>

        <div className="main-area">
          <div className="topbar">
            <div className="topbar-left">
              <button className="hamburger" onClick={()=>setSidebarOpen(o=>!o)}>☰</button>
              <div className="topbar-title">
                {activeNav==="admin" ? "🛡️ Admin Panel" : activeNav==="lecturer" ? "🎓 Lecturer Portal" : `${greeting()}, `}
                {activeNav!=="admin"&&activeNav!=="lecturer"&&<span style={{color:"var(--accent)"}}>{currentUser}</span>}
                {activeNav!=="admin"&&activeNav!=="lecturer"&&" 👋"}
              </div>
              {isAdmin&&activeNav!=="admin"&&<span className="tag tag-purple" style={{fontSize:10}}>🛡️ Admin</span>}
            </div>
            <div className="topbar-right">
              <div className="theme-btn" onClick={cycleTheme}>{themeLabel}</div>
              <div className="icon-btn" onClick={()=>navigate("messages")}>🔔</div>
            </div>
          </div>
          <div className="page-content">{renderContent()}</div>
        </div>
      </div>
      <Toasts list={toasts} />

      {/* ⚙️ Hidden Admin Gear Button — subtle, only accessible to those who know */}
      {!isAdmin && (
        <div className="admin-gear-btn" title="" onClick={()=>setShowAdminModal(true)}>⚙️</div>
      )}

      {/* Admin Verification Modal — role-based backend check */}
      {showAdminModal && (
        <div className="modal-overlay" onClick={()=>{setShowAdminModal(false);setAdminAuthUser("");setAdminAuthPw("");}}>
          <div className="modal" style={{maxWidth:360}} onClick={e=>e.stopPropagation()}>
            <div className="modal-head">
              <div className="modal-title" style={{color:"var(--purple)"}}>🛡️ Admin Access</div>
              <button className="modal-close" onClick={()=>{setShowAdminModal(false);setAdminAuthUser("");setAdminAuthPw("");}}>✕</button>
            </div>
            <div style={{fontSize:12,color:"var(--text3)",fontFamily:"'DM Mono',monospace",marginBottom:18,background:"rgba(124,58,237,.08)",border:"1px solid rgba(124,58,237,.2)",borderRadius:8,padding:"8px 12px"}}>
              🔐 Restricted area. Admin credentials required.
            </div>
            <div className="admin-verify-form">
              <label className="lbl">Admin Username</label>
              <input className="inp" placeholder="Username" value={adminAuthUser} onChange={e=>setAdminAuthUser(e.target.value)} onKeyDown={e=>e.key==="Enter"&&verifyAdminAccess()} />
              <label className="lbl">Admin Password</label>
              <input className="inp" type="password" placeholder="••••••••" value={adminAuthPw} onChange={e=>setAdminAuthPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&verifyAdminAccess()} />
              <button className="btn btn-purple" style={{marginTop:6}} onClick={verifyAdminAccess}>🛡️ Verify &amp; Enter →</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

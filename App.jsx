import { useState, useEffect } from "react";

// ─── STORAGE ────────────────────────────────────────────────────────
const ls = (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } };
const lsSet = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

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
const initData = () => {
  if (!localStorage.getItem("nv-classes")) lsSet("nv-classes", DEFAULT_CLASSES);
  if (!localStorage.getItem("nv-drugs")) lsSet("nv-drugs", DEFAULT_DRUGS);
  if (!localStorage.getItem("nv-labs")) lsSet("nv-labs", DEFAULT_LABS);
  if (!localStorage.getItem("nv-pq")) lsSet("nv-pq", DEFAULT_PQ);
  if (!localStorage.getItem("nv-decks")) lsSet("nv-decks", DEFAULT_DECKS);
  if (!localStorage.getItem("nv-dict")) lsSet("nv-dict", DEFAULT_DICT);
  if (!localStorage.getItem("nv-skillsdb")) lsSet("nv-skillsdb", DEFAULT_SKILLS);
  if (!localStorage.getItem("nv-announcements")) lsSet("nv-announcements", DEFAULT_ANNOUNCEMENTS);
  if (!localStorage.getItem("nv-users")) lsSet("nv-users", [{username:"admin",password:"admin123",role:"admin",class:"",joined:"System"}]);
};

// ─── STYLES ─────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=Instrument+Sans:wght@300;400;500;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
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
body{font-family:'Instrument Sans',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;overflow-x:hidden;}
body.light{
  --bg:#eef5f6;--bg2:#e0ecee;--bg3:#d2e4e7;--bg4:#c2d8dc;
  --card:#ddeef0;--card2:#cde4e7;
  --border:rgba(0,80,90,0.12);--border2:rgba(0,80,90,0.24);
  --text:#0f2d32;--text2:#2a6068;--text3:#6a9ea4;
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
          <button className="btn btn-danger" onClick={()=>{if(confirm("Reset ALL data to defaults? This cannot be undone!")){["nv-classes","nv-drugs","nv-labs","nv-pq","nv-decks","nv-dict","nv-skillsdb","nv-announcements","nv-handouts"].forEach(k=>localStorage.removeItem(k));initData();toast("Data reset to defaults","warn");}}}>🔄 Reset to Defaults</button>
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
    if (!confirm(`Delete user "${username}"?`)) return;
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
              <option value="student">Student</option>
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

  const del = (id) => { if(!confirm("Delete this class?")) return; const u=classes.filter(c=>c.id!==id); setClasses(u); lsSet("nv-classes",u); toast("Deleted","success"); };

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:10}}>
        <div className="sec-title">🏫 Classes & Courses ({classes.length})</div>
        <div style={{display:"flex",gap:8"}}>
          <button className="btn btn-success btn-sm" onClick={()=>setPasteMode(p=>!p)}>📋 Paste & Import</button>
          <button className="btn btn-purple" onClick={()=>{setShowModal(true);setEdit(null);setForm({id:"",label:"",desc:"",courses:"",color:"#3E8E95"});}}>+ Add Class</button>
        </div>
      </div>

      {pasteMode&&(
        <div className="card" style={{marginBottom:18}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,marginBottom:8}}>📋 Paste & Auto-Import Classes</div>
          <div style={{fontSize:12,color:"var(--text3)",fontFamily:"'DM Mono',monospace",marginBottom:8}}>Format: <b style={{color:"var(--accent)"}}>LABEL | Description | Course1, Course2, Course3</b><br/>Or just paste class names, one per line.</div>
          <textarea className="paste-box" placeholder={"BNSc 5 | Bachelor of Nursing Science Year Five | Advanced Research, Clinical Leadership, Thesis\nND THREE | National Diploma Year Three | Paediatrics, Community Health\nHND THREE | Higher National Diploma Year Three | Health Policy, Nursing Management"} value={pasteText} onChange={e=>setPasteText(e.target.value)} />
          <div style={{display:"flex",gap:8",marginBottom:parsed.length?10:0}}>
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
  const [banks, setBanks] = useState(()=>ls("nv-pq",DEFAULT_PQ));
  const [selBank, setSelBank] = useState(null);
  const [showBankModal, setShowBankModal] = useState(false);
  const [showQModal, setShowQModal] = useState(false);
  const [editBank, setEditBank] = useState(null);
  const [editQ, setEditQ] = useState(null);
  const [pasteMode, setPasteMode] = useState(false);
  const [pasteText, setPasteText] = useState("");
  const [parsed, setParsed] = useState([]);
  const [bankForm, setBankForm] = useState({subject:"",year:""});
  const [qForm, setQForm] = useState({q:"",options:["","","",""],ans:0});

  const parsePaste = () => {
    // Format:
    // Q: Question text
    // A: Option A
    // B: Option B
    // C: Option C
    // D: Option D
    // ANS: B
    const blocks = pasteText.trim().split(/\n\s*\n/).filter(b=>b.trim());
    const items = blocks.map(block=>{
      const lines = block.split("\n").map(l=>l.trim()).filter(Boolean);
      let q="",options=["","","",""],ans=0;
      lines.forEach(line=>{
        const lower=line.toLowerCase();
        if (lower.startsWith("q:")) q=line.slice(2).trim();
        else if (lower.startsWith("a:")) options[0]=line.slice(2).trim();
        else if (lower.startsWith("b:")) options[1]=line.slice(2).trim();
        else if (lower.startsWith("c:")) options[2]=line.slice(2).trim();
        else if (lower.startsWith("d:")) options[3]=line.slice(2).trim();
        else if (lower.startsWith("ans:")) { const a=line.slice(4).trim().toUpperCase(); ans=["A","B","C","D"].indexOf(a); if(ans<0)ans=0; }
      });
      if (!q && lines[0]) q=lines[0];
      return {q,options,ans};
    }).filter(item=>item.q);
    setParsed(items);
  };

  const importParsed = () => {
    if (!selBank) return toast("Select a bank first","error");
    const updated = banks.map(b=>b.id===selBank?{...b,questions:[...b.questions,...parsed.map(p=>({...p}))]}:b);
    setBanks(updated); lsSet("nv-pq",updated);
    toast(`${parsed.length} questions imported!`,"success"); setPasteText(""); setParsed([]); setPasteMode(false);
  };

  const saveBank = () => {
    if (!bankForm.subject) return toast("Subject required","error");
    let u;
    if (editBank!==null) { u=banks.map((b,i)=>i===editBank?{...b,...bankForm}:b); toast("Updated","success"); }
    else { u=[...banks,{...bankForm,id:Date.now(),questions:[]}]; toast("Bank created","success"); }
    setBanks(u); lsSet("nv-pq",u); setShowBankModal(false); setEditBank(null); setBankForm({subject:"",year:""});
  };

  const delBank = (id) => { if(!confirm("Delete this question bank?"))return; const u=banks.filter(b=>b.id!==id); setBanks(u); lsSet("nv-pq",u); if(selBank===id)setSelBank(null); toast("Deleted","success"); };

  const saveQ = () => {
    if (!qForm.q) return toast("Question required","error");
    const updated = banks.map(b=>{
      if (b.id!==selBank) return b;
      let qs;
      if (editQ!==null) { qs=b.questions.map((q,i)=>i===editQ?{...qForm}:q); toast("Updated","success"); }
      else { qs=[...b.questions,{...qForm}]; toast("Question added","success"); }
      return {...b,questions:qs};
    });
    setBanks(updated); lsSet("nv-pq",updated); setShowQModal(false); setEditQ(null); setQForm({q:"",options:["","","",""],ans:0});
  };

  const delQ = (bankId, qIdx) => { const u=banks.map(b=>b.id===bankId?{...b,questions:b.questions.filter((_,i)=>i!==qIdx)}:b); setBanks(u); lsSet("nv-pq",u); toast("Deleted","success"); };

  const currentBank = banks.find(b=>b.id===selBank);

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:10}}>
        <div className="sec-title">❓ Past Questions ({banks.length} banks)</div>
        <button className="btn btn-purple" onClick={()=>{setShowBankModal(true);setEditBank(null);setBankForm({subject:"",year:""});}}>+ New Bank</button>
      </div>

      <div className="grid2" style={{marginBottom:20}}>
        {banks.map((b,i)=>(
          <div key={b.id} className={`card${selBank===b.id?" ":" "}`} style={{cursor:"pointer",border:selBank===b.id?"1px solid var(--purple)":"1px solid var(--border)",transition:"border .2s"}} onClick={()=>setSelBank(b.id)}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:15}}>{b.subject}</div>
                <div style={{fontSize:12,color:"var(--text3)",marginTop:3}}>{b.year} · {b.questions.length} questions</div>
              </div>
              <div style={{display:"flex",gap:5}}>
                <button className="btn btn-sm" onClick={e=>{e.stopPropagation();setEditBank(i);setBankForm({subject:b.subject,year:b.year});setShowBankModal(true);}}>✏️</button>
                <button className="btn btn-sm btn-danger" onClick={e=>{e.stopPropagation();delBank(b.id);}}>🗑️</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {currentBank&&(
        <div className="card">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:8}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700}}>{currentBank.subject} — Questions ({currentBank.questions.length})</div>
            <div style={{display:"flex",gap:8}}>
              <button className="btn btn-success btn-sm" onClick={()=>setPasteMode(p=>!p)}>📋 Paste</button>
              <button className="btn btn-purple btn-sm" onClick={()=>{setShowQModal(true);setEditQ(null);setQForm({q:"",options:["","","",""],ans:0});}}>+ Add Q</button>
            </div>
          </div>

          {pasteMode&&(
            <div style={{marginBottom:16}}>
              <div style={{fontSize:12,color:"var(--text3)",fontFamily:"'DM Mono',monospace",marginBottom:8}}>Format per question (blank line between questions):<br/><b style={{color:"var(--accent)"}}>Q: Question text<br/>A: Option A<br/>B: Option B<br/>C: Option C<br/>D: Option D<br/>ANS: B</b></div>
              <textarea className="paste-box" placeholder={"Q: What is the normal adult temperature?\nA: 35.0°C\nB: 36.1–37.2°C\nC: 38.5°C\nD: 40.0°C\nANS: B\n\nQ: Which organ produces insulin?\nA: Liver\nB: Kidney\nC: Pancreas\nD: Spleen\nANS: C"} value={pasteText} onChange={e=>setPasteText(e.target.value)} rows={10} />
              <div style={{display:"flex",gap:8,marginBottom:parsed.length?10:0}}>
                <button className="btn btn-accent" onClick={parsePaste}>🔍 Parse</button>
                {parsed.length>0&&<button className="btn btn-success" onClick={importParsed}>✅ Import {parsed.length} Questions</button>}
                <button className="btn" onClick={()=>{setPasteMode(false);setParsed([]);setPasteText("");}}>Cancel</button>
              </div>
              {parsed.length>0&&<div className="parse-preview">{parsed.map((p,i)=><div key={i} className="parse-item"><span className="parse-check">✓</span><span style={{flex:1}}>{p.q}</span><span style={{color:"var(--accent)"}}>ANS: {"ABCD"[p.ans]}</span></div>)}</div>}
            </div>
          )}

          {currentBank.questions.map((q,qi)=>(
            <div key={qi} className="card2" style={{marginBottom:8}}>
              <div style={{display:"flex",justifyContent:"space-between",gap:10}}>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600,fontSize:13,marginBottom:6}}>{qi+1}. {q.q}</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                    {q.options.map((opt,oi)=>(
                      <span key={oi} style={{fontSize:11,padding:"2px 8px",borderRadius:5,background:oi===q.ans?"rgba(74,222,128,.15)":"rgba(255,255,255,.05)",border:`1px solid ${oi===q.ans?"var(--success)":"var(--border)"}`,color:oi===q.ans?"var(--success)":"var(--text3)"}}>{"ABCD"[oi]}. {opt}</span>
                    ))}
                  </div>
                </div>
                <div style={{display:"flex",gap:5,flexShrink:0}}>
                  <button className="btn btn-sm" onClick={()=>{setEditQ(qi);setQForm({...q,options:[...q.options]});setShowQModal(true);}}>✏️</button>
                  <button className="btn btn-sm btn-danger" onClick={()=>delQ(currentBank.id,qi)}>🗑️</button>
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
            <label className="lbl">Subject</label><input className="inp" value={bankForm.subject} onChange={e=>setBankForm({...bankForm,subject:e.target.value})} placeholder="e.g. Medical-Surgical Nursing" />
            <label className="lbl">Year</label><input className="inp" value={bankForm.year} onChange={e=>setBankForm({...bankForm,year:e.target.value})} placeholder="e.g. 2024" />
            <div style={{display:"flex",gap:8}}><button className="btn btn-purple" style={{flex:1}} onClick={saveBank}>Save</button><button className="btn" onClick={()=>setShowBankModal(false)}>Cancel</button></div>
          </div>
        </div>
      )}

      {showQModal&&(
        <div className="modal-overlay" onClick={()=>setShowQModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-head"><div className="modal-title">{editQ!==null?"Edit":"Add"} Question</div><button className="modal-close" onClick={()=>setShowQModal(false)}>✕</button></div>
            <label className="lbl">Question</label><textarea className="inp" rows={3} style={{resize:"vertical"}} value={qForm.q} onChange={e=>setQForm({...qForm,q:e.target.value})} />
            {["A","B","C","D"].map((l,i)=>(
              <div key={l}><label className="lbl">Option {l}</label><input className="inp" value={qForm.options[i]} onChange={e=>{const o=[...qForm.options];o[i]=e.target.value;setQForm({...qForm,options:o});}} /></div>
            ))}
            <label className="lbl">Correct Answer</label>
            <select className="inp" value={qForm.ans} onChange={e=>setQForm({...qForm,ans:+e.target.value})}>
              {["A","B","C","D"].map((l,i)=><option key={l} value={i}>Option {l}: {qForm.options[i]}</option>)}
            </select>
            <div style={{display:"flex",gap:8}}><button className="btn btn-purple" style={{flex:1}} onClick={saveQ}>Save</button><button className="btn" onClick={()=>setShowQModal(false)}>Cancel</button></div>
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

  const delDeck = (id) => { if(!confirm("Delete deck?"))return; const u=decks.filter(d=>d.id!==id); setDecks(u); lsSet("nv-decks",u); if(selDeck===id)setSelDeck(null); toast("Deleted","success"); };

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
  const [handouts, setHandouts] = useState(()=>ls("nv-handouts",[]));
  const classes = ls("nv-classes", DEFAULT_CLASSES);

  const del = (id) => { const u=handouts.filter(h=>h.id!==id); setHandouts(u); lsSet("nv-handouts",u); toast("Deleted","success"); };
  const clearAll = () => { if(!confirm("Delete ALL handouts?"))return; setHandouts([]); lsSet("nv-handouts",[]); toast("All handouts cleared","warn"); };

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:10}}>
        <div className="sec-title">📄 All Handouts ({handouts.length})</div>
        {handouts.length>0&&<button className="btn btn-danger btn-sm" onClick={clearAll}>🗑️ Clear All</button>}
      </div>
      {handouts.length===0?<div style={{textAlign:"center",padding:"40px",color:"var(--text3)",fontFamily:"'DM Mono',monospace",fontSize:13}}>No handouts uploaded by users yet.</div>:(
        <div className="card" style={{padding:0,overflow:"hidden"}}>
          <table className="tbl">
            <thead><tr><th>Title</th><th>Class</th><th>Course</th><th>Date</th><th>Action</th></tr></thead>
            <tbody>
              {handouts.map(h=>{
                const c=classes.find(x=>x.id===h.classId);
                return (
                  <tr key={h.id}>
                    <td style={{fontWeight:600}}>{h.title}</td>
                    <td><span className="tag tag-accent">{c?.label||"General"}</span></td>
                    <td style={{fontSize:12,color:"var(--text3)"}}>{h.course||"—"}</td>
                    <td style={{fontSize:12,color:"var(--text3)",fontFamily:"'DM Mono',monospace"}}>{h.date}</td>
                    <td><button className="btn btn-sm btn-danger" onClick={()=>del(h.id)}>🗑️</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
      <div className="sec-sub">Select a class to browse courses and handouts</div>
      <div className="grid2">
        {classes.map((c,i)=>(
          <div className="class-card" key={c.id} style={{"--cc":c.color,animationDelay:`${.08+i*.03}s`}} onClick={()=>onNavigate("handouts",c)}>
            <span style={{float:"right",fontSize:10,color:"var(--text3)",fontFamily:"'DM Mono',monospace"}}>{c.courses.length} courses</span>
            <div className="class-tag">{c.label}</div>
            <div className="class-name">{c.label}</div>
            <div className="class-desc">{c.desc}</div>
            <div className="class-meta">
              <span>📚 {c.courses.length} Courses</span>
              <span>📝 {handouts.filter(h=>h.classId===c.id).length} Notes</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Handouts({ selectedClass, toast }) {
  const classes = ls("nv-classes", DEFAULT_CLASSES);
  const [handouts, setHandouts] = useState(()=>ls("nv-handouts",[]));
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState(""); const [note, setNote] = useState("");
  const [selClass, setSelClass] = useState(selectedClass?.id||""); const [selCourse, setSelCourse] = useState("");
  const [filter, setFilter] = useState(""); const [viewItem, setViewItem] = useState(null);

  const save = () => {
    if (!title.trim()) return toast("Enter a title","error");
    const item={id:Date.now(),title,note,classId:selClass,course:selCourse,date:new Date().toLocaleDateString()};
    const u=[...handouts,item]; setHandouts(u); lsSet("nv-handouts",u);
    setTitle(""); setNote(""); setShowAdd(false); toast("Handout saved!","success");
  };
  const del=(id)=>{const u=handouts.filter(h=>h.id!==id);setHandouts(u);lsSet("nv-handouts",u);toast("Deleted","info");};
  const filtered=handouts.filter(h=>h.title.toLowerCase().includes(filter.toLowerCase())||h.course?.toLowerCase().includes(filter.toLowerCase()));
  const cls=classes.find(c=>c.id===selClass);

  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,flexWrap:"wrap",gap:10}}>
        <div><div className="sec-title">📄 All Handouts</div><div className="sec-sub">{handouts.length} notes stored</div></div>
        <button className="btn btn-accent" onClick={()=>setShowAdd(true)}>+ Add Handout</button>
      </div>
      <div className="search-wrap"><span className="search-ico">🔍</span><input placeholder="Search handouts..." value={filter} onChange={e=>setFilter(e.target.value)} /></div>
      {filtered.length===0?<div style={{textAlign:"center",padding:"60px 20px",color:"var(--text3)"}}><div style={{fontSize:48,marginBottom:12}}>📭</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:13}}>No handouts yet!</div></div>:(
        <div className="grid2">
          {filtered.map(h=>{const c=classes.find(x=>x.id===h.classId);return(
            <div key={h.id} className="card" style={{cursor:"pointer"}} onClick={()=>setViewItem(h)}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                <div className="tag tag-accent">{c?.label||"General"}</div>
                <button className="btn btn-sm btn-danger" onClick={e=>{e.stopPropagation();del(h.id);}}>✕</button>
              </div>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:15,marginBottom:4}}>{h.title}</div>
              {h.course&&<div style={{fontSize:11,color:"var(--text3)",marginBottom:6}}>{h.course}</div>}
              <div style={{fontSize:12,color:"var(--text2)",lineHeight:1.5,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{h.note||"No content"}</div>
              <div style={{fontSize:10,color:"var(--text3)",fontFamily:"'DM Mono',monospace",marginTop:8}}>{h.date}</div>
            </div>
          );})}
        </div>
      )}
      {showAdd&&(
        <div className="modal-overlay" onClick={()=>setShowAdd(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-head"><div className="modal-title">Add Handout</div><button className="modal-close" onClick={()=>setShowAdd(false)}>✕</button></div>
            <label className="lbl">Title</label><input className="inp" placeholder="Chapter 3 Notes" value={title} onChange={e=>setTitle(e.target.value)} />
            <label className="lbl">Class</label>
            <select className="inp" value={selClass} onChange={e=>{setSelClass(e.target.value);setSelCourse("");}}>
              <option value="">Select class...</option>
              {classes.map(c=><option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
            {cls&&(<><label className="lbl">Course</label>
            <select className="inp" value={selCourse} onChange={e=>setSelCourse(e.target.value)}>
              <option value="">Select course...</option>
              {cls.courses.map(c=><option key={c} value={c}>{c}</option>)}
            </select></>)}
            <label className="lbl">Content</label>
            <textarea className="inp" rows={5} style={{resize:"vertical"}} placeholder="Paste or type notes..." value={note} onChange={e=>setNote(e.target.value)} />
            <div style={{display:"flex",gap:8}}><button className="btn btn-accent" style={{flex:1}} onClick={save}>Save</button><button className="btn" onClick={()=>setShowAdd(false)}>Cancel</button></div>
          </div>
        </div>
      )}
      {viewItem&&(
        <div className="modal-overlay" onClick={()=>setViewItem(null)}>
          <div className="modal" style={{maxWidth:600}} onClick={e=>e.stopPropagation()}>
            <div className="modal-head"><div className="modal-title">{viewItem.title}</div><button className="modal-close" onClick={()=>setViewItem(null)}>✕</button></div>
            {viewItem.course&&<div className="tag tag-accent" style={{marginBottom:14,display:"inline-block"}}>{viewItem.course}</div>}
            <div style={{fontSize:14,lineHeight:1.8,color:"var(--text2)",whiteSpace:"pre-wrap"}}>{viewItem.note||"No content."}</div>
            <div style={{fontSize:10,color:"var(--text3)",fontFamily:"'DM Mono',monospace",marginTop:14}}>Added: {viewItem.date}</div>
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

function PastQuestionsView({ toast }) {
  const [banks] = useState(()=>ls("nv-pq",DEFAULT_PQ));
  const [sel, setSel] = useState(null); const [quizMode, setQuizMode] = useState(false);
  const [qIdx, setQIdx] = useState(0); const [answered, setAnswered] = useState(null);
  const [score, setScore] = useState(0); const [done, setDone] = useState(false);
  const start=(bank)=>{setSel(bank);setQuizMode(true);setQIdx(0);setAnswered(null);setScore(0);setDone(false);};
  const answer=(i)=>{if(answered!==null)return;setAnswered(i);if(i===sel.questions[qIdx].ans)setScore(s=>s+1);};
  const next=()=>{if(qIdx+1>=sel.questions.length){setDone(true);return;}setQIdx(q=>q+1);setAnswered(null);};
  if(quizMode&&sel){
    if(done)return<div style={{maxWidth:500,margin:"0 auto",textAlign:"center",padding:"40px 0"}}><div style={{fontSize:64,marginBottom:12}}>🎉</div><div className="sec-title">Quiz Complete!</div><div style={{fontSize:48,fontFamily:"'Syne',sans-serif",fontWeight:800,color:"var(--accent)",margin:"14px 0"}}>{score}/{sel.questions.length}</div><div style={{color:"var(--text2)",marginBottom:20}}>{Math.round(score/sel.questions.length*100)}%</div><div style={{display:"flex",gap:10,justifyContent:"center"}}><button className="btn btn-accent" onClick={()=>start(sel)}>Retry</button><button className="btn" onClick={()=>setQuizMode(false)}>Back</button></div></div>;
    const q=sel.questions[qIdx];
    return<div style={{maxWidth:560,margin:"0 auto"}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}><button className="btn btn-sm" onClick={()=>setQuizMode(false)}>← Back</button><div style={{flex:1}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:"var(--text3)",marginBottom:4}}>{sel.subject} · Q{qIdx+1}/{sel.questions.length}</div><div className="progress-wrap"><div className="progress-fill" style={{width:`${((qIdx+1)/sel.questions.length)*100}%`,background:"var(--accent)"}} /></div></div><div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,color:"var(--accent)"}}>{score} pts</div></div><div className="card" style={{marginBottom:14}}><div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:600,lineHeight:1.5}}>{q.q}</div></div>{q.options.map((opt,i)=><div key={i} className={`quiz-opt${answered!==null?(i===q.ans?" correct":i===answered?" wrong":" reveal"):""}`} onClick={()=>answer(i)}><span style={{fontFamily:"'DM Mono',monospace",fontSize:11,marginRight:8,opacity:.6}}>{"ABCD"[i]}.</span>{opt}</div>)}{answered!==null&&<button className="btn btn-accent" style={{width:"100%",marginTop:12}} onClick={next}>{qIdx+1>=sel.questions.length?"See Results →":"Next →"}</button>}</div>;
  }
  return<div><div className="sec-title">❓ Past Questions</div><div className="sec-sub">Practice with exam questions</div><div className="grid2">{banks.map((b,i)=><div key={b.id} className="card" style={{animation:`fadeUp .4s ease ${i*.08}s both`}}><div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:16,marginBottom:4}}>{b.subject}</div><div style={{fontSize:12,color:"var(--text3)",marginBottom:12}}>{b.year} · {b.questions.length} questions</div><button className="btn btn-accent btn-sm" onClick={()=>start(b)}>Start Quiz ▶</button></div>)}</div></div>;
}

function FlashcardsView() {
  const [decks] = useState(()=>ls("nv-decks",DEFAULT_DECKS));
  const [selDeck, setSelDeck] = useState(null); const [cardIdx, setCardIdx] = useState(0); const [flipped, setFlipped] = useState(false);
  if(selDeck){const deck=decks.find(d=>d.id===selDeck);const card=deck.cards[cardIdx];return<div><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}><button className="btn btn-sm" onClick={()=>setSelDeck(null)}>← Back</button><div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:16}}>{deck.name}</div><div style={{marginLeft:"auto",fontFamily:"'DM Mono',monospace",fontSize:12,color:"var(--text3)"}}>{cardIdx+1}/{deck.cards.length}</div></div><div className="progress-wrap" style={{marginBottom:18}}><div className="progress-fill" style={{width:`${((cardIdx+1)/deck.cards.length)*100}%`,background:"var(--accent)"}} /></div><div className="flashcard" onClick={()=>setFlipped(f=>!f)}><div className={`flashcard-inner${flipped?" flipped":""}`}><div className="flashcard-front"><div className="fc-lbl">QUESTION — tap to flip</div><div className="fc-text">{card.front}</div></div><div className="flashcard-back"><div className="fc-lbl">ANSWER</div><div className="fc-text">{card.back}</div></div></div></div><div style={{display:"flex",gap:10,marginTop:18,justifyContent:"center"}}><button className="btn" disabled={cardIdx===0} onClick={()=>{setCardIdx(i=>i-1);setFlipped(false);}}>← Prev</button><button className="btn btn-accent" onClick={()=>setFlipped(f=>!f)}>Flip 🔄</button><button className="btn" disabled={cardIdx>=deck.cards.length-1} onClick={()=>{setCardIdx(i=>i+1);setFlipped(false);}}>Next →</button></div></div>;}
  return<div><div className="sec-title">🃏 Flashcards</div><div className="sec-sub">Study with interactive cards</div><div className="grid2">{decks.map((d,i)=><div key={d.id} className="card" style={{cursor:"pointer",animation:`fadeUp .4s ease ${i*.08}s both`}} onClick={()=>{setSelDeck(d.id);setCardIdx(0);setFlipped(false);}}><div style={{fontSize:32,marginBottom:8}}>🃏</div><div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:16,marginBottom:4}}>{d.name}</div><div style={{fontSize:12,color:"var(--text3)"}}>{d.cards.length} cards</div></div>)}</div></div>;
}

function DrugGuideView() {
  const [drugs] = useState(()=>ls("nv-drugs",DEFAULT_DRUGS));
  const [search, setSearch] = useState(""); const [sel, setSel] = useState(null);
  const filtered = drugs.filter(d=>d.name.toLowerCase().includes(search.toLowerCase())||d.class.toLowerCase().includes(search.toLowerCase()));
  return<div><div className="sec-title">💊 Drug Guide</div><div className="sec-sub">Quick reference for medications</div><div className="search-wrap"><span className="search-ico">🔍</span><input placeholder="Search drugs..." value={search} onChange={e=>setSearch(e.target.value)} /></div><div className="grid2">{filtered.map((d,i)=><div key={d.id} className="card" style={{cursor:"pointer",animation:`fadeUp .3s ease ${i*.05}s both`}} onClick={()=>setSel(d)}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}><div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:15}}>{d.name}</div><span className="tag tag-accent">{d.class?.split("/")[0]}</span></div><div style={{fontSize:12,color:"var(--text3)"}}><b style={{color:"var(--text2)"}}>Dose:</b> {d.dose}</div><div style={{fontSize:12,color:"var(--text3)",marginTop:4}}><b style={{color:"var(--text2)"}}>Uses:</b> {d.uses}</div></div>)}</div>{sel&&<div className="modal-overlay" onClick={()=>setSel(null)}><div className="modal" onClick={e=>e.stopPropagation()}><div className="modal-head"><div className="modal-title">{sel.name}</div><button className="modal-close" onClick={()=>setSel(null)}>✕</button></div><span className="tag tag-accent" style={{marginBottom:16,display:"inline-block"}}>{sel.class}</span>{[["💊 Dose",sel.dose],["📊 Max",sel.max],["✅ Uses",sel.uses],["⚠️ Contraindications",sel.contraindications],["⚡ Side Effects",sel.side_effects]].map(([l,v])=><div key={l} style={{marginBottom:14}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"var(--text3)",marginBottom:4,textTransform:"uppercase",letterSpacing:"1px"}}>{l}</div><div style={{fontSize:14,color:"var(--text2)"}}>{v||"—"}</div></div>)}</div></div>}</div>;
}

function LabReferenceView() {
  const [labs] = useState(()=>ls("nv-labs",DEFAULT_LABS));
  const [search, setSearch] = useState("");
  const filtered = labs.filter(l=>l.test.toLowerCase().includes(search.toLowerCase()));
  return<div><div className="sec-title">🧪 Lab Reference</div><div className="sec-sub">Normal laboratory values</div><div className="search-wrap"><span className="search-ico">🔍</span><input placeholder="Search test name..." value={search} onChange={e=>setSearch(e.target.value)} /></div><div className="card" style={{padding:0,overflow:"hidden"}}><table className="tbl"><thead><tr><th>Test</th><th>Male</th><th>Female</th><th>Notes</th></tr></thead><tbody>{filtered.map(r=><tr key={r.id}><td style={{fontWeight:700}}>{r.test}</td><td style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:"var(--accent)"}}>{r.male}</td><td style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:"var(--accent2)"}}>{r.female}</td><td style={{fontSize:12,color:"var(--text3)"}}>{r.notes}</td></tr>)}</tbody></table></div></div>;
}

function DictionaryView() {
  const [dict] = useState(()=>ls("nv-dict",DEFAULT_DICT));
  const [search, setSearch] = useState("");
  const filtered = dict.filter(d=>d.term.toLowerCase().includes(search.toLowerCase())||d.def.toLowerCase().includes(search.toLowerCase()));
  return<div><div className="sec-title">📖 Medical Dictionary</div><div className="sec-sub">{dict.length} terms</div><div className="search-wrap"><span className="search-ico">🔍</span><input placeholder="Search terms..." value={search} onChange={e=>setSearch(e.target.value)} /></div><div className="grid2">{filtered.map((t,i)=><div key={t.id} className="card2" style={{animation:`fadeUp .3s ease ${i*.03}s both`}}><div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:15,color:"var(--accent)",marginBottom:5}}>{t.term}</div><div style={{fontSize:13,color:"var(--text2)",lineHeight:1.5}}>{t.def}</div></div>)}</div></div>;
}

function SkillsView() {
  const [skillsDb] = useState(()=>ls("nv-skillsdb",DEFAULT_SKILLS));
  const [done, setDone] = useState(()=>ls("nv-skills-done",{}));
  const toggle=(id)=>{const u={...done,[id]:!done[id]};setDone(u);lsSet("nv-skills-done",u);};
  const count = skillsDb.filter(s=>done[s.id]).length;
  return<div><div className="sec-title">✅ Skills Checklist</div><div className="sec-sub">Track clinical competencies</div><div className="card" style={{marginBottom:16}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:"var(--text3)"}}>Progress</span><span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:"var(--accent)"}}>{count}/{skillsDb.length}</span></div><div className="progress-wrap"><div className="progress-fill" style={{width:`${skillsDb.length>0?(count/skillsDb.length)*100:0}%`,background:"linear-gradient(90deg,var(--accent),var(--accent2))"}} /></div></div>{skillsDb.map(s=><div key={s.id} className="card2" style={{marginBottom:8,display:"flex",alignItems:"center",gap:12,cursor:"pointer",opacity:done[s.id]?.6:1}} onClick={()=>toggle(s.id)}><div style={{width:22,height:22,borderRadius:6,border:`2px solid ${done[s.id]?"var(--success)":"var(--border2)"}`,background:done[s.id]?"var(--success)":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .2s"}}>{done[s.id]&&<span style={{fontSize:12,color:"white"}}>✓</span>}</div><div style={{fontSize:14,fontWeight:500,textDecoration:done[s.id]?"line-through":"none",flex:1}}>{s.name}</div>{done[s.id]&&<span className="tag tag-success">Done</span>}</div>)}</div>;
}

function GPACalc({ toast }) {
  const [courses, setCourses] = useState(()=>ls("nv-gpa-courses",[]));
  const [form, setForm] = useState({name:"",units:"",grade:""});
  const GRADES=[{l:"A",p:"5.0"},{l:"B",p:"4.0"},{l:"C",p:"3.0"},{l:"D",p:"2.0"},{l:"E",p:"1.0"},{l:"F",p:"0.0"}];
  const add=()=>{if(!form.name||!form.units||!form.grade)return toast("Fill all fields","error");const u=[...courses,{...form,id:Date.now(),units:+form.units,grade:+form.grade}];setCourses(u);lsSet("nv-gpa-courses",u);setForm({name:"",units:"",grade:""});};
  const tp=courses.reduce((s,c)=>s+c.units*c.grade,0),tu=courses.reduce((s,c)=>s+c.units,0),gpa=tu>0?tp/tu:0;
  const cls=gpa>=4.5?"First Class":gpa>=3.5?"Second Class Upper":gpa>=2.5?"Second Class Lower":gpa>=1.5?"Third Class":"Fail";
  const clsColor=gpa>=4.5?"var(--accent)":gpa>=3.5?"var(--accent2)":gpa>=2.5?"var(--warn)":"var(--danger)";
  return<div><div className="sec-title">🎓 GPA Calculator</div><div className="sec-sub">5.0 scale</div>{courses.length>0&&<div className="card" style={{marginBottom:18,textAlign:"center"}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"var(--text3)",marginBottom:6,textTransform:"uppercase",letterSpacing:"1px"}}>Your GPA</div><div style={{fontFamily:"'Syne',sans-serif",fontSize:56,fontWeight:800,color:"var(--accent)"}}>{gpa.toFixed(2)}</div><div style={{fontSize:16,color:clsColor,fontWeight:600,marginBottom:8}}>{cls}</div><div className="gpa-bar-wrap"><div className="gpa-bar" style={{width:`${(gpa/5)*100}%`}} /></div></div>}<div className="card" style={{marginBottom:14}}><div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,marginBottom:12}}>Add Course</div><div className="grid3" style={{gap:10,alignItems:"end"}}><div><label className="lbl">Course</label><input className="inp" style={{marginBottom:0}} placeholder="Pharmacology" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /></div><div><label className="lbl">Units</label><input className="inp" style={{marginBottom:0}} type="number" min="1" max="6" value={form.units} onChange={e=>setForm({...form,units:e.target.value})} /></div><div><label className="lbl">Grade</label><select className="inp" style={{marginBottom:0}} value={form.grade} onChange={e=>setForm({...form,grade:e.target.value})}><option value="">Select...</option>{GRADES.map(g=><option key={g.l} value={g.p}>{g.l} ({g.p})</option>)}</select></div></div><button className="btn btn-accent" style={{marginTop:10}} onClick={add}>Add</button></div>{courses.map((c,i)=><div key={c.id} className="course-row"><div style={{flex:1}}><div style={{fontWeight:600,fontSize:13}}>{c.name}</div><div style={{fontSize:11,color:"var(--text3)"}}>{c.units} unit{c.units>1?"s":""}</div></div><div style={{width:36,height:36,borderRadius:9,background:"rgba(62,142,149,.1)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Syne',sans-serif",fontWeight:700,color:"var(--accent)"}}>{GRADES.find(g=>+g.p===c.grade)?.l}</div><button className="btn btn-sm btn-danger" onClick={()=>{const u=courses.filter(x=>x.id!==c.id);setCourses(u);lsSet("nv-gpa-courses",u);}}>✕</button></div>)}{courses.length>0&&<button className="btn btn-sm btn-danger" style={{marginTop:8}} onClick={()=>{setCourses([]);lsSet("nv-gpa-courses",[]);}}>Clear All</button>}</div>;
}

function MedCalc() {
  const [dose,setDose]=useState("");const [weight,setWeight]=useState("");const [avail,setAvail]=useState("");const [vol,setVol]=useState("");
  const result=dose&&weight?(+dose*+weight).toFixed(2):null;
  const volume=result&&avail&&vol?((+result/+avail)*+vol).toFixed(2):null;
  const [bmi,setBmi]=useState({h:"",w:""});
  const bmiVal=bmi.h&&bmi.w?(+bmi.w/(+bmi.h/100)**2).toFixed(1):null;
  const bmiCls=bmiVal?+bmiVal<18.5?"Underweight":+bmiVal<25?"Normal":+bmiVal<30?"Overweight":"Obese":null;
  return<div><div className="sec-title">🧮 Med Calculator</div><div className="sec-sub">Drug dosage & BMI</div><div className="grid2"><div className="card"><div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,marginBottom:12}}>💊 Dose Calculator</div><label className="lbl">Dose (mg/kg)</label><input className="inp" type="number" placeholder="10" value={dose} onChange={e=>setDose(e.target.value)} /><label className="lbl">Weight (kg)</label><input className="inp" type="number" placeholder="70" value={weight} onChange={e=>setWeight(e.target.value)} />{result&&<div className="card2" style={{textAlign:"center",marginBottom:12}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"var(--text3)"}}>REQUIRED DOSE</div><div style={{fontFamily:"'Syne',sans-serif",fontSize:26,fontWeight:800,color:"var(--accent)"}}>{result} mg</div></div>}<label className="lbl">Drug Available (mg)</label><input className="inp" type="number" value={avail} onChange={e=>setAvail(e.target.value)} /><label className="lbl">Available Volume (mL)</label><input className="inp" type="number" value={vol} onChange={e=>setVol(e.target.value)} />{volume&&<div className="card2" style={{textAlign:"center"}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"var(--text3)"}}>GIVE</div><div style={{fontFamily:"'Syne',sans-serif",fontSize:26,fontWeight:800,color:"var(--accent2)"}}>{volume} mL</div></div>}</div><div className="card"><div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,marginBottom:12}}>⚖️ BMI</div><label className="lbl">Height (cm)</label><input className="inp" type="number" value={bmi.h} onChange={e=>setBmi({...bmi,h:e.target.value})} /><label className="lbl">Weight (kg)</label><input className="inp" type="number" value={bmi.w} onChange={e=>setBmi({...bmi,w:e.target.value})} />{bmiVal&&<div className="card2" style={{textAlign:"center"}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"var(--text3)"}}>BMI</div><div style={{fontFamily:"'Syne',sans-serif",fontSize:48,fontWeight:800,color:"var(--accent)"}}>{bmiVal}</div><div style={{color:+bmiVal<18.5?"var(--warn)":+bmiVal<25?"var(--success)":+bmiVal<30?"var(--warn)":"var(--danger)",fontWeight:600}}>{bmiCls}</div></div>}</div></div></div>;
}

function Timetable({ toast }) {
  const [tt, setTt] = useState(()=>ls("nv-timetable",[]));
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({day:"Monday",time:"",subject:"",venue:"",type:"Lecture"});
  const DAYS=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const COLORS={Lecture:"var(--accent)",Practical:"var(--warn)",Tutorial:"var(--accent2)",Clinical:"var(--danger)"};
  const save=()=>{if(!form.time||!form.subject)return toast("Fill required fields","error");const u=[...tt,{...form,id:Date.now()}];setTt(u);lsSet("nv-timetable",u);setShowAdd(false);toast("Added!","success");};
  return<div><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,flexWrap:"wrap",gap:10}}><div><div className="sec-title">📅 Timetable</div><div className="sec-sub">Weekly schedule</div></div><button className="btn btn-accent" onClick={()=>setShowAdd(true)}>+ Add Class</button></div>{DAYS.map(day=>{const dc=tt.filter(t=>t.day===day);if(!dc.length)return null;return<div key={day} style={{marginBottom:18}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:"var(--text3)",marginBottom:8,textTransform:"uppercase",letterSpacing:"1px"}}>{day}</div>{dc.sort((a,b)=>a.time.localeCompare(b.time)).map(c=><div key={c.id} className="card2" style={{marginBottom:7,display:"flex",alignItems:"center",gap:12,borderLeft:`3px solid ${COLORS[c.type]||"var(--accent)"}`}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:13,fontWeight:600,color:"var(--accent)",minWidth:48}}>{c.time}</div><div style={{flex:1}}><div style={{fontWeight:600,fontSize:14}}>{c.subject}</div>{c.venue&&<div style={{fontSize:11,color:"var(--text3)"}}>{c.venue}</div>}</div><span className="tt-badge" style={{background:`${COLORS[c.type]||"var(--accent)"}20`,color:COLORS[c.type]||"var(--accent)"}}>{c.type}</span><button className="btn btn-sm btn-danger" onClick={()=>{const u=tt.filter(x=>x.id!==c.id);setTt(u);lsSet("nv-timetable",u);}}>✕</button></div>)}</div>;})} {tt.length===0&&<div style={{textAlign:"center",padding:"50px",color:"var(--text3)"}}><div style={{fontSize:48}}>📅</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:13,marginTop:12}}>No classes added.</div></div>}{showAdd&&<div className="modal-overlay" onClick={()=>setShowAdd(false)}><div className="modal" onClick={e=>e.stopPropagation()}><div className="modal-head"><div className="modal-title">Add Class</div><button className="modal-close" onClick={()=>setShowAdd(false)}>✕</button></div>{[["Day","day","select"],["Time","time","time"],["Subject","subject","text"],["Venue","venue","text"],["Type","type","select"]].map(([l,k,t])=><div key={k}><label className="lbl">{l}</label>{t==="select"?<select className="inp" value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})}>{k==="day"?DAYS.map(d=><option key={d}>{d}</option>):["Lecture","Practical","Tutorial","Clinical"].map(d=><option key={d}>{d}</option>)}</select>:<input className="inp" type={t} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} />}</div>)}<div style={{display:"flex",gap:8}}><button className="btn btn-accent" style={{flex:1}} onClick={save}>Save</button><button className="btn" onClick={()=>setShowAdd(false)}>Cancel</button></div></div></div>}</div>;
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
  return<div><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,flexWrap:"wrap",gap:10}}><div><div className="sec-title">📅 Study Planner</div><div className="sec-sub">{pending} task{pending!==1?"s":""} pending</div></div><button className="btn btn-accent" onClick={()=>setShowAdd(true)}>+ Add Task</button></div>{tasks.length===0&&<div style={{textAlign:"center",padding:"60px",color:"var(--text3)"}}><div style={{fontSize:48}}>✅</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:13,marginTop:12}}>No tasks!</div></div>}{tasks.map(t=><div key={t.id} className="card2" style={{marginBottom:8,display:"flex",alignItems:"center",gap:12,opacity:t.done?.5:1}}><div style={{width:22,height:22,borderRadius:6,border:`2px solid ${t.done?"var(--success)":"var(--border2)"}`,background:t.done?"var(--success)":"transparent",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .2s"}} onClick={()=>toggle(t.id)}>{t.done&&<span style={{fontSize:12,color:"white"}}>✓</span>}</div><div style={{flex:1}}><div style={{fontWeight:600,fontSize:14,textDecoration:t.done?"line-through":"none"}}>{t.task}</div>{(t.subject||t.due)&&<div style={{fontSize:11,color:"var(--text3)",fontFamily:"'DM Mono',monospace"}}>{t.subject}{t.subject&&t.due?" · ":""}{t.due}</div>}</div><span className="tag" style={{borderColor:pColor[t.priority],color:pColor[t.priority]}}>{t.priority}</span><button className="btn btn-sm btn-danger" onClick={()=>del(t.id)}>✕</button></div>)}{showAdd&&<div className="modal-overlay" onClick={()=>setShowAdd(false)}><div className="modal" onClick={e=>e.stopPropagation()}><div className="modal-head"><div className="modal-title">Add Task</div><button className="modal-close" onClick={()=>setShowAdd(false)}>✕</button></div><label className="lbl">Task</label><input className="inp" value={form.task} onChange={e=>setForm({...form,task:e.target.value})} /><label className="lbl">Subject</label><input className="inp" value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} /><label className="lbl">Due Date</label><input className="inp" type="date" value={form.due} onChange={e=>setForm({...form,due:e.target.value})} /><label className="lbl">Priority</label><select className="inp" value={form.priority} onChange={e=>setForm({...form,priority:e.target.value})}>{["High","Medium","Low"].map(p=><option key={p}>{p}</option>)}</select><div style={{display:"flex",gap:8}}><button className="btn btn-accent" style={{flex:1}} onClick={save}>Add</button><button className="btn" onClick={()=>setShowAdd(false)}>Cancel</button></div></div></div>}</div>;
}

function Messages({ user, toast }) {
  const [msgs, setMsgs] = useState(()=>ls("nv-messages",[{id:1,from:"System",text:"Welcome to NurseVault! 🎉",time:"Now",read:true}]));
  const [input, setInput] = useState("");
  const announcements = ls("nv-announcements",[]);
  const send=()=>{if(!input.trim())return;const msg={id:Date.now(),from:user,text:input,time:"Just now",read:true,mine:true};const u=[...msgs,msg];setMsgs(u);lsSet("nv-messages",u);setInput("");};
  return<div><div className="sec-title">💬 Messages</div><div className="sec-sub">Notifications and chat</div>{announcements.filter(a=>a.pinned).map(a=><div key={a.id} style={{background:"rgba(251,146,60,.08)",border:"1px solid rgba(251,146,60,.2)",borderRadius:10,padding:"10px 14px",marginBottom:10,fontSize:13}}><b>📌 {a.title}:</b> {a.body}</div>)}<div className="card" style={{marginBottom:14,minHeight:250,display:"flex",flexDirection:"column",gap:8,padding:14}}>{msgs.map(m=><div key={m.id} style={{display:"flex",gap:8,alignItems:"flex-start",justifyContent:m.mine?"flex-end":"flex-start"}}>{!m.mine&&<div style={{width:30,height:30,borderRadius:50,background:"linear-gradient(135deg,var(--accent),var(--accent2))",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0}}>📢</div>}<div style={{maxWidth:"75%"}}>{!m.mine&&<div style={{fontSize:10,color:"var(--text3)",fontFamily:"'DM Mono',monospace",marginBottom:3}}>{m.from} · {m.time}</div>}<div style={{background:m.mine?"linear-gradient(135deg,var(--accent),var(--accent2))":"var(--card2)",borderRadius:m.mine?"14px 14px 4px 14px":"14px 14px 14px 4px",padding:"9px 13px",fontSize:14,color:m.mine?"white":"var(--text)"}}>{m.text}</div></div></div>)}</div><div style={{display:"flex",gap:8}}><input className="inp" style={{flex:1,marginBottom:0}} placeholder="Type a message..." value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} /><button className="btn btn-accent" onClick={send}>Send</button></div></div>;
}

function StudyProgress() {
  const results=ls("nv-results",[]);const tasks=ls("nv-tasks",[]);const skillsDb=ls("nv-skillsdb",DEFAULT_SKILLS);const done=ls("nv-skills-done",{});
  const doneTasks=tasks.filter(t=>t.done).length;const doneSkills=skillsDb.filter(s=>done[s.id]).length;
  const avg=results.length>0?Math.round(results.reduce((s,r)=>s+r.pct,0)/results.length):0;
  return<div><div className="sec-title">📈 Study Progress</div><div className="sec-sub">Your academic overview</div><div className="grid3" style={{marginBottom:20}}>{[{lbl:"Avg Score",val:`${avg}%`,sub:`${results.length} results`,color:"var(--accent)"},{lbl:"Tasks Done",val:`${doneTasks}/${tasks.length}`,sub:"Completed",color:"var(--success)"},{lbl:"Skills",val:`${doneSkills}/${skillsDb.length}`,sub:"Competencies",color:"var(--accent2)"}].map(s=><div key={s.lbl} className="stat-card"><div className="stat-lbl">{s.lbl}</div><div className="stat-val" style={{color:s.color,fontSize:24}}>{s.val}</div><div className="stat-sub">{s.sub}</div></div>)}</div>{results.length>0&&<div className="card"><div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,marginBottom:12}}>Recent Results</div>{results.slice(-5).reverse().map(r=><div key={r.id} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 0",borderBottom:"1px solid var(--border)"}}><div style={{flex:1}}><div style={{fontWeight:600,fontSize:13}}>{r.subject}</div><div style={{fontSize:11,color:"var(--text3)"}}>{r.type} · {r.date}</div></div><div style={{flex:1,background:"var(--bg4)",borderRadius:20,height:6,overflow:"hidden"}}><div style={{height:"100%",borderRadius:20,width:`${r.pct}%`,background:r.pct>=70?"var(--success)":r.pct>=50?"var(--warn)":"var(--danger)"}} /></div><span style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:14,color:r.pct>=70?"var(--success)":r.pct>=50?"var(--warn)":"var(--danger)",minWidth:40,textAlign:"right"}}>{r.pct}%</span></div>)}</div>}</div>;
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
  const [darkMode, setDarkMode] = useState(true); const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toasts, setToasts] = useState([]); const [currentUser, setCurrentUser] = useState(""); const [isAdmin, setIsAdmin] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => { document.body.className = darkMode ? "" : "light"; }, [darkMode]);

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
    if (loginType === "admin" && user.role !== "admin") return toast("Not an admin account", "error");
    setCurrentUser(username); setIsAdmin(user.role === "admin"); setPage("app");
    toast(`Welcome back, ${username}! 👋`, "success");
  };

  const register = () => {
    if (!regUser || !regPw) return toast("Fill in all fields", "error");
    const users = ls("nv-users", []);
    if (users.find(u => u.username === regUser)) return toast("Username taken", "error");
    const newUsers = [...users, { username: regUser, password: regPw, role: "student", class: regClass, joined: new Date().toLocaleDateString() }];
    lsSet("nv-users", newUsers); setCurrentUser(regUser); setIsAdmin(false); setPage("app");
    toast(`Welcome, ${regUser}! 🎉`, "success");
  };

  const navigate = (section, cls = null) => {
    setActiveNav(section); setActiveTool(null); if (cls) setSelectedClass(cls); setSidebarOpen(false);
  };
  const navTool = (tool) => { setActiveTool(tool); setActiveNav(null); setSidebarOpen(false); };

  const greeting = () => { const h = new Date().getHours(); return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening"; };

  const classes = ls("nv-classes", DEFAULT_CLASSES);

  const renderContent = () => {
    if (activeNav === "admin") return <AdminPanel toast={toast} currentUser={currentUser} />;
    if (activeTool === "drug-guide") return <DrugGuideView />;
    if (activeTool === "lab-ref") return <LabReferenceView />;
    if (activeTool === "flashcards") return <FlashcardsView />;
    if (activeTool === "med-calc") return <MedCalc />;
    if (activeTool === "study-planner") return <StudyPlanner toast={toast} />;
    if (activeTool === "skills") return <SkillsView />;
    if (activeTool === "dictionary") return <DictionaryView />;
    if (activeTool === "gpa") return <GPACalc toast={toast} />;
    if (activeTool === "progress") return <StudyProgress />;
    switch (activeNav) {
      case "dashboard": return <Dashboard user={currentUser} onNavigate={navigate} />;
      case "timetable": return <Timetable toast={toast} />;
      case "handouts": return <Handouts selectedClass={selectedClass} toast={toast} />;
      case "results": return <Results toast={toast} />;
      case "questions": return <PastQuestionsView toast={toast} />;
      case "messages": return <Messages user={currentUser} toast={toast} />;
      default: return <Dashboard user={currentUser} onNavigate={navigate} />;
    }
  };

  const NAV = [
    { icon:"⊞", label:"Dashboard", key:"dashboard" },
    { icon:"📅", label:"Timetable", key:"timetable" },
    { icon:"📄", label:"All Handouts", key:"handouts" },
    { icon:"📊", label:"Results", key:"results" },
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

            {/* Hidden admin toggle - invisible dot */}
            <div style={{display:"flex",justifyContent:"flex-end",marginBottom:4}}>
              <div onClick={()=>setLoginType(t=>t==="admin"?"student":"admin")} style={{width:5,height:5,borderRadius:"50%",background:"rgba(255,255,255,0.06)",cursor:"pointer"}} />
            </div>

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
                <button className={`btn-primary${loginType==="admin"?" btn-admin":""}`} onClick={login}>
                  {loginType==="admin"?"🛡️ Admin Sign In →":"Sign In →"}
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
            <div className="auth-notice"><span>⚠️</span><span>Accounts are stored on this device only.</span></div>
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

          <div className="nav-sec">Navigation</div>
          {NAV.map(item=>(
            <div key={item.key} className={`nav-item${activeNav===item.key&&!activeTool?" active":""}`} onClick={()=>navigate(item.key)}>
              <span className="nav-icon">{item.icon}</span>{item.label}
            </div>
          ))}

          <div className="nav-sec" style={{marginTop:6}}>Clinical Tools</div>
          {TOOLS.map(item=>(
            <div key={item.key} className={`nav-item${activeTool===item.key?" active":""}`} onClick={()=>navTool(item.key)}>
              <span className="nav-icon">{item.icon}</span>{item.label}
            </div>
          ))}

          <div className="nav-sec" style={{marginTop:6}}>Classes</div>
          {classes.map(c=>(
            <div key={c.id} className="nav-item" onClick={()=>navigate("handouts",c)}>
              <span className="class-dot" style={{background:c.color}} />{c.label}
            </div>
          ))}

          <div style={{padding:"16px 8px 0"}}>
            <div className="nav-item" style={{color:"var(--danger)"}} onClick={()=>{setPage("auth");setCurrentUser("");setIsAdmin(false);}}>
              <span className="nav-icon">🚪</span>Sign Out
            </div>
          </div>
        </div>

        <div className="main-area">
          <div className="topbar">
            <div className="topbar-left">
              <button className="hamburger" onClick={()=>setSidebarOpen(o=>!o)}>☰</button>
              <div className="topbar-title">
                {activeNav==="admin" ? "🛡️ Admin Panel" : `${greeting()}, `}
                {activeNav!=="admin"&&<span style={{color:"var(--accent)"}}>{currentUser}</span>}
                {activeNav!=="admin"&&" 👋"}
              </div>
              {isAdmin&&activeNav!=="admin"&&<span className="tag tag-purple" style={{fontSize:10}}>🛡️ Admin</span>}
            </div>
            <div className="topbar-right">
              <div className="theme-btn" onClick={()=>setDarkMode(d=>!d)}>{darkMode?"☀️ Light":"🌙 Dark"}</div>
              <div className="icon-btn" onClick={()=>navigate("messages")}>🔔</div>
            </div>
          </div>
          <div className="page-content">{renderContent()}</div>
        </div>
      </div>
      <Toasts list={toasts} />
    </>
  );
}

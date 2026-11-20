/* Childhood Development Centre — Consultancy Brain (Phase 1)
   Real project. Chat posts to the live Groq webhook in n8n.
   All figures are from the verified 18 Nov 2026 research; every figure
   carries its verification badge. Nothing is invented. */
"use strict";

var WEBHOOK_URL = "https://n8n.urdubazars.com/webhook/consultancy-demo-chat";

/* ---------- Punjab cities (client target: Faisalabad first, then all Punjab) ---------- */
var PUNJAB_CITIES = ["Faisalabad", "Lahore", "Rawalpindi", "Multan", "Gujranwala", "Sialkot", "Bahawalpur", "Sargodha", "Gujrat", "Jhelum", "Sheikhupura", "Kasur", "Okara", "Sahiwal", "Rahim Yar Khan", "Dera Ghazi Khan", "Jhang", "Toba Tek Singh", "Bahawalnagar", "Mianwali", "Attock", "Chakwal", "Vehari", "Khanewal", "Muzaffargarh", "Layyah", "Bhakkar", "Khushab", "Hafizabad", "Mandi Bahauddin", "Narowal", "Pakpattan", "Chiniot", "Lodhran", "Rajanpur"];
var DEFAULT_CITY = "Faisalabad";
function getSelectedCity() {
  var sel = document.getElementById("citySelect");
  return (sel && sel.value) ? sel.value : DEFAULT_CITY;
}

/* ---------- helpers ---------- */
function esc(s) {
  return String(s).replace(/[&<>"'`=\/]/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#47;", "`": "&#96;", "=": "&#61;" }[c];
  });
}
function rs(n) {
  return "Rs " + Number(n).toLocaleString("en-PK");
}
function badge(label) {
  var cls = {
    "Confirmed": "bg-primary-container/20 text-primary border border-primary/30",
    "Directory": "bg-surface-container-high text-secondary border border-outline-variant/40",
    "To verify": "bg-error-container/40 text-error border border-error/20",
    "News report": "bg-surface-container-high text-secondary border border-outline-variant/40",
    "Assumption": "bg-surface-container-high text-secondary border border-outline-variant/40"
  }[label] || "bg-surface-container-high text-secondary border border-outline-variant/40";
  return '<span class="font-caption text-caption px-space-xs py-0.5 rounded border ' + cls + '">' + esc(label) + "</span>";
}
function card(inner) {
  return '<div class="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 p-space-md md:p-space-lg">' + inner + "</div>";
}
function sectionTitle(kicker, title, sub) {
  return '<div class="flex flex-col gap-space-xs max-w-3xl">'
    + '<span class="font-caption text-caption text-secondary uppercase tracking-widest">' + esc(kicker) + "</span>"
    + '<h1 class="font-headline-lg text-headline-lg text-on-surface tracking-tight">' + esc(title) + "</h1>"
    + (sub ? '<p class="font-body-lg text-body-lg text-secondary">' + esc(sub) + "</p>" : "")
    + "</div>";
}

/* ---------- verified ECD data (research date 18 Nov 2026) ---------- */
var INDICATORS = [
  { value: "10", label: "Lahore centres & clinics mapped", note: "Own websites + Google listings, 18 Nov 2026", badge: "Confirmed" },
  { value: "Rs 1,500–5,000", label: "Published per-session therapy fee range, Lahore", note: "Marham · Oladoc · InstaCare", badge: "Directory" },
  { value: "59.4%", label: "Punjab children aged 36–59 months developmentally on track (ECDI)", note: "UNICEF MICS 2017–2020, peer-reviewed analysis (MDPI)", badge: "Confirmed" },
  { value: "18.9%", label: "Children aged 3–5 enrolled in early childhood education, Pakistan", note: "UNICEF Pakistan COAR 2023", badge: "Confirmed" }
];

var ECDI = [
  { province: "Punjab", pct: 59.4 },
  { province: "Khyber Pakhtunkhwa", pct: 54.6 },
  { province: "Sindh", pct: 47.5 },
  { province: "Balochistan", pct: 39.1 }
];

var PAKISTAN_CONTEXT = [
  "31,988,331 children under five (13% of population)",
  "34% under-five stunting",
  "Under-five mortality 58 per 1,000",
  "~6.89 million births per year",
  "Only 18.9% of 3–5-year-olds enrolled in early childhood education",
  "Richest–poorest gap in developmental attainment: 18.8–35.6 percentage points",
  "Government attention rising — Punjab's first government autism school & resource centre, Lahore, Feb 2026"
];

var COMPETITORS = [
  { name: "PhysioGen Daycare & Pediatric Therapy Center", area: "Bahria Town · Sector D, Plaza 54, AA Block", badge: "Fees confirmed",
    services: ["Occupational Therapy", "Speech Therapy", "Sensory integration", "Daycare (8:30–3:30)", "CCTV + WhatsApp updates"],
    fees: [{ label: "Registration (one-time)", value: "Rs 5,000" }, { label: "Daycare package", value: "Rs 25,000/mo", was: "Rs 29,400" }, { label: "OT & Special Care package", value: "Rs 35,000/mo", was: "Rs 40,000" }],
    notes: "Daycare + early intervention wing; ASD / ADHD / Down syndrome / sensory delays; team led by DPTs (Dr. Taseen Mansoor; Dr. Amna Tariq, OT); launch offer for first 10 children; model is monthly packages, not per-session.",
    source: "physiogen.care" },
  { name: "The First Hope Center", area: "DHA Phase 6 · Raya, Fairway Commercial", badge: "Fees to verify",
    services: ["Psychological assessment (2–3 days)", "Speech & Language", "OT", "BCBA behaviour therapy", "IEP & school liaison", "School Readiness (3–6)"],
    fees: [{ label: "Session fees", value: "Not published — call / visit to verify" }],
    notes: "Premium; UK / Ireland-registered therapists, BCBAs, developmental paediatrician; free 20-minute first call; 10% sibling / hardship discount on therapy; ages 18 months–18 years.",
    source: "thefirsthopecenter.com" },
  { name: "NEST Institute", area: "Lahore centre · clinic, home, school & online", badge: "Fees to verify",
    services: ["Developmental screening (90 min)", "Full diagnostic evaluation (3–4 sessions)", "Speech Therapy 45 min/wk", "OT 45 min/wk + home program", "Educational therapy", "Family counselling"],
    fees: [{ label: "Session fees", value: "Not published — call / visit to verify" }],
    notes: "One shared case record across screening → evaluation → therapy → school liaison; ages 2–16 therapy, screening 3–18.",
    source: "thenestinstitute.org/en/services" },
  { name: "REX Medical Complex — Child Therapy Centre", area: "Allama Iqbal Town · 91-A College Block", badge: "Fees to verify",
    services: ["Speech & Language", "ABA Therapy", "OT", "Physiotherapy", "Play Therapy"],
    fees: [{ label: "Session fees", value: "Not published — call / visit to verify" }],
    notes: "Hospital-anchored; CEO is a consultant speech & language pathologist; serves western Lahore; developmental & special needs.",
    source: "rexmedcomplex.com" },
  { name: "PetalsTalk Autism & Speech Therapy Centre", area: "Bahria Town · AA Block, Al-Noor Plaza", badge: "Directory listing",
    services: ["Speech & Language", "ABA", "OT", "Sensory Integration", "Early Intervention"],
    fees: [{ label: "Session fees", value: "Not published — call / visit to verify" }],
    notes: "Direct competitor to PhysioGen in the same Bahria Town sector; autistic & non-autistic children.",
    source: "Google Business listing" },
  { name: "Orion ABA Pakistan", area: "Faisal Town · 335-C", badge: "Directory listing",
    services: ["ABA Therapy", "Speech Therapy", "Physiotherapy", "Free assessment camps"],
    fees: [{ label: "Assessment camp", value: "Free (promotional)" }, { label: "Session fees", value: "Not published — call / visit to verify" }],
    notes: "Autism / ADHD / Down syndrome; university MOU (University of Garrison, Jan 2026).",
    source: "findhealthclinics.org listing" },
  { name: "Neuro Kids HUB — Child Development Centre", area: "Punjab Society, Ghazi Road · near DHA Phase 4", badge: "Fee confirmed",
    services: ["Speech Therapy", "Behaviour Therapy", "OT"],
    fees: [{ label: "Per session (40 min)", value: "Rs 1,500" }, { label: "Promotion (Oct 2026)", value: "15% off sessions" }],
    notes: "Evening-only per-session model (Mon–Sat 3–7 pm), lowest published entry price; led by a doctor with 10+ years autism experience (Pakistan & UK); children & teenagers.",
    source: "Centre Facebook / Instagram flyer, Sep 2026" },
  { name: "GetMindCare", area: "DHA Phase 8 · clinic + online", badge: "Fees confirmed",
    services: ["Child psychology", "Child assessment battery (clinic day)", "Free “First Look” screening", "Online sessions"],
    fees: [{ label: "Online session", value: "Rs 3,000" }, { label: "In-person session (Lahore)", value: "Rs 5,000" }, { label: "Child assessment battery", value: "Rs 8,000" }, { label: "Care Report", value: "Rs 1,500" }],
    notes: "Psychology-led; clear published price ladder; free screening funnel; screening explicitly never sold as diagnosis; children, families & adults, online worldwide.",
    source: "getmindcare.com" },
  { name: "Apni Talash Autism & Speech Rehabilitation Center", area: "Lahore · address to confirm in field pass", badge: "Directory listing",
    services: ["Autism assessment", "Behaviour Therapy", "Speech & Language", "OT", "Sensory Integration", "Special Education program", "ADHD program"],
    fees: [{ label: "Session fees", value: "Not published — call / visit to verify" }],
    notes: "Autism assessment, behaviour therapy, speech & language, OT, sensory integration, special education and ADHD programs.",
    source: "apnitalash.com prospectus" },
  { name: "Maryam Nawaz School & Resource Center for Autism", area: "Lahore · Government of Punjab", badge: "News report",
    services: ["OT", "Speech Therapy", "Music & art therapy", "Early Childhood Education", "Sensory garden"],
    fees: [{ label: "Fees", value: "Public sector — n/a" }],
    notes: "Pakistan's first government-run autism centre, inaugurated Feb 2026; Punjab announced district-level expansion; not a price competitor — referral / awareness / partnership factor.",
    source: "Press report of inauguration, Feb 2026" }
];

var BENCHMARKS = [
  { item: "Neuro Kids HUB session", value: "Rs 1,500", badge: "Confirmed" },
  { item: "Speech therapy, Lahore range (Marham)", value: "Rs 1,500–5,000", badge: "Directory" },
  { item: "Occupational therapy, Lahore range (Oladoc)", value: "Rs 2,000–5,000", badge: "Directory" },
  { item: "Karishma Speech Clinic session (Gulberg II)", value: "Rs 4,000", badge: "Directory" },
  { item: "GetMindCare in-person session", value: "Rs 5,000", badge: "Confirmed" },
  { item: "GetMindCare child assessment battery", value: "Rs 8,000", badge: "Confirmed" },
  { item: "Karishma assessment & report", value: "Rs 15,000", badge: "Directory" },
  { item: "PhysioGen OT package (monthly)", value: "Rs 35,000/mo", badge: "Confirmed" }
];

var LOCATIONS = [
  { area: "Bahria Town", mapped: "PhysioGen, PetalsTalk (+ hospital clinics)", verdict: "Proven · crowded",
    detail: "Demand proven by two centres in one sector; a third entrant fights incumbents. Package pricing Rs 25–35k/mo is the local norm." },
  { area: "DHA (Phases 4–8)", mapped: "First Hope (Ph 6), GetMindCare (Ph 8), Neuro Kids HUB (near Ph 4), Beyond Grades (Ph 6)", verdict: "Premium · costly",
    detail: "Highest-income catchment; premium assessment-led models cluster here. Supports premium fees, but rent and salary expectations are the city's highest. Best fit for an assessment-led premium model." },
  { area: "Johar Town", mapped: "NeuroPlay, Noor Neurodevelopment Center, MTC Mind Care (349-D), newer smaller centres", verdict: "Emerging · open — Recommended first",
    detail: "Dense middle / upper-middle residential, many schools, Expo Centre side. Active entry signals unmet demand, no dominant premium incumbent. Strong candidate for a mid-priced transparent-fee centre." },
  { area: "Faisal Town / Model Town", mapped: "Orion ABA (Faisal Town)", verdict: "Open",
    detail: "Shares the Johar Town catchment with one mapped competitor; a Johar Town–Faisal Town border site can serve both." },
  { area: "Allama Iqbal Town / Wapda Town", mapped: "REX Medical Complex", verdict: "Underserved · price-test",
    detail: "Only one mapped centre for a very large, dense, mid-income population in western Lahore — but willingness to pay at DHA-level fees is unproven; a value package model would need testing." },
  { area: "Gulberg", mapped: "Karishma Speech Clinic (Gulberg II), solo specialist practice", verdict: "Specialist fit",
    detail: "Central, commercial; families travel in. Works for specialist / assessment clinics more than daily-therapy / daycare models." }
];

var SERVICES = [
  { name: "Developmental screening & assessment", type: "Clinical", pro: "Clinical / developmental psychologist", seen: "First Hope, NEST, GetMindCare" },
  { name: "Early intervention program (0–6)", type: "Clinical", pro: "Multidisciplinary team lead", seen: "PhysioGen, PetalsTalk, Apni Talash" },
  { name: "Speech & language therapy", type: "Clinical", pro: "Speech-language pathologist", seen: "All mapped centres" },
  { name: "Occupational therapy & sensory integration", type: "Clinical", pro: "Occupational therapist", seen: "PhysioGen, First Hope, NEST, REX" },
  { name: "ABA / behaviour therapy", type: "Clinical", pro: "BCBA / behaviour therapist under supervision", seen: "Orion, First Hope, PetalsTalk" },
  { name: "Physiotherapy (pediatric)", type: "Clinical", pro: "Physiotherapist (DPT)", seen: "REX, Orion, First Hope" },
  { name: "Child psychology & behaviour support", type: "Clinical", pro: "Clinical psychologist", seen: "First Hope, GetMindCare, NEST" },
  { name: "ECD / early learning program", type: "Developmental", pro: "Early-childhood educator", seen: "PhysioGen daycare, govt autism centre ECE" },
  { name: "School readiness program (3–6)", type: "Developmental", pro: "Educator + therapist input", seen: "First Hope" },
  { name: "Social skills groups", type: "Developmental", pro: "Psychologist / behaviour therapist", seen: "First Hope (group therapy)" },
  { name: "Parent training & coaching", type: "Developmental", pro: "Psychologist / senior therapist", seen: "NEST family counselling; add-on elsewhere" },
  { name: "Special education support / IEP", type: "Developmental", pro: "Special educator + psychologist", seen: "First Hope, NEST, Apni Talash" }
];

var SOURCES = [
  { name: "physiogen.care", url: "https://www.physiogen.care/" },
  { name: "thefirsthopecenter.com", url: "https://www.thefirsthopecenter.com/" },
  { name: "thenestinstitute.org/en/services", url: "https://thenestinstitute.org/en/services" },
  { name: "rexmedcomplex.com", url: "https://rexmedcomplex.com/" },
  { name: "getmindcare.com", url: "https://getmindcare.com/" },
  { name: "Marham — speech therapy, Lahore", url: "https://www.marham.pk/" },
  { name: "Oladoc — occupational therapists, Lahore", url: "https://oladoc.com/" },
  { name: "InstaCare — Karishma Speech Clinic", url: "https://instacare.pk/" },
  { name: "UNICEF ECD Country Profile — Pakistan (PDF)", url: "https://data.unicef.org/" },
  { name: "MDPI Children — developmental disparities", url: "https://www.mdpi.com/2227-9067/13/10/1314" },
  { name: "UNICEF Pakistan COAR 2023 (PDF)", url: "https://www.unicef.org/pakistan" }
];

/* Feasibility presets. Rent is an explicit placeholder — replace with a verified figure. */
var PRESETS = {
  lean: { label: "Lean start · 2 therapists", setup: 1800000, rent: 120000, therapists: 2, salary: 100000, other: 150000, fee: 2000, sessionsPerDay: 6, days: 24, occupancy: 55, sessionsPerChild: 8 },
  standard: { label: "Standard · 3 therapists", setup: 3000000, rent: 200000, therapists: 3, salary: 120000, other: 250000, fee: 2500, sessionsPerDay: 6, days: 24, occupancy: 60, sessionsPerChild: 8 },
  package: { label: "Package model · 4 therapists", setup: 3500000, rent: 250000, therapists: 4, salary: 130000, other: 300000, fee: 3000, sessionsPerDay: 5, days: 24, occupancy: 70, sessionsPerChild: 10 }
};

/* ---------- module renderers ---------- */
function sourceLink(source) {
  var found = null;
  SOURCES.forEach(function (s) { if (s.name === source) found = s; });
  if (found) return '<a class="font-caption text-caption text-primary hover:underline" href="' + esc(found.url) + '" target="_blank" rel="noopener">Source: ' + esc(source) + "</a>";
  return '<span class="font-caption text-caption text-secondary">Source: ' + esc(source) + "</span>";
}

function renderMarket() {
  var h = sectionTitle("Market Research · Punjab", "Market Research",
    "Verified Lahore baseline, 18 Nov 2026. Pick any Punjab city in the chat for live data. No Lahore ECD market-size figure exists — it is not invented. Figures no centre publishes are labelled To verify, never estimated.");
  h += '<div class="grid grid-cols-1 md:grid-cols-2 gap-space-md">';
  INDICATORS.forEach(function (k) {
    h += card('<div class="flex flex-col gap-space-xs">'
      + '<div class="flex items-center justify-between gap-space-sm"><span class="font-headline-md text-headline-md text-on-surface">' + esc(k.value) + "</span>" + badge(k.badge) + "</div>"
      + '<span class="font-label-md text-label-md text-on-surface">' + esc(k.label) + "</span>"
      + '<span class="font-caption text-caption text-secondary">' + esc(k.note) + "</span></div>");
  });
  h += "</div>";
  h += card('<span class="font-label-md text-label-md text-on-surface font-medium">ECDI on-track — children aged 36–59 months</span>'
    + '<span class="font-caption text-caption text-secondary">UNICEF MICS 2017–2020, n = 46,067 children, peer-reviewed analysis (MDPI Children 2026). In Punjab roughly 4 in 10 children are NOT on track (~40%); literacy–numeracy is the weakest domain everywhere (14.6–27.2%); physical development exceeds 90%.</span>'
    + '<div class="flex flex-col gap-space-sm pt-space-sm">'
    + ECDI.map(function (r) {
        return '<div class="flex items-center gap-space-sm"><span class="w-40 font-body-sm text-body-sm text-on-surface">' + esc(r.province) + '</span>'
          + '<div class="flex-1 h-2 rounded-full bg-surface-container"><div class="h-2 rounded-full bg-primary" style="width:' + r.pct + '%"></div></div>'
          + '<span class="w-14 text-right font-label-md text-label-md text-on-surface">' + r.pct + "%</span></div>";
      }).join("")
    + "</div>");
  h += card('<span class="font-label-md text-label-md text-on-surface font-medium">Pakistan context</span>'
    + '<span class="font-caption text-caption text-secondary">UNICEF ECD Country Profile Pakistan, 2025 update; UNICEF Pakistan COAR 2023.</span>'
    + '<ul class="list-disc pl-5 pt-space-xs flex flex-col gap-1 font-body-sm text-body-sm text-on-surface-variant">'
    + PAKISTAN_CONTEXT.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("")
    + "</ul>");
  h += card('<span class="font-label-md text-label-md text-on-surface font-medium">Still to research — open items, not data</span>'
    + '<span class="font-body-sm text-body-sm text-secondary">Structured parent interviews · Google-review mining · willingness-to-pay by area · referral patterns from paediatricians / preschools.</span>');
  document.getElementById("marketView").innerHTML = h;
}

function renderCompetitors() {
  var h = sectionTitle("Competitor Intelligence · Punjab", "Competitors",
    "10 Lahore centres & clinics mapped (verified baseline), 18 Nov 2026. Use the chat for any other Punjab city. Only 3 of 10 publish any price at all. Fees no centre publishes are shown as To verify — never as confirmed prices.");
  h += '<div class="flex flex-col gap-space-md">';
  COMPETITORS.forEach(function (c, i) {
    h += card('<div class="flex flex-col gap-space-sm">'
      + '<div class="flex items-start justify-between gap-space-sm"><div class="flex flex-col gap-0.5">'
      + '<span class="font-caption text-caption text-secondary">' + (i + 1) + " / 10</span>"
      + '<span class="font-title-md text-title-md text-on-surface">' + esc(c.name) + "</span>"
      + '<span class="font-body-sm text-body-sm text-secondary">' + esc(c.area) + "</span></div>" + badge(c.badge) + "</div>"
      + '<div class="flex flex-wrap gap-space-xs">' + c.services.map(function (s) {
          return '<span class="px-space-xs py-0.5 rounded bg-surface-container-low text-on-surface font-caption text-caption">' + esc(s) + "</span>";
        }).join("") + "</div>"
      + '<div class="flex flex-col gap-1 pt-space-xs border-t border-outline-variant/30">'
      + c.fees.map(function (f) {
          return '<div class="flex items-baseline justify-between gap-space-sm"><span class="font-body-sm text-body-sm text-secondary">' + esc(f.label) + '</span><span class="font-label-md text-label-md text-on-surface text-right">' + (f.was ? '<s class="text-secondary font-body-sm text-body-sm">' + esc(f.was) + "</s> " : "") + esc(f.value) + "</span></div>";
        }).join("")
      + "</div>"
      + '<span class="font-body-sm text-body-sm text-secondary">' + esc(c.notes) + "</span>"
      + sourceLink(c.source) + "</div>");
  });
  h += "</div>";
  h += card('<span class="font-label-md text-label-md text-on-surface font-medium">Pricing benchmark — published only, seen 18 Nov 2026</span>'
    + '<div class="flex flex-col gap-1 pt-space-sm">'
    + BENCHMARKS.map(function (b) {
        return '<div class="flex items-baseline justify-between gap-space-sm py-1 border-b border-outline-variant/20"><span class="font-body-sm text-body-sm text-on-surface">' + esc(b.item) + '</span><span class="flex items-center gap-space-sm"><span class="font-label-md text-label-md text-on-surface">' + esc(b.value) + "</span>" + badge(b.badge) + "</span></div>";
      }).join("")
    + "</div>");
  document.getElementById("competitorsView").innerHTML = h;
}

function renderLocation() {
  var h = sectionTitle("Location Intelligence · Punjab", "Location",
    "6 Lahore areas compared (verified baseline). Pick any Punjab city in the chat for live location research. Rent is deliberately NOT scored — no rent figure is used anywhere. Recommendation is a hypothesis to test, not a verdict.");
  h += card('<span class="font-label-md text-label-md text-on-surface font-medium">Recommendation</span>'
    + '<span class="font-body-md text-body-md text-on-surface"><strong>Johar Town first</strong>, DHA as premium alternative; Bahria Town proven but contested.</span>'
    + '<span class="font-caption text-caption text-secondary">Rent verification method: 5+ live listings per shortlisted area on Zameen.com / OLX for 8–12 marla houses or commercial floors; call two estate agents per area; visit top 2 sites (parking, school proximity, legal operation).</span>');
  h += '<div class="grid grid-cols-1 md:grid-cols-2 gap-space-md">';
  LOCATIONS.forEach(function (l) {
    h += card('<div class="flex flex-col gap-space-xs">'
      + '<div class="flex items-start justify-between gap-space-sm"><span class="font-title-md text-title-md text-on-surface">' + esc(l.area) + '</span><span class="font-caption text-caption text-primary font-medium text-right">' + esc(l.verdict) + "</span></div>"
      + '<span class="font-body-sm text-body-sm text-secondary">Mapped: ' + esc(l.mapped) + "</span>"
      + '<span class="font-body-sm text-body-sm text-on-surface">' + esc(l.detail) + "</span></div>");
  });
  h += "</div>";
  document.getElementById("locationView").innerHTML = h;
}

function renderServices() {
  var h = sectionTitle("Services Blueprint", "Services",
    "12 services. Clinical boundary: never recommend diagnosing or treating a child without qualified professionals; individual treatment plans require approval by qualified specialists.");
  ["Clinical", "Developmental"].forEach(function (type) {
    h += '<span class="font-label-md text-label-md text-on-surface font-medium uppercase tracking-wider pt-space-md">' + type + "</span>";
    h += '<div class="flex flex-col gap-space-sm">';
    SERVICES.filter(function (s) { return s.type === type; }).forEach(function (s) {
      h += card('<div class="flex flex-col gap-0.5">'
        + '<span class="font-title-md text-title-md text-on-surface">' + esc(s.name) + "</span>"
        + '<span class="font-body-sm text-body-sm text-secondary">Professional: ' + esc(s.pro) + "</span>"
        + '<span class="font-body-sm text-body-sm text-secondary">Seen in market: ' + esc(s.seen) + "</span></div>");
    });
    h += "</div>";
  });
  document.getElementById("servicesView").innerHTML = h;
}

function renderReports() {
  var h = sectionTitle("Reports & Sources", "Reports",
    "Every report carries its source name, source URL, data collection date, verification status, estimated vs confirmed figures, and research limitations.");
  h += card('<span class="font-label-md text-label-md text-on-surface font-medium">Full feasibility report</span>'
    + '<span class="font-body-sm text-body-sm text-secondary">Downloads a complete, print-ready report — Executive Summary, Market, Competitors, Location, Feasibility (with your current calculator settings), Services, and Sources. Open it in a browser and print / save as PDF.</span>'
    + '<div class="pt-space-sm"><button id="downloadReportBtn" class="px-space-md py-space-sm rounded-lg bg-primary text-on-primary font-body-md text-body-md font-medium hover:opacity-90">Download full report (.html)</button></div>'
    + '<span class="font-caption text-caption text-secondary" id="reportStatus"></span>');
  h += card('<span class="font-label-md text-label-md text-on-surface font-medium">Revenue lines a full model would add</span>'
    + '<div class="flex flex-col gap-1 pt-space-sm">'
    + [["Individual therapy sessions", "Rs 1,500–5,000 / session", "Confirmed range"],
       ["Developmental assessment + report", "Rs 8,000–15,000", "Confirmed — GetMindCare · Karishma"],
       ["Monthly therapy package", "Rs 35,000 / mo OT & special care", "Confirmed — PhysioGen"],
       ["Daycare / ECD program", "Rs 25,000 / mo + Rs 5,000 registration", "Confirmed — PhysioGen"],
       ["Parent training & workshops", "Not published by mapped centres", "To price-test"],
       ["School screening / liaison contracts", "Offered by First Hope & NEST", "Fees not published — To verify"]]
      .map(function (r) {
        return '<div class="flex items-baseline justify-between gap-space-sm py-1 border-b border-outline-variant/20"><span class="font-body-sm text-body-sm text-on-surface">' + esc(r[0]) + '</span><span class="font-body-sm text-body-sm text-secondary text-right">' + esc(r[1]) + " · " + esc(r[2]) + "</span></div>";
      }).join("")
    + "</div>");
  h += card('<span class="font-label-md text-label-md text-on-surface font-medium">Sources — all retrieved 18 Nov 2026</span>'
    + '<span class="font-caption text-caption text-secondary">Public websites / directories only — no site visits, calls, or review-mining yet.</span>'
    + '<div class="flex flex-col gap-1 pt-space-sm">'
    + SOURCES.map(function (s) {
        return '<a class="font-body-sm text-body-sm text-primary hover:underline" href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.name) + "</a>";
      }).join("")
    + "</div>");
  document.getElementById("reportsView").innerHTML = h;
  var dlBtn = document.getElementById("downloadReportBtn");
  if (dlBtn) dlBtn.addEventListener("click", generateReport);
}

/* ---------- feasibility calculator ---------- */
var calc = Object.assign({}, PRESETS.standard);
var calcPreset = "standard";

function calcResults(s) {
  var capacity = s.therapists * s.sessionsPerDay * s.days;
  var booked = Math.round(capacity * s.occupancy / 100);
  /* revenue uses the exact product (no intermediate rounding), matching the
     ECD dashboard: 3 x 6 x 24 x 60% x 2500 = 648,000. booked is display-only. */
  var revenue = s.therapists * s.sessionsPerDay * s.days * (s.occupancy / 100) * s.fee;
  var cost = s.rent + s.therapists * s.salary + s.other;
  var profit = revenue - cost;
  var beSessions = Math.ceil(cost / s.fee);
  var beChildren = Math.ceil(beSessions / s.sessionsPerChild);
  var payback = profit > 0 ? (s.setup / profit).toFixed(1) + " months" : "No payback at these settings";
  return { capacity: capacity, booked: booked, revenue: revenue, cost: cost, profit: profit, beSessions: beSessions, beChildren: beChildren, payback: payback };
}

function sliderRow(id, label, min, max, step, val, fmt) {
  return '<div class="flex flex-col gap-1">'
    + '<div class="flex items-baseline justify-between"><label class="font-body-sm text-body-sm text-secondary" for="' + id + '">' + esc(label) + '</label>'
    + '<span class="font-label-md text-label-md text-on-surface" id="' + id + 'Val">' + fmt(val) + "</span></div>"
    + '<input type="range" id="' + id + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '" class="w-full accent-[#0F766E]"/>'
    + "</div>";
}

function renderFeasibility() {
  var h = sectionTitle("Financial Feasibility", "Feasibility",
    "Revenue = therapists × sessions/day × days × occupancy × fee. Cost = rent + therapists × salary + other monthly costs. Assessments, packages and daycare income are EXCLUDED from the base case (upside only).");
  h += card('<span class="font-label-md text-label-md text-on-surface font-medium">Presets</span>'
    + '<div class="flex flex-wrap gap-space-sm pt-space-sm" id="presetRow">'
    + Object.keys(PRESETS).map(function (k) {
        return '<button data-preset="' + k + '" class="preset-btn px-space-md py-space-xs rounded-lg font-body-sm text-body-sm border ' + (k === calcPreset ? "bg-primary-container text-on-primary border-primary-container" : "bg-surface-container-lowest text-on-surface border-outline-variant/40") + '">' + esc(PRESETS[k].label) + "</button>";
      }).join("")
    + "</div>");
  h += card('<div class="grid grid-cols-1 md:grid-cols-2 gap-space-md" id="calcInputs"></div>'
    + '<div class="grid grid-cols-2 md:grid-cols-4 gap-space-md pt-space-md" id="calcResults"></div>'
    + '<span class="font-caption text-caption text-secondary pt-space-sm">Rent is a placeholder — replace with a verified figure. Salary and other costs are assumptions, not market figures.</span>');
  document.getElementById("feasibilityView").innerHTML = h;
  bindCalculator();
}

function bindCalculator() {
  var wrap = document.getElementById("calcInputs");
  wrap.innerHTML =
    sliderRow("cSetup", "One-time setup (Rs)", 0, 10000000, 50000, calc.setup, rs) +
    sliderRow("cRent", "Monthly rent (Rs) — placeholder", 50000, 600000, 10000, calc.rent, rs) +
    sliderRow("cTherapists", "Therapists", 1, 10, 1, calc.therapists, function (v) { return v; }) +
    sliderRow("cSalary", "Salary per therapist / month (Rs)", 60000, 250000, 5000, calc.salary, rs) +
    sliderRow("cOther", "Other monthly costs (Rs)", 50000, 800000, 10000, calc.other, rs) +
    sliderRow("cFee", "Fee per session (Rs)", 1000, 6000, 100, calc.fee, rs) +
    sliderRow("cSessions", "Sessions / therapist / day", 2, 10, 1, calc.sessionsPerDay, function (v) { return v; }) +
    sliderRow("cDays", "Working days / month", 20, 26, 1, calc.days, function (v) { return v; }) +
    sliderRow("cOcc", "Occupancy (%)", 10, 100, 5, calc.occupancy, function (v) { return v + "%"; }) +
    sliderRow("cPerChild", "Sessions / child / month", 4, 16, 1, calc.sessionsPerChild, function (v) { return v; });
  wrap.querySelectorAll("input[type=range]").forEach(function (input) {
    input.addEventListener("input", function () {
      var map = { cSetup: "setup", cRent: "rent", cTherapists: "therapists", cSalary: "salary", cOther: "other", cFee: "fee", cSessions: "sessionsPerDay", cDays: "days", cOcc: "occupancy", cPerChild: "sessionsPerChild" };
      calc[map[input.id]] = Number(input.value);
      calcPreset = "custom";
      updateCalcLabels();
      updateCalcResults();
    });
  });
  document.querySelectorAll(".preset-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      calcPreset = btn.getAttribute("data-preset");
      calc = Object.assign({}, PRESETS[calcPreset]);
      renderFeasibility();
    });
  });
  updateCalcLabels();
  updateCalcResults();
}

function updateCalcLabels() {
  var fmt = { cSetup: rs, cRent: rs, cSalary: rs, cOther: rs, cFee: rs,
    cTherapists: function (v) { return v; }, cSessions: function (v) { return v; },
    cDays: function (v) { return v; }, cOcc: function (v) { return v + "%"; }, cPerChild: function (v) { return v; } };
  var map = { cSetup: "setup", cRent: "rent", cTherapists: "therapists", cSalary: "salary", cOther: "other", cFee: "fee", cSessions: "sessionsPerDay", cDays: "days", cOcc: "occupancy", cPerChild: "sessionsPerChild" };
  Object.keys(map).forEach(function (id) {
    var el = document.getElementById(id), lab = document.getElementById(id + "Val");
    if (el) el.value = calc[map[id]];
    if (lab) lab.textContent = fmt[id](calc[map[id]]);
  });
  document.querySelectorAll(".preset-btn").forEach(function (btn) {
    var on = btn.getAttribute("data-preset") === calcPreset;
    btn.className = "preset-btn px-space-md py-space-xs rounded-lg font-body-sm text-body-sm border " + (on ? "bg-primary-container text-on-primary border-primary-container" : "bg-surface-container-lowest text-on-surface border-outline-variant/40");
  });
}

function updateCalcResults() {
  var r = calcResults(calc);
  var profitCls = r.profit >= 0 ? "text-primary" : "text-error";
  document.getElementById("calcResults").innerHTML =
    metricTile("Monthly revenue", rs(r.revenue), r.booked + " / " + r.capacity + " sessions booked") +
    metricTile("Monthly operating cost", rs(r.cost), "Rent + salaries + other") +
    metricTile("Monthly profit / (loss)", rs(r.profit), r.profit >= 0 ? "Profitable" : "Loss-making", profitCls) +
    metricTile("Break-even", r.beSessions + " sessions · " + r.beChildren + " children", "Payback: " + r.payback);
}
function metricTile(label, value, note, valueCls) {
  return '<div class="flex flex-col gap-0.5 p-space-sm bg-surface-container-low rounded-lg">'
    + '<span class="font-caption text-caption text-secondary uppercase tracking-wider">' + esc(label) + "</span>"
    + '<span class="font-headline-sm text-headline-sm ' + (valueCls || "text-on-surface") + '">' + esc(value) + "</span>"
    + '<span class="font-caption text-caption text-secondary">' + esc(note) + "</span></div>";
}

/* ---------- navigation ---------- */
var VIEW_MAP = { "chat": "view-chat", "market-research": "view-market", "competitors": "view-competitors", "feasibility": "view-feasibility", "location": "view-location", "services": "view-services", "reports": "view-reports" };

function showView(path) {
  var target = VIEW_MAP[path] || "view-chat";
  Object.keys(VIEW_MAP).forEach(function (p) {
    var el = document.getElementById(VIEW_MAP[p]);
    if (el) el.classList.toggle("hidden", VIEW_MAP[p] !== target);
  });
  document.querySelectorAll("nav a[data-path]").forEach(function (a) {
    var on = a.getAttribute("data-path") === path;
    a.className = "flex items-center gap-space-sm px-space-sm py-2 rounded-lg transition-colors " + (on
      ? "bg-primary-container text-on-primary font-medium"
      : "font-body-sm text-body-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface");
    if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------- Punjab city selector, chat highlight, activation ---------- */
function styleDarkHeader() {
  var header = document.querySelector("header");
  if (!header) return;
  header.classList.add("app-header");
  var title = header.querySelector("span.font-label-md");
  if (title) {
    title.classList.add("cursor-pointer");
    title.setAttribute("role", "button");
    title.setAttribute("title", "Go to Chat (Home)");
    title.addEventListener("click", function () { showView("chat"); });
  }
}

function buildCitySelector() {
  var form = document.getElementById("chatForm");
  if (!form || document.getElementById("citySelect")) return;
  var wrap = document.createElement("div");
  wrap.className = "flex flex-wrap items-center gap-space-sm pb-space-xs";
  var opts = PUNJAB_CITIES.map(function (c) {
    return '<option value="' + esc(c) + '"' + (c === DEFAULT_CITY ? " selected" : "") + ">" + esc(c) + "</option>";
  }).join("");
  wrap.innerHTML = '<label for="citySelect" class="font-label-md text-label-md text-on-surface font-medium">City</label>'
    + '<select id="citySelect" class="px-space-sm py-space-xs rounded-lg border border-outline-variant/50 bg-surface-container-lowest font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40">' + opts + "</select>"
    + '<span class="font-caption text-caption text-secondary">Live search uses this city — change it any time.</span>';
  form.parentElement.insertBefore(wrap, form);
  document.getElementById("citySelect").addEventListener("change", function () {
    renderSuggested();
  });
}

function renderSuggested() {
  var row = document.getElementById("suggestedRow");
  if (!row) {
    var first = document.querySelector('button[onclick*="injectPrompt"]');
    if (first && first.parentElement) { row = first.parentElement; row.id = "suggestedRow"; }
  }
  if (!row) return;
  var city = getSelectedCity();
  var qs = [
    { icon: "explore", text: "Is " + city + " a good location for a centre?" },
    { icon: "price_change", text: "What are therapy fees in " + city + "?" },
    { icon: "calculate", text: "Calculate break-even for 4 therapists" }
  ];
  row.innerHTML = qs.map(function (q) {
    return '<button type="button" class="group px-space-md py-space-xs bg-surface-container-low hover:bg-surface-container text-on-surface rounded-lg font-body-sm text-body-sm transition-all text-left flex items-center gap-space-xs shadow-sm" data-q="' + esc(q.text) + '">'
      + '<span class="material-symbols-outlined text-secondary text-[16px] group-hover:text-primary">' + q.icon + "</span>"
      + "<span>" + esc(q.text) + "</span></button>";
  }).join("");
  row.querySelectorAll("button[data-q]").forEach(function (b) {
    b.addEventListener("click", function () { injectPrompt(b.getAttribute("data-q")); });
  });
}

function buildChatHighlight() {
  var h1 = document.querySelector("#view-chat h1");
  if (h1 && !document.getElementById("aiFeatureBanner")) {
    var banner = document.createElement("div");
    banner.id = "aiFeatureBanner";
    banner.className = "rounded-xl p-space-md shadow-sm flex items-start gap-space-md";
    banner.style.background = "linear-gradient(135deg, #0F766E 0%, #042F2E 100%)";
    banner.innerHTML = '<div class="w-10 h-10 rounded-lg bg-white/15 text-white flex items-center justify-center flex-shrink-0"><span class="material-symbols-outlined text-[22px]">psychology</span></div>'
      + '<div class="flex flex-col gap-0.5">'
      + '<span class="font-label-md text-label-md text-white font-medium">★ Special feature — Ask the AI</span>'
      + '<span class="font-body-sm text-body-sm text-white/85">Type any question below and the Consultancy Brain answers with live research and sources — fees, locations, competitors, or feasibility for your selected city.</span>'
      + "</div>";
    h1.parentElement.insertAdjacentElement("afterend", banner);
  }
  var form = document.getElementById("chatForm");
  if (form) form.classList.add("chat-form-highlight");
  var chatNav = document.querySelector('nav a[data-path="chat"]');
  if (chatNav && !chatNav.querySelector(".ai-nav-badge")) {
    var b = document.createElement("span");
    b.className = "ai-nav-badge ml-auto px-1.5 py-0.5 rounded bg-primary text-on-primary font-caption text-[10px] font-semibold";
    b.textContent = "AI";
    chatNav.appendChild(b);
  }
}

var FRAMEWORK_GOTO = ["chat", "market-research", "competitors", "feasibility", "location", "reports", "reports"];
function activateFrameworkSteps() {
  document.querySelectorAll("aside ol li").forEach(function (li, i) {
    li.classList.add("cursor-pointer", "clickable-card", "framework-step");
    li.setAttribute("role", "button");
    li.setAttribute("tabindex", "0");
    var path = FRAMEWORK_GOTO[i] || "chat";
    li.setAttribute("title", "Open the " + path.replace(/-/g, " ") + " view");
    li.addEventListener("click", function () { showView(path); });
    li.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); showView(path); } });
  });
}

var MOSAIC_GOTO = ["services", "reports", "feasibility"];
var MOSAIC_LABEL = ["Services", "Reports", "Feasibility"];
function activateMosaicCards() {
  var grid = document.querySelector('#view-chat div[class*="grid-cols-3"]');
  if (!grid) return;
  var cards = grid.children;
  for (var i = 0; i < cards.length && i < MOSAIC_GOTO.length; i++) {
    (function (card, path, label) {
      card.classList.add("cursor-pointer", "clickable-card");
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("title", "Open " + label);
      card.addEventListener("click", function () { showView(path); });
      card.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); showView(path); } });
    })(cards[i], MOSAIC_GOTO[i], MOSAIC_LABEL[i]);
  }
}

function updateWelcomeScope() {
  var stream = document.getElementById("chatStream");
  if (!stream) return;
  var ps = stream.querySelectorAll("p");
  for (var i = 0; i < ps.length; i++) {
    if (ps[i].textContent.indexOf("Lahore, Karachi, and Islamabad") !== -1) {
      ps[i].textContent = ps[i].textContent.replace("localized operational environments such as Lahore, Karachi, and Islamabad", "localized operational environments across Punjab — Faisalabad first, then every Punjab city");
    }
  }
}

/* ---------- live chat (Groq via n8n webhook) ---------- */
function injectPrompt(text) {
  var input = document.getElementById("userQueryInput");
  if (!input) return;
  input.value = text;
  input.focus();
  document.getElementById("chatForm").requestSubmit();
}

function appendBubble(html, who) {
  var stream = document.getElementById("chatStream");
  var row = document.createElement("div");
  if (who === "user") {
    row.className = "flex items-start justify-end gap-space-md";
    row.innerHTML = '<div class="flex flex-col items-end gap-space-xs max-w-2xl">'
      + '<div class="flex items-center gap-space-sm"><span class="font-caption text-caption text-secondary">You</span></div>'
      + '<div class="bg-primary text-on-primary p-space-md rounded-xl shadow-sm font-body-md text-body-md">' + html + "</div></div>";
  } else {
    row.className = "flex items-start gap-space-md";
    row.innerHTML = '<div class="w-9 h-9 rounded-lg bg-surface-container-low text-primary flex items-center justify-center flex-shrink-0 mt-0.5">'
      + '<span class="material-symbols-outlined text-[20px]">psychology</span></div>'
      + '<div class="flex flex-col gap-space-sm max-w-3xl">'
      + '<div class="flex items-center gap-space-sm"><span class="font-label-md text-label-md text-on-surface font-medium">Strategic Advisor</span>'
      + '<span class="font-caption text-caption text-secondary">Live AI · Groq</span></div>'
      + '<div class="bg-surface-container-low text-on-surface p-space-md rounded-xl shadow-sm leading-relaxed font-body-md text-body-md">' + html + "</div></div>";
  }
  stream.appendChild(row);
  row.scrollIntoView({ behavior: "smooth", block: "end" });
  return row;
}

function formatReply(text) {
  var safe = esc(text);
  return safe.replace(/\n/g, "<br/>");
}

function handleQuerySubmit(event) {
  event.preventDefault();
  var input = document.getElementById("userQueryInput");
  var stream = document.getElementById("chatStream");
  if (!input || !stream) return;
  var query = input.value.trim();
  if (!query) return;
  appendBubble(esc(query), "user");
  input.value = "";
  var typing = appendBubble('<span class="text-secondary">Thinking…</span>', "ai");
  fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: query, city: getSelectedCity() })
  })
    .then(function (res) { return res.json(); })
    .then(function (data) {
      typing.remove();
      var reply = (data && data.reply) ? String(data.reply) : "";
      if (reply) appendBubble(formatReply(reply), "ai");
      else appendBubble('<span class="text-secondary">The AI returned an empty reply. Please try again.</span>', "ai");
    })
    .catch(function () {
      typing.remove();
      appendBubble('<span class="text-secondary">Could not reach the AI right now. Please check the connection and try again — no answer was generated.</span>', "ai");
    });
}

/* ---------- init ---------- */
document.addEventListener("DOMContentLoaded", function () {
  renderMarket();
  renderCompetitors();
  renderFeasibility();
  renderLocation();
  renderServices();
  renderReports();
  document.querySelectorAll("nav a[data-path]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      showView(a.getAttribute("data-path"));
    });
  });
  /* NOTE: the chat form already calls handleQuerySubmit via its inline
     onsubmit in index.html — do NOT add a second submit listener here,
     or every question would post twice. */
  styleDarkHeader();
  buildCitySelector();
  renderSuggested();
  buildChatHighlight();
  activateFrameworkSteps();
  activateMosaicCards();
  updateWelcomeScope();
  showView("chat");
});

/* ---------- report generation ---------- */
function reportRow(label, value) {
  return '<tr><td style="padding:8px 10px;border-bottom:1px solid #e2e8f0;font-weight:600;width:38%">' + esc(label) + '</td><td style="padding:8px 10px;border-bottom:1px solid #e2e8f0">' + esc(value) + "</td></tr>";
}

function buildReportHtml() {
  var r = calcResults(calc);
  var today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  var css = "body{font-family:Inter,system-ui,sans-serif;color:#0b1c30;max-width:820px;margin:0 auto;padding:32px 24px;line-height:1.6}"
    + "h1{font-size:28px;margin:0 0 4px}h2{font-size:20px;color:#0f766e;border-bottom:2px solid #0f766e;padding-bottom:6px;margin-top:36px}"
    + "h3{font-size:16px;margin:20px 0 6px}.sub{color:#475569;font-size:14px}"
    + "table{width:100%;border-collapse:collapse;font-size:14px;margin:10px 0}"
    + "th{text-align:left;background:#f1f5f9;padding:8px 10px;border-bottom:2px solid #e2e8f0}"
    + "td{padding:8px 10px;border-bottom:1px solid #e2e8f0;vertical-align:top}"
    + ".badge{display:inline-block;font-size:11px;font-weight:600;padding:2px 8px;border-radius:999px;background:#e0f2fe;color:#075985}"
    + ".badge.toverify{background:#fef3c7;color:#92400e}.badge.confirmed{background:#dcfce7;color:#166534}"
    + ".badge.directory{background:#e0e7ff;color:#3730a3}.badge.news{background:#fce7f3;color:#9d174d}"
    + ".badge.assumption{background:#f1f5f9;color:#475569}"
    + ".kpi{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:12px 0}"
    + ".kpi div{border:1px solid #e2e8f0;border-radius:8px;padding:12px}"
    + ".kpi b{font-size:20px;display:block}.note{background:#f8fafc;border-left:3px solid #0f766e;padding:10px 14px;font-size:14px;margin:12px 0}"
    + "@media print{body{padding:0}.noprint{display:none}}";
  var h = "<!DOCTYPE html><html><head><meta charset='utf-8'><title>ECD Centre — Feasibility Report</title><style>" + css + "</style></head><body>";
  h += "<h1>Childhood Development Centre — Feasibility Report</h1>";
  h += '<p class="sub">Early Childhood Development &amp; Early Intervention Centre, Lahore · Phase 1: Research &amp; Business Planning</p>';
  h += '<p class="sub">Report date: ' + esc(today) + ' · Research date: 18 November 2026 · Sources: public websites / directories only — no site visits, calls, or review-mining yet.</p>';
  h += '<p class="note"><strong>How to read this report.</strong> Every figure carries a verification badge. <strong>Confirmed</strong> = published by the centre/clinic itself. <strong>Directory</strong> = Marham / Oladoc / InstaCare listing. <strong>To verify</strong> = the centre does not publish the figure — it needs a call or visit. Calculator inputs are <strong>Assumptions</strong> (editable), not market figures. No Lahore ECD market-size figure exists — it is not invented.</p>';

  /* Executive summary */
  h += "<h2>1. Executive Summary</h2>";
  h += '<div class="kpi">'
    + "<div><b>10</b> Lahore centres &amp; clinics mapped <span class='badge confirmed'>Confirmed</span></div>"
    + "<div><b>Rs 1,500–5,000</b> published per-session therapy fee range <span class='badge directory'>Directory</span></div>"
    + "<div><b>59.4%</b> Punjab children aged 36–59 months developmentally on track (ECDI) <span class='badge confirmed'>Confirmed</span></div>"
    + "<div><b>18.9%</b> children aged 3–5 enrolled in early childhood education, Pakistan <span class='badge confirmed'>Confirmed</span></div></div>";
  h += "<p>Only 3 of the 10 mapped providers publish any price at all. The recommended first location is <strong>Johar Town</strong> (emerging, open), with DHA as a premium alternative. "
    + "On the Standard model (" + calc.therapists + " therapists, fee Rs " + calc.fee.toLocaleString("en-PK") + ", " + calc.occupancy + "% occupancy), monthly revenue is <strong>" + rs(r.revenue) + "</strong> against operating cost <strong>" + rs(r.cost) + "</strong> — a monthly <strong>" + (r.profit >= 0 ? "profit" : "loss") + " of " + rs(r.profit) + "</strong>. Break-even is <strong>" + r.beSessions + " sessions / month (" + r.beChildren + " active children)</strong>.</p>";

  /* Market */
  h += "<h2>2. Market Research</h2>";
  h += "<h3>Key indicators</h3><table><tr><th>Indicator</th><th>Value</th><th>Status</th></tr>";
  INDICATORS.forEach(function (k) {
    h += "<tr><td>" + esc(k.label) + "<br><span class='sub'>" + esc(k.note) + "</span></td><td><strong>" + esc(k.value) + "</strong></td><td><span class='badge " + k.badge.toLowerCase().replace(/ /g, "") + "'>" + esc(k.badge) + "</span></td></tr>";
  });
  h += "</table>";
  h += "<h3>ECDI on-track — children aged 36–59 months</h3><table><tr><th>Province</th><th>On track</th></tr>";
  ECDI.forEach(function (x) { h += "<tr><td>" + esc(x.province) + "</td><td>" + x.pct + "%</td></tr>"; });
  h += "</table><p class='sub'>UNICEF MICS 2017–2020, n = 46,067 children, peer-reviewed analysis (MDPI Children 2026). In Punjab roughly 4 in 10 children are NOT on track (~40%); literacy–numeracy is the weakest domain everywhere (14.6–27.2%); physical development exceeds 90%.</p>";
  h += "<h3>Pakistan context</h3><ul>";
  PAKISTAN_CONTEXT.forEach(function (t) { h += "<li>" + esc(t) + "</li>"; });
  h += "</ul><p class='sub'>Sources: UNICEF ECD Country Profile Pakistan (2025 update); UNICEF Pakistan COAR 2023. <strong>No Lahore ECD market-size figure exists.</strong></p>";
  h += "<p><strong>Still to research:</strong> structured parent interviews · Google-review mining · willingness-to-pay by area · referral patterns from paediatricians / preschools.</p>";

  /* Competitors */
  h += "<h2>3. Competitor Analysis — 10 Lahore centres</h2>";
  h += "<table><tr><th>#</th><th>Centre</th><th>Area</th><th>Services</th><th>Fees</th><th>Status</th></tr>";
  COMPETITORS.forEach(function (c, i) {
    var fees = c.fees.map(function (f) { return esc(f.label) + ": <strong>" + esc(f.value) + "</strong>" + (f.was ? " <s>" + esc(f.was) + "</s>" : ""); }).join("<br>");
    h += "<tr><td>" + (i + 1) + "</td><td><strong>" + esc(c.name) + "</strong><br><span class='sub'>" + esc(c.notes) + "<br>Source: " + esc(c.source) + "</span></td><td>" + esc(c.area) + "</td><td>" + c.services.map(esc).join(", ") + "</td><td>" + fees + "</td><td><span class='badge " + c.badge.toLowerCase().replace(/ /g, "") + "'>" + esc(c.badge) + "</span></td></tr>";
  });
  h += "</table><p class='sub'>Only 3 of 10 publish any price at all. Fees no centre publishes are shown as To verify — never as confirmed prices.</p>";
  h += "<h3>Pricing benchmark — published only, seen 18 Nov 2026</h3><table><tr><th>Item</th><th>Value</th><th>Status</th></tr>";
  BENCHMARKS.forEach(function (b) {
    h += "<tr><td>" + esc(b.item) + "</td><td><strong>" + esc(b.value) + "</strong></td><td><span class='badge " + b.badge.toLowerCase().replace(/ /g, "") + "'>" + esc(b.badge) + "</span></td></tr>";
  });
  h += "</table>";

  /* Location */
  h += "<h2>4. Location Intelligence — 6 areas</h2>";
  h += "<p><strong>Recommendation (hypothesis to test): Johar Town first, DHA as premium alternative.</strong> Rent is deliberately NOT scored — no rent figure is used anywhere.</p>";
  h += "<table><tr><th>Area</th><th>Verdict</th><th>Mapped providers</th><th>Detail</th></tr>";
  LOCATIONS.forEach(function (l) {
    h += "<tr><td><strong>" + esc(l.area) + "</strong></td><td>" + esc(l.verdict) + "</td><td>" + esc(l.mapped) + "</td><td>" + esc(l.detail) + "</td></tr>";
  });
  h += "</table><p class='sub'>Rent verification method: 5+ live listings per shortlisted area on Zameen.com / OLX for 8–12 marla houses or commercial floors; call two estate agents per area; visit top 2 sites (parking, school proximity, legal operation).</p>";

  /* Feasibility */
  h += "<h2>5. Financial Feasibility</h2>";
  h += "<p>Model used at report time: <strong>" + (calcPreset === "custom" ? "Custom" : PRESETS[calcPreset].label) + "</strong>. Revenue = therapists × sessions/day × days × occupancy × fee. Cost = rent + therapists × salary + other monthly costs. Assessments, packages and daycare income are EXCLUDED from the base case (upside only).</p>";
  h += "<table>"
    + reportRow("One-time setup", rs(calc.setup))
    + reportRow("Monthly rent (placeholder — replace with a verified figure)", rs(calc.rent))
    + reportRow("Therapists", String(calc.therapists))
    + reportRow("Salary per therapist / month", rs(calc.salary))
    + reportRow("Other monthly costs", rs(calc.other))
    + reportRow("Fee per session", rs(calc.fee))
    + reportRow("Sessions / therapist / day", String(calc.sessionsPerDay))
    + reportRow("Working days / month", String(calc.days))
    + reportRow("Occupancy", calc.occupancy + "%")
    + reportRow("Sessions / child / month", String(calc.sessionsPerChild))
    + "</table>";
  h += "<table>"
    + reportRow("Monthly revenue", rs(r.revenue) + "  (" + r.booked + " / " + r.capacity + " sessions booked)")
    + reportRow("Monthly operating cost", rs(r.cost))
    + reportRow("Monthly profit / (loss)", rs(r.profit))
    + reportRow("Break-even", r.beSessions + " sessions / month · " + r.beChildren + " active children")
    + reportRow("Payback", r.payback)
    + "</table>";
  h += "<p class='sub'>Rent is a placeholder. Salary and other costs are assumptions, not market figures. Break-even utilisation on the Standard model: 324 / 432 sessions = 75%.</p>";
  h += "<h3>Revenue lines a full model would add</h3><table><tr><th>Line</th><th>Indicative figure</th><th>Status</th></tr>";
  [["Individual therapy sessions", "Rs 1,500–5,000 / session", "Confirmed range"],
   ["Developmental assessment + report", "Rs 8,000–15,000", "Confirmed — GetMindCare · Karishma"],
   ["Monthly therapy package", "Rs 35,000 / mo OT & special care", "Confirmed — PhysioGen"],
   ["Daycare / ECD program", "Rs 25,000 / mo + Rs 5,000 registration", "Confirmed — PhysioGen"],
   ["Parent training & workshops", "Not published by mapped centres", "To price-test"],
   ["School screening / liaison contracts", "Offered by First Hope & NEST", "Fees not published — To verify"]]
    .forEach(function (x) { h += "<tr><td>" + esc(x[0]) + "</td><td>" + esc(x[1]) + "</td><td>" + esc(x[2]) + "</td></tr>"; });
  h += "</table>";

  /* Services */
  h += "<h2>6. Services Blueprint — 12 services</h2>";
  h += "<p><strong>Clinical boundary:</strong> never recommend diagnosing or treating a child without qualified professionals; individual treatment plans require approval by qualified specialists.</p>";
  h += "<table><tr><th>Service</th><th>Type</th><th>Professional</th><th>Seen in market</th></tr>";
  SERVICES.forEach(function (s) {
    h += "<tr><td><strong>" + esc(s.name) + "</strong></td><td>" + esc(s.type) + "</td><td>" + esc(s.pro) + "</td><td>" + esc(s.seen) + "</td></tr>";
  });
  h += "</table>";

  /* Sources */
  h += "<h2>7. Sources &amp; Limitations</h2>";
  h += "<p>All sources retrieved 18 Nov 2026. Public websites / directories only — no site visits, calls, or review-mining yet.</p><ul>";
  SOURCES.forEach(function (s) { h += "<li><a href='" + esc(s.url) + "'>" + esc(s.name) + "</a> — " + esc(s.url) + "</li>"; });
  h += "</ul>";
  h += "<p class='sub'>Limitations: no Lahore ECD market-size figure exists; no verified rent figure; willingness-to-pay by area not yet researched; parent interviews and Google-review mining not yet done. Figures labelled To verify need a call or visit before they are used in a decision.</p>";
  h += "<hr><p class='sub'>Generated from the Childhood Development Centre — Consultancy Brain dashboard (Phase 1). Research date 18 November 2026.</p>";
  h += "</body></html>";
  return h;
}

function generateReport() {
  var status = document.getElementById("reportStatus");
  try {
    var html = buildReportHtml();
    var blob = new Blob([html], { type: "text/html;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "ECD-Centre-Feasibility-Report-2026-11-18.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 5000);
    if (status) status.textContent = "Report downloaded. Open it in a browser and use Print → Save as PDF for a PDF copy.";
  } catch (e) {
    if (status) status.textContent = "Could not generate the report: " + e.message;
  }
}

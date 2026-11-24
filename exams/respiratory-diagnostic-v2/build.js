// Builds the Student Copy and Faculty Copy DOCX from keyed.json
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, AlignmentType, WidthType,
  BorderStyle, ShadingType, Header, Footer, PageNumber, PageBreak, HeadingLevel, TabStopType,
} = require("docx");

const data = JSON.parse(fs.readFileSync(path.join(__dirname, "keyed.json"), "utf8"));
const { situations, items } = data;
const LET = ["A", "B", "C", "D"];
const BRAND = "1F4E79";
const FONT = "Arial";
const TITLE = "Respiratory System — Diagnostic Examination (Version 2)";

// ---------- helpers ----------
const t = (text, o = {}) => new TextRun({ text, font: FONT, ...o });
const p = (children, o = {}) => new Paragraph({ children: Array.isArray(children) ? children : [t(children)], spacing: { after: 120 }, ...o });
const h1 = (text) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [t(text)] });
const h2 = (text) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [t(text)] });
const pb = () => new Paragraph({ children: [new PageBreak()] });
const rule = () => new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: BRAND, space: 1 } }, spacing: { after: 160 } });

const thin = { style: BorderStyle.SINGLE, size: 4, color: "A6A6A6" };
const borders = { top: thin, bottom: thin, left: thin, right: thin };
function cell(text, width, o = {}) {
  const runs = Array.isArray(text) ? text : [t(String(text), { bold: o.bold, color: o.color, size: o.size })];
  return new TableCell({
    borders, width: { size: width, type: WidthType.DXA },
    shading: o.fill ? { fill: o.fill, type: ShadingType.CLEAR, color: "auto" } : undefined,
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    children: [new Paragraph({ alignment: o.align || AlignmentType.LEFT, children: runs })],
  });
}
function table(rows, widths, headerFill = true) {
  return new Table({
    width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA },
    columnWidths: widths,
    rows: rows.map((r, ri) => new TableRow({
      cantSplit: true,
      tableHeader: ri === 0 && headerFill,
      children: r.map((c, ci) => cell(c, widths[ci], ri === 0 && headerFill ? { bold: true, fill: "D9E2F3", align: AlignmentType.CENTER } : { align: ci === 0 ? AlignmentType.LEFT : AlignmentType.CENTER })),
    })),
  });
}

function titleBlock(copyLabel) {
  return [
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 }, children: [t("NursesPH Review Center", { bold: true, size: 32, color: BRAND })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 }, children: [t("Philippine Nurse Licensure Examination (PNLE) Review", { size: 20 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 }, children: [t(TITLE.toUpperCase(), { bold: true, size: 26 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: [t("Nursing Practice III • Care of Clients with Problems in Oxygenation, Infectious/Immunologic Response, and Cellular Aberrations • PQF Level 6", { size: 18, italics: true })] }),
    new Paragraph({
      alignment: AlignmentType.CENTER, spacing: { after: 160 },
      shading: { fill: copyLabel === "FACULTY COPY" ? "FCE4D6" : "E2EFDA", type: ShadingType.CLEAR, color: "auto" },
      children: [t(copyLabel, { bold: true, size: 24, color: copyLabel === "FACULTY COPY" ? "C00000" : "375623" })],
    }),
  ];
}

function studentInfo() {
  return [
    new Paragraph({ spacing: { after: 120 }, tabStops: [{ type: TabStopType.LEFT, position: 6200 }], children: [t("Name: ______________________________________"), t("\tStudent ID: _______________")] }),
    new Paragraph({ spacing: { after: 200 }, tabStops: [{ type: TabStopType.LEFT, position: 6200 }], children: [t("Date: ____________________"), t("\tScore: ________ / 50")] }),
  ];
}

function directions() {
  return [
    h2("Directions"),
    p("Read each situation carefully. Each item has four options (A–D). Choose the ONE best answer and shade the corresponding letter on your answer sheet. There is only one correct answer per item. You have 60 minutes to complete the examination."),
  ];
}

function examBody() {
  const out = [];
  for (const s of situations) {
    out.push(new Paragraph({
      keepNext: true, spacing: { before: 240, after: 80 },
      shading: { fill: "EAF1FB", type: ShadingType.CLEAR, color: "auto" },
      children: [t(`Situation ${s.no}`, { bold: true, color: BRAND })],
    }));
    out.push(new Paragraph({ keepNext: true, spacing: { after: 140 }, children: [t(s.text, { italics: true })] }));
    for (const it of items.filter((x) => x.sit === s.no)) {
      out.push(new Paragraph({ keepNext: true, keepLines: true, spacing: { before: 80, after: 60 }, children: [t(`${it.no}. `, { bold: true }), t(it.stem)] }));
      it.opts.forEach((o, i) => out.push(new Paragraph({
        keepNext: i < 3, keepLines: true, indent: { left: 720, hanging: 360 }, spacing: { after: i === 3 ? 120 : 20 },
        children: [t(`${LET[i]}.  `), t(o)],
      })));
    }
  }
  out.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 300 }, children: [t("— END OF EXAMINATION —", { bold: true })] }));
  return out;
}

function answerSheet() {
  // 5 columns x 10 rows; each cell "n.  (A) (B) (C) (D)"
  const W = 1872; const widths = [W, W, W, W, W];
  const rows = [];
  for (let r = 0; r < 10; r++) {
    rows.push(new TableRow({
      cantSplit: true,
      children: widths.map((w, c) => {
        const n = c * 10 + r + 1;
        return cell([t(`${n}.`, { bold: true, size: 18 }), t("  Ⓐ Ⓑ Ⓒ Ⓓ", { size: 20 })], w, { align: AlignmentType.LEFT });
      }),
    }));
  }
  return [
    pb(),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 }, children: [t("ANSWER SHEET", { bold: true, size: 28, color: BRAND })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [t(TITLE, { size: 20 })] }),
    ...studentInfo(),
    p("Shade the circle of your chosen answer completely. Erase cleanly if you change an answer."),
    new Table({ width: { size: W * 5, type: WidthType.DXA }, columnWidths: widths, rows }),
  ];
}

function headerFooter(copyLabel) {
  const color = copyLabel === "FACULTY COPY" ? "C00000" : "595959";
  return {
    headers: {
      default: new Header({ children: [new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [t(`NursesPH • Respiratory Diagnostic Exam v2 • `, { size: 16, color: "595959" }), t(copyLabel + (copyLabel === "FACULTY COPY" ? " — CONFIDENTIAL" : ""), { size: 16, bold: true, color })],
      })] }),
    },
    footers: {
      default: new Footer({ children: [new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [t("Page ", { size: 16 }), new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 16 }), t(" of ", { size: 16 }), new TextRun({ children: [PageNumber.TOTAL_PAGES], font: FONT, size: 16 })],
      })] }),
    },
  };
}

const styles = {
  default: { document: { run: { font: FONT, size: 22 } } },
  paragraphStyles: [
    { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { font: FONT, size: 30, bold: true, color: BRAND }, paragraph: { spacing: { before: 240, after: 160 }, keepNext: true, outlineLevel: 0 } },
    { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { font: FONT, size: 24, bold: true, color: BRAND }, paragraph: { spacing: { before: 200, after: 100 }, keepNext: true, outlineLevel: 1 } },
  ],
};
const pageProps = { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } } };

// ---------- Faculty-only sections ----------
function bloomCounts() {
  const order = ["Remembering", "Understanding", "Applying", "Analyzing"];
  const target = { Remembering: 10, Understanding: 16, Applying: 40, Analyzing: 34 };
  const c = {}; items.forEach((i) => (c[i.bloom] = (c[i.bloom] || 0) + 1));
  return order.map((b) => ({ b, n: c[b] || 0, pct: Math.round(((c[b] || 0) / items.length) * 100), target: target[b], list: items.filter((i) => i.bloom === b).map((i) => i.no).join(", ") }));
}

function facultyOverview() {
  const bc = bloomCounts();
  return [
    h1("Faculty Notes"),
    p([t("Coverage: ", { bold: true }), t("Respiratory assessment and physiology, asthma, COPD and ABG interpretation, oxygen therapy, pneumothorax and chest tube management, postoperative pulmonary care, pneumonia and VAP prevention, tuberculosis (DOH NTP), lung cancer and oncologic emergencies, pulmonary embolism and anticoagulation, idiopathic pulmonary fibrosis, and pediatric airway disorders.")]),
    p([t("Format: ", { bold: true }), t("50 items in 10 case-based situations (5 items each); 60 minutes; one best answer per item.")]),
    p([t("Contents of this copy: ", { bold: true }), t("Faculty notes and blueprint → the examination exactly as students receive it → answer key → rationales for every option → Bloom's distribution → what changed from Version 1 → references and verification note.")]),
    h2("Blueprint (Bloom's Taxonomy)"),
    table([["Level", "Items", "Actual %", "Target %"], ...bc.map((r) => [r.b, String(r.n), `${r.pct}%`, `${r.target}%`]), ["Total", String(items.length), "100%", "100%"]], [3360, 1800, 2000, 2200]),
    p(""),
    p([t("Handling: ", { bold: true }), t("This copy contains the answer key and rationales. Keep it with faculty; give students only the Student Copy.")], { shading: { fill: "FCE4D6", type: ShadingType.CLEAR, color: "auto" } }),
    pb(),
  ];
}

function answerKey() {
  const rows = [["Items", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]];
  for (let r = 0; r < 5; r++) {
    rows.push([`${r * 10 + 1}–${r * 10 + 10}`, ...items.slice(r * 10, r * 10 + 10).map((i) => i.key)]);
  }
  const c = { A: 0, B: 0, C: 0, D: 0 }; items.forEach((i) => c[i.key]++);
  return [
    pb(),
    h1("Answer Key"),
    table(rows, [1560, ...Array(10).fill(780)]),
    p(""),
    p([t("Distribution: ", { bold: true }), t(`A = ${c.A}, B = ${c.B}, C = ${c.C}, D = ${c.D}.`)]),
    p([t("Audit: ", { bold: true }), t("No two consecutive items share the same letter; no letter appears more than twice within a situation; no ABAB alternation or repeated three-letter runs. Every item passed the stem-to-key word-echo check and the length-parity check (no key longer than its longest distractor by more than 3 words; the key is the uniquely longest option in only 8 of 50 items, 16%).")]),
  ];
}

function rationales() {
  const out = [pb(), h1("Rationales")];
  for (const s of situations) {
    out.push(h2(`Situation ${s.no}`));
    for (const it of items.filter((x) => x.sit === s.no)) {
      const k = LET.indexOf(it.key);
      out.push(new Paragraph({ keepNext: true, spacing: { before: 160, after: 60 }, border: { top: { style: BorderStyle.SINGLE, size: 4, color: "BFBFBF", space: 4 } },
        children: [t(`${it.no}. `, { bold: true }), t(`Answer: ${it.key}. ${it.opts[k]}`, { bold: true, color: "375623" }), t(`   |   Bloom's: ${it.bloom}`, { italics: true, color: "595959" })] }));
      out.push(new Paragraph({ keepNext: true, spacing: { after: 60 }, children: [t("Why it is correct: ", { bold: true }), t(it.why)] }));
      LET.forEach((L, i) => {
        if (i === k) return;
        out.push(new Paragraph({ indent: { left: 360 }, spacing: { after: 40 }, children: [t(`Why not ${L} (${it.opts[i]}): `, { bold: true, color: "7F7F7F" }), t(it.whyNot[L])] }));
      });
    }
  }
  return out;
}

function bloomSection() {
  const bc = bloomCounts();
  return [
    pb(),
    h1("Bloom's Taxonomy Distribution"),
    table([["Level", "Count", "%", "Target %", "Items"], ...bc.map((r) => [r.b, String(r.n), `${r.pct}%`, `${r.target}%`, r.list])], [1800, 900, 900, 1100, 4660]),
    p(""),
    p("Levels are mixed within each situation so that difficulty does not follow a predictable order."),
  ];
}

function revisionNotes() {
  const bullets = [
    "Situation headings no longer name the topic. Version 1 headings such as \"Situation 1 — Asthma\" and \"Situation 8 — Pulmonary Embolism\" told students the diagnosis before they read the case.",
    "The first item of each situation no longer repeats the case introduction word for word.",
    "Every situation is now one patient followed through their own workup. The Version 1 \"review session\" situation (lecture-style physiology questions) and the items about other, unnamed clients inside a case were replaced.",
    "The weighting moved from mostly recall to the Applying/Analyzing blueprint (5 Remembering, 8 Understanding, 20 Applying, 17 Analyzing). New items require interpreting data: ABG values, GOLD grade from spirometry, peak-flow zone from a reading and personal best, Mantoux cut-off by risk group, chest-tube tidaling and bubbling, and SIADH laboratory findings.",
    "Stem giveaways were removed: the \"RIPE\" mnemonic in the TB drug item, \"the nurse suspects epiglottitis\" in the item asking for the priority action, \"this classic triad\" in the PE item, \"strains the right side of the heart\" in the cor pulmonale item, and \"He has no fever\" paired with the key \"blunted or absent fever\".",
    "Longest-option and wording cues were removed: Version 1 keys such as \"prevention through early mobility\" and \"vigorous pulmonary toilet with deep breathing\" were the only detailed options next to short or extreme distractors.",
    "Implausible distractors were replaced with real misconceptions (e.g., Version 1 options \"ibuprofen, rifampin, pyrazinamide, ethambutol\", \"a sweat chloride test\" for PE, \"a high-fiber daily diet\" as a PE risk factor, and \"start oral feeding to calm the child\" for epiglottitis).",
    "Two Version 1 keys were open to challenge and were not reused: item 45 (restrictive disorders \"decrease the volume of airflow\"; they reduce lung volume and compliance, not airflow) and item 49 (\"notify the provider immediately\" for retractions, when reassessment and supportive care can also be defended). Version 2 replaces them with items that have one defensible answer.",
    "Philippine context was strengthened: DOH National TB Program diagnostics (Xpert MTB/RIF), TB-DOTS and treatment partners, malunggay in warfarin teaching, LPG stove safety with home oxygen, and Hib protection through the national immunization program.",
    "A new answer key was generated after the items were written (13/13/12/12) and audited for adjacency, per-situation balance and repeating patterns.",
  ];
  return [
    pb(),
    h1("What Changed from Version 1"),
    ...bullets.map((b) => new Paragraph({ numbering: { reference: "bul", level: 0 }, spacing: { after: 80 }, children: [t(b)] })),
  ];
}

function references() {
  const refs = [
    "Hinkle, J. L., Cheever, K. H., & Overbaugh, K. J. (2022). Brunner & Suddarth's textbook of medical-surgical nursing (15th ed.). Wolters Kluwer.",
    "Harding, M. M., Kwong, J., Hagler, D., & Reinisch, C. (2023). Lewis's medical-surgical nursing: Assessment and management of clinical problems (12th ed.). Elsevier.",
    "Berman, A., Snyder, S., & Frandsen, G. (2021). Kozier & Erb's fundamentals of nursing (11th ed.). Pearson.",
    "Hockenberry, M. J., Duffy, E. A., & Gibbs, K. D. (2022). Wong's essentials of pediatric nursing (11th ed.). Elsevier.",
    "Global Initiative for Chronic Obstructive Lung Disease. (2025). Global strategy for the prevention, diagnosis and management of COPD: 2025 report.",
    "Global Initiative for Asthma. (2024). Global strategy for asthma management and prevention.",
    "Coates, A. L., et al. (2017). ERS technical standard on bronchial challenge testing: General considerations and performance of methacholine challenge tests. European Respiratory Journal, 49(5), 1601526.",
    "Department of Health – National Tuberculosis Control Program. (2020). Manual of procedures (6th ed.). DOH, Philippines.",
    "Centers for Disease Control and Prevention. Clinical testing guidance for tuberculosis: Tuberculin skin test.",
    "Ralston, S. L., et al. (2014). Clinical practice guideline: The diagnosis, management, and prevention of bronchiolitis. Pediatrics, 134(5), e1474–e1502.",
  ];
  const verify = [
    "Peak-flow zones (green ≥80%, yellow 50–79%, red <50% of personal best) — item 4.",
    "GOLD spirometric grades (FEV1 ≥80 / 50–79 / 30–49 / <30% predicted) — item 8.",
    "Methacholine challenge criterion (≥20% fall in FEV1) and salbutamol withholding time (about 6 hours) — items 2–3.",
    "Mantoux cut-offs by risk group (≥5 mm for HIV and close contacts) and 48–72-hour reading window — item 28.",
    "DOH NTP initial diagnostic test for presumptive TB (Xpert MTB/RIF or other WHO-recommended rapid diagnostic test) — item 27; confirm against the current NTP Manual of Procedures and any DOH memoranda issued after 2020.",
    "Venturi FiO2 settings and nasal-cannula FiO2 estimates; SpO2 target of 88–92% for CO2 retainers — item 7.",
    "Head-of-bed elevation for VAP prevention (30–45°) and circuit-change practice — item 25.",
    "Oxygen safety distance from open flames (about 3 m / 10 ft) — item 44.",
    "aPTT as the titration test for unfractionated heparin, per institutional protocol — item 38.",
  ];
  return [
    pb(),
    h1("References"),
    ...refs.map((r) => new Paragraph({ indent: { left: 720, hanging: 720 }, spacing: { after: 100 }, children: [t(r)] })),
    h2("Verification Note"),
    p("Textbook reference values must be checked against current Philippine DOH and PRC Board of Nursing standards before this examination is deployed. Values that may have changed or that vary by institution:"),
    ...verify.map((v) => new Paragraph({ numbering: { reference: "bul", level: 0 }, spacing: { after: 60 }, children: [t(v)] })),
  ];
}

const numbering = { config: [{ reference: "bul", levels: [{ level: 0, format: "bullet", text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }] };

function makeDoc(children, label) {
  return new Document({
    creator: "NursesPH Review Center",
    title: `${TITLE} — ${label}`,
    styles, numbering,
    sections: [{ properties: pageProps, ...headerFooter(label), children }],
  });
}

const student = makeDoc([...titleBlock("STUDENT COPY"), ...studentInfo(), ...directions(), rule(), ...examBody(), ...answerSheet()], "STUDENT COPY");
const faculty = makeDoc([
  ...titleBlock("FACULTY COPY"), ...facultyOverview(),
  h1("Examination (as given to students)"), ...directions(), rule(), ...examBody(),
  ...answerKey(), ...rationales(), ...bloomSection(), ...revisionNotes(), ...references(),
], "FACULTY COPY");

(async () => {
  fs.writeFileSync(path.join(__dirname, "Respiratory-Diagnostic-Exam-v2-STUDENT-COPY.docx"), await Packer.toBuffer(student));
  fs.writeFileSync(path.join(__dirname, "Respiratory-Diagnostic-Exam-v2-FACULTY-COPY.docx"), await Packer.toBuffer(faculty));
  console.log("built");
})();

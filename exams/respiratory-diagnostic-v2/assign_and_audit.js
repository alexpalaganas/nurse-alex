// Assigns a balanced A–D key (constructive backtracking) and runs the anti-giveaway audit gates.
// Output: keyed.json (items with opts[], key letter, per-letter rationale) + audit report on stdout.
const fs = require("fs");
const path = require("path");
const { situations, items } = require("./items.js");

const LET = ["A", "B", "C", "D"];
const N = items.length;
const tgt = { A: 13, B: 13, C: 12, D: 12 };

let seed = 20261124;
const rng = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
const cnt = (a) => { const c = { A: 0, B: 0, C: 0, D: 0 }; a.forEach((x) => x && c[x]++); return c; };

// Situation boundaries come from item.sit (5 per situation here)
const seq = new Array(N).fill(null);
function solve(pos, rem) {
  if (pos === N) return true;
  const s = items[pos].sit;
  const inSit = seq.slice(0, pos).filter((_, i) => items[i].sit === s);
  const bc = cnt(inSit);
  const cands = LET.filter((L) => rem[L] > 0 && L !== seq[pos - 1] && bc[L] < 2 &&
    !(pos >= 3 && L === seq[pos - 2] && seq[pos - 1] === seq[pos - 3]) && // no ABAB alternation
    !(pos >= 2 && seq.slice(Math.max(0, pos - 10), pos).join("").includes(seq[pos - 2] + seq[pos - 1] + L))); // no repeated 3-letter run nearby
  for (let i = cands.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [cands[i], cands[j]] = [cands[j], cands[i]]; }
  for (const L of cands) { seq[pos] = L; rem[L]--; if (solve(pos + 1, rem)) return true; rem[L]++; seq[pos] = null; }
  return false;
}
if (!solve(0, { ...tgt })) throw new Error("No key assignment found");

// Build options: key goes to seq[idx]; distractors fill remaining slots in a shuffled order.
const keyed = items.map((it, idx) => {
  const keyPos = LET.indexOf(seq[idx]);
  const ds = it.d.slice();
  for (let i = ds.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [ds[i], ds[j]] = [ds[j], ds[i]]; }
  const opts = new Array(4); const whyNot = {};
  opts[keyPos] = it.k;
  let di = 0;
  for (let p = 0; p < 4; p++) if (p !== keyPos) { opts[p] = ds[di][0]; whyNot[LET[p]] = ds[di][1]; di++; }
  if (it.ordered) { // keep scale options in natural order when that still puts the key at its assigned letter
    const sorted = opts.slice().sort((x, y) => x.localeCompare(y, undefined, { numeric: true }));
    if (sorted.indexOf(it.k) === keyPos) {
      const wn = {}; sorted.forEach((o, i) => { if (i !== keyPos) wn[LET[i]] = it.d.find((d) => d[0] === o)[1]; });
      return { no: idx + 1, sit: it.sit, bloom: it.bloom, stem: it.stem, opts: sorted, key: seq[idx], why: it.why, whyNot: wn };
    }
  }
  return { no: idx + 1, sit: it.sit, bloom: it.bloom, stem: it.stem, opts, key: seq[idx], why: it.why, whyNot };
});

// ---------------- Audit gates ----------------
let fail = 0;
const report = [];
const log = (s) => { report.push(s); console.log(s); };

// 1. Distribution, adjacency, per-situation max
const c = cnt(keyed.map((k) => k.key));
log(`Key distribution: A=${c.A} B=${c.B} C=${c.C} D=${c.D}`);
let adj = 0; for (let i = 1; i < N; i++) if (keyed[i].key === keyed[i - 1].key) adj++;
log(`Adjacent same-letter keys: ${adj}`); if (adj) fail++;
let alt = 0; for (let i = 3; i < N; i++) if (keyed[i].key === keyed[i - 2].key && keyed[i - 1].key === keyed[i - 3].key) alt++;
log(`ABAB alternation runs: ${alt}`); if (alt) fail++;
for (const s of situations) {
  const sc = cnt(keyed.filter((k) => k.sit === s.no).map((k) => k.key));
  const mx = Math.max(...Object.values(sc));
  if (mx > 2) { log(`FAIL situation ${s.no} has ${mx} of one letter`); fail++; }
}
if (Object.values(c).some((v) => v === 0)) { log("FAIL a letter has zero keys"); fail++; }

// 2. Stem→key word echo
const stops = new Set(["that","this","which","nurse","client","results","specimen","before","after","during","procedure","testing","collection","blood","study","action","because","question","obtain","using","value","their","there","about","should","would","these","those","while","where","being","shows","from","with","into","most"]);
const words = (s) => [...new Set(s.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 4 && !stops.has(w)))];
keyed.forEach((it) => {
  const k = LET.indexOf(it.key), correct = it.opts[k].toLowerCase();
  const dist = it.opts.filter((_, i) => i !== k).map((o) => o.toLowerCase()).join(" ");
  const stemAll = (situations.find((s) => s.no === it.sit).text + " " + it.stem);
  const hits = words(stemAll).filter((w) => correct.includes(w) && !dist.includes(w));
  if (hits.length) log(`ECHO? Q${it.no}: ${hits.join(", ")}  (key: ${it.opts[k]})`);
});

// 3. Length parity
const wc = (s) => s.trim().split(/\s+/).length;
let bad = 0, longest = 0;
keyed.forEach((it) => {
  const k = LET.indexOf(it.key), w = it.opts.map(wc), d = w.filter((_, i) => i !== k);
  if (w[k] - Math.max(...d) > 3) { bad++; log(`LENGTH FAIL Q${it.no}: key ${w[k]} vs ${Math.max(...d)}`); }
  if (w[k] === Math.max(...w) && w.filter((x) => x === w[k]).length === 1) longest++;
});
log(`Length: >3-word gaps=${bad}; key uniquely longest in ${longest}/${N} (${Math.round((100 * longest) / N)}%)`);
if (bad || longest / N > 0.25) fail++;

// 4. Duplicate leading terms / options unique
keyed.forEach((it) => {
  if (new Set(it.opts.map((o) => o.toLowerCase())).size !== 4) { log(`FAIL Q${it.no} duplicate options`); fail++; }
});

// 5. Bloom's
const bl = {}; keyed.forEach((k) => (bl[k.bloom] = (bl[k.bloom] || 0) + 1));
log(`Bloom's: ${JSON.stringify(bl)}`);

log(`Key sequence: ${keyed.map((k) => k.key).join("")}`);
log(fail ? `AUDIT: ${fail} gate(s) failed` : "AUDIT: all gates passed");

fs.writeFileSync(path.join(__dirname, "keyed.json"), JSON.stringify({ situations, items: keyed, audit: report }, null, 1));
process.exit(fail ? 1 : 0);

// Builds the feb2027 Exam Pad import file (exampad-import-v1) from keyed.json.
// Output: RESP-DIAG1.json — drop into /home/ozlbewij/exampad-private/imports/ on the feb2027 server.
const fs = require('fs');
const path = require('path');
const k = require('./keyed.json');
const L = ['A', 'B', 'C', 'D'];
const sit = Object.fromEntries(k.situations.map(s => [s.no, s.text]));
const SUBJECT = 'Medical-Surgical Nursing';

const items = k.items.map((it, i) => {
  if (it.no !== i + 1) throw new Error('numbering break at ' + (i + 1));
  if (it.opts.length !== 4) throw new Error('item ' + it.no + ' needs 4 options');
  const why = L.map(l => (l === it.key ? it.why : it.whyNot[l]) || '');
  if (why.some(w => !w.trim())) throw new Error('item ' + it.no + ' missing a why/why-not');
  const rationale = ['Why it is correct: ' + it.why]
    .concat(L.filter(l => l !== it.key).map(l => 'Why not ' + l + ': ' + it.whyNot[l]))
    .join('\n');
  return {
    n: it.no,
    situation_label: 'Situation ' + it.sit,
    scenario: sit[it.sit],
    stem: it.stem,
    choices: it.opts,
    correct: it.key,
    subject: SUBJECT,
    bloom: it.bloom,
    rationale,
    why,
  };
});

const out = {
  format: 'exampad-import-v1',
  exam_code: 'RESP-DIAG1',
  title: 'Respiratory System',
  subtitle: '',
  subject_name: SUBJECT,
  time_limit_seconds: 3600,
  review_style: 'rightwrong',
  source: 'Respiratory_Diagnostic_Exam_v2_FACULTY_COPY.pdf',
  items,
};
fs.writeFileSync(path.join(__dirname, 'RESP-DIAG1.json'), JSON.stringify(out, null, 1));
const count = (f) => items.reduce((m, x) => (m[f(x)] = (m[f(x)] || 0) + 1, m), {});
console.log('items', items.length, 'keys', count(x => x.correct), 'bloom', count(x => x.bloom));

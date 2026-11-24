// NursesPH — Respiratory System Diagnostic Examination, Version 2 (revised)
// Each item is written with the KEY first (k) and distractors (d) with their why-not.
// Positions A–D are assigned later by build.js (balanced, backtracking shuffle).

const situations = [
  {
    no: 1,
    text: "Rodel Santos, 46, a tricycle driver from Valenzuela City with a history of asthma, is brought to the emergency department of a tertiary hospital with chest tightness, cough, and shortness of breath that began after he cleaned a dusty bodega. Nurse Bea is assigned to him.",
  },
  {
    no: 2,
    text: "Lola Corazon \"Cora\" Villanueva, 69, a retired fish vendor from Navotas, smoked a pack a day for 40 years and cooked over a wood fire for decades. She is admitted to the medical ward for increasing breathlessness and thick yellow sputum. Nurse Carlo is assigned to her.",
  },
  {
    no: 3,
    text: "Paolo Mendoza, 20, a tall, thin architecture student, is rushed to the emergency department of a Manila hospital after a sudden, sharp right-sided chest pain and breathlessness while he was seated in class. There is no history of trauma. Nurse Diane assists in his care.",
  },
  {
    no: 4,
    text: "Ernesto Dela Cruz, 55, a construction foreman from Pasig City with a 30 pack-year smoking history, is scheduled for an elective open cholecystectomy. Nurse Patricia prepares him for surgery, including his preoperative pulmonary function test, and follows him after the operation.",
  },
  {
    no: 5,
    text: "Lolo Teodoro Bautista, 81, from Tondo, Manila, is brought to the emergency department by his granddaughter for two days of new confusion, poor appetite, and weakness. He has a mild cough, a respiratory rate of 26 breaths per minute, and a temperature of 37.3 °C. Nurse Ella coordinates his care.",
  },
  {
    no: 6,
    text: "Jun-Jun Ramos, 29, a call-center agent from Quezon City, has had a productive cough for three weeks with afternoon fevers, night sweats, and weight loss. He is admitted to a city hospital after coughing up blood-streaked sputum and is later referred to the TB-DOTS facility in his barangay. Nurse Faye handles his care and teaching.",
  },
  {
    no: 7,
    text: "Benjamin Tan, 66, a retired businessman from Cebu City with a 45 pack-year smoking history, is admitted to a private hospital for blood-streaked sputum, weight loss, and a voice that has become hoarse over the past month. A CT scan shows a central lung mass. Nurse Grace is assigned to him.",
  },
  {
    no: 8,
    text: "Lourdes Cruz, 62, a retired public school teacher from Davao City, is on her second postoperative day after a total hip replacement. She suddenly complains of sharp chest pain on inspiration and difficulty breathing, and coughs up blood-streaked sputum. Her RR is 30, HR 118, and SpO2 87%, and she appears anxious. Nurse Hannah responds.",
  },
  {
    no: 9,
    text: "Felipe Reyes, 64, a retired high school principal from Iloilo City, is seen at a pulmonology clinic for a year of slowly worsening breathlessness on exertion and a dry cough. High-resolution CT confirms idiopathic pulmonary fibrosis. Nurse Ian provides his education and care planning.",
  },
  {
    no: 10,
    text: "Ana Lim, 3, from Tarlac City, is brought to the emergency department of a provincial hospital at midnight. Within a few hours she developed a fever of 39.8 °C, drooling, and a muffled voice, and she now sits leaning forward with her chin thrust out. Her immunization record is incomplete. Nurse Joy is on duty in the pediatric unit.",
  },
];

const items = [
  // ---------------- Situation 1 ----------------
  {
    sit: 1, bloom: "Analyzing",
    stem: "Thirty minutes after arrival, Rodel is still sitting upright and using his neck muscles to breathe. The loud wheezing heard earlier can no longer be heard, and breath sounds are now faint over both lungs. The nurse interprets this change as:",
    k: "worsening airflow obstruction needing urgent intervention",
    why: "A 'silent chest' in a patient who is still working hard to breathe means so little air is moving that wheezes can no longer be produced. It signals severe obstruction and impending respiratory failure, so the nurse escalates care immediately.",
    d: [
      ["resolving bronchospasm from his first nebulization", "True improvement brings less work of breathing and better air entry, not faint breath sounds with continued accessory-muscle use."],
      ["fluid collecting in both pleural spaces", "Pleural effusion develops gradually, gives dullness on percussion, and is not the explanation for a sudden loss of wheezing during an asthma attack."],
      ["expected fatigue after a long coughing spell", "Calling this simple fatigue delays care. Fatigue of the breathing muscles here is itself a danger sign of respiratory failure."],
    ],
  },
  {
    sit: 1, bloom: "Remembering",
    stem: "Six weeks later, Rodel's clinic spirometry is inconclusive, and a methacholine challenge is scheduled. Which result would confirm airway hyperresponsiveness?",
    k: "FEV1 falls by 20% or more from baseline",
    why: "Methacholine is a bronchoconstrictor. A positive challenge is a fall in FEV1 of at least 20% from baseline at or below the threshold dose or concentration (PD20/PC20).",
    d: [
      ["FEV1 rises by 12% or more from baseline", "This is a positive bronchodilator reversibility response (with at least 200 mL), measured after a bronchodilator, not after methacholine."],
      ["FVC falls by 10% or more from baseline", "The challenge is judged on FEV1, not FVC, and the cut-off is a 20% fall."],
      ["Peak flow rises by 20% or more from baseline", "Methacholine narrows the airways, so flow falls rather than rises, and peak flow is not the diagnostic criterion."],
    ],
  },
  {
    sit: 1, bloom: "Applying",
    stem: "In preparing Rodel for this test, which instruction should the nurse give?",
    k: "Withhold your salbutamol inhaler for several hours before the test.",
    why: "Short-acting bronchodilators blunt the airway response and can give a false-negative result, so they are withheld beforehand (about 6 hours for salbutamol per the ATS/ERS standard). A rescue bronchodilator is still kept ready at the bedside during testing.",
    d: [
      ["Take two extra puffs of salbutamol an hour before the test.", "Pre-dosing with a bronchodilator would mask hyperresponsiveness and invalidate the result."],
      ["Avoid all food and fluids starting at midnight before the test.", "Bronchoprovocation testing does not require fasting."],
      ["Double your inhaled steroid dose on the morning of the test.", "Controller doses are not increased for the test; extra medicine can suppress the response."],
    ],
  },
  {
    sit: 1, bloom: "Applying",
    stem: "Rodel is taught home peak flow monitoring. His personal best is 500 L/min. One evening his reading is 330 L/min and he feels slightly tight in the chest. Based on the zone system he was taught, Rodel should:",
    k: "use his quick-relief inhaler and follow his written plan",
    why: "330 ÷ 500 = 66% of personal best, which is the yellow zone (50–79%). The yellow zone calls for the reliever inhaler and the steps in the written asthma action plan, with follow-up if readings do not improve.",
    d: [
      ["take only his usual controller and recheck the next day", "This under-treats a yellow-zone reading; waiting a day allows the attack to progress."],
      ["go straight to the emergency room without taking medicine", "Emergency care is the red-zone response (below 50%), and even then the reliever is used on the way."],
      ["stop his controller until his readings return to normal", "Controllers treat the underlying inflammation and must not be stopped during worsening symptoms."],
    ],
  },
  {
    sit: 1, bloom: "Analyzing",
    stem: "Before discharge, which statement by Rodel shows a need for further teaching?",
    k: "\"I can stop my steroid inhaler once I feel well for a week.\"",
    why: "Inhaled corticosteroids are long-term controllers. Stopping them when symptoms ease lets airway inflammation return and raises the risk of another severe attack.",
    d: [
      ["\"I will rinse my mouth with water after using my steroid inhaler.\"", "Correct: rinsing prevents oral candidiasis and hoarseness."],
      ["\"I will wear a mask and use a damp cloth when I clean.\"", "Correct: this limits exposure to dust, his trigger."],
      ["\"I will keep my reliever inhaler with me while I am driving.\"", "Correct: the reliever should always be within reach."],
    ],
  },

  // ---------------- Situation 2 ----------------
  {
    sit: 2, bloom: "Analyzing",
    stem: "Cora's arterial blood gas on room air shows pH 7.33, PaCO2 56 mmHg, HCO3 31 mEq/L, and PaO2 57 mmHg. The nurse interprets this as:",
    k: "partially compensated respiratory acidosis",
    why: "The pH is acidotic and the PaCO2 is high, so the primary problem is respiratory acidosis. The HCO3 is already elevated (renal compensation), but the pH is still outside 7.35–7.45, so compensation is only partial.",
    d: [
      ["fully compensated respiratory acidosis", "Full compensation would bring the pH back within 7.35–7.45; 7.33 is still acidotic."],
      ["uncompensated respiratory acidosis", "An elevated HCO3 of 31 shows the kidneys have already begun to compensate."],
      ["partially compensated metabolic alkalosis", "The pH is acidotic, not alkalotic, and the high PaCO2 matches the pH change, so the primary disorder is respiratory."],
    ],
  },
  {
    sit: 2, bloom: "Applying",
    stem: "Cora's SpO2 is 84%. The physician orders oxygen to keep her SpO2 between 88% and 92%. Which delivery method should the nurse prepare?",
    k: "Venturi mask set at 28%",
    why: "A Venturi mask delivers a precise, fixed FiO2, which makes it the best device for controlled low-dose oxygen in a client who retains CO2 and has a narrow target range.",
    d: [
      ["Non-rebreather mask at 15 L/min", "Delivers very high FiO2, which can worsen hypercapnia in a CO2 retainer and overshoot the target."],
      ["Nasal cannula at 6 L/min", "6 L/min is the top of the cannula range (about 44% FiO2), too high and imprecise for this target."],
      ["Simple face mask at 8 L/min", "Delivers about 40–60% FiO2 with variable accuracy, which is not controlled enough here."],
    ],
  },
  {
    sit: 2, bloom: "Applying", ordered: true,
    stem: "Her post-bronchodilator spirometry shows an FEV1/FVC of 0.58 and an FEV1 of 42% of predicted. Using the GOLD grading of airflow limitation, the nurse classifies this as:",
    k: "GOLD 3",
    why: "An FEV1/FVC below 0.70 confirms persistent airflow limitation. GOLD grades severity by FEV1 % predicted: GOLD 1 ≥80%, GOLD 2 50–79%, GOLD 3 30–49% (severe), GOLD 4 <30%. 42% falls in GOLD 3.",
    d: [
      ["GOLD 1", "GOLD 1 (mild) requires an FEV1 of 80% predicted or higher."],
      ["GOLD 2", "GOLD 2 (moderate) is an FEV1 of 50–79% predicted."],
      ["GOLD 4", "GOLD 4 (very severe) is an FEV1 below 30% predicted."],
    ],
  },
  {
    sit: 2, bloom: "Understanding",
    stem: "After teaching pursed-lip breathing, which statement by Cora shows she understands why it helps?",
    k: "\"It keeps my small airways open longer when I breathe out.\"",
    why: "Exhaling against pursed lips creates back-pressure that splints the small airways open, reduces air trapping, and slows the breathing rate.",
    d: [
      ["\"It helps me breathe out faster so my lungs empty quickly.\"", "The technique slows exhalation; a long, controlled breath out is the goal."],
      ["\"It trains my neck muscles to do more of the breathing work.\"", "The aim is to reduce accessory-muscle use, not increase it."],
      ["\"It loosens my thick sputum so that I can cough it out.\"", "Airway clearance techniques (huff coughing, hydration) loosen sputum; pursed-lip breathing targets air trapping."],
    ],
  },
  {
    sit: 2, bloom: "Analyzing",
    stem: "On day 3, Carlo notes distended neck veins, bilateral ankle edema, and an enlarged, tender liver. Cora has no new crackles in her lungs. These findings most likely indicate:",
    k: "right ventricular failure from pulmonary hypertension",
    why: "Chronic hypoxemia in COPD constricts the pulmonary vessels, causing pulmonary hypertension that strains the right ventricle (cor pulmonale). Back-up into the systemic veins produces JVD, peripheral edema, and hepatomegaly.",
    d: [
      ["left ventricular failure from coronary artery disease", "Left-sided failure backs up into the lungs, causing crackles and orthopnea, which are absent here."],
      ["circulatory overload from her IV fluid infusion", "Fluid overload would usually bring new crackles, and the pattern fits her chronic lung disease better."],
      ["liver cirrhosis from long exposure to wood smoke", "Wood smoke damages the lungs, not the liver, and cirrhosis does not explain distended neck veins."],
    ],
  },

  // ---------------- Situation 3 ----------------
  {
    sit: 3, bloom: "Analyzing",
    stem: "On assessment of Paolo's right chest, which combination of findings should the nurse expect?",
    k: "diminished breath sounds with hyperresonant percussion",
    why: "In a primary spontaneous pneumothorax, air in the pleural space collapses the lung: breath sounds are diminished or absent, percussion is hyperresonant, and fremitus is decreased.",
    d: [
      ["bronchial breath sounds with dull percussion", "This pair points to consolidation such as pneumonia."],
      ["increased tactile fremitus with dull percussion", "Increased fremitus means denser lung tissue (consolidation), not air outside the lung."],
      ["absent fremitus with flat, dull percussion", "Dullness or flatness points to fluid (pleural effusion); air gives hyperresonance."],
    ],
  },
  {
    sit: 3, bloom: "Applying",
    stem: "While waiting for chest tube insertion, Paolo becomes restless. His trachea has shifted to the left, BP is 82/50, HR is 134, and his neck veins are distended. The nurse's priority is to:",
    k: "prepare for immediate needle decompression on the affected side",
    why: "Tracheal shift away from the affected side, hypotension, tachycardia, and JVD signal a tension pneumothorax, a life-threatening emergency. Air must be released at once by needle decompression, followed by a chest tube.",
    d: [
      ["turn him onto his left side and reassess in 15 minutes", "Waiting wastes critical minutes; tension pneumothorax can cause cardiac arrest quickly."],
      ["draw an arterial blood gas before notifying the physician", "Tension pneumothorax is a clinical diagnosis; tests must not delay decompression."],
      ["give the prescribed morphine to relieve his chest pain", "Analgesia does not treat the cause and may worsen hypotension and breathing."],
    ],
  },
  {
    sit: 3, bloom: "Analyzing",
    stem: "A chest tube attached to a water-seal unit is inserted. On day 2, the fluid in the water-seal chamber rises and falls with each breath, and bubbles appear only when Paolo coughs. The nurse interprets this as:",
    k: "an expected sign of a patent, working tube",
    why: "Tidaling with breathing shows the tube is open and connected to the pleural space. Intermittent bubbling on coughing or exhalation is expected while air is still leaving a pneumothorax.",
    d: [
      ["an air leak that requires clamping the tube", "A system leak gives continuous bubbling; clamping is not done routinely and can cause tension pneumothorax."],
      ["a clot that requires milking of the tube", "An obstruction stops tidaling; here the fluid still moves with each breath."],
      ["full lung re-expansion ready for tube removal", "When the lung has fully re-expanded, tidaling and bubbling stop."],
    ],
  },
  {
    sit: 3, bloom: "Applying",
    stem: "While Paolo walks to the bathroom, the chest tube separates from the drainage tubing. The nurse's immediate action is to:",
    k: "submerge the tube end about 2 cm in sterile water",
    why: "Placing the open end under 2 cm of sterile water creates an emergency water seal, so air can escape but not re-enter the pleural space, until a new system is attached.",
    d: [
      ["clamp the tube near the chest until the physician comes", "Prolonged clamping traps air in the pleural space and can cause a tension pneumothorax."],
      ["pull out the chest tube and cover the site with gauze", "A disconnected tube is never removed; this would collapse the lung further."],
      ["raise the drainage unit above the level of his chest", "Raising the unit causes backflow and does nothing for the disconnection."],
    ],
  },
  {
    sit: 3, bloom: "Understanding",
    stem: "Before discharge, which statement by Paolo shows correct understanding of preventing a recurrence?",
    k: "\"Smoking raises my risk of another lung collapse, so I will quit.\"",
    why: "Smoking is the main modifiable risk factor for recurrence of primary spontaneous pneumothorax, so stopping smoking is a key part of discharge teaching.",
    d: [
      ["\"Scuba diving next month is safe now that my tube is out.\"", "Diving involves pressure changes that can cause recurrence; it is generally avoided."],
      ["\"A recurrence is unlikely because tall, thin people rarely get this.\"", "Tall, thin young males are the classic high-risk group."],
      ["\"My lung has fully healed, so I no longer need follow-up.\"", "Recurrence is common (about one in three), so follow-up and warning signs must be taught."],
    ],
  },

  // ---------------- Situation 4 ----------------
  {
    sit: 4, bloom: "Analyzing",
    stem: "Ernesto's pulmonary function test shows an FEV1/FVC of 0.64 with increased total lung capacity and residual volume. The nurse recognizes this as a pattern of:",
    k: "obstructive ventilatory defect",
    why: "A reduced FEV1/FVC (below 0.70) shows airflow limitation, and a raised TLC and RV show air trapping and hyperinflation, the obstructive pattern seen in smokers with COPD.",
    d: [
      ["restrictive ventilatory defect", "Restriction lowers TLC, and the FEV1/FVC is normal or high."],
      ["neuromuscular respiratory weakness", "Muscle weakness reduces lung volumes; it does not raise TLC."],
      ["normal age-related decline", "Aging lowers flows slightly but does not cause a ratio below 0.70 with hyperinflation."],
    ],
  },
  {
    sit: 4, bloom: "Understanding",
    stem: "Ernesto asks why one lung volume cannot be measured by simple spirometry. The nurse explains that it is the air that stays in the lungs even after the most forceful exhalation. This volume is the:",
    k: "residual volume",
    why: "Residual volume (about 1,200 mL) never leaves the lungs, so a spirometer cannot record it; it is measured by body plethysmography or gas dilution.",
    d: [
      ["tidal volume", "Tidal volume (about 500 mL) moves in and out with each quiet breath and is easily measured."],
      ["expiratory reserve volume", "This is the extra air that can be forcefully exhaled after a normal breath, so spirometry measures it."],
      ["inspiratory reserve volume", "This is the extra air that can be inhaled after a normal breath, also measurable by spirometry."],
    ],
  },
  {
    sit: 4, bloom: "Remembering",
    stem: "Ernesto asks which muscle does most of the work when he breathes in quietly. The nurse answers:",
    k: "diaphragm",
    why: "The diaphragm is the primary muscle of inspiration; its contraction enlarges the chest cavity and accounts for most of the work of quiet breathing.",
    d: [
      ["external intercostals", "They assist inspiration by lifting the ribs but contribute less than the diaphragm."],
      ["sternocleidomastoid", "An accessory muscle used in forced or labored breathing."],
      ["scalene muscles", "Accessory muscles that raise the upper ribs during forced inspiration."],
    ],
  },
  {
    sit: 4, bloom: "Applying",
    stem: "After surgery, the nurse teaches Ernesto to use an incentive spirometer. Which instruction is correct?",
    k: "\"Inhale slowly and deeply, then hold your breath for 3 to 5 seconds.\"",
    why: "A slow, deep, sustained inhalation with a breath-hold keeps the alveoli open and prevents postoperative atelectasis. It is usually done about 10 times an hour while awake.",
    d: [
      ["\"Blow out into the mouthpiece as hard and as fast as you can.\"", "The incentive spirometer measures inspiration, not forced exhalation."],
      ["\"Take quick, short breaths to make the ball rise quickly.\"", "Quick shallow breaths do not open collapsed alveoli; the breath must be slow and sustained."],
      ["\"Use it once a day, at bedtime, to avoid tiring yourself.\"", "Once a day is far too infrequent to prevent atelectasis."],
    ],
  },
  {
    sit: 4, bloom: "Analyzing",
    stem: "On postoperative day 3, Ernesto has a temperature of 38.6 °C. Over the right lower lobe, the nurse finds increased tactile fremitus, dullness to percussion, and bronchial breath sounds. These findings most suggest:",
    k: "consolidation of lung tissue",
    why: "Sound travels better through solid tissue, so consolidation (as in pneumonia) increases fremitus and produces bronchial breath sounds, while percussion becomes dull.",
    d: [
      ["fluid in the pleural space", "Pleural fluid gives dullness but decreases fremitus and breath sounds."],
      ["air in the pleural space", "Pleural air gives hyperresonance with decreased fremitus."],
      ["hyperinflation of the alveoli", "Hyperinflation gives hyperresonance and decreased fremitus."],
    ],
  },

  // ---------------- Situation 5 ----------------
  {
    sit: 5, bloom: "Analyzing",
    stem: "The granddaughter says, \"Lolo is just getting old.\" The nurse recognizes that Teodoro's new confusion with only a slight temperature is most likely:",
    k: "an atypical presentation of an acute infection",
    why: "Older adults often have blunted fever responses. Pneumonia may show up as new confusion, weakness, falls, or poor appetite, together with subtle cues such as tachypnea and cough.",
    d: [
      ["an expected change of normal aging", "Acute confusion is never part of normal aging; it signals delirium with an underlying cause."],
      ["an early sign of Alzheimer disease", "Dementia develops over months to years, not over two days."],
      ["a side effect of his maintenance medicines", "Drugs can cause delirium, but with cough and tachypnea, infection must be ruled out first."],
    ],
  },
  {
    sit: 5, bloom: "Applying",
    stem: "A sputum culture is ordered for Teodoro. Which nursing action ensures a quality specimen?",
    k: "Collect it in the early morning after he rinses with water.",
    why: "Early-morning sputum is most concentrated. Rinsing with plain water reduces mouth contamination without killing organisms, and the specimen should be taken before antibiotics start.",
    d: [
      ["Collect it after the first antibiotic dose has been given.", "Antibiotics given first reduce the chance of growing the organism."],
      ["Collect it after he gargles with an antiseptic mouthwash.", "Antiseptic can kill organisms and give a false-negative culture."],
      ["Collect his saliva instead if he cannot cough deeply.", "Saliva is not sputum and gives an unreliable result."],
    ],
  },
  {
    sit: 5, bloom: "Remembering",
    stem: "The nurse recalls that the most common bacterial cause of community-acquired pneumonia is:",
    k: "Streptococcus pneumoniae",
    why: "Streptococcus pneumoniae (pneumococcus) remains the most common bacterial cause of community-acquired pneumonia.",
    d: [
      ["Haemophilus influenzae", "A common cause, especially in smokers and COPD, but less common than pneumococcus."],
      ["Mycoplasma pneumoniae", "A cause of 'atypical' pneumonia, mostly in younger adults."],
      ["Pseudomonas aeruginosa", "Mainly linked to hospital-acquired and ventilator-associated pneumonia."],
    ],
  },
  {
    sit: 5, bloom: "Analyzing",
    stem: "On his first night on the ward, four findings are reported to the nurse. Which requires immediate action?",
    k: "SpO2 of 86% with accessory muscle use",
    why: "Low oxygen saturation with increased work of breathing is a breathing (B) problem and signals respiratory compromise, so it takes priority over the other findings.",
    d: [
      ["Yellow sputum with a productive cough", "Expected with bacterial pneumonia and not immediately life-threatening."],
      ["Temperature of 37.8 °C with chills", "Needs follow-up but is less urgent than hypoxemia."],
      ["Crackles at the right base, unchanged", "A stable, known finding does not need immediate action."],
    ],
  },
  {
    sit: 5, bloom: "Applying",
    stem: "Teodoro's condition worsens and he is intubated in the ICU. Which nursing measure best helps prevent ventilator-associated pneumonia?",
    k: "Keep the head of the bed elevated 30 to 45 degrees.",
    why: "Raising the head of the bed reduces aspiration of oropharyngeal and gastric secretions, a core part of the VAP-prevention bundle (with oral care, sedation breaks, and subglottic suctioning).",
    d: [
      ["Keep him flat to promote drainage of lung secretions.", "Lying flat increases aspiration and VAP risk."],
      ["Limit oral care to once a day to prevent mucosal injury.", "Frequent oral care is part of the bundle; limiting it lets bacteria build up."],
      ["Change the ventilator circuit tubing every eight hours.", "Routine frequent circuit changes do not lower VAP and can raise it; change only when soiled or faulty."],
    ],
  },

  // ---------------- Situation 6 ----------------
  {
    sit: 6, bloom: "Applying",
    stem: "While Jun-Jun's diagnosis is being confirmed, which precaution should the nurse implement?",
    k: "a single negative-pressure room and an N95 respirator for staff",
    why: "TB spreads through droplet nuclei that stay suspended in the air, so airborne precautions are needed: a negative-pressure (airborne infection isolation) room and fit-tested N95 respirators for staff.",
    d: [
      ["a shared room with gown and gloves for any contact", "Contact precautions do not stop airborne droplet nuclei."],
      ["a regular private room with a surgical mask for staff", "A surgical mask does not protect staff; it is worn by the patient during transport."],
      ["a cohort room with another patient who has pneumonia", "Cohorting exposes a non-TB patient to infection."],
    ],
  },
  {
    sit: 6, bloom: "Remembering",
    stem: "Under the DOH National TB Program, which test is recommended as the initial diagnostic test for a presumptive pulmonary TB case such as Jun-Jun?",
    k: "Xpert MTB/RIF assay",
    why: "The DOH NTP uses WHO-recommended rapid diagnostic tests such as Xpert MTB/RIF on sputum as the primary test for presumptive TB, since it detects M. tuberculosis and rifampicin resistance within hours.",
    d: [
      ["tuberculin skin test", "Shows TB infection, not active disease, and cannot detect drug resistance."],
      ["chest radiograph alone", "Useful for screening but cannot confirm TB bacteriologically."],
      ["interferon-gamma release assay", "Like the skin test, it shows infection and not active disease."],
    ],
  },
  {
    sit: 6, bloom: "Analyzing",
    stem: "Jun-Jun's 34-year-old brother, who is HIV-positive, has his Mantoux test read at 48 hours: 6 mm of induration with 14 mm of redness. The nurse interprets the result as:",
    k: "positive, because 5 mm of induration is his cut-off",
    why: "Only induration is measured. For people with HIV and close contacts of an active case, 5 mm or more is positive, so 6 mm is positive for him.",
    d: [
      ["negative, because his induration is below 10 mm", "The 10 mm cut-off applies to other risk groups, not to people with HIV."],
      ["positive, because the redness is more than 10 mm", "Redness (erythema) is not measured; only the raised, hard area counts."],
      ["invalid, because it should have been read at 7 days", "The Mantoux test is read at 48 to 72 hours."],
    ],
  },
  {
    sit: 6, bloom: "Applying",
    stem: "After two months on the HRZE regimen, Jun-Jun reports numbness and tingling in both feet. The nurse anticipates which order?",
    k: "pyridoxine (vitamin B6) supplementation",
    why: "Isoniazid (H) interferes with pyridoxine and causes peripheral neuropathy. Vitamin B6 prevents and treats this side effect.",
    d: [
      ["cyanocobalamin (vitamin B12) injection", "B12 deficiency can cause neuropathy, but the cause here is isoniazid-related B6 depletion."],
      ["discontinuation of ethambutol", "Ethambutol causes optic neuritis (vision changes), not foot numbness."],
      ["allopurinol for pyrazinamide effects", "Pyrazinamide raises uric acid (joint pain), not neuropathy."],
    ],
  },
  {
    sit: 6, bloom: "Analyzing",
    stem: "At the TB-DOTS facility, which statement by Jun-Jun indicates a need for further teaching?",
    k: "\"I can stop my tablets once my cough is gone.\"",
    why: "Treatment must be completed for the full course (at least 6 months for drug-susceptible TB). Stopping early leads to relapse and drug-resistant TB.",
    d: [
      ["\"My urine and tears may turn orange-red.\"", "Correct: rifampicin causes harmless orange-red body fluids."],
      ["\"I will take my tablets in front of my treatment partner.\"", "Correct: this is directly observed treatment."],
      ["\"I will cover my mouth when I cough or sneeze.\"", "Correct: cough etiquette reduces spread."],
    ],
  },

  // ---------------- Situation 7 ----------------
  {
    sit: 7, bloom: "Understanding",
    stem: "The nurse attributes Benjamin's hoarse voice to tumor involvement of the:",
    k: "recurrent laryngeal nerve",
    why: "The recurrent laryngeal nerve supplies the vocal cords. Compression by a central or mediastinal tumor causes vocal cord paralysis and hoarseness.",
    d: [
      ["phrenic nerve", "Phrenic involvement paralyzes the diaphragm on that side, causing dyspnea rather than hoarseness."],
      ["hypoglossal nerve", "This nerve moves the tongue and is not affected by a lung mass."],
      ["intercostal nerves", "Chest-wall invasion of these nerves causes chest pain, not voice changes."],
    ],
  },
  {
    sit: 7, bloom: "Applying",
    stem: "Benjamin undergoes flexible bronchoscopy with biopsy under topical anesthesia and sedation. After the procedure, the nurse should:",
    k: "withhold food and fluids until his gag reflex returns",
    why: "Topical anesthesia of the throat suppresses the gag and cough reflexes, so the client is kept NPO until they return to prevent aspiration.",
    d: [
      ["give ice chips right away to soothe his throat", "Even ice chips can be aspirated while the gag reflex is absent."],
      ["keep him flat in bed for six to eight hours", "Semi-Fowler's or side-lying position is used, not flat; this is not a lumbar puncture."],
      ["report any blood-streaked sputum as an emergency", "A small amount of blood-streaked sputum is expected after biopsy; frank bleeding is what must be reported."],
    ],
  },
  {
    sit: 7, bloom: "Analyzing",
    stem: "Biopsy confirms small cell carcinoma. On day 4, Benjamin's serum sodium is 122 mEq/L, he is confused, his urine is concentrated, and he has no edema. The nurse suspects:",
    k: "SIADH",
    why: "Small cell lung cancer can secrete ADH ectopically. Water is retained, producing dilutional hyponatremia with concentrated urine and no edema (syndrome of inappropriate antidiuretic hormone).",
    d: [
      ["diabetes insipidus", "DI causes dilute urine and high, not low, sodium."],
      ["hypercalcemia of malignancy", "Linked mostly to squamous cell carcinoma; it raises calcium rather than lowering sodium."],
      ["ectopic Cushing syndrome", "Ectopic ACTH causes hypokalemia, hyperglycemia, and fluid retention, not this picture."],
    ],
  },
  {
    sit: 7, bloom: "Applying",
    stem: "A malignant pleural effusion develops, and thoracentesis is scheduled. How should the nurse position Benjamin for the procedure?",
    k: "sitting up and leaning forward over the overbed table",
    why: "Sitting upright and leaning forward widens the intercostal spaces and lets fluid pool at the lung base, making needle entry safer.",
    d: [
      ["lying prone with both of his arms at his sides", "Prone position blocks access to the posterior chest and makes breathing harder."],
      ["supine with the head of the bed kept flat", "Lying flat spreads the fluid and makes access and breathing harder."],
      ["in Trendelenburg position with his legs elevated", "Head-down positioning worsens breathlessness and moves fluid away from the base."],
    ],
  },
  {
    sit: 7, bloom: "Analyzing",
    stem: "Weeks later, Benjamin develops facial puffiness, swelling of both arms, and distended neck and chest-wall veins that worsen when he lies down. Which action should the nurse take first?",
    k: "raise the head of the bed and notify the physician",
    why: "These findings point to superior vena cava syndrome from tumor compression, an oncologic emergency. Raising the head of the bed eases venous return from the upper body while urgent treatment is arranged.",
    d: [
      ["lay him flat with both legs elevated on pillows", "Lying flat worsens upper-body venous congestion and breathlessness."],
      ["insert the ordered IV line in his swollen right arm", "Upper-arm IV lines are avoided in SVC obstruction because of slow flow and thrombosis risk."],
      ["apply warm compresses to reduce his facial swelling", "This does not address the obstruction and delays treatment."],
    ],
  },

  // ---------------- Situation 8 ----------------
  {
    sit: 8, bloom: "Applying",
    stem: "Which action should Nurse Hannah take first?",
    k: "position her upright and give oxygen as ordered",
    why: "Sudden dyspnea, pleuritic chest pain, hemoptysis, and hypoxemia after hip surgery suggest pulmonary embolism. Upright positioning and oxygen address the immediate breathing problem while the physician is notified.",
    d: [
      ["massage her calves to check for a tender clot", "Massaging a leg with a possible DVT can dislodge more clot."],
      ["place her flat in a Trendelenburg position", "Head-down positioning worsens breathing."],
      ["help her walk in the hallway to ease breathing", "Activity increases oxygen demand and is unsafe during an acute event."],
    ],
  },
  {
    sit: 8, bloom: "Applying",
    stem: "A CT scan using intravenous dye to view the pulmonary arteries is ordered to confirm the diagnosis. Before the scan, which is most important for the nurse to check?",
    k: "serum creatinine and prior reactions to contrast media",
    why: "Iodinated contrast can harm the kidneys and trigger allergic reactions, so renal function and any history of contrast reactions are checked before CT pulmonary angiography.",
    d: [
      ["the result of her most recent sputum culture", "Culture results do not affect safety for a contrast study."],
      ["the time of her last bowel movement", "Bowel habits have no bearing on a chest CT."],
      ["her ability to perform a forced expiration", "Forced expiration is needed for spirometry, not CT."],
    ],
  },
  {
    sit: 8, bloom: "Understanding",
    stem: "Lourdes is started on a continuous IV infusion of unfractionated heparin. The nurse knows the dose is adjusted based on which laboratory result?",
    k: "aPTT",
    why: "The activated partial thromboplastin time is used to titrate unfractionated heparin (commonly to 1.5–2.5 times control, per protocol).",
    d: [
      ["INR", "The INR monitors warfarin therapy."],
      ["platelet count", "Checked to detect heparin-induced thrombocytopenia, but not used to set the dose."],
      ["D-dimer", "A screening marker for clot breakdown; it is not used to adjust heparin."],
    ],
  },
  {
    sit: 8, bloom: "Understanding",
    stem: "Lourdes's daughter asks, \"Will the heparin dissolve the clot in her lung?\" The nurse's best response is:",
    k: "\"No, it stops the clot from growing while her body breaks it down.\"",
    why: "Anticoagulants prevent the clot from getting bigger and new clots from forming; the body's own fibrinolytic system gradually dissolves the existing clot. Only thrombolytics actively dissolve clots.",
    d: [
      ["\"Yes, it dissolves the clot completely within one or two days.\"", "This describes thrombolytic therapy (e.g., alteplase), not heparin."],
      ["\"Yes, it thins her blood so the clot washes away quickly.\"", "Heparin does not thin the blood or wash clots away; this is a common misconception."],
      ["\"No, it is given mainly to relieve her chest pain and anxiety.\"", "Heparin has no analgesic or anti-anxiety effect."],
    ],
  },
  {
    sit: 8, bloom: "Applying",
    stem: "Lourdes will go home on warfarin. Which dietary instruction is most appropriate?",
    k: "\"Keep your intake of malunggay and other greens consistent each day.\"",
    why: "Vitamin K counteracts warfarin. A steady daily intake keeps the INR stable; sudden increases or decreases cause the INR to swing.",
    d: [
      ["\"Avoid all green leafy vegetables for as long as you take it.\"", "Complete avoidance is unnecessary and makes the INR harder to control if intake later changes."],
      ["\"Eat extra servings of green vegetables to strengthen the medicine.\"", "More vitamin K weakens, not strengthens, the effect of warfarin."],
      ["\"Take a daily vitamin K supplement to prevent bleeding problems.\"", "Vitamin K reverses warfarin and is given only as ordered for a high INR."],
    ],
  },

  // ---------------- Situation 9 ----------------
  {
    sit: 9, bloom: "Understanding",
    stem: "On physical examination of Felipe, which findings should the nurse expect?",
    k: "fine bibasilar crackles and digital clubbing",
    why: "IPF classically produces fine, 'Velcro-like' crackles at the lung bases and finger clubbing from chronic hypoxemia.",
    d: [
      ["expiratory wheezes and a barrel-shaped chest", "These suggest obstructive disease such as asthma or COPD."],
      ["coarse rhonchi that clear after coughing", "Rhonchi come from secretions in the large airways, not from fibrosis."],
      ["inspiratory stridor with a hoarse voice", "Stridor indicates upper-airway obstruction."],
    ],
  },
  {
    sit: 9, bloom: "Understanding",
    stem: "Felipe asks why he gets breathless so easily. The nurse's explanation is based on the knowledge that in his disease:",
    k: "stiff, scarred lungs cannot expand fully with each breath",
    why: "Fibrosis reduces lung compliance, so lung volumes fall and more effort is needed to breathe in. This is the hallmark of restrictive disease.",
    d: [
      ["trapped air overinflates the alveoli during exhalation", "Air trapping and hyperinflation describe obstructive disease such as emphysema."],
      ["reversible bronchospasm narrows the small airways", "Reversible bronchospasm is the mechanism of asthma."],
      ["thick mucus plugs block the large airways", "Mucus plugging is seen in chronic bronchitis or cystic fibrosis."],
    ],
  },
  {
    sit: 9, bloom: "Applying",
    stem: "Which activity plan should the nurse recommend so Felipe can conserve energy at home?",
    k: "Sit while bathing and alternate tasks with rest periods.",
    why: "Sitting during tasks and pacing activities with rest reduces oxygen demand and dyspnea while keeping him active.",
    d: [
      ["Finish all household chores early in one session.", "Bunching tasks together causes exhaustion and desaturation."],
      ["Avoid all physical activity to save his oxygen.", "Inactivity causes deconditioning; paced activity and rehabilitation are encouraged."],
      ["Hold his breath while lifting to steady his chest.", "Breath-holding (Valsalva) strains the heart and lungs; he should exhale during exertion."],
    ],
  },
  {
    sit: 9, bloom: "Applying",
    stem: "Felipe is prescribed home oxygen. Which home safety instruction is correct?",
    k: "Keep the oxygen at least 3 meters from the LPG stove.",
    why: "Oxygen supports combustion, so the source is kept about 3 meters (10 feet) from open flames and heat sources, with no smoking nearby.",
    d: [
      ["Apply petroleum jelly to the lips and nostrils for dryness.", "Petroleum-based products are flammable near oxygen; water-based lubricants are used."],
      ["Turn up the oxygen flow on your own when breathless.", "Flow should not be changed without a prescription, especially in clients at risk of CO2 retention."],
      ["Store the tank lying flat inside a closed cabinet.", "Tanks are stored upright, secured, and in a ventilated area."],
    ],
  },
  {
    sit: 9, bloom: "Analyzing",
    stem: "Felipe is given oral prednisone during an acute exacerbation. At a follow-up visit, which finding should the nurse report promptly?",
    k: "capillary blood glucose of 265 mg/dL with frequent urination",
    why: "Steroid-induced hyperglycemia with polyuria needs prompt treatment to prevent dehydration and hyperglycemic complications.",
    d: [
      ["a rounder face than before he started treatment", "Moon face is an expected cushingoid effect, not an urgent finding."],
      ["an increased appetite and a 1-kg weight gain", "Increased appetite and mild weight gain are expected side effects."],
      ["mild difficulty falling asleep at night", "Insomnia is common and minor; taking the dose in the morning helps."],
    ],
  },

  // ---------------- Situation 10 ----------------
  {
    sit: 10, bloom: "Analyzing",
    stem: "Based on Ana's presentation, the nurse suspects:",
    k: "acute epiglottitis",
    why: "Sudden high fever, drooling, a muffled voice, and the tripod (sniffing) position in a child with incomplete immunization point to epiglottitis, a bacterial airway emergency.",
    d: [
      ["laryngotracheobronchitis", "Croup begins gradually with a barking cough, hoarseness, and low-grade fever, and drooling is unusual."],
      ["bronchiolitis", "Affects infants with wheezing after a cold; it does not cause drooling or a muffled voice."],
      ["foreign body aspiration", "Begins with sudden choking or coughing, usually without high fever."],
    ],
  },
  {
    sit: 10, bloom: "Applying",
    stem: "Which action should Nurse Joy take first?",
    k: "keep her upright on her mother's lap and avoid throat inspection",
    why: "Agitating the child or inspecting the throat can trigger complete airway obstruction. Keep her calm and upright with her mother, and prepare for airway support by a skilled team.",
    d: [
      ["inspect her throat with a tongue depressor and a penlight", "Throat inspection can cause laryngospasm and total obstruction."],
      ["obtain a throat swab for culture before giving antibiotics", "Swabbing is deferred until the airway is secured."],
      ["lay her supine on the stretcher for a neck x-ray", "Lying supine can close a swollen airway; securing the airway comes first."],
    ],
  },
  {
    sit: 10, bloom: "Remembering",
    stem: "Ana's mother asks how this illness could have been prevented. The nurse explains that the vaccine protecting against its usual cause is the:",
    k: "Hib vaccine",
    why: "Haemophilus influenzae type b is the classic cause of epiglottitis. The Hib vaccine, part of the pentavalent vaccine in the national immunization program, has made the disease rare.",
    d: [
      ["pneumococcal vaccine", "Protects against Streptococcus pneumoniae, not the usual cause of epiglottitis."],
      ["BCG vaccine", "Protects infants against severe forms of tuberculosis."],
      ["measles-rubella vaccine", "Protects against measles and rubella."],
    ],
  },
  {
    sit: 10, bloom: "Applying",
    stem: "The next day, Ana's 4-month-old brother, Miguel, is admitted with bronchiolitis after a cold. He is wheezing, has thick secretions blocking his nose, and feeds poorly. Which intervention is a priority?",
    k: "gentle nasal suctioning before feedings",
    why: "Infants are nose breathers. Clearing nasal secretions before feeds eases breathing and improves feeding; care for bronchiolitis is mainly supportive.",
    d: [
      ["chest physiotherapy every two hours", "Not recommended for bronchiolitis; it brings no benefit and distresses the infant."],
      ["oral amoxicillin as first-line therapy", "Bronchiolitis is viral (usually RSV); antibiotics do not help."],
      ["holding all feedings until wheezing stops", "Small, frequent feeds are preferred; feeds are held only in severe distress."],
    ],
  },
  {
    sit: 10, bloom: "Analyzing",
    stem: "Which finding in Miguel should the nurse report to the physician immediately?",
    k: "grunting with nasal flaring and subcostal retractions",
    why: "Grunting, flaring, and retractions show increased work of breathing and impending respiratory failure in an infant, so they need urgent escalation.",
    d: [
      ["respiratory rate of 44 breaths per minute at rest", "Within the normal infant range of about 30 to 60."],
      ["clear nasal discharge with occasional sneezing", "Expected with a viral upper respiratory infection."],
      ["a mild dry cough during his feedings", "A minor finding that needs monitoring, not urgent action."],
    ],
  },
];

module.exports = { situations, items };

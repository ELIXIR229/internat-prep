import { useState, useEffect, useRef } from "react";

const C = {
  bg:"linear-gradient(160deg,#fff6ef 0%,#fdf1ff 45%,#eef8ff 100%)",
  surface:"#ffffff",surface2:"#fff3e8",surface3:"#ffe8d6",
  border:"#f0dcc8",accent:"#7c5cff",accent2:"#ff5f8e",accent3:"#0ea968",
  accent4:"#f5a300",accent5:"#0ea5e9",accent6:"#ec4899",
  text:"#2b2340",text2:"#7a6f95",text3:"#b9abd1",
};

const uid = () => Date.now().toString(36)+Math.random().toString(36).slice(2);
const todayStr = () => new Date().toLocaleDateString("fr-FR");
const getWeekKey = () => { const d=new Date(),day=d.getDay(),diff=d.getDate()-day+(day===0?-6:1); return new Date(new Date().setDate(diff)).toLocaleDateString("fr-FR"); };
const SUBJECT_COLORS = ["#7c6dff","#ff5f7e","#2ecc8a","#f0a500","#38b6f8","#f687c3","#a78bfa","#34d399"];

// ─── VALEURS CNG OFFICIELLES (V8 Nov. 2009) ───────────────────────
const CNG_CARDS = [
  {id:uid(),cat:"Azotés",q:"Créatinine (H) — Se/Pl",a:"60–115 µmol/L",u:"7–13 mg/L"},
  {id:uid(),cat:"Azotés",q:"Créatinine (F) — Se/Pl",a:"45–105 µmol/L",u:"5–12 mg/L"},
  {id:uid(),cat:"Azotés",q:"Urate (H) — Se/Pl",a:"180–420 µmol/L",u:"30–70 mg/L"},
  {id:uid(),cat:"Azotés",q:"Urate (F) — Se/Pl",a:"150–360 µmol/L",u:"25–60 mg/L"},
  {id:uid(),cat:"Azotés",q:"Urée — Se/Pl",a:"2,5–7,5 mmol/L",u:"0,15–0,45 g/L"},
  {id:uid(),cat:"Azotés",q:"Créatinine urinaire 24h (H)",a:"10–18 mmol/24h",u:"1100–2000 mg/24h"},
  {id:uid(),cat:"Azotés",q:"Créatinine urinaire 24h (F)",a:"9–12 mmol/24h",u:"1000–1350 mg/24h"},
  {id:uid(),cat:"Azotés",q:"Urate urinaire 24h",a:"2,4–4,8 mmol/24h",u:"400–800 mg/24h"},
  {id:uid(),cat:"Azotés",q:"Urée urinaire 24h",a:"300–500 mmol/24h",u:"18–30 g/24h"},
  {id:uid(),cat:"Azotés",q:"Clairance créatinine (1,73 m²)",a:"1,50–2,30 mL/s",u:"90–140 mL/min"},
  {id:uid(),cat:"Électrolytes",q:"Sodium (Na⁺) — Pl",a:"135–145 mmol/L",u:"—"},
  {id:uid(),cat:"Électrolytes",q:"Potassium (K⁺) — Pl",a:"3,5–4,5 mmol/L",u:"—"},
  {id:uid(),cat:"Électrolytes",q:"Chlorure (Cl⁻) — Pl",a:"95–105 mmol/L",u:"—"},
  {id:uid(),cat:"Électrolytes",q:"Bicarbonate (HCO₃⁻) — Pl",a:"23–27 mmol/L",u:"—"},
  {id:uid(),cat:"Électrolytes",q:"Osmolalité plasmatique",a:"295–310 mmol/kg H₂O",u:"295–310 mOsm/kg H₂O"},
  {id:uid(),cat:"Électrolytes",q:"Ammonium — Pl",a:"25–40 µmol/L",u:"0,45–0,70 mg/L"},
  {id:uid(),cat:"Électrolytes",q:"Calcium total — Se/Pl",a:"2,20–2,60 mmol/L",u:"88–104 mg/L"},
  {id:uid(),cat:"Électrolytes",q:"Fer sérique — Se/Pl",a:"10–30 µmol/L",u:"0,55–1,65 mg/L"},
  {id:uid(),cat:"Électrolytes",q:"Saturation transferrine",a:"0,20–0,40",u:"20–40 %"},
  {id:uid(),cat:"Électrolytes",q:"Phosphate inorganique — Se/Pl",a:"0,80–1,40 mmol/L",u:"25–45 mg/L (en P)"},
  {id:uid(),cat:"Électrolytes",q:"Calcium urinaire 24h",a:"2,5–8,0 mmol/24h",u:"100–320 mg/24h"},
  {id:uid(),cat:"Gaz du sang",q:"pH artériel (SgA, 37°C)",a:"7,35–7,45",u:"—"},
  {id:uid(),cat:"Gaz du sang",q:"pCO₂ (SgA)",a:"35–45 mmHg",u:"—"},
  {id:uid(),cat:"Gaz du sang",q:"pO₂ (SgA)",a:"80–100 mmHg",u:"—"},
  {id:uid(),cat:"Gaz du sang",q:"SaO₂ — oxyhémoglobine/Hb tot.",a:"0,94–1,00",u:"94–100 %"},
  {id:uid(),cat:"Gaz du sang",q:"Bicarbonate artériel",a:"23–27 mmol/L",u:"—"},
  {id:uid(),cat:"Gaz du sang",q:"CO₂ total artériel",a:"25–30 mmol/L",u:"—"},
  {id:uid(),cat:"Enzymes",q:"ALAT / TGP (H) — Se (IFCC 37°C)",a:"< 45 UI/L",u:"limite sup. référence"},
  {id:uid(),cat:"Enzymes",q:"ALAT / TGP (F) — Se (IFCC 37°C)",a:"< 34 UI/L",u:"limite sup. référence"},
  {id:uid(),cat:"Enzymes",q:"ASAT / TGO — Se (IFCC 37°C)",a:"< 35 UI/L",u:"H et F"},
  {id:uid(),cat:"Enzymes",q:"Créatine kinase CK (H) — Se",a:"< 171 UI/L",u:"IFCC 37°C"},
  {id:uid(),cat:"Enzymes",q:"Créatine kinase CK (F) — Se",a:"< 145 UI/L",u:"IFCC 37°C"},
  {id:uid(),cat:"Enzymes",q:"GGT (H) — Se",a:"< 55 UI/L",u:"IFCC 37°C"},
  {id:uid(),cat:"Enzymes",q:"GGT (F) — Se",a:"< 38 UI/L",u:"IFCC 37°C"},
  {id:uid(),cat:"Enzymes",q:"LDH — Se (IFCC 37°C)",a:"< 248 UI/L",u:"H et F"},
  {id:uid(),cat:"Glucose",q:"Glucose — Pl",a:"3,90–5,50 mmol/L",u:"0,70–1,00 g/L"},
  {id:uid(),cat:"Glucose",q:"Lactate — Pl",a:"0,50–2,0 mmol/L",u:"45–180 mg/L"},
  {id:uid(),cat:"Glucose",q:"Glucose — LCR",a:"2,50–3,50 mmol/L",u:"0,45–0,65 g/L"},
  {id:uid(),cat:"Hémoglobine",q:"Hémoglobine (H) — Sg",a:"130–170 g/L",u:"—"},
  {id:uid(),cat:"Hémoglobine",q:"Hémoglobine (F) — Sg",a:"120–160 g/L",u:"—"},
  {id:uid(),cat:"Hémoglobine",q:"HbA2 / Hb totale",a:"< 0,035",u:"< 3,5 %"},
  {id:uid(),cat:"Hémoglobine",q:"HbA1c / Hb totale",a:"< 0,06",u:"< 6 %"},
  {id:uid(),cat:"Hémoglobine",q:"Bilirubine totale — Se/Pl",a:"< 17 µmol/L",u:"< 10 mg/L"},
  {id:uid(),cat:"Hémoglobine",q:"Bilirubine conjuguée",a:"0 µmol/L",u:"0 mg/L"},
  {id:uid(),cat:"Hémoglobine",q:"Bilirubine non conjuguée",a:"< 17 µmol/L",u:"< 10 mg/L"},
  {id:uid(),cat:"Hormones",q:"T4 libre — Se/Pl",a:"10–23 pmol/L",u:"8–18 ng/L"},
  {id:uid(),cat:"Hormones",q:"TSH — Se/Pl",a:"1,8–36 pmol/L",u:"0,3–6 mU/L"},
  {id:uid(),cat:"Hormones",q:"Cortisol total Pl (8h)",a:"275–555 nmol/L",u:"100–200 µg/L"},
  {id:uid(),cat:"Hormones",q:"Cortisol libre urinaire 24h",a:"80–270 nmol/24h",u:"30–100 µg/24h"},
  {id:uid(),cat:"Lipides",q:"Cholestérol total — Se",a:"4,10–5,20 mmol/L",u:"1,6–2,0 g/L"},
  {id:uid(),cat:"Lipides",q:"Triglycérides — Se",a:"0,40–1,70 mmol/L",u:"0,35–1,50 g/L"},
  {id:uid(),cat:"Lipides",q:"Cholestérol HDL — Se",a:"> 1,0 mmol/L",u:"> 0,40 g/L"},
  {id:uid(),cat:"Lipides",q:"Cholestérol LDL (sans FDR)",a:"< 4,1 mmol/L",u:"< 1,60 g/L"},
  {id:uid(),cat:"Lipides",q:"LDL cible — 1 FDR",a:"< 4,9 mmol/L",u:"< 1,90 g/L"},
  {id:uid(),cat:"Lipides",q:"LDL cible — 2 FDR",a:"< 4,1 mmol/L",u:"< 1,60 g/L"},
  {id:uid(),cat:"Lipides",q:"LDL cible — > 2 FDR",a:"< 3,4 mmol/L",u:"< 1,30 g/L"},
  {id:uid(),cat:"Lipides",q:"LDL cible — ATCD cardiovasc.",a:"< 2,6 mmol/L",u:"< 1,00 g/L"},
  {id:uid(),cat:"Protéines",q:"Protéines totales — Se",a:"65–80 g/L",u:"—"},
  {id:uid(),cat:"Protéines",q:"Protéines — LCR",a:"0,15–0,30 g/L",u:"—"},
  {id:uid(),cat:"Protéines",q:"Haptoglobine — Se",a:"1–3 g/L",u:"—"},
  {id:uid(),cat:"Protéines",q:"Orosomucoïde (α1-glycoprotéine)",a:"0,4–1,3 g/L",u:"—"},
  {id:uid(),cat:"Protéines",q:"CRP — Se",a:"< 5 mg/L",u:"—"},
  {id:uid(),cat:"Protéines",q:"Transferrine — Se",a:"2–4 g/L",u:"—"},
  {id:uid(),cat:"Protéines",q:"Ferritine (H) — Se",a:"20–250 µg/L",u:"—"},
  {id:uid(),cat:"Protéines",q:"Ferritine (F) — Se",a:"15–150 µg/L",u:"—"},
  {id:uid(),cat:"Protéines",q:"IgA — Se",a:"0,80–3,60 g/L",u:"—"},
  {id:uid(),cat:"Protéines",q:"IgG — Se",a:"7–15 g/L",u:"—"},
  {id:uid(),cat:"Protéines",q:"IgM — Se",a:"0,5–2,3 g/L",u:"—"},
  {id:uid(),cat:"Protéinogramme",q:"Albumine — Se",a:"38–48 g/L",u:"—"},
  {id:uid(),cat:"Protéinogramme",q:"α1 globulines",a:"1–3 g/L",u:"—"},
  {id:uid(),cat:"Protéinogramme",q:"α2 globulines",a:"4–9 g/L",u:"—"},
  {id:uid(),cat:"Protéinogramme",q:"β globulines",a:"5–10 g/L",u:"—"},
  {id:uid(),cat:"Protéinogramme",q:"γ globulines",a:"7–15 g/L",u:"—"},
  {id:uid(),cat:"Hémostase",q:"TS Ivy 3 points",a:"2–4 min",u:"—"},
  {id:uid(),cat:"Hémostase",q:"TS Ivy incision",a:"4–8 min",u:"—"},
  {id:uid(),cat:"Hémostase",q:"TCA (malade/témoin)",a:"0,80–1,20",u:"—"},
  {id:uid(),cat:"Hémostase",q:"Taux de prothrombine (TP)",a:"70–130 %",u:"—"},
  {id:uid(),cat:"Hémostase",q:"Fibrinogène — Pl",a:"2–4 g/L",u:"—"},
  {id:uid(),cat:"Hémostase",q:"Plaquettes — Sg",a:"150–450 G/L",u:"—"},
  {id:uid(),cat:"Hématologie",q:"VS 1h (H)",a:"2–5 mm",u:"—"},
  {id:uid(),cat:"Hématologie",q:"VS 1h (F)",a:"3–7 mm",u:"—"},
  {id:uid(),cat:"Hématologie",q:"Volume globulaire/kg (H)",a:"30 mL/kg",u:"—"},
  {id:uid(),cat:"Hématologie",q:"Volume globulaire/kg (F)",a:"26 mL/kg",u:"—"},
  {id:uid(),cat:"Hémogramme",q:"Érythrocytes (H) — Sg",a:"4,5–5,7 T/L",u:"—"},
  {id:uid(),cat:"Hémogramme",q:"Érythrocytes (F) — Sg",a:"4,2–5,2 T/L",u:"—"},
  {id:uid(),cat:"Hémogramme",q:"Hématocrite (H)",a:"0,42–0,54",u:"42–54 %"},
  {id:uid(),cat:"Hémogramme",q:"Hématocrite (F)",a:"0,37–0,47",u:"37–47 %"},
  {id:uid(),cat:"Hémogramme",q:"CCMH",a:"32–35 %",u:"—"},
  {id:uid(),cat:"Hémogramme",q:"TCMH",a:"27–32 pg",u:"—"},
  {id:uid(),cat:"Hémogramme",q:"VGM",a:"80–100 fL",u:"—"},
  {id:uid(),cat:"Hémogramme",q:"Réticulocytes",a:"20–80 G/L",u:"—"},
  {id:uid(),cat:"Hémogramme",q:"Leucocytes (GB)",a:"4,0–10,0 G/L",u:"—"},
  {id:uid(),cat:"Hémogramme",q:"PNN",a:"2–7,5 G/L",u:"—"},
  {id:uid(),cat:"Hémogramme",q:"PNE",a:"0,04–0,5 G/L",u:"—"},
  {id:uid(),cat:"Hémogramme",q:"PNB",a:"< 0,10 G/L",u:"—"},
  {id:uid(),cat:"Hémogramme",q:"Lymphocytes",a:"1–4 G/L",u:"—"},
  {id:uid(),cat:"Hémogramme",q:"Monocytes",a:"0,2–1 G/L",u:"—"},
  {id:uid(),cat:"Hémogramme",q:"Lymphocytes T CD4",a:"0,5–1,6 G/L",u:"—"},
  {id:uid(),cat:"Hémogramme",q:"Lymphocytes T CD8",a:"0,4–0,8 G/L",u:"—"},
];

// ─── PROGRAMME CNG OFFICIEL ───────────────────────────────────────
const PROGRAM = [
  { section:"I — Sciences mathématiques, physiques et chimiques", color:"#7c6dff", items:[
    "Méthodes de séparation : extraction solide-liquide et liquide-liquide",
    "Spectrophotométries d'émission et d'absorption atomiques",
    "Spectrophotométrie d'absorption moléculaire UV-visible",
    "Spectrofluorimétrie moléculaire",
    "Méthodes chromatographiques : CPG ; CLHP (exclusion, échange d'ions, partage)",
    "Méthodes électrophorétiques y compris principes des détections",
    "Méthodes redox électrochimiques : potentiométrie, ampérométrie",
    "Pression osmotique : osmolarité, osmolalité",
    "Analyse des composés chiraux",
    "Propriétés structurales et physico-chimiques des fonctions organiques. Stéréo-isoméries",
    "Rayons X et rayonnements des principaux radio-isotopes utilisés in vivo/in vitro",
    "Équilibre acide-base, pH, pK, solutions tampons. Réactions de complexation",
    "Protométrie en milieu non aqueux",
    "Critères de validité d'une méthode d'analyse",
    "Méthodes utilisant la réaction antigène-anticorps",
    "Statistique descriptive : estimation des paramètres, intervalle de confiance",
    "Tests paramétriques de comparaison (variance, moyenne, proportion)",
    "Tests de liaison : régression linéaire, corrélation, chi-deux",
  ]},
  { section:"II — Sciences de la Vie", color:"#2ecc8a", items:[
    "Structure, organisation, dynamique et polymorphisme du génome humain",
    "Régulation de l'expression des gènes codant les protéines chez les eucaryotes",
    "Modes de transmission des maladies héréditaires mendéliennes monogéniques",
    "Méthodes d'identification des mutations délétères",
    "Mécanismes et conséquences des mutations délétères",
    "Caryotype et anomalies chromosomiques constitutionnelles",
    "Mesure d'une activité enzymatique, applications",
    "Ammoniogenèse et uréogenèse",
    "Structure, biosynthèse et catabolisme des hémoglobines",
    "Structure et propriétés des acides nucléiques, des lipoprotéines",
    "Régulation de la glycémie",
    "Métabolisme des acides gras, triglycérides, cholestérol, lipoprotéines",
    "Cétogenèse",
    "Neurotransmetteurs : ACh, GABA, adrénaline, dopamine, noradrénaline, sérotonine, glutamate",
    "Physiologie cardiovasculaire",
    "Physiologie de la respiration",
    "Physiologie digestive",
    "Physiologie rénale",
    "Physiologie des corticosurrénales",
    "Physiologie de la thyroïde",
    "Cycle menstruel et physiologie de la grossesse",
    "Physiologie de la douleur",
    "Physiologie osseuse, régulation calcémie et phosphatémie",
    "Physiologie des lignées myéloïdes",
    "Groupes sanguins ABO, systèmes Rhésus et Kell",
    "Physiologie de l'hémostase primaire, coagulation, fibrinolyse",
    "Structure et propriétés des immunoglobulines",
    "Immunité innée et inflammation",
    "CMH et présentation de l'antigène",
    "Organes et cellules de la réponse immunitaire",
    "Réponses immunitaires humorales et cellulaires et leur régulation",
  ]},
  { section:"III — Santé publique et environnement", color:"#f0a500", items:[
    "Surveillance sanitaire et vigilances",
    "Prévention et promotion de la santé",
    "Politique vaccinale : élaboration, recommandations, évaluation",
    "Conduites addictives : prévention et prise en charge",
    "Épidémiologie descriptive, étiologique, évaluative et dépistage",
    "Médicaments et dispositifs médicaux : définitions, statuts, aspects socio-économiques",
    "Établissements de santé, structures de tutelle, PUI",
    "Droits des patients",
    "Risque iatrogène. Risque nosocomial",
    "Risques sanitaires des eaux (physico-chimiques et microbiologiques)",
    "Toxicologie : éthanol, méthanol, éthylène-glycol, éthers de glycols",
    "Toxicologie : hydrocarbures aromatiques, solvants chlorés aliphatiques, dioxines",
    "Toxicologie des produits phytosanitaires : organophosphorés, carbamates",
    "Poisons hémolytiques. CO, plomb, méthémoglobinisants",
    "Toxicologie des radioéléments",
    "Toxicomanies : opiacés, LSD, cocaïne, amphétaminiques, cannabis",
  ]},
  { section:"IV — Séméiologie, pathologie et biologie appliquée", color:"#ff5f7e", subsections:[
    { title:"Infections bactériennes et virales", items:[
      "Infections du système nerveux central",
      "Bactériémies et endocardites",
      "Infections urinaires",
      "Infections du tube digestif",
      "Infections ORL et bronchopulmonaires",
      "Infections sexuellement transmissibles",
      "Infections et grossesse",
      "Infections virales hépatiques",
      "Infections de l'immunodéprimé",
      "Sensibilité et résistance aux agents anti-infectieux",
      "Mécanismes de résistance aux agents anti-infectieux",
      "Bactérie — Neisseria gonorrhoeae & N. meningitidis",
      "Bactérie — Staphylococcus aureus",
      "Bactérie — Streptococcus pyogenes & S. agalactiae & S. pneumoniae",
      "Bactérie — Escherichia coli",
      "Bactérie — Salmonella spp. & Shigella spp.",
      "Bactérie — Campylobacter jejuni & Helicobacter pylori",
      "Bactérie — Pseudomonas aeruginosa",
      "Bactérie — Haemophilus influenzae",
      "Bactérie — Clostridium difficile & Listeria monocytogenes",
      "Bactérie — Mycobacterium tuberculosis",
      "Bactérie — Treponema pallidum",
      "Bactérie — Chlamydia trachomatis",
      "Bactérie — Legionella pneumophila",
      "Virus — Herpes simplex virus (HSV)",
      "Virus — Cytomégalovirus (CMV)",
      "Virus — Entérovirus",
      "Virus — Rotavirus",
      "Virus — Papillomavirus (HPV)",
      "Virus — Virus de la grippe (Influenza)",
      "Virus — Virus de la rubéole",
      "Virus — VHA, VHB, VHC (hépatites virales)",
      "Virus — VIH",
    ]},
    { title:"Parasitoses et mycoses", items:[
      "Protozooses intestinales : amibiase, giardiose",
      "Trichomonose urogénitale",
      "Paludisme",
      "Toxoplasmose",
      "Leishmaniose à Leishmania infantum",
      "Helminthoses : fasciolose, bilharziose, téniasis, hydatidose, oxyurose, anguillulose",
      "Infections à levures : Candida albicans, Cryptococcus neoformans",
      "Infections à Aspergillus fumigatus",
      "Infections à dermatophytes",
      "Pneumocystose à Pneumocystis jirovecii",
    ]},
    { title:"Hématologie et Immunologie", items:[
      "Anémies carentielles. Anémies hémolytiques",
      "Polyglobulies",
      "Leucémie myéloïde chronique",
      "Hémophilies. Maladie de Willebrand",
      "Hémoglobinopathies : drépanocytose, thalassémies",
      "Myélome et dysglobulinémies monoclonales",
      "Leucémies aiguës et syndromes myélodysplasiques",
      "Hyperlymphocytoses : syndromes mononucléosiques, LLC, lymphomes",
      "Cytopénies médicamenteuses",
      "Thrombopénies",
      "Asthme et allergies",
      "Maladies auto-immunes : polyarthrite rhumatoïde et lupus systémique",
      "Déficits immunitaires congénitaux",
      "Exploration des réactions inflammatoires",
      "Diagnostic allongement TP et/ou TCA",
      "Surveillance biologique héparines et AVK",
      "Produits sanguins labiles",
    ]},
    { title:"Autres affections", items:[
      "Diabètes de types 1 et 2",
      "Hyperlipoprotéinémies",
      "Troubles de l'équilibre hydro-électrolytique",
      "Troubles de l'équilibre acido-basique",
      "Troubles du métabolisme osseux",
      "Cholestase, cytolyse hépatique, insuffisance hépatocellulaire",
      "Troubles du métabolisme du fer",
      "Insuffisances rénales, syndrome néphrotique",
      "Accidents coronariens aigus, insuffisance cardiaque",
      "Hyperuricémies",
      "Pancréatite aiguë",
      "Dysfonctionnements corticosurrénaliens",
      "Dysfonctionnements thyroïdiens",
      "Dénutrition protéino-énergétique",
      "Épilepsie, migraines, algies faciales — Alzheimer, Parkinson, SEP",
    ]},
    { title:"Génétique", items:[
      "Examen des caractéristiques génétiques d'une personne à des fins médicales",
      "Diagnostic prénatal des maladies génétiques",
    ]},
  ]},
  { section:"V — Sciences du Médicament", color:"#38b6f8", subsections:[
    { title:"Pharmacocinétique", items:[
      "Résorption, distribution, biotransformation, excrétion",
      "Facteurs influençant le sort des principes actifs",
      "Biodisponibilité : définition, méthodes d'étude, facteurs de variation",
      "Principaux paramètres pharmacocinétiques",
    ]},
    { title:"Mécanismes d'action", items:[
      "Cibles des médicaments, liaisons aux récepteurs, méthodes d'études",
      "Courbe effet-dose, DE50, marge thérapeutique",
    ]},
    { title:"Classes thérapeutiques", items:[
      "Médicaments affections neurologiques/neurodégénératives (épilepsie, migraines, Alzheimer, Parkinson, SEP)",
      "Antalgiques",
      "Antipsychotiques",
      "Anxiolytiques et médicaments des troubles du sommeil",
      "Antidépresseurs. Normothymiques",
      "Médicaments de l'insuffisance cardiaque",
      "Anti-angoreux",
      "Antihypertenseurs",
      "Diurétiques",
      "Médicaments des troubles de l'hémostase (anticoagulants, antiagrégants, thrombolytiques)",
      "Solutés de remplissage vasculaire",
      "Médicaments des troubles du rythme cardiaque",
      "Anti-asthmatiques et anti-allergiques",
      "Anti-inflammatoires",
      "Médicaments de la goutte",
      "Antidiabétiques oraux et insulines",
      "Sulfamides antibactériens",
      "β-lactames",
      "Macrolides et apparentés",
      "Cyclines",
      "Aminosides",
      "Glycopeptides",
      "Quinolones",
      "Antituberculeux",
      "Antirétroviraux",
      "Antiviraux (hépatites, grippe, herpès)",
      "Antifongiques par voie générale",
      "Antiprotozoaires et anthelminthiques intestinaux",
      "Antimalariques",
      "Médicaments de l'ulcère gastro-duodénal",
      "Anti-émétiques",
      "Immunosuppresseurs",
      "Facteurs de croissance hématopoïétiques. Cytokines et antagonistes",
      "Médicaments des dysfonctionnements thyroïdiens",
      "Normolipémiants",
      "Anticancéreux : classification, mécanismes, principes d'utilisation",
      "Médicaments de l'ostéoporose",
    ]},
    { title:"Toxicologie des médicaments", items:[
      "Méthodes d'évaluation de la toxicité d'un médicament",
      "Toxicologie systémique : hématologique, hépatique, rénale, cardiovasculaire, pulmonaire",
      "Toxicologie des psychotropes : lithium, benzodiazépines, carbamates, neuroleptiques, antidépresseurs",
      "Toxicologie des antalgiques : salicylés, paracétamol, morphinomimétiques",
      "Médicaments cardiotoxiques : digoxine, chloroquine",
      "Principes généraux du traitement des intoxications. Antidotes",
    ]},
    { title:"Formes galéniques", items:[
      "Stérilisation et conditionnement aseptique des médicaments",
      "Formes à libération conventionnelle (voies orale et parentérale)",
      "Formes à libération et/ou distribution modifiées",
      "Préparations de nutrition parentérale",
      "Formes destinées aux voies nasale et pulmonaire",
      "Formes destinées aux voies cutanée (y compris transdermique) et oculaire",
    ]},
    { title:"Médicaments biologiques", items:[
      "Médicaments dérivés du plasma : albumine, facteurs de l'hémostase, immunoglobulines",
      "Vaccins : hépatite B, ROR, tétanos, grippe",
      "Anticorps monoclonaux",
      "Cellules souches hématopoïétiques",
    ]},
  ]},
];

// ─── Storage / State ──────────────────────────────────────────────
const LS_KEY = "internat_prep_r4";
// Migre l'ancien format booléen {key:true/false} vers le nouveau format riche {key:{done,count,history}}
function migrateProgress(pp) {
  const out = {};
  Object.entries(pp||{}).forEach(([k,v]) => {
    if (typeof v === "boolean") out[k] = { done:v, count:v?1:0, history:v?[Date.now()]:[] };
    else out[k] = { done:!!v?.done, count:v?.count||0, history:v?.history||[] };
  });
  return out;
}
function loadState() {
  try {
    const s = JSON.parse(localStorage.getItem(LS_KEY)||"{}");
    return { subjects:s.subjects||[], extraCards:s.extraCards||[], programProgress:migrateProgress(s.programProgress), notes:s.notes||[], annales:s.annales||[], activity:s.activity||[], streak:s.streak||{count:0,lastDate:null}, objectives:s.objectives||{}, friends:s.friends||[], userName:s.userName||"", lastRoom:s.lastRoom||null, cardReviews:s.cardReviews||{}, pomodoroSessions:s.pomodoroSessions||[] };
  } catch { return { subjects:[],extraCards:[],programProgress:{},notes:[],annales:[],activity:[],streak:{count:0,lastDate:null},objectives:{},friends:[],userName:"",lastRoom:null,cardReviews:{},pomodoroSessions:[] }; }
}

// ─── ALGORITHME RÉPÉTITION ESPACÉE (SM-2 simplifié) ──────────────
function getNextReview(prev, correct) {
  const now = Date.now();
  if (!prev) return { interval: correct ? 1 : 0, ease: 2.5, due: now + (correct ? 86400000 : 600000), reps: correct ? 1 : 0 };
  let { interval, ease, reps } = prev;
  if (correct) {
    reps = (reps||0) + 1;
    interval = reps === 1 ? 1 : reps === 2 ? 3 : Math.round(interval * ease);
    ease = Math.max(1.3, ease + 0.1);
  } else {
    reps = 0; interval = 0; ease = Math.max(1.3, ease - 0.2);
  }
  return { interval, ease, reps, due: now + interval * 86400000 };
}

// ─── SUPABASE ─────────────────────────────────────────────────────
const SUPABASE_URL = "https://bdeqqvvlbqqbfopdrlet.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkZXFxdnZsYnFxYmZvcGRybGV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NzAxMjksImV4cCI6MjA5NDM0NjEyOX0.SgRcM_ZjcHOVQgiN3p5QswgsKHXOUWPGE_qfRh5D_T8";

const sb = {
  async query(table, filters={}) {
    let url = `${SUPABASE_URL}/rest/v1/${table}?`;
    Object.entries(filters).forEach(([k,v]) => url += `${k}=eq.${v}&`);
    url += "order=created_at.asc";
    const r = await fetch(url, { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } });
    return r.json();
  },
  async insert(table, data) {
    await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: "POST",
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify(data)
    });
  },
  async upsert(table, data) {
    await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: "POST",
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json", Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify(data)
    });
  }
};

// ─── COMPTE À REBOURS CONCOURS (14 décembre) ─────────────────────
const CONCOURS_DATE = (() => {
  const now = new Date();
  const passedThisYear = now.getMonth() > 11 || (now.getMonth() === 11 && now.getDate() > 14);
  const year = passedThisYear ? now.getFullYear() + 1 : now.getFullYear();
  return new Date(year, 11, 14, 8, 0, 0);
})();
function useCountdown(target) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 60000); return () => clearInterval(t); }, []);
  const diff = target.getTime() - now;
  const days = Math.max(0, Math.floor(diff / 86400000));
  const hours = Math.max(0, Math.floor((diff % 86400000) / 3600000));
  return { days, hours, passed: diff <= 0 };
}
function CountdownBadge() {
  const { days, hours, passed } = useCountdown(CONCOURS_DATE);
  const urgent = days <= 30;
  return (<div style={{display:"flex",alignItems:"center",gap:8,background:urgent?`linear-gradient(120deg,${C.accent2}22,${C.accent4}22)`:`linear-gradient(120deg,${C.accent}18,${C.accent5}18)`,border:`1px solid ${urgent?C.accent2:C.accent}55`,borderRadius:50,padding:"5px 14px",boxShadow:urgent?`0 0 14px ${C.accent2}33`:"none"}}>
    <span style={{fontSize:"0.85rem"}}>⏳</span>
    {passed
      ? <span style={{...S.mono,fontSize:"0.75rem",color:C.text2}}>Concours passé</span>
      : <span style={{...S.mono,fontSize:"0.75rem",color:urgent?C.accent2:C.text}}>
          <b style={{fontFamily:"'Syne',sans-serif",fontSize:"0.95rem",color:urgent?C.accent2:C.accent}}>J-{days}</b> ({hours}h) avant le concours
        </span>
    }
  </div>);
}

const QUOTES=[
  {text:"Le succès, c'est tomber sept fois et se relever huit.",author:"Proverbe japonais"},
  {text:"La douleur de la discipline est bien moindre que la douleur du regret.",author:"Jim Rohn"},
  {text:"L'internat ne se gagne pas en un jour. Il se gagne chaque jour.",author:"InternatPrep"},
  {text:"Chaque QCM raté est une leçon que tu n'oublieras jamais.",author:"InternatPrep"},
  {text:"Celui qui déplace les montagnes commence par enlever les petites pierres.",author:"Confucius"},
  {text:"La régularité bat le talent quand le talent ne travaille pas.",author:"Tim Notke"},
  {text:"Concentre-toi sur le progrès, pas sur la perfection.",author:"Bill Phillips"},
  {text:"Aujourd'hui difficile. Demain internat.",author:"InternatPrep"},
  {text:"Un pharmacien qui doute révise. Un pharmacien qui sait avance.",author:"InternatPrep"},
  {text:"Ce n'est pas parce que c'est difficile que nous n'osons pas — c'est parce que nous n'osons pas que c'est difficile.",author:"Sénèque"},
];

// ─── Shared styles ────────────────────────────────────────────────
const S = {
  card:(x={})=>({background:C.surface,border:`1px solid ${C.border}`,borderRadius:16,padding:20,boxShadow:"0 3px 16px rgba(140,100,200,0.08)",...x}),
  btn:(v="primary",sz="md")=>{
    const bg=v==="primary"?`linear-gradient(120deg,${C.accent},${C.accent6})`:v==="danger"?"transparent":v==="success"?"rgba(46,224,160,0.12)":"transparent";
    const col=v==="primary"?"#fff":v==="danger"?C.accent2:v==="success"?C.accent3:C.text2;
    const bd=v==="danger"?`1px solid ${C.accent2}`:v==="success"?`1px solid ${C.accent3}`:`1px solid ${C.border}`;
    return{background:bg,color:col,border:bd,borderRadius:8,padding:sz==="sm"?"4px 11px":"8px 16px",fontSize:sz==="sm"?"0.73rem":"0.82rem",fontWeight:500,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all 0.15s"};
  },
  inp:{background:C.surface2,border:`1px solid ${C.border}`,borderRadius:8,color:C.text,fontFamily:"'DM Sans',sans-serif",fontSize:"0.84rem",padding:"8px 12px",width:"100%",outline:"none"},
  lbl:{display:"block",fontSize:"0.7rem",color:C.text2,marginBottom:4,fontWeight:500},
  ttl:{fontFamily:"'Syne',sans-serif",fontSize:"1.45rem",fontWeight:700},
  sub:{fontSize:"0.78rem",color:C.text2,marginBottom:22},
  mono:{fontFamily:"'DM Mono',monospace"},
};

function Modal({open,onClose,title,children}){
  if(!open)return null;
  return(<div onClick={e=>e.target===e.currentTarget&&onClose()} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.78)",backdropFilter:"blur(6px)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
    <div style={S.card({width:"100%",maxWidth:440,padding:26})}>
      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.95rem",marginBottom:16}}>{title}</div>
      {children}
    </div>
  </div>);
}
function FG({label,children}){return <div style={{marginBottom:12}}><label style={S.lbl}>{label}</label>{children}</div>;}

// ─── DASHBOARD ────────────────────────────────────────────────────
function Dashboard({st}){
  const total=st.subjects.reduce((a,s)=>a+s.chapters.length,0);
  const studied=st.subjects.reduce((a,s)=>a+s.chapters.filter(c=>c.count>0).length,0);
  const allCards=[...CNG_CARDS,...(st.extraCards||[])];
  const totalProg=PROGRAM.reduce((a,sec)=>{if(sec.items)return a+sec.items.length;return a+(sec.subsections||[]).reduce((b,sub)=>b+sub.items.length,0);},0);
  const doneProg=Object.values(st.programProgress||{}).filter(p=>p&&p.done).length;
  const stats=[
    {val:st.subjects.length,label:"Matières",color:C.accent},
    {val:`${studied}/${total}`,label:"Chapitres vus",color:C.accent3},
    {val:`${doneProg}/${totalProg}`,label:"Programme CNG",color:"#38b6f8"},
    {val:st.annales.reduce((a,an)=>a+an.sessions.length,0),label:"Sessions annales",color:C.accent4},
    {val:allCards.length,label:"Flashcards CNG",color:C.accent2},
    {val:(st.streak?.count||0)+" 🔥",label:"Streak",color:C.accent4},
  ];
  return(<div>
    <div style={S.ttl}>Tableau de bord</div><div style={S.sub}>Vue d'ensemble de ta progression</div>
    <DashboardCountdownCard/>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(145px,1fr))",gap:12,marginBottom:22}}>
      {stats.map((s,i)=><div key={i} style={S.card()}><div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.7rem",fontWeight:800,color:s.color,lineHeight:1}}>{s.val}</div><div style={{fontSize:"0.73rem",color:C.text2,marginTop:4}}>{s.label}</div></div>)}
    </div>
    <div style={S.card()}>
      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,marginBottom:12,fontSize:"0.88rem"}}>Activité récente</div>
      {st.activity.length===0?<div style={{color:C.text2,fontSize:"0.8rem",textAlign:"center",padding:18}}>Aucune activité</div>
        :st.activity.slice(0,7).map((a,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 0",borderBottom:`1px solid ${C.border}22`}}><div style={{width:7,height:7,borderRadius:"50%",background:a.color,flexShrink:0}}/><div style={{flex:1,fontSize:"0.8rem"}}>{a.text}</div><div style={{fontSize:"0.68rem",color:C.text2,...S.mono}}>{a.time}</div></div>)}
    </div>
  </div>);
}
function DashboardCountdownCard(){
  const {days,hours,passed}=useCountdown(CONCOURS_DATE);
  const urgent=days<=30;
  return(<div style={S.card({marginBottom:16,background:`linear-gradient(120deg,${urgent?C.accent2:C.accent}14,${urgent?C.accent4:C.accent5}14)`,border:`1px solid ${urgent?C.accent2:C.accent}44`,display:"flex",alignItems:"center",gap:18})}>
    <div style={{fontSize:"2.2rem"}}>⏳</div>
    <div>
      {passed
        ?<div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.3rem"}}>Concours passé</div>
        :<><div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"2rem",color:urgent?C.accent2:C.accent,lineHeight:1}}>J-{days}</div>
          <div style={{fontSize:"0.78rem",color:C.text2,marginTop:2}}>({hours}h) avant le concours CNCI · 14 décembre</div></>
      }
    </div>
  </div>);
}

// ─── PROGRAMME ────────────────────────────────────────────────────
function ItemRow({keyId,label,done,count=0,lastDate,color,onToggleDone,onLogPass,onUnlogPass}){
  const tier = count===0?0:count<3?1:count<6?2:3;
  const badgeBg = tier===0?C.surface3:tier===1?`${color}25`:tier===2?`${color}55`:color;
  const badgeCol = tier===3?"#0a0a12":tier===0?C.text3:color;
  const badgeGlow = tier===3?`0 0 9px ${color}88`:"none";
  return(<div style={{display:"flex",alignItems:"flex-start",gap:6,padding:"5px 4px",borderRadius:6,marginBottom:1}}>
    <div onClick={()=>onToggleDone(keyId)} style={{width:17,height:17,borderRadius:5,border:`2px solid ${done?color:C.border}`,background:done?color:"none",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2,cursor:"pointer",transition:"all 0.13s"}}>
      {done&&<span style={{fontSize:"0.55rem",color:"#000",fontWeight:800}}>✓</span>}
    </div>
    <div onClick={()=>onToggleDone(keyId)} style={{fontSize:"0.81rem",color:done?C.text2:C.text,textDecoration:done?"line-through":"none",flex:1,lineHeight:1.45,cursor:"pointer"}}>{label}</div>
    <div title={lastDate?`Dernier passage : ${lastDate}`:"Jamais révisé"} style={{...S.mono,fontSize:"0.65rem",fontWeight:700,background:badgeBg,color:badgeCol,borderRadius:50,padding:"1px 7px",boxShadow:badgeGlow,minWidth:22,textAlign:"center",flexShrink:0,transition:"all 0.2s"}}>×{count}</div>
    <button onClick={(e)=>{e.stopPropagation();onUnlogPass(keyId);}} disabled={count===0} title="Retirer un passage (annuler un clic en trop)" style={{width:19,height:19,borderRadius:"50%",border:`1px solid ${count===0?C.border:C.accent2+"77"}`,background:"none",color:count===0?C.text3:C.accent2,cursor:count===0?"default":"pointer",opacity:count===0?0.4:1,fontSize:"0.7rem",lineHeight:1,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",padding:0,marginTop:1}}>−</button>
    <button onClick={(e)=>{e.stopPropagation();onLogPass(keyId);}} title="Ajouter un passage sur cette notion" style={{width:19,height:19,borderRadius:"50%",border:`1px solid ${color}77`,background:"none",color:color,cursor:"pointer",fontSize:"0.7rem",lineHeight:1,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",padding:0,marginTop:1}}>+</button>
  </div>);
}

function Programme({st,setSt}){
  const [search,setSearch]=useState("");
  const prog=st.programProgress||{};
  const toggleDone=(key)=>setSt(prev=>{
    const cur=prev.programProgress?.[key]||{done:false,count:0,history:[]};
    const programProgress={...prev.programProgress,[key]:{...cur,done:!cur.done}};
    const next={...prev,programProgress};localStorage.setItem(LS_KEY,JSON.stringify(next));return next;
  });
  const logPass=(key)=>setSt(prev=>{
    const cur=prev.programProgress?.[key]||{done:false,count:0,history:[]};
    const history=[...(cur.history||[]),Date.now()].slice(-30);
    const programProgress={...prev.programProgress,[key]:{...cur,count:(cur.count||0)+1,history}};
    const next={...prev,programProgress};localStorage.setItem(LS_KEY,JSON.stringify(next));return next;
  });
  const unlogPass=(key)=>setSt(prev=>{
    const cur=prev.programProgress?.[key]||{done:false,count:0,history:[]};
    if((cur.count||0)<=0)return prev;
    const history=(cur.history||[]).slice(0,-1);
    const programProgress={...prev.programProgress,[key]:{...cur,count:cur.count-1,history}};
    const next={...prev,programProgress};localStorage.setItem(LS_KEY,JSON.stringify(next));return next;
  });
  const totalItems=PROGRAM.reduce((a,sec)=>{if(sec.items)return a+sec.items.length;return a+(sec.subsections||[]).reduce((b,sub)=>b+sub.items.length,0);},0);
  const doneItems=Object.values(prog).filter(p=>p&&p.done).length;
  const totalPasses=Object.values(prog).reduce((a,p)=>a+(p?.count||0),0);
  const globalPct=totalItems?Math.round(doneItems/totalItems*100):0;
  const match=(t)=>!search||t.toLowerCase().includes(search.toLowerCase());
  const fmtDate=(ts)=>ts?new Date(ts).toLocaleDateString("fr-FR",{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"}):null;
  return(<div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:6,flexWrap:"wrap",gap:12}}>
      <div><div style={S.ttl}>Programme CNG</div><div style={S.sub}>Coche chaque notion maîtrisée, et ajoute un passage (+) à chaque révision · 5 sections officielles</div></div>
      <div style={{display:"flex",gap:20}}>
        <div style={{textAlign:"right"}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.6rem",fontWeight:800,color:C.accent3}}>{globalPct}%</div>
          <div style={{fontSize:"0.7rem",color:C.text2,...S.mono}}>{doneItems}/{totalItems} notions</div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.6rem",fontWeight:800,color:C.accent4}}>{totalPasses}</div>
          <div style={{fontSize:"0.7rem",color:C.text2,...S.mono}}>passages total</div>
        </div>
      </div>
    </div>
    <div style={{height:5,background:C.surface2,borderRadius:50,marginBottom:20,overflow:"hidden"}}><div style={{height:"100%",width:`${globalPct}%`,background:`linear-gradient(90deg,${C.accent},${C.accent6},${C.accent3})`,borderRadius:50,transition:"width 0.4s"}}/></div>
    <input style={{...S.inp,marginBottom:18}} placeholder="🔍 Rechercher une notion..." value={search} onChange={e=>setSearch(e.target.value)}/>
    {PROGRAM.map((sec,si)=>{
      const secItems=sec.items?sec.items.map(item=>({key:`${si}_${item}`,item})):(sec.subsections||[]).flatMap((sub,subi)=>sub.items.map(item=>({key:`${si}_${subi}_${item}`,item})));
      const secDone=secItems.filter(({key})=>prog[key]?.done).length;
      const secPct=secItems.length?Math.round(secDone/secItems.length*100):0;
      const visible=secItems.filter(({item})=>match(item));
      if(search&&visible.length===0)return null;
      return(<div key={si} style={S.card({marginBottom:14,borderLeft:`3px solid ${sec.color}`,boxShadow:`0 0 26px ${sec.color}10`})}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.86rem",color:sec.color}}>{sec.section}</div>
          <div style={{display:"flex",gap:10}}><span style={{...S.mono,fontSize:"0.7rem",color:C.text2}}>{secDone}/{secItems.length}</span><span style={{...S.mono,fontSize:"0.7rem",color:sec.color}}>{secPct}%</span></div>
        </div>
        <div style={{height:2,background:C.surface2,borderRadius:50,marginBottom:12,overflow:"hidden"}}><div style={{height:"100%",width:`${secPct}%`,background:sec.color,borderRadius:50,transition:"width 0.4s"}}/></div>
        {sec.items
          ?sec.items.filter(item=>match(item)).map(item=>{const k=`${si}_${item}`;return <ItemRow key={k} keyId={k} label={item} done={!!prog[k]?.done} count={prog[k]?.count||0} lastDate={fmtDate(prog[k]?.history?.slice(-1)[0])} color={sec.color} onToggleDone={toggleDone} onLogPass={logPass} onUnlogPass={unlogPass}/>;})
          :(sec.subsections||[]).map((sub,subi)=>{
              const sv=sub.items.filter(item=>match(item));
              if(search&&sv.length===0)return null;
              const sd=sub.items.filter(item=>!!prog[`${si}_${subi}_${item}`]?.done).length;
              return(<div key={subi} style={{marginBottom:10}}>
                <div style={{fontSize:"0.72rem",color:C.text2,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:5,display:"flex",justifyContent:"space-between"}}><span>{sub.title}</span><span style={{...S.mono,color:sec.color}}>{sd}/{sub.items.length}</span></div>
                {sv.map(item=>{const k=`${si}_${subi}_${item}`;return <ItemRow key={k} keyId={k} label={item} done={!!prog[k]?.done} count={prog[k]?.count||0} lastDate={fmtDate(prog[k]?.history?.slice(-1)[0])} color={sec.color} onToggleDone={toggleDone} onLogPass={logPass} onUnlogPass={unlogPass}/>;})}
              </div>);
            })
        }
      </div>);
    })}
  </div>);
}

// ─── FLASHCARDS ───────────────────────────────────────────────────
function Flashcards({st,setSt}){
  const [filter,setFilter]=useState("due");
  const [idx,setIdx]=useState(0);
  const [flipped,setFlipped]=useState(false);
  const [score,setScore]=useState({ok:0,ko:0});
  const [showAdd,setShowAdd]=useState(false);
  const [form,setForm]=useState({cat:"",q:"",a:"",u:""});
  const [showUnits,setShowUnits]=useState(true);

  const allCards=[...CNG_CARDS,...(st.extraCards||[])];
  const reviews=st.cardReviews||{};
  const cats=[...new Set(allCards.map(c=>c.cat))];

  const dueCards=allCards.filter(c=>!reviews[c.id]||reviews[c.id].due<=Date.now());
  const filtered=filter==="due"?dueCards:filter==="all"?allCards:allCards.filter(c=>c.cat===filter);
  const card=filtered[Math.min(idx,filtered.length-1)];

  const setF=(f)=>{setFilter(f);setIdx(0);setFlipped(false);setScore({ok:0,ko:0});};
  const next=()=>{setIdx(i=>Math.min(i+1,filtered.length-1));setFlipped(false);};
  const prev=()=>{setIdx(i=>Math.max(i-1,0));setFlipped(false);};

  const mark=(ok)=>{
    if(!card)return;
    setScore(s=>ok?{...s,ok:s.ok+1}:{...s,ko:s.ko+1});
    setSt(prev=>{
      const cardReviews={...prev.cardReviews,[card.id]:getNextReview(prev.cardReviews?.[card.id],ok)};
      const next={...prev,cardReviews};localStorage.setItem(LS_KEY,JSON.stringify(next));return next;
    });
    if(filter==="due"){
      // enlève la carte courante si elle vient d'être vue
      setTimeout(()=>{setIdx(i=>Math.max(0,Math.min(i,filtered.length-2)));setFlipped(false);},300);
    } else next();
  };

  const addCard=()=>{
    if(!form.q.trim()||!form.a.trim())return;
    setSt(prev=>{const next={...prev,extraCards:[...(prev.extraCards||[]),{id:uid(),cat:form.cat||"Divers",q:form.q,a:form.a,u:form.u}]};localStorage.setItem(LS_KEY,JSON.stringify(next));return next;});
    setForm({cat:"",q:"",a:"",u:""});setShowAdd(false);
  };

  const mastered=allCards.filter(c=>reviews[c.id]&&reviews[c.id].reps>=5).length;

  return(<div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:14}}>
      <div><div style={S.ttl}>Flashcards CNG</div><div style={S.sub}>{allCards.length} valeurs · {dueCards.length} à réviser · {mastered} maîtrisées</div></div>
      <div style={{display:"flex",gap:7,alignItems:"center"}}>
        <button style={S.btn(showUnits?"success":"ghost","sm")} onClick={()=>setShowUnits(u=>!u)}>Unités {showUnits?"✓":"○"}</button>
        <button style={S.btn("primary","sm")} onClick={()=>setShowAdd(true)}>+ Carte</button>
      </div>
    </div>
    <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:18}}>
      <button style={S.btn(filter==="due"?"primary":"ghost","sm")} onClick={()=>setF("due")}>🔁 À réviser ({dueCards.length})</button>
      <button style={S.btn(filter==="all"?"primary":"ghost","sm")} onClick={()=>setF("all")}>Tout ({allCards.length})</button>
      {cats.map(c=><button key={c} style={S.btn(filter===c?"primary":"ghost","sm")} onClick={()=>setF(c)}>{c} ({allCards.filter(x=>x.cat===c).length})</button>)}
    </div>
    {filtered.length===0
      ?<div style={{textAlign:"center",padding:"50px 20px",color:C.text2}}>
          <div style={{fontSize:"3rem",marginBottom:12}}>🎉</div>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"1.1rem",marginBottom:6}}>Toutes les cartes sont à jour !</div>
          <div style={{fontSize:"0.8rem"}}>Reviens demain pour la prochaine session.</div>
        </div>
      :<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:18}}>
        <div onClick={()=>setFlipped(f=>!f)} style={{width:"100%",maxWidth:500,height:230,perspective:1000,cursor:"pointer"}}>
          <div style={{width:"100%",height:"100%",position:"relative",transformStyle:"preserve-3d",transition:"transform 0.45s cubic-bezier(0.4,0,0.2,1)",transform:flipped?"rotateY(180deg)":"rotateY(0)"}}>
            <div style={{position:"absolute",inset:0,backfaceVisibility:"hidden",borderRadius:18,background:`linear-gradient(135deg,${C.surface2},#ffffff)`,border:`1px solid ${C.accent}55`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px 20px",textAlign:"center",gap:10}}>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <div style={{fontSize:"0.66rem",...S.mono,color:C.accent,textTransform:"uppercase",letterSpacing:1.5,background:`${C.accent}18`,padding:"3px 12px",borderRadius:50}}>{card?.cat}</div>
                {reviews[card?.id]&&<div style={{fontSize:"0.62rem",color:C.text2,...S.mono}}>×{reviews[card?.id]?.reps||0}</div>}
              </div>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.1rem",fontWeight:700,lineHeight:1.4}}>{card?.q}</div>
              <div style={{fontSize:"0.7rem",color:C.text2}}>Clique pour révéler →</div>
            </div>
            <div style={{position:"absolute",inset:0,backfaceVisibility:"hidden",borderRadius:18,background:`linear-gradient(135deg,#e8fff5,#d8f7ea)`,border:`1px solid ${C.accent3}55`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px 20px",textAlign:"center",gap:8,transform:"rotateY(180deg)"}}>
              <div style={{fontSize:"0.66rem",...S.mono,color:C.accent3,textTransform:"uppercase",letterSpacing:1.5,background:`${C.accent3}18`,padding:"3px 12px",borderRadius:50}}>Réponse</div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:"1.45rem",fontWeight:600,color:C.accent3,lineHeight:1.3}}>{card?.a}</div>
              {showUnits&&card?.u&&card.u!=="—"&&<div style={{fontSize:"0.76rem",color:C.text2,...S.mono}}>{card.u}</div>}
            </div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <button onClick={prev} style={{width:36,height:36,borderRadius:"50%",border:`1px solid ${C.border}`,background:C.surface,color:C.text,cursor:"pointer",fontSize:"0.9rem"}}>←</button>
          <span style={{...S.mono,fontSize:"0.78rem",color:C.text2,minWidth:55,textAlign:"center"}}>{Math.min(idx+1,filtered.length)}/{filtered.length}</span>
          <button onClick={next} style={{width:36,height:36,borderRadius:"50%",border:`1px solid ${C.border}`,background:C.surface,color:C.text,cursor:"pointer",fontSize:"0.9rem"}}>→</button>
        </div>
        {flipped&&<div style={{display:"flex",gap:10}}>
          <button onClick={()=>mark(false)} style={S.btn("danger")}>✗ Raté</button>
          <button onClick={()=>mark(true)} style={S.btn("success")}>✓ Connu</button>
        </div>}
        {(score.ok+score.ko)>0&&<div style={{...S.mono,fontSize:"0.76rem",color:C.text2}}><span style={{color:C.accent3}}>{score.ok}</span> connus · <span style={{color:C.accent2}}>{score.ko}</span> à retravailler · algorithme SR actif</div>}
      </div>
    }
    <Modal open={showAdd} onClose={()=>setShowAdd(false)} title="Nouvelle flashcard personnalisée">
      <FG label="Catégorie"><input style={S.inp} value={form.cat} onChange={e=>setForm(f=>({...f,cat:e.target.value}))} placeholder="ex: Hématologie"/></FG>
      <FG label="Question"><input style={S.inp} value={form.q} onChange={e=>setForm(f=>({...f,q:e.target.value}))} placeholder="ex: Hémoglobine normale homme"/></FG>
      <FG label="Réponse (valeur SI)"><input style={S.inp} value={form.a} onChange={e=>setForm(f=>({...f,a:e.target.value}))} placeholder="ex: 130–170 g/L"/></FG>
      <FG label="Unité alternative (optionnel)"><input style={S.inp} value={form.u} onChange={e=>setForm(f=>({...f,u:e.target.value}))} placeholder="ex: 13–17 g/dL"/></FG>
      <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:16}}>
        <button style={S.btn("ghost","sm")} onClick={()=>setShowAdd(false)}>Annuler</button>
        <button style={S.btn("primary","sm")} onClick={addCard}>Ajouter</button>
      </div>
    </Modal>
  </div>);
}

// ─── RÉVISIONS ────────────────────────────────────────────────────
function Revisions({st,setSt}){
  const [showAS,setShowAS]=useState(false);const [showAC,setShowAC]=useState(null);
  const [sName,setSName]=useState("");const [cName,setCName]=useState("");
  const [selCol,setSelCol]=useState(SUBJECT_COLORS[0]);const [exp,setExp]=useState({});
  const addAct=(text,color)=>setSt(prev=>({...prev,activity:[{text,color,time:todayStr(),id:uid()},...prev.activity].slice(0,20)}));
  const addSubj=()=>{if(!sName.trim())return;const subj={id:uid(),name:sName.trim(),color:selCol,chapters:[]};setSt(prev=>{const next={...prev,subjects:[...prev.subjects,subj]};localStorage.setItem(LS_KEY,JSON.stringify(next));return next;});addAct(`Matière : ${sName}`,selCol);setSName("");setShowAS(false);};
  const addCh=()=>{if(!cName.trim()||!showAC)return;setSt(prev=>{const subjects=prev.subjects.map(s=>s.id===showAC?{...s,chapters:[...s.chapters,{id:uid(),name:cName.trim(),count:0,lastStudied:null}]}:s);const next={...prev,subjects};localStorage.setItem(LS_KEY,JSON.stringify(next));return next;});setCName("");setShowAC(null);};
  const markStudied=(sId,cId)=>{setSt(prev=>{const today=new Date().toDateString(),yesterday=new Date(Date.now()-86400000).toDateString();let streak=prev.streak||{count:0,lastDate:null};if(streak.lastDate!==today)streak={count:streak.lastDate===yesterday?streak.count+1:1,lastDate:today};const subjects=prev.subjects.map(s=>s.id===sId?{...s,chapters:s.chapters.map(c=>c.id===cId?{...c,count:c.count+1,lastStudied:todayStr()}:c)}:s);const subj=prev.subjects.find(s=>s.id===sId),ch=subj?.chapters.find(c=>c.id===cId);const activity=[{text:`Révisé : ${ch?.name} (${subj?.name})`,color:subj?.color,time:todayStr(),id:uid()},...prev.activity].slice(0,20);const next={...prev,subjects,streak,activity};localStorage.setItem(LS_KEY,JSON.stringify(next));return next;});};
  const delCh=(sId,cId)=>setSt(prev=>{const subjects=prev.subjects.map(s=>s.id===sId?{...s,chapters:s.chapters.filter(c=>c.id!==cId)}:s);const next={...prev,subjects};localStorage.setItem(LS_KEY,JSON.stringify(next));return next;});
  const delSubj=(id)=>{if(!confirm("Supprimer ?"))return;setSt(prev=>{const next={...prev,subjects:prev.subjects.filter(s=>s.id!==id)};localStorage.setItem(LS_KEY,JSON.stringify(next));return next;});};
  return(<div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:20}}><div><div style={S.ttl}>Révisions</div><div style={S.sub}>Matières & chapitres travaillés</div></div><button style={S.btn()} onClick={()=>setShowAS(true)}>+ Matière</button></div>
    {st.subjects.length===0?<div style={{textAlign:"center",padding:"50px 20px",color:C.text2}}><div style={{fontSize:"2.5rem",opacity:0.3,marginBottom:10}}>📚</div>Ajoute ta première matière</div>
      :<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
        {st.subjects.map(subj=>{const total=subj.chapters.length,studied=subj.chapters.filter(c=>c.count>0).length,pct=total?Math.round(studied/total*100):0,isExp=exp[subj.id]!==false;
          return(<div key={subj.id} style={S.card({borderColor:isExp?subj.color+"44":C.border})}>
            <div onClick={()=>setExp(p=>({...p,[subj.id]:!isExp}))} style={{display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer",marginBottom:isExp?12:0}}>
              <div style={{display:"flex",alignItems:"center",gap:9}}><div style={{width:9,height:9,borderRadius:"50%",background:subj.color}}/><span style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.88rem"}}>{subj.name}</span></div>
              <div style={{display:"flex",gap:8,alignItems:"center"}}><span style={{...S.mono,fontSize:"0.7rem",color:C.text2}}>{studied}/{total} · {pct}%</span><span style={{color:C.text3,fontSize:"0.65rem"}}>{isExp?"▲":"▼"}</span></div>
            </div>
            {isExp&&(<>
              <div style={{height:3,background:C.surface2,borderRadius:50,marginBottom:10,overflow:"hidden"}}><div style={{height:"100%",width:`${pct}%`,background:subj.color,borderRadius:50,transition:"width 0.4s"}}/></div>
              {subj.chapters.map(ch=>(<div key={ch.id} style={{display:"flex",alignItems:"center",gap:7,padding:"5px 0",borderBottom:`1px solid ${C.border}22`}}>
                <div style={{flex:1,fontSize:"0.81rem"}}>{ch.name}</div>
                {ch.lastStudied&&<span style={{fontSize:"0.65rem",color:C.text2}}>{ch.lastStudied}</span>}
                <span style={{...S.mono,fontSize:"0.68rem",color:C.text2,background:C.surface2,padding:"1px 6px",borderRadius:50}}>{ch.count}×</span>
                <button onClick={()=>markStudied(subj.id,ch.id)} style={{width:22,height:22,borderRadius:"50%",border:`1px solid ${C.accent3}44`,background:"none",color:C.accent3,cursor:"pointer",fontSize:"0.75rem"}}>✓</button>
                <button onClick={()=>delCh(subj.id,ch.id)} style={{width:22,height:22,border:"none",background:"none",color:C.text3,cursor:"pointer",fontSize:"0.72rem"}}>✕</button>
              </div>))}
              <button onClick={()=>setShowAC(subj.id)} style={{width:"100%",marginTop:8,padding:"5px",border:`1px dashed ${C.border}`,background:"none",color:C.text2,borderRadius:7,cursor:"pointer",fontSize:"0.76rem"}}>+ Chapitre</button>
              <div style={{textAlign:"right",marginTop:5}}><button onClick={()=>delSubj(subj.id)} style={S.btn("danger","sm")}>Supprimer</button></div>
            </>)}
          </div>);})}
      </div>}
    <Modal open={showAS} onClose={()=>setShowAS(false)} title="Nouvelle matière">
      <FG label="Nom"><input style={S.inp} value={sName} onChange={e=>setSName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addSubj()} placeholder="ex: Pharmacologie"/></FG>
      <FG label="Couleur"><div style={{display:"flex",gap:7,flexWrap:"wrap"}}>{SUBJECT_COLORS.map(c=><div key={c} onClick={()=>setSelCol(c)} style={{width:22,height:22,borderRadius:"50%",background:c,cursor:"pointer",border:selCol===c?"2px solid #fff":"2px solid transparent"}}/>)}</div></FG>
      <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:16}}><button style={S.btn("ghost","sm")} onClick={()=>setShowAS(false)}>Annuler</button><button style={S.btn("primary","sm")} onClick={addSubj}>Ajouter</button></div>
    </Modal>
    <Modal open={!!showAC} onClose={()=>setShowAC(null)} title="Nouveau chapitre">
      <FG label="Nom"><input style={S.inp} value={cName} onChange={e=>setCName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addCh()} placeholder="ex: Pharmacocinétique"/></FG>
      <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:16}}><button style={S.btn("ghost","sm")} onClick={()=>setShowAC(null)}>Annuler</button><button style={S.btn("primary","sm")} onClick={addCh}>Ajouter</button></div>
    </Modal>
  </div>);
}

// ─── NOTES ────────────────────────────────────────────────────────
function Notes({st,setSt}){
  const [sel,setSel]=useState(null);const [title,setTitle]=useState("");const [content,setContent]=useState("");
  const autoSave=useRef(null);
  const DIFF={easy:{label:"😌 Facile",color:C.accent3},medium:{label:"🤔 Moyen",color:C.accent4},hard:{label:"🔥 Difficile",color:C.accent2}};
  const create=()=>{const n={id:uid(),title:"Nouvelle note",content:"",difficulty:"medium",updatedAt:todayStr()};setSt(prev=>{const next={...prev,notes:[n,...prev.notes]};localStorage.setItem(LS_KEY,JSON.stringify(next));return next;});setSel(n.id);setTitle("Nouvelle note");setContent("");};
  const selectN=(n)=>{setSel(n.id);setTitle(n.title);setContent(n.content);};
  const onChange=(field,val)=>{if(field==="title")setTitle(val);else setContent(val);clearTimeout(autoSave.current);autoSave.current=setTimeout(()=>{setSt(prev=>{const notes=prev.notes.map(n=>n.id===sel?{...n,[field]:val,updatedAt:todayStr()}:n);const next={...prev,notes};localStorage.setItem(LS_KEY,JSON.stringify(next));return next;});},500);};
  const cycleDiff=()=>setSt(prev=>{const cycle={easy:"medium",medium:"hard",hard:"easy"};const notes=prev.notes.map(n=>n.id===sel?{...n,difficulty:cycle[n.difficulty]}:n);const next={...prev,notes};localStorage.setItem(LS_KEY,JSON.stringify(next));return next;});
  const del=(id)=>{if(!confirm("Supprimer ?"))return;setSt(prev=>{const next={...prev,notes:prev.notes.filter(n=>n.id!==id)};localStorage.setItem(LS_KEY,JSON.stringify(next));return next;});if(sel===id)setSel(null);};
  const sNote=st.notes.find(n=>n.id===sel);
  return(<div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:20}}><div><div style={S.ttl}>Bloc-notes</div><div style={S.sub}>Notions difficiles & mémos</div></div><button style={S.btn()} onClick={create}>+ Note</button></div>
    <div style={{display:"grid",gridTemplateColumns:"210px 1fr",gap:14,minHeight:460}}>
      <div style={{display:"flex",flexDirection:"column",gap:3}}>
        {st.notes.length===0?<div style={{color:C.text2,fontSize:"0.78rem",textAlign:"center",padding:18}}>Aucune note</div>
          :st.notes.map(n=>{const d=DIFF[n.difficulty];return(<div key={n.id} onClick={()=>selectN(n)} style={{padding:"9px 11px",borderRadius:9,cursor:"pointer",border:`1px solid ${sel===n.id?C.accent:C.border}`,background:sel===n.id?C.surface:"transparent"}}>
            <div style={{fontSize:"0.81rem",fontWeight:500,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{n.title}</div>
            <div style={{display:"flex",gap:5,marginTop:2,alignItems:"center"}}><span style={{color:d.color,fontSize:"0.6rem"}}>●</span><span style={{fontSize:"0.66rem",color:C.text2}}>{n.updatedAt}</span></div>
          </div>);})}
      </div>
      <div style={S.card({display:"flex",flexDirection:"column",minHeight:400})}>
        {!sNote?<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flex:1,color:C.text2,gap:8}}><div style={{fontSize:"2rem",opacity:0.3}}>📝</div><div style={{fontSize:"0.81rem"}}>Sélectionne ou crée une note</div></div>
          :<>
            <div style={{display:"flex",gap:8,alignItems:"center",paddingBottom:11,borderBottom:`1px solid ${C.border}`,marginBottom:11}}>
              <input style={{...S.inp,fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.93rem",border:"none",padding:0,background:"none",flex:1}} value={title} onChange={e=>onChange("title",e.target.value)} placeholder="Titre..."/>
              <button onClick={cycleDiff} style={{...S.btn("ghost","sm"),border:`1px solid ${DIFF[sNote.difficulty].color}44`,color:DIFF[sNote.difficulty].color,flexShrink:0,fontSize:"0.7rem"}}>{DIFF[sNote.difficulty].label}</button>
              <button onClick={()=>del(sel)} style={{...S.btn("danger","sm"),flexShrink:0}}>✕</button>
            </div>
            <textarea style={{...S.inp,flex:1,border:"none",padding:0,background:"none",resize:"none",lineHeight:1.7,fontSize:"0.83rem",minHeight:280}} value={content} onChange={e=>onChange("content",e.target.value)} placeholder="Mécanismes, erreurs récurrentes, notions difficiles..."/>
            <div style={{fontSize:"0.66rem",color:C.text2,marginTop:7,paddingTop:7,borderTop:`1px solid ${C.border}`}}>Mis à jour : {sNote.updatedAt}</div>
          </>}
      </div>
    </div>
  </div>);
}

// ─── ANNALES ──────────────────────────────────────────────────────
function Annales({st,setSt}){
  const [showAdd,setShowAdd]=useState(false);const [showSes,setShowSes]=useState(null);
  const [form,setForm]=useState({year:"",subject:"",comment:""});const [sf,setSf]=useState({score:"",time:"",notes:""});
  const addA=()=>{if(!form.year||!form.subject)return;setSt(prev=>{const next={...prev,annales:[...prev.annales,{id:uid(),...form,sessions:[],createdAt:todayStr()}]};localStorage.setItem(LS_KEY,JSON.stringify(next));return next;});setForm({year:"",subject:"",comment:""});setShowAdd(false);};
  const logS=()=>{setSt(prev=>{const annales=prev.annales.map(a=>a.id===showSes?{...a,sessions:[...a.sessions,{...sf,date:todayStr(),id:uid()}]}:a);const next={...prev,annales};localStorage.setItem(LS_KEY,JSON.stringify(next));return next;});setSf({score:"",time:"",notes:""});setShowSes(null);};
  const delA=(id)=>{if(!confirm("Supprimer ?"))return;setSt(prev=>{const next={...prev,annales:prev.annales.filter(a=>a.id!==id)};localStorage.setItem(LS_KEY,JSON.stringify(next));return next;});};
  return(<div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:20}}><div><div style={S.ttl}>Annales</div><div style={S.sub}>Suivi des sessions par année</div></div><button style={S.btn()} onClick={()=>setShowAdd(true)}>+ Annale</button></div>
    {st.annales.length===0?<div style={{textAlign:"center",padding:"50px 20px",color:C.text2}}><div style={{fontSize:"2.5rem",opacity:0.3,marginBottom:10}}>📋</div>Ajoute tes premières annales</div>
      :<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:14}}>
        {st.annales.map(a=>{const count=a.sessions.length,ws=a.sessions.filter(s=>s.score),avg=ws.length?Math.round(ws.reduce((s,x)=>s+Number(x.score),0)/ws.length):null;
          return(<div key={a.id} style={S.card()}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:9}}><div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.35rem",fontWeight:800,color:C.accent4}}>{a.year}</div><div style={{display:"flex",gap:5}}><button style={S.btn("primary","sm")} onClick={()=>setShowSes(a.id)}>+ Session</button><button style={S.btn("danger","sm")} onClick={()=>delA(a.id)}>✕</button></div></div>
            <div style={{fontSize:"0.78rem",color:C.text2,marginBottom:7}}>{a.subject}</div>
            {a.comment&&<div style={{fontSize:"0.72rem",color:C.text2,marginBottom:7,fontStyle:"italic"}}>{a.comment}</div>}
            <div style={{display:"flex",gap:18,paddingTop:9,borderTop:`1px solid ${C.border}`}}>
              <div><div style={{...S.mono,fontSize:"0.9rem"}}>{count}</div><div style={{fontSize:"0.66rem",color:C.text2,textTransform:"uppercase",letterSpacing:"0.5px"}}>Sessions</div></div>
              <div><div style={{...S.mono,fontSize:"0.9rem",color:C.accent3}}>{avg!==null?avg+"%":"—"}</div><div style={{fontSize:"0.66rem",color:C.text2,textTransform:"uppercase",letterSpacing:"0.5px"}}>Moy.</div></div>
            </div>
            {a.sessions.slice(-3).reverse().map((ses,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",fontSize:"0.7rem",padding:"3px 7px",background:C.surface2,borderRadius:5,marginTop:4,...S.mono,color:C.text2}}><span>{ses.date}</span><span>{ses.score?ses.score+"%":"—"}</span><span>{ses.time?ses.time+"min":"—"}</span></div>)}
          </div>);})}
      </div>}
    <Modal open={showAdd} onClose={()=>setShowAdd(false)} title="Nouvelle annale">
      <FG label="Année"><input style={S.inp} type="number" value={form.year} onChange={e=>setForm(f=>({...f,year:e.target.value}))} placeholder="2023"/></FG>
      <FG label="Matière"><input style={S.inp} value={form.subject} onChange={e=>setForm(f=>({...f,subject:e.target.value}))} placeholder="ex: Pharmacologie"/></FG>
      <FG label="Commentaire"><textarea style={{...S.inp,minHeight:55,resize:"none"}} value={form.comment} onChange={e=>setForm(f=>({...f,comment:e.target.value}))} placeholder="Thèmes, difficultés..."/></FG>
      <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:16}}><button style={S.btn("ghost","sm")} onClick={()=>setShowAdd(false)}>Annuler</button><button style={S.btn("primary","sm")} onClick={addA}>Ajouter</button></div>
    </Modal>
    <Modal open={!!showSes} onClose={()=>setShowSes(null)} title="Enregistrer une session">
      <FG label="Score (%)"><input style={S.inp} type="number" value={sf.score} onChange={e=>setSf(f=>({...f,score:e.target.value}))} min="0" max="100" placeholder="72"/></FG>
      <FG label="Durée (min)"><input style={S.inp} type="number" value={sf.time} onChange={e=>setSf(f=>({...f,time:e.target.value}))} placeholder="45"/></FG>
      <FG label="Notes"><input style={S.inp} value={sf.notes} onChange={e=>setSf(f=>({...f,notes:e.target.value}))} placeholder="Observations..."/></FG>
      <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:16}}><button style={S.btn("ghost","sm")} onClick={()=>setShowSes(null)}>Annuler</button><button style={S.btn("primary","sm")} onClick={logS}>Enregistrer</button></div>
    </Modal>
  </div>);
}

// ─── MOTIVATION ───────────────────────────────────────────────────
function Motivation({st,setSt}){
  const quote=QUOTES[(new Date().getDate()+new Date().getMonth()*31)%QUOTES.length];
  const streak=st.streak?.count||0;
  const week=getWeekKey();const objs=st.objectives?.[week]||[];const done=objs.filter(o=>o.done).length;
  const [newObj,setNewObj]=useState("");
  const total=st.subjects.reduce((a,s)=>a+s.chapters.length,0),studied=st.subjects.reduce((a,s)=>a+s.chapters.filter(c=>c.count>0).length,0);
  const totalProg=PROGRAM.reduce((a,sec)=>{if(sec.items)return a+sec.items.length;return a+(sec.subsections||[]).reduce((b,sub)=>b+sub.items.length,0);},0);
  const doneProg=Object.values(st.programProgress||{}).filter(p=>p&&p.done).length;
  const toggle=(id)=>setSt(prev=>{const w=getWeekKey();const objectives={...prev.objectives,[w]:(prev.objectives[w]||[]).map(o=>o.id===id?{...o,done:!o.done}:o)};const next={...prev,objectives};localStorage.setItem(LS_KEY,JSON.stringify(next));return next;});
  const addO=()=>{if(!newObj.trim())return;setSt(prev=>{const w=getWeekKey();const objectives={...prev.objectives,[w]:[...(prev.objectives[w]||[]),{id:uid(),text:newObj.trim(),done:false}]};const next={...prev,objectives};localStorage.setItem(LS_KEY,JSON.stringify(next));return next;});setNewObj("");};
  const delO=(id)=>setSt(prev=>{const w=getWeekKey();const objectives={...prev.objectives,[w]:(prev.objectives[w]||[]).filter(o=>o.id!==id)};const next={...prev,objectives};localStorage.setItem(LS_KEY,JSON.stringify(next));return next;});
  return(<div>
    <div style={S.ttl}>Motivation</div><div style={S.sub}>Reste focus sur l'objectif</div>
    <div style={{background:"linear-gradient(135deg,#fff0f6,#f0e8ff)",border:`1px solid ${C.accent}44`,borderRadius:18,padding:"28px 24px",textAlign:"center",marginBottom:18}}>
      <div style={{fontSize:"0.66rem",...S.mono,color:C.accent,textTransform:"uppercase",letterSpacing:2,marginBottom:10}}>Citation du jour</div>
      <div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.1rem",fontWeight:700,lineHeight:1.5,marginBottom:8}}>"{quote.text}"</div>
      <div style={{fontSize:"0.78rem",color:C.accent}}>— {quote.author}</div>
    </div>
    <div style={{display:"flex",alignItems:"center",gap:14,background:`linear-gradient(90deg,${C.accent4}18,${C.accent4}08)`,border:`1px solid ${C.accent4}44`,borderRadius:14,padding:"15px 20px",marginBottom:18}}>
      <div style={{fontSize:"2.2rem"}}>🔥</div>
      <div><div style={{fontFamily:"'Syne',sans-serif",fontSize:"2.2rem",fontWeight:800,color:C.accent4,lineHeight:1}}>{streak}</div><div style={{fontSize:"0.76rem",color:C.text2}}>jour{streak>1?"s":""} de streak</div></div>
      <div style={{marginLeft:14,fontSize:"0.8rem",color:C.text2,flex:1}}>{streak===0?"Lance ton streak en cochant un chapitre !":streak<7?"Bon début, continue 💪":streak<30?"Impressionnant ! La régularité paye.":"🏆 Tu es une machine. Respecte."}</div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
      <div style={S.card()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}><div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.88rem"}}>🎯 Objectifs semaine</div><span style={{...S.mono,fontSize:"0.7rem",color:C.text2}}>{done}/{objs.length}</span></div>
        <div style={{fontSize:"0.66rem",color:C.text2,marginBottom:9,...S.mono}}>Semaine du {week}</div>
        {objs.length===0&&<div style={{color:C.text2,fontSize:"0.78rem",textAlign:"center",padding:"12px 0"}}>Aucun objectif</div>}
        {objs.map(o=><div key={o.id} style={{display:"flex",alignItems:"center",gap:9,padding:"6px 0",borderBottom:`1px solid ${C.border}22`}}>
          <div onClick={()=>toggle(o.id)} style={{width:18,height:18,borderRadius:5,border:`2px solid ${o.done?C.accent3:C.border}`,background:o.done?C.accent3:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.58rem",color:"#000",flexShrink:0}}>{o.done?"✓":""}</div>
          <div style={{flex:1,fontSize:"0.81rem",textDecoration:o.done?"line-through":"none",color:o.done?C.text2:C.text}}>{o.text}</div>
          <button onClick={()=>delO(o.id)} style={{background:"none",border:"none",color:C.text3,cursor:"pointer",fontSize:"0.72rem"}}>✕</button>
        </div>)}
        <div style={{display:"flex",gap:7,marginTop:10}}><input style={S.inp} value={newObj} onChange={e=>setNewObj(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addO()} placeholder="Ajouter un objectif..."/><button style={{...S.btn("primary","sm"),flexShrink:0}} onClick={addO}>+</button></div>
      </div>
      <div style={S.card()}>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.88rem",marginBottom:14}}>📊 Progression globale</div>
        {[["Chapitres vus",`${studied}/${total}`,C.accent3],["Programme CNG",`${doneProg}/${totalProg}`,"#38b6f8"],["Sessions annales",st.annales.reduce((a,an)=>a+an.sessions.length,0),C.accent4],["Flashcards",[...CNG_CARDS,...(st.extraCards||[])].length,C.accent2],["Streak",streak+" 🔥",C.accent4]].map(([l,v,c],i)=>(
          <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:`1px solid ${C.border}22`,fontSize:"0.81rem"}}><span style={{color:C.text2}}>{l}</span><span style={{...S.mono,color:c}}>{v}</span></div>
        ))}
        {total>0&&<><div style={{marginTop:12,fontSize:"0.73rem",color:C.text2,textAlign:"center"}}>Avancement cours : <span style={{color:C.accent3}}>{Math.round(studied/total*100)}%</span></div><div style={{height:4,background:C.surface2,borderRadius:50,marginTop:6}}><div style={{height:"100%",width:`${Math.round(studied/total*100)}%`,background:`linear-gradient(90deg,${C.accent},${C.accent3})`,borderRadius:50}}/></div></>}
      </div>
    </div>
  </div>);
}

// ─── POMODORO ─────────────────────────────────────────────────────
function Pomodoro({st,setSt}){
  const MODES=[{label:"Focus",min:25,color:C.accent},{label:"Pause courte",min:5,color:C.accent3},{label:"Pause longue",min:15,color:"#38b6f8"}];
  const [mode,setMode]=useState(0);
  const [seconds,setSeconds]=useState(MODES[0].min*60);
  const [running,setRunning]=useState(false);
  const [sessions,setSessions]=useState(0);
  const intervalRef=useRef(null);
  const audioRef=useRef(null);

  const cur=MODES[mode];
  const pct=Math.round((1-seconds/(cur.min*60))*100);
  const fmt=(s)=>`${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

  const reset=(m)=>{clearInterval(intervalRef.current);setRunning(false);setMode(m);setSeconds(MODES[m].min*60);};
  const toggle=()=>{
    if(running){clearInterval(intervalRef.current);setRunning(false);}
    else{
      setRunning(true);
      intervalRef.current=setInterval(()=>{
        setSeconds(s=>{
          if(s<=1){
            clearInterval(intervalRef.current);setRunning(false);
            try{const a=new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAA...");a.play();}catch{}
            if(mode===0){
              setSessions(n=>n+1);
              setSt(prev=>{const ps=[...( prev.pomodoroSessions||[]),{date:todayStr(),id:uid()}];const next={...prev,pomodoroSessions:ps};localStorage.setItem(LS_KEY,JSON.stringify(next));return next;});
            }
            const next=(mode===0&&sessions%3===2)?2:mode===0?1:0;
            setTimeout(()=>reset(next),500);
            return 0;
          }
          return s-1;
        });
      },1000);
    }
  };
  useEffect(()=>()=>clearInterval(intervalRef.current),[]);

  const todaySessions=(st.pomodoroSessions||[]).filter(s=>s.date===todayStr()).length;
  const weekSessions=(st.pomodoroSessions||[]).filter(s=>{const d=new Date(s.date.split("/").reverse().join("-"));const now=new Date();const diff=(now-d)/86400000;return diff<7;}).length;

  const radius=80,circ=2*Math.PI*radius;

  return(<div>
    <div style={S.ttl}>Pomodoro</div><div style={S.sub}>Technique de concentration 25/5 min</div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
      <div style={S.card({display:"flex",flexDirection:"column",alignItems:"center",padding:32})}>
        {/* Mode selector */}
        <div style={{display:"flex",gap:6,marginBottom:28,background:C.surface2,padding:4,borderRadius:50}}>
          {MODES.map((m,i)=><button key={i} onClick={()=>reset(i)} style={{background:mode===i?m.color:"none",border:"none",color:mode===i?"#000":C.text2,fontFamily:"'DM Sans',sans-serif",fontSize:"0.73rem",fontWeight:600,padding:"4px 12px",borderRadius:50,cursor:"pointer"}}>{m.label}</button>)}
        </div>
        {/* Circle timer */}
        <div style={{position:"relative",width:200,height:200,marginBottom:24}}>
          <svg width="200" height="200" style={{transform:"rotate(-90deg)"}}>
            <circle cx="100" cy="100" r={radius} fill="none" stroke={C.surface2} strokeWidth="8"/>
            <circle cx="100" cy="100" r={radius} fill="none" stroke={cur.color} strokeWidth="8" strokeDasharray={circ} strokeDashoffset={circ*(1-pct/100)} strokeLinecap="round" style={{transition:"stroke-dashoffset 0.5s"}}/>
          </svg>
          <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:"2.8rem",fontWeight:700,color:cur.color,lineHeight:1}}>{fmt(seconds)}</div>
            <div style={{fontSize:"0.72rem",color:C.text2,marginTop:4}}>{cur.label}</div>
          </div>
        </div>
        {/* Controls */}
        <div style={{display:"flex",gap:10}}>
          <button onClick={()=>reset(mode)} style={{width:40,height:40,borderRadius:"50%",border:`1px solid ${C.border}`,background:C.surface2,color:C.text2,cursor:"pointer",fontSize:"0.9rem"}}>↺</button>
          <button onClick={toggle} style={{width:100,height:40,borderRadius:50,background:running?C.accent2:cur.color,border:"none",color:"#000",fontWeight:700,cursor:"pointer",fontSize:"0.9rem",fontFamily:"'DM Sans',sans-serif"}}>
            {running?"⏸ Pause":"▶ Start"}
          </button>
        </div>
        <div style={{marginTop:20,display:"flex",gap:6,flexWrap:"wrap",justifyContent:"center"}}>
          {Array.from({length:Math.max(sessions,4)}).map((_,i)=><div key={i} style={{width:12,height:12,borderRadius:"50%",background:i<sessions?C.accent4:C.surface2}}/>)}
        </div>
        <div style={{fontSize:"0.72rem",color:C.text2,marginTop:8}}>Session {sessions+1} · toutes les 4 sessions = pause longue</div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        <div style={S.card()}>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.88rem",marginBottom:14}}>📈 Mes sessions</div>
          {[["Aujourd'hui",todaySessions+" sessions",C.accent4],["Cette semaine",weekSessions+" sessions",C.accent3],["Total",(st.pomodoroSessions||[]).length+" sessions",C.accent],["Temps focus aujourd'hui",todaySessions*25+" min",C.accent2]].map(([l,v,c],i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${C.border}22`,fontSize:"0.82rem"}}><span style={{color:C.text2}}>{l}</span><span style={{fontFamily:"'DM Mono',monospace",color:c,fontWeight:600}}>{v}</span></div>
          ))}
        </div>
        <div style={S.card()}>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.88rem",marginBottom:12}}>💡 Méthode Pomodoro</div>
          {["25 min de travail intense, sans distraction","5 min de pause active (pas le téléphone 😉)","Toutes les 4 sessions → pause longue 15 min","Idéal : 8-12 sessions par jour de révision"].map((t,i)=>(
            <div key={i} style={{display:"flex",gap:9,padding:"5px 0",fontSize:"0.79rem",color:C.text2}}><span style={{color:cur.color,flexShrink:0}}>→</span>{t}</div>
          ))}
        </div>
      </div>
    </div>
  </div>);
}

// ─── STATISTIQUES ─────────────────────────────────────────────────
function Stats({st}){
  const allCards=[...CNG_CARDS,...(st.extraCards||[])];
  const reviews=st.cardReviews||{};
  const totalProg=PROGRAM.reduce((a,sec)=>{if(sec.items)return a+sec.items.length;return a+(sec.subsections||[]).reduce((b,sub)=>b+sub.items.length,0);},0);
  const doneProg=Object.values(st.programProgress||{}).filter(p=>p&&p.done).length;
  const totalPasses=Object.values(st.programProgress||{}).reduce((a,p)=>a+(p?.count||0),0);
  const total=st.subjects.reduce((a,s)=>a+s.chapters.length,0);
  const studied=st.subjects.reduce((a,s)=>a+s.chapters.filter(c=>c.count>0).length,0);
  const sessions=st.annales.flatMap(a=>a.sessions.filter(s=>s.score));
  const avgScore=sessions.length?Math.round(sessions.reduce((a,s)=>a+Number(s.score),0)/sessions.length):null;
  const pomToday=(st.pomodoroSessions||[]).filter(s=>s.date===todayStr()).length;

  // Progression par section CNG
  const secStats=PROGRAM.map(sec=>{
    const items=sec.items?sec.items:(sec.subsections||[]).flatMap(sub=>sub.items);
    const done=items.filter(item=>{const key=sec.items?`${PROGRAM.indexOf(sec)}_${item}`:`${PROGRAM.indexOf(sec)}_${(sec.subsections||[]).findIndex(sub=>sub.items.includes(item))}_${item}`;return st.programProgress?.[key]?.done;}).length;
    return{name:sec.section.split("—")[1]?.trim()||sec.section,done,total:items.length,color:sec.color,pct:items.length?Math.round(done/items.length*100):0};
  });

  // Cartes SR stats
  const dueNow=allCards.filter(c=>!reviews[c.id]||reviews[c.id].due<=Date.now()).length;
  const mastered=allCards.filter(c=>reviews[c.id]&&reviews[c.id].reps>=5).length;

  return(<div>
    <div style={S.ttl}>Statistiques</div><div style={S.sub}>Vue détaillée de ta progression</div>

    {/* KPIs */}
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:12,marginBottom:20}}>
      {[
        {val:`${Math.round(studied/Math.max(total,1)*100)}%`,label:"Cours avancés",color:C.accent3,sub:`${studied}/${total} chapitres`},
        {val:`${Math.round(doneProg/totalProg*100)}%`,label:"Programme CNG",color:"#38b6f8",sub:`${doneProg}/${totalProg} notions`},
        {val:avgScore!==null?avgScore+"%":"—",label:"Moy. annales",color:C.accent4,sub:`${sessions.length} sessions`},
        {val:dueNow,label:"Flashcards dues",color:C.accent2,sub:`${mastered} maîtrisées`},
        {val:pomToday,label:"Pomodoros aujourd'hui",color:C.accent,sub:`${pomToday*25} min focus`},
        {val:(st.streak?.count||0)+"🔥",label:"Streak actuel",color:C.accent4,sub:"jours consécutifs"},
        {val:totalPasses,label:"Passages programme",color:C.accent6,sub:"toutes notions confondues"},
      ].map((k,i)=><div key={i} style={S.card()}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.6rem",fontWeight:800,color:k.color,lineHeight:1}}>{k.val}</div>
        <div style={{fontSize:"0.73rem",color:C.text,marginTop:3,fontWeight:500}}>{k.label}</div>
        <div style={{fontSize:"0.66rem",color:C.text2,marginTop:1}}>{k.sub}</div>
      </div>)}
    </div>

    {/* Progression par section CNG */}
    <div style={S.card({marginBottom:14})}>
      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.88rem",marginBottom:16}}>📋 Progression par section CNG</div>
      {secStats.map((s,i)=><div key={i} style={{marginBottom:14}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
          <div style={{fontSize:"0.78rem",color:C.text,flex:1,paddingRight:10}}>{s.name}</div>
          <div style={{display:"flex",gap:10,alignItems:"center",flexShrink:0}}>
            <span style={{fontSize:"0.7rem",color:C.text2,fontFamily:"'DM Mono',monospace"}}>{s.done}/{s.total}</span>
            <span style={{fontSize:"0.72rem",fontWeight:700,color:s.color,fontFamily:"'DM Mono',monospace",minWidth:32,textAlign:"right"}}>{s.pct}%</span>
          </div>
        </div>
        <div style={{height:6,background:C.surface2,borderRadius:50,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${s.pct}%`,background:s.color,borderRadius:50,transition:"width 0.5s"}}/>
        </div>
      </div>)}
    </div>

    {/* Scores annales */}
    {sessions.length>0&&<div style={S.card({marginBottom:14})}>
      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.88rem",marginBottom:14}}>📚 Historique scores annales</div>
      <div style={{display:"flex",gap:4,alignItems:"flex-end",height:80}}>
        {sessions.slice(-20).map((s,i)=>{const pct=Number(s.score);const col=pct>=70?C.accent3:pct>=50?C.accent4:C.accent2;return(
          <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
            <div style={{fontSize:"0.55rem",color:col,fontFamily:"'DM Mono',monospace"}}>{pct}%</div>
            <div style={{width:"100%",background:col,borderRadius:"3px 3px 0 0",height:`${Math.max(pct*0.6,4)}px`,transition:"height 0.3s"}}/>
          </div>
        );})}
      </div>
      <div style={{fontSize:"0.66rem",color:C.text2,marginTop:8,textAlign:"center"}}>
        {sessions.length} sessions · Moy. <span style={{color:C.accent3}}>{avgScore}%</span> · 
        Meilleur <span style={{color:C.accent3}}>{Math.max(...sessions.map(s=>Number(s.score)))}%</span>
      </div>
    </div>}

    {/* Matières détail */}
    {st.subjects.length>0&&<div style={S.card()}>
      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.88rem",marginBottom:14}}>📅 Détail par matière</div>
      {st.subjects.map(subj=>{const t=subj.chapters.length,v=subj.chapters.filter(c=>c.count>0).length,pct=t?Math.round(v/t*100):0,passages=subj.chapters.reduce((a,c)=>a+c.count,0);
        return(<div key={subj.id} style={{marginBottom:12}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:5,alignItems:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:7}}><div style={{width:8,height:8,borderRadius:"50%",background:subj.color}}/><span style={{fontSize:"0.81rem",fontWeight:500}}>{subj.name}</span></div>
            <div style={{display:"flex",gap:12,fontSize:"0.7rem",color:C.text2,fontFamily:"'DM Mono',monospace"}}>
              <span>{v}/{t} ch.</span><span>{passages} passages</span><span style={{color:subj.color}}>{pct}%</span>
            </div>
          </div>
          <div style={{height:4,background:C.surface2,borderRadius:50,overflow:"hidden"}}><div style={{height:"100%",width:`${pct}%`,background:subj.color,borderRadius:50}}/></div>
        </div>);
      })}
    </div>}
  </div>);
}

// ─── SOCIAL ───────────────────────────────────────────────────────
function Social({st,setSt}){
  const [currentRoom,setCurrentRoom]=useState(st.lastRoom||null);
  const [messages,setMessages]=useState([]);const [msgInput,setMsgInput]=useState("");
  const [roomName,setRoomName]=useState("");const [joinCode,setJoinCode]=useState("");const [joinErr,setJoinErr]=useState("");
  const [friendCode,setFriendCode]=useState("");const [nameInput,setNameInput]=useState("");
  const messagesEnd=useRef(null);const pollRef=useRef(null);
  const uname=st.userName||"";
  const saveName=()=>{if(!nameInput.trim())return;setSt(prev=>{const next={...prev,userName:nameInput.trim()};localStorage.setItem(LS_KEY,JSON.stringify(next));return next;});};
  const genCode=()=>{const c="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";let s="";for(let i=0;i<6;i++)s+=c[Math.floor(Math.random()*c.length)];return s;};
  const pd=()=>{const t=st.subjects.reduce((a,s)=>a+s.chapters.length,0),v=st.subjects.reduce((a,s)=>a+s.chapters.filter(c=>c.count>0).length,0);return{name:uname,subjects:st.subjects.length,chapters:`${v}/${t}`,streak:st.streak?.count||0,pct:t?Math.round(v/t*100):0,date:todayStr()};};
  const copyProg=()=>{const code=btoa(JSON.stringify(pd()));navigator.clipboard.writeText(code).catch(()=>{});alert("Code copié !");};
  const addFriend=()=>{if(!friendCode.trim())return;try{const d=JSON.parse(atob(friendCode.trim()));setSt(prev=>{const friends=[...(prev.friends||[]).filter(f=>f.name!==d.name),{...d,id:uid()}];const next={...prev,friends};localStorage.setItem(LS_KEY,JSON.stringify(next));return next;});setFriendCode("");}catch{alert("Code invalide.");}};
  const remFriend=(id)=>setSt(prev=>{const next={...prev,friends:(prev.friends||[]).filter(f=>f.id!==id)};localStorage.setItem(LS_KEY,JSON.stringify(next));return next;});

  const loadMsgs=async(code)=>{
    try{const data=await sb.query("messages",{room_id:code});setMessages(data||[]);}catch(e){console.error(e);}
  };
  const enterRoom=async(code,name)=>{
    const room={code,name};setCurrentRoom(room);
    setSt(prev=>{const next={...prev,lastRoom:room};localStorage.setItem(LS_KEY,JSON.stringify(next));return next;});
    loadMsgs(code);
    if(pollRef.current)clearInterval(pollRef.current);
    pollRef.current=setInterval(()=>loadMsgs(code),4000);
  };
  const leaveRoom=()=>{if(pollRef.current)clearInterval(pollRef.current);setCurrentRoom(null);setMessages([]);setSt(prev=>{const next={...prev,lastRoom:null};localStorage.setItem(LS_KEY,JSON.stringify(next));return next;});};
  const createRoom=async()=>{
    if(!roomName.trim())return;
    const code=genCode();
    await sb.upsert("rooms",{id:code,name:roomName.trim(),creator:uname});
    enterRoom(code,roomName.trim());setRoomName("");
  };
  const joinRoom=async()=>{
    const code=joinCode.trim().toUpperCase();if(code.length<4)return;
    try{
      const data=await sb.query("rooms",{id:code});
      if(!data||data.length===0){setJoinErr("Room introuvable.");return;}
      enterRoom(code,data[0].name);setJoinCode("");setJoinErr("");
    }catch{setJoinErr("Erreur de connexion.");}
  };
  const sendMsg=async()=>{
    if(!msgInput.trim()||!currentRoom)return;
    const msg={id:uid(),room_id:currentRoom.code,author:uname,text:msgInput.trim(),time:new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}),date:todayStr()};
    setMessages(prev=>[...prev,msg]);setMsgInput("");
    await sb.insert("messages",msg);
  };
  useEffect(()=>{messagesEnd.current?.scrollIntoView({behavior:"smooth"});},[messages]);
  useEffect(()=>{if(currentRoom){loadMsgs(currentRoom.code);if(pollRef.current)clearInterval(pollRef.current);pollRef.current=setInterval(()=>loadMsgs(currentRoom.code),4000);}return()=>{if(pollRef.current)clearInterval(pollRef.current);};},[]);
  if(!uname)return(<div style={{maxWidth:380,margin:"70px auto",textAlign:"center"}}>
    <div style={{fontSize:"2.5rem",marginBottom:14}}>👋</div>
    <div style={S.ttl}>Comment tu t'appelles ?</div>
    <div style={{color:C.text2,fontSize:"0.83rem",margin:"8px 0 18px"}}>Ton prénom sera visible dans les rooms</div>
    <div style={{display:"flex",gap:7,justifyContent:"center"}}><input style={{...S.inp,maxWidth:190}} value={nameInput} onChange={e=>setNameInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&saveName()} placeholder="Ton prénom..."/><button style={S.btn()} onClick={saveName}>Continuer →</button></div>
  </div>);
  const friends=st.friends||[];
  return(<div>
    <div style={S.ttl}>Espace social</div><div style={S.sub}>Rooms privées & partage de progression</div>
    {currentRoom?(
      <div style={{display:"grid",gridTemplateColumns:"250px 1fr",gap:14}}>
        <div>
          <div style={S.card({marginBottom:14})}>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.88rem",marginBottom:12}}>🚪 Room active</div>
            <div style={{textAlign:"center",margin:"10px 0"}}><div style={{...S.mono,fontSize:"1.7rem",fontWeight:800,color:C.accent,letterSpacing:4}}>{currentRoom.code}</div><div style={{fontSize:"0.73rem",color:C.text2,marginTop:3}}>{currentRoom.name}</div></div>
            <button style={{...S.btn("ghost","sm"),width:"100%",marginBottom:7}} onClick={()=>{navigator.clipboard.writeText(currentRoom.code).catch(()=>{});alert("Code : "+currentRoom.code);}}>📋 Copier le code</button>
            <button style={{...S.btn("danger","sm"),width:"100%"}} onClick={leaveRoom}>Quitter la room</button>
            <div style={{fontSize:"0.66rem",color:C.text2,textAlign:"center",marginTop:9}}>Partage ce code à tes potes</div>
          </div>
          <div style={S.card()}>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.88rem",marginBottom:10}}>📊 Ma progression</div>
            {[["Avancement",pd().pct+"%",C.accent3],["Chapitres",pd().chapters,C.accent],["Streak",pd().streak+"🔥",C.accent4]].map(([l,v,c],i)=><div key={i} style={{display:"flex",justifyContent:"space-between",fontSize:"0.79rem",padding:"5px 0",borderBottom:`1px solid ${C.border}22`}}><span style={{color:C.text2}}>{l}</span><span style={{...S.mono,color:c}}>{v}</span></div>)}
            <button style={{...S.btn("primary","sm"),width:"100%",marginTop:10}} onClick={copyProg}>📋 Copier mon code</button>
          </div>
        </div>
        <div style={S.card({display:"flex",flexDirection:"column",height:510})}>
          <div style={{display:"flex",alignItems:"center",gap:9,paddingBottom:10,borderBottom:`1px solid ${C.border}`,marginBottom:10}}>
            <div style={{width:32,height:32,borderRadius:"50%",background:`linear-gradient(135deg,${C.accent3},#0ea5e9)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.95rem"}}>💬</div>
            <div><div style={{fontWeight:600,fontSize:"0.86rem"}}>{currentRoom.name}</div><div style={{fontSize:"0.66rem",color:C.accent3}}>● Room {currentRoom.code} · rafraîchit toutes les 4s</div></div>
          </div>
          <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:7}}>
            {messages.length===0?<div style={{textAlign:"center",color:C.text2,padding:"35px 20px",fontSize:"0.8rem"}}>Aucun message encore.<br/>Soyez les premiers à écrire 👋</div>
              :messages.map(m=>{const isMe=m.author===uname;return(<div key={m.id} style={{maxWidth:"78%",padding:"9px 13px",borderRadius:13,fontSize:"0.81rem",lineHeight:1.5,alignSelf:isMe?"flex-end":"flex-start",background:isMe?`${C.accent}28`:C.surface2,border:`1px solid ${isMe?C.accent+"44":C.border}`,borderBottomRightRadius:isMe?3:13,borderBottomLeftRadius:isMe?13:3}}>
                <div style={{fontSize:"0.66rem",marginBottom:2,color:isMe?C.accent:C.accent3,...S.mono}}>{isMe?"Toi":m.author} · {m.time}</div>
                {m.text}
              </div>);})}
            <div ref={messagesEnd}/>
          </div>
          <div style={{display:"flex",gap:7,marginTop:10,paddingTop:10,borderTop:`1px solid ${C.border}`}}>
            <textarea value={msgInput} onChange={e=>setMsgInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendMsg();}}} placeholder="Écris un message... (Entrée pour envoyer)" style={{...S.inp,flex:1,resize:"none",height:46,lineHeight:1.5}}/>
            <button onClick={sendMsg} style={{width:40,height:46,borderRadius:9,background:C.accent,border:"none",color:"#fff",fontSize:"1rem",cursor:"pointer"}}>➤</button>
          </div>
        </div>
      </div>
    ):(
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <div>
          <div style={S.card({marginBottom:14})}>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.88rem",marginBottom:12}}>🚪 Créer une room privée</div>
            <div style={{fontSize:"0.78rem",color:C.text2,marginBottom:12,lineHeight:1.6}}>Un code secret est généré. Seuls ceux qui ont le code peuvent rejoindre et lire les messages.</div>
            <FG label="Nom de la room"><input style={S.inp} value={roomName} onChange={e=>setRoomName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&createRoom()} placeholder="ex: Groupe pharma P4"/></FG>
            <button style={{...S.btn("primary"),width:"100%"}} onClick={createRoom}>✦ Créer la room</button>
          </div>
          <div style={S.card()}>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.88rem",marginBottom:12}}>🔑 Rejoindre une room</div>
            <FG label="Code (6 caractères)"><input style={{...S.inp,textTransform:"uppercase",letterSpacing:3,...S.mono,fontSize:"1rem"}} value={joinCode} onChange={e=>setJoinCode(e.target.value.toUpperCase())} onKeyDown={e=>e.key==="Enter"&&joinRoom()} placeholder="EX: KX7P2M"/></FG>
            {joinErr&&<div style={{color:C.accent2,fontSize:"0.73rem",marginBottom:7}}>{joinErr}</div>}
            <button style={{...S.btn("ghost"),width:"100%"}} onClick={joinRoom}>→ Rejoindre</button>
          </div>
        </div>
        <div>
          <div style={S.card({marginBottom:14})}>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.88rem",marginBottom:12}}>👥 Progressions de mes potes ({friends.length})</div>
            {friends.length===0?<div style={{color:C.text2,fontSize:"0.78rem",textAlign:"center",padding:"8px 0"}}>Aucun ami ajouté</div>
              :friends.map(f=><div key={f.id} style={{display:"flex",alignItems:"center",gap:9,padding:"7px 0",borderBottom:`1px solid ${C.border}22`}}>
                <div style={{width:30,height:30,borderRadius:"50%",background:`linear-gradient(135deg,${C.accent},#a78bfa)`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:"0.82rem",flexShrink:0}}>{(f.name||"?")[0].toUpperCase()}</div>
                <div style={{flex:1}}><div style={{fontWeight:500,fontSize:"0.81rem"}}>{f.name}</div><div style={{fontSize:"0.66rem",color:C.text2}}>{f.chapters} chapitres · {f.streak}🔥 · {f.date}</div></div>
                <div style={{...S.mono,fontSize:"0.73rem",color:C.accent3}}>{f.pct}%</div>
                <button onClick={()=>remFriend(f.id)} style={{background:"none",border:"none",color:C.text2,cursor:"pointer",fontSize:"0.78rem"}}>✕</button>
              </div>)}
            <div style={{marginTop:10}}>
              <label style={S.lbl}>Code d'un ami :</label>
              <div style={{display:"flex",gap:7}}><input style={S.inp} value={friendCode} onChange={e=>setFriendCode(e.target.value)} placeholder="Code de progression..."/><button style={{...S.btn("primary","sm"),flexShrink:0}} onClick={addFriend}>+</button></div>
            </div>
          </div>
          <div style={S.card()}>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.88rem",marginBottom:8}}>📤 Mon code de progression</div>
            <div style={{fontSize:"0.78rem",color:C.text2,marginBottom:10}}>Envoie ce code à tes potes pour partager ton avancement</div>
            <button style={{...S.btn("primary"),width:"100%"}} onClick={copyProg}>📋 Copier mon code</button>
          </div>
        </div>
      </div>
    )}
  </div>);
}

// ─── MULTI-ROOM SOCIAL ────────────────────────────────────────────
function MultiRoomSocial({st,setSt}){
  const [rooms,setRooms]=useState(()=>{try{return JSON.parse(localStorage.getItem("internat_rooms")||"[]");}catch{return [];}});
  const [activeRoom,setActiveRoom]=useState(null);
  const [msgsByRoom,setMsgsByRoom]=useState({});
  const [inputs,setInputs]=useState({});
  const [uploading,setUploading]=useState(false);
  const [showJoin,setShowJoin]=useState(false);
  const [showCreate,setShowCreate]=useState(false);
  const [newRoomName,setNewRoomName]=useState("");
  const [joinCode,setJoinCode]=useState("");
  const [joinErr,setJoinErr]=useState("");
  const [nameInput,setNameInput]=useState("");
  const pollRefs=useRef({});
  const fileRefs=useRef({});
  const messagesEnd=useRef(null);
  const uname=st.userName||"";

  const saveRooms=(r)=>{setRooms(r);localStorage.setItem("internat_rooms",JSON.stringify(r));};
  const saveName=()=>{if(!nameInput.trim())return;setSt(prev=>{const next={...prev,userName:nameInput.trim()};localStorage.setItem(LS_KEY,JSON.stringify(next));return next;});};
  const genCode=()=>{const c="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";let s="";for(let i=0;i<6;i++)s+=c[Math.floor(Math.random()*c.length)];return s;};
  const pd=()=>{const t=st.subjects.reduce((a,s)=>a+s.chapters.length,0),v=st.subjects.reduce((a,s)=>a+s.chapters.filter(c=>c.count>0).length,0);return{name:uname,subjects:st.subjects.length,chapters:`${v}/${t}`,streak:st.streak?.count||0,pct:t?Math.round(v/t*100):0,date:todayStr()};};
  const copyProg=()=>{const code=btoa(JSON.stringify(pd()));navigator.clipboard.writeText(code).catch(()=>{});alert("Code copié !");};

  const loadMsgs=async(code)=>{
    try{const data=await sb.query("messages",{room_id:code});setMsgsByRoom(prev=>({...prev,[code]:data||[]}));}catch{}
  };

  const startPoll=(code)=>{
    if(pollRefs.current[code])return;
    loadMsgs(code);
    pollRefs.current[code]=setInterval(()=>loadMsgs(code),4000);
  };
  const stopPoll=(code)=>{clearInterval(pollRefs.current[code]);delete pollRefs.current[code];};

  const joinRoomById=async(code,name)=>{
    const room={code,name};
    const already=rooms.find(r=>r.code===code);
    if(!already)saveRooms([...rooms,room]);
    setActiveRoom(code);
    startPoll(code);
  };

  const createRoom=async()=>{
    if(!newRoomName.trim())return;
    const code=genCode();
    await sb.upsert("rooms",{id:code,name:newRoomName.trim(),creator:uname});
    joinRoomById(code,newRoomName.trim());
    setNewRoomName("");setShowCreate(false);
  };

  const joinRoom=async()=>{
    const code=joinCode.trim().toUpperCase();if(code.length<4)return;
    try{
      const data=await sb.query("rooms",{id:code});
      if(!data||data.length===0){setJoinErr("Room introuvable.");return;}
      joinRoomById(code,data[0].name);
      setJoinCode("");setJoinErr("");setShowJoin(false);
    }catch{setJoinErr("Erreur de connexion.");}
  };

  const leaveRoom=(code)=>{
    stopPoll(code);
    const next=rooms.filter(r=>r.code!==code);
    saveRooms(next);
    if(activeRoom===code)setActiveRoom(next.length>0?next[0].code:null);
  };

  const sendMsg=async(code)=>{
    const text=(inputs[code]||"").trim();if(!text)return;
    const msg={id:uid(),room_id:code,author:uname,text,time:new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}),date:todayStr(),type:"text"};
    setMsgsByRoom(prev=>({...prev,[code]:[...(prev[code]||[]),msg]}));
    setInputs(prev=>({...prev,[code]:""}));
    await sb.insert("messages",msg);
  };

  const uploadFile=async(e,code)=>{
    const file=e.target.files[0];if(!file)return;
    if(file.size>10*1024*1024){alert("Max 10 Mo");return;}
    setUploading(true);
    try{
      const path=`${code}/${uid()}_${file.name}`;
      const res=await fetch(`${SUPABASE_URL}/storage/v1/object/chat-files/${path}`,{method:"POST",headers:{apikey:SUPABASE_KEY,Authorization:`Bearer ${SUPABASE_KEY}`,"Content-Type":file.type},body:file});
      if(!res.ok)throw new Error("Upload failed");
      const fileUrl=`${SUPABASE_URL}/storage/v1/object/public/chat-files/${path}`;
      const isImage=file.type.startsWith("image/");
      const msg={id:uid(),room_id:code,author:uname,text:fileUrl,file_name:file.name,type:isImage?"image":"file",time:new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}),date:todayStr()};
      setMsgsByRoom(prev=>({...prev,[code]:[...(prev[code]||[]),msg]}));
      await sb.insert("messages",msg);
    }catch(err){alert("Erreur : "+err.message);}
    setUploading(false);e.target.value="";
  };

  useEffect(()=>{messagesEnd.current?.scrollIntoView({behavior:"smooth"});},[msgsByRoom,activeRoom]);
  useEffect(()=>{rooms.forEach(r=>startPoll(r.code));return()=>Object.keys(pollRefs.current).forEach(stopPoll);},[]);

  if(!uname)return(<div style={{maxWidth:380,margin:"70px auto",textAlign:"center"}}>
    <div style={{fontSize:"2.5rem",marginBottom:14}}>👋</div>
    <div style={S.ttl}>Comment tu t'appelles ?</div>
    <div style={{color:C.text2,fontSize:"0.83rem",margin:"8px 0 18px"}}>Ton prénom sera visible dans les rooms</div>
    <div style={{display:"flex",gap:7,justifyContent:"center"}}><input style={{...S.inp,maxWidth:190}} value={nameInput} onChange={e=>setNameInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&saveName()} placeholder="Ton prénom..."/><button style={S.btn()} onClick={saveName}>Continuer →</button></div>
  </div>);

  const curMsgs=activeRoom?(msgsByRoom[activeRoom]||[]):[];
  const curRoom=rooms.find(r=>r.code===activeRoom);

  return(<div>
    <div style={S.ttl}>Espace social</div><div style={S.sub}>Rooms privées · partage de fichiers · multi-rooms</div>
    <div style={{display:"grid",gridTemplateColumns:"220px 1fr",gap:14,minHeight:520}}>
      {/* Sidebar rooms */}
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        <div style={{display:"flex",gap:5,marginBottom:4}}>
          <button style={{...S.btn("primary","sm"),flex:1}} onClick={()=>setShowCreate(true)}>+ Créer</button>
          <button style={{...S.btn("ghost","sm"),flex:1}} onClick={()=>setShowJoin(true)}>Rejoindre</button>
        </div>
        {rooms.length===0&&<div style={{color:C.text2,fontSize:"0.78rem",textAlign:"center",padding:"20px 0"}}>Aucune room.<br/>Crée ou rejoins-en une !</div>}
        {rooms.map(r=>{
          const unread=(msgsByRoom[r.code]||[]).length;
          return(<div key={r.code} onClick={()=>{setActiveRoom(r.code);startPoll(r.code);}} style={{padding:"9px 11px",borderRadius:10,cursor:"pointer",border:`1px solid ${activeRoom===r.code?C.accent:C.border}`,background:activeRoom===r.code?`${C.accent}18`:"transparent",display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:32,height:32,borderRadius:"50%",background:`linear-gradient(135deg,${C.accent},#a78bfa)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.82rem",fontWeight:700,flexShrink:0,color:"#fff"}}>{r.name[0].toUpperCase()}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:"0.81rem",fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{r.name}</div>
              <div style={{fontSize:"0.62rem",color:C.accent,...S.mono,letterSpacing:2}}>{r.code}</div>
            </div>
            <button onClick={e=>{e.stopPropagation();leaveRoom(r.code);}} style={{background:"none",border:"none",color:C.text3,cursor:"pointer",fontSize:"0.7rem",flexShrink:0}}>✕</button>
          </div>);
        })}
        <div style={{marginTop:"auto",paddingTop:10,borderTop:`1px solid ${C.border}`}}>
          <div style={{fontSize:"0.72rem",color:C.text2,marginBottom:6}}>Progression</div>
          <button style={{...S.btn("primary","sm"),width:"100%"}} onClick={copyProg}>📋 Copier mon code</button>
        </div>
      </div>

      {/* Chat area */}
      {!activeRoom
        ?<div style={S.card({display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10})}>
          <div style={{fontSize:"3rem",opacity:0.3}}>💬</div>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.95rem"}}>Sélectionne une room</div>
          <div style={{fontSize:"0.8rem",color:C.text2}}>ou crée-en une nouvelle</div>
        </div>
        :<div style={S.card({display:"flex",flexDirection:"column",height:520})}>
          <div style={{display:"flex",alignItems:"center",gap:9,paddingBottom:10,borderBottom:`1px solid ${C.border}`,marginBottom:10}}>
            <div style={{width:32,height:32,borderRadius:"50%",background:`linear-gradient(135deg,${C.accent3},#0ea5e9)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.95rem"}}>💬</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:600,fontSize:"0.86rem"}}>{curRoom?.name}</div>
              <div style={{fontSize:"0.66rem",color:C.accent3,...S.mono}}>● {activeRoom} · rafraîchit toutes les 4s</div>
            </div>
            <button onClick={()=>{navigator.clipboard.writeText(activeRoom).catch(()=>{});alert("Code : "+activeRoom);}} style={{...S.btn("ghost","sm"),fontSize:"0.7rem"}}>📋 Code</button>
          </div>
          <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:7}}>
            {curMsgs.length===0
              ?<div style={{textAlign:"center",color:C.text2,padding:"35px 20px",fontSize:"0.8rem"}}>Aucun message encore.<br/>Soyez les premiers à écrire 👋</div>
              :curMsgs.map(m=>{const isMe=m.author===uname;return(<div key={m.id} style={{maxWidth:"80%",padding:"9px 13px",borderRadius:13,fontSize:"0.81rem",lineHeight:1.5,alignSelf:isMe?"flex-end":"flex-start",background:isMe?`${C.accent}28`:C.surface2,border:`1px solid ${isMe?C.accent+"44":C.border}`,borderBottomRightRadius:isMe?3:13,borderBottomLeftRadius:isMe?13:3}}>
                <div style={{fontSize:"0.66rem",marginBottom:4,color:isMe?C.accent:C.accent3,...S.mono}}>{isMe?"Toi":m.author} · {m.time}</div>
                {m.type==="image"
                  ?<img src={m.text} alt={m.file_name} style={{maxWidth:"100%",maxHeight:220,borderRadius:8,display:"block",cursor:"pointer"}} onClick={()=>window.open(m.text,"_blank")}/>
                  :m.type==="file"
                  ?<a href={m.text} target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",gap:7,color:C.accent,textDecoration:"none",background:`${C.accent}18`,padding:"7px 10px",borderRadius:8}}>
                    <span style={{fontSize:"1.1rem"}}>📎</span>
                    <span style={{fontSize:"0.78rem",fontWeight:500}}>{m.file_name}</span>
                  </a>
                  :<span>{m.text}</span>
                }
              </div>);})}
            <div ref={messagesEnd}/>
          </div>
          <div style={{display:"flex",gap:7,marginTop:10,paddingTop:10,borderTop:`1px solid ${C.border}`}}>
            <input ref={el=>fileRefs.current[activeRoom]=el} type="file" accept="image/*,.pdf,.doc,.docx" style={{display:"none"}} onChange={e=>uploadFile(e,activeRoom)}/>
            <button onClick={()=>fileRefs.current[activeRoom]?.click()} style={{width:40,height:46,borderRadius:9,background:C.surface2,border:`1px solid ${C.border}`,color:uploading?C.accent4:C.text2,cursor:"pointer",fontSize:"1rem",flexShrink:0}}>{uploading?"⏳":"📎"}</button>
            <textarea value={inputs[activeRoom]||""} onChange={e=>setInputs(p=>({...p,[activeRoom]:e.target.value}))} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendMsg(activeRoom);}}} placeholder="Écris un message... (Entrée pour envoyer)" style={{...S.inp,flex:1,resize:"none",height:46,lineHeight:1.5}}/>
            <button onClick={()=>sendMsg(activeRoom)} style={{width:40,height:46,borderRadius:9,background:C.accent,border:"none",color:"#fff",fontSize:"1rem",cursor:"pointer",flexShrink:0}}>➤</button>
          </div>
        </div>
      }
    </div>

    {/* Modal créer */}
    <Modal open={showCreate} onClose={()=>setShowCreate(false)} title="Créer une room">
      <FG label="Nom de la room"><input style={S.inp} value={newRoomName} onChange={e=>setNewRoomName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&createRoom()} placeholder="ex: Groupe pharma P4"/></FG>
      <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:16}}><button style={S.btn("ghost","sm")} onClick={()=>setShowCreate(false)}>Annuler</button><button style={S.btn("primary","sm")} onClick={createRoom}>Créer</button></div>
    </Modal>

    {/* Modal rejoindre */}
    <Modal open={showJoin} onClose={()=>setShowJoin(false)} title="Rejoindre une room">
      <FG label="Code (6 caractères)"><input style={{...S.inp,textTransform:"uppercase",letterSpacing:3,...S.mono,fontSize:"1rem"}} value={joinCode} onChange={e=>setJoinCode(e.target.value.toUpperCase())} onKeyDown={e=>e.key==="Enter"&&joinRoom()} placeholder="EX: KX7P2M"/></FG>
      {joinErr&&<div style={{color:C.accent2,fontSize:"0.73rem",marginBottom:7}}>{joinErr}</div>}
      <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:16}}><button style={S.btn("ghost","sm")} onClick={()=>setShowJoin(false)}>Annuler</button><button style={S.btn("primary","sm")} onClick={joinRoom}>Rejoindre</button></div>
    </Modal>
  </div>);
}

// ─── APP ROOT ─────────────────────────────────────────────────────
const TABS=[
  {id:"dashboard",label:"🏠"},
  {id:"programme",label:"📋 Programme"},
  {id:"revisions",label:"📅 Révisions"},
  {id:"flashcards",label:"🃏 Flashcards"},
  {id:"notes",label:"📝 Notes"},
  {id:"annales",label:"📚 Annales"},
  {id:"stats",label:"📊 Stats"},
  {id:"pomodoro",label:"⏱️ Pomodoro"},
  {id:"motivation",label:"🔥 Motivation"},
  {id:"social",label:"👥 Social"},
];

export default function App(){
  const [tab,setTab]=useState("dashboard");
  const [st,setSt]=useState(()=>loadState());
  useEffect(()=>{localStorage.setItem(LS_KEY,JSON.stringify(st));},[st]);
  return(<div style={{fontFamily:"'DM Sans',sans-serif",background:C.bg,color:C.text,minHeight:"100vh",overflow:"hidden"}}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');
      *{box-sizing:border-box;}
      ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background:transparent;}::-webkit-scrollbar-thumb{background:#e0c8e8;border-radius:4px;}
      input::placeholder,textarea::placeholder{color:${C.text3};}
    `}</style>
    <header style={{padding:"11px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:14,flexWrap:"wrap",borderBottom:`1px solid ${C.border}`,background:"rgba(255,251,246,0.88)",backdropFilter:"blur(12px)",position:"sticky",top:0,zIndex:100}}>
      <div style={{display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.05rem",letterSpacing:"-0.5px"}}>Internat<span style={{background:`linear-gradient(90deg,${C.accent},${C.accent6},${C.accent5})`,WebkitBackgroundClip:"text",backgroundClip:"text",color:"transparent"}}>Prep</span></div>
        <CountdownBadge/>
      </div>
      <nav style={{display:"flex",gap:3,background:C.surface,padding:4,borderRadius:50,border:`1px solid ${C.border}`,flexWrap:"wrap"}}>
        {TABS.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{background:tab===t.id?`linear-gradient(120deg,${C.accent},${C.accent6})`:"none",border:"none",color:tab===t.id?"#fff":C.text2,fontFamily:"'DM Sans',sans-serif",fontSize:"0.75rem",fontWeight:500,padding:"5px 13px",borderRadius:50,cursor:"pointer",whiteSpace:"nowrap",boxShadow:tab===t.id?`0 2px 12px ${C.accent}55`:"none",transition:"all 0.15s"}}>{t.label}</button>)}
      </nav>
    </header>
    <main style={{maxWidth:1100,margin:"0 auto",padding:"24px 18px",overflowY:"auto",maxHeight:"calc(100vh - 52px)"}}>
      {tab==="dashboard"  &&<Dashboard st={st}/>}
      {tab==="programme"  &&<Programme st={st} setSt={setSt}/>}
      {tab==="revisions"  &&<Revisions st={st} setSt={setSt}/>}
      {tab==="flashcards" &&<Flashcards st={st} setSt={setSt}/>}
      {tab==="notes"      &&<Notes st={st} setSt={setSt}/>}
      {tab==="annales"    &&<Annales st={st} setSt={setSt}/>}
      {tab==="stats"      &&<Stats st={st}/>}
      {tab==="pomodoro"   &&<Pomodoro st={st} setSt={setSt}/>}
      {tab==="motivation" &&<Motivation st={st} setSt={setSt}/>}
      {tab==="social"     &&<MultiRoomSocial st={st} setSt={setSt}/>}
    </main>
  </div>);
}

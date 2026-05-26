import type { TopicId } from "./topics";

export type Difficulty = "leicht" | "mittel" | "schwer";

export type MCQOption = { label: string; correct: boolean };

export type QuizQuestion =
  | {
      id: string;
      kind: "mcq";
      difficulty: Difficulty;
      prompt: string;
      options: MCQOption[];
      /** allow multiple correct */
      multi?: boolean;
      explanation: string;
    }
  | {
      id: string;
      kind: "text";
      difficulty: Difficulty;
      prompt: string;
      explanation: string;
    };

export interface QuizCase {
  id: string;
  title: string;
  patient: string;
  topic: TopicId;
  difficulty: Difficulty;
  description: string;
  questions: QuizQuestion[];
}

/* ====================================================================
   MODE A — QUIZ (Claude-Style)
   Daten direkt aus "Claude_Pflegeassessment_Pruefungssimulation.pdf"
==================================================================== */

export const QUIZ_CASES: QuizCase[] = [
  {
    id: "c01",
    title: "Wunde am Unterschenkel",
    patient: "Herr Weber, 65 J.",
    topic: "herz",
    difficulty: "mittel",
    description:
      "Herr Weber kommt 4 Tage nach einer Bagatellverletzung beim Rasenmähen in die Notaufnahme. Die Wunde am rechten Unterschenkel ist geschwollen, gerötet, Fieber 38,5 °C, streifenförmige Rötung bis zur Leiste.",
    questions: [
      {
        id: "c01q1",
        kind: "text",
        difficulty: "mittel",
        prompt:
          "Um welche Verdachtsdiagnose könnte es sich handeln? Beschreiben Sie typische Symptome und Therapieoptionen.",
        explanation:
          "Verdachtsdiagnose: Erysipel (Wundrose) oder Lymphangitis. Typische Symptome: streifenförmige Rötung entlang der Lymphgefäße, druckdolente regionale Lymphknoten (inguinal), Fieber, Schmerzen, Schwellung, Überwärmung. Therapie: Ruhigstellung der betroffenen Extremität, Antibiotika (meist Penicillin bei Streptokokken), Herdsanierung (Wundversorgung), Hochlagerung des Beins.",
      },
      {
        id: "c01q2",
        kind: "mcq",
        difficulty: "leicht",
        multi: true,
        prompt: "Welche Symptome sind typisch für eine Lymphangitis?",
        options: [
          { label: "Streifenförmige Rötung entlang der Lymphgefäße", correct: true },
          { label: "Blässe und Kälte der Extremität", correct: false },
          { label: "Druckdolente regionale Lymphknoten", correct: true },
          { label: "Ödem nur an der Fußsohle", correct: false },
          { label: "Fieber und allgemeines Krankheitsgefühl", correct: true },
        ],
        explanation:
          "Streifenförmige Rötung, druckdolente regionale Lymphknoten sowie Fieber/Krankheitsgefühl sind typisch. Blässe und Kälte deuten eher auf eine arterielle Durchblutungsstörung (PAVK) hin.",
      },
      {
        id: "c01q3",
        kind: "text",
        difficulty: "mittel",
        prompt: "Nennen Sie mindestens 2 fallbezogene Pflegediagnosen für Herrn Weber.",
        explanation:
          "1. Akuter Schmerz (r/t entzündlichem Prozess, erkennbar an Schmerzäußerungen/Schonhaltung). 2. Gefahr einer Wundinfektion (r/t bestehender Wunde, geschwächter Hautbarriere). 3. Hyperthermie (r/t Infektion, Temp 38,5 °C). 4. Aktivitätsintoleranz (r/t Schmerzen/Entzündung).",
      },
      {
        id: "c01q4",
        kind: "text",
        difficulty: "schwer",
        prompt:
          "Welche Daten und Parameter erheben Sie im Rahmen der Untersuchung 'peripheres Gefäßsystem' bei Herrn Weber?",
        explanation:
          "INSPEKTION: Hautfarbe, Rötungsausdehnung, Wundstatus, Lymphknotenregionen, Ödeme, Varizen, Seitenvergleich. PALPATION: Hauttemperatur, Druckdolenz, Lymphknotenstatus (inguinal/popliteal), Arterienpulse (A. dorsalis pedis, tibialis post., poplitea, femoralis). AUSKULTATION: Gefäßgeräusche. DURCHBLUTUNG: ABI, Capillary Refill. VITALZEICHEN.",
      },
      {
        id: "c01q5",
        kind: "mcq",
        difficulty: "leicht",
        prompt: "Was beschreibt der ABI und welcher Wert gilt als pathologisch?",
        options: [
          { label: "Verhältnis Blutdruck Knöchel zu Blutdruck Arm – pathologisch <0,9", correct: true },
          { label: "Verhältnis Herzfrequenz zu Blutdruck – pathologisch >1,0", correct: false },
          { label: "Verhältnis Blutdruck Arm zu Knöchel – pathologisch <1,3", correct: false },
          { label: "Verhältnis SpO₂ zu HF – pathologisch <95%", correct: false },
        ],
        explanation:
          "ABI = RR Knöchel / RR Arm. <0,9 pathologisch (PAVK). Werte: >1,3 = Mediasklerose, 0,75–0,9 leichte PAVK, 0,5–0,75 mittelschwer, <0,5 schwer.",
      },
      {
        id: "c01q6",
        kind: "text",
        difficulty: "schwer",
        prompt:
          "Beschreiben Sie die Unterschiede zwischen Erysipel und tiefer Venenthrombose (TVT) hinsichtlich Symptomatik und Diagnostik.",
        explanation:
          "ERYSIPEL: Streptokokken; scharf begrenzte Rötung, Überwärmung, Schwellung, Fieber, Eintrittspforte. Diagn.: klinisch, CRP/Leukos, Wundabstrich. TVT: Virchow-Trias; Schwere-/Spannungsgefühl, Schwellung des ganzen Beins, Zyanose, Homans-Zeichen, Druckdolenz. Diagn.: Wells-Score, D-Dimere, Kompressionsultraschall. Komplikation TVT: Lungenembolie.",
      },
    ],
  },

  {
    id: "c02",
    title: "Schaufensterkrankheit",
    patient: "Frau Müller, 72 J.",
    topic: "herz",
    difficulty: "mittel",
    description:
      "Raucherin (40 py), DM 2. Beim Spazierengehen Stopp nach ~150 m wegen Wadenschmerz, in Ruhe Besserung. Füße blass, kalt, dystrophe Zehennägel.",
    questions: [
      {
        id: "c02q1",
        kind: "mcq",
        difficulty: "leicht",
        prompt: "In welchem PAVK-Stadium nach Fontaine befindet sich Frau Müller?",
        options: [
          { label: "I – Verengung ohne Beschwerden", correct: false },
          { label: "IIa – Gehstrecke >200 m", correct: false },
          { label: "IIb – Claudicatio, Gehstrecke <200 m", correct: true },
          { label: "III – Ruheschmerz", correct: false },
          { label: "IV – Nekrose/Ulkus", correct: false },
        ],
        explanation:
          "IIb: schmerzfreie Gehstrecke <200 m, Schmerz nur unter Belastung (Claudicatio intermittens).",
      },
      {
        id: "c02q2",
        kind: "text",
        difficulty: "mittel",
        prompt: "Beschreiben Sie Durchführung und Auswertung des Ratschow-Tests.",
        explanation:
          "DURCHFÜHRUNG: Rückenlage, beide Beine ~90° angehoben, 2 min aktive Fußbewegungen, danach Beine herunterhängen lassen. AUSWERTUNG: Normal Rötung <15 s. Pathologisch: verzögerte Rötung, anhaltende Blässe, Schmerzen → spricht für PAVK.",
      },
      {
        id: "c02q3",
        kind: "text",
        difficulty: "mittel",
        prompt: "Welche Risikofaktoren führten zur PAVK und welche Pathophysiologie liegt zugrunde?",
        explanation:
          "RF: Rauchen (stärkster!), DM 2, Alter, postmenopausal; allg.: Hypertonie, Hyperlipidämie, Adipositas. Pathoph.: Arteriosklerose → Plaques → Lumenverengung → Minderdurchblutung. Belastung erhöht O₂-Bedarf → ischämischer Schmerz unterhalb der Stenose.",
      },
      {
        id: "c02q4",
        kind: "mcq",
        difficulty: "leicht",
        prompt: "Welche Aussage trifft zur Abgrenzung PAVK vs. CVI zu?",
        options: [
          { label: "PAVK: blasse kalte Füße | CVI: Ödeme, braune Pigmentierung, Ulkus am Knöchel", correct: true },
          { label: "PAVK: Ödeme, warme Füße | CVI: blasse, kalte Füße", correct: false },
          { label: "PAVK: Ulkus am Knöchel | CVI: Ulkus an Zehen", correct: false },
          { label: "PAVK und CVI sind klinisch nicht zu unterscheiden", correct: false },
        ],
        explanation:
          "PAVK: blass/kalt, fehlende Pulse, Belastungs-/Ruheschmerz, Ulkus an Zehen. CVI: Ödeme, Stauungsdermatitis, Ulcus cruris am Knöchel, Varizen, Pulse erhalten.",
      },
      {
        id: "c02q5",
        kind: "text",
        difficulty: "schwer",
        prompt: "Formulieren Sie eine vollständige ISBAR-Übergabe für Frau Müller an den Arzt.",
        explanation:
          "I: Name, Abteilung; Anruf wegen Frau Müller, geb. ... S: Belastungsabhängige Wadenschmerzen nach ~150 m, Füße blass/kalt. B: 72 J., DM 2, 40 py. A: V.a. PAVK Stadium IIb, ABI/Ratschow stehen aus. R: Bitte um Evaluation, ABI, Doppler, ggf. Gefäßchirurgie.",
      },
    ],
  },

  {
    id: "c03",
    title: "Akute Brustschmerzen",
    patient: "Herr Schmidt, 58 J.",
    topic: "herz",
    difficulty: "schwer",
    description:
      "Hypertoniker, BMI 32. Plötzliche Brustschmerzen mit Druck, Ausstrahlung in linken Arm/Kiefer, Schweißausbruch, blass. RR 160/95, P 110, SpO₂ 94%, AF 22.",
    questions: [
      {
        id: "c03q1",
        kind: "text",
        difficulty: "schwer",
        prompt: "Verdachtsdiagnose und welche Sofortmaßnahmen leiten Sie ein?",
        explanation:
          "V.a. akuter Myokardinfarkt (wahrscheinlich STEMI). SOFORT: 1. Arzt/Notruf. 2. Oberkörper 30° hoch, Ruhe. 3. i.v.-Zugang. 4. O₂ bei SpO₂<95%. 5. Monitoring/EKG. 6. Nitro nach AO. 7. Labor (Troponin, CK-MB, BB, Gerinnung). 8. HK-Vorbereitung ('Zeit ist Muskel'). 9. Nüchtern lassen.",
      },
      {
        id: "c03q2",
        kind: "mcq",
        difficulty: "mittel",
        prompt: "Unterschied STEMI vs. NSTEMI?",
        options: [
          { label: "STEMI: kompletter Verschluss, ST-Hebung | NSTEMI: partiell, keine ST-Hebung, ↑ Troponin", correct: true },
          { label: "STEMI: partiell, keine Symptome | NSTEMI: kompletter Verschluss, ST-Senkung", correct: false },
          { label: "Unterscheiden sich nur in Therapie, nicht EKG", correct: false },
          { label: "STEMI: ↑ Troponin ohne EKG-Veränderung | NSTEMI: ST-Hebung mit niedrigem Troponin", correct: false },
        ],
        explanation:
          "STEMI: kompletter Koronarverschluss → ST-Hebung → sofortige Revaskularisation. NSTEMI: partieller Verschluss, keine ST-Hebung, Diagnose über Troponin-Anstieg.",
      },
      {
        id: "c03q3",
        kind: "text",
        difficulty: "mittel",
        prompt: "Nennen Sie mindestens 5 Vital Flags im kardialen Kontext.",
        explanation:
          "1. Kollaps/Synkope. 2. Neue Arrhythmie / starke Tachykardie. 3. Kaltschweißigkeit + Brustschmerz. 4. Schwere Dyspnoe. 5. Zyanose. 6. Bewusstseinsstörung. 7. Nicht stillbare Blutung. 8. Purpura. Bei Herrn Schmidt mehrere gleichzeitig!",
      },
      {
        id: "c03q4",
        kind: "mcq",
        difficulty: "leicht",
        prompt: "Welche Stelle wird bei der Herzauskultation zuerst beurteilt?",
        options: [
          { label: "Ableitung I", correct: false },
          { label: "Ableitung aVR", correct: false },
          { label: "Erb-Punkt (3. ICR links parasternal)", correct: true },
          { label: "Aortenklappe (2. ICR rechts)", correct: false },
        ],
        explanation:
          "Reihenfolge: Erb-Punkt → A (2. ICR rechts) → P (2. ICR links) → T (4. ICR rechts) → M (5. ICR links MCL).",
      },
      {
        id: "c03q5",
        kind: "text",
        difficulty: "schwer",
        prompt: "Beschreiben Sie Vorbereitung und Durchführung eines 12-Kanal-EKGs inkl. Elektrodenanlage.",
        explanation:
          "Material: EKG-Gerät, Klebe-/Saugelektroden, Spray, Rasierer. Patient: Oberkörper, Unterarme, Unterschenkel frei; Ruhe. Extremitäten: R rot=re. Arm, L gelb=li. Arm, F grün=li. Fuß, N schwarz=re. Fuß. Brustwand: C1 rot 4. ICR re. parasternal, C2 gelb 4. ICR li. parasternal, C3 grün zwischen C2/C4, C4 braun 5. ICR MCL, C5 schwarz vord. Axillarlinie auf Höhe C4, C6 violett mittl. Axillarlinie. Beschriften, Qualität prüfen, Saugelektroden desinfizieren.",
      },
    ],
  },

  {
    id: "c04",
    title: "Rückenschmerzen",
    patient: "Herr Bauer, 45 J.",
    topic: "bewegung",
    difficulty: "mittel",
    description:
      "Büroangestellter, seit 3 Tagen Rückenschmerzen mit Ausstrahlung in re. Bein (Außenseite Unterschenkel, Fußrücken), Kribbeln, Verstärkung bei Husten/Niesen. Schonhaltung.",
    questions: [
      {
        id: "c04q1",
        kind: "mcq",
        difficulty: "mittel",
        prompt: "Welche Nervenwurzel ist am wahrscheinlichsten betroffen?",
        options: [
          { label: "L3 – Oberschenkel ventromedial, Knie", correct: false },
          { label: "L4 – Oberschenkel ventrolateral, Unterschenkel ventromedial", correct: false },
          { label: "L5 – Oberschenkel dorsolateral, Unterschenkel ventrolateral, Fußrücken", correct: true },
          { label: "S1 – Oberschenkel dorsal, Unterschenkel dorsal, lateraler Fußrand", correct: false },
        ],
        explanation:
          "L5-Dermatom: Oberschenkel dorsolateral, Unterschenkel ventrolateral, Fußrücken. Kennmuskel: M. extensor hallucis longus. Häufig durch Bandscheibenvorfall LWK 4/5.",
      },
      {
        id: "c04q2",
        kind: "text",
        difficulty: "mittel",
        prompt: "Lasègue-Test: Durchführung, Zweck und Interpretation.",
        explanation:
          "Zweck: Reizung Ischiasnerv / Nervenwurzelkompression. Durchf.: Rückenlage, gestrecktes Bein passiv anheben. Positiv: Schmerz <60° mit Ausstrahlung ins Bein. 30–60° = wahrscheinl. Wurzelreizung. >60° unspezifisch.",
      },
      {
        id: "c04q3",
        kind: "mcq",
        difficulty: "leicht",
        multi: true,
        prompt: "Welche Red Flags bei Rückenschmerzen erfordern dringende Abklärung?",
        options: [
          { label: "Schmerzen, die bei Bewegung besser werden", correct: false },
          { label: "Störungen bei Miktion/Defäkation", correct: true },
          { label: "Morgendliche Steifheit", correct: false },
          { label: "Schmerzen nach langem Sitzen", correct: false },
          { label: "Motorische Ausfälle (Lähmungen)", correct: true },
        ],
        explanation:
          "Red Flags: Blasen-/Mastdarmstörung (Kaudasyndrom!), motor. Ausfälle, Sensibilitätsstörungen, Trauma, Fieber, ungeklärter Gewichtsverlust, Nachtschmerz, Tumor-Anamnese.",
      },
      {
        id: "c04q4",
        kind: "text",
        difficulty: "mittel",
        prompt: "Wichtigste Differenzialdiagnosen für Rückenschmerzen mit Beinausstrahlung?",
        explanation:
          "LRS (Bandscheibenvorfall), LVS (mechanisch, keine Ausstrahlung), LSS (Spondylose), Spinalkanalstenose, Piriformis-Syndrom, Aortenaneurysma, Pyelonephritis, Tumor/Metastasen.",
      },
      {
        id: "c04q5",
        kind: "text",
        difficulty: "leicht",
        prompt: "Welche Therapieempfehlungen geben Sie Herrn Bauer für den Alltag?",
        explanation:
          "Suffiziente Analgesie (Stufenschema), Physiotherapie, KEINE Bettruhe >2 Tage, Alltagsaktivitäten beibehalten, Wärme, Ergonomie am Arbeitsplatz, frühzeitige Rückkehr zur Aktivität. Bei motor. Ausfällen oder Blasen-/Mastdarmstörung sofort zum Arzt!",
      },
    ],
  },

  {
    id: "c05",
    title: "Sturz im Krankenhaus",
    patient: "Frau Hoffmann, 78 J.",
    topic: "notfall",
    difficulty: "mittel",
    description:
      "Tag 5 nach Hüft-OP. 6 Medikamente (Antihypertensiva, Diuretika, Schlafmittel). Leichte kognitive Einschränkung, sehbehindert. Wird am Boden gefunden.",
    questions: [
      {
        id: "c05q1",
        kind: "text",
        difficulty: "mittel",
        prompt: "Nennen Sie intrinsische und extrinsische Sturzrisikofaktoren.",
        explanation:
          "INTRINSISCH: Alter, Z.n. OP, kognitive Einschränkung, Sehbehinderung, Polypharmazie, Diuretika (Harndrang), Sedativa, orthost. Hypotonie, Muskelschwäche durch Liegen, vorheriges Sturzereignis. EXTRINSISCH: Bettgitter, schlechte Beleuchtung, fehlende Haltegriffe, zu hohes Bett, unpassendes Schuhwerk.",
      },
      {
        id: "c05q2",
        kind: "mcq",
        difficulty: "leicht",
        prompt: "Welches Instrument prüft Sturzrisiko anhand von 6 Items (Sturzanamnese, IV-Therapie, Gehstatus etc.)?",
        options: [
          { label: "STRATIFY", correct: false },
          { label: "Morse Fall Scale", correct: true },
          { label: "Timed Up and Go (TUG)", correct: false },
          { label: "5-Meter-Gehtest", correct: false },
        ],
        explanation:
          "Morse Fall Scale: 6 Items, Score 45–55 = erhöhtes Sturzrisiko. STRATIFY = 5 Ja/Nein. TUG misst Zeit. 5-m-Gehtest misst Geschwindigkeit.",
      },
      {
        id: "c05q3",
        kind: "text",
        difficulty: "schwer",
        prompt: "Frau Hoffmann liegt am Boden. Strukturiertes Vorgehen nach <c>ABCDE-Schema.",
        explanation:
          "<c>: kritische Blutungen stillen. A: Atemwege frei? Bewusstsein? B: Atmung, SpO₂. C: Puls/Carotis, RR, Hautfarbe. D: Bewusstsein (AVPU/GCS), Pupillen, Orientierung. E: vollständige Untersuchung, Wärmeerhalt – Hüfte (Fraktur?), Kopf, Extremitäten. Danach: Arzt, Dokumentation, Maßnahmen anpassen.",
      },
      {
        id: "c05q4",
        kind: "mcq",
        difficulty: "mittel",
        prompt: "Welches TUG-Ergebnis deutet auf erhebliche Mobilitätseinschränkung?",
        options: [
          { label: "Unter 14 s", correct: false },
          { label: "20–30 s", correct: false },
          { label: "Über 30 s", correct: true },
          { label: "Über 45 s", correct: false },
        ],
        explanation:
          "<14 s normal, 20–30 s leichte Einschränkung, >30 s erhebliche Mobilitätseinschränkung mit hohem Sturzrisiko.",
      },
      {
        id: "c05q5",
        kind: "text",
        difficulty: "mittel",
        prompt: "Welche präventiven Pflegemaßnahmen planen Sie?",
        explanation:
          "UMGEBUNG: Nachtlicht, Haltegriffe, Niedrigbett, Rufanlage in Reichweite, rutschfeste Schuhe. PERSON: Toilettenbegleitung (v.a. nachts), Medikamenten-Review (Sedativa!), Physio, Hilfsmittel (Rollator). INFORMATION: Patientin/Angehörige aufklären. MONITORING: regelmäßige Risikoeinschätzung.",
      },
    ],
  },

  {
    id: "c06",
    title: "Druckgeschwür",
    patient: "Herr Gruber, 82 J.",
    topic: "haut",
    difficulty: "mittel",
    description:
      "Bettlägerig seit 3 Wochen nach Schlaganfall, DM. Sakraldefekt ca. 4 cm bis Subkutis mit Nekrose, an li. Ferse nicht wegdrückbare Rötung. Aphasie – kann Schmerz nicht äußern.",
    questions: [
      {
        id: "c06q1",
        kind: "mcq",
        difficulty: "leicht",
        prompt: "Welche Dekubitus-Grade liegen vor (Steißbein / Ferse)?",
        options: [
          { label: "Steißbein Grad 1 | Ferse Grad 2", correct: false },
          { label: "Steißbein Grad 2 | Ferse Grad 1", correct: false },
          { label: "Steißbein Grad 3 | Ferse Grad 1", correct: true },
          { label: "Steißbein Grad 4 | Ferse Grad 2", correct: false },
        ],
        explanation:
          "Steißbein: Grad 3 (Tiefenschädigung Haut/Subkutis, kein Knochen/Sehne). Ferse: Grad 1 (nicht wegdrückbare Rötung). Grad 4: freiliegende Knochen/Sehnen.",
      },
      {
        id: "c06q2",
        kind: "text",
        difficulty: "mittel",
        prompt: "Pathophysiologie der Dekubitusentstehung und Risikofaktoren bei Herrn Gruber?",
        explanation:
          "Pathoph.: Langer Druck → Kapillarkompression → Ischämie → Nekrose. Scherkräfte verstärken. Kritisch: >2 h Druck ohne Entlastung. RF: Immobilität, Alter, DM, Aphasie (keine Schmerzkommunikation!), Mangelernährung, Durchblutungsstörung. Prädilektion: Steiß, Fersen, Knöchel, Schulterblätter, Hinterkopf.",
      },
      {
        id: "c06q3",
        kind: "text",
        difficulty: "mittel",
        prompt: "Pflegemaßnahmen: präventiv vs. therapeutisch.",
        explanation:
          "PRÄVENTION (Ferse, allg.): 2-stdl. Umlagerung, Wechseldruckmatratze, Freilagerung der Ferse, pH-neutrale Hautpflege, Ernährung (Protein/Vitamine), Flüssigkeit, Inspektion bei jedem Lagewechsel. THERAPIE (Steiß Grad 3): Wundmanagement (Reinigung, feuchtes Wundmilieu), Débridement (AO), stadiengerechte Auflagen, Infektzeichen beobachten (Sepsisgefahr).",
      },
      {
        id: "c06q4",
        kind: "mcq",
        difficulty: "mittel",
        prompt: "Was beschreibt IAD und worin unterscheidet sie sich vom Dekubitus?",
        options: [
          { label: "IAD: druckbedingt | Dekubitus: feuchtigkeitsbedingt", correct: false },
          { label: "IAD: feuchtigkeitsbedingte Entzündung im Intim-/Gesäßbereich | Dekubitus: druckbedingte Tiefenschädigung", correct: true },
          { label: "Identische Begriffe", correct: false },
          { label: "IAD: tiefe Nekrose durch Reibung | Dekubitus: oberflächliche Rötung", correct: false },
        ],
        explanation:
          "IAD: oberfl. entzündliche Veränderung durch dauerhafte Feuchtigkeit (Urin, Stuhl). Dekubitus: primär Druck/Ischämie, alle Hautschichten bis Tiefe.",
      },
    ],
  },

  {
    id: "c07",
    title: "Akutes Abdomen",
    patient: "Herr Klein, 35 J.",
    topic: "abdomen",
    difficulty: "schwer",
    description:
      "Schmerzen vor 6 h periumbilikal begonnen, wandern in rechten Unterbauch. Temp 38,8 °C, Übelkeit, einmal erbrochen. Schonhaltung. Loslassschmerz pos.",
    questions: [
      {
        id: "c07q1",
        kind: "text",
        difficulty: "schwer",
        prompt: "Wahrscheinlichste Verdachtsdiagnose? Klinische Zeichen und Diagnostik?",
        explanation:
          "V.a. akute Appendizitis. Zeichen: McBurney, Lanz, Blumberg (gekreuzter Loslassschmerz), Psoas-Zeichen. Diagn.: CRP/Leukos, Diff-BB, Sono (Kokarde, Wandverdickung), CT bei Unklarheit. Dringlichkeit wichtiger als exakte Diagnose.",
      },
      {
        id: "c07q2",
        kind: "mcq",
        difficulty: "mittel",
        prompt: "Reihenfolge der Abdomenuntersuchung?",
        options: [
          { label: "Inspektion → Palpation → Auskultation → Perkussion", correct: false },
          { label: "Auskultation → Inspektion → Perkussion → Palpation", correct: false },
          { label: "Inspektion → Auskultation → Perkussion → Palpation", correct: true },
          { label: "Palpation → Perkussion → Auskultation → Inspektion", correct: false },
        ],
        explanation:
          "Auskultation MUSS vor Palpation, da Palpation Peristaltik anregt und Auskultation verfälscht.",
      },
      {
        id: "c07q3",
        kind: "text",
        difficulty: "mittel",
        prompt: "Bedeutung der Darmgeräusche bei Auskultation – welche Befunde, was bedeuten sie?",
        explanation:
          "Normal: rege/glucksend = Peristaltik. Fehlend ('Totenstille'): paralytischer Ileus. Hochgestellt/metallisch: mech. Ileus (Stenoseperistaltik). Hyperaktiv: z.B. Gastroenteritis. Immer alle 4 Quadranten auskultieren.",
      },
      {
        id: "c07q4",
        kind: "mcq",
        difficulty: "leicht",
        prompt: "Welche Symptomkombination ist Red Flag für 'akutes Abdomen'?",
        options: [
          { label: "Leichter Bauchschmerz nach Essen, Blähungen", correct: false },
          { label: "Plötzliche starke Bauchschmerzen + Abwehrspannung + Schockzeichen", correct: true },
          { label: "Obstipation seit 2 Tagen, leichte Übelkeit", correct: false },
          { label: "Sodbrennen nach fettreichem Essen", correct: false },
        ],
        explanation:
          "Akutes Abdomen: akute heftige Schmerzen + schwere AZ-Störung bis Schock (blass, kaltschweißig, Tachykardie, Hypotonie). Schmerz >7, lokalisiert, schnell zunehmend; Stuhl-/Windverhalt; Fieber >38,3°C; Bluterbrechen.",
      },
      {
        id: "c07q5",
        kind: "text",
        difficulty: "mittel",
        prompt: "Systemanamnese des Magen-Darm-Traktes bei Herrn Klein?",
        explanation:
          "Appetit/Durst, Dysphagie, Sodbrennen, Schmerz (Lok., Qualität, NRS, Verlauf, Trigger), Übelkeit/Erbrechen (kaffeesatzartig?), Defäkation (Konsistenz, Farbe, Blut), Ikterus, Stuhl-/Urinfarbe, Gewicht, B-Symptomatik, letzte Mahlzeit, Vor-OPs im Abdomen.",
      },
    ],
  },

  {
    id: "c08",
    title: "Hautveränderungen",
    patient: "Frau Berger, 55 J.",
    topic: "haut",
    difficulty: "leicht",
    description:
      "Auffälliges, verändertes Muttermal am Rücken; scharf begrenzte Rötung am Unterschenkel; silbrige Schuppen auf geröteter Haut an Ellbogen.",
    questions: [
      {
        id: "c08q1",
        kind: "text",
        difficulty: "mittel",
        prompt: "Beurteilen Sie das Muttermal nach ABCDE-Regel.",
        explanation:
          "A Asymmetrie · B Begrenzung (unscharf?) · C Color (Mehrfarbigkeit?) · D Durchmesser >5 mm · E Evolution/Entwicklung. Plus 'Ugly Duckling Sign'. Bei Auffälligkeit: sofortige dermatologische Abklärung.",
      },
      {
        id: "c08q2",
        kind: "mcq",
        difficulty: "leicht",
        prompt: "Silbrig-weiße Schuppen an den Ellbogen entsprechen welcher Effloreszenz?",
        options: [
          { label: "Crusta – eingetrocknetes Sekret", correct: false },
          { label: "Squama – Ansammlung von Hornlamellen", correct: true },
          { label: "Pustula – Leukozytenansammlung", correct: false },
          { label: "Bulla – Flüssigkeitsblase >5 mm", correct: false },
        ],
        explanation:
          "Squama (Schuppe) als Sekundäreffloreszenz; silbrig auf gerötetem Grund an Streckseiten ist typisch für Psoriasis.",
      },
      {
        id: "c08q3",
        kind: "text",
        difficulty: "mittel",
        prompt: "Beschreiben Sie die Rötung am Unterschenkel systematisch nach Effloreszenzen-Kriterien.",
        explanation:
          "Lokalisation, Zahl, Morphologie (Makula?), Begrenzung (scharf=oberflächlich, unscharf=tief), Ausdehnung (cm), Verteilung, Begleitsymptome (Überwärmung, Schwellung, Schmerz). Verdacht: Erysipel.",
      },
      {
        id: "c08q4",
        kind: "mcq",
        difficulty: "leicht",
        prompt: "Welche Aussage zu Primär- vs. Sekundäreffloreszenzen ist korrekt?",
        options: [
          { label: "Primär: Ulkus, Narbe, Kruste | Sekundär: Papel, Quaddel, Blase", correct: false },
          { label: "Primär: Papel, Quaddel, Blase, Pustule | Sekundär: Narbe, Kruste, Schuppe, Erosion", correct: true },
          { label: "Primär: Narbe, Erosion | Sekundär: Papel, Makula", correct: false },
          { label: "Es gibt keinen Unterschied", correct: false },
        ],
        explanation:
          "Primär (durch Krankheit): Makula, Papula, Nodus, Urtica, Vesicula, Bulla, Pustula. Sekundär (Folge): Squama, Crusta, Cicatrix, Rhagade, Erosion, Excoratio, Ulkus, Atrophie.",
      },
    ],
  },

  {
    id: "c09",
    title: "Übelkeit und Erbrechen",
    patient: "Frau Sommer, 42 J.",
    topic: "abdomen",
    difficulty: "mittel",
    description:
      "Seit 2 Tagen Übelkeit, Erbrechen 5–6x täglich wässrig-gallig, Bauchkrämpfe, Durchfall. Temp 37,8 °C. Ehemann ähnlich. Trockene Schleimhäute, stehende Hautfalte. Lebhafte Darmgeräusche.",
    questions: [
      {
        id: "c09q1",
        kind: "mcq",
        difficulty: "leicht",
        prompt: "Wahrscheinlichste Verdachtsdiagnose?",
        options: [
          { label: "Akute Appendizitis", correct: false },
          { label: "Gastroenteritis – Erbrechen, Durchfall, Familienhäufung, lebhafte DG", correct: true },
          { label: "Ileus – fehlende DG, Meteorismus", correct: false },
          { label: "Cholezystitis – Murphy positiv", correct: false },
        ],
        explanation:
          "Gastroenteritis: wässrig-galliges Erbrechen, Durchfall, krampfartige Schmerzen, leichtes Fieber, Familienhäufung, hyperaktive DG, kein akutes Abdomen.",
      },
      {
        id: "c09q2",
        kind: "text",
        difficulty: "mittel",
        prompt: "Komplikationen von anhaltendem Erbrechen und Alarmsymptome?",
        explanation:
          "Kompl.: Dehydratation, Elektrolytentgleisung (Hypokaliämie, -natriämie, -chlorämie), Zahnschäden, Aspirationspneumonie, Mallory-Weiss, Ösophagusruptur. Alarm: Erbrechen + Kopfschmerz → ICP/SAB; Stuhl-/Windverhalt >24 h → Ileus; Bluterbrechen/Kaffeesatz → GI-Blutung; bei DM rasche Entgleisung.",
      },
      {
        id: "c09q3",
        kind: "text",
        difficulty: "leicht",
        prompt: "Hydrationsstatus beurteilen und welche Pflegemaßnahmen?",
        explanation:
          "Zeichen Dehydratation: trockene Schleimhäute, stehende Hautfalte. Plus: Urinmenge/-farbe, RR (Hypotonie), Puls (Tachykardie). Labor: Na, K, Krea, Hkt. Maßnahmen: orale Flüssigkeit (klein/oft), bei schwerer Dehydr. i.v.-Elektrolyte, Elektrolyte kontrollieren, Bilanz, Mundpflege, Antiemetika, BRAT-Kost.",
      },
    ],
  },

  {
    id: "c10",
    title: "Anamnese nach SOAP",
    patient: "Herr Novak, 50 J.",
    topic: "abdomen",
    difficulty: "leicht",
    description:
      "Aufnahme mit Bauchschmerzen seit 3 Tagen. Querschnittsfall zur Anamnesetechnik nach SOAP.",
    questions: [
      {
        id: "c10q1",
        kind: "text",
        difficulty: "leicht",
        prompt: "Wie stellen Sie sich vor und was stellen Sie vor der Anamnese sicher?",
        explanation:
          "Vorstellung mit Name, Funktion, Erklärung des Gesprächs, Einwilligung, Identifikation (Name + Geb.). Sicherstellen: Händedesinfektion, Privatsphäre, ungestörte Atmosphäre, Augenhöhe.",
      },
      {
        id: "c10q2",
        kind: "text",
        difficulty: "mittel",
        prompt: "Erläutern Sie das SOAP-Schema vollständig.",
        explanation:
          "S – Subjektive Daten: Personalien, Hauptbeschwerde, jetziges Leiden, Vor-/Familien-/Sozialanamnese, Medikamente, Allergien, Noxen, Systemanamnese. O – Objektive Daten: AZ, Vitalzeichen, körp. Untersuchung (Inspektion/Auskult./Perk./Palp.), Zusatzdiagnostik. A – Analyse: Beurteilung, Priorisierung (Red Flags, EWS), Arbeitshypothese. P – Plan: Sicherheit, ISBAR, Interventionen, Fokus-Assessment.",
      },
      {
        id: "c10q3",
        kind: "text",
        difficulty: "mittel",
        prompt: "Welche Leitfragen verwenden Sie zur symptomfokussierten Anamnese von Bauchschmerzen?",
        explanation:
          "Lokalisation, Ausstrahlung, Qualität (stechend/krampfartig...), Quantität (NRS 0–10), zeitlicher Verlauf, modifizierende Faktoren, Begleitsymptome, eigene Erklärungsmodelle. (OPQRST / Charakteristika).",
      },
      {
        id: "c10q4",
        kind: "mcq",
        difficulty: "leicht",
        prompt: "Was gehört zur Sozialanamnese?",
        options: [
          { label: "Vorerkrankungen, OPs, Medikamente", correct: false },
          { label: "Herzerkrankungen, DM, Schlaganfall in Familie", correct: false },
          { label: "Beruf, Wohnsituation, Hobbys, Reisen, Tiere, soziale Unterstützung", correct: true },
          { label: "Aktuelle Medikamente und Allergien", correct: false },
        ],
        explanation:
          "Sozialanamnese: Beruf, Wohnsituation, Hobbys, Reisen, Haustiere, soziale Unterstützung. Persönliche / Familien- / Medikamentenanamnese sind eigene Punkte.",
      },
    ],
  },
];

/* ============================
   QUERFRAGEN (zusätzlich)
============================ */

export const CROSS_QUESTIONS: QuizQuestion[] = [
  {
    id: "qx-redflags",
    kind: "text",
    difficulty: "mittel",
    prompt: "Was sind 'Red Flags' – wozu dienen sie und wie grenzen sie sich von Vital Flags ab?",
    explanation:
      "Red Flags: Hinweise auf potenziell schwerwiegende Erkrankung, ärztliche Abklärung innerhalb von 6 h. Priorisierungshilfe. Vital Flags = unmittelbare Lebensgefahr → sofortiger Notruf 144.",
  },
  {
    id: "qx-lvslrslss",
    kind: "text",
    difficulty: "mittel",
    prompt: "Unterschied LVS, LRS und LSS.",
    explanation:
      "LVS (Lumbovertebral): mech. Rückenschmerz, keine Ausstrahlung. LRS (Lumboradikulär): Bandscheibenvorfall mit Wurzelkompression, Dermatomschmerz, Parästhesien, ggf. mot. Ausfall, Lasègue pos. LSS (Lumbospondylogen): Spondylose/Arthrose, Belastungsschmerz, Morgensteifigkeit.",
  },
  {
    id: "qx-virchow",
    kind: "text",
    difficulty: "mittel",
    prompt: "Beschreiben Sie die Virchow-Trias und ihre Bedeutung für die TVT-Entstehung.",
    explanation:
      "1. Verlangsamter Blutfluss (Stase): Immobilität, HI, Gravidität. 2. Hyperkoagulabilität: Thrombophilie, Malignom, OK. 3. Endothelschaden: Trauma, OP, Entzündung, Atherosklerose. Alle drei begünstigen Thrombusbildung.",
  },
  {
    id: "qx-vhfli",
    kind: "text",
    difficulty: "schwer",
    prompt: "Vorhofflimmern – Pathophysiologie und EKG-Befund?",
    explanation:
      "Chaotische Vorhof-Erregung → keine effektive Vorhofkontraktion → absolute Arrhythmie der Kammern. EKG: keine P-Wellen, Flimmerwellen, unregelmäßige QRS-Abstände. Ursachen: Mitralvitien, KHK, Hypertonie, Hyperthyreose, Alkohol.",
  },
  {
    id: "qx-oedem",
    kind: "text",
    difficulty: "mittel",
    prompt: "Unterschied venöses Ödem vs. Lymphödem (Symptome).",
    explanation:
      "Venös: Unterschenkel, Zehen meist NICHT betroffen, eindrückbar, abends schlechter, Hochlagern bessert, braune Pigmentierung, Ulkus am Knöchel. Lymphödem: Zehen MIT betroffen, quaderförmig, Stemmer-Zeichen +, nicht eindrückbar, Wärme verschlechtert, primär/sekundär.",
  },
];

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TOPICS } from "@/data/topics";
import { ChevronRight, BookmarkIcon } from "lucide-react";
import { useProgress } from "@/hooks/use-progress";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const Route = createFileRoute("/osce")({
  component: OscePage,
});

function OscePage() {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const { toggleBookmark, isBookmarked, setOsce } = useProgress();

  const osceCase = selectedCase ? MOCK_OSCE_CASES.find((c) => c.id === selectedCase) : null;

  if (osceCase) {
    return (
      <OsceRunner
        caseId={osceCase.id}
        onBack={() => setSelectedCase(null)}
        isBookmarked={isBookmarked(osceCase.id)}
        onToggleBookmark={() => toggleBookmark(osceCase.id)}
        onConfidence={(confidence) => setOsce(osceCase.id, 0, confidence)}
      />
    );
  }

  const filteredCases = selectedTopic
    ? MOCK_OSCE_CASES.filter((c) => c.topic === selectedTopic)
    : MOCK_OSCE_CASES;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Fall-Simulator (OSCE)</h1>
        <p className="text-muted-foreground">
          Praktische Szenarien mit realistischen Patienten-Interaktionen
        </p>
      </div>

      <Tabs
        defaultValue="all"
        onValueChange={(v) => setSelectedTopic(v === "all" ? null : v)}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full">
          <TabsTrigger value="all">Alle</TabsTrigger>
          {TOPICS.map((t) => (
            <TabsTrigger key={t.id} value={t.id} className="text-xs md:text-sm">
              {t.title.split(" ")[0]}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedTopic || "all"} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredCases.map((osceCase) => {
              const bookmarked = isBookmarked(osceCase.id);

              return (
                <Card
                  key={osceCase.id}
                  className="flex flex-col cursor-pointer hover:shadow-lg transition-all group"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {osceCase.title}
                        </CardTitle>
                        <CardDescription>{osceCase.patient}</CardDescription>
                      </div>
                      <button
                        onClick={() => toggleBookmark(osceCase.id)}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <BookmarkIcon
                          className="h-5 w-5"
                          fill={bookmarked ? "currentColor" : "none"}
                        />
                      </button>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {osceCase.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <DifficultyBadge level="osce" />
                      </div>
                    </div>

                    <Button
                      onClick={() => setSelectedCase(osceCase.id)}
                      className="w-full mt-4"
                    >
                      Fallbearbeitung starten
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface OsceRunnerProps {
  caseId: string;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onConfidence: (confidence: "all" | "partial" | "none") => void;
}

function OsceRunner({
  caseId,
  onBack,
  isBookmarked,
  onToggleBookmark,
  onConfidence,
}: OsceRunnerProps) {
  const osceCase = MOCK_OSCE_CASES.find((c) => c.id === caseId)!;
  const [stepIdx, setStepIdx] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  const step = osceCase.steps[stepIdx];
  const isLastStep = stepIdx === osceCase.steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onBack();
    } else {
      setStepIdx((i) => i + 1);
      setShowSolution(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={onBack}>
            Zurück
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{osceCase.title}</h1>
            <p className="text-sm text-muted-foreground">
              Schritt {stepIdx + 1} von {osceCase.steps.length}
            </p>
          </div>
        </div>

        <button
          onClick={onToggleBookmark}
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <BookmarkIcon
            className="h-6 w-6"
            fill={isBookmarked ? "currentColor" : "none"}
          />
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Szenario</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm whitespace-pre-wrap text-muted-foreground">
                {osceCase.scenario}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">{step.title}</CardTitle>
              <CardDescription>Schritt {stepIdx + 1}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">{step.instruction}</p>

              <Alert>
                <AlertDescription className="text-sm">
                  <strong>Aufgabe:</strong> {step.task}
                </AlertDescription>
              </Alert>

              {showSolution && (
                <Card className="bg-muted/50 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-base">Musterantwort</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm whitespace-pre-wrap">{step.solution}</p>
                  </CardContent>
                </Card>
              )}

              <div className="flex gap-2 pt-4 flex-wrap">
                {!showSolution ? (
                  <Button onClick={() => setShowSolution(true)} className="flex-1 min-w-32">
                    Musteranswort anzeigen
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={handleNext}
                      className="flex-1 min-w-32"
                      variant="default"
                    >
                      {isLastStep ? "Fallabschluss" : "Nächster Schritt"}
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Selbsteinschätzung</CardTitle>
              <CardDescription>Wie sicher waren Sie?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                onClick={() => {
                  onConfidence("all");
                  handleNext();
                }}
                variant="outline"
                className="w-full justify-start text-left"
              >
                <span className="text-2xl mr-2">100%</span>
                <span className="text-xs">Sehr sicher</span>
              </Button>
              <Button
                onClick={() => {
                  onConfidence("partial");
                  handleNext();
                }}
                variant="outline"
                className="w-full justify-start text-left"
              >
                <span className="text-2xl mr-2">50%</span>
                <span className="text-xs">Teilweise sicher</span>
              </Button>
              <Button
                onClick={() => {
                  onConfidence("none");
                  handleNext();
                }}
                variant="outline"
                className="w-full justify-start text-left"
              >
                <span className="text-2xl mr-2">0%</span>
                <span className="text-xs">Unsicher</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

interface OsceCase {
  id: string;
  title: string;
  patient: string;
  topic: string;
  scenario: string;
  steps: {
    title: string;
    instruction: string;
    task: string;
    solution: string;
  }[];
}

const MOCK_OSCE_CASES: OsceCase[] = [
  {
    id: "osce-001",
    title: "Blutdruck-Messung",
    patient: "Patient: Herr Müller, 58 J.",
    topic: "herz",
    scenario:
      "Herr Müller stellt sich zur Routineuntersuchung vor. Sie sollen seinen Blutdruck sachgerecht messen.",
    steps: [
      {
        title: "Vorbereitung",
        instruction: "Bereiten Sie alles für die Messung vor.",
        task: "Was benötigen Sie?",
        solution:
          "1. Funktionierendes Blutdruckmessgerät (manuell oder digital)\n2. Sanitäter-Manschette in passender Größe\n3. Stethoskop (bei manueller Messung)\n4. Patient sitzt bequem mit Armen auf Tischhöhe\n5. 5 Min. Ruhe vor der Messung",
      },
      {
        title: "Durchführung",
        instruction: "Führen Sie die Blutdruck-Messung durch.",
        task: "Beschreiben Sie die Technik.",
        solution:
          "1. Patient sitzt mit Füßen auf Boden, Rücken angelehnt\n2. Manschette am linken Oberarm, auf Herzhöhe\n3. Manschette anlegen: 2-3 Finger passen unter die Manschette\n4. Stethoskop in der Ellenbeuge ansetzen\n5. Manometer auf etwa 20 mmHg über dem erwarteten systolischen Druck aufblasen\n6. Langsam ablassen, Werte notieren\n7. Mindestens 1 Min. warten, danach wiederholen",
      },
      {
        title: "Dokumentation",
        instruction: "Dokumentieren Sie das Ergebnis korrekt.",
        task: "Wie dokumentieren Sie?",
        solution:
          "RR: [syst]/[diast] mmHg (z.B. 140/90 mmHg)\nArmseite und Uhrzeit notieren\nPatient war ruhig / ängstlich (Kontext)\nMittelwert bei mehreren Messungen",
      },
    ],
  },
  {
    id: "osce-002",
    title: "Venenpunktion",
    patient: "Patient: Frau Schmidt, 42 J.",
    topic: "herz",
    scenario:
      "Frau Schmidt benötigt eine Blutentnahme für Laboruntersuchungen. Führen Sie eine Venenpunktion durch.",
    steps: [
      {
        title: "Vorbereitung & Hygiene",
        instruction: "Waschen Sie Ihre Hände und bereiten Sie die Materialien vor.",
        task: "Welche Hygiene-Maßnahmen?",
        solution:
          "1. Hände waschen und desinfizieren\n2. Sterile Handschuhe anziehen\n3. Material: Butterfly/Kanüle, Kapillaren, Tupfer, Desinfektionsmittel\n4. Patientenidentifikation überprüfen\n5. Allergie-Abfrage (bes. Jod, Latex)",
      },
      {
        title: "Punktion",
        instruction: "Führen Sie die Venenpunktion sachgerecht durch.",
        task: "Beschreiben Sie Technik & Lagerung.",
        solution:
          "1. Stauschlauch ca. 10 cm proximal der Ellenbogenbeuge anwenden\n2. Vene palpieren und markieren\n3. Haut mit Desinfektionsmittel desinfizieren (30 Sek.)\n4. Mit 15° Winkel einstechen, auf Bluttropfen warten\n5. Kanüle weiter vorschieben bis Blut fließt\n6. Röhrchen ansetzen, 3–5 mL abnehmen\n7. Röhrchen beschriften\n8. Kanüle entfernen, Tupfer auf Punktionsstelle drücken (3–5 Min.)",
      },
      {
        title: "Nachsorge & Dokumentation",
        instruction: "Sichern Sie die Punktionsstelle und dokumentieren Sie.",
        task: "Was tun Sie danach?",
        solution:
          "1. Tupfer auf Ellenbogenbeugen oder Verband anbringen\n2. Armbewegung fördern (Muskelanspannung)\n3. Blutröhrchen beschriften: Name, Geb.datum, Uhrzeit, Unterschrift\n4. Material entsorgen (scharfe Behälter, Biowaste)\n5. Dokumentation: Zeit, Arm, Anzahl Stiche, Komplikationen (z.B. Hämatom)\n6. Patienten aufklären über Druckverband, evt. Ruhe",
      },
    ],
  },
  {
    id: "osce-003",
    title: "Auskultation Herz",
    patient: "Patient: Herr Weber, 65 J.",
    topic: "herz",
    scenario:
      "Herr Weber kommt zur kardialen Untersuchung. Sie sollen sein Herz auskultieren und die Befunde dokumentieren.",
    steps: [
      {
        title: "Vorbereitung",
        instruction: "Bereiten Sie Patient und Material vor.",
        task: "Was ist notwendig?",
        solution:
          "1. Stethoskop (gut funktionierend, Membran & Trichter sauber)\n2. Patient im Sitzen oder halb aufgerichtet\n3. Oberkörper entblößt\n4. Ruhige Umgebung (Lärm minimieren)\n5. Patient atmet normal weiter",
      },
      {
        title: "Systematische Auskultation",
        instruction: "Auskultieren Sie systematisch nach anatomischen Positionen.",
        task: "Welche Reihenfolge?",
        solution:
          "Reihenfolge: Erb-Punkt (3. ICR li. parasternal) → A (2. ICR re., Aortenklappe) → P (2. ICR li., Pulmonalklappe) → T (4. ICR li.) → M (5. ICR li., Mitralklappe, MCL)\nJede Position mind. 30 Sek. auskultieren\nBei Herzrhythmusstörung länger auskultieren\nDia- und Systole unterscheiden",
      },
      {
        title: "Befund & Dokumentation",
        instruction: "Beschreiben Sie den Befund korrekt.",
        task: "Was dokumentieren Sie?",
        solution:
          "1. Herzfrequenz & Rhythmus (regelmäßig/unregelmäßig)\n2. Herztöne: S1 & S2 klar? Zusatztöne? (S3, S4, Gallop)\n3. Geräusche: Systolisch/Diastolisch, Lautstärke (1–6/6), Lokalisation\n4. Beispiel: 'Normales S1 + S2, systolisches Ejektionsgeräusch Erb-Punkt, kein Diastolicum'\n5. Abgleich mit klinischem Kontext",
      },
    ],
  },
  {
    id: "osce-004",
    title: "Rückenschmerz-Assessment",
    patient: "Patient: Herr Bauer, 45 J.",
    topic: "bewegung",
    scenario:
      "Herr Bauer hat Rückenschmerzen. Führen Sie ein strukturiertes Assessment durch, incl. Lasègue-Test.",
    steps: [
      {
        title: "Schmerzanamnese",
        instruction: "Erfragen Sie die Schmerzcharakteristika.",
        task: "Welche Fragen stellen Sie?",
        solution:
          "1. Onset: Wann begonnen? Plötzlich/schleichend?\n2. Lokalisation: Lumbal/Sakral/Thorakal?\n3. Qualität: Stechend/brennend/dumpf/krampfartig?\n4. Quantität: NRS 0–10?\n5. Ausstrahlung: Bein, Fuß?\n6. Triggerfaktoren: Bewegung/Bücken/Husten?\n7. Linderungsfaktoren: Ruhe/Wärme?\n8. B-Symptome: Fieber, Gewichtsverlust, Nachtschmerz?",
      },
      {
        title: "Körperliche Untersuchung",
        instruction: "Führen Sie die Untersuchung durch.",
        task: "Welche Tests?",
        solution:
          "1. Inspektion: Haltung, Scoliose, Asymmetrien\n2. Palpation: Spinous processes, Paraspinale Muskulatur, Druckdolenz\n3. Beweglichkeit: Flexion, Extension, Seitneigung\n4. Lasègue-Test: Rückenlage, gestrecktes Bein passiv anheben bis Schmerz auftritt. Wenn <60°: Wurzelreizung\n5. Patella-Reflex, Achillesreflex\n6. Motorik & Sensibilität Unterextremitäten\n7. Red Flags: Lähmung, Blasen-/Mastdarmstörung, Trauma",
      },
      {
        title: "Diagnose & Therapie",
        instruction: "Stellen Sie eine Verdachtsdiagnose und Therapieplan.",
        task: "Ihr Verdacht?",
        solution:
          "Häufig: LRS (einfacher Rückenschmerz) oder LRS mit Wurzelreizung (Lasègue+, Schmerz <60°).\nTherapie:\n- Schmerzlinderung (Paracetamol/NSAR)\n- Physiotherapie, Rückenschule\n- KEINE Bettruhe >2 Tage\n- Frühzeitige Mobilisation\n- Red Flags → sofort zum Arzt (Kaudasyndrom)\n- Imaging (MRI) nur bei unklar oder Red Flags",
      },
    ],
  },
  {
    id: "osce-005",
    title: "Sturzgefährdungs-Assessment",
    patient: "Patient: Frau Hoffmann, 78 J.",
    topic: "notfall",
    scenario:
      "Frau Hoffmann befindet sich am Tag 5 nach einer Hüft-OP auf Station. Führen Sie ein Sturzrisiko-Assessment durch.",
    steps: [
      {
        title: "Risikoabfrage",
        instruction: "Erfragen Sie Sturzrisikofaktoren.",
        task: "Welche intrinsischen & extrinsischen Faktoren?",
        solution:
          "Intrinsisch: Alter, postoperativ, kognitive Einschränkung, Medikamente (Sedativa, Diuretika), Schwindel, Sehbehinderung, Kraft/Mobilitätsverlust.\nExtrinsisch: Bettgitter, Lichtverhältnisse, Stolperfallen, Bodenbeschaffenheit, Hilfsmittel, Sicherheit des Zimmers.\nSturzanamnese: Frühere Stürze?",
      },
      {
        title: "Tests & Score",
        instruction: "Führen Sie standardisierte Tests durch.",
        task: "Welche Assessment-Tools?",
        solution:
          "1. Morse Fall Scale: 6 Items (Anamnese, Diagnose, Medikation, Gehfähigkeit etc.) → Risiko ↑ >45\n2. Timed Up and Go (TUG): Zeit vom Aufstehen zum Sitzen → >30 Sek. = hohes Risiko\n3. Berg Balance Scale: 14 funktionelle Items\n4. Mobilitätsstatus prüfen (Walk, Transfer, ADL)\n5. Kognition & Kontinenz fragen",
      },
      {
        title: "Maßnahmenplan",
        instruction: "Erstellen Sie präventive Maßnahmen.",
        task: "Wie reduzieren Sie das Sturzrisiko?",
        solution:
          "Umgebung: Nachtlicht, Haltegriffe, Niedrigbett, Rufanlage, rutschfeste Schuhe, Räumung von Stolperfallen.\nPersonal: Toilettenbegleitung (bes. nachts), Medikamentenreview, Physio, Hilfsmittel (Rollator).\nEdukation: Patient & Angehörige aufklären, selbstständige Mobilisation fördern.\nMonitoring: Regelmäßige Risikoneu-einschätzung, Dokumentation von Sturzereignissen.",
      },
    ],
  },
];

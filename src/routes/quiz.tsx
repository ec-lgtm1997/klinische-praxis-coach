import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QUIZ_CASES } from "@/data/quiz-cases";
import { TOPICS } from "@/data/topics";
import { ChevronRight, BookmarkIcon } from "lucide-react";
import { useProgress } from "@/hooks/use-progress";

export const Route = createFileRoute("/quiz")({
  component: QuizPage,
});

function QuizPage() {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const { state, toggleBookmark, isBookmarked } = useProgress();

  const filteredCases = selectedTopic
    ? QUIZ_CASES.filter((c) => c.topic === selectedTopic)
    : QUIZ_CASES;

  const currentCase = selectedCase ? QUIZ_CASES.find((c) => c.id === selectedCase) : null;

  if (currentCase) {
    return (
      <QuizRunner
        caseId={currentCase.id}
        onBack={() => setSelectedCase(null)}
        isBookmarked={isBookmarked(currentCase.id)}
        onToggleBookmark={() => toggleBookmark(currentCase.id)}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Quiz-Modus</h1>
        <p className="text-muted-foreground">
          Wählen Sie ein Thema und trainieren Sie mit interaktiven Fragen
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
            {filteredCases.map((quizCase) => {
              const answered = state.quizAnswered[quizCase.id];
              const bookmarked = isBookmarked(quizCase.id);

              return (
                <Card
                  key={quizCase.id}
                  className="flex flex-col cursor-pointer hover:shadow-lg transition-all group"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {quizCase.title}
                        </CardTitle>
                        <CardDescription>{quizCase.patient}</CardDescription>
                      </div>
                      <button
                        onClick={() => toggleBookmark(quizCase.id)}
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
                        {quizCase.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <DifficultyBadge level={quizCase.difficulty} />
                        {answered !== undefined && (
                          <span
                            className={`text-xs font-medium px-2 py-0.5 rounded ${
                              answered
                                ? "bg-[color-mix(in_oklab,var(--color-success)_18%,transparent)] text-[color:var(--color-success)]"
                                : "bg-[color-mix(in_oklab,var(--color-danger)_18%,transparent)] text-[color:var(--color-danger)]"
                            }`}
                          >
                            {answered ? "Richtig" : "Falsches Ergebnis"}
                          </span>
                        )}
                      </div>
                    </div>

                    <Button
                      onClick={() => setSelectedCase(quizCase.id)}
                      className="w-full mt-4"
                      variant={answered !== undefined ? "outline" : "default"}
                    >
                      {answered !== undefined ? "Wiederholen" : "Starten"}
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

interface QuizRunnerProps {
  caseId: string;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

function QuizRunner({ caseId, onBack, isBookmarked, onToggleBookmark }: QuizRunnerProps) {
  const quizCase = QUIZ_CASES.find((c) => c.id === caseId)!;
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, unknown>>({});
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = quizCase.questions[currentQuestionIdx];
  const isLastQuestion = currentQuestionIdx === quizCase.questions.length - 1;

  const handleNext = () => {
    if (isLastQuestion) {
      onBack();
    } else {
      setCurrentQuestionIdx((i) => i + 1);
      setShowExplanation(false);
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
            <h1 className="text-2xl font-bold">{quizCase.title}</h1>
            <p className="text-sm text-muted-foreground">
              Frage {currentQuestionIdx + 1} von {quizCase.questions.length}
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

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>{currentQuestion.prompt}</CardTitle>
              <CardDescription className="mt-2">
                {currentQuestion.kind === "mcq" ? "Multiple Choice" : "Offene Antwort"}
              </CardDescription>
            </div>
            <DifficultyBadge level={currentQuestion.difficulty} />
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {currentQuestion.kind === "mcq" && (
            <div className="space-y-2">
              {currentQuestion.options.map((opt, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-accent transition-colors"
                >
                  <input
                    type={currentQuestion.multi ? "checkbox" : "radio"}
                    name={`question-${currentQuestionIdx}`}
                    value={opt.label}
                    checked={
                      currentQuestion.multi
                        ? Array.isArray(userAnswers[currentQuestionIdx])
                          ? (userAnswers[currentQuestionIdx] as string[]).includes(opt.label)
                          : false
                        : userAnswers[currentQuestionIdx] === opt.label
                    }
                    onChange={(e) => {
                      if (currentQuestion.multi) {
                        const current = (userAnswers[currentQuestionIdx] as string[]) || [];
                        setUserAnswers({
                          ...userAnswers,
                          [currentQuestionIdx]: e.target.checked
                            ? [...current, opt.label]
                            : current.filter((l) => l !== opt.label),
                        });
                      } else {
                        setUserAnswers({ ...userAnswers, [currentQuestionIdx]: opt.label });
                      }
                    }}
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          )}

          {currentQuestion.kind === "text" && (
            <textarea
              placeholder="Geben Sie Ihre Antwort ein..."
              value={(userAnswers[currentQuestionIdx] as string) || ""}
              onChange={(e) => setUserAnswers({ ...userAnswers, [currentQuestionIdx]: e.target.value })}
              className="w-full min-h-24 p-3 rounded-lg border border-input bg-transparent focus:outline-none focus:ring-1 focus:ring-ring"
            />
          )}

          {showExplanation && (
            <Card className="bg-muted/50 border-primary/20">
              <CardHeader>
                <CardTitle className="text-base">Erklärung</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm whitespace-pre-wrap">{currentQuestion.explanation}</p>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-2 pt-4">
            {!showExplanation ? (
              <Button onClick={() => setShowExplanation(true)} className="flex-1">
                Lösung anzeigen
              </Button>
            ) : (
              <Button onClick={handleNext} className="flex-1">
                {isLastQuestion ? "Abschluss" : "Nächste Frage"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

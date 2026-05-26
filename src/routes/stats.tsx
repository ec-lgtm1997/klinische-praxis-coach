import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/hooks/use-progress";
import { QUIZ_CASES } from "@/data/quiz-cases";
import { TOPICS } from "@/data/topics";

export const Route = createFileRoute("/stats")({
  component: StatsPage,
});

function StatsPage() {
  const { state } = useProgress();

  const quizStats = calculateQuizStats(state.quizAnswered);
  const osceStats = calculateOsceStats(state.osceConfidence);
  const bookmarkCount = state.bookmarks.length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Lern-Statistik</h1>
        <p className="text-muted-foreground">Verfolgen Sie Ihren Lernfortschritt</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Quiz absolviert</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{quizStats.attempted}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((quizStats.attempted / 10) * 100).toFixed(0)}% von {QUIZ_CASES.length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Quiz korrekt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[color:var(--color-success)]">
              {quizStats.correct}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {quizStats.attempted > 0
                ? ((quizStats.correct / quizStats.attempted) * 100).toFixed(0)
                : 0}
              % Erfolgsquote
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">OSCE absolviert</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{osceStats.attempted}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((osceStats.attempted / 5) * 100).toFixed(0)}% von 5 Fällen
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Lesezeichen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bookmarkCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Für späteren Zugriff gespeichert
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="quiz" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="quiz">Quiz-Fortschritt</TabsTrigger>
          <TabsTrigger value="osce">OSCE-Fortschritt</TabsTrigger>
        </TabsList>

        <TabsContent value="quiz" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Nach Schwierigkeit</CardTitle>
              <CardDescription>Ihre Erfolgsquote nach Schwierigkeitsstufe</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {["leicht", "mittel", "schwer"].map((difficulty) => {
                const cases = QUIZ_CASES.filter((c) => c.difficulty === difficulty);
                const answered = cases.filter(
                  (c) => state.quizAnswered[c.id] !== undefined
                );
                const correct = answered.filter((c) => state.quizAnswered[c.id] === true);

                const percentage =
                  answered.length > 0 ? ((correct.length / answered.length) * 100).toFixed(0) : 0;

                return (
                  <div key={difficulty} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium capitalize">{difficulty}</span>
                      <span className="text-sm text-muted-foreground">
                        {correct.length} / {answered.length} ({percentage}%)
                      </span>
                    </div>
                    <Progress value={Number(percentage)} className="h-2" />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Nach Thema</CardTitle>
              <CardDescription>Ihre Erfolgsquote nach Thema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {TOPICS.map((topic) => {
                const cases = QUIZ_CASES.filter((c) => c.topic === topic.id);
                const answered = cases.filter(
                  (c) => state.quizAnswered[c.id] !== undefined
                );
                const correct = answered.filter((c) => state.quizAnswered[c.id] === true);

                const percentage =
                  answered.length > 0 ? ((correct.length / answered.length) * 100).toFixed(0) : 0;

                return (
                  <div key={topic.id} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{topic.title}</span>
                      <span className="text-sm text-muted-foreground">
                        {correct.length} / {answered.length} ({percentage}%)
                      </span>
                    </div>
                    <Progress value={Number(percentage)} className="h-2" />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="osce" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Selbstvertrauen-Verlauf</CardTitle>
              <CardDescription>Ihre durchschnittliche Selbsteinschätzung bei OSCE</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {["all", "partial", "none"].map((confidence) => {
                const count = Object.values(state.osceConfidence).filter(
                  (c) => c === confidence
                ).length;
                const percentage =
                  Object.keys(state.osceConfidence).length > 0
                    ? (
                        (count /
                          Object.keys(state.osceConfidence).length) *
                        100
                      ).toFixed(0)
                    : 0;

                const label =
                  confidence === "all"
                    ? "Sehr sicher (100%)"
                    : confidence === "partial"
                      ? "Teilweise sicher (50%)"
                      : "Unsicher (0%)";

                return (
                  <div key={confidence} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{label}</span>
                      <span className="text-sm text-muted-foreground">
                        {count} ({percentage}%)
                      </span>
                    </div>
                    <Progress value={Number(percentage)} className="h-2" />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {Object.keys(state.osceConfidence).length === 0 && (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                <p>Noch keine OSCE-Daten vorhanden. Beginnen Sie mit OSCE-Fällen!</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {Object.keys(state.quizAnswered).length === 0 &&
        Object.keys(state.osceConfidence).length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Keine Daten vorhanden. Starten Sie Quiz oder OSCE, um Statistiken zu sammeln!
              </p>
            </CardContent>
          </Card>
        )}
    </div>
  );
}

interface QuizStats {
  attempted: number;
  correct: number;
}

function calculateQuizStats(quizAnswered: Record<string, boolean>): QuizStats {
  const attempted = Object.keys(quizAnswered).length;
  const correct = Object.values(quizAnswered).filter((v) => v === true).length;
  return { attempted, correct };
}

interface OsceStats {
  attempted: number;
}

function calculateOsceStats(osceConfidence: Record<string, string>): OsceStats {
  const attempted = new Set(
    Object.keys(osceConfidence).map((k) => k.split(":")[0])
  ).size;
  return { attempted };
}

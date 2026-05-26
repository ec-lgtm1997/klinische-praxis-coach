import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { BookOpen, Stethoscope, LineChart, Heart } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Willkommen</h1>
        <p className="text-muted-foreground">
          Pflege-Assessment Prüfungssimulation – Wählen Sie einen Modus
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="flex flex-col hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-[color-mix(in_oklab,var(--color-primary)_15%,transparent)] p-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Quiz-Modus</CardTitle>
                  <CardDescription>Wissensabfragen trainieren</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between">
            <p className="text-sm text-muted-foreground mb-4">
              10 Quiz-Fälle mit MC- und Text-Fragen zu verschiedenen Schwierigkeitsgraden.
            </p>
            <Link to="/quiz">
              <Button className="w-full">Quiz starten</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="flex flex-col hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-[color-mix(in_oklab,var(--color-clinical)_15%,transparent)] p-2">
                  <Stethoscope className="h-5 w-5 text-[color:var(--color-clinical)]" />
                </div>
                <div>
                  <CardTitle className="text-lg">Fall-Simulator (OSCE)</CardTitle>
                  <CardDescription>Praktische Szenarien</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between">
            <p className="text-sm text-muted-foreground mb-4">
              15 realistische OSCE-Fälle mit Musterantworten und Feedback.
            </p>
            <Link to="/osce">
              <Button className="w-full" variant="outline">
                OSCE starten
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="flex flex-col hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-[color-mix(in_oklab,var(--color-success)_15%,transparent)] p-2">
                  <LineChart className="h-5 w-5 text-[color:var(--color-success)]" />
                </div>
                <div>
                  <CardTitle className="text-lg">Lern-Statistik</CardTitle>
                  <CardDescription>Fortschritt verfolgen</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between">
            <p className="text-sm text-muted-foreground mb-4">
              Visualisieren Sie Ihren Lernfortschritt und Verbesserungen.
            </p>
            <Link to="/stats">
              <Button className="w-full" variant="secondary">
                Statistiken ansehen
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="flex flex-col hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-[color-mix(in_oklab,var(--color-warning)_14%,transparent)] p-2">
                  <Heart className="h-5 w-5 text-[color:var(--color-warning-foreground)]" />
                </div>
                <div>
                  <CardTitle className="text-lg">Über diese App</CardTitle>
                  <CardDescription>Mehr erfahren</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between">
            <p className="text-sm text-muted-foreground mb-4">
              Klinisches Pflegeassessment – mündliche/praktische OSCE-Simulation.
            </p>
            <Button className="w-full" variant="ghost" disabled>
              Mehr Info
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  BookOpen,
  Stethoscope,
  LineChart,
  HeartPulse,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/quiz", label: "Quiz-Modus", icon: BookOpen },
  { to: "/osce", label: "Fall-Simulator", icon: Stethoscope },
  { to: "/stats", label: "Lern-Statistik", icon: LineChart },
] as const;

export function AppNav() {
  const path = useRouterState({ select: (r) => r.location.pathname });

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:gap-1 border-r bg-sidebar text-sidebar-foreground p-4">
        <Link to="/" className="flex items-center gap-2.5 px-2 py-3 mb-2">
          <div className="size-9 rounded-xl bg-gradient-clinical text-primary-foreground grid place-items-center shadow-sm">
            <HeartPulse className="size-5" />
          </div>
          <div className="leading-tight">
            <div className="font-semibold tracking-tight">Pflege-Assessment</div>
            <div className="text-xs text-muted-foreground">Prüfungssimulation</div>
          </div>
        </Link>
        <nav className="flex flex-col gap-1">
          {items.map(({ to, label, icon: Icon }) => {
            const active = to === "/" ? path === "/" : path.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                    : "text-sidebar-foreground hover:bg-sidebar-accent",
                )}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto rounded-xl border bg-card p-3 text-xs text-muted-foreground">
          <div className="font-medium text-foreground mb-1">Klinisches Pflegeassessment</div>
          Mündliche / praktische OSZE-Simulation für Bachelor Pflege & ANP.
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t bg-sidebar/95 backdrop-blur supports-[backdrop-filter]:bg-sidebar/80">
        <div className="grid grid-cols-4">
          {items.map(({ to, label, icon: Icon }) => {
            const active = to === "/" ? path === "/" : path.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 py-2.5 text-xs",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <Icon className="size-5" />
                <span className="leading-none">{label.split("-")[0]}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

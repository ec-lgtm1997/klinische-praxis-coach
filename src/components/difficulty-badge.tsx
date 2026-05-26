import { cn } from "@/lib/utils";
import type { Difficulty } from "@/data/quiz-cases";

interface Props {
  level: Difficulty | "osce";
  className?: string;
}

const map = {
  leicht: {
    label: "Leicht",
    cls: "bg-[color-mix(in_oklab,var(--color-success)_18%,transparent)] text-[color:var(--color-success)] ring-1 ring-[color-mix(in_oklab,var(--color-success)_30%,transparent)]",
    dots: "●",
  },
  mittel: {
    label: "Mittel",
    cls: "bg-[color-mix(in_oklab,var(--color-warning)_22%,transparent)] text-[color:var(--color-warning-foreground)] ring-1 ring-[color-mix(in_oklab,var(--color-warning)_35%,transparent)]",
    dots: "●●",
  },
  schwer: {
    label: "Schwer",
    cls: "bg-[color-mix(in_oklab,var(--color-danger)_15%,transparent)] text-[color:var(--color-danger)] ring-1 ring-[color-mix(in_oklab,var(--color-danger)_30%,transparent)]",
    dots: "●●●",
  },
  osce: {
    label: "OSCE",
    cls: "bg-[color-mix(in_oklab,var(--color-primary)_15%,transparent)] text-primary ring-1 ring-[color-mix(in_oklab,var(--color-primary)_30%,transparent)]",
    dots: "▣",
  },
} as const;

export function DifficultyBadge({ level, className }: Props) {
  const v = map[level];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide",
        v.cls,
        className,
      )}
    >
      <span className="text-[0.7em]">{v.dots}</span>
      {v.label}
    </span>
  );
}

import { Bone, HeartPulse, Layers, Soup, Siren, type LucideIcon } from "lucide-react";

export type TopicId =
  | "bewegung"
  | "notfall"
  | "haut"
  | "abdomen"
  | "herz";

export interface Topic {
  id: TopicId;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  /** Tailwind utility classes for accent tile */
  tint: string;
  ring: string;
}

export const TOPICS: Topic[] = [
  {
    id: "bewegung",
    title: "Bewegungsapparat & Wirbelsäule",
    subtitle: "LRS, Dermatome, Lasègue, Kennmuskeln",
    icon: Bone,
    tint: "bg-[color-mix(in_oklab,var(--color-primary)_10%,transparent)] text-primary",
    ring: "ring-1 ring-[color-mix(in_oklab,var(--color-primary)_25%,transparent)]",
  },
  {
    id: "notfall",
    title: "Notfall & Sturz",
    subtitle: "ABCDE, Triage, Sturzassessment, SHT",
    icon: Siren,
    tint: "bg-[color-mix(in_oklab,var(--color-danger)_10%,transparent)] text-[color:var(--color-danger)]",
    ring: "ring-1 ring-[color-mix(in_oklab,var(--color-danger)_25%,transparent)]",
  },
  {
    id: "haut",
    title: "Haut & Gewebepathologien",
    subtitle: "Effloreszenzen, Dekubitus, IAD, ABCDE-Naevi",
    icon: Layers,
    tint: "bg-[color-mix(in_oklab,var(--color-warning)_14%,transparent)] text-[color:var(--color-warning-foreground)]",
    ring: "ring-1 ring-[color-mix(in_oklab,var(--color-warning)_30%,transparent)]",
  },
  {
    id: "abdomen",
    title: "Abdomen & GI-Trakt",
    subtitle: "Appendizitis, Ileus, Zirrhose, Auskultation",
    icon: Soup,
    tint: "bg-[color-mix(in_oklab,var(--color-clinical)_14%,transparent)] text-[color:var(--color-clinical)]",
    ring: "ring-1 ring-[color-mix(in_oklab,var(--color-clinical)_30%,transparent)]",
  },
  {
    id: "herz",
    title: "Herz-Kreislauf & Gefäßsystem",
    subtitle: "PAVK, ABI, EKG, TVT, ISBAR",
    icon: HeartPulse,
    tint: "bg-[color-mix(in_oklab,var(--color-success)_12%,transparent)] text-[color:var(--color-success)]",
    ring: "ring-1 ring-[color-mix(in_oklab,var(--color-success)_28%,transparent)]",
  },
];

export const topicById = (id: TopicId) => TOPICS.find((t) => t.id === id)!;

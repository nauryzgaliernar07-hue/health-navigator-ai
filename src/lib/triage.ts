import type { Triage } from "@/data/diseases";

export const TRIAGE_LABEL: Record<Triage, string> = {
  low: "Низкий",
  medium: "Средний",
  high: "Высокий",
  urgent: "Срочно",
};

export const TRIAGE_COLOR: Record<Triage, string> = {
  low: "bg-[oklch(0.95_0.06_155)] text-[oklch(0.35_0.12_155)] border-[oklch(0.85_0.1_155)]",
  medium: "bg-[oklch(0.96_0.07_85)] text-[oklch(0.4_0.13_75)] border-[oklch(0.85_0.12_80)]",
  high: "bg-[oklch(0.95_0.07_45)] text-[oklch(0.45_0.18_35)] border-[oklch(0.82_0.13_45)]",
  urgent: "bg-destructive/10 text-destructive border-destructive/30",
};

export const TRIAGE_DESCRIPTION: Record<Triage, string> = {
  low: "Можно наблюдать дома, плановая консультация при необходимости.",
  medium: "Желательно обратиться к врачу в ближайшие дни.",
  high: "Обратитесь к врачу в течение 24 часов.",
  urgent: "СРОЧНО. Вызовите скорую (103 / 112).",
};

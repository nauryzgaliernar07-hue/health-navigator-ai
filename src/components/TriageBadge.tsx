import type { Triage } from "@/data/diseases";
import { TRIAGE_COLOR } from "@/lib/triage";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function TriageBadge({ level, className }: { level: Triage; className?: string }) {
  const { t } = useI18n();
  const labelMap: Record<Triage, string> = {
    low: t("triage.low"),
    medium: t("triage.medium"),
    high: t("triage.high"),
    urgent: t("triage.urgent"),
  };
  const riskWord =
    t("nav.home") === "Home" ? "Risk" : t("nav.home") === "Басты бет" ? "Тәуекел" : "Риск";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        TRIAGE_COLOR[level],
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {riskWord}: {labelMap[level]}
    </span>
  );
}

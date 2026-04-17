import type { Triage } from "@/data/diseases";
import { TRIAGE_COLOR, TRIAGE_LABEL } from "@/lib/triage";
import { cn } from "@/lib/utils";

export function TriageBadge({ level, className }: { level: Triage; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        TRIAGE_COLOR[level],
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      Риск: {TRIAGE_LABEL[level]}
    </span>
  );
}

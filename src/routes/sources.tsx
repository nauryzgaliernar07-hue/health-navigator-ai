import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { SOURCES } from "@/data/sources";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/sources")({
  head: () => ({
    meta: [
      { title: "Источники — МедАссистент" },
      { name: "description", content: "Источники информации, использованные в справочнике." },
    ],
  }),
  component: SourcesPage,
});

function SourcesPage() {
  const { t } = useI18n();
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-foreground">{t("sources.title")}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{t("sources.subtitle")}</p>

      <ul className="mt-6 space-y-3">
        {SOURCES.map((s) => (
          <li key={s.id} className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-semibold text-foreground">{s.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
              </div>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary"
              >
                {t("sources.open")} <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 rounded-2xl border border-border bg-secondary/40 p-4 text-sm text-muted-foreground">
        {t("sources.disclaimer")}
      </div>
    </div>
  );
}

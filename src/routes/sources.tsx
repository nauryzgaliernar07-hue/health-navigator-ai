import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { SOURCES } from "@/data/sources";

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
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-foreground">Источники</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Информация на сайте основана на открытых клинических руководствах и проверенных медицинских ресурсах.
      </p>

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
                Открыть <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 rounded-2xl border border-border bg-secondary/40 p-4 text-sm text-muted-foreground">
        Сервис не предоставляет медицинских услуг и не заменяет очную консультацию врача. Все рекомендации носят информационный
        характер.
      </div>
    </div>
  );
}

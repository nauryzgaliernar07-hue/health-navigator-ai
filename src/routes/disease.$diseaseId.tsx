import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AlertTriangle, ArrowLeft, BookOpen, HeartPulse, Pill, Stethoscope } from "lucide-react";
import { findDiseaseById } from "@/data/diseases";
import { SOURCES } from "@/data/sources";
import { SYMPTOMS } from "@/data/symptoms";
import { TriageBadge } from "@/components/TriageBadge";
import { TRIAGE_DESCRIPTION, TRIAGE_LABEL } from "@/lib/triage";
import { loadSession } from "@/lib/session";

export const Route = createFileRoute("/disease/$diseaseId")({
  loader: ({ params }) => {
    const d = findDiseaseById(params.diseaseId);
    if (!d) throw notFound();
    return d;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Заболевание"} — МедАссистент` },
      { name: "description", content: loaderData?.shortDescription ?? "" },
    ],
  }),
  component: DiseasePage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold">Заболевание не найдено</h1>
      <Link to="/catalog" className="mt-4 inline-block text-primary hover:underline">
        Вернуться в каталог
      </Link>
    </div>
  ),
});

function DiseasePage() {
  const d = Route.useLoaderData();
  const [allergies, setAllergies] = useState("");
  const [userSymptoms, setUserSymptoms] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setAllergies(window.sessionStorage.getItem("med-assistant-allergies-v1") ?? "");
    const session = loadSession();
    if (session) setUserSymptoms(session.symptoms);
  }, []);

  const symLabel = (id: string) => SYMPTOMS.find((s) => s.id === id)?.label ?? id;
  const matched = d.symptoms.filter((s) => userSymptoms.includes(s));

  // Filter pain relief by allergies (simple substring match)
  const allergyList = allergies
    .toLowerCase()
    .split(/[,;\n]/)
    .map((s) => s.trim())
    .filter(Boolean);
  const safePain = d.recommendedPainRelief.filter(
    (rec) => !allergyList.some((a) => a && rec.toLowerCase().includes(a)),
  );
  const blockedPain = d.recommendedPainRelief.filter((rec) =>
    allergyList.some((a) => a && rec.toLowerCase().includes(a)),
  );

  const sources = d.sources.map((id) => SOURCES.find((s) => s.id === id)).filter(Boolean);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link to="/catalog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Назад к каталогу
      </Link>

      <header className="mt-4 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{d.category}</p>
            <h1 className="mt-1 text-3xl font-semibold text-foreground">{d.name}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{d.shortDescription}</p>
          </div>
          <TriageBadge level={d.triage} />
        </div>

        <div className="mt-4 rounded-xl bg-primary-soft p-3 text-sm text-foreground">
          <p className="font-semibold">Триаж: {TRIAGE_LABEL[d.triage]}</p>
          <p className="mt-1 text-muted-foreground">{TRIAGE_DESCRIPTION[d.triage]}</p>
        </div>
      </header>

      {/* Why */}
      <section className="mt-5 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-primary" />
          <h2 className="font-semibold text-foreground">Почему именно это?</h2>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{d.whyItMayBe}</p>
        {matched.length > 0 ? (
          <p className="mt-3 text-sm text-foreground">
            На основе ваших данных совпали:{" "}
            <span className="font-medium">{matched.map(symLabel).join(", ")}</span>.
          </p>
        ) : userSymptoms.length > 0 ? (
          <p className="mt-3 text-xs text-muted-foreground">Среди ваших симптомов нет типичных для этой болезни — это всё ещё может быть полезным справочно.</p>
        ) : (
          <p className="mt-3 text-xs text-muted-foreground">Пройдите опрос, чтобы увидеть персональное сопоставление.</p>
        )}
      </section>

      {/* Mortality risk */}
      <section className="mt-5 rounded-2xl border border-destructive/20 bg-destructive/5 p-5">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <h2 className="font-semibold text-foreground">Риск без обращения к врачу</h2>
        </div>
        <p className="mt-2 text-sm text-foreground">{d.mortalityRiskWithoutCare}</p>
      </section>

      {/* What to do */}
      <section className="mt-5 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-2">
          <Stethoscope className="h-4 w-4 text-primary" />
          <h2 className="font-semibold text-foreground">Что делать в первую очередь?</h2>
        </div>
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-foreground">
          {d.firstSteps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-secondary/40 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Когда к врачу</p>
            <p className="mt-1 text-sm text-foreground">{d.whenToSeeDoctor}</p>
          </div>
          <div className="rounded-xl border border-border bg-secondary/40 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Возможные обследования</p>
            <ul className="mt-1 list-disc pl-4 text-sm text-foreground">
              {d.possibleTests.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-muted-foreground">Назначает врач, не нужно сдавать самостоятельно «на всякий случай».</p>
          </div>
        </div>
      </section>

      {/* Pain relief */}
      <section className="mt-5 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-2">
          <Pill className="h-4 w-4 text-primary" />
          <h2 className="font-semibold text-foreground">Обезболивание (рекомендация, не назначение)</h2>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Это общая информация. Перед приёмом любого препарата уточните у врача и прочитайте инструкцию.
        </p>

        {/* Allergy input */}
        <div className="mt-3 rounded-xl border border-border bg-secondary/40 p-3">
          <label className="text-xs font-semibold text-foreground">Есть ли у вас аллергия на лекарства?</label>
          <input
            value={allergies}
            onChange={(e) => {
              setAllergies(e.target.value);
              if (typeof window !== "undefined")
                window.sessionStorage.setItem("med-assistant-allergies-v1", e.target.value);
            }}
            placeholder="Например: ибупрофен, аспирин"
            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
          />
          <p className="mt-1 text-xs text-muted-foreground">Препараты с указанными словами будут исключены из рекомендаций ниже.</p>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Может помочь</p>
            <ul className="mt-1 space-y-1 text-sm">
              {safePain.length === 0 && <li className="text-muted-foreground">Нет безопасных вариантов с учётом аллергии.</li>}
              {safePain.map((p) => (
                <li key={p} className="flex gap-2 text-foreground">
                  <span className="text-[oklch(0.6_0.15_155)]">✓</span> {p}
                </li>
              ))}
            </ul>
            {blockedPain.length > 0 && (
              <p className="mt-2 text-xs text-destructive">
                Исключено по аллергии: {blockedPain.join(", ")}
              </p>
            )}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Может усугубить</p>
            <ul className="mt-1 space-y-1 text-sm">
              {d.avoidMedications.map((p) => (
                <li key={p} className="flex gap-2 text-foreground">
                  <span className="text-destructive">✕</span> {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Red flags */}
      {d.redFlags.length > 0 && (
        <section className="mt-5 rounded-2xl border border-destructive/30 bg-destructive/5 p-5">
          <div className="flex items-center gap-2">
            <HeartPulse className="h-4 w-4 text-destructive" />
            <h2 className="font-semibold text-foreground">Красные флаги</h2>
          </div>
          <ul className="mt-2 list-disc pl-5 text-sm text-foreground">
            {d.redFlags.map((r) => (
              <li key={r}>{symLabel(r)}</li>
            ))}
          </ul>
          <p className="mt-2 text-sm text-foreground">При появлении этих симптомов — срочно обратитесь за медицинской помощью.</p>
        </section>
      )}

      {/* Sources */}
      <section className="mt-5 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
        <h2 className="font-semibold text-foreground">Источники</h2>
        <ul className="mt-2 space-y-1 text-sm">
          {sources.map(
            (s) =>
              s && (
                <li key={s.id}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {s.name}
                  </a>{" "}
                  — <span className="text-muted-foreground">{s.description}</span>
                </li>
              ),
          )}
        </ul>
        <Link to="/sources" className="mt-3 inline-block text-xs font-medium text-primary hover:underline">
          Все источники →
        </Link>
      </section>
    </div>
  );
}

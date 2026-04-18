import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, ArrowRight, Info, Lightbulb, Stethoscope } from "lucide-react";
import { loadSession } from "@/lib/session";
import { analyze, type AnalysisResult } from "@/lib/analyze";
import { TRIAGE_DESCRIPTION, TRIAGE_LABEL, TRIAGE_COLOR } from "@/lib/triage";
import { TriageBadge } from "@/components/TriageBadge";
import { SYMPTOMS } from "@/data/symptoms";
import { useI18n } from "@/lib/i18n";

export default function ResultPage() {
  const { t } = useI18n();
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    const data = loadSession();
    if (!data) {
      setEmpty(true);
      return;
    }
    setResult(analyze(data));
  }, []);

  const symptomLabel = useMemo(() => {
    const m = new Map(SYMPTOMS.map((s) => [s.id, s.label]));
    return (id: string) => m.get(id) ?? id;
  }, []);

  if (empty) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold">{t("result.empty.title")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("result.empty.text")}</p>
        <Link to="/check" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          {t("result.empty.cta")} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  if (!result) return <div className="mx-auto max-w-2xl px-4 py-16 text-sm text-muted-foreground">{t("result.loading")}</div>;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-foreground">{t("result.title")}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{t("result.subtitle")}</p>

      <div className="mt-4 flex items-start gap-2 rounded-xl border border-primary/20 bg-primary-soft/60 p-3 text-sm text-foreground">
        <Info className="mt-0.5 h-4 w-4 text-primary" />
        <span>{t("result.basis")}</span>
      </div>

      <div className={`mt-6 rounded-2xl border p-5 ${TRIAGE_COLOR[result.overallTriage]}`}>
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5" />
          <div>
            <p className="text-sm font-semibold">
              {t("result.overall")}: {TRIAGE_LABEL[result.overallTriage]}
            </p>
            <p className="mt-1 text-sm">{TRIAGE_DESCRIPTION[result.overallTriage]}</p>
          </div>
        </div>
      </div>

      {result.redFlagsPresent.length > 0 && (
        <div className="mt-4 rounded-2xl border border-destructive/30 bg-destructive/5 p-5">
          <p className="text-sm font-semibold text-destructive">{t("result.redflags")}</p>
          <ul className="mt-2 list-disc pl-5 text-sm text-foreground">
            {result.redFlagsPresent.map((s) => (
              <li key={s}>{symptomLabel(s)}</li>
            ))}
          </ul>
          <p className="mt-2 text-sm text-foreground">{t("result.redflags.note")}</p>
        </div>
      )}

      <section className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-primary" />
          <h2 className="font-semibold text-foreground">{t("result.mini")}</h2>
        </div>
        <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
          {result.reasoning.map((r, i) => (
            <li key={i}>• {r}</li>
          ))}
        </ul>
      </section>

      <section className="mt-6 space-y-3">
        <h2 className="text-lg font-semibold text-foreground">{t("result.diff")}</h2>
        {result.matches.length === 0 && (
          <p className="text-sm text-muted-foreground">{t("result.none")}</p>
        )}
        {result.matches.map((m) => (
          <Link
            key={m.disease.id}
            to={`/disease/${m.disease.id}`}
            className="block rounded-2xl border border-border bg-card p-4 transition hover:border-primary/40 hover:shadow-[var(--shadow-soft)]"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-foreground">{m.disease.name}</h3>
                <p className="text-xs text-muted-foreground">{m.disease.category}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-medium text-primary">
                  {t("result.match")} {m.score}%
                </span>
                <TriageBadge level={m.disease.triage} />
              </div>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{m.disease.shortDescription}</p>

            <div className="mt-3 rounded-lg border border-border bg-secondary/40 p-3">
              <p className="text-xs font-semibold text-foreground">{t("result.why")}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t("result.why.matched")}{" "}
                <span className="text-foreground">{m.matchedSymptoms.map(symptomLabel).join(", ")}</span>.
              </p>
            </div>

            <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
              {t("result.more")} <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </Link>
        ))}
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/check" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:bg-secondary">
          {t("result.again")}
        </Link>
        <Link to="/catalog" className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Stethoscope className="h-4 w-4" /> {t("result.toCatalog")}
        </Link>
      </div>
    </div>
  );
}

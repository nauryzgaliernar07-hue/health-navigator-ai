import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowRight, BookOpenCheck, Info, ListChecks, ShieldCheck, Stethoscope } from "lucide-react";
import { DISEASES } from "@/data/diseases";
import { TriageBadge } from "@/components/TriageBadge";
import { useI18n } from "@/lib/i18n";

const COMMON_IDS = [
  "common_cold",
  "influenza",
  "covid19",
  "migraine",
  "hypertension",
  "gastritis",
  "uti",
  "asthma",
  "anxiety_disorder",
  "diabetes_t2",
];

export default function HomePage() {
  const { t } = useI18n();
  const common = COMMON_IDS.map((id) => DISEASES.find((d) => d.id === id)!).filter(Boolean);

  useEffect(() => {
    document.title = "МедАссистент — оценка симптомов и риска";
  }, []);

  const features = [
    { icon: ListChecks, title: t("home.feature1.title"), text: t("home.feature1.text") },
    { icon: Stethoscope, title: t("home.feature2.title"), text: t("home.feature2.text") },
    { icon: BookOpenCheck, title: t("home.feature3.title"), text: t("home.feature3.text") },
  ];

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[image:var(--gradient-hero)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-3 py-1 text-xs font-medium text-primary">
              <ShieldCheck className="h-3.5 w-3.5" /> {t("home.badge")}
            </span>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              {t("home.title")}
            </h1>
            <p className="mt-4 text-base text-muted-foreground md:text-lg">{t("home.subtitle")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/check"
                className="inline-flex items-center gap-2 rounded-xl bg-[image:var(--gradient-primary)] px-5 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-soft)] transition hover:opacity-95"
              >
                {t("home.cta.start")} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/catalog"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground hover:bg-secondary"
              >
                {t("home.cta.search")}
              </Link>
            </div>
            <p className="mt-5 inline-flex items-start gap-2 rounded-lg bg-background/70 px-3 py-2 text-xs text-muted-foreground">
              <Info className="mt-0.5 h-3.5 w-3.5 text-primary" /> {t("home.basis")}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-semibold text-foreground">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">{t("home.common.title")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t("home.common.subtitle")}</p>
          </div>
          <Link to="/catalog" className="text-sm font-medium text-primary hover:underline">
            {t("home.common.all")}
          </Link>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {common.map((d) => (
            <Link
              key={d.id}
              to={`/disease/${d.id}`}
              className="group rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)] transition hover:border-primary/40 hover:shadow-[var(--shadow-soft)]"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-foreground group-hover:text-primary">{d.name}</h3>
                <TriageBadge level={d.triage} />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{d.category}</p>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{d.shortDescription}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

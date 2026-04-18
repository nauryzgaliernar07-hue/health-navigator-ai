import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Info } from "lucide-react";
import { SYMPTOMS } from "@/data/symptoms";
import { saveSession } from "@/lib/session";
import type { AnalysisInput } from "@/lib/analyze";
import { useI18n } from "@/lib/i18n";

export default function CheckPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const STEPS = [
    t("check.step.profile"),
    t("check.step.symptoms"),
    t("check.step.duration"),
    t("check.step.lifestyle"),
    t("check.step.allergies"),
  ];

  const [age, setAge] = useState<string>("");
  const [sex, setSex] = useState<"male" | "female" | "other" | "">("");
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [duration, setDuration] = useState<string>("");
  const [intensity, setIntensity] = useState<number>(5);
  const [chronic, setChronic] = useState<string[]>([]);
  const [smokes, setSmokes] = useState(false);
  const [sleep, setSleep] = useState<string>("");
  const [allergies, setAllergies] = useState("");

  const grouped = useMemo(() => {
    const g: Record<string, typeof SYMPTOMS> = {};
    for (const s of SYMPTOMS) (g[s.category] ||= []).push(s);
    return g;
  }, []);

  const toggleSymptom = (id: string) =>
    setSymptoms((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const toggleChronic = (id: string) =>
    setChronic((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const canNext =
    (step === 0 && age && sex) ||
    (step === 1 && symptoms.length > 0) ||
    (step === 2 && duration) ||
    step === 3 ||
    step === 4;

  const submit = () => {
    const data: AnalysisInput = {
      age: age ? Number(age) : undefined,
      sex: sex || undefined,
      symptoms,
      durationDays: duration ? Number(duration) : undefined,
      intensity,
      chronic,
      smokes,
      sleepHours: sleep ? Number(sleep) : undefined,
    };
    saveSession(data);
    window.sessionStorage.setItem("med-assistant-allergies-v1", allergies);
    navigate("/result");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-foreground">{t("check.title")}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{t("check.subtitle")}</p>

      <div className="mt-3 inline-flex items-start gap-2 rounded-lg border border-primary/20 bg-primary-soft/60 px-3 py-2 text-xs text-foreground">
        <Info className="mt-0.5 h-3.5 w-3.5 text-primary" /> {t("check.basis")}
      </div>

      <ol className="mt-6 flex flex-wrap items-center gap-2 text-xs">
        {STEPS.map((label, i) => (
          <li key={label} className="flex items-center gap-2">
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-medium ${
                i < step
                  ? "border-primary bg-primary text-primary-foreground"
                  : i === step
                    ? "border-primary text-primary"
                    : "border-border text-muted-foreground"
              }`}
            >
              {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
            </span>
            <span className={i === step ? "font-medium text-foreground" : "text-muted-foreground"}>{label}</span>
            {i < STEPS.length - 1 && <span className="mx-1 h-px w-6 bg-border" />}
          </li>
        ))}
      </ol>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
        {step === 0 && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">{t("check.age")}</label>
              <input
                type="number"
                min={0}
                max={120}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                placeholder={t("check.age.ph")}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">{t("check.sex")}</label>
              <div className="mt-2 flex gap-2">
                {[
                  { v: "male", l: t("check.sex.male") },
                  { v: "female", l: t("check.sex.female") },
                  { v: "other", l: t("check.sex.other") },
                ].map((o) => (
                  <button
                    key={o.v}
                    type="button"
                    onClick={() => setSex(o.v as "male" | "female" | "other")}
                    className={`rounded-lg border px-4 py-2 text-sm transition ${
                      sex === o.v
                        ? "border-primary bg-primary-soft text-primary"
                        : "border-border bg-background hover:bg-secondary"
                    }`}
                  >
                    {o.l}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <p className="text-sm text-muted-foreground">{t("check.symptoms.hint")}</p>
            {Object.entries(grouped).map(([cat, list]) => (
              <div key={cat}>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{cat}</h3>
                <div className="flex flex-wrap gap-2">
                  {list.map((s) => {
                    const active = symptoms.includes(s.id);
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => toggleSymptom(s.id)}
                        className={`rounded-full border px-3 py-1.5 text-sm transition ${
                          active
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background hover:bg-secondary"
                        }`}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">{t("check.duration.q")}</label>
              <input
                type="number"
                min={0}
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                placeholder={t("check.duration.ph")}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">
                {t("check.intensity")}: <span className="text-primary">{intensity}/10</span>
              </label>
              <input
                type="range"
                min={1}
                max={10}
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="mt-2 w-full accent-[oklch(0.58_0.14_235)]"
              />
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>{t("check.intensity.low")}</span>
                <span>{t("check.intensity.mid")}</span>
                <span>{t("check.intensity.high")}</span>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-foreground">{t("check.chronic")}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {[
                  "Гипертония",
                  "Диабет",
                  "Астма",
                  "ХОБЛ",
                  "ИБС",
                  "Заболевания почек",
                  "Заболевания печени",
                  "Онкология в анамнезе",
                ].map((c) => {
                  const active = chronic.includes(c);
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => toggleChronic(c)}
                      className={`rounded-full border px-3 py-1.5 text-sm transition ${
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background hover:bg-secondary"
                      }`}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={smokes}
                onChange={(e) => setSmokes(e.target.checked)}
                className="h-4 w-4 accent-[oklch(0.58_0.14_235)]"
              />
              {t("check.smokes")}
            </label>
            <div>
              <label className="text-sm font-medium text-foreground">{t("check.sleep")}</label>
              <input
                type="number"
                min={0}
                max={24}
                value={sleep}
                onChange={(e) => setSleep(e.target.value)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                placeholder={t("check.sleep.ph")}
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">{t("check.allergies.q")}</label>
            <textarea
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              className="min-h-[120px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
              placeholder={t("check.allergies.ph")}
            />
            <p className="text-xs text-muted-foreground">{t("check.allergies.note")}</p>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition disabled:opacity-40 enabled:hover:bg-secondary"
          >
            <ArrowLeft className="h-4 w-4" /> {t("check.back")}
          </button>
          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={() => canNext && setStep((s) => s + 1)}
              disabled={!canNext}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition disabled:opacity-40 enabled:hover:bg-primary/90"
            >
              {t("check.next")} <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[image:var(--gradient-primary)] px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-soft)] transition hover:opacity-95"
            >
              {t("check.submit")} <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

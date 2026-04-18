import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { DISEASES } from "@/data/diseases";
import { TriageBadge } from "@/components/TriageBadge";
import { useI18n } from "@/lib/i18n";

export default function CatalogPage() {
  const { t } = useI18n();
  const [q, setQ] = useState("");
  const categories = useMemo(() => Array.from(new Set(DISEASES.map((d) => d.category))).sort(), []);
  const [cat, setCat] = useState<string>("");

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return DISEASES.filter((d) => {
      if (cat && d.category !== cat) return false;
      if (!ql) return true;
      return (
        d.name.toLowerCase().includes(ql) ||
        d.category.toLowerCase().includes(ql) ||
        d.shortDescription.toLowerCase().includes(ql)
      );
    });
  }, [q, cat]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-foreground">{t("catalog.title")}</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {DISEASES.length}+ {t("catalog.subtitle")}
      </p>

      <div className="mt-6 flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("catalog.search.ph")}
            className="w-full rounded-xl border border-input bg-card px-9 py-2.5 text-sm shadow-[var(--shadow-card)] focus:border-primary focus:outline-none"
          />
        </div>
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          className="rounded-xl border border-input bg-card px-3 py-2.5 text-sm shadow-[var(--shadow-card)] focus:border-primary focus:outline-none"
        >
          <option value="">{t("catalog.allCategories")}</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">{t("catalog.found")} {filtered.length}</p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((d) => (
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
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{d.shortDescription}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

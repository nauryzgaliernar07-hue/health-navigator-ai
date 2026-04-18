import { NavLink, Link } from "react-router-dom";
import { Stethoscope } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function SiteHeader() {
  const { t } = useI18n();
  const base =
    "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md hover:bg-primary-soft";
  const active = "text-primary bg-primary-soft";

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-semibold text-foreground">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-soft)]">
            <Stethoscope className="h-5 w-5" />
          </span>
          <span className="text-base">{t("brand")}</span>
        </Link>
        <nav className="flex items-center gap-1">
          <NavLink to="/" end className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
            {t("nav.home")}
          </NavLink>
          <NavLink to="/check" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
            {t("nav.check")}
          </NavLink>
          <NavLink to="/catalog" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
            {t("nav.catalog")}
          </NavLink>
          <NavLink to="/sources" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
            {t("nav.sources")}
          </NavLink>
          <span className="ml-2">
            <LanguageSwitcher />
          </span>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="mt-16 border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-muted-foreground">
        <p className="font-medium text-foreground">{t("footer.important")}</p>
        <p className="mt-1">{t("footer.disclaimer")}</p>
      </div>
    </footer>
  );
}

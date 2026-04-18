import { HashRouter, Routes, Route, Link } from "react-router-dom";
import { I18nProvider } from "@/lib/i18n";
import { SiteHeader, SiteFooter } from "@/components/SiteLayout";
import HomePage from "@/pages/HomePage";
import CheckPage from "@/pages/CheckPage";
import ResultPage from "@/pages/ResultPage";
import CatalogPage from "@/pages/CatalogPage";
import SourcesPage from "@/pages/SourcesPage";
import DiseasePage from "@/pages/DiseasePage";

function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Страница не найдена</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Эта страница не существует или была перемещена.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          На главную
        </Link>
      </div>
    </div>
  );
}

export function App() {
  return (
    <I18nProvider>
      <HashRouter>
        <div className="flex min-h-screen flex-col bg-background text-foreground">
          <SiteHeader />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/check" element={<CheckPage />} />
              <Route path="/result" element={<ResultPage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/sources" element={<SourcesPage />} />
              <Route path="/disease/:diseaseId" element={<DiseasePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <SiteFooter />
        </div>
      </HashRouter>
    </I18nProvider>
  );
}

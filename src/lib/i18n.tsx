import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ru" | "kk" | "en";

export const LANGS: { code: Lang; label: string; short: string }[] = [
  { code: "ru", label: "Русский", short: "RU" },
  { code: "kk", label: "Қазақша", short: "KZ" },
  { code: "en", label: "English", short: "EN" },
];

type Dict = Record<string, string>;

const ru: Dict = {
  "nav.home": "Главная",
  "nav.check": "Опрос",
  "nav.catalog": "Болезни",
  "nav.sources": "Источники",
  "brand": "МедАссистент",

  "footer.important": "⚠️ Важно",
  "footer.disclaimer":
    "Этот сервис носит исключительно информационный характер и не заменяет консультацию врача. Оценки основаны на введённых вами данных и общих медицинских рекомендациях, а не на постановке диагноза. При тревожных симптомах вызывайте скорую помощь (103 / 112).",

  "home.badge": "Доказательная медицина · не заменяет врача",
  "home.title": "Поймите свои симптомы — спокойно и обоснованно",
  "home.subtitle":
    "Пошаговый опрос, оценка уровня риска (триаж), список возможных направлений и понятные рекомендации, что делать дальше.",
  "home.cta.start": "Начать опрос",
  "home.cta.search": "Поиск по заболеваниям",
  "home.feature1.title": "Опрос по шагам",
  "home.feature1.text": "Возраст, симптомы, длительность, хронические болезни — всё структурировано.",
  "home.feature2.title": "Триаж и красные флаги",
  "home.feature2.text": "Видите уровень риска и тревожные симптомы, требующие срочной помощи.",
  "home.feature3.title": "Почему именно это?",
  "home.feature3.text": "Объясняем логику: какие признаки совпали и насколько.",
  "home.common.title": "Самые распространённые заболевания",
  "home.common.subtitle": "Краткие критерии и уровень риска. Полный поиск — в разделе «Болезни».",
  "home.common.all": "Все болезни →",
  "home.basis": "Оценки основаны на введённых вами данных и общих медицинских рекомендациях.",

  "check.title": "Пошаговый опрос",
  "check.subtitle": "Ответы остаются у вас в браузере. Это не диагноз — лишь ориентир для разговора с врачом.",
  "check.basis": "Анализ строится на ваших ответах и общих клинических рекомендациях, а не на диагнозе.",
  "check.step.profile": "Профиль",
  "check.step.symptoms": "Симптомы",
  "check.step.duration": "Длительность",
  "check.step.lifestyle": "Образ жизни",
  "check.step.allergies": "Аллергии",
  "check.age": "Возраст",
  "check.age.ph": "Например, 34",
  "check.sex": "Пол",
  "check.sex.male": "Мужской",
  "check.sex.female": "Женский",
  "check.sex.other": "Другое",
  "check.symptoms.hint": "Выберите все, что подходит.",
  "check.duration.q": "Сколько дней длятся симптомы?",
  "check.duration.ph": "Например, 3",
  "check.intensity": "Интенсивность",
  "check.intensity.low": "Слабо",
  "check.intensity.mid": "Умеренно",
  "check.intensity.high": "Сильно",
  "check.chronic": "Хронические заболевания",
  "check.smokes": "Курю",
  "check.sleep": "Часов сна в сутки",
  "check.sleep.ph": "Например, 7",
  "check.allergies.q": "Есть ли у вас аллергия на лекарства? (важно — повлияет на рекомендации)",
  "check.allergies.ph": "Например: пенициллин, аспирин, ибупрофен, нет",
  "check.allergies.note": "Если вы укажете препарат, мы исключим его из рекомендаций по обезболиванию.",
  "check.back": "Назад",
  "check.next": "Далее",
  "check.submit": "Получить анализ",

  "result.title": "Возможные направления",
  "result.subtitle": "Список не является диагнозом. Используйте его как ориентир в разговоре с врачом.",
  "result.basis":
    "Оценка основана на введённых вами данных и общих медицинских рекомендациях. Это не заменяет консультацию врача.",
  "result.empty.title": "Сначала пройдите опрос",
  "result.empty.text": "Чтобы увидеть результаты, заполните пошаговый опросник.",
  "result.empty.cta": "Перейти к опросу",
  "result.loading": "Анализируем…",
  "result.overall": "Общий уровень риска",
  "result.redflags": "🚩 Тревожные симптомы",
  "result.redflags.note": "При этих симптомах рекомендуем обратиться за медицинской помощью без промедления.",
  "result.mini": "Мини-анализ (на основе введённых данных)",
  "result.diff": "Дифференциальные направления",
  "result.none": "Совпадений не найдено. Попробуйте уточнить симптомы или обратитесь к врачу.",
  "result.match": "Совпадение",
  "result.why": "Почему?",
  "result.why.matched": "Совпали симптомы:",
  "result.more": "Подробнее",
  "result.again": "Пройти опрос заново",
  "result.toCatalog": "Поиск по болезням",

  "catalog.title": "Каталог заболеваний",
  "catalog.subtitle": "состояний с краткими критериями и уровнем риска.",
  "catalog.search.ph": "Поиск по названию или симптому…",
  "catalog.allCategories": "Все категории",
  "catalog.found": "Найдено:",

  "sources.title": "Источники",
  "sources.subtitle":
    "Информация на сайте основана на открытых клинических руководствах и проверенных медицинских ресурсах.",
  "sources.open": "Открыть",
  "sources.disclaimer":
    "Сервис не предоставляет медицинских услуг и не заменяет очную консультацию врача. Все рекомендации носят информационный характер.",

  "triage.low": "Низкий",
  "triage.medium": "Средний",
  "triage.high": "Высокий",
  "triage.urgent": "Срочно",

  "lang.label": "Язык",
};

const kk: Dict = {
  "nav.home": "Басты бет",
  "nav.check": "Сауалнама",
  "nav.catalog": "Аурулар",
  "nav.sources": "Дереккөздер",
  "brand": "МедАссистент",

  "footer.important": "⚠️ Маңызды",
  "footer.disclaimer":
    "Бұл сервис тек ақпараттық сипатта, дәрігер кеңесін алмастырмайды. Бағалау сіз енгізген деректер мен жалпы медициналық ұсыныстарға негізделген, диагноз қою емес. Қауіпті белгілер пайда болса, жедел жәрдем шақырыңыз (103 / 112).",

  "home.badge": "Дәлелді медицина · дәрігерді алмастырмайды",
  "home.title": "Симптомдарыңызды сабырлы әрі негізді түсініңіз",
  "home.subtitle":
    "Қадамдық сауалнама, тәуекел деңгейін бағалау (триаж), ықтимал бағыттар тізімі және келесі қадамдар бойынша түсінікті ұсыныстар.",
  "home.cta.start": "Сауалнаманы бастау",
  "home.cta.search": "Аурулардан іздеу",
  "home.feature1.title": "Қадамдық сауалнама",
  "home.feature1.text": "Жасы, симптомдары, ұзақтығы, созылмалы аурулар — бәрі құрылымдалған.",
  "home.feature2.title": "Триаж және қызыл жалаулар",
  "home.feature2.text": "Тәуекел деңгейін және жедел көмекті қажет ететін белгілерді көресіз.",
  "home.feature3.title": "Неліктен дәл осы?",
  "home.feature3.text": "Логиканы түсіндіреміз: қандай белгілер сәйкес келді және қаншалықты.",
  "home.common.title": "Ең көп таралған аурулар",
  "home.common.subtitle": "Қысқаша критерийлер мен тәуекел деңгейі. Толық іздеу — «Аурулар» бөлімінде.",
  "home.common.all": "Барлық аурулар →",
  "home.basis": "Бағалаулар сіз енгізген деректер мен жалпы медициналық ұсыныстарға негізделген.",

  "check.title": "Қадамдық сауалнама",
  "check.subtitle": "Жауаптар браузеріңізде сақталады. Бұл — диагноз емес, дәрігермен сөйлесуге бағдар ғана.",
  "check.basis": "Талдау сіздің жауаптарыңыз бен жалпы клиникалық ұсыныстарға негізделген, диагноз емес.",
  "check.step.profile": "Профиль",
  "check.step.symptoms": "Симптомдар",
  "check.step.duration": "Ұзақтығы",
  "check.step.lifestyle": "Өмір салты",
  "check.step.allergies": "Аллергия",
  "check.age": "Жасы",
  "check.age.ph": "Мысалы, 34",
  "check.sex": "Жынысы",
  "check.sex.male": "Ер",
  "check.sex.female": "Әйел",
  "check.sex.other": "Басқа",
  "check.symptoms.hint": "Сәйкес келетіндердің барлығын таңдаңыз.",
  "check.duration.q": "Симптомдар неше күн жалғасуда?",
  "check.duration.ph": "Мысалы, 3",
  "check.intensity": "Қарқындылығы",
  "check.intensity.low": "Әлсіз",
  "check.intensity.mid": "Орташа",
  "check.intensity.high": "Күшті",
  "check.chronic": "Созылмалы аурулар",
  "check.smokes": "Темекі шегемін",
  "check.sleep": "Тәуліктік ұйқы (сағат)",
  "check.sleep.ph": "Мысалы, 7",
  "check.allergies.q": "Дәрі-дәрмекке аллергияңыз бар ма? (маңызды — ұсыныстарға әсер етеді)",
  "check.allergies.ph": "Мысалы: пенициллин, аспирин, ибупрофен, жоқ",
  "check.allergies.note": "Препаратты көрсетсеңіз, оны ауырсыну ұсыныстарынан алып тастаймыз.",
  "check.back": "Артқа",
  "check.next": "Әрі қарай",
  "check.submit": "Талдау алу",

  "result.title": "Ықтимал бағыттар",
  "result.subtitle": "Тізім — диагноз емес. Дәрігермен әңгімеге бағдар ретінде пайдаланыңыз.",
  "result.basis":
    "Бағалау сіз енгізген деректер мен жалпы медициналық ұсыныстарға негізделген. Бұл дәрігер кеңесін алмастырмайды.",
  "result.empty.title": "Алдымен сауалнамадан өтіңіз",
  "result.empty.text": "Нәтижені көру үшін қадамдық сауалнаманы толтырыңыз.",
  "result.empty.cta": "Сауалнамаға өту",
  "result.loading": "Талдап жатырмыз…",
  "result.overall": "Жалпы тәуекел деңгейі",
  "result.redflags": "🚩 Қауіпті симптомдар",
  "result.redflags.note": "Осы белгілер болса, кідірмей медициналық көмекке жүгінуді ұсынамыз.",
  "result.mini": "Мини-талдау (енгізілген деректерге негізделген)",
  "result.diff": "Дифференциалдық бағыттар",
  "result.none": "Сәйкестік табылмады. Симптомдарды нақтылап көріңіз немесе дәрігерге қаралыңыз.",
  "result.match": "Сәйкестік",
  "result.why": "Неліктен?",
  "result.why.matched": "Сәйкес симптомдар:",
  "result.more": "Толығырақ",
  "result.again": "Сауалнамадан қайта өту",
  "result.toCatalog": "Аурулардан іздеу",

  "catalog.title": "Аурулар каталогы",
  "catalog.subtitle": "жағдай қысқаша критерийлермен және тәуекел деңгейімен.",
  "catalog.search.ph": "Атауы немесе симптомы бойынша іздеу…",
  "catalog.allCategories": "Барлық санаттар",
  "catalog.found": "Табылды:",

  "sources.title": "Дереккөздер",
  "sources.subtitle":
    "Сайттағы ақпарат ашық клиникалық нұсқаулықтар мен тексерілген медициналық ресурстарға негізделген.",
  "sources.open": "Ашу",
  "sources.disclaimer":
    "Сервис медициналық қызмет көрсетпейді және дәрігердің кеңесін алмастырмайды. Барлық ұсыныстар ақпараттық сипатта.",

  "triage.low": "Төмен",
  "triage.medium": "Орташа",
  "triage.high": "Жоғары",
  "triage.urgent": "Жедел",

  "lang.label": "Тіл",
};

const en: Dict = {
  "nav.home": "Home",
  "nav.check": "Check",
  "nav.catalog": "Diseases",
  "nav.sources": "Sources",
  "brand": "MedAssistant",

  "footer.important": "⚠️ Important",
  "footer.disclaimer":
    "This service is for informational purposes only and does not replace a doctor's consultation. Estimates are based on the data you entered and general medical guidelines, not a diagnosis. For alarming symptoms, call emergency services (103 / 112).",

  "home.badge": "Evidence-based · not a substitute for a doctor",
  "home.title": "Understand your symptoms — calmly and reasonably",
  "home.subtitle":
    "Step-by-step questionnaire, risk-level assessment (triage), a list of possible directions, and clear guidance on next steps.",
  "home.cta.start": "Start questionnaire",
  "home.cta.search": "Search diseases",
  "home.feature1.title": "Step-by-step survey",
  "home.feature1.text": "Age, symptoms, duration, chronic conditions — all structured.",
  "home.feature2.title": "Triage & red flags",
  "home.feature2.text": "See risk level and warning symptoms requiring urgent care.",
  "home.feature3.title": "Why this one?",
  "home.feature3.text": "We explain the logic: which signs matched and how strongly.",
  "home.common.title": "Most common conditions",
  "home.common.subtitle": "Brief criteria and risk level. Full search — in the «Diseases» section.",
  "home.common.all": "All diseases →",
  "home.basis": "Estimates are based on the data you provided and general medical guidelines.",

  "check.title": "Step-by-step questionnaire",
  "check.subtitle": "Your answers stay in your browser. This is not a diagnosis — only a guide for talking to a doctor.",
  "check.basis": "The analysis is based on your answers and general clinical guidelines, not on a diagnosis.",
  "check.step.profile": "Profile",
  "check.step.symptoms": "Symptoms",
  "check.step.duration": "Duration",
  "check.step.lifestyle": "Lifestyle",
  "check.step.allergies": "Allergies",
  "check.age": "Age",
  "check.age.ph": "e.g., 34",
  "check.sex": "Sex",
  "check.sex.male": "Male",
  "check.sex.female": "Female",
  "check.sex.other": "Other",
  "check.symptoms.hint": "Select all that apply.",
  "check.duration.q": "How many days have symptoms lasted?",
  "check.duration.ph": "e.g., 3",
  "check.intensity": "Intensity",
  "check.intensity.low": "Mild",
  "check.intensity.mid": "Moderate",
  "check.intensity.high": "Severe",
  "check.chronic": "Chronic conditions",
  "check.smokes": "I smoke",
  "check.sleep": "Hours of sleep per day",
  "check.sleep.ph": "e.g., 7",
  "check.allergies.q": "Do you have any drug allergies? (important — affects recommendations)",
  "check.allergies.ph": "e.g., penicillin, aspirin, ibuprofen, none",
  "check.allergies.note": "If you list a drug, we will exclude it from pain-relief recommendations.",
  "check.back": "Back",
  "check.next": "Next",
  "check.submit": "Get analysis",

  "result.title": "Possible directions",
  "result.subtitle": "This list is not a diagnosis. Use it as a guide for talking to your doctor.",
  "result.basis":
    "The assessment is based on the data you entered and general medical guidelines. It does not replace a doctor's consultation.",
  "result.empty.title": "Take the questionnaire first",
  "result.empty.text": "To see results, complete the step-by-step questionnaire.",
  "result.empty.cta": "Go to questionnaire",
  "result.loading": "Analyzing…",
  "result.overall": "Overall risk level",
  "result.redflags": "🚩 Warning symptoms",
  "result.redflags.note": "With these symptoms we recommend seeking medical care without delay.",
  "result.mini": "Mini-analysis (based on the data you entered)",
  "result.diff": "Differential directions",
  "result.none": "No matches found. Try refining symptoms or consult a doctor.",
  "result.match": "Match",
  "result.why": "Why?",
  "result.why.matched": "Matched symptoms:",
  "result.more": "Details",
  "result.again": "Retake questionnaire",
  "result.toCatalog": "Search diseases",

  "catalog.title": "Diseases catalog",
  "catalog.subtitle": "conditions with brief criteria and risk level.",
  "catalog.search.ph": "Search by name or symptom…",
  "catalog.allCategories": "All categories",
  "catalog.found": "Found:",

  "sources.title": "Sources",
  "sources.subtitle":
    "Information on this site is based on open clinical guidelines and trusted medical resources.",
  "sources.open": "Open",
  "sources.disclaimer":
    "The service does not provide medical services and does not replace an in-person consultation. All recommendations are informational.",

  "triage.low": "Low",
  "triage.medium": "Medium",
  "triage.high": "High",
  "triage.urgent": "Urgent",

  "lang.label": "Language",
};

const DICTS: Record<Lang, Dict> = { ru, kk, en };

const STORAGE_KEY = "med-assistant-lang-v1";

interface I18nContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ru");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored && (stored === "ru" || stored === "kk" || stored === "en")) {
      setLangState(stored);
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, l);
      document.documentElement.lang = l;
    }
  };

  const t = (key: string) => DICTS[lang][key] ?? DICTS.ru[key] ?? key;

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}

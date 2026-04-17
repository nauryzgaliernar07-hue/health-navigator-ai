export interface Source {
  id: string;
  name: string;
  url: string;
  description: string;
}

export const SOURCES: Source[] = [
  { id: "who", name: "Всемирная организация здравоохранения (WHO)", url: "https://www.who.int/", description: "Международные клинические рекомендации и эпидемиология." },
  { id: "cdc", name: "Centers for Disease Control and Prevention (CDC)", url: "https://www.cdc.gov/", description: "Профилактика и контроль заболеваний." },
  { id: "nhs", name: "NHS UK", url: "https://www.nhs.uk/", description: "Британский справочник пациентов с проверенной информацией." },
  { id: "mayoclinic", name: "Mayo Clinic", url: "https://www.mayoclinic.org/", description: "Клинические описания болезней и симптомов." },
  { id: "esc", name: "European Society of Cardiology (ESC)", url: "https://www.escardio.org/", description: "Гайдлайны по кардиологии." },
  { id: "ahaheart", name: "American Heart Association", url: "https://www.heart.org/", description: "Сердечно-сосудистые заболевания." },
  { id: "ada", name: "American Diabetes Association", url: "https://diabetes.org/", description: "Диабет и метаболические нарушения." },
  { id: "gina", name: "GINA — Global Initiative for Asthma", url: "https://ginasthma.org/", description: "Международные рекомендации по астме." },
  { id: "uptodate", name: "UpToDate", url: "https://www.uptodate.com/", description: "Доказательная база для клиницистов." },
  { id: "cochrane", name: "Cochrane Library", url: "https://www.cochranelibrary.com/", description: "Систематические обзоры доказательной медицины." },
];

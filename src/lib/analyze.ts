import { DISEASES, type Disease, type Triage } from "@/data/diseases";
import { RED_FLAGS } from "@/data/symptoms";

export interface AnalysisInput {
  age?: number;
  sex?: "male" | "female" | "other";
  symptoms: string[];
  durationDays?: number;
  intensity?: number; // 1-10
  chronic: string[];
  smokes?: boolean;
  sleepHours?: number;
}

export interface DiseaseMatch {
  disease: Disease;
  score: number; // 0-100
  matchedSymptoms: string[];
}

export interface AnalysisResult {
  matches: DiseaseMatch[];
  redFlagsPresent: string[];
  overallTriage: Triage;
  reasoning: string[];
}

export function analyze(input: AnalysisInput): AnalysisResult {
  const symptomSet = new Set(input.symptoms);
  const matches: DiseaseMatch[] = [];

  for (const d of DISEASES) {
    const matched = d.symptoms.filter((s) => symptomSet.has(s));
    if (matched.length === 0) continue;
    const coverage = matched.length / d.symptoms.length; // насколько симптомы болезни покрыты
    const specificity = matched.length / Math.max(input.symptoms.length, 1); // насколько симптомы пользователя относятся к болезни
    const baseScore = (coverage * 0.65 + specificity * 0.35) * 100;

    // Триаж-бонус: при тревожных симптомах поднимаем экстренные состояния
    const hasRedFlag = matched.some((m) => RED_FLAGS.has(m));
    const triageBonus =
      d.triage === "urgent" && hasRedFlag ? 15 : d.triage === "high" && hasRedFlag ? 8 : 0;

    matches.push({
      disease: d,
      score: Math.min(100, Math.round(baseScore + triageBonus)),
      matchedSymptoms: matched,
    });
  }

  matches.sort((a, b) => b.score - a.score);
  const top = matches.slice(0, 8);

  const redFlagsPresent = input.symptoms.filter((s) => RED_FLAGS.has(s));

  let overallTriage: Triage = "low";
  if (redFlagsPresent.length > 0) overallTriage = "urgent";
  else if (top[0]?.disease.triage === "high") overallTriage = "high";
  else if (top[0]?.disease.triage === "medium") overallTriage = "medium";

  const reasoning: string[] = [];
  reasoning.push(`Введено симптомов: ${input.symptoms.length}.`);
  if (redFlagsPresent.length > 0)
    reasoning.push(`Обнаружены тревожные симптомы (${redFlagsPresent.length}). Уровень триажа повышен до «срочно».`);
  if (top[0])
    reasoning.push(
      `Наиболее вероятное направление — «${top[0].disease.name}» (совпадение ${top[0].score}%): совпало ${top[0].matchedSymptoms.length} из ${top[0].disease.symptoms.length} типичных признаков.`,
    );
  if (input.age && input.age >= 60) reasoning.push("Возраст 60+ повышает риск осложнений — учтено в рекомендациях.");
  if (input.smokes) reasoning.push("Курение — независимый фактор риска для дыхательных и сердечно-сосудистых заболеваний.");
  if (input.chronic.length > 0)
    reasoning.push(`Хронические заболевания (${input.chronic.join(", ")}) могут изменять клиническую картину.`);

  return { matches: top, redFlagsPresent, overallTriage, reasoning };
}

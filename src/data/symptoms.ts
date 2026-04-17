export interface Symptom {
  id: string;
  label: string;
  category: string;
}

export const SYMPTOMS: Symptom[] = [
  { id: "fever", label: "Повышенная температура", category: "Общие" },
  { id: "fatigue", label: "Сильная слабость / усталость", category: "Общие" },
  { id: "chills", label: "Озноб", category: "Общие" },
  { id: "weight_loss", label: "Потеря веса без причины", category: "Общие" },
  { id: "night_sweats", label: "Ночная потливость", category: "Общие" },

  { id: "headache", label: "Головная боль", category: "Голова и нервы" },
  { id: "dizziness", label: "Головокружение", category: "Голова и нервы" },
  { id: "confusion", label: "Спутанность сознания", category: "Голова и нервы" },
  { id: "loss_consciousness", label: "Потеря сознания", category: "Голова и нервы" },
  { id: "numbness", label: "Онемение конечностей", category: "Голова и нервы" },
  { id: "speech_problems", label: "Нарушение речи", category: "Голова и нервы" },
  { id: "vision_problems", label: "Нарушение зрения", category: "Голова и нервы" },

  { id: "cough", label: "Кашель", category: "Дыхание" },
  { id: "cough_blood", label: "Кашель с кровью", category: "Дыхание" },
  { id: "shortness_breath", label: "Одышка", category: "Дыхание" },
  { id: "wheezing", label: "Хрипы / свист в груди", category: "Дыхание" },
  { id: "sore_throat", label: "Боль в горле", category: "Дыхание" },
  { id: "runny_nose", label: "Насморк / заложенность", category: "Дыхание" },

  { id: "chest_pain", label: "Боль в груди", category: "Сердце и сосуды" },
  { id: "palpitations", label: "Учащённое сердцебиение", category: "Сердце и сосуды" },
  { id: "high_bp", label: "Высокое давление", category: "Сердце и сосуды" },
  { id: "leg_swelling", label: "Отёки ног", category: "Сердце и сосуды" },

  { id: "abdominal_pain", label: "Боль в животе", category: "ЖКТ" },
  { id: "nausea", label: "Тошнота", category: "ЖКТ" },
  { id: "vomiting", label: "Рвота", category: "ЖКТ" },
  { id: "vomiting_blood", label: "Рвота с кровью", category: "ЖКТ" },
  { id: "diarrhea", label: "Диарея", category: "ЖКТ" },
  { id: "constipation", label: "Запор", category: "ЖКТ" },
  { id: "heartburn", label: "Изжога", category: "ЖКТ" },
  { id: "blood_stool", label: "Кровь в стуле", category: "ЖКТ" },

  { id: "joint_pain", label: "Боль в суставах", category: "Опорно-двигательная" },
  { id: "muscle_pain", label: "Боль в мышцах", category: "Опорно-двигательная" },
  { id: "back_pain", label: "Боль в спине", category: "Опорно-двигательная" },

  { id: "rash", label: "Сыпь на коже", category: "Кожа" },
  { id: "itching", label: "Зуд", category: "Кожа" },
  { id: "skin_yellowing", label: "Пожелтение кожи", category: "Кожа" },

  { id: "frequent_urination", label: "Частое мочеиспускание", category: "Мочеполовая" },
  { id: "painful_urination", label: "Боль при мочеиспускании", category: "Мочеполовая" },
  { id: "blood_urine", label: "Кровь в моче", category: "Мочеполовая" },

  { id: "anxiety", label: "Тревожность", category: "Психика" },
  { id: "depression_mood", label: "Подавленное настроение", category: "Психика" },
  { id: "insomnia", label: "Бессонница", category: "Психика" },

  { id: "thirst", label: "Сильная жажда", category: "Эндокринная" },
  { id: "frequent_hunger", label: "Постоянный голод", category: "Эндокринная" },
];

export const RED_FLAGS = new Set<string>([
  "chest_pain",
  "loss_consciousness",
  "speech_problems",
  "cough_blood",
  "vomiting_blood",
  "blood_stool",
  "numbness",
  "vision_problems",
  "confusion",
]);

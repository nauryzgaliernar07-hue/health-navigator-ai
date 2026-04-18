# 🩺 Symptom Checker

Веб-приложение для предварительного анализа симптомов и оценки риска распространённых заболеваний.

⚠️ Этот инструмент **не ставит диагноз** и предназначен только для информационных целей.

---

## 🚀 Стек

- React 19 + TypeScript
- Vite 7 (статическая сборка)
- React Router (HashRouter — для совместимости с GitHub Pages)
- Tailwind CSS v4
- Локальная база данных (~110 заболеваний, 50+ симптомов)
- i18n: 🇷🇺 Русский, 🇰🇿 Қазақша, 🇬🇧 English

---

## 🛠️ Локальная разработка

```bash
bun install
bun run dev      # http://localhost:8080
bun run build    # сборка в ./dist
bun run preview  # предпросмотр сборки
```

---

## 🌐 Публикация на GitHub Pages

Проект настроен для автоматического деплоя через **GitHub Actions**.

### Шаги:

1. **Создайте репозиторий** с именем `<ваш-логин>.github.io`  
   (например, `symptomcheck.github.io`)
2. **Подключите Lovable к GitHub** через Connectors → GitHub → Connect project,  
   выберите этот репозиторий.
3. На GitHub откройте **Settings → Pages** и в поле **Source** выберите **GitHub Actions**.
4. Сделайте любой коммит в ветку `main` (или просто запустите workflow вручную:  
   Actions → "Deploy to GitHub Pages" → Run workflow).
5. Через 1–2 минуты сайт будет доступен по адресу `https://<ваш-логин>.github.io`.

Workflow файл: `.github/workflows/deploy.yml`

### Важно про роутинг

Используется `HashRouter`, поэтому URL выглядят как:
```
https://your-site.github.io/#/catalog
https://your-site.github.io/#/disease/migraine
```
Это сделано специально, чтобы GitHub Pages никогда не возвращал 404 при обновлении страницы или прямом переходе по ссылке.

---

## 📚 Источники
- WHO (Всемирная организация здравоохранения)
- CDC (Centers for Disease Control and Prevention)
- NHS (National Health Service)
- Mayo Clinic, MedlinePlus, UpToDate, Cochrane и др.

Полный список — на странице `/sources` в приложении.

---

## ⚠️ Дисклеймер
Этот сайт не является медицинским устройством и не заменяет консультацию врача. При тревожных симптомах немедленно обратитесь за медицинской помощью.

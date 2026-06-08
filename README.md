# 💼 Premium Developer Portfolio Landing Page

Эффектный, современный и минималистичный лендинг-портфолио, созданный для **Кирилла** — AI-инженера и Python-разработчика. Интерфейс выдержан в премиальном кремовом стиле («цвет бумаги») и включает в себя интерактивную фоновую нейросеть, анимированные карточки и встроенного ИИ-ассистента.

---

## 🎨 Дизайн-концепция: «Warm Paper»
- **Цветовая палитра**: Мягкий кремовый фон страницы (`#fcfaf6`), контрастные белые карточки (`#ffffff`) с тонкими кофейными границами и тенями, глубокий кофейно-угольный цвет текста (`#3d3025`) и терракотовые акценты (`#c85a32`).
- **Интерактивная нейросеть**: Анимированный фон (HTML5 Canvas), который динамически подстраивается под цвета интерфейса и реагирует на движение курсора мыши.
- **Двойные ИИ-аватары**: 
  - Главный аватар в разделе «Обо мне» (мужской ИИ-персонаж в плоском векторном стиле).
  - Аватар ИИ-ассистента в правом нижнем углу (женский ИИ-персонаж с индикатором онлайн-статуса).

---

## ⚡ Технологический стек
- **Frontend**: Vite 6, TypeScript 5.8, Vanilla CSS (Modern Custom Properties & CSS Variables)
- **Backend / API**: Serverless Netlify Functions (Node.js)
- **Email-отправка**: Resend API
- **AI-интеграция**: OpenAI API (`gpt-4o-mini`) или OpenRouter API (`google/gemma-2-9b-it:free`)

---

## 📁 Структура проекта
```
agitated-davinci/
├── netlify/
│   └── functions/
│       ├── contact.ts            # POST /api/contact — отправка почты через Resend
│       └── chat.ts               # POST /api/chat — проксирование запросов к OpenAI/OpenRouter
├── public/
│   ├── avatar.png                # Аватар Кирилла (мужской)
│   ├── assistant.png             # Аватар AI-ассистента (женский)
│   └── favicon.svg               # Фавиконка ("K.")
├── src/
│   ├── data/
│   │   └── portfolio.ts          # Все тексты, навыки и проекты
│   ├── styles/                   # Модульные стили
│   │   ├── variables.css         # Цветовая гамма и токены
│   │   └── reset.css, hero.css ...
│   ├── utils/                    # Вспомогательные скрипты (частицы, валидация)
│   └── main.ts                   # Точка входа TypeScript
├── netlify.toml                  # Конфигурация деплоя Netlify
├── package.json
└── tsconfig.json
```

---

## ⚙️ Настройка переменных окружения

Для полноценной работы контактной формы и искусственного интеллекта необходимо задать переменные окружения. Создайте файл `.env` в корне проекта (он добавлен в `.gitignore`):

```env
# API-ключ для отправки почты (Resend)
RESEND_API_KEY=re_your_api_key

# Почта, куда будут приходить письма (по умолчанию: andrey.piskynov2006@gmail.com)
CONTACT_EMAIL=andrey.piskynov2006@gmail.com

# Для AI-помощника укажите ОДИН из двух ключей:
# 1. Ключ OpenAI (использует модель gpt-4o-mini)
OPENAI_API_KEY=sk-proj-your_openai_key

# 2. ИЛИ ключ OpenRouter (использует модель google/gemma-2-9b-it:free)
OPENROUTER_API_KEY=sk-or-your_openrouter_key
```

*Если ни один из ключей для ИИ не настроен, виджет чата автоматически переключится на **умный оффлайн-режим (mock-mode)** и продолжит корректно отвечать на вопросы о Кирилле на основе заготовленных данных.*

---

## 🚀 Локальный запуск

1. Установите зависимости:
   ```bash
   npm install
   ```
2. Запустите локальный сервер разработки:
   ```bash
   npm run dev
   ```
3. Откройте страницу в браузере: `http://localhost:3000/`.

---

## ☁️ Деплой на Netlify

1. Инициализируйте репозиторий Git и залейте проект на GitHub/GitLab.
2. Авторизуйтесь на [Netlify](https://www.netlify.com/) и нажмите **Add new site** -> **Import an existing project**.
3. Выберите репозиторий с проектом. Настройки сборки подтянутся автоматически из файла `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Functions directory**: `netlify/functions`
4. Перейдите в **Site Configuration** -> **Environment variables** и добавьте ваши ключи API (`RESEND_API_KEY`, `OPENAI_API_KEY` или `OPENROUTER_API_KEY`, `CONTACT_EMAIL`).
5. Нажмите **Deploy site**. Готово! Лендинг с работающей почтой и ИИ-помощником опубликован.

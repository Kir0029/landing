import { Handler } from '@netlify/functions';

const SYSTEM_PROMPT = `Ты — AI-ассистент на портфолио-сайте Кирилла, AI-инженера и разработчика на Python.
Твоя цель — отвечать на вопросы посетителей о навыках Кирилла, его проектах, опыте работы и контактах.

Информация о Кирилле:
- Имя: Кирилл (Kirill.dev)
- Роль: AI Engineer, Python Developer, Automation Architect
- Обо мне: AI Engineer и Python Developer с бэкграундом в аналитике и информационной безопасности. Создает автономных ИИ-агентов на n8n/Make + LLM с безопасным локальным хостингом (self-hosted).
- Ключевая ценность: Соединяет техническую реализацию (Python, API, Docker) с пониманием психологии пользователя. Его боты не просто отвечают, а ведут осмысленный диалог, удерживают контекст и адаптируются под пользователя.
- Стек и навыки:
  * AI / LLM / RAG: OpenAI API, OpenRouter, Prompt Engineering, RAG (Retrieval-Augmented Generation), векторные базы данных (Supabase, векторный поиск), System Prompts.
  * Python & Автоматизация: Python, BeautifulSoup, Asyncio, PyInstaller, REST API, парсинг данных, разработка скриптов.
  * Интеграции & API: n8n, Telegram API, Google Sheets, Webhooks, GraphQL, ByBit API (торговые боты).
  * DevOps: Docker, Linux CLI, Git/GitHub, CI/CD, self-hosted решения, Bash-скрипты.
  * Soft Skills: Аналитика, глубокая декомпозиция сложных задач, высокая скорость обучения, психологический бэкграунд.
- Проекты:
  1. AI English Assistant (ИИ-репетитор английского): RAG-архитектура с долгосрочной памятью диалога более 360 дней. Авто-исправление ошибок, Supabase для прогресса и статистики, голосовые сообщения.
  2. Crypto-Scanner (Торговый бот Bybit): Мониторинг волатильности и объемов 650+ пар в реальном времени. RSI, MACD, EMA, ATR. Скоринг сигналов по 7 факторам. Работает на Ubuntu VPS 24/7 + локальная .exe версия.
  3. AI News Aggregator (Автодайджест): Сбор новостей из 100+ источников по AI/Tech, суммаризация с помощью LLM и рассылка в Telegram по расписанию (cron 8:00). Экономит 45 минут в день на чтение новостей.
  4. BioFlow (Биохакинг-трекер): Offline-first мобильное приложение (Flutter/Dart/Riverpod) для трекинга здоровья. Локальный AI-анализ корреляций без отправки в сеть. 128 автотестов.
- Контакты:
  * Email: andrey.piskynov2006@gmail.com
  * Телефон: +7 (938) 500-33-11
  * GitHub: github.com/Kir0029

Правила ответов:
1. Отвечай кратко, профессионально и дружелюбно.
2. Используй только факты из предоставленной информации. Если информации о чем-то нет (например, о его хобби или личной жизни), скажи: "К сожалению, у меня нет информации по этому вопросу. Вы можете связаться с Кириллом лично через форму обратной связи или по контактам."
3. Отвечай на том же языке, на котором задан вопрос (русский по умолчанию).
4. Пиши емко. Твой ответ должен легко читаться и помещаться в небольшое окно чата.
`;

export const handler: Handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, error: 'Method Not Allowed' }),
    };
  }

  try {
    const { message, history } = JSON.parse(event.body || '{}');

    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: 'Сообщение не передано' }),
      };
    }

    const geminiApiKey = process.env.GEMINI_API_KEY;
    const openAiKey = process.env.OPENAI_API_KEY;
    const openRouterKey = process.env.OPENROUTER_API_KEY;

    // Fallback if no API keys are provided
    if (!geminiApiKey && !openAiKey && !openRouterKey) {
      return {
        statusCode: 503,
        body: JSON.stringify({
          success: false,
          error: 'Ключи API не настроены. Переключение на локальный оффлайн-режим.',
        }),
      };
    }

    let reply = '';

    if (geminiApiKey) {
      // Use Google Gemini API (gemini-3.1-flash-lite is free and fast)
      const model = 'gemini-3.1-flash-lite';
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiApiKey}`;

      // Map roles: Gemini uses "model" instead of "assistant" / "bot"
      const contents = [
        ...history.map((h: { role: string; content: string }) => ({
          role: h.role === 'bot' || h.role === 'assistant' || h.role === 'model' ? 'model' : 'user',
          parts: [{ text: h.content }],
        })),
        { role: 'user', parts: [{ text: message }] },
      ];

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: contents,
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 350,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Gemini API response error:', data);
        return {
          statusCode: response.status,
          body: JSON.stringify({ success: false, error: 'Не удалось сгенерировать ответ от Gemini API' }),
        };
      }

      reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Извините, не удалось получить ответ.';
    } else {
      // Configure OpenAI / OpenRouter provider
      let apiUrl = '';
      let apiKey = '';
      let apiModel = '';

      if (openAiKey) {
        apiUrl = 'https://api.openai.com/v1/chat/completions';
        apiKey = openAiKey;
        apiModel = 'gpt-4o-mini';
      } else {
        apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
        apiKey = openRouterKey!;
        apiModel = 'moonshotai/kimi-k2.6:free';
      }

      // Construct request history
      const apiMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...history.map((h: { role: string; content: string }) => ({
          role: h.role === 'bot' || h.role === 'assistant' ? 'assistant' : 'user',
          content: h.content,
        })),
        { role: 'user', content: message },
      ];

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: apiModel,
          messages: apiMessages,
          max_tokens: 350,
          temperature: 0.7,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('AI API response error:', data);
        return {
          statusCode: response.status,
          body: JSON.stringify({ success: false, error: 'Не удалось сгенерировать ответ от ИИ' }),
        };
      }

      reply = data.choices?.[0]?.message?.content || 'Извините, не удалось получить ответ.';
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        data: { reply },
      }),
    };
  } catch (error) {
    console.error('Chat endpoint exception:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: 'Ошибка сервера при генерации ответа' }),
    };
  }
};

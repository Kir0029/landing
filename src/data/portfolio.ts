import type { Project, SkillCategory, WorkflowStep, AITool, ContactLink } from '../types';

// ═══ Hero ═══
export const hero = {
  name: 'Кирилл',
  roles: [
    'AI Engineer',
    'Python Developer',
    'Automation Architect',
    'AI Agent Builder',
  ],
  description:
    'Создаю автономных ИИ-агентов и автоматизации, которые экономят время бизнеса. Соединяю техническую реализацию с пониманием психологии пользователя.',
};

// ═══ About ═══
export const about = {
  text: [
    'AI Engineer и Python Developer с бэкграундом в аналитике и информационной безопасности. Специализируюсь на создании автономных ИИ-агентов на n8n/Make + LLM, которые работают с данными безопасно (self-hosted).',
    'Разрабатываю AI-решения на Python: от парсинга и API-интеграций до полноценных торговых алгоритмов и RAG-систем с долгосрочной памятью.',
  ],
  highlight: {
    icon: '🧠',
    title: 'Ключевая ценность',
    text: 'Соединяю техническую реализацию (Python, API, Docker) с пониманием психологии пользователя — боты не просто «отвечают», а ведут диалог, удерживают контекст и адаптируются.',
  },
};

// ═══ Skills ═══
export const skills: SkillCategory[] = [
  {
    icon: '🤖',
    title: 'AI / LLM / RAG',
    tags: ['OpenAI API', 'OpenRouter', 'Prompt Engineering', 'RAG', 'Векторные БД', 'System Prompts'],
  },
  {
    icon: '🐍',
    title: 'Python & Автоматизация',
    tags: ['Python', 'BeautifulSoup', 'Asyncio', 'PyInstaller', 'REST API', 'Скрипты'],
  },
  {
    icon: '🔗',
    title: 'Интеграции & API',
    tags: ['n8n', 'Telegram API', 'Google Sheets', 'Webhooks', 'GraphQL', 'ByBit API'],
  },
  {
    icon: '🐳',
    title: 'DevOps & Инфраструктура',
    tags: ['Docker', 'Linux CLI', 'Git/GitHub', 'CI/CD', 'Self-hosted', 'Bash'],
  },
  {
    icon: '🧠',
    title: 'Soft Skills',
    tags: ['Аналитика', 'Декомпозиция задач', 'Быстрая обучаемость', 'Стрессоустойчивость'],
  },
];

// ═══ Workflow ═══
export const workflowSteps: WorkflowStep[] = [
  {
    number: '01',
    title: 'Анализ',
    description: 'Декомпозиция задачи, изучение требований, оценка рисков и выбор инструментов',
  },
  {
    number: '02',
    title: 'Проектирование',
    description: 'Архитектура решения, проектирование API и data flow, выбор стека',
  },
  {
    number: '03',
    title: 'Реализация',
    description: 'Итеративная разработка, код-ревью с AI, тестирование на каждом этапе',
  },
  {
    number: '04',
    title: 'Деплой',
    description: 'Docker-контейнеризация, CI/CD, мониторинг и документация',
  },
];

export const aiTools: AITool[] = [
  {
    icon: '💬',
    name: 'ChatGPT / Claude',
    description: 'Генерация кода, ревью, рефакторинг',
  },
  {
    icon: '🔧',
    name: 'OpenCode CLI',
    description: '5 агентов с контекстным переключением',
  },
  {
    icon: '🤖',
    name: 'Antigravity AI',
    description: 'Автономная разработка проектов',
  },
  {
    icon: '🧩',
    name: 'Prompt Engineering',
    description: 'System prompts, цепочки, RAG',
  },
];

export const aiQuote =
  '«AI ускоряет разработку, но не заменяет экспертизу. Я использую AI как мощный инструмент, контролируя качество и архитектуру каждого решения.»';

// ═══ Projects ═══
export const projects: Project[] = [
  {
    id: 'english-assistant',
    icon: '🎓',
    title: 'AI English Assistant',
    subtitle: 'ИИ-репетитор английского',
    description:
      'ИИ-агент с архитектурой RAG для изучения английского. Память диалога более 360 дней, автоматическое исправление ошибок с адаптацией под уровень пользователя.',
    stack: ['n8n', 'OpenAI API', 'Google Sheets', 'Telegram Bot API', 'RAG', 'Supabase'],
    metrics: [
      { value: '360+', label: 'дней памяти' },
      { value: '~97%', label: 'точность' },
      { value: '8+', label: 'пользователей' },
      { value: '+15%', label: 'усвоение' },
    ],
    details: [
      'Разработал RAG-архитектуру с долгосрочной памятью диалога',
      'Настроил авто-исправление ошибок с объяснением правил',
      'Интеграция с Supabase: прогресс, статистика, повторение слов',
      'Добавил обработку голосовых сообщений',
    ],
    colorClass: 'project-card--indigo',
    badge: 'AI Agent',
  },
  {
    id: 'crypto-scanner',
    icon: '📊',
    title: 'Crypto-Scanner',
    subtitle: 'Торговый алгоритм',
    description:
      'Аналитический бот для мониторинга волатильности и объёмов на Bybit в реальном времени. Мультитаймфрейм анализ с системой скоринга сигналов.',
    stack: ['Python', 'Bybit API', 'Telegram API', 'SQLite', 'Asyncio', 'PyInstaller'],
    metrics: [
      { value: '650+', label: 'USDT-пар' },
      { value: '~20с', label: 'скан' },
      { value: '1-5⭐', label: 'скоринг' },
      { value: '7', label: 'факторов' },
    ],
    details: [
      'Мультитаймфрейм анализ (1H + 15M + 4H): RSI, MACD, EMA, ATR',
      'Скоринг сигналов по 7 факторам с алертами в Telegram',
      'Inline-кнопки: трекинг TP1/TP2/Stop, ручное закрытие',
      'Две версии: Локальная (.exe) и Серверная (Ubuntu VPS 24/7)',
    ],
    colorClass: 'project-card--cyan',
    badge: 'Python',
  },
  {
    id: 'news-aggregator',
    icon: '📰',
    title: 'AI News Aggregator',
    subtitle: 'Умный дайджест новостей',
    description:
      'Автоматизированный сбор и LLM-суммаризация новостей из 100+ источников. Ежедневная рассылка в Telegram без участия человека.',
    stack: ['n8n', 'RSS', 'LLM', 'Cron', 'Telegram'],
    metrics: [
      { value: '100+', label: 'источников' },
      { value: '-70%', label: 'времени' },
      { value: '-45мин', label: 'в день' },
      { value: '08:00', label: 'авто' },
    ],
    details: [
      'Автоматизировал сбор из 100+ источников по AI, финансам, технологиям',
      'LLM-суммаризация: выделение сути, удаление шума, приоритизация',
      'Ежедневная рассылка в Telegram в 08:00 по cron',
      'Экономия ~45 минут в день на поиск и чтение новостей',
    ],
    colorClass: 'project-card--emerald',
    badge: 'Automation',
  },
  {
    id: 'bioflow',
    icon: '📱',
    title: 'BioFlow',
    subtitle: 'Биохакинг-трекер (Flutter)',
    description:
      'Offline-first мобильное приложение для трекинга здоровья и рефлексии. Локальный AI-анализ, геймификация, 100% приватность данных.',
    stack: ['Flutter', 'Dart', 'Riverpod', 'Isar DB', 'Clean Architecture', 'TDD'],
    metrics: [
      { value: '128', label: 'тестов' },
      { value: '10', label: 'фич' },
      { value: 'v1.0.4', label: 'релиз' },
      { value: '0', label: 'сетевых запросов' },
    ],
    details: [
      'Feature-First архитектура: 10 фич от dashboard до AI insights',
      'Локальный AI: корреляции сон↔энергия, вода↔настроение',
      'Геймификация: streak-система, спринты привычек, достижения',
      'TDD: 128 автотестов (unit + widget + integration)',
    ],
    colorClass: 'project-card--orange',
    badge: 'Mobile App',
  },
];

// ═══ Contact ═══
export const contactLinks: ContactLink[] = [
  {
    icon: '📧',
    label: 'Email',
    value: 'andrey.piskynov2006@gmail.com',
    href: 'mailto:andrey.piskynov2006@gmail.com',
  },
  {
    icon: '📱',
    label: 'Телефон',
    value: '+7 938 500 33 11',
    href: 'tel:+79385003311',
  },
  {
    icon: '💻',
    label: 'GitHub',
    value: 'github.com/Kir0029',
    href: 'https://github.com/Kir0029',
  },
];

// ═══ Chat ═══
export const chatSystemPrompt = `Ты — AI-ассистент на портфолио Кирилла, AI Engineer и Python Developer.
Отвечай кратко и по делу. Используй только факты из данных ниже.
Если не знаешь ответа — скажи "К сожалению, у меня нет информации по этому вопросу. Свяжитесь с Кириллом напрямую."

Данные:
- Специализация: AI Engineer / Python Developer
- Бэкграунд: аналитика, информационная безопасность, психологическое образование
- Основные технологии: Python, n8n, Docker, OpenAI API, RAG, Telegram Bot API
- Ключевая ценность: соединение технической реализации с пониманием психологии пользователя
- Проекты: AI English Assistant (RAG, 360+ дней памяти), Crypto-Scanner (650+ пар, Python), AI News Aggregator (100+ источников), BioFlow (Flutter, 128 тестов)
- Контакты: email andrey.piskynov2006@gmail.com, телефон +7 938 500 33 11, GitHub github.com/Kir0029
`;

export const mockChatResponses: Record<string, string> = {
  default:
    'Привет! Я AI-ассистент Кирилла. Могу рассказать о его навыках, проектах или опыте. Что вас интересует?',
  skills:
    'Кирилл специализируется на Python, AI/LLM (OpenAI API, RAG), автоматизации (n8n, Docker), интеграциях (Telegram, Google Sheets, ByBit API) и DevOps. Ключевая особенность — психологический бэкграунд для создания «умных» ботов.',
  projects:
    'У Кирилла 4 ключевых проекта: AI English Assistant (ИИ-репетитор с RAG), Crypto-Scanner (торговый алгоритм на Python), AI News Aggregator (автоматический дайджест) и BioFlow (мобильное приложение на Flutter).',
  experience:
    'Кирилл — AI Engineer с бэкграундом в аналитике и информационной безопасности (5 лет). Создаёт автономных ИИ-агентов, которые экономят время бизнеса и работают с данными безопасно.',
  contact:
    'Связаться с Кириллом можно по email: andrey.piskynov2006@gmail.com, телефону: +7 938 500 33 11 или через GitHub: github.com/Kir0029',
};

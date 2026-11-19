/**
 * Lunar-Vision — Общий файл интерактива (Vanilla JS)
 * Подключается к index.html, valerii.html и andrian.html.
 */

// -------------------------------------------------------------
// 1. ЧИСТЫЕ ФУНКЦИИ ЛОГИКИ (ФИЛЬТРАЦИЯ, СМЕТА, ВАЛИДАЦИЯ)
// -------------------------------------------------------------
function filterCasesList(cases, category) {
  if (!category || category === 'all') return cases;
  return cases.filter(function (c) {
    return c.category === category;
  });
}

function calculateEstimate(selectedIds, allServices) {
  var minTotal = 0;
  var maxTotal = 0;
  var count = 0;
  var selectedTitles = [];

  selectedIds.forEach(function (id) {
    var item = allServices.find(function (s) {
      return s.id === id;
    });
    if (item) {
      minTotal += item.min;
      maxTotal += item.max;
      count += 1;
      selectedTitles.push(item.title);
    }
  });

  return {
    count: count,
    minTotal: minTotal,
    maxTotal: maxTotal,
    selectedTitles: selectedTitles
  };
}

function validateContactForm(name, contact, checkedServices) {
  var cleanName = String(name || '').trim();
  var cleanContact = String(contact || '').trim();
  var services = Array.isArray(checkedServices) ? checkedServices : [];

  if (!cleanName || cleanName.length < 2) {
    return {
      valid: false,
      error: 'Пожалуйста, укажите ваше имя (от 2 символов)'
    };
  }
  if (!cleanContact || cleanContact.length < 3) {
    return {
      valid: false,
      error: 'Пожалуйста, укажите Telegram (@username) или Email'
    };
  }
  if (services.length === 0) {
    return {
      valid: false,
      error: 'Выберите хотя бы одну интересующую услугу'
    };
  }
  return { valid: true, error: null };
}

// -------------------------------------------------------------
// 2. ДАННЫЕ КЕЙСОВ И РАЗОВЫХ УСЛУГ (ДЛЯ INDEX.HTML)
// -------------------------------------------------------------
var CASES_DATA = [
  {
    id: 'case-1',
    category: 'websites',
    categoryLabel: 'Веб-сайты',
    title: 'FinTrack Core — Мультивалютная финтех-платформа',
    shortDesc:
      'Разработка высоконагруженного веб-приложения для учета валютных активов и криптопортфелей с мгновенной синхронизацией.',
    svgSnippet:
      '<svg class="w-full h-full object-cover" viewBox="0 0 600 375" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<rect width="600" height="375" fill="#101017"/>' +
      '<rect x="20" y="20" width="560" height="335" rx="8" fill="#14141E" stroke="#27272A"/>' +
      '<rect x="40" y="45" width="120" height="12" rx="3" fill="#00F5FF" opacity="0.8"/>' +
      '<rect x="40" y="70" width="220" height="8" rx="2" fill="#71717A" opacity="0.4"/>' +
      '<path d="M40 240 L120 210 L190 230 L270 160 L360 190 L450 120 L540 140" stroke="#00F5FF" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M40 240 L120 210 L190 230 L270 160 L360 190 L450 120 L540 140 L540 300 L40 300 Z" fill="url(#cyanGrad)" opacity="0.15"/>' +
      '<defs><linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#00F5FF"/><stop offset="100%" stop-color="#00F5FF" stop-opacity="0"/></linearGradient></defs>' +
      '<rect x="40" y="100" width="100" height="40" rx="6" fill="#191924" stroke="#27272A"/>' +
      '<rect x="155" y="100" width="100" height="40" rx="6" fill="#191924" stroke="#27272A"/>' +
      '<rect x="270" y="100" width="100" height="40" rx="6" fill="#191924" stroke="#27272A"/>' +
      '<text x="300" y="340" font-family="\'JetBrains Mono\', monospace" font-size="11" fill="#71717A" text-anchor="middle">[МЕСТО ДЛЯ СКРИНШОТА / ФОТО ИНТЕРФЕЙСА]</text>' +
      '</svg>',
    tags: ['Astro', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker'],
    task:
      'Клиенту требовалась платформа для управления мультивалютными балансами с нулевыми задержками при отображении курсов, скоростью загрузки страницы менее 0.6с и строгой защитой финансовых данных пользователей.',
    pipeline: [
      'Пользователь в браузере',
      'Cloudflare SSL / WAF',
      'Astro SSR Frontend',
      'FastAPI Backend',
      'PostgreSQL + Redis',
      'Telegram-бот аудита'
    ],
    stack: [
      'Astro',
      'JavaScript',
      'FastAPI (Python)',
      'PostgreSQL 16',
      'Docker Compose',
      'Redis',
      'Nginx Reverse Proxy'
    ],
    results: [
      { val: '0.52 с', lbl: 'Время полной загрузки (LCP)' },
      { val: '100 / 100', lbl: 'Оценка Google PageSpeed' },
      { val: '+142%', lbl: 'Рост конверсии в регистрацию' }
    ]
  },
  {
    id: 'case-2',
    category: 'bots',
    categoryLabel: 'Чат-боты и AI',
    title: 'Apex Trade Bot — Автоматизированный торговый Telegram-бот',
    shortDesc:
      'Бот с алгоритмической обработкой ордеров, подписочной моделью, админ-панелью и прямыми уведомлениями трейдеров.',
    svgSnippet:
      '<svg class="w-full h-full object-cover" viewBox="0 0 600 375" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<rect width="600" height="375" fill="#0C0D12"/>' +
      '<rect x="40" y="30" width="520" height="315" rx="12" fill="#13141D" stroke="#27272A"/>' +
      '<circle cx="80" cy="70" r="18" fill="#1E202E" stroke="#00F5FF" stroke-width="1.5"/>' +
      '<path d="M74 70 L86 64 L86 76 Z" fill="#00F5FF"/>' +
      '<rect x="115" y="60" width="160" height="10" rx="3" fill="#FFFFFF"/>' +
      '<rect x="115" y="76" width="90" height="6" rx="2" fill="#CCFF00"/>' +
      '<rect x="70" y="115" width="380" height="52" rx="8" fill="#181926" stroke="#27272A"/>' +
      '<text x="85" y="138" font-family="\'JetBrains Mono\', monospace" font-size="11" fill="#A1A1AA">⚡ СИГНАЛ: BTC/USDT Long Entry: $88,400</text>' +
      '<text x="85" y="154" font-family="\'JetBrains Mono\', monospace" font-size="10" fill="#CCFF00">Take Profit: $92,000 (+4.07%) | Stop: $87,100</text>' +
      '<rect x="70" y="180" width="460" height="52" rx="8" fill="#181926" stroke="#27272A"/>' +
      '<text x="85" y="203" font-family="\'JetBrains Mono\', monospace" font-size="11" fill="#A1A1AA">✓ Ордер исполнен за 0.042s через Binance WebSocket</text>' +
      '<text x="300" y="325" font-family="\'JetBrains Mono\', monospace" font-size="11" fill="#71717A" text-anchor="middle">[МЕСТО ДЛЯ СКРИНШОТА / ФОТО ТЕЛЕГРАМ-БОТА]</text>' +
      '</svg>',
    tags: ['Python', 'FastAPI', 'aiogram 3', 'Redis', 'Docker', 'Stripe'],
    task:
      'Разработать надежного бота для 12 000+ подписчиков, который мгновенно транслирует торговые сигналы, автоматически проверяет оплату подписок и ведет аналитику в PostgreSQL.',
    pipeline: [
      'Трейдер / Биржа',
      'FastAPI Webhook',
      'aiogram 3 Daemon',
      'PostgreSQL Subscription DB',
      'Telegram Channel Broadcast'
    ],
    stack: [
      'Python 3.12',
      'FastAPI',
      'aiogram v3',
      'AsyncPG',
      'Docker on Hetzner VPS',
      'Systemd watchdog'
    ],
    results: [
      { val: '0.04 с', lbl: 'Задержка рассылки сигнала' },
      { val: '12 400+', lbl: 'Активных пользователей' },
      { val: '99.99%', lbl: 'Аптайм работы демона' }
    ]
  },
  {
    id: 'case-3',
    category: 'infra',
    categoryLabel: 'Инфраструктура и SEO',
    title: 'Nova Logistics — Корпоративный портал и Docker-кластер',
    shortDesc:
      'Отказоустойчивая инфраструктура логистической компании с онлайн-трекингом грузов и топовыми позициями в Google.',
    svgSnippet:
      '<svg class="w-full h-full object-cover" viewBox="0 0 600 375" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<rect width="600" height="375" fill="#0E0F14"/>' +
      '<rect x="30" y="30" width="540" height="315" rx="8" fill="#14151F" stroke="#27272A"/>' +
      '<circle cx="60" cy="55" r="5" fill="#FF5F56"/>' +
      '<circle cx="75" cy="55" r="5" fill="#FFBD2E"/>' +
      '<circle cx="90" cy="55" r="5" fill="#27C93F"/>' +
      '<rect x="50" y="85" width="230" height="100" rx="6" fill="#1B1C28" stroke="#27272A"/>' +
      '<rect x="310" y="85" width="230" height="100" rx="6" fill="#1B1C28" stroke="#27272A"/>' +
      '<rect x="50" y="200" width="490" height="90" rx="6" fill="#1B1C28" stroke="#27272A"/>' +
      '<text x="300" y="325" font-family="\'JetBrains Mono\', monospace" font-size="11" fill="#71717A" text-anchor="middle">[МЕСТО ДЛЯ СКРИНШОТА / ФОТО ДАШБОРДА]</text>' +
      '</svg>',
    tags: ['Docker', 'FastAPI', 'Ubuntu', 'SEO', 'Google Ads'],
    task:
      'Старый сайт клиента падал при нагрузке с рекламы, а позиции в поиске просели. Требовался полный перенос на современный стек, настройка кластера с автоперезапуском и запуск кампаний в Google Ads.',
    pipeline: [
      'Клиент из Google Поиска',
      'Cloudflare WAF',
      'Nginx Load Balancer',
      'FastAPI Node',
      'PostgreSQL DB'
    ],
    stack: [
      'Ubuntu 24.04',
      'Docker Compose',
      'FastAPI Backend',
      'Cloudflare WAF',
      'Google Search Console',
      'Google Ads'
    ],
    results: [
      { val: 'x4.2', lbl: 'Прирост скорости обработки заявок' },
      { val: '+210%', lbl: 'Органический трафик из Google' },
      { val: '0 падений', lbl: 'За 12 месяцев непрерывной работы' }
    ]
  },
  {
    id: 'case-4',
    category: 'bots',
    categoryLabel: 'Чат-боты и AI',
    title: 'AI Concierge — Умный ассистент премиум-клиники',
    shortDesc:
      'AI-бот с интеграцией LLM для круглосуточной квалификации пациентов, записи на прием и синхронизации с базой данных врачей.',
    svgSnippet:
      '<svg class="w-full h-full object-cover" viewBox="0 0 600 375" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<rect width="600" height="375" fill="#0B0C10"/>' +
      '<rect x="40" y="30" width="520" height="315" rx="10" fill="#12131C" stroke="#27272A"/>' +
      '<rect x="65" y="60" width="280" height="42" rx="8" fill="#191B26" stroke="#00F5FF" stroke-opacity="0.3"/>' +
      '<text x="80" y="85" font-family="\'Inter\', sans-serif" font-size="12" fill="#E4E4E7">Здравствуйте! Какой специалист вам требуется?</text>' +
      '<rect x="220" y="115" width="310" height="42" rx="8" fill="#00F5FF" fill-opacity="0.1" stroke="#00F5FF" stroke-opacity="0.4"/>' +
      '<text x="235" y="140" font-family="\'Inter\', sans-serif" font-size="12" fill="#00F5FF">Нужен кардиолог на субботу, первая половина дня</text>' +
      '<rect x="65" y="170" width="350" height="52" rx="8" fill="#191B26" stroke="#27272A"/>' +
      '<text x="80" y="195" font-family="\'Inter\', sans-serif" font-size="12" fill="#CCFF00">Свободен доктор Смирнов: 11:30. Записать вас?</text>' +
      '<text x="300" y="320" font-family="\'JetBrains Mono\', monospace" font-size="11" fill="#71717A" text-anchor="middle">[МЕСТО ДЛЯ СКРИНШОТА / ФОТО AI АССИСТЕНТА]</text>' +
      '</svg>',
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'Telegram API', 'Calendly'],
    task:
      'Клиника теряла до 35% ночных заявок из-за отсутствия дежурных операторов. Требовалось внедрить умного бота, который понимает живую речь, отвечает на медицинские вопросы и бронирует время в CRM.',
    pipeline: [
      'Пациент в Telegram',
      'FastAPI Backend',
      'LLM Function Calling',
      'PostgreSQL Slots DB',
      'Уведомление врачу + SMS'
    ],
    stack: [
      'Python 3.12',
      'FastAPI',
      'aiogram v3',
      'PostgreSQL',
      'Docker',
      'Google Calendar API'
    ],
    results: [
      { val: '+38%', lbl: 'Дополнительные ночные записи' },
      { val: '< 2 сек', lbl: 'Среднее время ответа AI' },
      { val: '24/7', lbl: 'Автономная работа без операторов' }
    ]
  },
  {
    id: 'case-5',
    category: 'websites',
    categoryLabel: 'Веб-сайты',
    title: 'Chrono CRM — Внутренняя система управления заказами',
    shortDesc:
      'Многостраничный портал со сквозной аналитикой, ролями сотрудников, финансовыми графиками и интеграцией Telegram-уведомлений.',
    svgSnippet:
      '<svg class="w-full h-full object-cover" viewBox="0 0 600 375" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<rect width="600" height="375" fill="#0F1015"/>' +
      '<rect x="30" y="25" width="540" height="325" rx="8" fill="#14151E" stroke="#27272A"/>' +
      '<rect x="50" y="45" width="100" height="280" rx="6" fill="#191A26"/>' +
      '<rect x="165" y="45" width="385" height="40" rx="6" fill="#191A26"/>' +
      '<rect x="165" y="95" width="185" height="110" rx="6" fill="#191A26" stroke="#27272A"/>' +
      '<rect x="365" y="95" width="185" height="110" rx="6" fill="#191A26" stroke="#27272A"/>' +
      '<rect x="165" y="215" width="385" height="110" rx="6" fill="#191A26" stroke="#27272A"/>' +
      '<text x="300" y="335" font-family="\'JetBrains Mono\', monospace" font-size="11" fill="#71717A" text-anchor="middle">[МЕСТО ДЛЯ СКРИНШОТА / ФОТО СИСТЕМЫ УЧЕТА]</text>' +
      '</svg>',
    tags: ['Astro', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
    task:
      'Компания вела заказы в разрозненных таблицах Excel, что приводило к срыву дедлайнов. Требовалась единая надежная CRM с разграничением прав (Менеджер / Инженер / Бухгалтер).',
    pipeline: [
      'Браузер менеджера',
      'Astro Web App',
      'Node.js API',
      'PostgreSQL DB',
      'Бот оповещений в Telegram'
    ],
    stack: ['Astro', 'JavaScript', 'Node.js', 'PostgreSQL', 'Docker', 'Nginx'],
    results: [
      { val: 'x3', lbl: 'Ускорение обработки заказов' },
      { val: '0', lbl: 'Потерянных заказов за квартал' },
      { val: '100%', lbl: 'Прозрачность метрик для руководства' }
    ]
  },
  {
    id: 'case-6',
    category: 'websites',
    categoryLabel: 'Веб-сайты',
    title: 'ScaleTraffic Hub — Продающий Landing Page с PageSpeed 99',
    shortDesc:
      'Ультра-быстрый посадочный сайт для b2b-сервиса с интерактивным калькулятором окупаемости и сквозным A/B тестированием.',
    svgSnippet:
      '<svg class="w-full h-full object-cover" viewBox="0 0 600 375" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<rect width="600" height="375" fill="#0A0B0E"/>' +
      '<rect x="30" y="30" width="540" height="315" rx="8" fill="#12131A" stroke="#27272A"/>' +
      '<rect x="60" y="60" width="240" height="18" rx="4" fill="#FFFFFF"/>' +
      '<rect x="60" y="90" width="340" height="10" rx="3" fill="#71717A"/>' +
      '<rect x="60" y="125" width="140" height="36" rx="6" fill="#CCFF00"/>' +
      '<rect x="360" y="60" width="180" height="180" rx="10" fill="#181A24" stroke="#00F5FF" stroke-width="1.5"/>' +
      '<circle cx="450" cy="150" r="45" stroke="#00F5FF" stroke-width="6" stroke-dasharray="210 70"/>' +
      '<text x="450" y="156" font-family="\'Unbounded\', sans-serif" font-weight="700" font-size="16" fill="#FFFFFF" text-anchor="middle">99</text>' +
      '<text x="300" y="325" font-family="\'JetBrains Mono\', monospace" font-size="11" fill="#71717A" text-anchor="middle">[МЕСТО ДЛЯ СКРИНШОТА / ФОТО ПОСАДОЧНОЙ СТРАНИЦЫ]</text>' +
      '</svg>',
    tags: ['HTML5', 'CSS3', 'GSAP', 'Google PageSpeed 99', 'SEO'],
    task:
      'Предыдущий сайт клиента на конструкторе грузился 6.4 секунды и терял платный трафик. Задача — переписать код с нуля на чистом HTML/CSS с оценкой PageSpeed 95+ и калькулятором цен.',
    pipeline: [
      'Посетитель из рекламы',
      'Cloudflare Edge Cache',
      'Чистый HTML/CSS сайт (28 KB)',
      'Web3Forms API',
      'Telegram лид-бот'
    ],
    stack: ['HTML5', 'CSS3', 'GSAP ScrollTrigger', 'Web3Forms', 'Cloudflare Pages'],
    results: [
      { val: '0.45 с', lbl: 'Время отрисовки первого контента' },
      { val: '+185%', lbl: 'Рост конверсии из Google Ads' },
      { val: '99 / 100', lbl: 'Мобильный Google PageSpeed' }
    ]
  }
];

var ONETIME_CATALOG = {
  'tab-frontend': [
    { id: 'f_proto', title: 'Прототипирование и UI/UX дизайн', price: '300 € – 800 €', period: 'За проект', min: 300, max: 800 },
    { id: 'f_landing', title: 'Разработка Landing Page «под ключ»', price: '400 € – 900 €', period: 'За проект', min: 400, max: 900 },
    { id: 'f_multi', title: 'Многостраничный корпоративный сайт', price: '900 € – 2 200 €', period: 'За проект', min: 900, max: 2200 },
    { id: 'f_redesign', title: 'Визуальный редизайн (UI/UX Refurbish)', price: '250 € – 700 €', period: 'За проект', min: 250, max: 700 },
    { id: 'f_adapt', title: 'Исправление и настройка адаптивности (Mobile-First)', price: '150 € – 400 €', period: 'За сайт', min: 150, max: 400 },
    { id: 'f_speed', title: 'Оптимизация скорости (Google PageSpeed 90+)', price: '250 € – 500 €', period: 'Разово', min: 250, max: 500 },
    { id: 'f_modules', title: 'Интерактивные модули (калькуляторы, квизы, языки)', price: '150 € – 450 €', period: 'За модуль', min: 150, max: 450 },
    { id: 'f_audit', title: 'Технический аудит и рефакторинг кода', price: '50 € – 70 € / час', period: 'Базово ~5 ч', min: 250, max: 350 }
  ],
  'tab-backend': [
    { id: 'b_api', title: 'Кастомный Backend / REST API на FastAPI', price: '600 € – 1 800 €', period: 'За проект', min: 600, max: 1800 },
    { id: 'b_db', title: 'Проектирование и подключение БД (PostgreSQL, MySQL, SQLite)', price: '200 € – 500 €', period: 'Разово', min: 200, max: 500 },
    { id: 'b_flow', title: 'Сквозной поток данных (Сайт ↔ БД ↔ Бот)', price: '300 € – 750 €', period: 'За 1 цепочку', min: 300, max: 750 },
    { id: 'b_opt', title: 'Доработка серверной логики и оптимизация запросов', price: '50 € – 70 € / час', period: 'Базово ~5 ч', min: 250, max: 350 }
  ],
  'tab-bots': [
    { id: 'bot_notify', title: 'Бот-уведомитель (Telegram Notifier для заявок)', price: '150 € – 300 €', period: 'За бота', min: 150, max: 300 },
    { id: 'bot_interactive', title: 'Интерактивный бот-воронка / FAQ с записью в БД', price: '350 € – 800 €', period: 'За бота', min: 350, max: 800 },
    { id: 'bot_full', title: 'Многофункциональный бот с админ-панелью и оплатами', price: '800 € – 2 000 €', period: 'За проект', min: 800, max: 2000 }
  ],
  'tab-integrations': [
    { id: 'i_web3', title: 'Подключение форм заявок через Web3Forms', price: '70 € – 150 €', period: 'За настройку', min: 70, max: 150 },
    { id: 'i_elf', title: 'Интеграция виджетов Elfsight (отзывы, чаты, галереи)', price: '50 € – 120 €', period: 'За 1–2 виджета', min: 50, max: 120 },
    { id: 'i_maps', title: 'Базовые сервисы (Google Карты, Calendly, Stripe Link)', price: '50 € – 120 €', period: 'За 1 интеграцию', min: 50, max: 120 },
    { id: 'i_giscus', title: 'Модуль комментариев: облачный (Giscus на GitHub Discussions)', price: '100 € – 250 €', period: 'Разово', min: 100, max: 250 },
    { id: 'i_disqus', title: 'Модуль комментариев: сторонний виджет (Disqus)', price: '80 € – 200 €', period: 'Разово', min: 80, max: 200 },
    { id: 'i_remark', title: 'Модуль комментариев: автономный (Remark42 на VPS)', price: '300 € – 600 €', period: '+ VPS ~6 €/мес', min: 300, max: 600 },
    { id: 'i_custom_comm', title: 'Собственная система комментариев на базе данных', price: '600 € – 1 500 €', period: 'Разово', min: 600, max: 1500 }
  ],
  'tab-devops': [
    { id: 'd_deploy', title: 'Деплой, Docker, SSL, Cloudflare', price: '150 € – 350 €', period: 'Разово', min: 150, max: 350 },
    { id: 'd_cicd', title: 'Настройка CI/CD автодеплоя (GitHub Actions)', price: '100 € – 250 €', period: 'Разово', min: 100, max: 250 },
    { id: 'd_host', title: 'Хостинг + базовый мониторинг 24/7 (Сайт или Бот)', price: '30 € – 60 € / мес', period: '1-й месяц', min: 30, max: 60 },
    { id: 'd_support', title: 'Пакет технической поддержки и правок (хостинг + 3–5 ч)', price: '120 € – 250 € / мес', period: 'Абонемент', min: 120, max: 250 }
  ],
  'tab-seo': [
    { id: 's_onpage', title: 'Базовое On-Page SEO (Sitemap, микроразметка, Search Console)', price: '200 € – 450 €', period: 'Разово', min: 200, max: 450 },
    { id: 's_gmb_setup', title: 'Оформление Google Business Profile «под ключ»', price: '150 € – 300 €', period: 'Разово', min: 150, max: 300 },
    { id: 's_gmb_sub', title: 'Регулярное ведение и прокачка Google Business', price: '100 € – 250 € / мес', period: 'Ежемесячно', min: 100, max: 250 },
    { id: 's_gads_setup', title: 'Запуск рекламы Google Ads (Setup, сбор ключей, минус-слова)', price: '250 € – 500 €', period: 'Разово', min: 250, max: 500 },
    { id: 's_gads_sub', title: 'Ежемесячное ведение Google Ads', price: '150 € – 350 € / мес', period: 'Ежемесячно', min: 150, max: 350 }
  ]
};

var ALL_SERVICES_FLAT = Object.keys(ONETIME_CATALOG).reduce(function (acc, key) {
  return acc.concat(ONETIME_CATALOG[key]);
}, []);

// -------------------------------------------------------------
// 3. БРАУЗЕРНЫЙ ИНТЕРАКТИВ (ТЕМА, МЕНЮ, АНИМАЦИИ, КАЛЬКУЛЯТОР)
// -------------------------------------------------------------
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  var selectedServiceIds = new Set();
  var currentCatalogTab = 'tab-frontend';

  var SUN_ICON_SVG =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<circle cx="12" cy="12" r="4"></circle>' +
    '<path d="M12 2v2"></path><path d="M12 20v2"></path>' +
    '<path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path>' +
    '<path d="M2 12h2"></path><path d="M20 12h2"></path>' +
    '<path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path>' +
    '</svg>';

  var MOON_ICON_SVG =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>' +
    '</svg>';

  // --- Переключатель светлой / тёмной темы ---
  function getStoredTheme() {
    try {
      var saved = window.localStorage.getItem('lunar-theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch (e) {
      // localStorage недоступен
    }
    return 'dark';
  }

  function applyTheme(theme) {
    var isLight = theme === 'light';
    var root = document.documentElement;
    root.classList.toggle('light', isLight);
    root.classList.toggle('dark', !isLight);
    root.setAttribute('data-theme', theme);

    try {
      window.localStorage.setItem('lunar-theme', theme);
    } catch (e) {
      // ignore storage errors
    }

    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.setAttribute(
        'aria-label',
        isLight ? 'Переключить на тёмную тему' : 'Переключить на светлую тему'
      );
      btn.setAttribute('aria-pressed', String(isLight));
      btn.setAttribute(
        'title',
        isLight ? 'Тёмная тема' : 'Светлая тема'
      );
      var iconWrap = btn.querySelector('[data-theme-icon]');
      if (iconWrap) {
        iconWrap.innerHTML = isLight ? MOON_ICON_SVG : SUN_ICON_SVG;
      }
      var textWrap = btn.querySelector('[data-theme-label]');
      if (textWrap) {
        textWrap.textContent = isLight ? 'Тёмная тема' : 'Светлая тема';
      }
    });
  }

  function initThemeToggle() {
    applyTheme(getStoredTheme());
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var next = document.documentElement.classList.contains('light') ? 'dark' : 'light';
        applyTheme(next);
      });
    });
  }

  // --- Мобильное меню ---
  function initMobileMenu() {
    var mobileToggle = document.getElementById('mobile-toggle');
    var mobileDrawer = document.getElementById('mobile-drawer');
    if (!mobileToggle || !mobileDrawer) return;

    function closeDrawer() {
      mobileDrawer.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }

    mobileToggle.addEventListener('click', function () {
      var isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mobileDrawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeDrawer);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDrawer();
    });
  }

  // --- Spotlight-подсветка карточек ---
  function initSpotlightCards() {
    document.querySelectorAll('.spotlight-card').forEach(function (card) {
      card.onmousemove = function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');
      };
    });
  }

  // --- Интерактивный 3D-терминал и живые часы ---
  function initHeroTerminal() {
    var terminalCard = document.getElementById('terminal-3d');
    var heroSection = document.getElementById('hero');
    if (terminalCard && heroSection) {
      heroSection.addEventListener('mousemove', function (e) {
        var rect = terminalCard.getBoundingClientRect();
        var cardCenterX = rect.left + rect.width / 2;
        var cardCenterY = rect.top + rect.height / 2;
        var deltaX = (e.clientX - cardCenterX) / (window.innerWidth / 2);
        var deltaY = (e.clientY - cardCenterY) / (window.innerHeight / 2);
        var rotateX = -deltaY * 11;
        var rotateY = deltaX * 13;
        terminalCard.style.transform =
          'perspective(1000px) rotateX(' +
          rotateX.toFixed(2) +
          'deg) rotateY(' +
          rotateY.toFixed(2) +
          'deg) translateZ(10px)';
      });

      heroSection.addEventListener('mouseleave', function () {
        terminalCard.style.transform =
          'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      });
    }

    var liveTs = document.getElementById('term-live-ts');
    if (liveTs) {
      setInterval(function () {
        var now = new Date();
        var timeStr =
          '[' +
          String(now.getHours()).padStart(2, '0') +
          ':' +
          String(now.getMinutes()).padStart(2, '0') +
          ':' +
          String(now.getSeconds()).padStart(2, '0') +
          ']';
        liveTs.textContent = timeStr;
      }, 1000);
    }
  }

  // --- Магнитная кнопка CTA ---
  function initMagneticButton() {
    var magneticWrap = document.getElementById('magnetic-btn-wrap');
    var heroMainCta = document.getElementById('hero-main-cta');
    if (!magneticWrap || !heroMainCta) return;

    magneticWrap.addEventListener('mousemove', function (e) {
      var rect = magneticWrap.getBoundingClientRect();
      var x = e.clientX - (rect.left + rect.width / 2);
      var y = e.clientY - (rect.top + rect.height / 2);
      magneticWrap.style.transform = 'translate(' + x * 0.28 + 'px, ' + y * 0.28 + 'px)';
    });

    magneticWrap.addEventListener('mouseleave', function () {
      magneticWrap.style.transform = 'translate(0px, 0px)';
    });
  }

  // --- Кейсы и модальное окно ---
  function renderCases(category) {
    var container = document.getElementById('cases-container');
    if (!container) return;

    var filtered = filterCasesList(CASES_DATA, category || 'all');
    container.innerHTML = filtered
      .map(function (item) {
        return (
          '<article class="case-card spotlight-card flex flex-col h-full cursor-pointer" data-case-id="' +
          item.id +
          '" tabindex="0" role="button" aria-label="Открыть кейс ' +
          item.title.replace(/"/g, '&quot;') +
          '">' +
          '<div class="case-preview-container w-full aspect-[16/10] relative overflow-hidden flex items-center justify-center">' +
          item.svgSnippet +
          '</div>' +
          '<div class="case-body p-6 flex flex-col flex-grow justify-between">' +
          '<div>' +
          '<span class="case-category block font-mono text-[11px] uppercase tracking-[0.04em] mb-1.5">' +
          item.categoryLabel +
          '</span>' +
          '<h3 class="case-title font-display text-[17.5px] font-bold mb-2">' +
          item.title +
          '</h3>' +
          '<p class="case-desc text-[13.5px] leading-[1.55] mb-4 line-clamp-2">' +
          item.shortDesc +
          '</p>' +
          '</div>' +
          '<div>' +
          '<div class="flex flex-wrap gap-1.5">' +
          item.tags
            .slice(0, 3)
            .map(function (t) {
              return '<span class="tech-tag">' + t + '</span>';
            })
            .join('') +
          '</div>' +
          '<div class="case-footer flex items-center justify-between mt-4 pt-3.5">' +
          '<span class="case-btn-more font-mono text-[12px] font-semibold inline-flex items-center gap-1.5">' +
          'ПОДРОБНЕЕ О ПРОЕКТЕ →' +
          '</span>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</article>'
        );
      })
      .join('');

    container.querySelectorAll('.case-card').forEach(function (card) {
      var id = card.getAttribute('data-case-id');
      card.addEventListener('click', function () {
        openCaseModal(id);
      });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openCaseModal(id);
        }
      });
    });

    initSpotlightCards();
  }

  function openCaseModal(caseId) {
    var overlay = document.getElementById('case-modal');
    if (!overlay) return;

    var item = CASES_DATA.find(function (c) {
      return c.id === caseId;
    });
    if (!item) return;

    document.getElementById('modal-preview').innerHTML = item.svgSnippet;
    document.getElementById('modal-cat').textContent = item.categoryLabel;
    document.getElementById('modal-title').textContent = item.title;
    document.getElementById('modal-subtitle').textContent = item.shortDesc;
    document.getElementById('modal-task').textContent = item.task;

    document.getElementById('modal-pipeline').innerHTML = item.pipeline
      .map(function (step, idx) {
        var isEndpoint = idx === 0 || idx === item.pipeline.length - 1;
        return (
          '<div class="flow-node ' +
          (isEndpoint ? 'active-node' : '') +
          '"><span>' +
          (idx + 1) +
          '.</span> ' +
          step +
          '</div>' +
          (idx < item.pipeline.length - 1 ? '<span class="flow-arrow">➔</span>' : '')
        );
      })
      .join('');

    document.getElementById('modal-stack').innerHTML = item.stack
      .map(function (st) {
        return '<span class="tech-tag">' + st + '</span>';
      })
      .join('');

    document.getElementById('modal-results').innerHTML = item.results
      .map(function (r) {
        return (
          '<div class="result-box">' +
          '<div class="result-val">' +
          r.val +
          '</div>' +
          '<div class="result-lbl">' +
          r.lbl +
          '</div>' +
          '</div>'
        );
      })
      .join('');

    var modalCta = document.getElementById('modal-cta-btn');
    if (modalCta) {
      modalCta.onclick = function () {
        closeModal();
        selectServiceForContact('Кейс: ' + item.title);
      };
    }

    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    var overlay = document.getElementById('case-modal');
    if (!overlay) return;
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
  }

  function initCasesSection() {
    var filterTabs = document.querySelectorAll('.filter-tab');
    if (filterTabs.length > 0) {
      filterTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          filterTabs.forEach(function (t) {
            t.classList.remove('active');
          });
          tab.classList.add('active');
          renderCases(tab.getAttribute('data-filter'));
        });
      });
      renderCases('all');
    }

    var modalCloseBtn = document.getElementById('modal-close');
    var modalOverlay = document.getElementById('case-modal');
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalOverlay) {
      modalOverlay.addEventListener('click', function (e) {
        if (e.target && e.target.id === 'case-modal') closeModal();
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeModal();
      });
    }
  }

  // --- Прайс-лист (2 главные вкладки + 6 категорий + калькулятор) ---
  function switchPricingTab(targetId) {
    var mainTabBtns = document.querySelectorAll('.pricing-main-tab-btn');
    var panelSubscription = document.getElementById('panel-subscription');
    var panelOnetime = document.getElementById('panel-onetime');
    if (!panelSubscription || !panelOnetime) return;

    mainTabBtns.forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-target') === targetId);
    });

    if (targetId === 'panel-subscription') {
      panelSubscription.classList.add('active');
      panelOnetime.classList.remove('active');
    } else {
      panelOnetime.classList.add('active');
      panelSubscription.classList.remove('active');
      initSpotlightCards();
    }
  }

  function renderCatalogItems(tabKey) {
    var wrap = document.getElementById('catalog-items-wrap');
    if (!wrap) return;

    currentCatalogTab = tabKey;
    var items = ONETIME_CATALOG[tabKey] || [];

    wrap.innerHTML = items
      .map(function (item) {
        var isChecked = selectedServiceIds.has(item.id);
        return (
          '<div class="catalog-item-card spotlight-card ' +
          (isChecked ? 'selected' : '') +
          '" data-id="' +
          item.id +
          '" role="checkbox" aria-checked="' +
          String(isChecked) +
          '" tabindex="0">' +
          '<div class="catalog-item-left">' +
          '<div class="catalog-custom-checkbox">' +
          (isChecked ? '✓' : '') +
          '</div>' +
          '<div class="catalog-item-title">' +
          item.title +
          '</div>' +
          '</div>' +
          '<div class="catalog-item-price-block">' +
          '<div class="catalog-item-price">' +
          item.price +
          '</div>' +
          '<div class="catalog-item-period">' +
          item.period +
          '</div>' +
          '</div>' +
          '</div>'
        );
      })
      .join('');

    wrap.querySelectorAll('.catalog-item-card').forEach(function (card) {
      var itemId = card.getAttribute('data-id');
      card.addEventListener('click', function () {
        toggleServiceSelection(itemId);
      });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleServiceSelection(itemId);
        }
      });
    });

    initSpotlightCards();
  }

  function toggleServiceSelection(itemId) {
    if (selectedServiceIds.has(itemId)) {
      selectedServiceIds.delete(itemId);
    } else {
      selectedServiceIds.add(itemId);
    }
    renderCatalogItems(currentCatalogTab);
    updateEstimateCalculation();
  }

  function updateEstimateCalculation() {
    var countEl = document.getElementById('estimate-count');
    var priceEl = document.getElementById('estimate-price');
    if (!countEl || !priceEl) return;

    var estimate = calculateEstimate(selectedServiceIds, ALL_SERVICES_FLAT);
    countEl.textContent = String(estimate.count);
    if (estimate.count === 0) {
      priceEl.textContent = '0 €';
    } else {
      priceEl.textContent =
        estimate.minTotal.toLocaleString('ru-RU') +
        ' € – ' +
        estimate.maxTotal.toLocaleString('ru-RU') +
        ' €';
    }
  }

  function initPricingSection() {
    var mainTabBtns = document.querySelectorAll('.pricing-main-tab-btn');
    if (mainTabBtns.length === 0) return;

    mainTabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        switchPricingTab(btn.getAttribute('data-target'));
      });
    });

    var btnJumpToTab2 = document.getElementById('btn-jump-to-tab2');
    if (btnJumpToTab2) {
      btnJumpToTab2.addEventListener('click', function () {
        switchPricingTab('panel-onetime');
      });
    }

    var serviceNavBtns = document.querySelectorAll('.service-nav-btn');
    serviceNavBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        serviceNavBtns.forEach(function (b) {
          b.classList.remove('active');
        });
        btn.classList.add('active');
        renderCatalogItems(btn.getAttribute('data-tab'));
      });
    });

    renderCatalogItems('tab-frontend');

    var btnTransferEstimate = document.getElementById('btn-transfer-estimate');
    if (btnTransferEstimate) {
      btnTransferEstimate.addEventListener('click', function () {
        var estimate = calculateEstimate(selectedServiceIds, ALL_SERVICES_FLAT);
        if (estimate.count === 0) {
          showFormFeedback(
            'Выберите хотя бы одну услугу в каталоге для переноса в расчет.',
            false
          );
          window.location.hash = '#pricing';
          return;
        }

        var msgArea = document.getElementById('client-message');
        if (msgArea) {
          msgArea.value =
            'Здравствуйте! Меня интересует расчет сметы на разовую разработку:\n\n' +
            'Выбранные услуги (' +
            estimate.selectedTitles.length +
            '):\n• ' +
            estimate.selectedTitles.join('\n• ') +
            '\n\nОриентировочная вилка прайса: ' +
            estimate.minTotal.toLocaleString('ru-RU') +
            ' € – ' +
            estimate.maxTotal.toLocaleString('ru-RU') +
            ' €.\nХочу обсудить детали ТЗ и точные сроки.';
        }

        window.location.hash = '#contact';
        if (msgArea) msgArea.focus();
      });
    }
  }

  // --- Форма заявки и копирование контактов ---
  function showFormFeedback(msg, isSuccess) {
    var formFeedback = document.getElementById('form-feedback');
    if (!formFeedback) return;
    formFeedback.textContent = msg;
    formFeedback.className = 'form-submit-feedback ' + (isSuccess ? 'success' : 'error');
    formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function selectServiceForContact(serviceName) {
    var msgArea = document.getElementById('client-message');
    if (msgArea) {
      msgArea.value =
        'Здравствуйте! Меня интересует: ' +
        serviceName +
        '. Хочу обсудить подключение и детали.';
    }
    window.location.hash = '#contact';
    if (msgArea) msgArea.focus();
  }

  function copyContact(text, label) {
    var toast = document.getElementById('copy-toast');
    function showToast(message) {
      if (!toast) return;
      toast.textContent = message;
      toast.classList.add('show');
      setTimeout(function () {
        toast.classList.remove('show');
      }, 2600);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(function () {
          showToast(label + ' скопирован: ' + text);
        })
        .catch(function () {
          showToast('Скопировано: ' + text);
        });
    } else {
      showToast('Скопировано: ' + text);
    }
  }

  function initContactForm() {
    var leadForm = document.getElementById('lead-form');
    if (!leadForm) return;

    leadForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('client-name').value;
      var contact = document.getElementById('client-contact').value;
      var checkedServices = Array.from(
        document.querySelectorAll('input[name="services"]:checked')
      ).map(function (cb) {
        return cb.value;
      });

      var result = validateContactForm(name, contact, checkedServices);
      if (!result.valid) {
        showFormFeedback(result.error, false);
        return;
      }

      showFormFeedback(
        'Спасибо, ' +
          name.trim() +
          '! Заявка принята в работу студии Lunar-Vision. Valerii и Andrian свяжутся с вами по контакту «' +
          contact.trim() +
          '» в течение 2 часов.',
        true
      );
      leadForm.reset();
    });
  }

  // --- GSAP 3 + ScrollTrigger анимации ---
  function initAnimations() {
    if (typeof gsap === 'undefined') return;
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    var heroTargets = document.querySelectorAll(
      '.hero-badge, .hero-title, .hero-subtitle, .hero-cta-group, .hero-metrics'
    );
    if (heroTargets.length > 0) {
      gsap.from(heroTargets, {
        opacity: 0,
        y: 26,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }

    if (document.querySelector('.terminal-card')) {
      gsap.from('.terminal-card', {
        opacity: 0,
        scale: 0.95,
        duration: 1.0,
        ease: 'power3.out',
        delay: 0.15
      });
    }

    if (typeof ScrollTrigger !== 'undefined') {
      gsap.utils.toArray('.section-spacing').forEach(function (section) {
        var items = section.querySelectorAll('.section-kicker, .section-title, .section-desc');
        if (items.length > 0) {
          gsap.from(items, {
            scrollTrigger: {
              trigger: section,
              start: 'top 82%'
            },
            opacity: 0,
            y: 22,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power2.out'
          });
        }
      });

      if (document.querySelector('.founders-grid')) {
        gsap.from('.founder-card', {
          scrollTrigger: {
            trigger: '.founders-grid',
            start: 'top 80%'
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out'
        });
      }

      if (document.querySelector('.packages-grid')) {
        gsap.from('.package-card', {
          scrollTrigger: {
            trigger: '.packages-grid',
            start: 'top 80%'
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out'
        });
      }
    }

    // Плавное появление на страницах основателей (valerii.html / andrian.html)
    if (document.querySelector('.profile-hero')) {
      gsap.from('.profile-hero', {
        opacity: 0,
        y: 24,
        duration: 0.75,
        ease: 'power3.out'
      });
    }
    var stackCards = document.querySelectorAll('.stack-card');
    if (stackCards.length > 0) {
      gsap.from(stackCards, {
        opacity: 0,
        y: 20,
        duration: 0.65,
        stagger: 0.1,
        delay: 0.15,
        ease: 'power2.out'
      });
    }
  }

  // Экспорт глобальных обработчиков для кнопок в HTML
  window.openCaseModal = openCaseModal;
  window.closeModal = closeModal;
  window.selectServiceForContact = selectServiceForContact;
  window.copyContact = copyContact;
  window.toggleServiceSelection = toggleServiceSelection;

  // Инициализация при загрузке DOM
  document.addEventListener('DOMContentLoaded', function () {
    initThemeToggle();
    initMobileMenu();
    initHeroTerminal();
    initMagneticButton();
    initCasesSection();
    initPricingSection();
    initContactForm();
    initSpotlightCards();
    initAnimations();
  });
}

// Экспорт чистых функций для Node-тестов
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CASES_DATA: CASES_DATA,
    ONETIME_CATALOG: ONETIME_CATALOG,
    ALL_SERVICES_FLAT: ALL_SERVICES_FLAT,
    filterCasesList: filterCasesList,
    calculateEstimate: calculateEstimate,
    validateContactForm: validateContactForm
  };
}

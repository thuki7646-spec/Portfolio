/* ==========================================================================
   ROBO SCHOOL — данные сайта: переводы и информация о тренерах
   Подключается ПЕРЕД js/main.js.
   Русский текст находится прямо в index.html, здесь только казахский и английский.
   ========================================================================== */

/* Языки сайта */
var LANGUAGES = ['ru', 'kk', 'en'];

/* «Robo School» жирным — используется в тексте «О школе» */
var BRAND = '<b>Robo School</b>';


/* --------------------------------------------------------------------------
   Переводы обычных элементов.
   Ключ соответствует атрибуту data-i18n="..." в index.html.
   Если ключа нет (например, имена на казахском) — остаётся русский текст.
   -------------------------------------------------------------------------- */
var TRANSLATIONS = {

  /* ---------- Қазақша ---------- */
  kk: {
    // меню
    nav_about:    'Мектеп туралы',
    nav_trainers: 'Тренерлер',
    nav_price:    'Бағасы',

    // первый экран
    hero_text: 'Бастауыш сынып мұғалімдеріне арналған робототехника бойынша біліктілікті арттыру курстары',
    hero_btn:  'Курсқа жазылу',

    // о школе
    about_text: BRAND + ' – робототехника және бағдарламалау саласында педагогикалық кадрлық резервті қалыптастыруға арналған мекеме',
    stat_1: 'Робототехника бойынша әртүрлі бағыттағы ОӘК',
    stat_2: 'Робототехника енгізілген мектептер',
    stat_3: 'Біліктілікті арттыру курсынан өткен педагогтер',
    stat_4: 'Өз орталықтарымызда оқытылған балалар',

    // что получите после курса
    perks_title:             'Курстан кейін не аласыз',
    perk_certificate_title:  'Куәлік',
    perk_certificate_text:   '6–12 жас аралығындағы балаларға білім беру ұйымдарында робототехниканы оқытуға құқық беретін',
    perk_knowledge_title:    'Білім',
    perk_knowledge_text:     'Робототехника және бағдарламалау бойынша оқу-әдістемелік кешендерді әзірлеу негіздері бойынша',
    perk_practice_title:     'Практика',
    perk_practice_text:      'R:ED LAB базасында робототехниканы оқыту бойынша практикадан өту мүмкіндігі (офлайн немесе онлайн форматта)',
    perk_practice_tip:       'Бос орындар болған жағдайда',

    // тренеры
    trainers_title:   'Кәсіби тренерлер',
    role_robotics:    'робототехника пәнінің оқытушысы',
    role_programming: 'бағдарламалау пәнінің оқытушысы',
    btn_more:         'Толығырақ',

    // тарифы
    price_title:    'Қажетті пакетті таңдаңыз',
    plan_pro_text:  'Робототехника және<br>бағдарламалау бойынша ОӘК',
    plan_robo_text: 'Робототехника бойынша ОӘК',
    plan_prog_text: 'Бағдарламалау бойынша ОӘК',
    btn_request:    'Өтінім қалдыру',

    // заявка
    promo_title: 'Курсқа 10% жеңілдікпен<br>жазылыңыз',
    promo_note:  'Акция 2022 жылғы 10 наурызға дейін жарамды',
    btn_apply:   'Өтінімді рәсімдеу',

    // окно тренера
    btn_close:          'Жабу',
    tab_education:      'Білім',
    tab_experience:     'Жұмыс тәжірибесі',
    tab_awards:         'Марапаттар',
    tab_education_acc:  'Білім ▾',
    tab_experience_acc: 'Жұмыс тәжірибесі ▾',
    tab_awards_acc:     'Марапаттар ▾'
  },

  /* ---------- English ---------- */
  en: {
    nav_about:    'About',
    nav_trainers: 'Trainers',
    nav_price:    'Pricing',

    hero_text: 'Professional development courses in robotics for primary school teachers',
    hero_btn:  'Enroll in the course',

    about_text: BRAND + ' is an institution for building a talent pool of teachers in robotics and programming',
    stat_1: 'Teaching and learning kits across different robotics areas',
    stat_2: 'Schools where robotics has been launched',
    stat_3: 'Teachers who completed the professional development course',
    stat_4: 'Children trained at our own centers',

    perks_title:            'What you will get after the course',
    perk_certificate_title: 'Certificate',
    perk_certificate_text:  'Entitles you to teach robotics to children aged 6–12 in educational institutions',
    perk_knowledge_title:   'Knowledge',
    perk_knowledge_text:    'On the fundamentals of developing teaching and learning kits for robotics and programming',
    perk_practice_title:    'Practice',
    perk_practice_text:     'A chance to do teaching practice in robotics at R:ED LAB (offline or online)',
    perk_practice_tip:      'Subject to availability',

    trainers_title:   'Professional trainers',
    role_robotics:    'robotics teacher',
    role_programming: 'programming teacher',
    btn_more:         'Learn more',
    name_0: 'Irina Lime',
    name_1: 'Marina Orlova',
    name_2: 'Maxim Petrov',
    name_3: 'Konstantin Nazarov',
    name_4: 'Liza Vesennyaya',

    price_title:    'Choose your package',
    plan_pro_text:  'Teaching kits for robotics<br>and programming',
    plan_robo_text: 'Robotics teaching kit',
    plan_prog_text: 'Programming teaching kit',
    btn_request:    'Submit a request',

    promo_title: 'Enroll in the course<br>with a 10% discount',
    promo_note:  'Offer valid until March 10, 2022',
    btn_apply:   'Submit application',

    btn_close:          'Close',
    tab_education:      'Education',
    tab_experience:     'Work experience',
    tab_awards:         'Awards',
    tab_education_acc:  'Education ▾',
    tab_experience_acc: 'Work experience ▾',
    tab_awards_acc:     'Awards ▾'
  }
};

/* Подсказки (placeholder) в полях формы. Ключ = data-i18n-placeholder */
var PLACEHOLDERS = {
  kk: { field_name: 'Аты-жөні', field_phone: 'Телефон', field_email: 'E-mail' },
  en: { field_name: 'Name',     field_phone: 'Phone',   field_email: 'E-mail' }
};

/* Тексты, которые собирает JS (а не лежат в разметке) */
var LABEL_PACKAGE = { ru: 'Выбран пакет: ', kk: 'Таңдалған пакет: ', en: 'Selected package: ' };
var LABEL_BACK_TO_TOP = { ru: 'Наверх', kk: 'Жоғары', en: 'Back to top' };
var MESSAGE_THANKS = {
  ru: ['Спасибо',  'Мы свяжемся с вами в ближайшее время.'],
  kk: ['Рақмет',   'Біз сізбен жақын арада байланысамыз.'],
  en: ['Thank you', 'We will contact you shortly.']
};


/* --------------------------------------------------------------------------
   Месяцы и слово «настоящее время» — для дат в окне тренера
   -------------------------------------------------------------------------- */
var MONTHS = {
  ru: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
  kk: ['Қаңтар', 'Ақпан', 'Наурыз', 'Сәуір', 'Мамыр', 'Маусым', 'Шілде', 'Тамыз', 'Қыркүйек', 'Қазан', 'Қараша', 'Желтоқсан'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
};
var PRESENT = { ru: 'настоящее время', kk: 'қазіргі уақытқа дейін', en: 'present' };


/* --------------------------------------------------------------------------
   Образование (одинаковое у всех тренеров).
   Порядок строк: вуз, факультет, специальность, форма обучения,
                  заголовок «Курсы», название курса, место проведения.
   -------------------------------------------------------------------------- */
var EDUCATION = {
  ru: [
    'Санкт-Петербургский политехнический университет Петра Великого',
    'Факультет: Компьютерных наук и технологий',
    'Специальность: Математика и компьютерные науки',
    'Форма обучения: Очная',
    'Курсы и тренинги',
    'Программа дополнительного образования «3D Моделирование»',
    'Место проведения: Институт дополнительного образования «Политех»'
  ],
  kk: [
    'Санкт-Петербург Ұлы Петр атындағы политехникалық университеті',
    'Факультет: Компьютерлік ғылымдар және технологиялар',
    'Мамандығы: Математика және компьютерлік ғылымдар',
    'Оқу түрі: Күндізгі',
    'Курстар мен тренингтер',
    '«3D модельдеу» қосымша білім беру бағдарламасы',
    'Өткізу орны: «Политех» қосымша білім беру институты'
  ],
  en: [
    'Peter the Great St. Petersburg Polytechnic University',
    'Faculty: Computer Science and Technology',
    'Major: Mathematics and Computer Science',
    'Study mode: Full-time',
    'Courses and trainings',
    '«3D Modeling» supplementary education program',
    'Venue: «Polytechnic» Institute of Continuing Education'
  ]
};

/* Периоды обучения (одинаковые у всех): [месяц, год] */
var EDUCATION_PERIOD = { from: [9, 1995],  to: [6, 2000] };
var COURSE_PERIOD    = { from: [11, 2020], to: [2, 2021] };


/* --------------------------------------------------------------------------
   Тренеры. Порядок = значение data-trainer в index.html (0, 1, 2, 3, 4).

   experience — места работы:
       from / to — [месяц, год]; to: null означает «по настоящее время»
   awards — награды: year — год
   ru / kk / en — текст на трёх языках
   -------------------------------------------------------------------------- */
var TRAINERS = [

  /* 0 — Ирина Лайм */
  {
    experience: [
      { from: [9, 2016], to: null,
        ru: 'Преподаватель робототехники, R:ED LAB',
        kk: 'Робототехника оқытушысы, R:ED LAB',
        en: 'Robotics teacher, R:ED LAB' },
      { from: [8, 2012], to: [8, 2016],
        ru: 'Педагог дополнительного образования, школа № 12',
        kk: 'Қосымша білім беру педагогы, № 12 мектеп',
        en: 'Supplementary education teacher, School No. 12' }
    ],
    awards: [
      { year: 2021,
        ru: 'Победитель городского конкурса педагогов «Робо-Учитель»',
        kk: '«Робо-Мұғалім» қалалық педагогтер байқауының жеңімпазы',
        en: 'Winner of the «Robo-Teacher» city teachers\' competition' },
      { year: 2019,
        ru: 'Благодарность Министерства образования',
        kk: 'Білім министрлігінің алғыс хаты',
        en: 'Letter of appreciation from the Ministry of Education' }
    ]
  },

  /* 1 — Марина Орлова */
  {
    experience: [
      { from: [3, 2015], to: null,
        ru: 'Ведущий тренер по робототехнике, Robo School',
        kk: 'Робототехника бойынша жетекші тренер, Robo School',
        en: 'Lead robotics trainer, Robo School' },
      { from: [9, 2010], to: [2, 2015],
        ru: 'Учитель информатики, лицей № 239',
        kk: 'Информатика пәнінің мұғалімі, № 239 лицей',
        en: 'Computer science teacher, Lyceum No. 239' }
    ],
    awards: [
      { year: 2022,
        ru: 'Диплом лучшего методиста курсов повышения квалификации',
        kk: 'Біліктілікті арттыру курстарының үздік әдіскері дипломы',
        en: 'Diploma for best methodologist of professional development courses' },
      { year: 2018,
        ru: 'Победитель конкурса «Педагог года»',
        kk: '«Жыл педагогы» байқауының жеңімпазы',
        en: 'Winner of the «Teacher of the Year» competition' }
    ]
  },

  /* 2 — Максим Петров */
  {
    experience: [
      { from: [6, 2017], to: null,
        ru: 'Преподаватель по программированию, Robo School',
        kk: 'Бағдарламалау оқытушысы, Robo School',
        en: 'Programming teacher, Robo School' },
      { from: [1, 2013], to: [5, 2017],
        ru: 'Разработчик образовательных игр, студия EduSoft',
        kk: 'Білім беру ойындарын әзірлеуші, EduSoft студиясы',
        en: 'Educational game developer, EduSoft studio' }
    ],
    awards: [
      { year: 2020,
        ru: 'Призёр всероссийского конкурса «IT-педагог»',
        kk: '«IT-педагог» бүкілресейлік байқауының жүлдегері',
        en: 'Prize winner of the all-Russian «IT Teacher» competition' },
      { year: 2016,
        ru: 'Сертификат Scratch Educator',
        kk: 'Scratch Educator сертификаты',
        en: 'Scratch Educator certificate' }
    ]
  },

  /* 3 — Константин Назаров */
  {
    experience: [
      { from: [9, 2018], to: null,
        ru: 'Тренер по робототехнике, R:ED LAB',
        kk: 'Робототехника бойынша тренер, R:ED LAB',
        en: 'Robotics trainer, R:ED LAB' },
      { from: [9, 2014], to: [6, 2018],
        ru: 'Руководитель кружка робототехники, дом детского творчества',
        kk: 'Робототехника үйірмесінің жетекшісі, балалар шығармашылық үйі',
        en: 'Head of robotics club, children\'s creativity center' }
    ],
    awards: [
      { year: 2021,
        ru: 'Лучший тренер года по версии Robo School',
        kk: 'Robo School нұсқасы бойынша жылдың үздік тренері',
        en: 'Trainer of the Year according to Robo School' },
      { year: 2017,
        ru: 'Наставник победителей регионального чемпионата по робототехнике',
        kk: 'Робототехника бойынша аймақтық чемпионат жеңімпаздарының тәлімгері',
        en: 'Mentor of the regional robotics championship winners' }
    ]
  },

  /* 4 — Лиза Весенняя */
  {
    experience: [
      { from: [9, 2019], to: null,
        ru: 'Преподаватель по программированию, Robo School',
        kk: 'Бағдарламалау оқытушысы, Robo School',
        en: 'Programming teacher, Robo School' },
      { from: [7, 2017], to: [8, 2019],
        ru: 'Тьютор детских IT-лагерей',
        kk: 'Балалар IT-лагерьлерінің тьюторы',
        en: 'Tutor at children\'s IT camps' }
    ],
    awards: [
      { year: 2022,
        ru: 'Лучший молодой педагог Robo School',
        kk: 'Robo School-дың үздік жас педагогы',
        en: 'Best young teacher at Robo School' },
      { year: 2020,
        ru: 'Сертификат «Python для детей»',
        kk: '«Балаларға арналған Python» сертификаты',
        en: '«Python for Kids» certificate' }
    ]
  }
];

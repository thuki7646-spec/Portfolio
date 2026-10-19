/* =====================================================================
   KARIZMA — переводы (RU / KZ / EN) и переключатель языка.
   Чтобы поменять текст — правьте нужный ключ ниже.
   В HTML: data-i18n="ключ" (innerHTML), data-i18n-aria="ключ" (aria-label),
           data-i18n-alt="ключ" (alt у картинки).
   ===================================================================== */
(function () {
  'use strict';

  var STORAGE_KEY = 'karizma_lang';
  var HTML_LANG = { ru: 'ru', kk: 'kk', en: 'en' };

  var D = {};

  /* ------------------------------ РУССКИЙ ------------------------------ */
  D.ru = {
    'meta.title': 'KARIZMA — караоке-залы на Лубянке, до 10 человек',
    'meta.desc': 'Аренда караоке-зала до 10 человек. Можно приносить свою еду и алкоголь, без пробкового сбора и депозита. Круглосуточно, м. Лубянка.',

    'metro': 'м. Лубянка',
    'phone.aria': 'Позвонить',
    'nav.halls': 'Наши залы',
    'nav.book': 'Забронировать',
    'nav.menu.open': 'Открыть меню',
    'nav.menu.close': 'Закрыть меню',
    'nav.menu': 'Меню',
    'lang.aria': 'Язык сайта',

    'hero.kicker': 'Арендуй караоке-зал <br class="br-m">до 10 человек',
    'hero.title': 'Возьми <br class="br-m">алкоголь <br>и еду с собой',
    'hero.check1': 'Если хочешь попеть <br class="br-d">и оторваться',
    'hero.check2': 'Отдохнуть <br class="br-d">после работы',
    'hero.check3': 'Хорошо <br class="br-d">провести время',
    'hero.cta': 'Забронировать онлайн',
    'hero.dancer.alt': 'Девушка с микрофоном танцует в караоке',
    'hero.badge.aria': 'Работаем круглосуточно',
    'hero.badge.small': 'Можно шуметь',
    'hero.badge.main': 'Круглосуточно',
    'hero.scroll': 'Листать вниз',
    'hero.contact': 'Связаться с нами',
    'hero.tg.aria': 'Написать в Telegram',

    'strip.1': 'Профессиональное <br>караоке AST-50',
    'strip.2': 'Без пробкового <br>сбора',
    'strip.3': 'Без депозита',
    'strip.4': 'Скидка <br>в День Рождения',

    'halls.title': 'Наши залы',
    'halls.sub': 'Ознакомьтесь <br>с атмосферой праздника',
    'halls.cta': 'Забронировать',
    'halls.prev': 'Предыдущее фото',
    'halls.next': 'Следующее фото',
    'halls.photo': 'фото',
    'halls.photoN': 'Фото',
    'halls.main.alt': 'Зал караоке',
    'of': 'из',
    'hall.area': function (n) { return n + ' м²'; },
    'hall.cap': function (n) { var suf = { 8: 'ми' }[n] || 'ти'; return 'до ' + n + '-' + suf + ' человек'; },

    'adv.title': 'Наши преимущества',
    'adv.sub': 'Почему гости выбирают нас',
    'adv.1.t': 'Никакого дресс-контроля',
    'adv.2.t': '~ 40.000 песен в сет листе',
    'adv.2.l1': 'Более 50,000 студийных фонограмм',
    'adv.2.l2': 'Ежемесячное обновление репертуара',
    'adv.3.t': 'Индивидуальные залы',
    'adv.3.l1': 'Только Ваша компания',
    'adv.4.t': 'Без депозита',
    'adv.4.l1': 'Мы не берем депозит',
    'adv.4.l2': 'Оплата происходит за человека в час',
    'adv.5.t': 'В самом центре Москвы',
    'adv.6.t': 'Нет пробкового сбора',
    'adv.6.l1': 'Можно приносить с собой еду, напитки и алкоголь <b class="accent">без пробкового сбора</b>',
    'adv.mic.alt': 'Студийный микрофон на стойке',
    'cta.room': 'Забронировать зал',

    'steps.title': 'Как забронировать зал?',
    'steps.sub': 'Бронирование по шагам в чат-боте',
    'steps.prev': 'Назад',
    'steps.next': 'Вперёд',
    'steps.alt': 'Шаг {n} в чат-боте',
    'steps': [
      { cap: 'Перейти в чат-бот <br>{bot}' },
      { cap: 'Выбрать <br>количество человек' },
      { cap: 'Выбрать количество <br>часов посещения',
        bubbles: ['Количество человек: 4', 'Время посещения: 1 час / 2 часа'], me: ['Нас будет 4 человека'],
        keys: ['1 час', '2 часа', '3 часа', '4 часа'] },
      { cap: 'Выбрать дату', bubbles: ['Выберите дату:'], me: ['2 часа'],
        keys: ['18 Янв', '19 Янв', '20 Янв', '21 Янв', '22 Янв', '23 Янв'] },
      { cap: 'Выбрать <br>время старта брони', bubbles: ['Выберите время:'], me: ['19 Янв'],
        keys: ['2:00', '2:30', '3:00', '3:30', '4:00', '4:30'] },
      { cap: 'Выбрать зал', bubbles: ['Доступные залы на это время:'], me: ['4:00'],
        keys: ['Hall №1', 'Hall №2', 'Hall №3', 'Hall №5'] },
      { cap: 'Указать <br>контактный телефон', bubbles: ['Оставьте номер телефона для связи'], me: ['Hall №2'],
        keys: ['Отправить номер', 'Назад'] },
      { cap: 'Проверить <br>данные брони', bubbles: ['Зал: Hall №2', 'Дата: 19 Янв, 4:00', 'Гостей: 4, 2 часа'], me: ['+38 (097) …'],
        keys: ['Подтвердить', 'Изменить'] },
      { cap: 'Прийти и <br>отдыхать', bubbles: ['Бронь подтверждена! Ждем вас в KARIZMA'], me: ['Подтвердить'],
        keys: ['Мои брони', 'Как добраться'] }
    ],

    'faq.title': 'Вопросы и ответы',
    'faq.sub': 'Мы подготовили ответы на часто задаваемые вопросы',
    'faq.q1': 'Какое у вас караоке?',
    'faq.a1': '<p>Более 50,000 студийных фонограмм. Из них 80% — оригинальные минусовки в качестве PRO (mp3 — WAV).</p><p>Ежемесячное обновление репертуара.</p><p>Более 10,000 специальных фонограмм в сопровождении оригинальных видеоклипов.</p>',
    'faq.q2': 'Есть ли у вас английские песни?',
    'faq.a2': '<p>Да, в каталоге есть русские и зарубежные хиты, в том числе большой раздел англоязычных песен.</p>',
    'faq.q3': 'Можно ли подключить телефон?',
    'faq.a3': '<p>Да, к системе можно подключить телефон и включить свою музыку или плейлист. Уточните детали у администратора.</p>',
    'faq.q4': 'Сколько микрофонов в каждом зале?',
    'faq.a4': '<p>В каждом зале есть несколько микрофонов. Точное количество подскажет администратор при бронировании.</p>',
    'faq.q5': 'Есть ли оплата картой?',
    'faq.a5': '<p>Да, оплатить можно картой. Оплата происходит за человека в час, депозит мы не берем.</p>',
    'faq.q6': 'Можно приносить с собой алкоголь и еду?',
    'faq.a6': '<p>Да. Можно приносить с собой еду, напитки и алкоголь — без пробкового сбора.</p>',
    'faq.q7': 'Как рассчитывается стоимость?',
    'faq.a7': '<p>Стоимость считается за человека в час. Выберите количество человек и часов в чат-боте — цена покажется сразу.</p>',
    'faq.note': 'В нашем заведении Бельгийский ковролин. На входе выдают <b class="accent">индивидуально запакованные тапочки,</b> в которые необходимо переобуться.',
    'faq.slippers.alt': 'Тапочки, которые выдают на входе',

    'footer.hours': 'Пн – Вс круглосуточно',
    'footer.addr': 'м. Лубянка, ул. Сретенский переулок, 4',
    'footer.route': 'Построить маршрут',
    'footer.up': 'Подняться вверх'
  };

  /* ------------------------------ ҚАЗАҚША ------------------------------ */
  D.kk = {
    'meta.title': 'KARIZMA — Лубянкадағы караоке-залдар, 10 адамға дейін',
    'meta.desc': '10 адамға дейінгі караоке-залды жалға алу. Өз тамағыңыз бен алкогольді алып келуге болады, пробкалық жинақсыз және депозитсіз. Тәулік бойы, Лубянка метросы.',

    'metro': 'Лубянка метросы',
    'phone.aria': 'Қоңырау шалу',
    'nav.halls': 'Біздің залдар',
    'nav.book': 'Брондау',
    'nav.menu.open': 'Мәзірді ашу',
    'nav.menu.close': 'Мәзірді жабу',
    'nav.menu': 'Мәзір',
    'lang.aria': 'Сайт тілі',

    'hero.kicker': 'Караоке-залды жалға ал <br class="br-m">10 адамға дейін',
    'hero.title': 'Алкоголь <br class="br-m">мен тамақты <br>өзіңмен әкел',
    'hero.check1': 'Ән айтып, <br class="br-d">көңіл көтергің келсе',
    'hero.check2': 'Жұмыстан кейін <br class="br-d">демалу',
    'hero.check3': 'Уақытты <br class="br-d">жақсы өткізу',
    'hero.cta': 'Онлайн брондау',
    'hero.dancer.alt': 'Караокеде микрофонмен билеп жүрген қыз',
    'hero.badge.aria': 'Тәулік бойы жұмыс істейміз',
    'hero.badge.small': 'Шуылдауға болады',
    'hero.badge.main': 'Тәулік бойы',
    'hero.scroll': 'Төмен жылжыту',
    'hero.contact': 'Бізбен байланысу',
    'hero.tg.aria': 'Telegram-ға жазу',

    'strip.1': 'Кәсіби <br>AST-50 караоке',
    'strip.2': 'Пробкалық <br>жинақсыз',
    'strip.3': 'Депозитсіз',
    'strip.4': 'Туған күнге <br>жеңілдік',

    'halls.title': 'Біздің залдар',
    'halls.sub': 'Мерекенің <br>атмосферасымен танысыңыз',
    'halls.cta': 'Брондау',
    'halls.prev': 'Алдыңғы фото',
    'halls.next': 'Келесі фото',
    'halls.photo': 'фото',
    'halls.photoN': 'Фото',
    'halls.main.alt': 'Караоке залы',
    'of': '/',
    'hall.area': function (n) { return n + ' м²'; },
    'hall.cap': function (n) { return n + ' адамға дейін'; },

    'adv.title': 'Біздің артықшылықтар',
    'adv.sub': 'Қонақтар бізді неге таңдайды',
    'adv.1.t': 'Дресс-код жоқ',
    'adv.2.t': 'Сет-листте ~ 40 000 ән',
    'adv.2.l1': '50 000-нан астам студиялық фонограмма',
    'adv.2.l2': 'Репертуар ай сайын жаңарады',
    'adv.3.t': 'Жеке залдар',
    'adv.3.l1': 'Тек сіздің компанияңыз',
    'adv.4.t': 'Депозитсіз',
    'adv.4.l1': 'Біз депозит алмаймыз',
    'adv.4.l2': 'Төлем бір адамға сағатына есептеледі',
    'adv.5.t': 'Мәскеудің дәл орталығында',
    'adv.6.t': 'Пробкалық жинақ жоқ',
    'adv.6.l1': 'Тамақ, сусын және алкогольді өзіңізбен алып келуге болады — <b class="accent">пробкалық жинақсыз</b>',
    'adv.mic.alt': 'Тұғырдағы студиялық микрофон',
    'cta.room': 'Залды брондау',

    'steps.title': 'Залды қалай брондауға болады?',
    'steps.sub': 'Чат-боттағы брондау қадамдары',
    'steps.prev': 'Артқа',
    'steps.next': 'Алға',
    'steps.alt': 'Чат-боттағы {n}-қадам',
    'steps': [
      { cap: 'Чат-ботқа <br>өту {bot}' },
      { cap: 'Адам санын <br>таңдау' },
      { cap: 'Келу сағатының <br>санын таңдау',
        bubbles: ['Адам саны: 4', 'Келу уақыты: 1 сағат / 2 сағат'], me: ['Біз 4 адам боламыз'],
        keys: ['1 сағат', '2 сағат', '3 сағат', '4 сағат'] },
      { cap: 'Күнді таңдау', bubbles: ['Күнді таңдаңыз:'], me: ['2 сағат'],
        keys: ['18 қаң', '19 қаң', '20 қаң', '21 қаң', '22 қаң', '23 қаң'] },
      { cap: 'Брондаудың <br>басталу уақытын таңдау', bubbles: ['Уақытты таңдаңыз:'], me: ['19 қаң'],
        keys: ['2:00', '2:30', '3:00', '3:30', '4:00', '4:30'] },
      { cap: 'Залды таңдау', bubbles: ['Осы уақытқа қолжетімді залдар:'], me: ['4:00'],
        keys: ['Hall №1', 'Hall №2', 'Hall №3', 'Hall №5'] },
      { cap: 'Байланыс <br>телефонын көрсету', bubbles: ['Байланыс үшін телефон нөміріңізді қалдырыңыз'], me: ['Hall №2'],
        keys: ['Нөмірді жіберу', 'Артқа'] },
      { cap: 'Брондау <br>деректерін тексеру', bubbles: ['Зал: Hall №2', 'Күні: 19 қаң, 4:00', 'Қонақтар: 4, 2 сағат'], me: ['+38 (097) …'],
        keys: ['Растау', 'Өзгерту'] },
      { cap: 'Келіп <br>демалу', bubbles: ['Бронь расталды! KARIZMA-да күтеміз'], me: ['Растау'],
        keys: ['Менің брондарым', 'Қалай жетуге болады'] }
    ],

    'faq.title': 'Сұрақтар мен жауаптар',
    'faq.sub': 'Жиі қойылатын сұрақтарға жауап дайындадық',
    'faq.q1': 'Сіздерде қандай караоке?',
    'faq.a1': '<p>50 000-нан астам студиялық фонограмма. Оның 80%-ы — PRO сапасындағы (mp3 — WAV) түпнұсқа минусовкалар.</p><p>Репертуар ай сайын жаңартылып отырады.</p><p>Түпнұсқа бейнеклиптермен бірге 10 000-нан астам арнайы фонограмма.</p>',
    'faq.q2': 'Ағылшын тіліндегі әндер бар ма?',
    'faq.a2': '<p>Иә, каталогта орыс және шетелдік хиттер, соның ішінде ағылшын тіліндегі әндердің үлкен бөлімі бар.</p>',
    'faq.q3': 'Телефонды қосуға бола ма?',
    'faq.a3': '<p>Иә, жүйеге телефонды қосып, өз музыкаңызды немесе плейлистіңізді қосуға болады. Толығырақ әкімшіден біліп алыңыз.</p>',
    'faq.q4': 'Әр залда қанша микрофон бар?',
    'faq.a4': '<p>Әр залда бірнеше микрофон бар. Нақты санын брондау кезінде әкімші айтады.</p>',
    'faq.q5': 'Картамен төлеуге бола ма?',
    'faq.a5': '<p>Иә, картамен төлеуге болады. Төлем бір адамға сағатына есептеледі, депозит алмаймыз.</p>',
    'faq.q6': 'Алкоголь мен тамақты өзімен алып келуге бола ма?',
    'faq.a6': '<p>Иә. Тамақ, сусын және алкогольді өзіңізбен алып келуге болады — пробкалық жинақсыз.</p>',
    'faq.q7': 'Құны қалай есептеледі?',
    'faq.a7': '<p>Құны бір адамға сағатына есептеледі. Чат-боттан адам мен сағат санын таңдаңыз — баға бірден көрсетіледі.</p>',
    'faq.note': 'Біздің мекемеде бельгиялық кілем төселген. Кіре берісте <b class="accent">жеке оралған тәпішкелер</b> беріледі, оларды ауыстырып киюіңіз қажет.',
    'faq.slippers.alt': 'Кіре берісте берілетін тәпішкелер',

    'footer.hours': 'Дс – Жс тәулік бойы',
    'footer.addr': 'Лубянка метросы, Сретенский тұйығы, 4',
    'footer.route': 'Бағыт салу',
    'footer.up': 'Жоғары көтерілу'
  };

  /* ------------------------------ ENGLISH ------------------------------ */
  D.en = {
    'meta.title': 'KARIZMA — karaoke rooms near Lubyanka, up to 10 people',
    'meta.desc': 'Rent a karaoke room for up to 10 people. Bring your own food and alcohol — no corkage fee and no deposit. Open 24/7, Lubyanka metro, Moscow.',

    'metro': 'Lubyanka metro',
    'phone.aria': 'Call us',
    'nav.halls': 'Our rooms',
    'nav.book': 'Book now',
    'nav.menu.open': 'Open menu',
    'nav.menu.close': 'Close menu',
    'nav.menu': 'Menu',
    'lang.aria': 'Site language',

    'hero.kicker': 'Rent a karaoke room <br class="br-m">for up to 10 people',
    'hero.title': 'Bring <br class="br-m">alcohol <br>and food with you',
    'hero.check1': 'Want to sing <br class="br-d">and let loose',
    'hero.check2': 'Unwind <br class="br-d">after work',
    'hero.check3': 'Have <br class="br-d">a great time',
    'hero.cta': 'Book online',
    'hero.dancer.alt': 'A girl dancing with a microphone at karaoke',
    'hero.badge.aria': 'Open 24 hours',
    'hero.badge.small': 'Noise is welcome',
    'hero.badge.main': 'Open 24/7',
    'hero.scroll': 'Scroll down',
    'hero.contact': 'Contact us',
    'hero.tg.aria': 'Message us on Telegram',

    'strip.1': 'Professional <br>AST-50 karaoke',
    'strip.2': 'No corkage <br>fee',
    'strip.3': 'No deposit',
    'strip.4': 'Birthday <br>discount',

    'halls.title': 'Our rooms',
    'halls.sub': 'Feel the <br>party atmosphere',
    'halls.cta': 'Book now',
    'halls.prev': 'Previous photo',
    'halls.next': 'Next photo',
    'halls.photo': 'photo',
    'halls.photoN': 'Photo',
    'halls.main.alt': 'Karaoke room',
    'of': 'of',
    'hall.area': function (n) { return n + ' m²'; },
    'hall.cap': function (n) { return 'up to ' + n + ' people'; },

    'adv.title': 'Our advantages',
    'adv.sub': 'Why guests choose us',
    'adv.1.t': 'No dress code',
    'adv.2.t': '~ 40,000 songs in the set list',
    'adv.2.l1': '50,000+ studio backing tracks',
    'adv.2.l2': 'Repertoire updated every month',
    'adv.3.t': 'Private rooms',
    'adv.3.l1': 'Only your group',
    'adv.4.t': 'No deposit',
    'adv.4.l1': 'We don\u2019t take a deposit',
    'adv.4.l2': 'Payment is per person per hour',
    'adv.5.t': 'In the very heart of Moscow',
    'adv.6.t': 'No corkage fee',
    'adv.6.l1': 'Bring your own food, drinks and alcohol <b class="accent">with no corkage fee</b>',
    'adv.mic.alt': 'Studio microphone on a stand',
    'cta.room': 'Book a room',

    'steps.title': 'How to book a room?',
    'steps.sub': 'Step-by-step booking in the chat bot',
    'steps.prev': 'Back',
    'steps.next': 'Forward',
    'steps.alt': 'Step {n} in the chat bot',
    'steps': [
      { cap: 'Open the chat bot <br>{bot}' },
      { cap: 'Choose the <br>number of guests' },
      { cap: 'Choose the <br>number of hours',
        bubbles: ['Guests: 4', 'Duration: 1 hour / 2 hours'], me: ['There will be 4 of us'],
        keys: ['1 hour', '2 hours', '3 hours', '4 hours'] },
      { cap: 'Choose a date', bubbles: ['Choose a date:'], me: ['2 hours'],
        keys: ['Jan 18', 'Jan 19', 'Jan 20', 'Jan 21', 'Jan 22', 'Jan 23'] },
      { cap: 'Choose the <br>booking start time', bubbles: ['Choose a time:'], me: ['Jan 19'],
        keys: ['2:00', '2:30', '3:00', '3:30', '4:00', '4:30'] },
      { cap: 'Choose a room', bubbles: ['Rooms available at this time:'], me: ['4:00'],
        keys: ['Hall №1', 'Hall №2', 'Hall №3', 'Hall №5'] },
      { cap: 'Enter your <br>contact phone', bubbles: ['Leave your phone number'], me: ['Hall №2'],
        keys: ['Send number', 'Back'] },
      { cap: 'Check your <br>booking details', bubbles: ['Room: Hall №2', 'Date: Jan 19, 4:00', 'Guests: 4, 2 hours'], me: ['+38 (097) …'],
        keys: ['Confirm', 'Edit'] },
      { cap: 'Arrive and <br>enjoy', bubbles: ['Booking confirmed! See you at KARIZMA'], me: ['Confirm'],
        keys: ['My bookings', 'How to get there'] }
    ],

    'faq.title': 'Questions & answers',
    'faq.sub': 'We\u2019ve prepared answers to frequently asked questions',
    'faq.q1': 'What karaoke system do you have?',
    'faq.a1': '<p>More than 50,000 studio backing tracks, 80% of them original PRO-quality instrumentals (mp3 — WAV).</p><p>The repertoire is updated every month.</p><p>More than 10,000 special tracks with original music videos.</p>',
    'faq.q2': 'Do you have English songs?',
    'faq.a2': '<p>Yes — the catalog has Russian and international hits, including a large English-language section.</p>',
    'faq.q3': 'Can I connect my phone?',
    'faq.a3': '<p>Yes, you can connect your phone to the system and play your own music or playlist. Ask the administrator for details.</p>',
    'faq.q4': 'How many microphones are in each room?',
    'faq.a4': '<p>Each room has several microphones. The administrator will tell you the exact number when you book.</p>',
    'faq.q5': 'Can I pay by card?',
    'faq.a5': '<p>Yes, you can pay by card. Payment is per person per hour, and we don\u2019t take a deposit.</p>',
    'faq.q6': 'Can I bring my own alcohol and food?',
    'faq.a6': '<p>Yes. You can bring your own food, drinks and alcohol — with no corkage fee.</p>',
    'faq.q7': 'How is the price calculated?',
    'faq.a7': '<p>The price is per person per hour. Choose the number of guests and hours in the chat bot — the price appears right away.</p>',
    'faq.note': 'Our venue has Belgian carpeting. At the entrance you\u2019ll get <b class="accent">individually wrapped slippers</b> to change into.',
    'faq.slippers.alt': 'Slippers handed out at the entrance',

    'footer.hours': 'Mon – Sun, open 24/7',
    'footer.addr': 'Lubyanka metro, 4 Sretensky Lane',
    'footer.route': 'Get directions',
    'footer.up': 'Back to top'
  };

  /* ------------------------------ ЛОГИКА ------------------------------ */
  var current = 'ru';

  function readSaved() {
    try { var s = localStorage.getItem(STORAGE_KEY); if (s && D[s]) return s; } catch (e) {}
    return 'ru';
  }

  function get(key) {
    var v = D[current][key];
    if (v === undefined) v = D.ru[key];
    return v;
  }
  function t(key, arg) {
    var v = get(key);
    return typeof v === 'function' ? v(arg) : v;
  }

  function apply() {
    document.documentElement.lang = HTML_LANG[current];
    document.title = t('meta.title');
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute('content', t('meta.desc'));

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var v = t(el.getAttribute('data-i18n'));
      if (typeof v === 'string') el.innerHTML = v;
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      el.setAttribute('alt', t(el.getAttribute('data-i18n-alt')));
    });
    document.querySelectorAll('[data-setlang]').forEach(function (b) {
      var on = b.getAttribute('data-setlang') === current;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', String(on));
    });
  }

  function set(lang, silent) {
    if (!D[lang]) lang = 'ru';
    current = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    apply();
    if (!silent) document.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
  }

  window.I18N = { t: t, get: get, set: set, lang: function () { return current; } };

  current = readSaved();
  apply();

  document.querySelectorAll('[data-setlang]').forEach(function (b) {
    b.addEventListener('click', function () { set(b.getAttribute('data-setlang')); });
  });
})();

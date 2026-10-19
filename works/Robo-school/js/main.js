/* ==========================================================================
   ROBO SCHOOL — логика сайта
   Данные и переводы лежат в js/data.js (он подключается раньше).

   Содержание:
    1. Помощники и общее состояние
    2. Мобильное меню
    3. Подсветка пункта меню при прокрутке
    4. Кнопка «Наверх»
    5. Карусель тренеров
    6. Окно «Подробнее» о тренере
    7. Тарифы и выбор пакета
    8. Форма заявки
    9. Подсказка у значка «i»
   10. Переключение языков
   11. Запуск
   ========================================================================== */
(function () {
  'use strict';


  /* ======================================================================
     1. ПОМОЩНИКИ И ОБЩЕЕ СОСТОЯНИЕ
     ====================================================================== */

  /* Короткие записи для поиска элементов */
  const $  = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  /* Ширина экрана, до которой действует мобильная версия (как в CSS) */
  const MOBILE_MAX_WIDTH = 900;

  /* Текущее состояние страницы */
  const state = {
    lang: 'ru',        // выбранный язык: 'ru' | 'kk' | 'en'
    trainerIndex: 1,   // чей профиль сейчас в окне «Подробнее»
    packageName: '',   // выбранный пакет: 'PRO' | 'ROBO' | 'PROG' (пусто, если не выбран)
    formSent: false,   // отправлена ли форма
    senderName: ''     // имя из отправленной формы
  };

  /* Элементы, к которым обращаемся несколько раз */
  const els = {
    menuToggle:  $('#menu-toggle'),
    navLinks:    $$('.main-nav a'),
    backToTop:   $('#back-to-top'),
    row:         $('#trainers-row'),
    progress:    $('#trainers-progress'),
    modal:       $('#trainer-modal'),
    modalPhoto:  $('#modal-photo'),
    modalName:   $('#modal-name'),
    modalRole:   $('#modal-role'),
    modalBody:   $('#modal-body'),
    pricing:     $('.pricing'),
    plans:       $$('.plan'),
    form:        $('#apply-form'),
    badge:       $('#package-badge'),
    infoIcons:   $$('.info-icon')
  };


  /* ======================================================================
     2. МОБИЛЬНОЕ МЕНЮ
     ====================================================================== */

  function closeMenu() {
    document.body.classList.remove('menu-open');
  }

  /* Бургер открывает и закрывает меню */
  els.menuToggle.addEventListener('click', function () {
    document.body.classList.toggle('menu-open');
  });

  /* Нажатие на пункт меню закрывает его */
  els.navLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* Escape тоже закрывает */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });


  /* ======================================================================
     3. ПОДСВЕТКА ПУНКТА МЕНЮ ПРИ ПРОКРУТКЕ
     Активным считается последний раздел, чей верх уже выше линии «scrollY + 160».
     ====================================================================== */

  function updateScrollSpy() {
    const line = window.scrollY + 160;
    let current = null;

    els.navLinks.forEach(function (link) {
      const section = $(link.getAttribute('href'));   // href="#about" → <section id="about">
      if (section && section.offsetTop <= line) current = link;
    });

    els.navLinks.forEach(function (link) {
      link.classList.toggle('is-active', link === current);
    });
  }


  /* ======================================================================
     4. КНОПКА «НАВЕРХ»
     Показываем после прокрутки больше чем на 500px.
     ====================================================================== */

  const BACK_TO_TOP_SHOW_AFTER = 500;

  function updateBackToTop() {
    els.backToTop.classList.toggle('is-visible', window.scrollY > BACK_TO_TOP_SHOW_AFTER);
  }

  els.backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* ======================================================================
     5. КАРУСЕЛЬ ТРЕНЕРОВ
     ====================================================================== */

  /* Полоса прогресса: начинается с 72% (на телефоне с 47%) и растёт до 100% */
  function updateCarouselProgress() {
    const maxScroll = els.row.scrollWidth - els.row.clientWidth;
    const startPercent = window.innerWidth <= MOBILE_MAX_WIDTH ? 47 : 72;
    const scrolled = maxScroll > 0 ? els.row.scrollLeft / maxScroll : 0;

    els.progress.style.width = (startPercent + (100 - startPercent) * scrolled) + '%';
  }

  els.row.addEventListener('scroll', updateCarouselProgress);

  /* Стрелки (на телефоне скрыты) */
  const CAROUSEL_STEP = 400;
  $('#trainers-prev').addEventListener('click', function () {
    els.row.scrollBy({ left: -CAROUSEL_STEP, behavior: 'smooth' });
  });
  $('#trainers-next').addEventListener('click', function () {
    els.row.scrollBy({ left: CAROUSEL_STEP, behavior: 'smooth' });
  });


  /* ======================================================================
     6. ОКНО «ПОДРОБНЕЕ» О ТРЕНЕРЕ
     ====================================================================== */

  /* Дата или период: [9, 2016] и null → «Сентябрь 2016 — настоящее время» */
  function formatPeriod(from, to) {
    const months = MONTHS[state.lang];
    const start = months[from[0] - 1] + ' ' + from[1];
    const end = to ? months[to[0] - 1] + ' ' + to[1] : PRESENT[state.lang];

    return start + ' — ' + end;
  }

  /* HTML вкладки «Образование» (одинаковый для всех тренеров) */
  function buildEducationHtml() {
    const t = EDUCATION[state.lang];

    return formatPeriod(EDUCATION_PERIOD.from, EDUCATION_PERIOD.to) +
      '<br>' + t[0] +
      '<br>' + t[1] +
      '<br>' + t[2] +
      '<br>' + t[3] +
      '<h4>' + t[4] + '</h4>' +
      formatPeriod(COURSE_PERIOD.from, COURSE_PERIOD.to) +
      '<br>' + t[5] +
      '<br><span class="muted">' + t[6] + '</span>';
  }

  /* HTML вкладки «Опыт работы»: период, перенос строки, должность */
  function buildExperienceHtml(experience) {
    return experience.map(function (job) {
      return formatPeriod(job.from, job.to) + '<br>' + job[state.lang];
    }).join('<br><br>');
  }

  /* HTML вкладки «Награды»: год, перенос строки, название */
  function buildAwardsHtml(awards) {
    return awards.map(function (award) {
      return award.year + '<br>' + award[state.lang];
    }).join('<br><br>');
  }

  /* Заполняет три вкладки данными тренера (на текущем языке) */
  function renderTrainerPanes(trainerIndex) {
    state.trainerIndex = trainerIndex;
    const trainer = TRAINERS[trainerIndex] || TRAINERS[1];

    $('#pane-education').innerHTML  = buildEducationHtml();
    $('#pane-experience').innerHTML = buildExperienceHtml(trainer.experience);
    $('#pane-awards').innerHTML     = buildAwardsHtml(trainer.awards);
  }

  /* Показывает вкладку (tab = '0' | '1' | '2'): подсвечивает заголовок и панель */
  function showTab(tab) {
    $$('.tabs__tab').forEach(function (button) {
      button.classList.toggle('is-active', button.dataset.tab === tab);
    });
    $$('.pane').forEach(function (pane) {
      pane.classList.toggle('is-active', pane.dataset.pane === tab);
    });
  }

  /* Открывает окно для нажатой карточки тренера */
  function openTrainerModal(card) {
    els.modalPhoto.src = card.dataset.photo;
    els.modalName.textContent = $('.trainer-card__name', card).textContent;
    els.modalRole.textContent = $('.trainer-card__role', card).textContent;

    showTab('0');
    renderTrainerPanes(Number(card.dataset.trainer));
    els.modalBody.scrollTop = 0;
    els.modal.showModal();
  }

  $$('.trainer-card').forEach(function (card) {
    card.addEventListener('click', function () { openTrainerModal(card); });
  });

  /* Вкладки (компьютер) */
  $$('.tabs__tab').forEach(function (button) {
    button.addEventListener('click', function () { showTab(button.dataset.tab); });
  });

  /* Аккордеон (телефон): повторное нажатие сворачивает раздел */
  $$('.accordion-btn').forEach(function (button) {
    button.addEventListener('click', function () {
      const pane = $('.pane[data-pane="' + button.dataset.tab + '"]');

      if (pane.classList.contains('is-active')) {
        pane.classList.remove('is-active');
      } else {
        showTab(button.dataset.tab);
      }
    });
  });

  /* Закрытие: кнопка «Закрыть»/крестик */
  $('#modal-close').addEventListener('click', function () { els.modal.close(); });

  /* Закрытие: клик по затемнённому фону за окном */
  els.modal.addEventListener('click', function (e) {
    const box = els.modal.getBoundingClientRect();
    const outside = e.clientX < box.left || e.clientX > box.right ||
                    e.clientY < box.top  || e.clientY > box.bottom;

    if (outside) els.modal.close();
  });


  /* ======================================================================
     7. ТАРИФЫ И ВЫБОР ПАКЕТА
     ====================================================================== */

  /* Показывает в форме, какой пакет выбран */
  function renderPackageBadge() {
    if (!state.packageName) return;

    els.badge.textContent = LABEL_PACKAGE[state.lang] + state.packageName;
    els.badge.hidden = false;
  }

  /* Кнопка «Оставить заявку» запоминает название пакета: «– PRO –» → «PRO» */
  els.plans.forEach(function (plan) {
    $('.btn', plan).addEventListener('click', function () {
      state.packageName = $('h3', plan).textContent.replace(/–/g, '').trim();
      renderPackageBadge();
    });
  });

  /* На телефоне подсвечиваем тот тариф, который сейчас в центре экрана
     (или тот, которого коснулись). CSS-класс pricing--js включает это поведение. */
  function highlightPlan(activePlan) {
    els.plans.forEach(function (plan) {
      plan.classList.toggle('is-active', plan === activePlan);
    });
  }

  els.pricing.classList.add('pricing--js');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) highlightPlan(entry.target);
      });
    }, { rootMargin: '-45% 0px -45% 0px' });   // «окно» наблюдения — узкая полоса по центру экрана

    els.plans.forEach(function (plan) { observer.observe(plan); });
  }

  els.plans.forEach(function (plan) {
    plan.addEventListener('touchstart', function () { highlightPlan(plan); }, { passive: true });
  });


  /* ======================================================================
     8. ФОРМА ЗАЯВКИ
     Сейчас форма никуда не отправляет данные — только показывает «Спасибо».
     Чтобы заявки приходили, добавьте отправку (fetch на ваш сервер/почту/Telegram)
     внутри обработчика submit ниже.
     ====================================================================== */

  /* Защита от HTML в имени, чтобы его можно было безопасно вставить в страницу */
  function escapeHtml(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  }

  /* Сообщение «Спасибо, <имя>! ...» на текущем языке */
  function renderThanks() {
    const message = MESSAGE_THANKS[state.lang];
    const name = escapeHtml(state.senderName);

    els.form.innerHTML =
      '<div class="form-success">' +
        message[0] + (name ? ', ' + name : '') + '!<br>' + message[1] +
      '</div>';
  }

  els.form.addEventListener('submit', function (e) {
    e.preventDefault();

    state.senderName = $('#field-name').value.trim();
    state.formSent = true;
    renderThanks();
  });


  /* ======================================================================
     9. ПОДСКАЗКА У ЗНАЧКА «i»
     Компьютер: появляется при наведении (это делает CSS).
     Телефон: открывается и закрывается касанием (класс is-open).
     Подсказка сдвигается, если не помещается в экран.
     ====================================================================== */

  function fitTooltip(icon) {
    const tooltip = $('.tooltip', icon);
    const EDGE = 10;   // минимальный отступ от края экрана

    tooltip.style.marginLeft = '0px';   // сбрасываем прошлый сдвиг и измеряем заново

    const box = tooltip.getBoundingClientRect();
    let shift = 0;

    if (box.left < EDGE) {
      shift = EDGE - box.left;
    } else if (box.right > window.innerWidth - EDGE) {
      shift = window.innerWidth - EDGE - box.right;
    }

    tooltip.style.marginLeft = shift + 'px';
    tooltip.style.setProperty('--arrow-shift', (-shift) + 'px');   // стрелка остаётся над значком
  }

  els.infoIcons.forEach(function (icon) {
    icon.addEventListener('mouseenter', function () { fitTooltip(icon); });
    icon.addEventListener('focus',      function () { fitTooltip(icon); });

    /* Мышь ушла — закрываем. Для касаний не закрываем, иначе подсказка мигнёт */
    icon.addEventListener('pointerleave', function (e) {
      if (e.pointerType === 'mouse') icon.classList.remove('is-open');
    });

    icon.addEventListener('click', function (e) {
      e.stopPropagation();   // чтобы клик не дошёл до document и не закрыл подсказку сразу
      fitTooltip(icon);
      icon.classList.toggle('is-open');
    });
  });

  /* Касание вне значка закрывает подсказку */
  document.addEventListener('click', function () {
    els.infoIcons.forEach(function (icon) { icon.classList.remove('is-open'); });
  });

  window.addEventListener('resize', function () {
    els.infoIcons.forEach(fitTooltip);
  });


  /* ======================================================================
     10. ПЕРЕКЛЮЧЕНИЕ ЯЗЫКОВ
     Русский текст запоминаем из разметки (dataset.ru) при запуске,
     казахский и английский берём из TRANSLATIONS / PLACEHOLDERS (js/data.js).
     ====================================================================== */

  /* Запоминаем исходный русский текст */
  $$('[data-i18n]').forEach(function (el) {
    el.dataset.ru = el.innerHTML.trim();
  });
  $$('[data-i18n-placeholder]').forEach(function (el) {
    el.dataset.ru = el.placeholder;
  });

  /* Перевод по ключу; если перевода нет — возвращаем русский текст */
  function translate(dictionary, lang, key, russian) {
    const value = dictionary[lang] && dictionary[lang][key];
    return (lang !== 'ru' && value !== undefined) ? value : russian;
  }

  function setLang(lang) {
    state.lang = lang;
    document.documentElement.lang = lang;

    /* Тексты и placeholder'ы */
    $$('[data-i18n]').forEach(function (el) {
      el.innerHTML = translate(TRANSLATIONS, lang, el.dataset.i18n, el.dataset.ru);
    });
    $$('[data-i18n-placeholder]').forEach(function (el) {
      el.placeholder = translate(PLACEHOLDERS, lang, el.dataset.i18nPlaceholder, el.dataset.ru);
    });

    els.backToTop.setAttribute('aria-label', LABEL_BACK_TO_TOP[lang]);

    /* Подсвечиваем активную кнопку языка (их две группы: шапка и мобильное меню) */
    $$('.lang-btn').forEach(function (button) {
      button.classList.toggle('is-active', button.dataset.lang === lang);
    });

    /* Всё, что собирается из кода, пересобираем на новом языке */
    renderTrainerPanes(state.trainerIndex);
    renderPackageBadge();
    if (state.formSent) renderThanks();

    /* Длина текстов изменилась — пересчитываем размеры и позиции */
    updateCarouselProgress();
    els.infoIcons.forEach(fitTooltip);

    /* Запоминаем выбор (в некоторых браузерах localStorage может быть недоступен) */
    try { localStorage.setItem('lang', lang); } catch (e) { /* ничего страшного */ }
  }

  $$('.lang-btn').forEach(function (button) {
    button.addEventListener('click', function () { setLang(button.dataset.lang); });
  });


  /* ======================================================================
     11. ЗАПУСК
     ====================================================================== */

  window.addEventListener('scroll', updateScrollSpy);
  window.addEventListener('scroll', updateBackToTop, { passive: true });

  updateScrollSpy();
  updateBackToTop();
  updateCarouselProgress();

  /* Язык: берём сохранённый, иначе русский */
  let savedLang = 'ru';
  try { savedLang = localStorage.getItem('lang') || 'ru'; } catch (e) { /* ничего страшного */ }

  setLang(LANGUAGES.indexOf(savedLang) !== -1 ? savedLang : 'ru');

})();

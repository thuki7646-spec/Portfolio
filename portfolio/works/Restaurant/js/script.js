/*
 * Логика сайта:
 *  1. переключение языка (RU / KZ / EN);
 *  2. кнопка «наверх» с кольцом прогресса прокрутки;
 *  3. окно бронирования стола;
 *  4. мобильное меню (бургер).
 * Переводы лежат в js/translations.js.
 */

/* ---------- 1. Язык ---------- */
function initLanguage() {
  const items = [...document.querySelectorAll('[data-i]')];
  const buttons = [...document.querySelectorAll('.lang button')];
  const originalTitle = document.title;

  // Запоминаем исходный (русский) текст каждого элемента
  items.forEach((el) => { el.dataset.ru = el.innerHTML; });

  function setLanguage(lang) {
    const dict = TRANSLATIONS[lang];

    items.forEach((el) => {
      el.innerHTML = (dict && dict[el.dataset.i]) || el.dataset.ru;
    });

    document.documentElement.lang = lang;
    document.title = dict ? dict.title : originalTitle;
    buttons.forEach((b) => b.classList.toggle('on', b.dataset.l === lang));

    try { localStorage.setItem('lang', lang); } catch (e) { /* хранилище недоступно */ }
  }

  buttons.forEach((b) => b.addEventListener('click', () => setLanguage(b.dataset.l)));

  let saved = 'ru';
  try { saved = localStorage.getItem('lang') || 'ru'; } catch (e) { /* ничего */ }
  setLanguage(TRANSLATIONS[saved] ? saved : 'ru');
}

/* ---------- 2. Кнопка «наверх» ---------- */
function initScrollTop() {
  const button = document.getElementById('up');
  const ring = button.querySelector('.rg');
  const CIRCLE_LENGTH = 150.8;   // длина окружности кольца (2·π·24)
  const SHOW_AFTER = 400;        // показывать после прокрутки на 400px

  function update() {
    const y = window.pageYOffset || document.documentElement.scrollTop;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(1, y / max) : 0;

    button.classList.toggle('show', y > SHOW_AFTER);
    ring.style.strokeDashoffset = CIRCLE_LENGTH * (1 - progress);
  }

  window.addEventListener('scroll', update, { passive: true });
  button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  update();
}

/* ---------- 3. Окно бронирования ---------- */
function initBookingModal() {
  const modal = document.getElementById('md');
  const formBox = document.getElementById('mf');
  const successBox = document.getElementById('mo');
  const form = document.getElementById('bf');

  // Нельзя выбрать прошедшую дату
  document.getElementById('bd').min = new Date().toISOString().slice(0, 10);

  function open(event) {
    event.preventDefault();
    formBox.hidden = false;
    successBox.hidden = true;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => form.elements.n.focus(), 300);
  }

  function close() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Кнопки «Заказ столика» и «Заказать» открывают окно
  document.querySelectorAll('a[data-i="book"], a[data-i="order"]')
    .forEach((a) => a.addEventListener('click', open));

  document.getElementById('mx').addEventListener('click', close);
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  // Пока данные никуда не отправляются (нет сервера) — показываем «Спасибо!»
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    formBox.hidden = true;
    successBox.hidden = false;
    form.reset();
    setTimeout(close, 3500);
  });
}

/* ---------- 4. Мобильное меню ---------- */
function initMobileMenu() {
  const header = document.querySelector('header');

  header.querySelector('.bt').addEventListener('click', () => header.classList.toggle('open'));
  header.querySelectorAll('nav a').forEach((a) => a.addEventListener('click', () => header.classList.remove('open')));
}

initLanguage();
initScrollTop();
initBookingModal();
initMobileMenu();

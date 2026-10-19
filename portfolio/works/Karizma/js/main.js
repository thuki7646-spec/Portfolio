(function () {
  'use strict';

  var BOT = 'https://t.me/fh_harizma_bot';

  /* ---------------- mobile menu ---------------- */
  var menu = document.getElementById('menu');
  var overlay = document.getElementById('menuOverlay');
  var burger = document.getElementById('burger');
  function setMenu(open) {
    menu.hidden = !open;
    overlay.hidden = !open;
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', function () { setMenu(true); });
  document.getElementById('menuClose').addEventListener('click', function () { setMenu(false); });
  overlay.addEventListener('click', function () { setMenu(false); });
  document.querySelectorAll('[data-close-menu]').forEach(function (el) {
    el.addEventListener('click', function () { setMenu(false); });
  });
  // если окно растянули до десктопа — закрыть меню
  window.matchMedia('(min-width: 861px)').addEventListener('change', function (e) { if (e.matches) setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* ---------------- halls gallery ---------------- */
  // Размеры и вместимость залов 2, 3 и 5 — примерные, замените на реальные.
  var halls = [
    { name: 'Hall №1', num: '№ 1', area: 40, cap: 20, imgs: [1, 2, 3, 4, 5, 6] },
    { name: 'Hall №2', num: '№ 2', area: 28, cap: 10, imgs: [3, 1, 5, 2, 6, 4] },
    { name: 'Hall №3', num: '№ 3', area: 24, cap: 8,  imgs: [5, 6, 2, 1, 4, 3] },
    { name: 'Hall №5', num: '№ 5', area: 35, cap: 15, imgs: [2, 4, 6, 3, 1, 5] }
  ];
  var hallIdx = 0, photoIdx = 0;
  var tabsEl = document.getElementById('hallTabs');
  var thumbsEl = document.getElementById('hallThumbs');
  var mainImg = document.getElementById('hallMain');

  function renderHallTabs() {
    tabsEl.innerHTML = '';
    halls.forEach(function (h, i) {
      var b = document.createElement('button');
      b.className = 'halls__tab' + (i === hallIdx ? ' active' : '');
      b.textContent = h.name;
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', String(i === hallIdx));
      b.addEventListener('click', function () { hallIdx = i; photoIdx = 0; renderHall(); });
      tabsEl.appendChild(b);
    });
  }

  function updateHallText() {
    var h = halls[hallIdx];
    document.getElementById('hallArea').textContent = I18N.t('hall.area', h.area);
    document.getElementById('hallCap').textContent = I18N.t('hall.cap', h.cap);
    mainImg.alt = h.name + ', ' + I18N.t('halls.photo') + ' ' + (photoIdx + 1);
  }

  function renderHall() {
    var h = halls[hallIdx];
    renderHallTabs();
    document.getElementById('hallNum').textContent = h.num;
    updateHallText();
    document.getElementById('hallTotal').textContent = h.imgs.length;
    thumbsEl.innerHTML = '';
    h.imgs.forEach(function (n, i) {
      var b = document.createElement('button');
      b.setAttribute('aria-label', I18N.t('halls.photoN') + ' ' + (i + 1));
      var im = document.createElement('img');
      im.src = 'img/hall' + n + '-thumb.jpg';
      im.alt = '';
      im.loading = 'lazy';
      b.appendChild(im);
      b.addEventListener('click', function () { photoIdx = i; renderPhoto(); });
      thumbsEl.appendChild(b);
    });
    renderPhoto();
  }

  function renderPhoto() {
    var h = halls[hallIdx];
    var n = h.imgs[photoIdx];
    mainImg.style.opacity = 0;
    setTimeout(function () {
      mainImg.src = 'img/hall' + n + '.jpg';
      mainImg.alt = h.name + ', ' + I18N.t('halls.photo') + ' ' + (photoIdx + 1);
      mainImg.style.opacity = 1;
    }, 120);
    document.getElementById('hallIdx').textContent = photoIdx + 1;
    Array.prototype.forEach.call(thumbsEl.children, function (b, i) {
      b.classList.toggle('active', i === photoIdx);
    });
  }

  document.getElementById('hallPrev').addEventListener('click', function () {
    var t = halls[hallIdx].imgs.length;
    photoIdx = (photoIdx - 1 + t) % t; renderPhoto();
  });
  document.getElementById('hallNext').addEventListener('click', function () {
    var t = halls[hallIdx].imgs.length;
    photoIdx = (photoIdx + 1) % t; renderPhoto();
  });
  renderHall();

  /* ---------------- booking steps ---------------- */
  var icons = {
    bot: '<svg viewBox="0 0 24 24"><path d="M4 12h12M12 6l6 6-6 6M4 4v16"/></svg>',
    people: '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.200"/><path d="M3 20c0-4 3-6 6-6s6 2 6 6M16 14c3 0 5 2 5 5"/></svg>',
    clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    cal: '<svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M8 3v4M16 3v4"/></svg>',
    check: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M8 12.500l3 3 5-6"/></svg>',
    phone: '<svg viewBox="0 0 24 24"><rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/></svg>',
    room: '<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 12h16M12 4v16"/></svg>',
    mic: '<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M6 11a6 6 0 0 0 12 0M12 17v4"/></svg>'
  };

  // иконки и картинки шагов; тексты берутся из js/i18n.js (ключ "steps")
  var stepsMeta = [
    { icon: 'bot', img: 'chat1.jpg' },
    { icon: 'people', img: 'chat2.jpg' },
    { icon: 'clock' }, { icon: 'cal' }, { icon: 'clock' },
    { icon: 'room' }, { icon: 'phone' }, { icon: 'check' }, { icon: 'mic' }
  ];
  var steps = stepsMeta;

  var track = document.getElementById('stepsTrack');
  var stepIdx = 0;

  function chatHTML(c) {
    var h = '<div class="step__chat"><div class="step__chat-bar">harizma_karaoke_bot</div>';
    c.me.forEach(function (t) { h += '<div class="bubble bubble--me">' + t + '</div>'; });
    c.bubbles.forEach(function (t) { h += '<div class="bubble">' + t + '</div>'; });
    h += '<div class="step__keys">';
    c.keys.forEach(function (k) { h += '<span>' + k + '</span>'; });
    return h + '</div></div>';
  }

  function buildSteps() {
    var texts = I18N.get('steps');
    var keep = track.scrollLeft;
    track.innerHTML = '';
    stepsMeta.forEach(function (m, i) {
      var tx = texts[i];
      var cap = tx.cap.replace('{bot}', '<a href="' + BOT + '" target="_blank" rel="noopener">fh_harizma_bot</a>');
      var alt = I18N.t('steps.alt').replace('{n}', i + 1);
      var el = document.createElement('div');
      el.className = 'step' + (i === stepIdx ? ' active' : '');
      el.innerHTML =
        '<span class="step__badge">' + (i + 1) + '</span>' +
        '<div class="step__phone">' +
          (m.img ? '<img src="img/' + m.img + '" alt="' + alt + '">' : chatHTML(tx)) +
        '</div>' +
        '<div class="step__cap">' + icons[m.icon] + '<span>' + cap + '</span></div>';
      track.appendChild(el);
    });
    track.scrollLeft = keep;
  }
  buildSteps();
  document.getElementById('stepTotal').textContent = steps.length;

  function goStep(i, scroll) {
    stepIdx = (i + steps.length) % steps.length;
    var cards = track.children;
    Array.prototype.forEach.call(cards, function (c, k) { c.classList.toggle('active', k === stepIdx); });
    document.getElementById('stepIdx').textContent = stepIdx + 1;
    if (scroll !== false) {
      var card = cards[stepIdx];
      track.scrollTo({ left: card.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft), behavior: 'smooth' });
    }
  }
  document.getElementById('stepPrev').addEventListener('click', function () { goStep(stepIdx - 1); });
  document.getElementById('stepNext').addEventListener('click', function () { goStep(stepIdx + 1); });

  // update counter while user swipes
  var scrollTimer;
  track.addEventListener('scroll', function () {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function () {
      var best = 0, bestD = Infinity, left = track.scrollLeft + parseFloat(getComputedStyle(track).paddingLeft);
      Array.prototype.forEach.call(track.children, function (c, k) {
        var d = Math.abs(c.offsetLeft - left);
        if (d < bestD) { bestD = d; best = k; }
      });
      if (best !== stepIdx) goStep(best, false);
    }, 90);
  }, { passive: true });

  /* ---------------- FAQ ---------------- */
  document.getElementById('faq').addEventListener('click', function (e) {
    var q = e.target.closest('.faq__q');
    if (!q) return;
    var item = q.parentElement;
    var open = !item.classList.contains('open');
    document.querySelectorAll('#faq .faq__item.open').forEach(function (it) {
      it.classList.remove('open');
      it.querySelector('.faq__q').setAttribute('aria-expanded', 'false');
    });
    item.classList.toggle('open', open);
    q.setAttribute('aria-expanded', String(open));
  });

  /* ---------------- booking buttons ---------------- */
  // Кнопки «Забронировать» без внешней ссылки ведут к блоку «Как забронировать».
  // Кнопки с target="_blank" открывают Telegram-бота.

  /* ---------------- hall gallery: свайп и прокрутка миниатюр ---------------- */
  (function () {
    var box = mainImg.parentElement, x0 = null;
    box.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) < 40) return;
      document.getElementById(dx < 0 ? 'hallNext' : 'hallPrev').click();
    }, { passive: true });
    var orig = renderPhoto;
    renderPhoto = function () {
      orig();
      var b = thumbsEl.children[photoIdx];
      if (b) thumbsEl.scrollTo({ left: b.offsetLeft - thumbsEl.clientWidth / 2 + b.clientWidth / 2, behavior: 'smooth' });
    };
  })();

  /* ---------------- преимущества: на мобильном две колонки (masonry, как в макете) ---------------- */
  (function () {
    var grid = document.querySelector('.adv__grid');
    var cards = Array.prototype.slice.call(grid.children);
    var mq = window.matchMedia('(max-width: 860px)');
    function layout() {
      var on = grid.classList.contains('is-masonry');
      if (mq.matches && !on) {
        var a = document.createElement('div'), b = document.createElement('div');
        a.className = b.className = 'adv__col';
        [0, 2, 3].forEach(function (i) { a.appendChild(cards[i]); });
        [1, 4, 5].forEach(function (i) { b.appendChild(cards[i]); });
        grid.appendChild(a); grid.appendChild(b);
        grid.classList.add('is-masonry');
      } else if (!mq.matches && on) {
        cards.forEach(function (c) { grid.appendChild(c); });
        grid.querySelectorAll('.adv__col').forEach(function (c) { c.remove(); });
        grid.classList.remove('is-masonry');
      }
    }
    layout();
    mq.addEventListener('change', layout);
  })();

  /* ---------------- шапка: фиксируется при прокрутке ---------------- */
  var header = document.getElementById('top');

  /* ---------------- смена языка: перерисовать динамические блоки ---------------- */
  document.addEventListener('langchange', function () {
    updateHallText();
    // подписи фото и счётчики в миниатюрах
    Array.prototype.forEach.call(thumbsEl.children, function (b, i) {
      b.setAttribute('aria-label', I18N.t('halls.photoN') + ' ' + (i + 1));
    });
    buildSteps();
  });

  /* ---------------- scroll to top ---------------- */
  var toTop = document.getElementById('toTop');
  window.addEventListener('scroll', function () {
    toTop.classList.toggle('show', window.scrollY > 800);
    header.classList.toggle('is-fixed', window.scrollY > 60);
  }, { passive: true });
  toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
})();

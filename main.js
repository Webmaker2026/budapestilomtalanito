document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Mobile nav ---------- */
  var navToggle = document.getElementById('navToggle');
  var primaryNav = document.getElementById('primaryNav');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = primaryNav.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    primaryNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        primaryNav.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Testimonial carousel ---------- */
  var track = document.getElementById('testimonialTrack');
  var prevBtn = document.getElementById('testimonialPrev');
  var nextBtn = document.getElementById('testimonialNext');
  var dotsWrap = document.getElementById('testimonialDots');

  if (track && dotsWrap) {
    var cards = Array.prototype.slice.call(track.children);
    var perView = window.matchMedia('(min-width: 701px)').matches ? 2 : 1;
    var index = 0;

    function pagesCount() {
      return Math.max(1, cards.length - perView + 1);
    }

    function renderDots() {
      dotsWrap.innerHTML = '';
      for (var i = 0; i < pagesCount(); i++) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', 'Vélemény ' + (i + 1));
        dot.addEventListener('click', function (idx) {
          return function () { goTo(idx); };
        }(i));
        dotsWrap.appendChild(dot);
      }
      updateDots();
    }

    function updateDots() {
      Array.prototype.forEach.call(dotsWrap.children, function (dot, i) {
        dot.classList.toggle('is-active', i === index);
      });
    }

    function goTo(i) {
      index = Math.max(0, Math.min(i, pagesCount() - 1));
      var cardWidth = cards[0].getBoundingClientRect().width + 24;
      track.style.transform = 'translateX(-' + (cardWidth * index) + 'px)';
      updateDots();
    }

    prevBtn && prevBtn.addEventListener('click', function () { goTo(index - 1); });
    nextBtn && nextBtn.addEventListener('click', function () { goTo(index + 1); });

    window.addEventListener('resize', function () {
      perView = window.matchMedia('(min-width: 701px)').matches ? 2 : 1;
      renderDots();
      goTo(0);
    });

    renderDots();
    goTo(0);
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('copyYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Google Ads conversion tracking for tel: / mailto: links ---------- */
  var telLinks = document.querySelectorAll('a[href^="tel:"]');
  var mailLinks = document.querySelectorAll('a[href^="mailto:"]');

  function sendConversionWithDelay(url, sendTo) {
    var called = false;
    var fallback = function () {
      if (!called) {
        called = true;
        window.location.href = url;
      }
    };
    setTimeout(fallback, 1000);

    if (typeof gtag === 'function') {
      gtag('event', 'conversion', {
        send_to: sendTo,
        event_callback: fallback
      });
    } else {
      fallback();
    }
  }

  telLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      sendConversionWithDelay(this.getAttribute('href'), 'AW-782669134/MeM5CJ3XgNUcEM6qmvUC');
    });
  });

  mailLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      sendConversionWithDelay(this.getAttribute('href'), 'AW-782669134/9OTSCOLpgNUcEM6qmvUC');
    });
  });

});

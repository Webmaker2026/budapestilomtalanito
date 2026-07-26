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

  /* ---------- Testimonial crossfade ---------- */
  var track = document.getElementById('testimonialTrack');
  var prevBtn = document.getElementById('testimonialPrev');
  var nextBtn = document.getElementById('testimonialNext');
  var dotsWrap = document.getElementById('testimonialDots');

  if (track && dotsWrap) {
    var slides = Array.prototype.slice.call(track.children);
    var index = slides.findIndex(function (s) { return s.classList.contains('is-active'); });
    if (index < 0) index = 0;

    function renderDots() {
      dotsWrap.innerHTML = '';
      slides.forEach(function (_, i) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', 'Vélemény ' + (i + 1));
        dot.addEventListener('click', function () { goTo(i); });
        dotsWrap.appendChild(dot);
      });
      updateDots();
    }

    function updateDots() {
      Array.prototype.forEach.call(dotsWrap.children, function (dot, i) {
        dot.classList.toggle('is-active', i === index);
      });
    }

    function goTo(i) {
      slides[index].classList.remove('is-active');
      index = (i + slides.length) % slides.length;
      slides[index].classList.add('is-active');
      updateDots();
    }

    prevBtn && prevBtn.addEventListener('click', function () { goTo(index - 1); });
    nextBtn && nextBtn.addEventListener('click', function () { goTo(index + 1); });

    renderDots();
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


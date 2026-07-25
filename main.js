function safe(label, fn) {
  try { fn(); } catch (err) { console.error('[main.js] ' + label + ' failed:', err); }
}

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Mobile nav ---------- */
  safe('mobile nav', function () {
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
  });

  /* ---------- Scroll reveal ----------
     .reveal is fully visible by default (see style.css). Only once we
     know the observer is wired up do we opt the page into the
     hide-then-fade-in behaviour, so a JS failure here can never leave
     content permanently invisible. */
  safe('scroll reveal', function () {
    var revealEls = document.querySelectorAll('.reveal');
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (revealEls.length && !prefersReducedMotion && 'IntersectionObserver' in window) {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

      document.documentElement.classList.add('reveal-ready');
      revealEls.forEach(function (el) { revealObserver.observe(el); });

      /* Belt-and-suspenders: if the observer never fires for any
         reason (paused background tab, odd embedding context), force
         everything visible after a few seconds rather than leaving
         it hidden forever. */
      setTimeout(function () {
        revealEls.forEach(function (el) { el.classList.add('is-visible'); });
      }, 2500);
    }
  });

  /* ---------- Hero visual tilt ---------- */
  safe('hero tilt', function () {
    var heroVisual = document.getElementById('heroVisual');
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (heroVisual && !prefersReducedMotion && window.matchMedia('(min-width: 880px)').matches) {
      var ticking = false;

      function updateTilt() {
        var rect = heroVisual.getBoundingClientRect();
        var progress = (window.innerHeight / 2 - rect.top - rect.height / 2) / window.innerHeight;
        var rotateX = Math.max(-8, Math.min(8, progress * 14));
        heroVisual.style.transform = 'rotateX(' + (-rotateX) + 'deg) translateY(' + (progress * -24) + 'px)';
        ticking = false;
      }

      window.addEventListener('scroll', function () {
        if (!ticking) {
          window.requestAnimationFrame(updateTilt);
          ticking = true;
        }
      });
      updateTilt();
    }
  });

  /* ---------- Testimonial crossfade ---------- */
  safe('testimonial carousel', function () {
    var track = document.getElementById('testimonialTrack');
    var prevBtn = document.getElementById('testimonialPrev');
    var nextBtn = document.getElementById('testimonialNext');
    var dotsWrap = document.getElementById('testimonialDots');

    if (track && dotsWrap) {
      var slides = Array.prototype.slice.call(track.children);
      var index = slides.findIndex(function (s) { return s.classList.contains('is-active'); });
      if (index < 0) index = 0;

      var renderDots = function () {
        dotsWrap.innerHTML = '';
        slides.forEach(function (_, i) {
          var dot = document.createElement('button');
          dot.type = 'button';
          dot.setAttribute('aria-label', 'Vélemény ' + (i + 1));
          dot.addEventListener('click', function () { goTo(i); });
          dotsWrap.appendChild(dot);
        });
        updateDots();
      };

      var updateDots = function () {
        Array.prototype.forEach.call(dotsWrap.children, function (dot, i) {
          dot.classList.toggle('is-active', i === index);
        });
      };

      var goTo = function (i) {
        slides[index].classList.remove('is-active');
        index = (i + slides.length) % slides.length;
        slides[index].classList.add('is-active');
        updateDots();
      };

      prevBtn && prevBtn.addEventListener('click', function () { goTo(index - 1); });
      nextBtn && nextBtn.addEventListener('click', function () { goTo(index + 1); });

      renderDots();
    }
  });

  /* ---------- Footer year ---------- */
  safe('footer year', function () {
    var yearEl = document.getElementById('copyYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });

  /* ---------- Google Ads conversion tracking for tel: / mailto: links ---------- */
  safe('conversion tracking', function () {
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

});

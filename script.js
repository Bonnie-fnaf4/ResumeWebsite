/* Резюме — интерактив */

(function () {
  "use strict";

  /* ---------- Аватар-карусель: автопереключение ---------- */
  var avatarTrack = document.getElementById("avatarTrack");
  if (avatarTrack) {
    var avatarSlides = avatarTrack.querySelectorAll(".avatar__slide");
    var avatarIndex = 0;
    var avatarTimer = setInterval(nextAvatar, 3200);

    function nextAvatar() {
      avatarSlides[avatarIndex].classList.remove("is-active");
      avatarIndex = (avatarIndex + 1) % avatarSlides.length;
      avatarSlides[avatarIndex].classList.add("is-active");
    }

    /* пауза при наведении */
    avatarTrack.addEventListener("mouseenter", function () {
      clearInterval(avatarTimer);
    });
    avatarTrack.addEventListener("mouseleave", function () {
      avatarTimer = setInterval(nextAvatar, 3200);
    });
  }

  /* ---------- Карусель My Perfect Date (16:9) ---------- */
  var carousel = document.getElementById("mainCarousel");
  var track = document.getElementById("mainTrack");
  if (carousel && track) {
    var slides = track.querySelectorAll(".carousel-16__slide");
    var dotsWrap = document.getElementById("mainDots");
    var index = 0;

    /* точки */
    slides.forEach(function (_, i) {
      var dot = document.createElement("button");
      dot.setAttribute("aria-label", "Слайд " + (i + 1));
      if (i === 0) dot.classList.add("is-active");
      dot.addEventListener("click", function () { goTo(i); });
      dotsWrap.appendChild(dot);
    });
    var dots = dotsWrap.querySelectorAll("button");

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      slides.forEach(function (s, j) {
        s.classList.toggle("is-active", j === index);
      });
      dots.forEach(function (d, j) {
        d.classList.toggle("is-active", j === index);
      });
    }

    /* кнопки */
    var btns = carousel.querySelectorAll("[data-car='main']");
    btns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var dir = btn.classList.contains("carousel-16__btn--next") ? 1 : -1;
        goTo(index + dir);
      });
    });

    /* свайп */
    var startX = 0;
    var isDown = false;
    track.addEventListener("touchstart", function (e) {
      startX = e.touches[0].clientX;
      isDown = true;
    }, { passive: true });
    track.addEventListener("touchend", function (e) {
      if (!isDown) return;
      isDown = false;
      var diff = e.changedTouches[0].clientX - startX;
      if (Math.abs(diff) > 48) goTo(index + (diff < 0 ? 1 : -1));
    }, { passive: true });
  }

  /* ---------- Раскрытие карточек (опыт + проекты) ---------- */
  function setupExpander(cardSel, toggleSel) {
    document.querySelectorAll(cardSel).forEach(function (card) {
      var toggle = card.querySelector(toggleSel);

      function setOpen(open) {
        card.classList.toggle("is-open", open);
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      }

      /* клик по карточке — разворачивает */
      card.addEventListener("click", function (e) {
        if (e.target.closest(toggleSel)) return;
        if (!card.classList.contains("is-open")) setOpen(true);
      });

      /* кнопка сверху справа — сворачивает / разворачивает */
      toggle.addEventListener("click", function (e) {
        e.stopPropagation();
        setOpen(!card.classList.contains("is-open"));
      });
    });
  }

  setupExpander(".work-card", ".work-card__toggle");
  setupExpander(".project-card", ".project-card__toggle");
})();

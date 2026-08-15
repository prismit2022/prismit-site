document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("siteNav");

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  const heroSlider = document.getElementById("heroSlider");
  const heroTrack = document.getElementById("heroTrack");

  if (heroSlider && heroTrack) {
    const slides = heroTrack.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll("#heroDots .hero-dot");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let index = 0;
    let timer = null;

    const goTo = (target) => {
      index = (target + slides.length) % slides.length;
      heroTrack.style.transform = `translateX(-${index * 100}%)`;

      slides.forEach((slide, i) => {
        const isActive = i === index;
        slide.setAttribute("aria-hidden", String(!isActive));
        slide.querySelectorAll("a, button").forEach((el) => {
          el.tabIndex = isActive ? 0 : -1;
        });
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle("is-active", i === index);
        dot.setAttribute("aria-current", String(i === index));
      });
    };

    const stop = () => {
      if (timer) clearInterval(timer);
      timer = null;
    };

    const start = () => {
      if (prefersReducedMotion || slides.length < 2) return;
      stop();
      timer = setInterval(() => goTo(index + 1), 6000);
    };

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        goTo(i);
        start();
      });
    });

    heroSlider.addEventListener("mouseenter", stop);
    heroSlider.addEventListener("mouseleave", start);
    heroSlider.addEventListener("focusin", stop);
    heroSlider.addEventListener("focusout", start);

    goTo(0);
    start();
  }
});

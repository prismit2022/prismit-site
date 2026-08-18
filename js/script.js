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
    let index = 0;
    let timer = null;
    let resizeTimer = null;
    let sliderWidth = 0;

    const measure = () => {
      sliderWidth = heroSlider.clientWidth;
      heroTrack.style.width = `${sliderWidth * slides.length}px`;
      slides.forEach((slide) => {
        slide.style.width = `${sliderWidth}px`;
      });
    };

    const applyTransform = () => {
      heroTrack.style.transform = `translateX(-${index * sliderWidth}px)`;
    };

    const goTo = (target) => {
      index = (target + slides.length) % slides.length;
      applyTransform();

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
      if (slides.length < 2) return;
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

    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        measure();
        applyTransform();
      }, 150);
    });

    measure();
    goTo(0);
    start();
  }

  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector("button[type=submit]");
      submitBtn.disabled = true;
      submitBtn.textContent = "送信中...";
      formStatus.className = "form-status";
      formStatus.textContent = "";

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: new FormData(contactForm),
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          contactForm.reset();
          formStatus.textContent = "お問い合わせを受け付けました。ご連絡ありがとうございます。";
          formStatus.className = "form-status form-status-success";
        } else {
          formStatus.textContent = "送信に失敗しました。時間をおいて再度お試しいただくか、直接メールにてご連絡ください。";
          formStatus.className = "form-status form-status-error";
        }
      } catch (err) {
        formStatus.textContent = "送信に失敗しました。時間をおいて再度お試しいただくか、直接メールにてご連絡ください。";
        formStatus.className = "form-status form-status-error";
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "送信する";
      }
    });
  }
});

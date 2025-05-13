document.addEventListener('DOMContentLoaded', function () {
  gsap.registerPlugin(ScrollTrigger);

  // kv処理
  function initKv() {
    const movieEl = document.querySelector(".js-kv-movie");
    const imgEl = document.querySelector(".js-kv-img");
    const skipBtn = document.querySelector(".js-skip-btn");
    const openingButtons = document.querySelectorAll(".js-opening-button");
    const drawer = document.querySelector(".js-drawer");

    gsap.set(imgEl, { opacity: 0 });
    gsap.set(skipBtn, { opacity: 0 });

    const handleMovieEnd = () => {
      gsap.to(movieEl, {
        opacity: 0,
        duration: 1,
        onComplete: () => {
          movieEl.style.display = 'none';
        }
      });
      gsap.to(imgEl, {
        opacity: 1,
        duration: 1,
        onComplete: () => {
          document.body.classList.remove('is-fixed');
          drawer.classList.remove('is-disabled');
        }
      });
      gsap.to(skipBtn, {
        opacity: 0,
        duration: 1,
        onComplete: () => {
          skipBtn.style.display = 'none';
        }
      });
    };

    movieEl.addEventListener('ended', handleMovieEnd);

    skipBtn.addEventListener('click', () => {
      movieEl.pause();
      handleMovieEnd();
    });

    openingButtons.forEach(button => {
      button.addEventListener('click', () => {
        setTimeout(() => {
          movieEl.play();
          gsap.to(openingButtons, {
            opacity: 0,
            duration: 0.5,
            delay: 0.5,
            onComplete: () => {
              openingButtons.forEach(btn => {
                btn.style.display = 'none';
              });
            }
          });
          gsap.to(skipBtn, {
            opacity: 1,
            duration: 0.5,
            delay: 0.5
          });
        }, 1000);
      });
    });
  }
  initKv();

  const scaleEl = document.querySelector(".intro__imgs");
  const sampleEl = document.querySelector(".sample");
  const introImgs = document.querySelectorAll(".intro__img");
  const imgHeight = introImgs[0].offsetHeight;

  // スクロールアニメーション
  function imgScroll() {
    introImgs.forEach((img, index) => {
      gsap.set(img, { opacity: index === 0 ? 1 : 0 });
    });

    gsap.fromTo(
      introImgs,
      { scale: 0.85 },
      {
        scale: 1,
        scrollTrigger: {
          trigger: scaleEl,
          scrub: true,
          start: "top bottom",
          end: "bottom center",
        },
      }
    );

    introImgs.forEach((img, index) => {
      if (index === 0) return;

      gsap.to(img, {
        opacity: 1,
        scrollTrigger: {
          trigger: scaleEl,
          start: `bottom+=${imgHeight * index}px bottom`,
          toggleActions: "play none none reverse",
        }
      });
    });
  }
  imgScroll();

  // ピン留め同期
  function pinScaleEl() {
    const endValue = `+=${imgHeight * 3}`;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scaleEl,
        start: "top top",
        end: endValue,
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
      }
    });

    ScrollTrigger.create({
      trigger: scaleEl,
      start: "top top",
      end: endValue,
      pin: sampleEl,
      pinSpacing: true,
      anticipatePin: 1,
    });
  }
  pinScaleEl();

  // ドロワー
  function drawer() {
    const drawer = document.querySelector(".js-drawer");
    const menu = document.querySelector(".js-menu");
    const menuLinks = menu.querySelectorAll("a");

    drawer.addEventListener("click", () => {
      menu.classList.toggle("is-open");
      drawer.classList.toggle("is-open");
      document.body.classList.toggle("is-fixed");
    });

    menuLinks.forEach(link => {
      link.addEventListener("click", () => {
        menu.classList.remove("is-open");
        drawer.classList.remove("is-open");
        document.body.classList.remove("is-fixed");
      });
    });
  }
  drawer();


});

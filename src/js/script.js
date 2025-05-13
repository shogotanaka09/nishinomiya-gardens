document.addEventListener('DOMContentLoaded', function () {
  gsap.registerPlugin(ScrollTrigger);

  const scaleEl = document.querySelector(".intro__imgs");
  const sampleEl = document.querySelector(".sample");
  const introImgs = document.querySelectorAll(".intro__img");
  const imgHeight = introImgs[0].offsetHeight;

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
          end: "bottom top",
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

  function pinScaleEl() {
    const endValue = `+=${imgHeight * 4}`;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scaleEl,
        start: "top top",
        end: endValue,
        pin: true,
        pinSpacing: false,
      }
    });

    ScrollTrigger.create({
      trigger: scaleEl,
      start: "top top",
      end: endValue,
      pin: sampleEl,
      pinSpacing: true,
    });
  }
  pinScaleEl();

  function drawer() {
    const drawer = document.querySelector(".js-drawer");
    const menu = document.querySelector(".js-menu");
    const menuLinks = menu.querySelectorAll("a");

    drawer.addEventListener("click", () => {
      menu.classList.toggle("is-open");
      drawer.classList.toggle("is-open");
    });

    menuLinks.forEach(link => {
      link.addEventListener("click", () => {
        menu.classList.remove("is-open");
        drawer.classList.remove("is-open");
      });
    });
  }
  drawer();
});

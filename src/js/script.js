document.addEventListener('DOMContentLoaded', function () {
  gsap.registerPlugin(ScrollTrigger);

  function imgScroll() {
    const scaleEl = document.querySelector(".intro__imgs");
    const introImgs = document.querySelectorAll(".intro__img");

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

  const imgHeight = introImgs[0].offsetHeight;

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

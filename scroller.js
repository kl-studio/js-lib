/*
 * Pager
 * BASED ON INTLY.JS
 */

import lib from "./lib.js";

const scroller = {
  intersectionCallback: (entries) => {
    entries.forEach((entry) => {
      //let boundingRect = (window.scrollY + entry.target.getBoundingClientRect().top);
      entry.target.classList.add("js-intersection");

      if (entry.isIntersecting) {
        entry.target.classList.add("is-intersecting");
        entry.target.classList.add("has-intersected");

        window.addEventListener(
          "scroll",
          scroller.render.bind(null, entry.target)
        );
      } else {
        entry.target.classList.remove("is-intersecting");
      }
    });
  },
  render: (element = null) => {
    if (!element) {
      element = lib.qsa(".can-intersect");
    }

    if (Array.isArray(element)) {
      element.forEach((el) => {
        effect(el);
      });
    } else {
      effect(element);
    }

    function effect(element) {
      let parallax = element.querySelectorAll(".can-parallax");
      let boundingRect = window.scrollY + element.getBoundingClientRect().top;

      if (parallax) {
        parallax.forEach((elem) => {
          let scrollCalc = window.scrollY - boundingRect;
          let x;

          x = scrollCalc + window.innerHeight / 1.5;

          if (elem.classList.contains("para-one")) {
            elem.style.transform = `translateY(${scrollCalc * -0.1}px)`;
            if (x > 0) {
              elem.style.opacity = (x / 100) * 0.2;
            }
          }

          if (elem.classList.contains("para-two")) {
            elem.style.transform = `translateY(${scrollCalc * 0.1}px)`;
            if (x > 0) {
              elem.style.opacity = (x / 100) * 0.3;
            }
          }

          if (elem.classList.contains("para-three")) {
            elem.style.transform = `translateY(${scrollCalc * -0.1}px)`;
            if (x > 0) {
              elem.style.opacity = (x / 100) * 0.3;
            }
          }

          if (elem.classList.contains("para-four")) {
            elem.style.transform = `translateY(${scrollCalc * 0.48}px)`;
          }
        });
      }
    }
  },
  init: (state) => {
    lib.qsa(".can-intersect").forEach((elem) => {
      let options = {
        root: lib.body,
        rootMargin: "0px 0px 0px 0px",
        threshold: 0,
      };

      let observer = new IntersectionObserver(
        scroller.intersectionCallback,
        options
      );

      if (state.eco.current == "disabled") {
        observer.observe(elem);
      } else {
        observer.unobserve(elem);
        observer.disconnect();
      }
    });
  },
};

export { scroller as default };

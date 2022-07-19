import lib from "./lib.js";

const linker = {
  //  pager.fetch(a.pathname, callback, clss, cache)

  init: (target) => {
    let inheritLinks = "";

    if (target) {
      inheritLinks = target;
      linker.links(inheritLinks);
    } else {
      inheritLinks = lib.qsa(".inherit-link, .bounce-inherit-link");
      inheritLinks.forEach(function (links) {
        linker.links(links);
      });
    }
  },
  links: (links) => {
    if (!links.classList.contains("disable__link")) {
      // Search for parent node
      if (links.classList.contains("bounce-inherit-link")) {
        links = links.parentNode;
      }

      // Loop around click event, get ref and redirect window
      links.addEventListener("click", function () {
        let getLink = links.querySelector("a");
        // Identify _blank
        getLink.getAttribute("target") === "_blank"
          ? window.open(getLink.href, "_blank")
          : (window.location.href = getLink.href);
      });
    }
  },
};

export { linker as default };

import lib from './lib.js';

const measurer = {
    //  pager.fetch(a.pathname, callback, clss, cache)

    app: (url) => {
    
      

    
    },
    init: (url) => {
        const measure = () => {
            const doc = document.documentElement;
            doc.style.setProperty("--app-height", `${window.innerHeight}px`);

            return window.innerHeight;
        }
        window.addEventListener("resize", measure);
        measure();
    }
}

export { measurer as default }
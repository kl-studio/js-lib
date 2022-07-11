/*
 * Toggler
 *  BASED ON INTLY.JS
 *
 * Usage ----------------------------------------------
 * (1) Initiate Toggle: toggler.toggle(lib.qsa('.js--toggle'), state.theme)
 * (2) Render Current Values, But Don't Initialise: toggler.render(lib.qsa('.js--toggle'), state.theme)
 * (3) Set Toggle Value: toggler.set(lib.qsa('.js--toggle'), state.theme, 'dark')
 * (4) Turn Value On: toggler.on(lib.qsa('.js--toggle'), state.theme)
 * (5) Turn Value Off: toggler.off(lib.qsa('.js--toggle'), state.theme)
 * (6) Delete Value: toggler.delete(lib.qsa('.js--toggle'), state.theme)
 * (7) Get Current Value: toggler.get(lib.qsa('.js--toggle'), state.theme))
 *
 * Reqirements ---------------------------------------
 * (1) lib.js must be included in this package
 * (2) A State Object is recommended for this script
 * (-)(1) Example State: const state = { theme : { name: 'theme', current: 'light', opt: ['light', 'dark'], body: true } }
 */

import lib from "./lib.js";

const toggler = {
  opt: { name: "theme", current: "light", opt: ["light", "dark"], body: false },
  get: (obj, sV = toggler.opt) => {
    return sV.current ? sV.current : null;
  },
  set: (obj, sV, opt) => {
    sV.current = opt;

    if (Array.isArray(obj)) {
      obj.forEach((o) => {
        o.setAttribute(sV.name, opt);
        if (o.nodeName == "INPUT") {
          o.checked = sV.opt[1] == opt ? true : false;
        }
      });
    } else {
      obj.setAttribute(sV.name, opt);
    }

    lib.qsa("[" + sV.name + "]").forEach((el) => {
      el.setAttribute(sV.name, opt);
      if (el.nodeName == "INPUT") {
        el.checked = sV.opt[1] == opt ? true : false;
      }
    });

    if (!sV.body) {
      return true;
    }
    let xtdclss = sV.bodyclss ? sV.bodyclss + "-" : "";
    lib.bod().classList.remove(xtdclss + sV.opt[0], xtdclss + sV.opt[1]);
    lib.bod().classList.add(xtdclss + sV.current);
  },
  delete: (obj, sV) => {
    Array.isArray(obj)
      ? obj.forEach((o) => toggler.delete(o, sV))
      : obj.removeAttribute(sV.name);
    if (!sV.body) {
      return true;
    }
    lib.bod().classList.remove(sV.opt[0], sV.opt[1]);
  },
  on: (obj, sV) => {
    sV.current = sV.opt[1];
    toggler.render(obj, sV);
  },
  off: (obj, sV) => {
    sV.current = sV.opt[0];
    toggler.render(obj, sV);
  },
  toggle: (obj, sV = toggler.opt, callback = null) => {
    toggler.render(obj, sV);
    Array.isArray(obj)
      ? obj.forEach((objs) => toggler.event(objs, sV, obj, callback))
      : toggler.event(obj, sV, null, callback);
    return true;
  },
  event: (obj, sV, collection = null, callback) => {
    // Limit Event Listener Addition
    if (obj.getAttribute("listener") == "true") {
      return;
    }

    var aevent = () => {
      sV.current = sV.opt[1] == sV.current ? sV.opt[0] : sV.opt[1];
      collection ? toggler.render(collection, sV) : toggler.render(obj, sV);
      callback ? callback(sV) : null;
    };

    obj.addEventListener("click", aevent, true);
  },
  listener: (obj, res) => {
    if (Array.isArray(obj)) {
      obj.forEach((o) => {
        o.setAttribute("listener", "true");
        if (o.nodeName == "INPUT") {
          o.checked = sV.opt[1] == opt ? true : false;
        }
      });
    } else {
      obj.setAttribute("listener", "true");
    }
  },
  render: (obj, sV) => {
    // Render the current option
    toggler.set(obj, sV, sV.current);
  },
};

export { toggler as default };

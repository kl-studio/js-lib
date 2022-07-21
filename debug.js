const debug = {
  global_scope: () => {
    const iframe = window.document.createElement("iframe");
    iframe.src = "about:blank";
    window.document.body.appendChild(iframe);
    const browserGlobals = Object.keys(iframe.contentWindow);
    window.document.body.removeChild(iframe);

    const runtimeGlobals = Object.keys(window).filter((key) => {
      const isFromBrowser = browserGlobals.includes(key);
      return !isFromBrowser;
    });

    console.log("Runtime globals", runtimeGlobals);
    return runtimeGlobals;
  },
};

export { debug as default };

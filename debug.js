const debug = {
  global_scope: () => {
    // Grab browser's default global variables.
    const iframe = window.document.createElement("iframe");
    iframe.src = "about:blank";
    window.document.body.appendChild(iframe);
    const browserGlobals = Object.keys(iframe.contentWindow);
    window.document.body.removeChild(iframe);

    // Get the global variables added at runtime by filtering out the browser's
    // default global variables from the current window object.
    const runtimeGlobals = Object.keys(window).filter((key) => {
      const isFromBrowser = browserGlobals.includes(key);
      return !isFromBrowser;
    });

    console.log("Runtime globals", runtimeGlobals);

    return runtimeGlobals;
  },
};

export { debug as default };

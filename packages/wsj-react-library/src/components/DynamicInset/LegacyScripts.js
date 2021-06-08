/* eslint-disable react/no-danger */
// These are inline functions that need to be on a page with dynamic insets to supports legacy insets that require them
const Scripts = () => (
  <>
    <script
      dangerouslySetInnerHTML={{
        __html: `
    function loadCSS(href, before, media) {
      var ss = window.document.createElement("link");
      var ref = before || window.document.getElementsByTagName("meta")[0];
      var sheets = window.document.styleSheets;
      ss.rel = "stylesheet";
      ss.href = href.trim();
      ss.media = "only x";
      ref.parentNode.appendChild(ss, ref);
      function toggleMedia() {
        var defined;
        for (var i = 0; i < sheets.length; i++) {
          if (sheets[i].href && sheets[i].href.indexOf(href.trim().substr(-8)) > -1) {
            defined = true;
          }
        }
        if (defined) {
          ss.media = media || "all";
        }
        else {
          setTimeout(toggleMedia);
        }
      }

      toggleMedia();
      return ss;
    }

    window.loadCSS = loadCSS;
    `,
      }}
    />
    <script
      dangerouslySetInnerHTML={{
        __html: `
    function loadJs(src) {
      var ref = window.document.getElementsByTagName("head")[0];
      var script = window.document.createElement("script");
      script.src = src;
      script.defer = 1;
      ref.parentNode.insertBefore(script, ref);
      return script;
    }
    window.loadJs = loadJs
    `,
      }}
    />
    <script
      dangerouslySetInnerHTML={{
        __html: `
    function whenAvailable(name, callback, ms) {
      const interval = ms ? ms : 15; // ms
      var timeout = window.setTimeout(function () {
        if (window[name]) {
          window.clearTimeout(timeout);
          callback(window[name]);
        } else {
          window.setTimeout(arguments.callee, interval);
        }
      }, interval);
    }
    window.whenAvailable = whenAvailable;
    `,
      }}
    />
  </>
);

export default Scripts;

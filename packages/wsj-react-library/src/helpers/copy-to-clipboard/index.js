// taken from https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
// for more on iOS difficulty: https://stackoverflow.com/questions/34045777/copy-to-clipboard-using-javascript-in-ios
const copyToClipboard = (str, cb) => {
  if (!document || !window) return null;

  const iOS = navigator && navigator.userAgent.match(/ipad|iphone/i);

  // create invisible textarea to copy text from
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'fixed'; // To prevent scroll to bottom on IE
  el.style.left = '-9999px';
  document.body.appendChild(el);

  if (iOS) {
    let range = document.createRange();
    range.selectNodeContents(el);
    let selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    el.setSelectionRange(0, 999999);
  } else {
    el.select();
  }
  try {
    // select and copy text
    document.execCommand('copy');
    cb();
  } catch (err) {
    window.prompt('Copy to clipboard: Ctrl+C (Cmd+C on Mac)', str); // eslint-disable-line no-alert
    console.error(err); /* eslint-disable-line no-console */
  } finally {
    // clean up
    document.body.removeChild(el);
  }
};

export default copyToClipboard;

function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = url;
    script.addEventListener('load', resolve);
    script.addEventListener('error', reject);
    document.body.appendChild(script);
  });
}

function loadStyles(url) {
  return new Promise((resolve, reject) => {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = url;
    style.addEventListener('load', resolve);
    style.addEventListener('error', reject);
    document.body.appendChild(style);
  });
}

const scriptExists = (url) =>
  document.querySelector(`script[src="${url}"]`) !== null;

function waitOnScript(url) {
  return new Promise((resolve, reject) => {
    const scriptEl = document.querySelector(`script[src="${url}"]`);
    scriptEl.addEventListener('load', resolve);
    scriptEl.addEventListener('error', reject);
  });
}

export async function loadAudioLib(endpoint) {
  const scriptUrl = `${endpoint}/api-video/audio/js/audioplayer.min.js`;
  const styleUrl = `${endpoint}/api-video/audio/css/audioplayer.min.css`;
  if (window.com_marketwatch_audioplayer) {
    return;
  }

  if (scriptExists(scriptUrl)) {
    // wait for the existing script tag to load
    await waitOnScript(scriptUrl);
    return;
  }

  await Promise.all([loadScript(scriptUrl), loadStyles(styleUrl)]);
}

export async function loadVideoLib(endpoint) {
  const scriptUrl = `${endpoint}/api-video/player/v3/js/video.min.js`;
  const styleUrl = `${endpoint}/api-video/player/v3/css/video.min.css`;
  if (window.$jQ111) {
    return;
  }

  if (scriptExists(scriptUrl)) {
    // wait for the existing script tag to load
    await waitOnScript(scriptUrl);
    return;
  }

  await Promise.all([loadScript(scriptUrl), loadStyles(styleUrl)]);
}

export async function loadAtmoLib(endpoint) {
  const scriptUrl = `${endpoint}/api-video/atmospheric/js/atm.min.js`;
  if (window.com_marketwatch_atmplayer) {
    return;
  }

  if (scriptExists(scriptUrl)) {
    // wait for the existing script tag to load
    await waitOnScript(scriptUrl);
    return;
  }

  await loadScript(scriptUrl);
}

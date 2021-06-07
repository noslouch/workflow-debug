const loadVideoLib = (endpoint) => {
  const videoScript = document.getElementById('wsj-video-script');

  if (videoScript) {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (typeof window.$jQ111 !== 'undefined') {
          clearInterval(interval);
          resolve();
        }
      }, 50);
    });
  }

  return new Promise((resolve, reject) => {
    // Video script
    const script = document.createElement('script');
    script.id = 'wsj-video-script';
    script.type = 'text/javascript';
    script.async = true;
    script.src = `${endpoint}api-video/player/v3/js/video.min.js`;
    script.onload = resolve;
    script.onerror = reject;
    // Video styles
    const style = document.createElement('link');
    style.id = 'wsj-video-style';
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = `${endpoint}api-video/player/v3/css/video.min.css`;
    document.body.appendChild(script);
    document.body.appendChild(style);
  });
};

export { loadVideoLib };

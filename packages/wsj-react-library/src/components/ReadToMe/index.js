import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const loadScripts = (endpoint) => {
  const audioScript = document.getElementById('wsj-audio-script');

  if (audioScript) {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        // eslint-disable-next-line camelcase
        if (typeof com_marketwatch_audioplayer !== 'undefined') {
          clearInterval(interval);
          resolve();
        }
      }, 20);
    });
  }

  return new Promise((resolve, reject) => {
    // Audio script
    const script = document.createElement('script');
    script.id = 'wsj-audio-script';
    script.type = 'text/javascript';
    script.async = true;
    script.src = `${endpoint}/api-video/audio/js/audioplayer.min.js`;
    script.onload = resolve;
    script.onerror = reject;

    // Audio styles
    const style = document.createElement('link');
    style.id = 'wsj-audio-style';
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = `${endpoint}/api-video/audio/css/audioplayer.min.css`;

    document.body.appendChild(script);
    document.body.appendChild(style);
  });
};

function ReadToMe({
  endpoint,
  sbid,
  titleOverride,
  showTitle,
  theme,
  showHeader,
  showSubscribe,
  isArticleSnippet,
  adsEnabled,
  savePublication,
}) {
  const [isPlayerInitialized, setIsPlayerInitialized] = useState(false);
  useEffect(() => {
    if (!isPlayerInitialized) {
      loadScripts(endpoint).then(() => {
        const articleReaderEl = document.querySelector('#articlereader');
        new com_marketwatch_audioplayer(articleReaderEl); // eslint-disable-line camelcase, no-new, new-cap, no-undef
      });
      setIsPlayerInitialized(true);
    }
  }, [endpoint, isPlayerInitialized]);

  return (
    <div
      className="audioplayer"
      id="articlereader"
      data-sbid={sbid}
      data-title-override={titleOverride}
      data-show-title={showTitle}
      data-theme={theme}
      data-show-header={showHeader}
      data-show-subscribe={showSubscribe}
      data-article-snippet={isArticleSnippet}
      data-ads-enabled={adsEnabled}
      data-save-publication={savePublication}
    />
  );
}

ReadToMe.propTypes = {
  sbid: PropTypes.string.isRequired,
  endpoint: PropTypes.string,
  titleOverride: PropTypes.string,
  showTitle: PropTypes.bool,
  theme: PropTypes.string,
  showHeader: PropTypes.bool,
  showSubscribe: PropTypes.bool,
  isArticleSnippet: PropTypes.bool,
  adsEnabled: PropTypes.string,
  savePublication: PropTypes.string,
};

ReadToMe.defaultProps = {
  endpoint: 'https://video-api.wsj.com',
  titleOverride: '',
  showTitle: true,
  theme: 'wsj-article-reader',
  showHeader: false,
  showSubscribe: false,
  isArticleSnippet: true,
  adsEnabled: '',
  savePublication: '',
};

export default ReadToMe;

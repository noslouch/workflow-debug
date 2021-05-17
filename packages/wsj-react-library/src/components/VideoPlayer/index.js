// TODO: Tests when implementation has been confirmed to work as expected
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const VideoPlayerContainer = styled.div`
  cursor: pointer;
  height: 0;
  margin-bottom: 8px;
  padding-bottom: 56.25%;
  position: relative;
`;

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

const AmpVideoPlayer = ({
  guid,
  height,
  endpoint,
  parentUrl,
  placeholderSrc,
  width,
}) => {
  const src = `${endpoint}api-video/player/v3/iframe.html?guid=${guid}&height=${height}&width=${width}&plid=video_amp&chainVideos=true&resetOnComplete=true&a=a${
    parentUrl ? `&parentUrl=${parentUrl}` : ''
  }`;
  return (
    <amp-iframe
      allowfullscreen
      frameborder="0"
      height={height}
      layout="responsive"
      sandbox="allow-scripts allow-same-origin allow-popups"
      src={src}
      width={width}
    >
      {/* eslint-disable-next-line react/self-closing-comp */}
      <amp-img layout="fill" src={placeholderSrc} placeholder></amp-img>
    </amp-iframe>
  );
};

AmpVideoPlayer.propTypes = {
  guid: PropTypes.string.isRequired,
  height: PropTypes.number,
  endpoint: PropTypes.string,
  parentUrl: PropTypes.string,
  placeholderSrc: PropTypes.string,
  width: PropTypes.number,
};

AmpVideoPlayer.defaultProps = {
  height: 225,
  endpoint: 'https://video-api.wsj.com/',
  parentUrl: undefined,
  placeholderSrc: undefined,
  width: 400,
};

/** Spread props is used to add any additional event handlers the video player may accept, like:
 * onInitialize, onPlayerStateChange, onMuteUnMute, onVideoComplete, etc.
 */
const VideoPlayer = ({
  autoplay,
  endpoint,
  guid,
  isAmp,
  supressHeadline,
  ...props
}) => {
  const videoRef = useRef(null);
  useEffect(() => {
    const options = {
      autoplay,
      guid,
      isAmp,
      supressHeadline,
      ...props,
    };
    loadVideoLib(endpoint).then(() => {
      window.$jQ111(videoRef.current).WSJVideo(options);
    });
  }, [autoplay, guid, isAmp, endpoint, supressHeadline, props]);

  if (!guid) return null;
  if (isAmp) return <AmpVideoPlayer {...props} />;
  return <VideoPlayerContainer key={guid} ref={videoRef} id={guid} />;
};

VideoPlayer.propTypes = {
  adsEnabled: PropTypes.bool,
  autoplay: PropTypes.bool,
  endpoint: PropTypes.string,
  guid: PropTypes.string.isRequired,
  isAmp: PropTypes.bool,
  supressHeadline: PropTypes.bool,
};

VideoPlayer.defaultProps = {
  adsEnabled: true,
  autoplay: false,
  endpoint: 'https://video-api.wsj.com/',
  isAmp: false,
  supressHeadline: false,
};

export default VideoPlayer;

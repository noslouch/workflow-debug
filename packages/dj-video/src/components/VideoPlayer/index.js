import { useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { loadVideoLib } from '../../helpers/load-libs';

const VideoPlayerContainer = styled.div`
  cursor: pointer;
  height: 0;
  margin-bottom: 8px;
  padding-bottom: 56.25%;
  position: relative;
  video {
    display: block;
  }
`;

const AmpVideoPlayer = ({
  guid,
  height,
  endpoint,
  parentUrl,
  placeholderSrc,
  width,
}) => {
  const src = `${endpoint}/api-video/player/v3/iframe.html?guid=${guid}&height=${height}&width=${width}&plid=video_amp&chainVideos=true&resetOnComplete=true&a=a${
    parentUrl ? `&parentUrl=${encodeURIComponent(parentUrl)}` : ''
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
  endpoint: 'https://video-api.wsj.com',
  parentUrl: undefined,
  placeholderSrc: undefined,
  width: 400,
};

const playerEvents = [
  'onInitialize',
  'onNewVideo',
  'onVideoComplete',
  'onPlayerStateChange',
  'onMuteUnMute',
  'adStarted',
  'onCompanions',
  'adComplete',
  'onAdTimeUpdate',
  'adLoaded',
  'adError',
  'adRequested',
  'onTimeUpdate',
  'onSuggestionPlay',
];

/** Spread props is used to add any additional event handlers the video player may accept, like:
 * onInitialize, onPlayerStateChange, onMuteUnMute, onVideoComplete, etc.
 */
const VideoPlayer = (props) => {
  const { autoplay, endpoint, guid, idPrefix, isAmp, supressHeadline } = props;
  const videoRef = useRef(null);
  useEffect(() => {
    const options = {
      autoplay,
      guid,
      isAmp,
      supressHeadline,
      ...props,
    };
    loadVideoLib(endpoint)
      .then(() => {
        const player = window.$jQ111(videoRef.current).WSJVideo(options);
        playerEvents.forEach((event) => {
          if (typeof props[event] === 'function') {
            player.addEventListener(event, props[event]);
          }
        });
      })
      .catch((err) => console.error('Failed to load video lib', err));
  }, [autoplay, guid, isAmp, endpoint, supressHeadline, props]);

  if (!guid) return null;
  if (isAmp) return <AmpVideoPlayer {...props} />;
  // prefix the `id` with a letter so it doesn't fail html validation or throw during `.querySelector` calls
  // if we didn't specify an id, the video lib would make it `id="wrapper-null"` which would conflict with
  // multiple video players on a single page
  return (
    <VideoPlayerContainer key={guid} ref={videoRef} id={`${idPrefix}${guid}`} />
  );
};

VideoPlayer.propTypes = {
  adsEnabled: PropTypes.bool,
  autoplay: PropTypes.bool,
  endpoint: PropTypes.string,
  guid: PropTypes.string.isRequired,
  idPrefix: PropTypes.string,
  isAmp: PropTypes.bool,
  supressHeadline: PropTypes.bool,
  onInitialize: PropTypes.func,
  onNewVideo: PropTypes.func,
  onVideoComplete: PropTypes.func,
  onPlayerStateChange: PropTypes.func,
  onMuteUnMute: PropTypes.func,
  adStarted: PropTypes.func,
  onCompanions: PropTypes.func,
  adComplete: PropTypes.func,
  onAdTimeUpdate: PropTypes.func,
  adLoaded: PropTypes.func,
  adError: PropTypes.func,
  adRequested: PropTypes.func,
  onTimeUpdate: PropTypes.func,
  onSuggestionPlay: PropTypes.func,
};

VideoPlayer.defaultProps = {
  adsEnabled: true,
  autoplay: false,
  endpoint: 'https://video-api.wsj.com',
  idPrefix: 'video',
  isAmp: false,
  supressHeadline: false,
  onInitialize: null,
  onNewVideo: null,
  onVideoComplete: null,
  onPlayerStateChange: null,
  onMuteUnMute: null,
  adStarted: null,
  onCompanions: null,
  adComplete: null,
  onAdTimeUpdate: null,
  adLoaded: null,
  adError: null,
  adRequested: null,
  onTimeUpdate: null,
  onSuggestionPlay: null,
};

export default memo(VideoPlayer);

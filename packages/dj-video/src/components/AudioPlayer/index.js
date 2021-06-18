import { useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { loadAudioLib } from '../../helpers/load-libs';

const AudioPlayerContainer = styled.div`
  background-color: #fff;
  width: 100%;
`;
const AmpAudioPlayerPlaceholder = styled.div.attrs({
  placeholder: '',
})`
  background-color: #f4f4f4;
  margin-bottom: 10px;
`;
const playerEvents = ['onEnded', 'onPlayPause', 'noAudio'];

const AudioPlayer = (props) => {
  const {
    adsEnabled,
    autoplay,
    articleSnippet,
    descriptionOverride,
    endpoint,
    guid,
    hideDescription,
    hideFeedback,
    isAmp,
    sbid,
    savePublication,
    showHeader,
    showSubscribe,
    showTitle,
    theme,
    titleOverride,
  } = props;

  const audioRef = useRef(null);
  useEffect(() => {
    if (!isAmp)
      loadAudioLib(endpoint).then(() => {
        const audioInstance = new com_marketwatch_audioplayer(audioRef.current); // eslint-disable-line camelcase, no-new, new-cap, no-undef
        playerEvents.forEach((event) => {
          if (typeof props[event] === 'function') {
            audioInstance.addEventListener(event, props[event]);
          }
        });
      });
  }, [isAmp, endpoint, props]);

  if (!guid && !sbid) return null;
  if (isAmp) return <AmpAudioPlayer {...props} />;
  return (
    <AudioPlayerContainer
      id={`audio-${guid}`}
      key={guid}
      ref={audioRef}
      className="audioplayer"
      data-audio={guid}
      data-sbid={sbid}
      data-theme={theme}
      data-show-header={showHeader}
      data-show-title={showTitle}
      data-show-subscribe={showSubscribe}
      data-hide-description={hideDescription}
      data-article-snippet={articleSnippet}
      data-ads-enabled={adsEnabled}
      data-autoplay={autoplay}
      data-save-publication={savePublication}
      data-hide-feedback={hideFeedback}
      data-title-override={titleOverride}
      data-description-override={descriptionOverride}
    />
  );
};

AudioPlayer.propTypes = {
  adsEnabled: PropTypes.bool,
  autoplay: PropTypes.bool,
  articleSnippet: PropTypes.bool,
  descriptionOverride: PropTypes.string,
  endpoint: PropTypes.string,
  guid: PropTypes.string,
  height: PropTypes.number,
  hideDescription: PropTypes.bool,
  hideFeedback: PropTypes.bool,
  isAmp: PropTypes.bool,
  savePublication: PropTypes.string,
  sbid: PropTypes.string,
  showHeader: PropTypes.bool,
  showSubscribe: PropTypes.bool,
  showTitle: PropTypes.bool,
  theme: PropTypes.oneOf([
    'default',
    'foe-dark',
    'foe-light',
    'wsj-home',
    'wsj-article',
    'barrons',
    'wsj-article-reader',
    'wsj-article-reader-slim',
    'mg-article-reader',
  ]),
  titleOverride: PropTypes.string,
  width: PropTypes.number,
  onEnded: PropTypes.func,
  onPlayPause: PropTypes.func,
  noAudio: PropTypes.func,
};

AudioPlayer.defaultProps = {
  adsEnabled: false,
  autoplay: false,
  articleSnippet: false,
  descriptionOverride: null,
  endpoint: 'https://video-api.wsj.com/',
  guid: null,
  height: 300,
  hideDescription: false,
  hideFeedback: false,
  isAmp: false,
  savePublication: null,
  sbid: null,
  showHeader: true,
  showSubscribe: true,
  showTitle: true,
  titleOverride: '',
  theme: 'default',
  width: 500,
  onEnded: null,
  onPlayPause: null,
  noAudio: null,
};

const AmpAudioPlayer = ({
  adsEnabled,
  articleSnippet,
  autoplay,
  guid,
  height,
  hideDescription,
  hideFeedback,
  endpoint,
  parentUrl,
  sbid,
  showHeader,
  showTitle,
  showSubscribe,
  titleOverride,
  theme,
  width,
}) => {
  const id = guid ? `guid=${guid}` : `sbid=${sbid}`;
  const src = `${endpoint}api-video/audio/iframe.html?${id}&height=${height}&width=${width}&showHeader=${showHeader}&showTitle=${showTitle}&showSubscribe=${showSubscribe}&hideFeedback=${hideFeedback}&theme=${theme}&adsEnabled=${adsEnabled}&hideDescription=${hideDescription}&articleSnippet=${articleSnippet}&autoplay=${autoplay}${
    titleOverride ? `&titleOverride=${titleOverride}` : ''
  }${parentUrl ? `&parentUrl=${encodeURIComponent(parentUrl)}` : ''}`;
  return (
    <amp-iframe
      frameborder="0"
      height={height}
      layout="responsive"
      sandbox="allow-scripts allow-same-origin allow-popups"
      src={src}
      width={width}
    >
      <AmpAudioPlayerPlaceholder placeholder="placeholder" />
    </amp-iframe>
  );
};

AmpAudioPlayer.propTypes = AudioPlayer.propTypes;
AmpAudioPlayer.defaultProps = AudioPlayer.defaultProps;

export default memo(AudioPlayer);

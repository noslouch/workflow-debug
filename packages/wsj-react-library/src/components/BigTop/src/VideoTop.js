import { useState, useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { VideoPlayer } from '@newscorp-ghfb/dj-video';

import { QUERIES } from '../../../lib/consts';
import { PLACEMENTS } from '../lib/big-top-consts';
import useMediaQuery from '../../../hooks/useMediaQuery';

import CaptionLockup from '../components/caption-lockup';
import ImageWrapper from '../components/image-wrapper';
import HeaderLockup from '../components/header-lockup';
import ImageBackdrop from '../components/image-backdrop';

const VideoWrapper = styled(ImageWrapper)`
  .video-player {
    margin: 0;
  }
`;

const InsetContainer = styled.div`
  order: 10;
`;

export default function VideoTop({
  breadcrumb,
  className,
  dek,
  dynamicInset,
  headline,
  flashline,
  isExclusive,
  media,
  videoData,
}) {
  const [videoIsActive, setVideoIsActive] = useState(false);
  const isMedium = useMediaQuery(QUERIES.medium);
  const onPlayerStateChange = useCallback(() => setVideoIsActive(true), [
    setVideoIsActive,
  ]);
  const onVideoComplete = useCallback(() => setVideoIsActive(false), [
    setVideoIsActive,
  ]);

  const {
    bigtopheroid: guid,
    headlineplacement: placement,
    flashline: bigTopFlashlineConfig,
  } = media;

  const showBreadcrumb = bigTopFlashlineConfig !== 'false'; // these come in as strings from allesseh
  const hideTitle = videoIsActive && isMedium;

  return (
    <VideoWrapper className={className}>
      <ImageBackdrop
        gradient={!hideTitle && placement !== PLACEMENTS.UNDERNEATH}
        placement={placement}
        noMargin={dynamicInset}
      >
        {!hideTitle && (
          <HeaderLockup
            breadcrumb={breadcrumb}
            dek={dek}
            flashline={flashline}
            headline={headline}
            isExclusive={isExclusive}
            showBreadcrumb={showBreadcrumb}
            type={placement}
          />
        )}
        <VideoPlayer
          guid={guid}
          autoplay={false}
          chainVideos={false}
          adsEnabled
          suppressHeadline
          onPlayerStateChange={onPlayerStateChange}
          onVideoComplete={onVideoComplete}
        />
        {!isMedium && <CaptionLockup caption={videoData.caption} />}
      </ImageBackdrop>

      {dynamicInset && (
        <InsetContainer
          dangerouslySetInnerHTML={{ __html: dynamicInset }}
          suppressHydrationWarning
        />
      )}
    </VideoWrapper>
  );
}

VideoTop.propTypes = {
  breadcrumb: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      lable: PropTypes.string,
    })
  ),
  className: PropTypes.string,
  dek: PropTypes.string,
  dynamicInset: PropTypes.string,
  flashline: PropTypes.string,
  headline: PropTypes.string,
  isExclusive: PropTypes.bool,
  media: PropTypes.shape({
    bigtopheroid: PropTypes.string,
    headlineplacement: PropTypes.string,
    flashline: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    imagecredit: PropTypes.string,
    imagecaption: PropTypes.string,
    urllarge: PropTypes.string,
    urlsmall: PropTypes.string,
  }),
  videoData: PropTypes.shape({
    caption: PropTypes.string,
    thumbnail: PropTypes.string,
  }),
};

VideoTop.defaultProps = {
  breadcrumb: [],
  className: '',
  dek: '',
  dynamicInset: '',
  flashline: '',
  headline: '',
  isExclusive: false,
  media: {},
  videoData: {},
};

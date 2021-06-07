import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { PLACEMENTS, QUERIES } from '../../../lib/consts';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { loadAtmospheric } from '../../../lib/load-video-lib';

import CaptionLockup from '../components/caption-lockup';
import ImageWrapper from '../components/image-wrapper';
import HeaderLockup from '../components/header-lockup';
import ImageBackdrop from '../components/image-backdrop';
import Atmospheric from '../components/atmospheric-container';

export default function AtmoTop({
  breadcrumb,
  className,
  dek,
  flashline,
  headline,
  isExclusive,
  media,
  videoData,
}) {
  const {
    bigtopheroid: guid,
    headlineplacement: placement,
    flashline: bigTopFlashlineConfig,
  } = media;

  // flashlines and breadcrumbs are mutually exclusive
  const showBreadcrumb = bigTopFlashlineConfig !== 'false'; // these come in as strings from allesseh

  const isMedium = useMediaQuery(QUERIES.medium);

  useEffect(() => {
    loadAtmospheric('https://video-api.wsj.com/');
  }, []);

  return (
    <ImageWrapper className={className}>
      <ImageBackdrop
        gradient={placement !== PLACEMENTS.UNDERNEATH}
        placement={placement}
      >
        <HeaderLockup
          breadcrumb={breadcrumb}
          dek={dek}
          flashline={flashline}
          headline={headline}
          isExclusive={isExclusive}
          showBreadcrumb={showBreadcrumb}
          type={placement}
        />
        <Atmospheric
          data-atm={guid}
          thumbnail={videoData.thumbnail}
          role="presentation"
        />
        {!isMedium && <CaptionLockup caption={videoData.caption} />}
      </ImageBackdrop>
      {isMedium && <CaptionLockup caption={videoData.caption} />}
    </ImageWrapper>
  );
}

AtmoTop.propTypes = {
  breadcrumb: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      lable: PropTypes.string,
    })
  ),
  className: PropTypes.string,
  dek: PropTypes.string,
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

AtmoTop.defaultProps = {
  breadcrumb: [],
  className: '',
  dek: '',
  flashline: '',
  headline: '',
  isExclusive: false,
  media: {},
  videoData: {},
};

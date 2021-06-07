import { useState } from 'react';
import PropTypes from 'prop-types';

import useMediaQuery from '../../../hooks/useMediaQuery';
import parseImages from '../../../lib/parse-images';
import { PLACEMENTS, QUERIES } from '../../../lib/consts';

import BigImage from '../components/big-image';
import PreviewImage from '../components/preview';
import ImageWrapper from '../components/image-wrapper';
import HeaderLockup from '../components/header-lockup';
import ImageBackdrop from '../components/image-backdrop';
import CaptionLockup from '../components/caption-lockup';

export default function ImageBigTop({
  breadcrumb,
  className,
  dek,
  flashline,
  headline,
  isExclusive,
  media,
}) {
  const {
    headlineplacement: placement,
    flashline: bigTopFlashlineConfig,
  } = media;

  // there really shouldn't be more than one big top on a page
  const ariaLabelId = 'big-top-caption';
  const showBreadcrumb = bigTopFlashlineConfig !== 'false'; // these come in as strings from allesseh

  const [showPreview, setShowPreview] = useState(true);
  const isMedium = useMediaQuery(QUERIES.medium);

  const images = parseImages(media);

  return (
    <ImageWrapper className={className}>
      <ImageBackdrop
        gradient={placement !== PLACEMENTS.UNDERNEATH}
        placement={placement}
      >
        {placement !== PLACEMENTS.UNDERNEATH && (
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
        <BigImage
          ariaCaption={ariaLabelId}
          images={images}
          onLoad={() => setShowPreview(false)}
        />
        <PreviewImage
          src={images.preview.url}
          show={showPreview}
          role="presentation"
        />
        {!isMedium && (
          <CaptionLockup
            caption={media.imagecaption}
            credit={media.imagecredit}
            id={ariaLabelId}
          />
        )}
      </ImageBackdrop>
      {isMedium && (
        <CaptionLockup
          caption={media.imagecaption}
          credit={media.imagecredit}
          id={ariaLabelId}
        />
      )}
    </ImageWrapper>
  );
}

ImageBigTop.propTypes = {
  breadcrumb: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      label: PropTypes.string,
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

ImageBigTop.defaultProps = {
  breadcrumb: [],
  className: '',
  dek: '',
  flashline: '',
  headline: '',
  isExclusive: false,
  media: {},
  videoData: {},
};

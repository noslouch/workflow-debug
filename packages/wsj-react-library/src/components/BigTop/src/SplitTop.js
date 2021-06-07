import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import useMediaQuery from '../../../hooks/useMediaQuery';
import parseImages from '../../../lib/parse-images';
import { QUERIES, EXCLUSIVE } from '../../../lib/consts';

import Breadcrumbs, { Breadcrumb, Flashline } from '../../Breadcrumbs';

import Dek from '../../Dek';

import BigImage from '../components/big-image';
import PreviewImage from '../components/preview';
import BigTopCaption from '../components/caption-lockup';
import BigTopHeadline from '../components/headline';

const SplitTopDek = styled(Dek)`
  color: var(--color-jet);
`;

const HeadlineContainer = styled.div`
  order: 1;

  margin: 0 20px 55px;

  @media ${QUERIES.medium} {
    order: 0;
    flex-basis: 50%;

    margin: 0 0 5px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    text-align: center;
  }

  // headline lockup alignment
  ${BigTopHeadline},
  ${SplitTopDek} {
    @media ${QUERIES.medium} {
      padding: 0 30px;
      max-width: 640px;
    }

    @media ${QUERIES.large} {
      max-width: 960px;
    }
  }
`;

const ImageContainer = styled.div`
  // keep preview image contained
  position: relative;
  margin-bottom: 5px;

  @media ${QUERIES.medium} {
    flex-basis: 50%;
  }
`;

const SplitTopCaption = styled(BigTopCaption)`
  margin-bottom: 40px;

  @media ${QUERIES.medium} {
    text-align: right;
  }
  @media ${QUERIES.large} {
    flex-basis: 50%;

    padding: 0 5px 0 0;
    margin: 0 0 0 auto;
  }
`;

const Root = styled.div.attrs({
  'data-block': 'big-top',
})`
  display: flex;
  flex-direction: column;

  @media ${QUERIES.medium} {
    flex-direction: row;
    flex-wrap: wrap;
  }

  ${Breadcrumb} {
    color: var(--color-jet);
  }

  ${({ darkMode }) =>
    darkMode &&
    `
    background-color: var(--color-jet);

    ${Breadcrumb},
    ${Flashline},
    ${SplitTopDek},
    ${BigTopHeadline},
    ${SplitTopCaption} {
      color: white;
    }

    @media ${QUERIES.medium} {
      background-color: transparent;
      ${SplitTopCaption} {
        color: var(--color-jet);
      }

      ${HeadlineContainer} {
        background-color var(--color-jet);
      }
    }
  `}
`;

export default function SplitTop({
  breadcrumb,
  flashline,
  headline,
  dek,
  isExclusive,
  media,
}) {
  const [showPreview, setShowPreview] = useState(true);
  const isMedium = useMediaQuery(QUERIES.medium);
  const images = parseImages(media);

  const { headlineiswhite, flashline: bigTopFlashlineConfig } = media;

  // there really shouldn't be more than one big top on a page
  const ariaLabelId = 'big-top-caption';
  const darkMode = headlineiswhite === 'true';
  const breadcrumbEnabled = bigTopFlashlineConfig !== 'false'; // these come in as strings from allesseh
  // flashlines and breadcrumbs are mutually exclusive
  const noFlashline = !flashline && !isExclusive;

  return (
    <Root darkMode={darkMode}>
      <HeadlineContainer>
        {breadcrumbEnabled && (
          <Breadcrumbs
            breadcrumbs={noFlashline ? breadcrumb : []}
            flashline={isExclusive ? EXCLUSIVE : flashline}
            isExclusive={isExclusive}
            darkMode={darkMode}
          />
        )}
        <BigTopHeadline>{headline}</BigTopHeadline>
        <SplitTopDek size={isMedium ? 'm' : 's'}>{dek}</SplitTopDek>
      </HeadlineContainer>
      <ImageContainer>
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
      </ImageContainer>
      <SplitTopCaption
        caption={media.imagecaption}
        credit={media.imagecredit}
        id={ariaLabelId}
      />
    </Root>
  );
}

SplitTop.propTypes = {
  breadcrumb: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      lable: PropTypes.string,
    })
  ),
  dek: PropTypes.string,
  flashline: PropTypes.string,
  headline: PropTypes.string,
  isExclusive: PropTypes.bool,
  media: PropTypes.shape({
    headlineiswhite: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    imagecredit: PropTypes.string,
    imagecaption: PropTypes.string,
    flashline: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    urllarge: PropTypes.string,
    urlsmall: PropTypes.string,
  }),
};

SplitTop.defaultProps = {
  breadcrumb: [],
  dek: '',
  flashline: '',
  headline: '',
  isExclusive: false,
  media: {},
};

import styled from 'styled-components';
import PropTypes from 'prop-types';
import MediaLayout from './MediaLayout';
import Img from '../../Image';
import fontSize from '../../../helpers/fonts/articleFontSize';

const Figure = styled.figure`
  margin: 0 0 22px 0;

  amp-img,
  img {
    display: block;
    margin-bottom: 8px;
    max-width: 100%;
  }
`;

const Figcaption = styled.figcaption`
  color: var(--article-text-color-secondary);
  font-family: var(--article-caption-font-family);
  font-weight: var(--font-weight-light);
`;

const Caption = styled.span`
  display: block;
  font-size: ${fontSize(14)};
  line-height: calc(20 / 14);
  margin-bottom: 4px;
`;

const Credit = styled.span`
  display: block;
  font-size: ${fontSize(14)};
  line-height: calc(20 / 14);
  text-transform: uppercase;
`;

const Image = ({ data, isAmp = false, loading }) => {
  const {
    caption,
    credit,
    properties: { location, responsive: { layout = 'inline' } = {} } = {},
  } = data || {};
  // TODO: handling crops
  const imgProps = {
    src: location,
    alt: caption,
    isAmp,
    loading,
    // TODO: srcset, sizes, etc.
  };
  return (
    <MediaLayout layout={layout}>
      <Figure itemScope itemType="http://schema.org/ImageObject">
        <Img {...imgProps} />
        <Figcaption itemProp="caption">
          <Caption>{caption}</Caption>
          {credit && <Credit itemProp="creator">{`Photo: ${credit}`}</Credit>}
        </Figcaption>
      </Figure>
    </MediaLayout>
  );
};

Image.propTypes = {
  data: PropTypes.shape({
    caption: PropTypes.string,
    credit: PropTypes.string,
    properties: PropTypes.shape({
      location: PropTypes.string,
      responsive: PropTypes.shape({
        layout: PropTypes.string,
      }),
    }),
  }).isRequired,
  isAmp: PropTypes.bool,
  loading: PropTypes.oneOf(['lazy', 'eager']),
};

Image.defaultProps = {
  isAmp: false,
  loading: 'lazy',
};

export default Image;

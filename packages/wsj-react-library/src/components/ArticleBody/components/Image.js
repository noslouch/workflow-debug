import PropTypes from 'prop-types';

import MediaLayout from './MediaLayout';
import Img from '../../Image';
import Figure from '../../Image/Figure';
import Figcaption from '../../Image/Figcaption';
import Caption from '../../Image/Caption';
import Credit from '../../Image/Credit';

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
      <Figure itemScope itemType="https://schema.org/ImageObject">
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

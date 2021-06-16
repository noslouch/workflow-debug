import PropTypes from 'prop-types';
import { handleGams, handleSoftCrop } from '@newscorp-ghfb/dj-image-handler';
import MediaLayout from './MediaLayout';
import Img from '../../Image';
import Figure from '../../Image/Figure';
import Figcaption from '../../Image/Figcaption';
import Caption from '../../Image/Caption';
import Credit from '../../Image/Credit';

import INSET_WIDTHS from '../insets/widths';

const IMG_MANAGER_REGEX = /https:\/\/images.\w+.(\w+.)?\w+\/im-[0-9]{4,8}/;

const SIZE_NUMBER_REGEX = /^(\d+(?:\.\d+)?)$/;

const generateIMProps = ({ properties, width, height }, widths) => {
  const [trimmedLocation, size] = properties?.location.split('?size=');

  // Trailing size parameter could be a digit based aspect ratio or a named crop
  // if named crop, calcuate ratio instead by dividing width by height
  const sizeIsRatio = SIZE_NUMBER_REGEX.test(size);
  const desiredSize = sizeIsRatio ? size : width / height;

  const imageData = {
    location: trimmedLocation,
    size: desiredSize,
  };

  return handleSoftCrop(widths, imageData);
};

const generateGamsProps = (data, widths) => {
  return handleGams(
    {
      primaryImage: { ...data, url: data.properties?.location },
      altImages: data.alt_images,
    },
    { widths }
  );
};

const Image = ({ data, isAmp = false, loading }) => {
  const {
    caption,
    credit,
    properties: { location, responsive: { layout = 'inline' } = {} } = {},
  } = data || {};

  const widths = INSET_WIDTHS[layout];

  const isImageManager = IMG_MANAGER_REGEX.test(location);

  const generateFunction = isImageManager ? generateIMProps : generateGamsProps;
  const generatedImageProps = generateFunction(data, widths);

  const {
    url: src,
    width,
    height,
    srcset: srcSet,
    sizes,
  } = generatedImageProps;

  const imgProps = {
    src,
    width,
    height,
    srcSet,
    sizes,
    isAmp,
    loading,
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

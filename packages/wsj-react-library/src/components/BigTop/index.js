import PropTypes from 'prop-types';

import { PLACEMENTS } from '../../lib/consts';

import ImageBigTop from './src/Image';
import SplitTop from './src/SplitTop';
import VideoTop from './src/VideoTop';
import AtmoTop from './src/AtmoTop';

const TYPES = {
  IMAGE: 'Image',
  SPLIT: 'SplitTop',
  VIDEO: 'Video',
  ATMOSPHERIC: 'AutoPlayVideoClip',
};

export default function BigTop(props) {
  const {
    media: { datatype, headlineplacement },
  } = props;

  switch (datatype) {
    case TYPES.IMAGE:
      return headlineplacement === TYPES.SPLIT ? (
        <SplitTop {...props} />
      ) : (
        <ImageBigTop {...props} />
      );
    case TYPES.VIDEO:
      return <VideoTop {...props} />;
    case TYPES.ATMOSPHERIC:
      return <AtmoTop {...props} />;
    default:
      return null;
  }
}

BigTop.PLACEMENTS = PLACEMENTS;

BigTop.propTypes = {
  media: PropTypes.shape({
    datatype: PropTypes.string,
    headlineplacement: PropTypes.string,
  }),
};

BigTop.defaultProps = {
  media: {},
};

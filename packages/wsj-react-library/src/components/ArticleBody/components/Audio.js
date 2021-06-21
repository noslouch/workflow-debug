import PropTypes from 'prop-types';
import { AudioPlayer } from '@newscorp-ghfb/dj-video';
import MediaLayout from './MediaLayout';

const Audio = ({ data, isAmp }) => {
  const {
    name: guid,
    properties: { responsive: { layout = 'inline' } = {} } = {},
  } = data || {};
  if (!guid) return null;
  return (
    <MediaLayout layout={layout}>
      <AudioPlayer guid={guid} theme="wsj-article" isAmp={isAmp} />
    </MediaLayout>
  );
};

Audio.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  isAmp: PropTypes.bool,
};

Audio.defaultProps = {
  isAmp: false,
};

export default Audio;

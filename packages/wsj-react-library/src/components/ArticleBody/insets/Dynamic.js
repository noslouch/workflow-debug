import PropTypes from 'prop-types';
import MediaLayout from '../components/MediaLayout';
import DynamicInset from '../../DynamicInset';

const Dynamic = ({ data }) => {
  const {
    dynamicInsetData,
    properties: { responsive: { layout } = {}, url } = {},
  } = data || {};

  return (
    <MediaLayout layout={layout}>
      <DynamicInset data={dynamicInsetData} url={url} />
    </MediaLayout>
  );
};

Dynamic.propTypes = {
  data: PropTypes.shape({
    dynamicInsetData: PropTypes.shape({}),
    properties: PropTypes.shape({
      responsive: PropTypes.shape({
        layout: PropTypes.string,
      }),
      url: PropTypes.string,
    }),
  }).isRequired,
};

export default Dynamic;

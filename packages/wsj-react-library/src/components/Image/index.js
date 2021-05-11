import PropTypes from 'prop-types';

const Image = ({ alt, ampLayout, isAmp, loading, ...props }) => {
  if (isAmp) {
    return (
      <amp-img {...props} alt={alt} layout={ampLayout}>
        <noscript>
          <img {...props} alt={alt} />
        </noscript>
      </amp-img>
    );
  }
  return <img {...props} alt={alt} loading={loading} />;
};

Image.propTypes = {
  alt: PropTypes.string,
  ampLayout: PropTypes.string,
  isAmp: PropTypes.bool,
  loading: PropTypes.oneOf(['lazy', 'eager']),
};

Image.defaultProps = {
  alt: undefined,
  ampLayout: 'responsive',
  isAmp: false,
  loading: 'lazy',
};

export default Image;

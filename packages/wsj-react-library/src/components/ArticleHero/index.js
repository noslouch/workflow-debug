// TODO: Components from article body are reused as they look identical.
// Need to move them to a more prominent location where it's clear they are shared
import PropTypes from 'prop-types';
import Image from '../ArticleBody/components/Image';
import Video from '../ArticleBody/components/Video';

const ArticleHero = ({ data, isAmp }) => {
  const { type } = data || {};
  if (type === 'image')
    return <Image data={data} isAmp={isAmp} loading="eager" />;
  if (type === 'video') return <Video data={data} isAmp={isAmp} />;
  return null;
};

ArticleHero.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string,
  }),
  isAmp: PropTypes.bool,
};

ArticleHero.defaultProps = {
  data: undefined,
  isAmp: false,
};

export default ArticleHero;

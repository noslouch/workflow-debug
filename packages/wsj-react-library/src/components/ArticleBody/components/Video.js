import styled from 'styled-components';
import PropTypes from 'prop-types';
import { VideoPlayer } from '@newscorp-ghfb/dj-video';
import MediaLayout from './MediaLayout';
import fontSize from '../../../helpers/fonts/articleFontSize';

const Figure = styled.figure`
  margin: 22px 0;

  amp-iframe,
  iframe {
    margin-bottom: 8px;
    max-width: 100%;
  }
`;

const Figcaption = styled.figcaption`
  color: var(--article-text-color-secondary);
  font-family: var(--article-caption-font-family);
  font-weight: var(--font-weight-light);
  font-size: ${fontSize(14)};
  line-height: calc(20 / 14);
`;

const Strap = styled.div`
  border-top: 1px solid #dadada;
  margin-bottom: 12px;
`;

const Title = styled.h4`
  color: var(--article-text-color-primary);
  font-family: var(--article-caption-font-family);
  font-size: ${fontSize(16)};
  font-weight: var(--font-weight-regular);
  line-height: calc(20 / 16);
  margin: 8px 0 0 0;
`;

const Video = ({ data, isAmp }) => {
  const {
    caption,
    name: guid,
    properties: { responsive: { layout = 'inline' } = {} } = {},
    title,
  } = data || {};
  if (!guid) return null;
  const isHero = layout === 'header';
  return (
    <MediaLayout layout={layout}>
      <Figure>
        {!isHero && (
          <Strap>
            {title && <Title itempProp="description">{title}</Title>}
          </Strap>
        )}
        <VideoPlayer guid={guid} isAmp={isAmp} />
        <Figcaption>{caption}</Figcaption>
      </Figure>
    </MediaLayout>
  );
};

Video.propTypes = {
  data: PropTypes.shape({
    caption: PropTypes.string,
    name: PropTypes.string,
    properties: PropTypes.shape({
      responsive: PropTypes.shape({
        layout: PropTypes.string,
      }),
    }),
    title: PropTypes.string,
  }).isRequired,
  isAmp: PropTypes.bool,
};

Video.defaultProps = {
  isAmp: false,
};

export default Video;

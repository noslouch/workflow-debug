import styled from 'styled-components';
import MediaLayout from './MediaLayout';
import VideoPlayer from '../../VideoPlayer';

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
  font-size: calc((14 / 17) * var(--article-text-size-scale) * 1rem); // 14px
  line-height: 1.4;
`;

const Strap = styled.div`
  border-top: 1px solid #dadada;
  margin-bottom: 12px;
`;

const Title = styled.h4`
  color: var(--article-text-color-primary);
  font-family: var(--article-caption-font-family);
  font-size: calc((16 / 17) * var(--article-text-size-scale) * 1rem); // 16px
  font-weight: var(--font-weight-regular);
  line-height: 1.25;
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

export default Video;

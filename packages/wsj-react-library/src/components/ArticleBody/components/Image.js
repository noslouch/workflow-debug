import styled from 'styled-components';
import MediaLayout from './MediaLayout';
import Img from '../../Image';

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
  font-size: calc((16 / 17) * var(--article-text-size-scale) * 1rem); // 16px
  line-height: 1.375;
  margin-bottom: 4px;
`;

const Credit = styled.span`
  display: block;
  font-size: calc((14 / 17) * var(--article-text-size-scale) * 1rem); // 14px
  line-height: 1.5;
  text-transform: uppercase;
`;

const Image = ({ data, isAmp = false }) => {
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

export default Image;

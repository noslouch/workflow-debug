import { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Author from './Author';

export const AUTHOR_URL = 'https://www.wsj.com/news/author/';

const Container = styled.div`
  color: var(--color-coal);
  font-family: var(--font-family-exchange);
  font-size: var(--typography-byline-font-size-m);
  font-style: var(--font-style-italic);
  font-weight: var(--font-weight-regular);
  line-height: 22px;

  ${({ isOpinion }) =>
    isOpinion &&
    `
    font-family: var(--font-family-retina-narrow);
    font-style: normal;
    font-weight: var(--font-weight-light);
  `}
`;

const Hedcut = styled.a`
  float: left;
  margin: 0 12px 12px 0;

  amp-img,
  img {
    border: 1px solid black;
    box-sizing: border-box;
    display: block;
  }

  ${({ isOpinion }) =>
    isOpinion &&
    `
    amp-img,
    img {
      border: 0;
      border-radius: 100%;
    }
  `}
`;

const ArticleByline = ({ data, isAmp, isOpinion, shouldShowHedcut }) => {
  if (!data || !Array.isArray(data) || data.length === 0) return null;
  const bylines = data.map((block, index) => {
    const { id, phrase_type: phraseType, text, type } = block || {};
    if (type === 'phrase' && phraseType === 'author') {
      return (
        <Author key={id} authorUrl={AUTHOR_URL} data={block} isAmp={isAmp} />
      );
    }
    return <Fragment key={index}>{text}</Fragment>;
  });
  // Hedcut is taken from the first author in the data array, provided there is any at all in it
  const { hedcutImage, id: hedcutId, text: hedcutText } =
    data.find((block) => {
      const { type, phrase_type: phraseType } = block || {};
      return type === 'phrase' && phraseType === 'author';
    }) || {};
  const imgProps = {
    alt: `${hedcutText} hedcut`,
    height: isOpinion ? 40 : 60,
    src: hedcutImage,
    width: isOpinion ? 40 : 60,
  };
  return (
    <Container isOpinion={isOpinion}>
      {shouldShowHedcut && hedcutImage && (
        <Hedcut
          href={`${AUTHOR_URL}${hedcutId}`}
          isOpinion={isOpinion}
          aria-label={`Author page for ${hedcutText}`}
        >
          {isAmp ? (
            <amp-img {...imgProps} layout="responsive">
              <noscript>
                <img {...imgProps} />
              </noscript>
            </amp-img>
          ) : (
            <img {...imgProps} />
          )}
        </Hedcut>
      )}
      {bylines}
    </Container>
  );
};

ArticleByline.propTypes = {
  /** Array of author objects */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      phrase_type: PropTypes.string,
      text: PropTypes.string,
      type: PropTypes.string,
    })
  ),
  /** Renders links instead of dropdowns on amp */
  isAmp: PropTypes.bool,
  /** Changed styles for opinion pages */
  isOpinion: PropTypes.bool,
  /** Shows Hedcut for first author, if available */
  shouldShowHedcut: PropTypes.bool,
};

ArticleByline.defaultProps = {
  data: [],
  isAmp: false,
  isOpinion: false,
  shouldShowHedcut: false,
};

export default ArticleByline;

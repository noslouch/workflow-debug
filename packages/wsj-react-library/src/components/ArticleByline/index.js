import { Fragment } from 'react';
import styled from 'styled-components';

export const AUTHOR_URL = 'https://www.wsj.com/news/author/';

const Container = styled.div`
  color: var(--color-coal);
  font-family: var(--font-family-exchange);
  font-size: var(--typography-byline-font-size-m);
  font-style: var(--font-style-italic);
  font-weight: var(--font-weight-regular);
  line-height: 22px;

  ${(props) =>
    props.isOpinion &&
    `
    font-family: var(--font-family-retina-narrow);
    font-style: normal;
    font-weight: var(--font-weight-light);
  `}
`;

const Author = styled.a`
  color: #0080c3;
`;

const Hedcut = styled.a`
  float: left;
  margin: 0 12px 12px 0;

  amp-img,
  img {
    border-radius: 100%;
    display: block;
    height: 40px;
    width: 40px;
  }
`;

const ArticleByline = ({ data = [], isAmp = false, isOpinion = false }) => {
  if (!data || !Array.isArray(data) || data.length === 0) return null;
  const bylines = data.map((block, index) => {
    const { id, phrase_type: phraseType, text, type } = block || {};
    if (type === 'phrase' && phraseType === 'author') {
      return (
        <Author key={id} href={`${AUTHOR_URL}${id}`}>
          {text}
        </Author>
      );
    }
    return <Fragment key={index}>{text}</Fragment>;
  });
  // TODO: Look into hedcut options. They can potentially also be used on non opinion articles
  const { hedcut, id: hedcutId, text: hedcutText } = (isOpinion && data.find((block) => block.hedcut)) || {};
  const imgProps = {
    src: hedcut,
    alt: `${hedcutText} hedcut`,
  };
  return (
    <Container isOpinion={isOpinion}>
      {hedcut && (
        <Hedcut href={`${AUTHOR_URL}${hedcutId}`}>
          {isAmp ? (
            <amp-img {...imgProps} height="40" width="40" layout="responsive">
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

export default ArticleByline;

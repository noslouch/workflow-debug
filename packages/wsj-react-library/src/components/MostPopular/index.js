import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ReactComponent as PlayTriangleFilledMedium } from '../../assets/icons/AudioVideo/medium/play-triangle-filled-medium.svg';

const StyledMostPopular = styled.div`
  width: 100%;
`;

const SubHed = styled.h4`
  margin: 0;
  text-transform: uppercase;
  padding: var(--spacing-spacer-24) 0 var(--spacing-spacer-12);
  font-family: var(--font-font-stack-retina-narrow);
  font-weight: var(--font-weight-medium);
  font-size: var(--typography-headline-font-size-xs);
  line-height: var(--typography-headline-font-line-height-xs);
  color: ${({ $type }) =>
    $type === 'opinion' ? 'var(--color-gold)' : 'var(--color-coal)'};
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  counter-reset: li;

  li:not(:first-child) h4 {
    border-top: 1px solid var(--color-smoke);
  }
`;

const Link = styled.a`
  position: relative;
  text-decoration: none;
  color: var(--color-coal);
  max-width: 300px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: var(--spacing-spacer-12);
  padding-bottom var(--spacing-spacer-16);

  :hover {
    color: var(--color-blue);
  }

  svg {
    position: absolute;
    bottom: 7px;
    left: 7px;
    z-index: 1;
  }

  svg use {
    fill: #fff;
  }
`;

const Headline = styled.h4`
  margin: 0;
  min-height: 62px;
  font-family: var(--font-font-stack-exchange);
  font-weight: var(--font-weight-regular);
  font-size: 14px;
  line-height: 1.3;
  padding: var(--spacing-spacer-4) 0 0 var(--spacing-spacer-32);

  @media (min-width: 350px) {
    width: 150px;
  }

  :before {
    left: 0px;
    top: var(--spacing-spacer-4);
    font-family: var(--font-font-stack-escrow-condensed);
    font-size: var(--typography-body-serif-m-line-height);
    font-weight: var(--font-weight-regular);
    color: var(--color-silver);
    line-height: 1;
    position: absolute;
    counter-increment: li;
    content: counter(li) '.';
  }
`;

const ImgWrapper = styled.div`
  position: relative;
  height: min-content;
`;

const MostPopular = ({ type, collection }) => {
  const opinionDisclaimer = type === 'opinion' && 'Opinion: ';
  const subhed =
    type === 'videos' ? 'Recommended videos' : `Most Popular ${type}`;

  return (
    <StyledMostPopular>
      <SubHed $type={type}>{subhed}</SubHed>
      <List>
        {collection.map((item) => (
          <li key={item.url}>
            <Link href={item.url}>
              <meta itemProp="contentUrl" content={item.image} />
              <Headline>
                {opinionDisclaimer}
                {item.headline}
              </Headline>
              <ImgWrapper>
                {type === 'videos' && <PlayTriangleFilledMedium />}
                <img
                  src={item.image}
                  alt={item.caption}
                  width="111"
                  height="62"
                />
              </ImgWrapper>
            </Link>
          </li>
        ))}
      </List>
    </StyledMostPopular>
  );
};

MostPopular.propTypes = {
  type: PropTypes.oneOf(['news', 'opinion', 'videos']).isRequired,
  collection: PropTypes.arrayOf(
    PropTypes.shape({
      headline: PropTypes.string,
      url: PropTypes.string,
      image: PropTypes.string,
      caption: PropTypes.string,
    })
  ).isRequired,
};

export default MostPopular;

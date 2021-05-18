import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ReactComponent as ChevronRightMedium } from '../../assets/icons/Standard/medium/chevron-right-medium.svg';

const BreakingNewsWrapper = styled.div`
  display: block;
  position: relative;
  padding: 20px 0;
  margin: 0;
  border-bottom: 1px solid var(--color-silver);
  background-color: var(--color-white);

  @media (min-width: 640px) and (max-width: 979px) {
    padding: 20px 10px;
  }

  @media (max-width: 639px) {
    padding: 10px;
  }
`;

const BreakingNewsContainer = styled.div`
  margin: 0 auto;
  width: 1260px;

  @media (min-width: 980px) and (max-width: 1299px) {
    width: 970px;
  }

  @media (max-width: 979px) {
    width: 100%;
    min-width: 300px;
  }
`;

const BreakingNewsLabel = styled.div`
  display: inline-block;
  width: 140px;
  margin-right: 20px;
  font-family: var(--font-font-stack-retina-narrow);
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.37px;
  color: #eb0303;
  text-transform: uppercase;

  @media (max-width: 639px) {
    margin-bottom: 10px;
  }
`;

const BreakingNewsHeadline = styled.h2`
  display: inline-block;
  margin: 0;
  font-family: var(--font-font-stack-retina);
  font-size: 14px;
  line-height: 16px;
  font-weight: var(--font-weight-regular);
  color: #212121;

  @media (min-width: 980px) and (max-width: 1299px) {
    width: 740px;
  }

  @media (min-width: 640px) and (max-width: 979px) {
    width: 70%;
  }
`;

const BreakingNewsArrow = styled(ChevronRightMedium)`
  display: inline-block;
  float: right;
  color: var(--color-jet);
  margin-top: -4px;

  @media (max-width: 639px) {
    position: absolute;
    top: 10px;
    right: 0;
  }
`;

const BreakingNews = ({ headline, url }) => {
  const props = {
    ...(url && { as: 'a', href: url }),
  };

  return (
    <BreakingNewsWrapper {...props}>
      <BreakingNewsContainer>
        <BreakingNewsLabel>BREAKING NEWS</BreakingNewsLabel>
        <BreakingNewsHeadline>{headline}</BreakingNewsHeadline>
        {url && <BreakingNewsArrow />}
      </BreakingNewsContainer>
    </BreakingNewsWrapper>
  );
};

export default BreakingNews;

BreakingNews.propTypes = {
  /**
    Headline displayed in Breaking News banner
  */
  headline: PropTypes.string,
  /**
    URL of article used and determines if the banner should be set as a link or standard div (OPTIONAL)
  */
  url: PropTypes.string,
};

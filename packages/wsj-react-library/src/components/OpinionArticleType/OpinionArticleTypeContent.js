import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ContentWrapper = styled.div`
  a:link,
  a:visited {
    color: var(--color-coal);
    text-decoration: none;
  }

  p {
    font-size: var(--typography-summary-font-size-m);
    font-family: var(--font-font-stack-retina);
    color: #666;
    font-weight: 300;
    line-height: 22px;
    margin-top: 8px;
  }

  p:last-of-type {
    margin-bottom: 17px;
  }

  border-bottom: 1px solid #ebebeb;
`;

const Title = styled.div`
  margin-top: 20px;
  ${({ hasImage }) =>
    hasImage &&
    `
      height: 40px;
      line-height: 40px;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      justify-content: start;
    `}

  img {
    border: 0;
    display: block;
    width: 40px;
    height: 40px;
    margin-right: 10px;
    border-radius: 100%;
  }
`;

const Button = styled.button`
  font-family: var(--font-font-stack-retina);
  color: var(--color-coal);
  border: none;
  font-size: 16px;
  margin-bottom: 12px;
  background: none;
  padding: 0;
  cursor: pointer;

  :focus {
    outline: none;
  }
`;

const Header = styled.h5`
  margin: 0;
  font-size: 24px;
  font-weight: 400;
  font-family: var(--font-font-stack-retina-narrow);
`;

const DescriptionWrapper = styled.div`
  overflow: hidden;
`;

const Description = styled.div`
  ${({ isTruncated }) =>
    isTruncated &&
    `
    position: relative;
    max-height: 123px;
    overflow: hidden;

    :before {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: linear-gradient(
        0,
        rgba(255, 255, 255, 1),
        rgba(255, 255, 255, 0) 50%
      );
    }
  `}
`;

const HTMLContent = styled.div`
  font-size: var(--typography-summary-font-size-m);
  font-family: var(--font-font-stack-retina);
  color: #666;
  font-weight: 300;
  line-height: 22px;
  margin-top: 8px;
  margin-bottom: 17px;
`;

const OpinionArticleTypeContent = ({ link, header, description, image }) => {
  if (!description) {
    return null;
  }

  const isDescriptionTruncated = description.length > 256;

  const [isShowMoreContent, setIsShowMoreContent] = useState(isDescriptionTruncated);

  return (
    <ContentWrapper>
      <Title hasImage={!!image}>
        {image && (
          <a href={link}>
            <img src={image} alt={header} />
          </a>
        )}
        <Header>
          <a href={link}>{header}</a>
        </Header>
      </Title>
      <DescriptionWrapper>
        <Description isTruncated={isShowMoreContent} data-testid="opinion-article-description">
          <HTMLContent dangerouslySetInnerHTML={{ __html: description }} />
        </Description>
        {isDescriptionTruncated && (
          <Button data-section="description" onClick={() => setIsShowMoreContent(!isShowMoreContent)}>
            {isShowMoreContent ? '+ Show More' : '- Show Less'}
          </Button>
        )}
      </DescriptionWrapper>
    </ContentWrapper>
  );
};

OpinionArticleTypeContent.propTypes = {
  link: PropTypes.string,
  header: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};

OpinionArticleTypeContent.defaultProps = {
  link: '',
  header: '',
  description: null,
  image: null,
};

export default OpinionArticleTypeContent;

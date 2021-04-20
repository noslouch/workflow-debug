import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import OpinionArticleTypeContent from './OpinionArticleTypeContent';

const ExplainerTitle = styled.h4`
  font-weight: 400;
  border-top: 1px solid var(--color-coal);
  padding-top: 10px;
  font-family: var(--font-font-stack-retina);
  font-size: var(--typography-headline-font-size-xxs);
  margin-bottom: 5px;
  line-height: 22px;
`;

const OpinionArticleTypeExplainer = ({
  articleData: {
    attributes: { authors, type_display_name },
    type,
  },
  articleDataType: {
    parameters: { description },
    seoName,
  },
  authorData: { biography, seoname: authorSeoName, hedcutimage },
}) => {
  if (!description) {
    return null;
  }

  const authorName = authors?.[0].text || '';
  const label = type_display_name || type;
  const typeLink = `/news/types/${seoName}`;
  const bioLink = `/news/author/${authorSeoName}`;

  return (
    <div>
      <ExplainerTitle>About this article</ExplainerTitle>
      <OpinionArticleTypeContent
        link={typeLink}
        header={label}
        description={description}
      />
      {biography && (
        <OpinionArticleTypeContent
          link={bioLink}
          header={authorName}
          description={biography}
          image={hedcutimage}
        />
      )}
    </div>
  );
};

OpinionArticleTypeExplainer.propTypes = {
  articleData: PropTypes.shape({
    attributes: PropTypes.shape({
      authors: PropTypes.arrayOf(PropTypes.shape({ text: PropTypes.string })),
      type_display_name: PropTypes.string,
    }),
    type: PropTypes.string,
  }),
  articleDataType: PropTypes.shape({
    seoName: PropTypes.string,
    parameters: PropTypes.shape({ description: PropTypes.string }),
  }),
  authorData: PropTypes.shape({
    seoname: PropTypes.string,
    biography: PropTypes.string,
    hedcutimage: PropTypes.string,
  }),
};

OpinionArticleTypeExplainer.defaultProps = {
  articleData: {
    attributes: { authors: [], type_display_name: null },
    type: '',
  },
  articleDataType: { seoName: '', parameters: { description: null } },
  authorData: {
    seoname: '',
    biography: '',
    hedcutimage: null,
  },
};

export default OpinionArticleTypeExplainer;

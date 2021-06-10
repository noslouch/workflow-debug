import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledPullquote = styled.blockquote`
  color: var(--color-coal);
  margin: var(--spacing-spacer-32) 0 var(--spacing-spacer-24);
`;

const StyledContent = styled.p`
  font-size: var(--typography-headline-font-size-m);
  font-weight: var(--typography-headline-standard-m-font-weight);
  font-family: var(--font-family-escrow-condensed);
  line-height: var(--typography-headline-font-line-height-l);
  margin: 0 0 var(--spacing-spacer-12);
`;

const StyledAuthor = styled.small`
  font-size: var(--typography-body-font-size-s);
  font-weight: var(--typography-caption-standard-s-font-weight);
  font-family: var(--typography-caption-standard-s-font-family);
`;

const Pullquote = ({ content, author }) => {
  // checks if content has outermost quote marks, if so, strip them and pass curly quotes
  // eslint-disable-next-line quotes
  const quoteMarks = ['"', "'", '“', '”', '‘', '’'];
  const renderQuotes =
    quoteMarks.includes(content[0]) &&
    quoteMarks.includes(content[content.length - 1]);
  const text = renderQuotes ? `“${content.slice(1, -1)}”` : content;

  return (
    <StyledPullquote>
      <StyledContent>{text}</StyledContent>
      {author && <StyledAuthor>— {author}</StyledAuthor>}
    </StyledPullquote>
  );
};

Pullquote.propTypes = {
  content: PropTypes.string.isRequired,
  author: PropTypes.string,
};

Pullquote.defaultProps = {
  author: undefined,
};

export default Pullquote;

export const CapiPullquote = ({ data }) => {
  const {
    content: [
      {
        content: [{ text: paragraphObjectContentText } = {}] = [],
        text: paragraphObjectText,
      },
      {
        content: [{ text: taglineObjectContentText } = {}] = [],
        text: taglineObjectText,
      },
    ],
  } = data || {};
  if (!paragraphObjectContentText && !paragraphObjectText) return null;
  return (
    <Pullquote
      content={paragraphObjectContentText || paragraphObjectText}
      author={taglineObjectContentText || taglineObjectText}
    />
  );
};

CapiPullquote.propTypes = {
  data: PropTypes.shape({
    content: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.arrayOf(
          PropTypes.shape({
            text: PropTypes.string,
          })
        ),
        text: PropTypes.string,
      })
    ),
  }).isRequired,
};

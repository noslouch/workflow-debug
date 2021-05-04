import styled from 'styled-components';

const Paragraph = styled.p`
  color: var(--article-text-color-primary);
  font-family: var(--article-font-family);
  font-size: calc(1rem * var(--article-text-size-scale)); // 17px
  font-weight: var(--article-font-weight);
  line-height: 1.6;
  margin: 0 0 1em 0;
  word-wrap: break-word;

  ${(props) =>
    props.hasDropCap &&
    `
    &:first-letter {
      float: left;
      font-family: var(--font-font-stack-escrow-condensed);
      font-size: 5.2em;
      font-weight: var(--font-weight-bold);
      line-height: .92em;
      margin-right: .1em;
      text-transform: uppercase;
    }
  `}
`;

export default Paragraph;

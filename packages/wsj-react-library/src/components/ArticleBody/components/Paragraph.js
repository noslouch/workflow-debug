import styled from 'styled-components';

// TODO: both p font sizes and drop cap font sizes will need to account for text size changes eventually
const Paragraph = styled.p`
  color: var(--color-coal);
  font-family: var(--typography-body-serif-m-font-family);
  font-size: var(--typography-body-serif-m-font-size);
  font-weight: var(--typography-body-serif-m-font-weight);
  line-height: var(--typography-body-serif-m-line-height);
  margin: 0 0 16px 0;
  word-wrap: break-word;

  ${(props) =>
    props.hasDropCap &&
    `
    &:first-letter {
      float: left;
      font-family: var(--font-family-escrow-condensed);
      font-size: 5.2em;
      font-weight: var(--font-weight-bold);
      line-height: .92em;
      margin-right: .1em;
      text-transform: uppercase;
    }
  `}
`;

export default Paragraph;

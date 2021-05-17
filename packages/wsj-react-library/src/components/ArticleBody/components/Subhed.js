import styled from 'styled-components';

const Subhed = styled.h6`
  color: var(--article-text-color-primary);
  font-family: var(--article-subhed-font-family);
  font-size: calc(
    (22 / var(--article-base-font-size)) * var(--article-text-size-scale) * 1rem
  ); // 22px
  font-weight: var(--font-weight-bold);
  line-height: calc(26 / 22);
  margin: 24px 0 16px 0;
`;

export default Subhed;

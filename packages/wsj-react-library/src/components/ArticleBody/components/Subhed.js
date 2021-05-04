import styled from 'styled-components';

const Subhed = styled.h6`
  color: var(--article-text-color-primary);
  font-family: var(--article-subhed-font-family);
  font-size: calc((22 / 17) * var(--article-text-size-scale) * 1rem); // 22px
  font-weight: var(--font-weight-bold);
  line-height: 1.2;
  margin: 24px 0 16px 0;
`;

export default Subhed;

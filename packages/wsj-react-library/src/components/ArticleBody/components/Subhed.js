import styled from 'styled-components';
import fontSize from '../../../helpers/fonts/articleFontSize';

const Subhed = styled.h6`
  color: var(--article-text-color-primary);
  font-family: var(--article-subhed-font-family);
  font-size: ${fontSize(22)};
  font-weight: var(--font-weight-bold);
  line-height: calc(26 / 22);
  margin: 24px 0 16px 0;
`;

export default Subhed;

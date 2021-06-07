import styled from 'styled-components';

import fontSize from '../../helpers/fonts/articleFontSize';

const Credit = styled.span`
  display: block;
  font-size: ${fontSize(14)};
  line-height: calc(20 / 14);
  text-transform: uppercase;
`;

export default Credit;

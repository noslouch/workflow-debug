import styled from 'styled-components';

import fontSize from '../../helpers/fonts/articleFontSize';

const Caption = styled.span`
  display: block;
  font-size: ${fontSize(14)};
  line-height: calc(20 / 14);
  margin-bottom: 4px;
`;

export default Caption;

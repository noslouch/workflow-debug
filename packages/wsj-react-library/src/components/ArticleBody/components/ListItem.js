import styled from 'styled-components';
import fontSize from '../../../helpers/fonts/articleFontSize';

const ListItem = styled.li`
  color: var(--article-text-color-primary);
  font-family: var(--article-font-family);
  font-size: ${fontSize(17)};
  font-weight: var(--article-font-weight);
  line-height: calc(27 / 17);
  margin-bottom: 12px;
`;

export default ListItem;

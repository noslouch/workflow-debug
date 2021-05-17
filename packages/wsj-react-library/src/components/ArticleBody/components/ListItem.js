import styled from 'styled-components';

const ListItem = styled.li`
  color: var(--article-text-color-primary);
  font-family: var(--article-font-family);
  font-size: calc(1rem * var(--article-text-size-scale)); // 17px
  font-weight: var(--article-font-weight);
  line-height: calc(27 / 17);
  margin-bottom: 12px;
`;

export default ListItem;

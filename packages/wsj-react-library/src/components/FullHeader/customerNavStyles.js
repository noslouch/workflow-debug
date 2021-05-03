import styled from 'styled-components';

const NavWrapper = styled.div`
  display: flex;
  font-size: 12px;
  line-height: 12px;
  color: var(--color-nickel);
`;

const PromoBottom = styled.div`
  margin-top: 6px;
  clear: both;
  ${({ isScrolled }) => isScrolled && 'display: none;'}

  & img {
    margin-left: auto;
  }
`;

export { NavWrapper, PromoBottom };

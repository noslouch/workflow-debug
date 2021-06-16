import styled, { css } from 'styled-components';

const FooterWrapper = styled.div`
  & * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  position: relative;
  overflow: hidden;
  height: 230px;
  width: 100%;

  ${(props) => {
    switch (props.breakpoint) {
      case 'xs':
        return css`
          height: 18em;
          max-width: 639px;
        `;
      case 'sm':
        return css`
          height: 215px;
          max-width: 969px;
        `;
      case 'md':
        return css`
          height: 200px;
          max-width: 1299px;
        `;
      case 'lg':
        return css``;
      default:
        return css``;
    }
  }}
`;

export default FooterWrapper;

import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

export default function Footer({ children = [], breakpoint = '' }) {
  return (
    <Wrapper breakpoint={breakpoint} role="contentinfo">
      <Reset breakpoint={breakpoint}>{children}</Reset>
    </Wrapper>
  );
}

Footer.propTypes = {
  breakpoint: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Footer.defaultProps = {
  breakpoint: 'lg',
  children: [],
};

const Wrapper = styled.div`
  background: #1a2737;
  position: absolute;
  left: 0;
  right: 0;
  transform: skewY(-3deg);
  transform-origin: right;

  ${(props) => {
    switch (props.breakpoint) {
      case 'xs':
        return css`
          min-height: 280px;
          top: 80px;
        `;
      case 'sm':
        return css`
          min-height: 150px;
          top: 70px;
        `;
      case 'md':
        return css`
          min-height: 170px;
          top: 53px;
        `;
      case 'lg':
        return css`
          min-height: 250px;
          top: 40px;
        `;
      default:
        return css``;
    }
  }}
`;

const Reset = styled.div`
  transform: skewY(3deg);
  transform-origin: left;
  display: flex;
  flex-flow: ${(props) => (props.breakpoint === 'xs' ? 'column' : 'row')};
  align-items: flex-start;
`;

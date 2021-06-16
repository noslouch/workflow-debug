import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

export default function Component(props) {
  const { breakpoint = '', txt = '' } = props;

  return <Wrapper breakpoint={breakpoint}>{txt}</Wrapper>;
}

Component.propTypes = {
  breakpoint: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  txt: PropTypes.string,
};

Component.defaultProps = {
  breakpoint: 'lg',
  txt: '',
};

const Wrapper = styled.div`
  ${(props) => {
    switch (props.breakpoint) {
      case 'xs':
        return css`
          font-weight: bold;
        `;
      case 'sm':
        return css``;
      case 'md':
        return css``;
      case 'lg':
        return css``;
      default:
        return css``;
    }
  }}
`;

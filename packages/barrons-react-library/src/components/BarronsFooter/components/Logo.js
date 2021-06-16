import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import grayBarronsLogo from '../../../assets/svg/logos/gray-barrons-logo.svg';

export default function Logo({ breakpoint = '', tag = 'div', href = '/' }) {
  return (
    <Wrapper as={tag} breakpoint={breakpoint}>
      <Link href={href}>Barron&apos;s</Link>
    </Wrapper>
  );
}

Logo.propTypes = {
  breakpoint: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  tag: PropTypes.string,
  href: PropTypes.string,
};

Logo.defaultProps = {
  breakpoint: 'lg',
  tag: 'div',
  href: '/',
};

const Wrapper = styled.div`
  width: 138px;
  height: 29px;
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
  ${(props) => {
    switch (props.breakpoint) {
      case 'xs':
        return css`
          margin: -9px 20px 0 10px;
        `;
      case 'sm':
        return css`
          margin: 55px 20px 0 20px;
        `;
      case 'md':
        return css`
          margin: 33px 20px 0 20px;
        `;
      case 'lg':
        return css`
          margin: 63px 20px 0 20px;

          @media screen and (min-width: 1700px) {
            margin: 22px 20px 0 20px;
          }
        `;
      default:
        return css`
          margin: 63px 20px 0 20px;
        `;
    }
  }}
`;

const Link = styled.a`
  width: 108px;
  height: 22px;
  background-image: url('${grayBarronsLogo}');
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  text-indent: 100%;
  white-space: nowrap;
  overflow: hidden;
  margin-right: 20px;
`;

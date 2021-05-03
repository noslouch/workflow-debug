import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useUserContext } from '../../context/user-context';

const MainWrapper = styled.div`
  height: 50px;
  position: absolute;
  right: 10px;
  top: 14px;
  ${({ isSlim }) => isSlim && 'top: 5px;'}
`;

function CustomerNav({ isSlim, children }) {
  const { isLoggedIn } = useUserContext();

  return (
    <MainWrapper isSlim={isSlim}>
      {typeof children === 'function'
        ? children({ isLoggedIn, isSlim })
        : children}
    </MainWrapper>
  );
}

CustomerNav.propTypes = {
  isSlim: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

CustomerNav.defaultProps = {
  isSlim: false,
  children: null,
};

export default CustomerNav;

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import NavItem from './NavItem';

const NavItems = styled.ul`
  margin: auto;
  width: 1000px;
  padding-left: 40px;
`;

const Nav = styled.nav`
  width: 100%;
  position: relative;
  height: 33px;
  z-index: 40;
  line-height: 24px;

  @media only screen and (min-width: 980px) and (max-width: 1280px) {
    width: 980px;
  }
`;

function HeaderNav({ navItems = [], section }) {
  return (
    <Nav aria-label="Primary">
      <NavItems>
        {navItems.map(({ categories, label, url, id }) => (
          <NavItem
            aria-label="Primary Navigation"
            role="menubar"
            key={id}
            id={id}
            categories={categories}
            url={url}
            section={section}
          >
            {label}
          </NavItem>
        ))}
      </NavItems>
    </Nav>
  );
}

HeaderNav.propTypes = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      url: PropTypes.string,
      label: PropTypes.string,
      categories: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          subsections: PropTypes.arrayOf(
            PropTypes.shape({
              category: { type: 'string' },
              url: { type: 'string', format: 'uri' },
              label: { type: 'string' },
            })
          ),
        })
      ),
    })
  ),
  section: PropTypes.string,
};

HeaderNav.defaultProps = {
  navItems: [],
  section: '',
};

export default HeaderNav;

import React from 'react';
import PropTypes from 'prop-types';
import defaultColumnLinks from './columnLinks.json';
import styled from 'styled-components';

const ColumnLinksWrapper = styled.div`
  font-family: var(--font-family-retina);

  a:link,
  a:active,
  a:visited {
    color: inherit;
    text-decoration: none;
    outline: none;
  }

  a:focus {
    outline: #0080c3 solid 3px;
    outline-offset: 1px;
  }

  list-style: none;
  display: flex;
  padding: 0;
  width: 100%;
  margin-left: 10px;
  margin-right: 10px;
  clear: both;
  box-sizing: border-box;
`;

const ColumnName = styled.p`
  padding-left: 16px;
  font-size: 13px;
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 12px;
`;

const LinksMenu = styled.ul`
  margin: 0;
  list-style: none;
  padding-left: 16px;
`;

const LinkItem = styled.li`
  margin-bottom: 12px;
  line-height: 12px;

  :last-child {
    margin-bottom: 0;
  }

  a {
    font-size: 12px;
  }
`;

const LinkCol = styled.div`
  flex-grow: 1;
  text-align: left;
  width: 19.8%;
  border-left: 1px solid var(--color-silver);

  :first-child {
    border: none;
  }
`;

function columnNameId(name) {
  return name && name.split(' ').join('-').toLowerCase();
}

function FooterColumnLinks({ columnLinks: links = defaultColumnLinks }) {
  return (
    <ColumnLinksWrapper aria-label="Column Links">
      {links.map((column) => (
        <LinkCol key={column}>
          <ColumnName
            id={`footer-${columnNameId(column.name)}`}
            aria-label="Column Name"
            aria-hidden="true"
          >
            {column.name}
          </ColumnName>
          <LinksMenu aria-labelledby={`footer-${columnNameId(column.name)}`}>
            {column.items &&
              column.items.map((item) => (
                <LinkItem key={item}>
                  <a href={item.url} rel={item.nofollow ? 'nofollow' : null}>
                    {item.label}
                  </a>
                </LinkItem>
              ))}
          </LinksMenu>
        </LinkCol>
      ))}
    </ColumnLinksWrapper>
  );
}

FooterColumnLinks.defaultProps = {
  isLoggedIn: false,
};

FooterColumnLinks.propTypes = {
  columnLinks: PropTypes.array,
  isLoggedIn: PropTypes.bool,
  socialLinks: PropTypes.array,
};

export default FooterColumnLinks;

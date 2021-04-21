import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const BreadcrumbsWrapper = styled.nav`
  font-size: var(--typography-summary-font-size-s);
  font-family: var(--font-font-stack-retina-narrow);
  font-weight: var(--typography-summary-standard-s-font-weight);
  text-transform: uppercase;
`;

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const Flashline = styled.li`
  display: inline;
  color: ${({ isRecent }) =>
    isRecent ? 'var(--color-red)' : 'var(--color-nickel)'};

  ${({ isExclusive }) =>
    isExclusive &&
    `
    :before {
      content: '\\25C6';
      margin: 0 4px;
      line-height: 1;
    }
  `}
`;

const Breadcrumb = styled.li`
  display: inline;
  color: var(--color-blue);
  ${({ divider }) =>
    divider &&
    ` 
  :before {
    color: var(--color-nickel);
    content: '|';
    margin: 0 4px;
  }
`}
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  :hover {
    text-decoration: underline;
  }
`;

const generateSchema = (breadcrumbs) => {
  const itemList = [];
  breadcrumbs.forEach((item, index) => {
    itemList.push({
      '@type': 'ListItem',
      position: index + 1,
      item: item.url,
      name: item.label,
    });
  });
  const schemaObj = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: itemList,
  };
  return JSON.stringify(schemaObj);
};

const Breadcrumbs = ({ breadcrumbs, flashline, isExclusive, isRecent }) => {
  const schema = generateSchema(breadcrumbs);
  return (
    <BreadcrumbsWrapper>
      <script type="application/ld+json">{schema}</script>
      <List>
        {flashline && (
          <Flashline isRecent={isRecent} isExclusive={isExclusive}>
            {flashline}
          </Flashline>
        )}
        {breadcrumbs.map((breadcrumb, index) => {
          // display divider if it is not the first breadcrumb,
          // if there is more than one breadcrumb, or if there is a flashline
          const divider = (index > 0 && breadcrumbs.length > 1) || flashline;
          return (
            <Breadcrumb divider={divider} key={breadcrumb.label}>
              <Link href={breadcrumb.url}>{breadcrumb.label}</Link>
            </Breadcrumb>
          );
        })}
      </List>
    </BreadcrumbsWrapper>
  );
};

Breadcrumbs.propTypes = {
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      url: PropTypes.string,
    })
  ).isRequired,
  flashline: PropTypes.string,
  isExclusive: PropTypes.bool,
  isRecent: PropTypes.bool,
};

Breadcrumbs.defaultProps = {
  flashline: '',
  isExclusive: true,
  isRecent: true,
};

export default Breadcrumbs;

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const HatCol = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 0;
  font-size: 12px;
  text-transform: none;
  display: inline-block;
  vertical-align: top;

  :last-child {
    margin-left: 100px;
  }
`;

const HatProduct = styled.li`
  width: 450px;
  height: 310px;
  line-height: 28px;
  font-family: var(--font-font-stack-retina);
  list-style-type: none;

  @media only screen and (min-width: 980px) and (max-width: 1299px) {
    display: inline-block;
  }

  a:active,
  a:link,
  a:visited {
    text-decoration: none;
    color: inherit;
  }
`;

const HatProductTitle = styled.div`
  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
  font-family: inherit;
`;

const HatProducts = ({ columns, data, title }) => {
  const createAllColumns = () => {
    // makes <li>s based on arrays in columns prop
    const createColumnList = (col) => {
      return data.map((link, j) => {
        const aprops = {
          href: link.url,
        };

        if (j >= columns[col][0] && j <= columns[col][1]) {
          if (link?.nofollow.toLowerCase()) {
            aprops.rel = 'nofollow';
          }
          const key = btoa(link.url);
          return (
            <li key={key} role="none">
              <a role="menuitem" {...aprops}>
                {link.title}
              </a>
            </li>
          );
        }
        return null;
      });
    };

    // makes <uls> based on how many keys in columns prop
    const createColumn = (col) => {
      const key = btoa(`${title} ${col}`);
      return <HatCol key={key}>{createColumnList(col)}</HatCol>;
    };

    // return array of columns
    return Object.keys(columns).map((col) => {
      return createColumn(col);
    });
  };

  const allColumns = createAllColumns();

  return (
    <HatProduct role="none">
      <HatProductTitle>{title}</HatProductTitle>
      {allColumns}
    </HatProduct>
  );
};

HatProducts.propTypes = {
  columns: PropTypes.shape({
    col1: PropTypes.arrayOf(PropTypes.number),
    col2: PropTypes.arrayOf(PropTypes.number),
  }),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.url,
      nofollow: PropTypes.string,
    })
  ),
  title: PropTypes.string,
};

HatProducts.defaultProps = {
  data: [],
  title: 'Dow Jones',
  columns: {},
};

export default HatProducts;

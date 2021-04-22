import React from 'react';
import PropTypes from 'prop-types';
import defaultProductLinks from './productLinks.json';
import styled from 'styled-components';

const ProductLinksSector = styled.div`
  font-family: var(--font-family-retina);

  a:link,
  a:active,
  a:visited {
    color: inherit;
    text-decoration: none;
    outline: none;
  }

  background-color: #e9e9e9;
  font-size: 12px;
`;

const ProductsWrapper = styled.div`
  padding: 20px 0 10px;
  width: 905px;
  margin: auto;
  text-align: center;
`;

const ProductsTitle = styled.p`
  display: inline;
  font-size: 12px;
  font-weight: 500;
  margin-right: 35px;
`;

const ProductsLinks = styled.ul`
  display: inline;
  padding: 0;
  list-style: none;
`;

const ProductLink = styled.li`
  display: inline-block;
  border-right: 1px solid var(--color-silver);
  margin-right: 10px;
  padding-right: 10px;
  margin-bottom: 10px;

  ${({ noBorder }) => noBorder && `border: none;`}
`;

function ProductLinks({
  productLinks = defaultProductLinks,
  i8nText: { djProducts },
}) {
  return (
    <ProductLinksSector>
      <ProductsWrapper>
        <ProductsTitle id="footer-products-title">{djProducts}</ProductsTitle>
        <ProductsLinks aria-labelledby="footer-products-title">
          {productLinks.map(({ noborder, label, url }, i) => (
            <ProductLink noBorder={noborder} key={i}>
              <a href={url}>{label}</a>
            </ProductLink>
          ))}
        </ProductsLinks>
      </ProductsWrapper>
    </ProductLinksSector>
  );
}

ProductLinks.defaultProps = {
  i8nText: {
    djProducts: 'Dow Jones Products',
  },
};

ProductLinks.propTypes = {
  productLinks: PropTypes.array,
  i8nText: PropTypes.object,
};

export default ProductLinks;

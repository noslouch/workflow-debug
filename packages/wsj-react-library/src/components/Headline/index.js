import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledHeadline = styled.h1`
  margin: 0px;
  ${({ type, size }) => ` 
    font-size: var(--typography-headline-${type}-${size}-font-size);
    line-height: var(--typography-headline-${type}-${size}-line-height);
    font-family: var(--typography-headline-${type}-${size}-font-family);
    font-weight: var(--typography-headline-${type}-${size}-font-weight);
    text-transform: var(--typography-headline-${type}-${size}-text-transform);
    color: var(--headline-font-color);
  `}
  ${({ type }) =>
    type === 'opinion' &&
    `
    font-style: var(--font-style-italic);
  `}
  a {
    color: inherit;
    text-decoration: none;
    &: hover {
      color: var(--headline-link-hover-color);
    }
  }
`;

const Headline = (props) => {
  let componentEl;
  switch (props.size) {
    case 'xxl':
      componentEl = 'h1';
      break;
    case 'xl':
      componentEl = 'h2';
      break;
    case 'l':
      componentEl = 'h3';
      break;
    case 'm':
      componentEl = 'h4';
      break;
    case 's':
      componentEl = 'h5';
      break;
    case 'xs':
      componentEl = 'h6';
      break;
    case 'xxs':
      componentEl = 'h6';
      break;
    default:
      componentEl = 'h1';
  }
  return <StyledHeadline as={componentEl} {...props} />;
};

Headline.propTypes = {
  size: PropTypes.oneOf(['xxl', 'xl', 'l', 'm', 's', 'xs', 'xxs']),
  type: PropTypes.oneOf(['standard', 'opinion', 'features', 'magazine']),
};

Headline.defaultProps = {
  size: 'xxl',
  type: 'standard',
};

export default Headline;

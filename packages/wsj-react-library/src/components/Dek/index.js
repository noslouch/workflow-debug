import styled from 'styled-components';
import PropTypes from 'prop-types';

const Dek = styled.h2`
  margin: 0px;

  ${({ size }) => `
    font-size: var(--typography-subheading-standard-${size}-font-size);
    line-height: var(--typography-subheading-standard-${size}-line-height);
    font-family: var(--typography-subheading-standard-${size}-font-family);
    font-weight: var(--typography-subheading-standard-${size}-font-weight);
    color: var(--color-nickel);
  `}
`;

Dek.propTypes = {
  size: PropTypes.oneOf(['m', 's']),
};

Dek.defaultProps = {
  size: 'm',
};

export default Dek;

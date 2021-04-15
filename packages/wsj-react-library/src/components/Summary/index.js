import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledSummary = styled.p`
  margin: 0px;

  ${({ bullet, size }) => `
    font-size: var(--typography-summary-font-size-${size});
    line-height: var(--typography-summary-line-height-${size});
    font-family: var(--typography-summary-standard-${size}-font-family);
    color: ${bullet && size === 's' ? `var(--summary-bullet-small-font-color)` : `var(--summary-font-color)`};
  `}
`;

const Summary = (props) => {
  return <StyledSummary {...props} />;
};

Summary.propTypes = {
  size: PropTypes.oneOf(['m', 's']),
  bullet: PropTypes.bool,
};

Summary.defaultProps = {
  size: 'm',
  bullet: false,
};

export default Summary;

/* global window */
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ReactComponent as PrintStrokeMedium } from '../../assets/icons/Standard/medium/print-stroke-medium.svg';

const StyledPrintButton = styled.button`
  cursor: pointer;
  appearance: none;
  border: none;
  background: none;
  display: inline-flex;
  align-items: center;
  font-family: var(--font-font-stack-retina);
  font-weight: var(--font-weight-regular);
  font-size: 12px;
  color: var(--color-nickel);
  text-transform: var(--font-case-uppercase);

  :focus-visible {
    outline: var(--color-blue) solid 3px;
  }
  :focus:not(:focus-visible) {
    outline: none;
  }
`;

const PrintStrokeMediumIcon = styled(PrintStrokeMedium)`
  use {
    fill: var(--color-nickel);
  }
`;

const PrintButtonSpan = styled.span`
  padding-left: 5px;
`;

const SVGWrapper = styled.div`
  width: 24px;
  height: 24px;
`;

const PrintButton = ({ label, printURL }) => {
  const renderPrint = (url) => {
    if (url?.length > 0) {
      const newWindow = window.open(url);
      newWindow.print();
    } else {
      window.print();
    }
  };

  return (
    <StyledPrintButton
      onClick={() => renderPrint(printURL)}
      aria-haspopup="dialog"
    >
      <SVGWrapper>
        <PrintStrokeMediumIcon />
      </SVGWrapper>
      <PrintButtonSpan>{label || 'print'}</PrintButtonSpan>
    </StyledPrintButton>
  );
};

export default PrintButton;

PrintButton.propTypes = {
  /** 
    URL for pdf documents, such as downloadable Puzzle pdfs (OPTIONAL)
  */
  printURL: PropTypes.string,
  /**
    Alternate Text For Print Button. Default is "PRINT" (OPTIONAL) 
   */
  label: PropTypes.string,
};

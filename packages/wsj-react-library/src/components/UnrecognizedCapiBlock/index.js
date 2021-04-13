import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledUnrecognizedCapiBlock = styled.details`
  width: 100%;
  height: 100px;
  padding: 10px;
  background-color: #bbb;
`;

const UnrecognizedCapiBlock = (props) => (
  <StyledUnrecognizedCapiBlock>
    <summary>{props.type}</summary>
    {props.children}
  </StyledUnrecognizedCapiBlock>
);

UnrecognizedCapiBlock.propTypes = {
  type: PropTypes.string,
};

UnrecognizedCapiBlock.defaultProps = {
  type: 'Unknown',
};

export default UnrecognizedCapiBlock;

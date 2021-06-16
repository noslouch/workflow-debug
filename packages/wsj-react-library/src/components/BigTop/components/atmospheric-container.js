import styled from 'styled-components';

const AtmosphericContainer = styled.div`
  background-size: 1px;
  margin-bottom: 5px;

  aspect-ratio: 16 / 9;

  background-size: cover;

  ${({ thumbnail }) => `background-image: url(${thumbnail});`}

  video {
    display: block;
  }
`;

export default AtmosphericContainer;

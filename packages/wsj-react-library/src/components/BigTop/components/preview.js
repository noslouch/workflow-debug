import styled from 'styled-components';

const PreviewImage = styled.img`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  filter: blur(15px);
  transform: scale(1.1px);
  pointer-events: none;

  transition: opacity 200ms;

  opacity: ${({ show }) => !show && '0'};
`;

export default PreviewImage;

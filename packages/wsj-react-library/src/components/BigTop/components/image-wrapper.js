import styled from 'styled-components';

const ImageWrapper = styled.div.attrs({
  'data-block': 'big-top',
})`
  ${({ noMargin }) => (!noMargin ? 'margin-bottom: 5px;' : null)}
`;

export default ImageWrapper;

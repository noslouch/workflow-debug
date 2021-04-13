import styled from 'styled-components';
import Paragraph from './Paragraph';

const Tagline = styled(Paragraph)`
  font-style: italic;

  &:before {
    content: '—';
  }
`;

export default Tagline;

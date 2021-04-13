import styled from 'styled-components';
import renderer from './renderer';

const Container = styled.section`
  width: 100%;
`;

const ArticleBody = ({ data = [], isAmp = false, renderBlock }) => (
  <Container>{renderer(data, { isAmp, renderBlock })}</Container>
);

export default ArticleBody;

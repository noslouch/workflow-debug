import styled from 'styled-components';
import PropTypes from 'prop-types';
import renderer from './renderer';

const Container = styled.section`
  width: 100%;
`;

const ArticleBody = ({ data, isAmp, renderBlock }) => (
  <Container>{renderer(data, { isAmp, renderBlock })}</Container>
);

ArticleBody.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape),
  isAmp: PropTypes.bool,
  renderBlock: PropTypes.func,
};

ArticleBody.defaultProps = {
  data: [],
  isAmp: false,
  renderBlock: undefined,
};

export default ArticleBody;

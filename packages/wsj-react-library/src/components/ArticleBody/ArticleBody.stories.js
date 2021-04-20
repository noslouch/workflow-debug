import styled from 'styled-components';
import ArticleBody from './index';
import article from '../../../__mocks__/article.json';

const Container = styled.article`
  margin: 0 auto;
  width: 100%;

  @media (min-width: 640px) {
    width: 640px;
  }

  @media (min-width: 980px) {
    width: 560px;
  }

  @media (min-width: 1300px) {
    width: 720px;
  }
`;

export default {
  title: 'Article Body',
  component: ArticleBody,
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
};

export const KitchenSink = () => (
  <ArticleBody data={article.data.attributes.body} />
);

// TODO: Amp story. Need to figure out how to extract amp styles and inject amp scripts for specific story only.

export const WithOverride = () => (
  <ArticleBody
    data={article.data.attributes.body}
    renderBlock={({ type }, index) => {
      if (type === 'paragraph') return <p key={index}>Hello World!</p>;
    }}
  />
);

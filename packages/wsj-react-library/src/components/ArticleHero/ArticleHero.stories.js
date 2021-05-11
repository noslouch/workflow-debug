import styled from 'styled-components';
import ArticleHero from './index';
import imageMock from './__mocks__/image.json';
import videoMock from './__mocks__/video.json';

const Container = styled.article`
  margin: 0 auto;
  width: 100%;

  @media (min-width: 640px) {
    width: 640px;
  }

  @media (min-width: 980px) {
    margin-left: 180px;
    width: 560px;
  }

  @media (min-width: 1300px) {
    width: 720px;
  }
`;

export default {
  title: 'Article/Hero',
  component: ArticleHero,
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
};

export const Image = () => <ArticleHero data={imageMock} />;

export const Video = () => <ArticleHero data={videoMock} />;

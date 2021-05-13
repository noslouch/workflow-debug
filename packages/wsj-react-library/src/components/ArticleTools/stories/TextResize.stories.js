import TextResize from '../TextResize';
import ArticleBody from '../../ArticleBody';
import mockArticleBody from '../__mocks__/articleBody.json';

export default {
  title: 'Article/Tools/TextResize',
  component: TextResize,
};

export const Default = () => <TextResize />;

export const WithExample = () => (
  <>
    <TextResize />
    <ArticleBody data={mockArticleBody} />
  </>
);

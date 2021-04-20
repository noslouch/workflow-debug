import ArticleTimestamp from './index';
import article from '../../../__mocks__/article.json';

export default {
  title: 'Article Timestamp',
  component: ArticleTimestamp,
};

export const Published = () => (
  <ArticleTimestamp published={article.data.attributes.published_datetime} />
);

export const Updated = () => (
  <ArticleTimestamp
    published={article.data.attributes.published_datetime}
    updated={article.data.attributes.updated_datetime}
  />
);

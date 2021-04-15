import React from 'react';
import OpinionArticleType from '.';
import MockArticle from '../../../__mocks__/article.json';
import MockArticleType from '../../../__mocks__/articleType.json';
import MockAuthor from '../../../__mocks__/author.json';

const MockArticleData = MockArticle.data;

export default {
  title: 'WSJ/OpinionArticleType',
  component: OpinionArticleType,
};

const Template = (args) => <OpinionArticleType {...args} />;

export const Default = Template.bind({});
Default.args = {
  articleData: MockArticleData,
  articleDataType: MockArticleType,
  authorData: MockAuthor,
};

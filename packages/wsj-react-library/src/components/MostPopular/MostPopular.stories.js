import React from 'react';
import MostPopular from './index';
import mockCollection from './__mocks__/collection.json';

export default {
  title: 'Most Popular',
  component: MostPopular,
};

const Template = (args) => <MostPopular {...args} />;

export const MostPopularNews = Template.bind({});
MostPopularNews.args = {
  type: 'news',
  collection: mockCollection,
};

export const MostPopularOpinion = Template.bind({});
MostPopularOpinion.args = {
  type: 'opinion',
  collection: mockCollection,
};

export const RecommendedVideos = Template.bind({});
RecommendedVideos.args = {
  type: 'videos',
  collection: mockCollection,
};

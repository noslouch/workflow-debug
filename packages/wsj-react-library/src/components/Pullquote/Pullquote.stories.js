import React from 'react';
import Pullquote from './index';

export default {
  title: 'Pullquote',
  component: Pullquote,
};

const Template = (args) => <Pullquote {...args} />;

export const PullquoteAndAuthor = Template.bind({});
PullquoteAndAuthor.args = {
  content:
    '“In another 20 years, you’re not going to be wondering if you got a return. You’re wondering if there’s going to be a planet left for your great-grandchildren.”',
  author: 'Larry Cohen, CEO of Gates Ventures',
};

export const PlainPullQuote = Template.bind({});
PlainPullQuote.args = {
  content:
    'The thing about DNA tests is that they sometimes reveal more than you’d like to know.',
};

import React from 'react';
import ShareTools from './index';

export default {
  title: 'WSJ/ShareTools',
  component: ShareTools,
};

const Template = (args) => <ShareTools {...args} />;

export const Regular = Template.bind({});
Regular.args = {
  articleURL:
    'https://www.wsj.com/articles/former-braskem-ceo-pleads-guilty-to-operation-car-wash-charges-in-u-s-11618511611',
  author: 'Dylan Tokar',
  headline:
    'Former Braskem CEO Pleads Guilty to ‘Operation Car Wash’ Charges in U.S.',
  id: 'SB10519382422305624297404587404592362311740',
  source: 'NEWSPLUS,PRO,WSJ-PRO-WSJ.com',
  summary:
    'José Carlos Grubisich pleaded guilty to two counts of conspiring to violate U.S. antibribery law, which carry a possible sentence of 10 years',
  template: 'full',
  thumbnailURL: 'https://images.wsj.net/im-325652/D',
  userEmail: 'johndoe@wsj.com',
};

import React from 'react';
import Breadcrumbs from './index';

export default {
  title: 'Breadcrumbs',
  component: Breadcrumbs,
};

const Template = (args) => <Breadcrumbs {...args} />;

export const SingleBreadcrumb = Template.bind({});
SingleBreadcrumb.args = {
  breadcrumbs: [{ label: 'U.S.', url: 'https://www.wsj.com/news/us' }],
};

export const TwoBreadcrumbs = Template.bind({});
TwoBreadcrumbs.args = {
  breadcrumbs: [
    { label: 'Markets', url: 'https://www.wsj.com/news/markets' },
    {
      label: 'U.S. Markets',
      url: 'https://www.wsj.com/news/types/today-s-markets',
    },
  ],
};

export const MultipleBreadcrumbs = Template.bind({});
MultipleBreadcrumbs.args = {
  breadcrumbs: [
    { label: 'Life & Arts', url: 'https://www.wsj.com/news/life-arts' },
    { label: 'Ideas', url: 'https://www.wsj.com/news/life-arts/ideas' },
    {
      label: 'Jason Gay',
      url: 'https://www.wsj.com/news/types/jason-gay-in-review',
    },
  ],
};

export const BreadcrumbAndFlashline = Template.bind({});
BreadcrumbAndFlashline.args = {
  flashline: 'WSJ News Exclusive',
  breadcrumbs: [
    { label: 'Business', url: 'https://www.wsj.com/news/business' },
  ],
};

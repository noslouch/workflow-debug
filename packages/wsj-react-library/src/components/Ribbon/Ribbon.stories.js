import React from 'react';
import Ribbon from '.';
import RibbonData from './__mocks__/ribbon.js';

const { tabs } = RibbonData;

export default {
  title: 'Ribbon',
  component: Ribbon,
  parameters: {
    componentSubtitle: 'The ribbon component is found on some pages at the top, just underneath the header.',
  },
};

const Template = (args) => <Ribbon {...args} />;

export const Regular = Template.bind({});
Regular.args = {
  isOpinion: false,
  border: ['bottom'],
  modCode: 'hp_theme_coronavirus',
  sectionTitle: 'The Biden Administration',
  sectionSubHed: 'Resources',
  tabs,
  titleUrl: 'https://www.wsj.com/',
};

export const Opinion = Template.bind({});
Opinion.args = {
  isOpinion: true,
  border: ['bottom'],
  modCode: 'opinion-sf_theme_opinionmain-ribbon',
  sectionSubHed: 'Resources',
  sectionTitle: 'Opinion',
  tabs,
  titleUrl: 'https://www.wsj.com/',
};

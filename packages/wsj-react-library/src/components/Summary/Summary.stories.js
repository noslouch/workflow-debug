import React from 'react';
import Summary from './index';

export default {
  title: 'Summary',
  component: Summary,
};

const Template = (args) => <Summary {...args} />;

export const SummaryM = Template.bind({});
SummaryM.args = {
  children: 'Default Summary M',
};

export const SummaryMBullet = Template.bind({});
SummaryMBullet.args = {
  children: 'Summary M Bullet',
  bullet: true,
};

export const SummaryS = Template.bind({});
SummaryS.args = {
  children: 'Summary S',
  size: 's',
};

export const SummarySBullet = Template.bind({});
SummarySBullet.args = {
  children: 'Summary S Bullet',
  size: 's',
  bullet: true,
};

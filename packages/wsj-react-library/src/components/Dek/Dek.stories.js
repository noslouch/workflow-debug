import React from 'react';
import Dek from './index';

export default {
  title: 'Dek',
  component: Dek,
};

const Template = (args) => <Dek {...args} />;

export const DekM = Template.bind({});
DekM.args = {
  children: 'Dek M',
  size: 'm',
};

export const DekS = Template.bind({});
DekS.args = {
  children: 'Dek S',
  size: 's',
};

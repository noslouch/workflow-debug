import React from 'react';
import EditionPicker from '.';
import mockData from '../../../__mocks__/edition-picker.json';

export default {
  title: 'WSJ/EditionPicker',
  component: EditionPicker,
};

const Template = (args) => <EditionPicker {...args} />;

export const English = Template.bind({});
English.args = mockData['na,us'];

export const ChineseHans = Template.bind({});
ChineseHans.args = mockData['asia,cn'];

export const Japanese = Template.bind({});
Japanese.args = mockData['asia,jp'];

export const ChineseHant = Template.bind({});
ChineseHant.args = mockData['asia,cn_hant'];

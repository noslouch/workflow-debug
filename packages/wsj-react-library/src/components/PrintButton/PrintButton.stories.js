import React from 'react';
import PrintButton from './index';

export default {
  title: 'PrintButton',
  component: PrintButton,
};

const Template = (args) => <PrintButton {...args} />;

export const PrintButtonStandard = Template.bind({});

export const PrintButtonDownload = Template.bind({});

PrintButtonDownload.args = {
  label: 'download pdf',
};

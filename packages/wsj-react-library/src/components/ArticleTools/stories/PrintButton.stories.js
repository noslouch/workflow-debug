import React from 'react';
import PrintButton from '../PrintButton';

export default {
  title: 'Article/Tools/PrintButton',
  component: PrintButton,
};

const Template = (args) => <PrintButton {...args} />;

export const StandardPrintButton = Template.bind({});

export const DownloadablePDFPrintButton = Template.bind({});

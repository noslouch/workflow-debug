import React from 'react';
import PrintButton from './index';

export default {
  title: 'PrintButton',
  component: PrintButton,
};

const Template = (args) => <PrintButton {...args} />;

export const Standard = Template.bind({});

export const DownloadablePDF = Template.bind({});

DownloadablePDF.args = {
  label: 'download pdf',
  printURL:
    'https://s3.amazonaws.com/djcs-dev/public/blogs/puzzles/crossword/20210126/37655/crossword-20210126-37655.pdf',
};

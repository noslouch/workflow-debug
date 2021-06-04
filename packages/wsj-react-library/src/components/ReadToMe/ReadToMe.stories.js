import React from 'react';
import ReadToMe from '.';

export default {
  title: 'ReadToMe',
  component: ReadToMe,
};

const Template = (args) => <ReadToMe {...args} />;

export const Regular = Template.bind({});
Regular.args = {
  sbid: 'SB10519382422305624297404587402750456747794',
};

export const overWrittenTitle = Template.bind({});
overWrittenTitle.args = {
  sbid: 'SB10519382422305624297404587402750456747794',
  titleOverride: 'Listen to this article',
};

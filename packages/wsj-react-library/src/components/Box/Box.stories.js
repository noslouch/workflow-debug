import React from 'react';
import Box from '.';

export default {
  title: 'Box',
  component: Box,
  parameters: {
    componentSubtitle: 'In addition, you can pass any props that https://styled-system.com/table supports',
  },
};
const Template = (args) => (
  <Box {...args}>
    <div>sample</div>
    <div>box</div>
    <div>component</div>
  </Box>
);

export const Regular = Template.bind({});
Regular.args = {
  padding: '5px',
  border: '5px solid yellow',
  margin: '50px',
  color: 'white',
  backgroundColor: 'tomato',
};

export const WithFlexBox = Template.bind({});
WithFlexBox.args = {
  my: '5px',
  p: '5px',
  display: 'flex',
  justifyContent: 'space-between',
};

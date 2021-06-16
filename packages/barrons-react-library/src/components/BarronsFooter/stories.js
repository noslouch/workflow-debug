import React from 'react';
import path from 'path';
import Component from './index';
import props from './props';

// This default export determines where your story goes in the story list
const componentName = path.basename(__dirname);

export default {
  title: componentName,
  component: Component,
  argTypes: {
    breakpoint: {
      options: ['xs', 'sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
  },
};

const Template = (args) => <Component {...args} />;

export const ComponentStory = Template.bind({});

ComponentStory.args = {
  ...props,
  breakpoint: 'lg',
};

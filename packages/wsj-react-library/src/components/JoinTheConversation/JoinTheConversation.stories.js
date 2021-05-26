import React from 'react';
import JoinTheConversation from './index';
import itemsMock from '../../../__mocks__/joinTheConversationMock.json';

export default {
  title: 'JoinTheConversation',
  component: JoinTheConversation,
};

const Template = (args) => <JoinTheConversation {...args} />;

export const Default = Template.bind({});
Default.args = {
  items: itemsMock,
};

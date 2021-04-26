import React from 'react';
import FullHeader from '.';
import WSJNav from '../../../__mocks__/wsjNav';

import { UserProvider } from '../../context/user-context';

const {
  'na,us': { navData = {} },
} = WSJNav;

const user = { firstName: 'John', lastName: 'Boyd', status: 'user_logged_in' };

export default {
  title: 'FullHeader',
  component: FullHeader,
  decorators: [
    (Story) => (
      <UserProvider>
        <Story />
      </UserProvider>
    ),
  ],
};

const Template = (args) => <FullHeader {...args} />;

export const Regular = Template.bind({});
Regular.args = {
  navigation: navData,
};

export const WithSection = Template.bind({});
WithSection.args = {
  navigation: navData,
  section: 'U.S.',
  showSectionLogo: true,
};

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  navigation: navData,
};
LoggedIn.decorators = [
  (Story) => (
    <UserProvider user={user}>
      <Story />
    </UserProvider>
  ),
];

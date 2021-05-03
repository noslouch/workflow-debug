import React from 'react';
import FullHeader from '.';
import WSJNav from '../../../__mocks__/wsjNav';

import { UserProvider } from '../../context/user-context';

const {
  'na,us': { navData = [], customerNav = {}, homepages = [] },
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
  customerNav,
  homepages,
};

export const WithSection = Template.bind({});
WithSection.args = {
  navigation: navData,
  customerNav,
  homepages,
  section: 'U.S.',
  showSectionLogo: true,
};

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  navigation: navData,
  customerNav,
  homepages,
};
LoggedIn.decorators = [
  (Story) => (
    <UserProvider user={user}>
      <Story />
    </UserProvider>
  ),
];

export const RegularScrollable = Template.bind({});
RegularScrollable.args = {
  navigation: navData,
  customerNav,
  homepages,
};
RegularScrollable.decorators = [
  (Story) => (
    <UserProvider>
      <div style={{ height: '1500px' }}>
        <Story />
      </div>
    </UserProvider>
  ),
];

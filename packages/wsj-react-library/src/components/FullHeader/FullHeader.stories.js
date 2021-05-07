import React from 'react';
import FullHeader from './index';
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
  showSearchText: true,
  disableScroll: true,
};

export const China = Template.bind({});
China.args = {
  navigation: navData,
  customerNav,
  homepages,
  showSearchText: true,
  disableScroll: true,
  region: 'asia,cn',
};

export const WithSection = Template.bind({});
WithSection.args = {
  navigation: navData,
  customerNav,
  homepages,
  section: 'U.S.',
  showSectionLogo: true,
  showSearchText: true,
  disableScroll: true,
};

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  navigation: navData,
  customerNav,
  homepages,
  showSearchText: true,
  disableScroll: true,
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
  showSearchText: true,
};
RegularScrollable.parameters = { docs: { disable: true } };
RegularScrollable.decorators = [
  (Story) => (
    <UserProvider>
      <div style={{ height: '1500px' }}>
        <Story />
      </div>
    </UserProvider>
  ),
];

export const LoggedInScrollable = Template.bind({});
LoggedInScrollable.args = {
  navigation: navData,
  customerNav,
  homepages,
  showSearchText: true,
};
LoggedInScrollable.parameters = { docs: { disable: true } };
LoggedInScrollable.decorators = [
  (Story) => (
    <UserProvider user={user}>
      <div style={{ height: '1500px' }}>
        <Story />
      </div>
    </UserProvider>
  ),
];

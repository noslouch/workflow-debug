import React from 'react';
import FooterFull from '.';
import WSJNav from '../../../__mocks__/wsjNav';

export default {
  title: 'WSJ/Footer/FooterFull',
  component: FooterFull,
};

const Template = (args) => <FooterFull {...args} />;

export const English = Template.bind({});
English.args = {
  ...WSJNav['na,us'],
};

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  ...WSJNav['na,us'],
  isLoggedIn: true,
};

export const LoginDisabled = Template.bind({});
LoginDisabled.args = {
  ...WSJNav['na,us'],
  disableLogin: true,
};

export const WithCCPA = Template.bind({});
WithCCPA.args = {
  ...WSJNav['na,us'],
  ccpaApplies: true,
};

export const ChineseHans = Template.bind({});
ChineseHans.args = {
  ...WSJNav['asia,cn'],
  region: 'asia,cn',
};

export const ChineseHant = Template.bind({});
ChineseHant.args = {
  ...WSJNav['asia,cn_hant'],
  region: 'asia,cn_hant',
};

export const Japanese = Template.bind({});
Japanese.args = {
  ...WSJNav['asia,jp'],
  region: 'asia,jp',
};

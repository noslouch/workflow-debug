import React from 'react';
import FooterSocialLinks from '.';
import WSJNav from '../../../__mocks__/wsjNav';

export default {
  title: 'WSJ/Footer/SocialLinks',
  component: FooterSocialLinks,
};

const Template = (args) => <FooterSocialLinks {...args} />;

export const English = Template.bind({});
English.args = {
  socialLinks: WSJNav['na,us']?.footerLinks?.socialLinks,
};

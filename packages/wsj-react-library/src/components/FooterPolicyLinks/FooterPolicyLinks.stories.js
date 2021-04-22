import React from 'react';
import FooterPolicyLinks from '.';
import WSJNav from '../../../__mocks__/wsjNav';

export default {
  title: 'WSJ/Footer/PolicyLinks',
  component: FooterPolicyLinks,
};

const Template = (args) => <FooterPolicyLinks {...args} />;

export const English = Template.bind({});
English.args = {
  policyLinks: WSJNav['na,us']?.footerLinks?.policyLinks,
};

export const WithCCPA = Template.bind({});
WithCCPA.args = {
  policyLinks: WSJNav['na,us']?.footerLinks?.policyLinks,
  ccpaApplies: true,
};

export const WithLocalizedTextContent = Template.bind({});
WithLocalizedTextContent.args = {
  policyLinks: WSJNav['na,us']?.footerLinks?.policyLinks,
  localizeTextContent: 'Localized Text Here',
};

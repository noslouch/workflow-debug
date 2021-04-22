import React from 'react';
import FooterProductLinks from '.';
import WSJNav from '../../../__mocks__/wsjNav';

export default {
  title: 'WSJ/Footer/ProductLinks',
  component: FooterProductLinks,
};

const Template = (args) => <FooterProductLinks {...args} />;

export const English = Template.bind({});
English.args = {
  productLinks: WSJNav['na,us']?.footerLinks?.productLinks,
  i18nText: WSJNav['na,us']?.i18nText,
};

export const ChineseHans = Template.bind({});
ChineseHans.args = {
  productLinks: WSJNav['asia,cn']?.footerLinks?.productLinks,
  i18nText: WSJNav['asia,cn']?.i18nText,
};

export const ChineseHant = Template.bind({});
ChineseHant.args = {
  productLinks: WSJNav['asia,cn_hant']?.footerLinks?.productLinks,
  i18nText: WSJNav['asia,cn_hant']?.i18nText,
};

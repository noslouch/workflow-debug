import React from 'react';
import FooterTopLinks from '.';
import EditionPicker from '../EditionPicker';
import WSJNav from '../../../__mocks__/wsjNav';

export default {
  title: 'WSJ/Footer/TopLinks',
  component: FooterTopLinks,
};

const Template = (args) => <FooterTopLinks {...args} />;

export const English = Template.bind({});
English.args = {
  title: WSJNav['na,us']?.footerLinks?.title,
  children: getEditionPicker(),
  i18nText: WSJNav['na,us']?.i18nText,
  urls: WSJNav['na,us']?.urls,
  title: WSJNav['na,us']?.title,
};

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  title: WSJNav['na,us']?.footerLinks?.title,
  children: getEditionPicker(),
  i18nText: WSJNav['na,us']?.i18nText,
  urls: WSJNav['na,us']?.urls,
  title: WSJNav['na,us']?.title,
  isLoggedIn: true,
};

export const LoginDisabled = Template.bind({});
LoginDisabled.args = {
  title: WSJNav['na,us']?.footerLinks?.title,
  children: getEditionPicker(),
  i18nText: WSJNav['na,us']?.i18nText,
  urls: WSJNav['na,us']?.urls,
  title: WSJNav['na,us']?.title,
  disableLogin: true,
};

export const ChineseHans = Template.bind({});
ChineseHans.args = {
  title: WSJNav['asia,cn']?.footerLinks?.title,
  children: getEditionPicker(),
  i18nText: WSJNav['asia,cn']?.i18nText,
  urls: WSJNav['asia,cn']?.urls,
  title: WSJNav['asia,cn']?.title,
};

export const ChineseHant = Template.bind({});
ChineseHant.args = {
  title: WSJNav['asia,cn_hant']?.footerLinks?.title,
  children: getEditionPicker(),
  i18nText: WSJNav['asia,cn_hant']?.i18nText,
  urls: WSJNav['asia,cn_hant']?.urls,
  title: WSJNav['asia,cn_hant']?.title,
};

export const Japanese = Template.bind({});
Japanese.args = {
  title: WSJNav['asia,jp']?.footerLinks?.title,
  children: getEditionPicker(),
  i18nText: WSJNav['asia,jp']?.i18nText,
  urls: WSJNav['asia,jp']?.urls,
  title: WSJNav['asia,jp']?.title,
};

function getEditionPicker(region = 'na,us') {
  return (
    <EditionPicker
      currentEditionLabel={WSJNav[region]?.currentEditionLabel}
      placement="footer"
      homepages={WSJNav[region]?.homepages}
      region={region}
    />
  );
}

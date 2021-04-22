import React from 'react';
import FooterColumnLinks from '.';
import WSJNav from '../../../__mocks__/wsjNav';

export default {
  title: 'WSJ/Footer/ColumnLinks',
  component: FooterColumnLinks,
};

const Template = (args) => <FooterColumnLinks {...args} />;

export const English = Template.bind({});
English.args = {
  columnLinks: WSJNav['na,us']?.footerLinks?.columnLinks,
};

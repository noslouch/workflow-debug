import React from 'react';
import { render, screen, queryByText } from '@testing-library/react';
import FooterFull from './index';
import WSJNav from '../../../__mocks__/wsjNav';

test('Do Not Sell My Personal Information should not show ccpaApplies is set to false', () => {
  render(<FooterFull {...WSJNav['na,us']} ccpaApplies={false} />);
  expect(screen.queryByText('Do Not Sell My Personal Information')).toBeNull();
});

test('Do Not Sell My Personal Information should show ccpaApplies is set to true', () => {
  render(<FooterFull {...WSJNav['na,us']} ccpaApplies />);
  expect(
    screen.queryByText('Do Not Sell My Personal Information')
  ).toBeTruthy();
});

test('rendered links should match the links from the data', () => {
  const { footerLinks } = WSJNav['na,us'];

  render(<FooterFull {...WSJNav['na,us']} />);

  footerLinks.columnLinks.forEach((column) => {
    const columnLinks = screen.queryByLabelText('Column Links');
    column.items.forEach((item) => {
      expect(queryByText(columnLinks, item.label).href).toContain(item.url);
    });
  });

  footerLinks.productLinks.forEach((product) => {
    expect(screen.queryByText(product.label).href).toContain(product.url);
  });

  footerLinks.socialLinks.forEach((socialLink) => {
    const socialMediaLinks = screen.queryByLabelText('Social Media Links');
    expect(queryByText(socialMediaLinks, socialLink.label).href).toContain(
      socialLink.url
    );
  });

  footerLinks.policyLinks.forEach((policyLink) => {
    if (!policyLink.ccpaOnly && !policyLink.gdprOnly) {
      expect(screen.queryByText(policyLink.label).href).toContain(
        policyLink.url
      );
    }
  });
});

test('login links should not render when disableLogin is true', () => {
  render(<FooterFull {...WSJNav['na,us']} disableLogin />);
  expect(screen.queryByTestId('subscribe-link')).toBeNull();
  expect(screen.queryByTestId('logout-link')).toBeNull();
});

test('login and subscribe links should render when isLoggedIn is set to false', () => {
  render(<FooterFull {...WSJNav['na,us']} isLoggedIn={false} />);
  expect(screen.queryByText('Subscribe Now').href).toEqual(
    'https://subscribe.wsj.com/default'
  );
  expect(screen.queryByText('Sign In').href).toContain('/login?target=');
});

test('logout url should render when isLoggedIn is set to true', () => {
  render(<FooterFull {...WSJNav['na,us']} isLoggedIn />);
  expect(screen.queryByText('Sign Out').href).toContain('/logout?target=');
});

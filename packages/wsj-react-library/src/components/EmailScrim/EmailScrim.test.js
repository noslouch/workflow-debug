import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EmailScrim from './index';

global.IntersectionObserver = jest.fn(() => ({
  observe: () => {},
  disconnect: () => {},
}));

const sharedProps = {
  articleURL:
    'https://www.wsj.com/articles/former-braskem-ceo-pleads-guilty-to-operation-car-wash-charges-in-u-s-11618511611',
  author: 'Dylan Tokar',
  headline:
    'Former Braskem CEO Pleads Guilty to ‘Operation Car Wash’ Charges in U.S.',
  id: 'SB10519382422305624297404587404592362311740',
  source: 'NEWSPLUS,PRO,WSJ-PRO-WSJ.com',
  summary:
    'José Carlos Grubisich pleaded guilty to two counts of conspiring to violate U.S. antibribery law, which carry a possible sentence of 10 years',
  template: 'full',
  thumbnailURL: 'https://images.wsj.net/im-325652/D',
};

describe('EmailScrim', () => {
  test('should be open when open prop is passed in as true', () => {
    render(<EmailScrim {...sharedProps} emailDialogOpen />);
    const headlineEl = screen.getByText(sharedProps.headline);
    expect(headlineEl).toHaveTextContent(sharedProps.headline);
  });

  test('should be closed when open prop is passed in as false', () => {
    render(<EmailScrim {...sharedProps} emailDialogOpen={false} />);
    expect(() => screen.getByText(sharedProps.headline)).toThrowError();
  });

  test('should be closed when the close button is pressed', () => {
    render(<EmailScrim {...sharedProps} />);
    const closeButtonEl = screen.getByLabelText('Close');
    userEvent.click(closeButtonEl);
    expect(() => screen.getByText(sharedProps.headline)).toThrowError();
  });

  test('should contain an error when invalid "to" emails are entered', () => {
    render(<EmailScrim {...sharedProps} />);
    const emailToEl = screen.getByTestId('emailTo');

    const invalidEmails = [
      'test@test',
      'test@',
      'test',
      'test test',
      'test@test.com test@test.com',
    ];

    const errMsg = 'Email address is not valid.';
    invalidEmails.forEach((invalidEmail) => {
      userEvent.clear(emailToEl);
      userEvent.type(emailToEl, invalidEmail);
      userEvent.tab();
      expect(screen.getByText(errMsg)).toHaveTextContent(errMsg);
    });
  });
});

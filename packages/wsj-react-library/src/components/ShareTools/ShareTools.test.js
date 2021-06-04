import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UserProvider } from '../../context/user-context';
import ShareTools from './index';

global.IntersectionObserver = jest.fn(() => ({
  observe: () => {},
  disconnect: () => {},
}));

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <UserProvider {...providerProps}>{ui}</UserProvider>,
    renderOptions
  );
};

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
  userEmail: 'johndoe@wsj.com',
  shareTargets: [
    {
      key: 'facebook',
      title: 'Facebook',
      baseURL: 'https://www.facebook.com/sharer/sharer.php?u=',
    },
    {
      key: 'twitter',
      title: 'Twitter',
      baseURL: 'https://twitter.com/intent/tweet?text=',
    },
    {
      key: 'linkedin',
      title: 'LinkedIn',
      baseURL: 'https://www.linkedin.com/shareArticle?mini=true&url=',
    },
  ],
};

const user = {
  firstName: 'John',
  lastName: 'Boyd',
  status: 'user_logged_in',
};

describe('ShareTools', () => {
  test('should expand when mouse over occurs', () => {
    customRender(<ShareTools {...sharedProps} />, {});
    const shareMenuEl = screen.getByLabelText('Share Menu');
    const { width: originalWidth } = window.getComputedStyle(shareMenuEl);
    userEvent.hover(shareMenuEl);
    const { width: hoverWidth } = window.getComputedStyle(shareMenuEl);
    expect(parseInt(hoverWidth, 10)).toBeGreaterThan(
      parseInt(originalWidth, 10)
    );
  });

  test('should contain buttons for each of the share targets', () => {
    customRender(<ShareTools {...sharedProps} />, {});
    const shareButtonEls = screen.getAllByLabelText('Share Button');
    const shareButtonsText = shareButtonEls.map((button) => button.textContent);
    [...sharedProps.shareTargets, { title: 'Copy Link' }].forEach(
      ({ title }) => {
        expect(shareButtonsText).toContain(title);
      }
    );
  });

  test('should not contain the email button when not logged in', () => {
    customRender(<ShareTools {...sharedProps} />, {});
    const shareButtonEls = screen.getAllByLabelText('Share Button');
    const shareButtonsText = shareButtonEls.map((button) => button.textContent);
    expect(shareButtonsText).not.toContain('Email');
  });

  test('should contain the email button when logged in', () => {
    const providerProps = { user };
    customRender(<ShareTools {...sharedProps} />, { providerProps });
    const shareButtonEls = screen.getAllByLabelText('Share Button');
    const shareButtonsText = shareButtonEls.map((button) => button.textContent);
    expect(shareButtonsText).toContain('Email');
  });
});

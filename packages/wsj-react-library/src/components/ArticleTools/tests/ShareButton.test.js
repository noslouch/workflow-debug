import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UserProvider } from '../../../context/user-context';
import ShareButton from '../ShareButton';

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
      key: 'whatsapp',
      title: 'WhatsApp',
      baseURL: 'whatsapp://send?text=',
    },
    {
      key: 'sms',
      title: 'SMS',
      baseURL: 'sms:?&body=',
    },
  ],
};

const user = {
  firstName: 'John',
  lastName: 'Boyd',
  status: 'user_logged_in',
};

describe('ShareTools', () => {
  test('should invoke share button handler', () => {
    customRender(<ShareButton {...sharedProps} />, {});

    const shareButton = screen.getByRole('button', {
      name: 'Share',
    });
    userEvent.click(shareButton);

    const openedShareDialog = screen.getByRole('dialog', {
      name: 'Share',
    });
    expect(openedShareDialog).toHaveStyle(
      'background-color: var(--color-white); height: 100vh; width: 100vw;'
    );
  });

  test('should contain buttons for each of the share targets', () => {
    customRender(<ShareButton {...sharedProps} />, {});

    const shareButton = screen.getByRole('button', {
      name: 'Share',
    });
    userEvent.click(shareButton);

    const shareButtonEls = screen.getAllByLabelText('Share Button');
    const shareButtonsText = shareButtonEls.map((button) => button.textContent);
    [...sharedProps.shareTargets, { title: 'Copy Link' }].forEach(
      ({ title }) => {
        expect(shareButtonsText).toContain(title);
      }
    );
  });

  test('should not contain the email button when not logged in', () => {
    customRender(<ShareButton {...sharedProps} />, {});

    const shareButton = screen.getByRole('button', {
      name: 'Share',
    });
    userEvent.click(shareButton);

    const shareButtonEls = screen.getAllByLabelText('Share Button');
    const shareButtonsText = shareButtonEls.map((button) => button.textContent);
    expect(shareButtonsText).not.toContain('Email');
  });

  test('should contain the email button when logged in', () => {
    const providerProps = { user };
    customRender(<ShareButton {...sharedProps} />, {
      providerProps,
    });

    const shareButton = screen.getByRole('button', {
      name: 'Share',
    });
    userEvent.click(shareButton);

    const shareButtonEls = screen.getAllByLabelText('Share Button');
    const shareButtonsText = shareButtonEls.map((button) => button.textContent);
    expect(shareButtonsText).toContain('Email');
  });
});

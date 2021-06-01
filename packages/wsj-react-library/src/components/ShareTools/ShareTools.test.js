import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ShareTools from './index';
import copyToClipboard from '../../helpers/copy-to-clipboard';
import getShareUrlWithToken from '../../helpers/entitlements/getShareURL';

jest.mock('../../helpers/copy-to-clipboard');
jest.mock('../../helpers/entitlements/getShareURL');

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

describe('ShareTools', () => {
  test('should expand when mouse over occurs', () => {
    render(<ShareTools {...sharedProps} />);
    const shareMenuEl = screen.getByLabelText('Share Menu');
    const { width: originalWidth } = window.getComputedStyle(shareMenuEl);
    userEvent.hover(shareMenuEl);
    const { width: hoverWidth } = window.getComputedStyle(shareMenuEl);
    expect(parseInt(hoverWidth, 10)).toBeGreaterThan(
      parseInt(originalWidth, 10)
    );
  });

  test('should contain buttons for each of the share targets', () => {
    render(<ShareTools {...sharedProps} />);
    const shareButtonEls = screen.getAllByLabelText('Share Button');
    const shareButtonsText = shareButtonEls.map((button) => button.textContent);
    [...sharedProps.shareTargets, { title: 'Copy Link' }].forEach(
      ({ title }) => {
        expect(shareButtonsText).toContain(title);
      }
    );
  });

  test('should contain the email button when an email address is passed in', () => {
    render(<ShareTools {...sharedProps} userEmail="test@test.com" />);
    const shareButtonEls = screen.getAllByLabelText('Share Button');
    const shareButtonsText = shareButtonEls.map((button) => button.textContent);
    expect(shareButtonsText).toContain('Email');
  });

  test('should not contain the email button when an email address is not passed in', () => {
    render(<ShareTools {...sharedProps} userEmail={undefined} />);
    const shareButtonEls = screen.getAllByLabelText('Share Button');
    const shareButtonsText = shareButtonEls.map((button) => button.textContent);
    expect(shareButtonsText).not.toContain('Email');
  });

  test('should copy the correct article url when sharing via copy link', () => {
    copyToClipboard.mockReset();
    render(<ShareTools {...sharedProps} />);
    const shareButtonEls = screen.getAllByLabelText('Share Button');
    userEvent.click(shareButtonEls[3]);
    expect(copyToClipboard.mock.calls[0][0]).toEqual(
      `${sharedProps.articleURL}?reflink=desktopwebshare_permalink`
    );
  });

  test('should copy the correct article url when sharing via copy link and logged in', () => {
    copyToClipboard.mockReset();
    render(
      <ShareTools
        {...sharedProps}
        shareURLWithToken="EXAMPLE_SHARE_URL_WITH_TOKEN"
      />
    );
    const shareButtonEls = screen.getAllByLabelText('Share Button');
    userEvent.click(shareButtonEls[3]);
    expect(copyToClipboard.mock.calls[0][0]).toEqual(
      'EXAMPLE_SHARE_URL_WITH_TOKEN'
    );
  });

  test('should copy the correct article url when sharing via copy link and logged in', async () => {
    copyToClipboard.mockReset();
    getShareUrlWithToken.mockResolvedValue('EXAMPLE_SHARE_URL_WITH_TOKEN');
    // console.log(getShareUrlWithToken);
    // return;
    render(<ShareTools {...sharedProps} isLoggedIn />);
    const shareButtonEls = screen.getAllByLabelText('Share Button');
    userEvent.click(shareButtonEls[3]);
    // this is to make sure that we give the copyToClipboard function time to be called
    await new Promise((res) => {
      setTimeout(() => {
        res(true);
      }, 0);
    });
    expect(copyToClipboard.mock.calls[0][0]).toEqual(
      'EXAMPLE_SHARE_URL_WITH_TOKEN'
    );
  });
});

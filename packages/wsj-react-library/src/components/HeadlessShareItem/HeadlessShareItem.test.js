import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UserProvider } from '../../context/user-context';
import HeadlessShareItem from './index';
import copyToClipboard from '../../helpers/copy-to-clipboard';
import getShareUrlWithToken from '../../helpers/entitlements/getShareURL';

jest.mock('../../helpers/copy-to-clipboard');
jest.mock('../../helpers/entitlements/getShareURL');

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <UserProvider {...providerProps}>{ui}</UserProvider>,
    renderOptions
  );
};

const user = {
  firstName: 'John',
  lastName: 'Boyd',
  status: 'user_logged_in',
};

describe('HeadlessShareItem', () => {
  test('should copy the correct article url when sharing via copy link in desktop', () => {
    const articleURL =
      'https://www.wsj.com/articles/former-braskem-ceo-pleads-guilty-to-operation-car-wash-charges-in-u-s-11618511611';

    copyToClipboard.mockReset();
    customRender(
      <HeadlessShareItem
        itemKey="permalink"
        title="Copy Link"
        articleURL={articleURL}
      >
        Copy Link
      </HeadlessShareItem>,
      {}
    );

    const shareEl = screen.getByText('Copy Link');
    userEvent.click(shareEl);
    expect(copyToClipboard.mock.calls[0][0]).toEqual(
      `${articleURL}?reflink=desktopwebshare_permalink`
    );
  });

  test('should copy the correct article url when sharing via copy link in mobile', () => {
    const articleURL =
      'https://www.wsj.com/articles/former-braskem-ceo-pleads-guilty-to-operation-car-wash-charges-in-u-s-11618511611';

    copyToClipboard.mockReset();
    customRender(
      <HeadlessShareItem
        itemKey="permalink"
        title="Copy Link"
        articleURL={articleURL}
        isMobile
      >
        Copy Link
      </HeadlessShareItem>,
      {}
    );

    const shareEl = screen.getByText('Copy Link');
    userEvent.click(shareEl);
    expect(copyToClipboard.mock.calls[0][0]).toEqual(
      `${articleURL}?reflink=mobilewebshare_permalink`
    );
  });

  test('should copy the correct article url when sharing via copy link and not logged in', () => {
    copyToClipboard.mockReset();
    customRender(
      <HeadlessShareItem
        itemKey="permalink"
        title="Copy Link"
        shareURLWithToken="EXAMPLE_SHARE_URL_WITH_TOKEN"
      >
        Copy Link
      </HeadlessShareItem>,
      {}
    );

    const shareEl = screen.getByText('Copy Link');
    userEvent.click(shareEl);
    expect(copyToClipboard.mock.calls[0][0]).toEqual(
      'EXAMPLE_SHARE_URL_WITH_TOKEN'
    );
  });

  test('should copy the correct article url when sharing via copy link and logged in', async () => {
    const providerProps = { user };
    copyToClipboard.mockReset();
    getShareUrlWithToken.mockResolvedValue(
      'EXAMPLE_SHARE_URL_WITH_TOKEN_SIGNED_IN'
    );
    customRender(
      <HeadlessShareItem itemKey="permalink" title="Copy Link">
        Copy Link
      </HeadlessShareItem>,
      {
        providerProps,
      }
    );

    const shareEl = screen.getByText('Copy Link');
    userEvent.click(shareEl);
    // this is to make sure that we give the copyToClipboard function time to be called
    await new Promise((res) => {
      setTimeout(() => {
        res(true);
      }, 0);
    });
    expect(copyToClipboard.mock.calls[0][0]).toEqual(
      'EXAMPLE_SHARE_URL_WITH_TOKEN_SIGNED_IN'
    );
  });
});

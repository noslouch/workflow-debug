/* global document */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import FullHeader from './index';
import WSJNav from '../../../__mocks__/wsjNav';
import headerConfigurations from './config.json';
import { UserProvider } from '../../context/user-context';

const config = headerConfigurations['na,us'];
const {
  'na,us': { navData = [], homepages = [] },
} = WSJNav;
const navProps = {
  homepages,
  navigation: navData,
  customerNav: {
    urls: {
      loginUrl:
        'https://int.accounts.wsj.com/login?target=http%3A%2F%2Fwww.wsj.com',
      logoutUrl:
        'https://int.accounts.wsj.com/logout?target=http%3A%2F%2Fwww.wsj.com',
      subscribeUrl: 'http://subscribe.wsj.com',
    },
  },
  loginUrl:
    'https://int.accounts.wsj.com/login?target=http%3A%2F%2Fwww.wsj.com',
};

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <UserProvider {...providerProps}>{ui}</UserProvider>,
    renderOptions
  );
};

global.IntersectionObserver = jest.fn(() => ({
  observe: () => {},
  disconnect: () => {},
}));

describe('<FullHeader>', () => {
  test('should be fixed by default', () => {
    customRender(<FullHeader />, {});

    const main = screen.getByRole('banner');
    expect(main).not.toHaveStyle('position: relative; top: 0;');
  });

  test('should not be fixed when set disableScroll', () => {
    customRender(<FullHeader disableScroll />, {});

    const main = screen.getByRole('banner');
    expect(main).toHaveStyle('position: relative; top: 0;');
  });

  test('should login/logout be enable by default', () => {
    const { loginText, subscribeText } = config;
    customRender(<FullHeader />, {});

    const loginButton = screen.getAllByText(loginText);
    const subscribeButton = screen.getAllByText(subscribeText);
    expect(loginButton).toHaveLength(2);
    expect(subscribeButton).toHaveLength(2);
  });

  test('should not render login by default', () => {
    const { loginText } = config;
    customRender(<FullHeader />, {});

    const loginButton = screen.getAllByText(loginText);
    const nameButton = screen.queryByRole('button', {
      name: 'customer-nav-full-name',
    });
    expect(loginButton).toHaveLength(2);
    expect(nameButton).toBeNull();
  });

  test('should not display login when disableLogin is true', () => {
    const { loginText, subscribeText } = config;
    customRender(<FullHeader disableLogin />, {});

    const loginButton = screen.queryByText(loginText);
    const subscribeButton = screen.queryByText(subscribeText);
    expect(loginButton).toBeNull();
    expect(subscribeButton).toBeNull();
  });

  test('should render login when isLoggedIn is true', () => {
    const providerProps = {
      user: { firstName: 'John', lastName: 'Boyd', status: 'user_logged_in' },
    };
    customRender(<FullHeader />, { providerProps });

    const nameButton = screen.getByRole('button', {
      name: 'John Boyd',
    });
    expect(nameButton).toBeInTheDocument();
  });

  test('should toggle customer nav', () => {
    const providerProps = {
      user: { firstName: 'John', lastName: 'Boyd', status: 'user_logged_in' },
    };
    customRender(<FullHeader {...navProps} />, { providerProps });

    const nameButton = screen.getByRole('button', {
      name: 'John Boyd',
    });

    fireEvent.click(nameButton);

    const expandedNameButton = screen.getByRole('button', {
      name: 'John Boyd',
      expanded: true,
    });
    expect(expandedNameButton).toBeInTheDocument();

    fireEvent.click(expandedNameButton);

    const closedNameButton = screen.getByRole('button', { name: 'John Boyd' });

    expect(closedNameButton.attributes['aria-expanded']).toBeFalsy();
  });

  test('should show masthead strap by default', () => {
    customRender(<FullHeader />, {});

    const videoLink = screen.getByRole('link', {
      name: 'Video',
    });
    const printEditionLink = screen.getByRole('link', {
      name: 'Print Edition',
    });
    const podcastLink = screen.getByRole('link', {
      name: 'Podcasts',
    });
    expect(videoLink).toBeInTheDocument();
    expect(printEditionLink).toBeInTheDocument();
    expect(podcastLink).toBeInTheDocument();
  });

  test('should not show masthead strap when set to hide in props', () => {
    customRender(<FullHeader showMastheadStrap={false} />, {});

    const videoLink = screen.queryByRole('link', {
      name: 'Video',
    });
    const printEditionLink = screen.queryByRole('link', {
      name: 'Print Edition',
    });
    const podcastLink = screen.queryByRole('link', {
      name: 'Podcasts',
    });
    expect(videoLink).toBeNull();
    expect(printEditionLink).toBeNull();
    expect(podcastLink).toBeNull();
  });

  test('should invoke search button handler', () => {
    customRender(<FullHeader />, {});

    const searchButton = screen.getByRole('button', {
      name: 'Open Search',
    });

    fireEvent.click(searchButton);

    const openedSearchDialog = screen.getByRole('dialog', {
      name: 'Search',
    });
    expect(openedSearchDialog).toHaveStyle(
      'top: 0; height: 100vh; width: 100vw;'
    );
  });

  test('should close search dialog when clicking close button', () => {
    customRender(<FullHeader />, {});

    const searchButton = screen.getByRole('button', {
      name: 'Open Search',
    });

    fireEvent.click(searchButton);

    const openedSearchDialog = screen.getByRole('dialog', {
      name: 'Search',
    });

    expect(openedSearchDialog).toHaveStyle(
      'top: 0; height: 100vh; width: 100vw;'
    );

    const closeButton = screen.getByRole('button', {
      name: 'Close Search',
    });

    fireEvent.click(closeButton);

    const searchDialog = screen.queryByRole('dialog', {
      name: 'Search',
    });

    expect(searchDialog).toBeNull();
  });

  test('should close search dialog on escape key pressed', () => {
    customRender(<FullHeader />, {});

    const searchButton = screen.getByRole('button', {
      name: 'Open Search',
    });

    fireEvent.click(searchButton);

    const openedSearchDialog = screen.getByRole('dialog', {
      name: 'Search',
    });

    expect(openedSearchDialog).toHaveStyle(
      'top: 0; height: 100vh; width: 100vw;'
    );

    fireEvent.keyDown(document.activeElement, {
      key: 'Escape',
      code: 'Escape',
    });

    const searchDialog = screen.queryByRole('dialog', {
      name: 'Search',
    });

    expect(searchDialog).toBeNull();
  });
});

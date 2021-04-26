import React from 'react';
import { render, screen } from '@testing-library/react';

import FullHeader from './index';
import { UserProvider } from '../../context/user-context';

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <UserProvider {...providerProps}>{ui}</UserProvider>,
    renderOptions
  );
};

describe('<FullHeader>', () => {
  test('should be fixed by default', () => {
    customRender(<FullHeader />, {});

    const main = screen.getByRole('banner');
    expect(main).not.toHaveStyle('position: relative; top: 0;');
  });

  test('should not be fixed when set isFixedScroll as false', () => {
    customRender(<FullHeader isFixedScroll={false} />, {});

    const main = screen.getByRole('banner');
    expect(main).toHaveStyle('position: relative; top: 0;');
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
});

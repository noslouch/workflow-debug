/* global window */
import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Skip from '.';

describe('Skip Component', () => {
  const scrollIntoViewMock = jest.fn();
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  const TestingLayout = (
    <div>
      <Skip />
      <div id="search-div" aria-label="search-container">
        Search
        <form>
          <input
            type="search"
            id="searchInput"
            aria-label="Search the Wall Street Journal"
          />
        </form>
      </div>
      <main id="main" aria-label="MAIN">
        Main Section
      </main>
      <div id="one" role="region" aria-label="one" tabIndex="-1">
        First Focusable Region
      </div>
      <div id="two" role="region" aria-label="two" tabIndex="-1">
        Second Focusable Region
      </div>
    </div>
  );

  test('should have main section scrolled to and focusable when an user hits ENTER on Skip to Main Button', async () => {
    render(TestingLayout);

    userEvent.tab();
    userEvent.keyboard('{Enter}');

    await waitFor(() => {
      expect(scrollIntoViewMock).toBeCalled();
      expect(
        screen.getByRole('main', {
          name: /main/i,
        })
      ).toHaveFocus();
    });
  });

  test('should have Search Input field focused when an user hits ENTER on Skip To Search Button', () => {
    render(TestingLayout);

    userEvent.tab();
    userEvent.tab();
    userEvent.keyboard('{Enter}');

    expect(
      screen.getByLabelText('Search the Wall Street Journal')
    ).toHaveFocus();
  });

  test('should have region scrolled to and focused when an user hits ENTER on list item', async () => {
    render(TestingLayout);
    act(() => jest.advanceTimersByTime(100));

    userEvent.tab();
    userEvent.tab();
    userEvent.tab();
    userEvent.keyboard('{Enter}');
    userEvent.keyboard('{ArrowDown}');

    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'one' })).toHaveFocus();
    });

    userEvent.keyboard('{Enter}');

    await waitFor(() => {
      expect(scrollIntoViewMock).toBeCalled();
      expect(
        screen.getByRole('region', {
          name: /one/i,
        })
      ).toHaveFocus();
    });
  });

  test('should have dropdown list closed and dropdown button focused when an user presses ESCAPE', async () => {
    render(TestingLayout);
    act(() => jest.advanceTimersByTime(100));

    userEvent.tab();
    userEvent.tab();
    userEvent.tab();
    userEvent.keyboard('{Enter}');
    userEvent.keyboard('{Arrowdown}');

    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'one' })).toHaveFocus();
    });

    userEvent.keyboard('{Escape}');
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /one/i })).toHaveFocus();
    });
  });

  test('should have next tabbable element in focus if user exits component', () => {
    render(TestingLayout);
    act(() => jest.advanceTimersByTime(100));

    userEvent.tab();

    expect(
      screen.getByRole('button', {
        name: /skip to main content/i,
      })
    ).toHaveFocus();
    userEvent.tab();
    userEvent.tab();
    userEvent.tab();

    expect(
      screen.getByLabelText('Search the Wall Street Journal')
    ).toHaveFocus();
  });

  test('should have expected list item focusable when an user scrolls up or down', () => {
    render(TestingLayout);
    act(() => jest.advanceTimersByTime(100));

    userEvent.tab();
    userEvent.tab();
    userEvent.tab();
    userEvent.keyboard('{Enter}');
    userEvent.keyboard('{ArrowDown}');
    userEvent.keyboard('{ArrowDown}');

    expect(screen.getByRole('option', { name: 'two' })).toHaveFocus();

    userEvent.keyboard('{ArrowUp}');
    expect(screen.getByRole('option', { name: 'one' })).toHaveFocus();
  });

  test('should have region focusable and scrolled when an user MOUSECLICKS on list item', async () => {
    render(TestingLayout);
    act(() => jest.advanceTimersByTime(100));

    userEvent.tab();
    userEvent.tab();
    userEvent.tab();
    userEvent.keyboard('{Enter}');
    userEvent.keyboard('{ArrowDown}');

    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'one' })).toHaveFocus();
    });

    userEvent.click(screen.getByRole('option', { name: 'one' }));
    await waitFor(() => {
      expect(
        screen.getByRole('region', {
          name: /one/i,
        })
      ).toHaveFocus();
    });
  });
});

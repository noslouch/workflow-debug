/* global window document */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import wretch from 'wretch';

import ArticleCommenting from './index';

jest.mock('wretch');

describe('ArticleCommenting Component', () => {
  test('should render when enableCoralComments is set to true', () => {
    const { container } = render(
      <ArticleCommenting
        id="SB00000000000000000"
        commentCount={50}
        canComment
      />
    );
    expect(container.firstChild).not.toBeNull();
  });

  test('should deliberately return a comment count of 0 when comment count is 0', () => {
    render(
      <ArticleCommenting id="SB00000000000000001" commentCount={0} canComment />
    );
    expect(screen.queryByText('(0)')).toBeTruthy();
  });

  test('should update Button text when user clicks', async () => {
    render(
      <ArticleCommenting
        id="SB00000000000000002"
        commentCount={0}
        canComment={false}
      />
    );
    expect(screen.getByText('Show Conversation')).toBeInTheDocument();
    userEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText('Hide Conversation')).toBeInTheDocument();
    });
  });

  test('should navigate directly to comments if `commentId` param is present', () => {
    Object.defineProperty(window, 'location', {
      value: {
        href: 'https://example.com?commentId=foo',
        search: '?commentId=foo',
      },
    });

    render(
      <ArticleCommenting
        id="SB00000000000000000"
        commentCount={50}
        canComment
      />
    );

    expect(window.location.hash).toEqual('#comments_sector');
  });

  describe('with Coral Mock', () => {
    let Coral;
    beforeEach(() => {
      Coral = {
        Talk: {
          render: jest.fn(),
        },
      };
    });

    afterEach(() => {
      wretch.mockClear();
      jest.restoreAllMocks();
    });

    test('should open comments when #comments_sector hash is clicked', async () => {
      render(
        <>
          <a href="#comments_sector">Comments</a>
          <ArticleCommenting
            id="SB00000000000000000"
            commentCount={50}
            canComment={false}
          />
        </>
      );

      jest.spyOn(document.body, 'appendChild').mockImplementation((script) => {
        window.Coral = Coral;
        script.onload();
      });

      userEvent.click(screen.getByText('Comments'));

      await waitFor(() => {
        expect(Coral.Talk.render).toBeCalled();
        expect(window.location.hash).toEqual('#comments_sector');
        expect(screen.getByText('Hide Conversation')).toBeInTheDocument();
      });
    });

    test('should call coral endpoint when canComment is enabled', async () => {
      const response = { token: 'abcd1234' };
      const res = jest.fn(() => response);

      wretch.mockImplementation(() => ({
        options: () => ({
          get() {
            return { res };
          },
        }),
      }));

      render(
        <ArticleCommenting
          id="SB00000000000000000"
          commentCount={50}
          canComment
        />
      );

      jest.spyOn(document.body, 'appendChild').mockImplementation((script) => {
        window.Coral = Coral;
        script.onload();
      });

      userEvent.click(screen.getByRole('button'));
      await waitFor(() => {
        expect(screen.getByText('Hide Conversation')).toBeInTheDocument();
        expect(res).toBeCalled();
      });
    });

    test('admin users should call admin endpoint', async () => {
      const res = jest.fn();
      wretch.mockImplementation(() => ({
        options: () => ({
          get() {
            return { res };
          },
        }),
      }));

      render(
        <ArticleCommenting
          id="SB00000000000000000"
          commentCount={50}
          canComment
          isAdmin
        />
      );

      jest.spyOn(document.body, 'appendChild').mockImplementation((script) => {
        window.Coral = Coral;
        script.onload();
      });

      userEvent.click(screen.getByRole('button'));
      await waitFor(() => {
        const [call] = wretch.mock.calls;
        expect(call[0]).toMatch(/admin/);
      });
    });
  });
});

import ArticleCommenting from './index';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

describe('ArticleCommenting Component', () => {
  test('should render when enableCoralComments is set to true', () => {
    const { container } = render(<ArticleCommenting id="SB00000000000000000" commentCount={50} canComment={true} />);
    expect(container.firstChild).not.toBeNull();
  });

  test('should deliberately return a comment count of 0 when comment count is 0', () => {
    render(<ArticleCommenting id="SB00000000000000001" commentCount={0} canComment={true} />);
    expect(screen.queryByText('(0)')).toBeTruthy();
  });

  test('should update Button text when user clicks', async () => {
    render(<ArticleCommenting id="SB00000000000000002" commentCount={0} canComment={false} />);
    expect(screen.getByText('Show Conversation')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText('Hide Conversation')).toBeInTheDocument();
    });
  });
});

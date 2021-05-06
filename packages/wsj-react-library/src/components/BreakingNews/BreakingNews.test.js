import { render, screen } from '@testing-library/react';
import BreakingNews from '.';

describe('Breaking News', () => {
  test('should be set with a link tag, if a url is present', () => {
    render(<BreakingNews headline="TESTING" url="https://s.dev.wsj.com" />);
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
  });

  test('should be not be set with a link tag, if a url not is present', () => {
    const { container } = render(<BreakingNews headline="TESTING" />);
    const link = container.querySelector('a');
    expect(link).not.toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import ArticleTimestamp from './index';

const mockPublished = {
  prop: '2021-03-15T10:00:00',
  expected: 'March 15, 2021 10:00 AM ET',
};

const mockUpdated = {
  prop: '2021-03-16T22:00:00',
  expected: 'Updated March 16, 2021 10:00 PM ET',
};

describe('ArticleTimestamp', () => {
  test('should return null if invalid published date', () => {
    const { container } = render(<ArticleTimestamp published="foo" />);
    expect(container.firstChild).toBeNull();
  });

  test('should show correct formatted published date', () => {
    render(<ArticleTimestamp published={mockPublished.prop} />);
    expect(
      screen.getByText(mockPublished.expected, { container: 'time' })
    ).toBeInTheDocument();
  });

  test('should show formatted updated when available and valid', () => {
    render(
      <ArticleTimestamp
        published={mockPublished.prop}
        updated={mockUpdated.prop}
      />
    );
    expect(
      screen.getByText(mockUpdated.expected, { container: 'time' })
    ).toBeInTheDocument();
  });
});

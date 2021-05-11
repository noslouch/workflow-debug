import { render, screen } from '@testing-library/react';
import ArticleHero from './index';

jest.mock('../ArticleBody/components/Image', () => () => (
  <div data-testid="image" />
));

jest.mock('../ArticleBody/components/Video', () => () => (
  <div data-testid="video" />
));

describe('Article Hero', () => {
  test('should render null if no valid type', () => {
    const { container } = render(<ArticleHero />);
    expect(container.firstChild).toBeNull();
  });

  test('should render image component if image type', () => {
    render(<ArticleHero data={{ type: 'image' }} />);
    expect(screen.getByTestId('image')).toBeInTheDocument();
  });

  test('should render video component if video type', () => {
    render(<ArticleHero data={{ type: 'video' }} />);
    expect(screen.getByTestId('video')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import ArticleByline, { AUTHOR_URL } from './index';

describe('ArticleByline', () => {
  test('should return null if invalid data', () => {
    const { container } = render(<ArticleByline />);
    expect(container.firstChild).toBeNull();
  });

  test('should not break with malformed data', () => {
    const { container } = render(<ArticleByline data={[null, { text: 'foo bar' }]} />);
    expect(container.firstChild).not.toBeNull();
    expect(screen.getByText('foo bar')).toBeInTheDocument();
  });

  test('should return plain text byline', () => {
    render(<ArticleByline data={[{ text: 'foo bar' }]} />);
    expect(screen.getByText('foo bar')).toBeInTheDocument();
  });

  test('should return byline with author', () => {
    render(
      <ArticleByline data={[{ text: 'By ' }, { type: 'phrase', phrase_type: 'author', id: 1, text: 'foo bar' }]} />
    );
    const author = screen.getByText('foo bar', { selector: 'a' });
    expect(author).toBeInTheDocument();
    expect(author).toHaveAttribute('href', `${AUTHOR_URL}1`);
  });

  test('should use different font styles for isOpinion', () => {
    const { container } = render(<ArticleByline data={[{ text: 'by foo bar' }]} isOpinion />);
    expect(container.firstChild).toHaveStyle(`
      font-family: var(--font-family-retina-narrow);
      font-style: normal;
      font-weight: var(--font-weight-light);
    `);
  });

  test('should show hedcut for opinion if available', () => {
    render(
      <ArticleByline
        data={[{ text: 'by' }, { type: 'phrase', phrase_type: 'author', id: 1, text: 'foo bar', hedcut: 'foo' }]}
        isOpinion
      />
    );
    expect(screen.getByAltText('foo bar hedcut')).toBeInTheDocument();
  });

  test('should show amp img for isAmp', () => {
    const { container } = render(
      <ArticleByline
        data={[{ text: 'by' }, { type: 'phrase', phrase_type: 'author', id: 1, text: 'foo bar', hedcut: 'foo' }]}
        isAmp
        isOpinion
      />
    );
    expect(container.querySelector('amp-img')).toBeInTheDocument();
  });
});

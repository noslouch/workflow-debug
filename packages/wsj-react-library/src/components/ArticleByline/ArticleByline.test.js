import { render, screen } from '@testing-library/react';
import ArticleByline from './index';

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
      <ArticleByline data={[{ text: 'By ' }, { type: 'phrase', phrase_type: 'author', id: '1', text: 'foo bar' }]} />
    );
    const author = screen.getByText('foo bar', { selector: 'button' });
    expect(author).toBeInTheDocument();
  });

  test('should show hedcut when available and shouldShowHedcut is set', () => {
    render(
      <ArticleByline
        data={[{ text: 'by' }, { type: 'phrase', phrase_type: 'author', id: '1', text: 'foo bar', hedcutImage: 'foo' }]}
        shouldShowHedcut
      />
    );
    expect(screen.getByAltText('foo bar hedcut')).toBeInTheDocument();
  });

  test('should show amp img for hedcut when isAmp is set', () => {
    const { container } = render(
      <ArticleByline
        data={[{ text: 'by' }, { type: 'phrase', phrase_type: 'author', id: '1', text: 'foo bar', hedcutImage: 'foo' }]}
        isAmp
        shouldShowHedcut
      />
    );
    expect(container.querySelector('amp-img')).toBeInTheDocument();
  });

  test('should use different font styles for isOpinion', () => {
    const { container } = render(
      <ArticleByline
        data={[{ text: 'by' }, { type: 'phrase', phrase_type: 'author', id: '1', text: 'foo bar', hedcutImage: 'foo' }]}
        isAmp
        isOpinion
        shouldShowHedcut
      />
    );
    expect(container.firstChild).toHaveStyle(`
      font-family: var(--font-family-retina-narrow);
      font-style: normal;
      font-weight: var(--font-weight-light);
    `);
    expect(container.querySelector('amp-img')).toHaveStyle(`
      border: 0;
      border-radius: 100%;
    `);
  });
});

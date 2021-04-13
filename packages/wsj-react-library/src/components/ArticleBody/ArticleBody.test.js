import { render, screen } from '@testing-library/react';
import { queryByTestId } from '@testing-library/dom';
import ArticleBody from './index';

jest.mock('./renderer', () => (array = [], { isAmp = false, renderBlock } = {}) =>
  array.map((_, index) => (
    <div key={index} data-testid={`block${isAmp ? '-isAmp' : ''}${renderBlock ? '-renderBlock' : ''}`} />
  ))
);

describe('ArticleBody', () => {
  test('should not break if data is not provided', () => {
    const { container } = render(<ArticleBody />);
    expect(queryByTestId(container, 'block')).not.toBeInTheDocument();
  });

  test('should pass data prop correctly to renderer', () => {
    render(<ArticleBody data={[1, 2, 3]} />);
    expect(screen.getAllByTestId('block')).toHaveLength(3);
  });

  test('should pass isAmp prop correctly to renderer', () => {
    render(<ArticleBody data={[1, 2, 3]} isAmp />);
    expect(screen.getAllByTestId('block-isAmp')).toHaveLength(3);
  });

  test('should pass renderBlock prop correctly to renderer', () => {
    render(<ArticleBody data={[1, 2, 3]} renderBlock={() => null} />);
    expect(screen.getAllByTestId('block-renderBlock')).toHaveLength(3);
  });
});

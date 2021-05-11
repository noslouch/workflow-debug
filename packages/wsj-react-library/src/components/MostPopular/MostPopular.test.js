import { render } from '@testing-library/react';
import MostPopular from './index';
import mockCollection from './__mocks__/collection.json';

describe('MostPopular', () => {
  test('Should render correct title for news', () => {
    const { getByText } = render(
      <MostPopular type="news" collection={mockCollection} />
    );
    expect(getByText('Most Popular news')).toBeInTheDocument();
  });
  test('Should render correct title for videos', () => {
    const { getByText } = render(
      <MostPopular type="videos" collection={mockCollection} />
    );
    expect(getByText('Recommended videos')).toBeInTheDocument();
  });
  test('Should render list of elements', () => {
    const { container } = render(
      <MostPopular type="news" collection={mockCollection} />
    );
    expect(container.querySelector('ul')).toBeInTheDocument();
  });
});

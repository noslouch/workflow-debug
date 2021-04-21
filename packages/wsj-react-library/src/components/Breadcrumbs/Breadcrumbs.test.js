import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Breadcrumbs from './index';

describe('Breadcrumbs', () => {
  test('Should render breadcrumb', () => {
    const { getByText } = render(
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Markets', url: 'https://www.wsj.com/news/markets' },
        ]}
      />
    );
    expect(getByText('Markets')).toBeInTheDocument();
  });
});

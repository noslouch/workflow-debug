import React from 'react';
import Pullquote from './index';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Pullquotes', () => {
  test('Should render pullquote text', () => {
    const { getByText } = render(
      <Pullquote content="The problem of assigning credit and rewards for success is a big issue in the sociology of science." />
    );
    expect(
      getByText('The problem of assigning credit and rewards for success is a big issue in the sociology of science.')
    ).toBeInTheDocument();
  });

  test('Should render the author text', () => {
    const { container } = render(
      <Pullquote
        content="‘Healthcare is a paper-based, manual, terrible industry riddled with inefficiency.’"
        author="— Brent Thill, Jefferies"
      />
    );
    const type = container.querySelector('small');
    expect(type).toBeInTheDocument();
  });
});

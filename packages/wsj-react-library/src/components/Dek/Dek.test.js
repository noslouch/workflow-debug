import React from 'react';
import { render } from '@testing-library/react';
import Dek from './index';
import '@testing-library/jest-dom/extend-expect';

describe('Dek', () => {
  test('Should render Dek text', () => {
    const { getByText } = render(<Dek>Sample Dek</Dek>);
    expect(getByText('Sample Dek')).toBeInTheDocument();
  });

  test('Should have correct styles when size m', () => {
    const { container } = render(<Dek>Sample Dek</Dek>);

    expect(container.firstChild).toHaveStyle(`
    line-height: var(--typography-subheading-standard-m-line-height);
    font-family: var(--typography-subheading-standard-m-font-family);
    font-weight: var(--typography-subheading-standard-m-font-weight);
    color: var(--color-nickel)
    `);
  });

  test('Should have correct styles when size s', () => {
    const { container } = render(<Dek size="s">Sample Dek</Dek>);

    expect(container.firstChild).toHaveStyle(`
    line-height: var(--typography-subheading-standard-s-line-height);
    font-family: var(--typography-subheading-standard-s-font-family);
    font-weight: var(--typography-subheading-standard-s-font-weight);
    color: var(--color-nickel)
    `);
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import Headline from './index';
import '@testing-library/jest-dom/extend-expect';

describe('Headlines', () => {
  test('Should render headline text', () => {
    const { getByText } = render(
      <Headline>Tech Shares Start Week Higher</Headline>
    );
    expect(getByText('Tech Shares Start Week Higher')).toBeInTheDocument();
  });

  test('Should use default type and section heading', () => {
    const { container } = render(
      <Headline>Tech Shares Start Week Higher</Headline>
    );
    expect(container.firstChild).toHaveStyle(`
      font-family: var(--typography-headline-standard-xxl-font-family);
    `);
  });

  test('Should render link', () => {
    const { container } = render(
      <Headline>
        <a href="https://www.wsj.com/">Tech Shares Start Week Higher</a>
      </Headline>
    );
    const link = container.querySelector('h1 a');
    expect(link).toBeInTheDocument();
  });

  test('Should pass size and type', () => {
    const { container } = render(
      <Headline size="m" $type="features">
        Tech Shares Start Week Higher
      </Headline>
    );
    expect(container.firstChild).toHaveStyle(`
      font-family: var(--typography-headline-features-m-font-family);
    `);
  });
});

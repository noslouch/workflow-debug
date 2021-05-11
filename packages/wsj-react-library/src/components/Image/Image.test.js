import { render } from '@testing-library/react';
import Image from './index';

describe('Image component', () => {
  test('should render img by default', () => {
    const { container } = render(<Image src="https://foo.bar/" alt="foo" />);
    const image = container.querySelector('img');
    expect(image).toBeInTheDocument();
    expect(image.src).toEqual('https://foo.bar/');
    expect(image.alt).toEqual('foo');
  });

  test('should render amp-img if isAmp is set', () => {
    const { container } = render(<Image src="foo" alt="bar" isAmp />);
    expect(container.querySelector('amp-img')).toBeInTheDocument();
  });
});

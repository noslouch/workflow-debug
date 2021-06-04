import React from 'react';
import { render } from '@testing-library/react';
import ReadToMe from './index';

global.com_marketwatch_audioplayer = jest.fn((element) => {
  const selectedElement = element;
  selectedElement.innerHTML = 'foo';
});

describe('ReadToMe', () => {
  test('Should initialize styles and script', () => {
    const { container } = render(
      <ReadToMe sbid="SB10519382422305624297404587402750456747794" />
    );
    expect(container.parentElement.querySelector('link')).toBeInTheDocument();
    expect(container.parentElement.querySelector('script')).toBeInTheDocument();
  });

  test('com_marketwatch_audiplayer should render', (done) => {
    const { getByText } = render(
      <ReadToMe sbid="SB10519382422305624297404587402750456747794" />
    );

    setTimeout(() => {
      expect(getByText('foo')).toBeInTheDocument();
      done();
    }, 20);
  });
});

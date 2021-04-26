import React from 'react';
import { render, screen } from '@testing-library/react';
import Hat from './index';
import hatData from '../../../__mocks__/hat.json';

const hatBio =
  'News Corp is a global, diversified media and information services company focused on creating and distributing authoritative and engaging content and other products and services.';

const dowJonesLinks = hatData.find((obj) => obj.djLinks).djLinks;
const newsCorpLinks = hatData.find((obj) => obj.ncLinks).ncLinks;

describe('Hat', () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: true,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })),
  });

  test('Should render About WSJ', () => {
    const { getByText } = render(<Hat hatData={hatData} showAboutWsj />);

    expect(getByText('About WSJ')).toBeInTheDocument();
  });

  test('Should not render About WSJ', () => {
    render(<Hat hatData={hatData} showAboutWsj={false} />);
    const aboutWsj = screen.queryByText('About WSJ');

    expect(aboutWsj).toBeNull;
  });

  test('Should render the correct hat bio', () => {
    render(<Hat hatData={hatData} />);

    expect(screen.getByText(hatBio)).toBeInTheDocument();
  });

  test('Should render the correct Dow Jones links titles and href', () => {
    const { getByText } = render(<Hat hatData={hatData} />);

    dowJonesLinks.forEach((link) => {
      const { title, url } = link;
      expect(getByText(title)).toBeInTheDocument();
      expect(getByText(title, { selector: 'a' })).toHaveAttribute('href', url);
    });
  });

  test('Should render the correct News Corp links titles and href', () => {
    const { getByText } = render(<Hat hatData={hatData} />);

    newsCorpLinks.forEach((link) => {
      const { title, url } = link;
      expect(getByText(title)).toBeInTheDocument();
      expect(getByText(title, { selector: 'a' })).toHaveAttribute('href', url);
    });
  });
});

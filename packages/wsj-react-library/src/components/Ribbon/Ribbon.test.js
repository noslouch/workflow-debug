import React from 'react';
import { render } from '@testing-library/react';
import Ribbon from './index';
import ribbonMockData from '../../../__mocks__/ribbon.json';

const { tabs } = ribbonMockData;

test('Ribbon is not renderd when no tabs are provided', () => {
  const { container } = render(<Ribbon />);
  expect(container.firstChild).toBeNull();
});

test('Ribbon renders the correct tabs', () => {
  const tabTitles = ribbonMockData.tabs.map((tab) => tab.title);
  const { getByText } = render(<Ribbon tabs={tabs} />);

  tabTitles.forEach((title) => {
    expect(getByText(title)).toBeInTheDocument();
  });
});

test('Ribbon renders the correct section title', () => {
  const { getByText } = render(
    <Ribbon sectionTitle="Coronavirus" tabs={tabs} />
  );
  expect(getByText('Coronavirus')).toBeInTheDocument();
});

test('Ribbon renders the correct sub hed', () => {
  const { getByText } = render(
    <Ribbon sectionSubHed="Resources" tabs={tabs} />
  );
  expect(getByText('Resources')).toBeInTheDocument();
});

test('Ribbon renders the correct background color when isOpinion is false', () => {
  const { container } = render(<Ribbon isOpinion={false} tabs={tabs} />);
  expect(container.firstChild).toHaveStyle(
    'background-color: var(--color-snow)'
  );
});

test('Ribbon renders the correct background color when isOpinion is true', () => {
  const { container } = render(<Ribbon isOpinion tabs={tabs} />);
  expect(container.firstChild).toHaveStyle('background-color: #f8f7f5');
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import EditionPicker from './index';
import mockData from '../../../__mocks__/edition-picker.json';

test('edition dropdown should be visible when clicked from the unexpanded state', () => {
  render(<EditionPicker {...mockData['na,us']} />);
  const expandEscaper = screen.queryByTestId('expandEscaper');
  const selectedEdition = screen.queryByTestId('selectedEdition');
  expect(selectedEdition.getAttribute('aria-expanded')).toEqual('false');
  expandEscaper.click();
  expect(selectedEdition.getAttribute('aria-expanded')).toEqual('true');
});

test('English edition should be highlighted in the edition dropdown by default', () => {
  render(<EditionPicker {...mockData['na,us']} />);
  const expandEscaper = screen.queryByTestId('expandEscaper');
  expandEscaper.click();
  const computedStyle = window.getComputedStyle(screen.queryByText('English'));
  expect(computedStyle.backgroundColor === 'rgb(249, 249, 249)').toBeTruthy();
});

test('English Edition should display as the selected label when no homepages provided', () => {
  render(<EditionPicker />);
  expect(screen.queryByText('English Edition')).toBeTruthy();
});

test('English Edition should not display as the selected label when provided region matches a homepage provided', () => {
  render(<EditionPicker {...mockData['asia,cn']} />);
  expect(screen.queryByText('English Edition')).toBeFalsy();
});

test('Provided editions should be displayed', () => {
  render(<EditionPicker {...mockData['na,us']} />);
  const expandEscaper = screen.queryByTestId('expandEscaper');
  expandEscaper.click();
  const displayedEditions = screen
    .queryAllByRole('menuitem')
    .map((m) => m.innerHTML);
  mockData['na,us'].homepages
    .map((hp) => hp.label)
    .forEach((label) => {
      expect(displayedEditions.indexOf(label) !== -1).toBeTruthy();
    });
});

test('Only one Chinese edition should display when isChinesePicker is false', () => {
  render(<EditionPicker {...mockData['na,us']} isChinesePicker={false} />);
  const expandEscaper = screen.queryByTestId('expandEscaper');
  expandEscaper.click();
  const displayedEditions = screen
    .queryAllByRole('menuitem')
    .map((m) => m.innerHTML);
  expect(
    displayedEditions.filter((edition) => edition === '中文 (Chinese) ')
  ).toHaveLength(1);
});

test('Both Chinese editions should display when isChinesePicker is true', () => {
  render(<EditionPicker {...mockData['asia,cn']} isChinesePicker={true} />);
  const expandEscaper = screen.queryByTestId('expandEscaper');
  expandEscaper.click();
  const displayedEditions = screen
    .queryAllByRole('menuitem')
    .map((m) => m.innerHTML);
  // debugger;
  expect(displayedEditions.indexOf('简体版') !== -1).toBeTruthy();
  expect(displayedEditions.indexOf('繁體版') !== -1).toBeTruthy();
});

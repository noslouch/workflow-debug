import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditionPicker from './index';
import mockData from '../../../__mocks__/edition-picker.json';

const DATA = mockData['na,us'];

describe('EditionPicker', () => {
  test('edition dropdown should be visible when clicked from the unexpanded state', () => {
    render(<EditionPicker {...DATA} />);

    const button = screen.getByRole('button', { name: 'WSJ Edition Picker' });

    expect(button.getAttribute('aria-expanded')).toBeFalsy();

    userEvent.click(button);
    expect(button.getAttribute('aria-expanded')).toBeTruthy();

    expect(screen.getByText('English')).toBeTruthy();
  });

  test('English edition should be highlighted in the edition dropdown by default', () => {
    render(<EditionPicker {...DATA} />);

    const button = screen.getByRole('button', { name: 'WSJ Edition Picker' });
    userEvent.click(button);

    expect(screen.queryByText('English')).toHaveStyle(
      'background-color: #f9f9f9'
    );
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
    render(<EditionPicker {...DATA} />);

    const button = screen.getByRole('button', { name: 'WSJ Edition Picker' });
    userEvent.click(button);

    const displayedEditions = screen
      .queryAllByRole('listitem')
      .map((m) => m.textContent);

    const expected = DATA.homepages.map((hp) => hp.label);

    expect(expected.sort()).toEqual(displayedEditions.sort());
  });
});

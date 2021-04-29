/* global window */
import { fireEvent, render, screen } from '@testing-library/react';
import PrintButton from '.';

describe('Print Button', () => {
  test('should display browser print modal after clicking', () => {
    jest.spyOn(window, 'print').mockImplementation();

    render(<PrintButton />);
    fireEvent.click(screen.getByRole('button'));

    expect(window.print).toHaveBeenCalled();
  });

  test('should open a new window with document and display browser print modal', () => {
    jest.spyOn(window, 'open').mockImplementation(() => window);
    jest.spyOn(window, 'print').mockImplementation();

    render(
      <PrintButton printURL="https://www.example.com/this-is-a-mock.pdf" />
    );
    fireEvent.click(screen.getByRole('button'));

    expect(window.open).toHaveBeenCalled();
    expect(window.print).toHaveBeenCalled();
  });
});

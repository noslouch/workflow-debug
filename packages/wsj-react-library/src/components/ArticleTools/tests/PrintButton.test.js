/* global window, document */
import { fireEvent, render, screen } from '@testing-library/react';
import PrintButton from '../PrintButton';

describe('Print Button', () => {
  const execCommandRef = document.execCommand;

  beforeAll(() => {
    document.execCommand = jest.fn();
  });

  afterAll(() => {
    // restore document to prevent leaking unto other potential tests
    document.execCommand = execCommandRef;
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test('should open a new window with downloadable document', () => {
    jest.spyOn(window, 'open').mockImplementation();

    render(
      <PrintButton printURL="https://www.example.com/this-is-a-mock.pdf" />
    );
    fireEvent.click(screen.getByRole('button'));

    expect(window.open).toHaveBeenCalled();
  });

  test('should display browser print dialog with document.execCommand(print), such as Safari', () => {
    document.execCommand.mockImplementation(() => true);
    jest.spyOn(window, 'print').mockImplementation();

    render(<PrintButton />);
    fireEvent.click(screen.getByRole('button'));

    expect(document.execCommand).toHaveBeenCalledWith('print', false, null);
    expect(window.print).not.toHaveBeenCalled();
  });

  test('should display browser print dialog with window.print(), such as FireFox', () => {
    document.execCommand.mockImplementation(() => false);
    jest.spyOn(window, 'print').mockImplementation();

    render(<PrintButton />);
    fireEvent.click(screen.getByRole('button'));

    expect(document.execCommand).toHaveBeenCalledWith('print', false, null);
    expect(window.print).toHaveBeenCalled();
  });
});

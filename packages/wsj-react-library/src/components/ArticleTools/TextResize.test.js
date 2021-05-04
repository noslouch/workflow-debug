import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextResize from './TextResize';

describe('Article Tools Text Resize', () => {
  test('should have correct resize options', () => {
    render(<TextResize />);
    userEvent.tab(); // Focus button
    userEvent.keyboard('{Enter}'); // Open popover
    expect(screen.getByText('Small')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('Large')).toBeInTheDocument();
  });

  test('should change text scale css variable', () => {
    render(<TextResize />);
    userEvent.tab(); // Focus button
    userEvent.keyboard('{Enter}'); // Open popover
    const initialScale = document.documentElement.style.getPropertyValue(
      '--article-text-size-scale'
    );
    fireEvent.click(screen.getByText('Medium', { selector: 'button' }));
    const mediumClickScale = document.documentElement.style.getPropertyValue(
      '--article-text-size-scale'
    );
    expect(mediumClickScale).not.toBe(initialScale);
    fireEvent.click(screen.getByText('Large', { selector: 'button' }));
    const largeClickScale = document.documentElement.style.getPropertyValue(
      '--article-text-size-scale'
    );
    expect(largeClickScale).not.toBe(mediumClickScale);
  });
});

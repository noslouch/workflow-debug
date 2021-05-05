/* global document */
import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { fireEvent } from '@testing-library/react';

import useCloseViaKeyboard from '.';

describe('useCloseViaKeyboard', () => {
  test('should invoke the external toggle function', () => {
    const toggleFn = jest.fn();
    renderHook(() => useCloseViaKeyboard(true, toggleFn));

    fireEvent.focusIn(document);
    expect(toggleFn).toHaveBeenCalled();
  });

  test('should not invoke the external toggle function when the target is not inside of the ref', () => {
    jest.spyOn(React, 'useRef').mockReturnValueOnce({
      current: document,
    });
    const toggleFn = jest.fn();
    renderHook(() => useCloseViaKeyboard(true, toggleFn));

    fireEvent.focusIn(document);
    expect(toggleFn).not.toHaveBeenCalled();
  });

  test('should invoke the internal setIsExpanded', () => {
    const { result } = renderHook(() => useCloseViaKeyboard());

    act(() => {
      result.current.setIsExpanded(true);
    });

    act(() => {
      fireEvent.focusIn(document);
    });

    expect(result.current.isExpanded).toBe(false);
  });
});

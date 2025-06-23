import { renderHook } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import React from 'react';
import { useClickOutside } from './useClickOutside';

describe('useClickOutside', () => {
  it('should call the handler when a click occurs outside the element', () => {
    const handler = jest.fn();
    const ref = React.createRef();
    ref.current = document.createElement('div');
    
    renderHook(() => useClickOutside([ref], handler));

    // Simulate a click on the body which is outside the ref element
    fireEvent.mouseDown(document.body);

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should not call the handler when a click occurs inside the element', () => {
    const handler = jest.fn();
    const ref = React.createRef();
    ref.current = document.createElement('div');

    // To simulate an inside click, we'll append the ref'd element to the body
    document.body.appendChild(ref.current);

    renderHook(() => useClickOutside([ref], handler));
    
    // Simulate a click on the element itself
    fireEvent.mouseDown(ref.current);

    expect(handler).not.toHaveBeenCalled();
    
    // Cleanup
    document.body.removeChild(ref.current);
  });

  it('should not call the handler if the ref is not set', () => {
    const handler = jest.fn();
    const ref = { current: null };

    renderHook(() => useClickOutside([ref], handler));

    fireEvent.mouseDown(document.body);

    expect(handler).not.toHaveBeenCalled();
  });
}); 
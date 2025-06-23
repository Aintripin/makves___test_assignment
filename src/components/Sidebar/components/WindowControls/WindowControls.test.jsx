import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { darkTheme } from '../../../../themes';
import WindowControls from './WindowControls';

describe('WindowControls', () => {
  const renderWithTheme = (component) => {
    return render(<ThemeProvider theme={darkTheme}>{component}</ThemeProvider>);
  };

  it('should render all three window control buttons', () => {
    renderWithTheme(<WindowControls />);
    
    expect(screen.getByLabelText('close')).toBeInTheDocument();
    expect(screen.getByLabelText('minimize')).toBeInTheDocument();
    expect(screen.getByLabelText('maximize')).toBeInTheDocument();
  });
}); 
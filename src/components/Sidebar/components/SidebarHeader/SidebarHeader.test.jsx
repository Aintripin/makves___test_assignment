import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import SidebarHeader from './SidebarHeader';
import { darkTheme } from '../../../../themes';

describe('SidebarHeader', () => {
    const renderWithTheme = (props) => {
        return render(
            <ThemeProvider theme={darkTheme}>
                <SidebarHeader {...props} />
            </ThemeProvider>
        );
    };

    it('should always render the logo image', () => {
        renderWithTheme({ isVisible: true, isCollapsed: false });
        expect(screen.getByAltText('Technifly Logo')).toBeInTheDocument();
    });

    it('should render the logo text when not collapsed', () => {
        renderWithTheme({ isVisible: true, isCollapsed: false });
        expect(screen.getByText('Technifly')).toBeInTheDocument();
    });

    it('should not render the logo text when collapsed', () => {
        renderWithTheme({ isVisible: true, isCollapsed: true });
        expect(screen.queryByText('Technifly')).not.toBeInTheDocument();
    });

    it('should be visible when isVisible is true', () => {
        const { container } = renderWithTheme({ isVisible: true, isCollapsed: false });
        const logoWrapper = container.querySelector('a');
        expect(logoWrapper).toHaveStyle('opacity: 1');
    });

    it('should be hidden when isVisible is false', () => {
        const { container } = renderWithTheme({ isVisible: false, isCollapsed: false });
        const logoWrapper = container.querySelector('a');
        expect(logoWrapper).toHaveStyle('opacity: 0');
    });
}); 
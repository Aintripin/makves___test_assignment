import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import NavigationLinks from './NavigationLinks';
import { darkTheme } from '../../../../themes';

describe('NavigationLinks', () => {
    const defaultProps = {
        isCollapsed: false,
        isExpanded: true,
        showIcons: true,
        showLabels: true,
        activeItem: 'Dashboard',
        onItemClick: jest.fn(),
    };

    const renderWithTheme = (props) => {
        return render(
            <ThemeProvider theme={darkTheme}>
                <NavigationLinks {...defaultProps} {...props} />
            </ThemeProvider>
        );
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render all main navigation links', () => {
        renderWithTheme();
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Sales')).toBeInTheDocument();
        expect(screen.getByText('Costs')).toBeInTheDocument();
        expect(screen.getByText('Payments')).toBeInTheDocument();
        expect(screen.getByText('Finances')).toBeInTheDocument();
        expect(screen.getByText('Messages')).toBeInTheDocument();
    });

    it('should show sub-menu items for the active link', () => {
        renderWithTheme({ activeItem: 'Projects' });
        expect(screen.queryByText('Recent')).not.toBeInTheDocument();
    });

    it('should not show sub-menu items for an inactive link', () => {
        renderWithTheme({ activeItem: 'Dashboard' });
        expect(screen.queryByText('Recent')).not.toBeInTheDocument();
    });

    it('should display a notification dot for the Messages link', () => {
        renderWithTheme();
        const messagesIcon = screen.getByTestId('mock-icon-Mail');
        const notificationDot = messagesIcon.parentElement.querySelector('.notification-dot');
        expect(notificationDot).toBeInTheDocument();
    });

    it('should call onItemClick when a main link is clicked', () => {
        renderWithTheme();
        fireEvent.click(screen.getByText('Sales'));
        expect(defaultProps.onItemClick).toHaveBeenCalledWith('Sales', expect.anything());
    });

    it('should show tooltips on hover when collapsed', async () => {
        renderWithTheme({ isCollapsed: true });

        const salesIcon = screen.getByTestId('mock-icon-ChartLine').closest('a');
        fireEvent.mouseEnter(salesIcon);

        const tooltip = await screen.findByText('Sales', { selector: 'span.tooltip' });
        expect(tooltip).toBeInTheDocument();
    });
}); 
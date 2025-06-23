import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import CollapseControl from './CollapseControl';
import { darkTheme } from '../../../../themes';
import { transitionSpeed } from '../../Sidebar.styled';

// Mock Lucide icons
jest.mock('lucide-react', () => ({
    ChevronLeft: () => <div data-testid="chevron-left" />,
}));

describe('CollapseControl', () => {
    const defaultProps = {
        isVisible: true,
        isCollapsed: false,
        isCollapsing: false,
        onToggleCollapse: jest.fn(),
    };

    const renderWithTheme = (props) => {
        return render(
            <ThemeProvider theme={darkTheme}>
                <CollapseControl {...defaultProps} {...props} />
            </ThemeProvider>
        );
    };

    beforeAll(() => {
        // Mock setTimeout to control timers in tests
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should be visible when isVisible is true', () => {
        const { container } = renderWithTheme({ isVisible: true });
        expect(container.firstChild).toHaveStyle('opacity: 1');
    });

    it('should be hidden when isVisible is false', () => {
        const { container } = renderWithTheme({ isVisible: false });
        expect(container.firstChild).toHaveStyle('opacity: 0');
    });

    it('should call onToggleCollapse when the button is clicked', () => {
        renderWithTheme();
        fireEvent.click(screen.getByLabelText('Toggle sidebar'));
        expect(defaultProps.onToggleCollapse).toHaveBeenCalledTimes(1);
    });

    it('should not rotate the icon when expanded', () => {
        renderWithTheme({ isCollapsed: false });
        const button = screen.getByLabelText('Toggle sidebar');
        expect(button).toHaveStyle('transform: rotate(0deg)');
    });

    it('should rotate the icon 180 degrees when collapsed', () => {
        renderWithTheme({ isCollapsed: true });
        const button = screen.getByLabelText('Toggle sidebar');
        expect(button).toHaveStyle('transform: rotate(180deg)');
    });

    it('should display "S H R I N K" tooltip when expanded', () => {
        renderWithTheme({ isCollapsed: false });
        expect(screen.getByText('S H R I N K')).toBeInTheDocument();
    });

    it('should display "E X P A N D" tooltip after collapsing', () => {
        const { rerender } = renderWithTheme({ isCollapsed: false });

        // Initial state
        expect(screen.getByText('S H R I N K')).toBeInTheDocument();

        // Re-render as collapsed
        rerender(
            <ThemeProvider theme={darkTheme}>
                <CollapseControl {...defaultProps} isCollapsed={true} />
            </ThemeProvider>
        );
        
        // Fast-forward timers
        act(() => {
            jest.advanceTimersByTime(parseFloat(transitionSpeed) * 1000);
        });

        expect(screen.getByText('E X P A N D')).toBeInTheDocument();
    });
}); 
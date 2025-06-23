import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import ProfileSection from './ProfileSection';
import { darkTheme } from '../../../../themes';

describe('ProfileSection', () => {
    const defaultProps = {
        isVisible: true,
        isCollapsed: false,
        isActive: false,
        onClick: jest.fn(),
        profileBtnRef: React.createRef(),
    };

    const renderWithTheme = (props) => {
        return render(
            <ThemeProvider theme={darkTheme}>
                <ProfileSection {...defaultProps} {...props} />
            </ThemeProvider>
        );
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should always render the user avatar', () => {
        renderWithTheme();
        expect(screen.getByAltText('User Avatar')).toBeInTheDocument();
    });

    it('should show user details and options when expanded', () => {
        renderWithTheme({ isCollapsed: false });
        expect(screen.getByText('Mark T.')).toBeInTheDocument();
        expect(screen.getByText('User Account')).toBeInTheDocument();
        // The Chevron icons are inside the options icon
        expect(screen.getByTestId('mock-icon-ChevronUp')).toBeInTheDocument();
        expect(screen.getByTestId('mock-icon-ChevronDown')).toBeInTheDocument();
    });

    it('should not render user details and options when collapsed', () => {
        renderWithTheme({ isCollapsed: true });
        expect(screen.queryByText('Mark T.')).not.toBeInTheDocument();
        expect(screen.queryByText('User Account')).not.toBeInTheDocument();
        expect(screen.queryByTestId('mock-icon-ChevronUp')).not.toBeInTheDocument();
        expect(screen.queryByTestId('mock-icon-ChevronDown')).not.toBeInTheDocument();
    });

    it('should call onClick when the section is clicked', () => {
        const { container } = renderWithTheme();
        fireEvent.click(container.firstChild);
        expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
    });

    it('should have an active class when isActive is true', () => {
        const { container } = renderWithTheme({ isActive: true });
        expect(container.firstChild).toHaveClass('active');
    });
}); 
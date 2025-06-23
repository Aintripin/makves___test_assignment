import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import UserPopup from './UserPopup';
import { darkTheme } from '../../../../themes';

describe('UserPopup', () => {
    const defaultProps = {
        isVisible: true,
        isCollapsed: false,
        showHeader: false,
        showLinks: [],
        showDelimiter: false,
        showFooter: false,
        showLogout: false,
    };

    const renderWithTheme = (props) => {
        const popupRef = React.createRef();
        const finalProps = { ...defaultProps, ...props };
        return render(
            <ThemeProvider theme={darkTheme}>
                <UserPopup popupRef={popupRef} {...finalProps} />
            </ThemeProvider>
        );
    };

    it('should be hidden when isVisible is false', () => {
        const { container } = renderWithTheme({ isVisible: false });
        const popupContainer = container.firstChild;
        expect(popupContainer).toHaveStyle('opacity: 0');
        expect(popupContainer).toHaveStyle('pointer-events: none');
    });

    it('should be visible when isVisible is true', () => {
        const { container } = renderWithTheme({ isVisible: true });
        const popupContainer = container.firstChild;
        expect(popupContainer).toHaveStyle('opacity: 1');
        expect(popupContainer).toHaveStyle('pointer-events: auto');
    });

    it('should show header when showHeader is true', () => {
        renderWithTheme({ showHeader: true });
        const headerElement = screen.getByText('Mark Talbierz').parentElement.parentElement;
        expect(headerElement).toHaveStyle('opacity: 1');
    });

    it('should apply visibility to links based on showLinks prop', () => {
        renderWithTheme({ showLinks: [0, 2] });

        const profileLink = screen.getByText('View profile').closest('li');
        const subscriptionLink = screen.getByText('Manage subscriptions').closest('li');
        const historyLink = screen.getByText('View history').closest('li');

        expect(profileLink).toHaveStyle('opacity: 1');
        expect(subscriptionLink).toHaveStyle('opacity: 0');
        expect(historyLink).toHaveStyle('opacity: 1');
    });

    it('should show delimiter when showDelimiter is true', () => {
        const { container } = renderWithTheme({ showDelimiter: true });
        const popupLinks = screen.getByRole('list');
        const delimiter = popupLinks.nextSibling;
        expect(delimiter).toHaveStyle('opacity: 1');
    });

    it('should show footer and logout when their props are true', () => {
        renderWithTheme({ showFooter: true, showLogout: true });
        const versionInfo = screen.getByText(/v 1.0.34/);
        const logoutButton = screen.getByText('Logout').closest('a');

        expect(versionInfo).toHaveStyle('opacity: 1');
        expect(logoutButton).toHaveStyle('opacity: 1');
    });
}); 
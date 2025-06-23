import styled, { css } from 'styled-components';
import { User, CreditCard, Clock, LogOut } from 'lucide-react';
import { 
    sidebarWidthCollapsed, 
    sidebarWidthExpanded, 
    slideUpFadeIn 
} from '../../Sidebar.styled';

const PopupContainer = styled.div`
    position: absolute;
    bottom: 0;
    
    left: 100%;
    margin-left: 10px;

    width: 280px;
    background: ${props => props.theme.bgLight};
    border-radius: 12px;
    padding: 0;
    box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
    z-index: 100;
    border: 1px solid ${props => props.theme.borderLight};
    
    opacity: ${props => (props.$isVisible ? 1 : 0)};
    transform: ${props => (props.$isVisible ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.98)')};
    transform-origin: bottom left;
    pointer-events: ${props => (props.$isVisible ? 'auto' : 'none')};
    transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
`;

const PopupHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    border-bottom: 1px solid ${props => props.theme.borderLight};
    opacity: ${props => (props.$showHeader ? 1 : 0)};
    animation: ${props => props.$showHeader && css`${slideUpFadeIn} 0.3s ease-out`};
`;

const UserAvatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    flex-shrink: 0;
`;

const UserDetails = styled.div`
    display: flex;
    flex-direction: column;
`;

const UserNameFull = styled.span`
    font-weight: 600; 
    color: ${props => props.theme.accentSecondary};
    font-size: 16px;
`;

const UserEmail = styled.span`
    font-size: 14px; 
    color: ${props => props.theme.textSecondary};
`;

const PopupLinks = styled.ul`
    padding: 0.5rem 1rem;
    list-style: none;
    margin: 0;
`;

const PopupLinkItem = styled.li`
    opacity: ${props => (props.$isVisible ? 1 : 0)};
    animation: ${props => props.$isVisible && css`${slideUpFadeIn} 0.3s ease-out`};

    a {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem;
        font-size: 14px;
        color: ${props => props.theme.textPrimary};
        text-decoration: none;
        transition: background-color 0.2s;

        &:hover { 
            background-color: ${props => props.theme.bgLight2}; 
        }
    }
`;

const PopupDelimiter = styled.div`
    border-top: 1px solid ${props => props.theme.borderLight};
    opacity: ${props => (props.$isVisible ? 1 : 0)};
    transition: opacity 0.3s ease-out;
`;

const PopupFooter = styled.div`
    padding: 1rem;
`;

const PopupLogout = styled.a`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    border-radius: 0.5rem;
    font-size: 14px;
    font-weight: 500;
    color: ${props => props.theme.textSecondary};
    text-decoration: none;
    transition: all 0.2s;
    opacity: ${props => (props.$showLogout ? 1 : 0)};
    animation: ${props => props.$showLogout && css`${slideUpFadeIn} 0.3s ease-out`};
    
    &:hover {
        background-color: ${props => props.theme.bgLight2};
        color: #EF4444;
    }
`;

const VersionInfo = styled.div`
    font-size: 12px;
    color: ${props => props.theme.textSecondary};
    text-align: left;
    margin-top: 0.5rem;
    padding: 0 0.75rem;
    opacity: ${props => (props.$showFooter ? 1 : 0)};
    animation: ${props => props.$showFooter && css`${slideUpFadeIn} 0.3s ease-out`};

    a {
        text-decoration: underline;
        color: inherit;
    }
`;

const popupLinks = [
    { title: 'View profile' },
    { title: 'Manage subscriptions' },
    { title: 'View history' },
];

const UserPopup = ({ 
    isVisible, 
    isCollapsed, 
    showHeader, 
    showLinks, 
    showDelimiter, 
    showFooter,
    showLogout,
    popupRef 
}) => {
    return (
        <PopupContainer 
            $isVisible={isVisible} 
            $isCollapsed={isCollapsed}
            ref={popupRef}
        >
            <PopupHeader $showHeader={showHeader}>
                <UserAvatar src="https://i.pravatar.cc/40?u=mark" alt="User Avatar" />
                <UserDetails>
                    <UserNameFull>Mark Talbierz</UserNameFull>
                    <UserEmail>hello@talbierz.com</UserEmail>
                </UserDetails>
            </PopupHeader>

            <PopupLinks>
                {popupLinks.map((link, index) => (
                    <PopupLinkItem key={link.title} $isVisible={showLinks.includes(index)}>
                        <a href="#">
                            {link.title}
                        </a>
                    </PopupLinkItem>
                ))}
            </PopupLinks>

            <PopupDelimiter $isVisible={showDelimiter} />

            <PopupFooter>
                <PopupLogout href="#" $showLogout={showLogout}>
                    <span>Logout</span>
                    <LogOut size={16} />
                </PopupLogout>
                <VersionInfo $showFooter={showFooter}>
                    v 1.0.34 - <a href="#">Terms and Conditions</a>
                </VersionInfo>
            </PopupFooter>
        </PopupContainer>
    );
};

export default UserPopup; 
import styled, { css } from 'styled-components';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { transitionSpeed, slideUpFadeIn } from '../../Sidebar.styled';

const ProfileContainer = styled.div`
    position: relative;
    cursor: pointer;
    transition: background-color 0.2s ease-out;

    margin: 0 ${props => (props.$isCollapsed ? '-1rem' : '-1.5rem')} -1.5rem;
    padding: 1rem ${props => (props.$isCollapsed ? '1rem' : '1.5rem')} 1.5rem;
    border-radius: 0 0 1.5rem 1.5rem;

    &:hover,
    &.active {
        background-color: ${props => props.theme.bgLight2};
    }
    
    ${props => props.$isActive && css`
        background-color: ${props => props.theme.bgLight2};
    `}
`;

const UserProfile = styled.div`
    display: flex;
    align-items: center;
    gap: ${props => (props.$isCollapsed ? '0' : '0.75rem')};
    position: relative;
    opacity: ${props => (props.$isVisible ? 1 : 0)};
    animation: ${props => props.$isVisible && css`${slideUpFadeIn} 0.4s ease-out 0.46s both`};
    
    justify-content: flex-start;
    transition: gap ${transitionSpeed} ease-out;
`;

const UserAvatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    flex-shrink: 0;

    margin-left: ${props => (props.$isCollapsed ? '10px' : '0')};
    transition: margin-left ${transitionSpeed} ease-out;
`;

const UserDetails = styled.div`
    display: flex;
    flex-direction: column;
    white-space: nowrap;
    overflow: hidden;
    max-width: ${props => (props.$isCollapsed ? '0' : '120px')};
    opacity: ${props => (props.$isCollapsed ? '0' : '1')};
    transition: opacity ${transitionSpeed} ease-out 0.1s, max-width ${transitionSpeed} ease-out;

    .user-role {
        font-size: 12px;
        color: ${props => props.theme.textSecondary};
    }
    .user-name {
        font-weight: 600;
        color: ${props => props.theme.accentSecondary};
        font-size: 18px;
    }
`;

const UserOptionsIcon = styled.div`
    margin-left: auto;
    opacity: ${props => (props.$isCollapsed ? '0' : '1')};
    transition: opacity ${transitionSpeed} ease-out;
    flex-shrink: 0;
    background: ${props => props.theme.bodyBg};
    border-radius: 6px;
    padding: 4px;
    width: 32px;
    height: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    
    .arrow {
        color: ${props => props.theme.textPrimary};
        line-height: 1;
    }
`;

const ChevronContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: ${props => (props.$isExpanded ? 1 : 0)};
    transition: opacity 0.2s 0.1s;
`;

const ProfileSection = ({ 
    isVisible, 
    isCollapsed, 
    isActive, 
    onClick, 
    profileBtnRef 
}) => {
    return (
        <ProfileContainer
            onClick={onClick}
            ref={profileBtnRef}
            $isCollapsed={isCollapsed}
            $isActive={isActive}
            className={isActive ? 'active' : ''}
        >
            <UserProfile 
                $isVisible={isVisible} 
                $isCollapsed={isCollapsed}
            >
                <UserAvatar src="https://i.pravatar.cc/40?u=mark" alt="User Avatar" $isCollapsed={isCollapsed} />
                {!isCollapsed && (
                    <>
                        <UserDetails $isCollapsed={isCollapsed}>
                            <span className="user-role">User Account</span>
                            <span className="user-name">Mark T.</span>
                        </UserDetails>
                        <UserOptionsIcon $isCollapsed={isCollapsed}>
                            <ChevronUp size={12} strokeWidth={3} className="arrow" />
                            <ChevronDown size={12} strokeWidth={3} className="arrow" />
                        </UserOptionsIcon>
                    </>
                )}
            </UserProfile>
        </ProfileContainer>
    );
};

export default ProfileSection; 
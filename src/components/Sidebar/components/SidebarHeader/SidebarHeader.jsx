import styled, { css } from 'styled-components';
import { transitionSpeed, aggressiveUnfold } from '../../Sidebar.styled';
import logoUrl from '../../../../assets/logo.png';

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    padding: 0 0.5rem;
    position: relative;

    width: 100%;
    justify-content: ${props => (props.$isCollapsed ? 'center' : 'flex-start')};
    transition: justify-content ${transitionSpeed} ease-out;
`;

const LogoWrapper = styled.a`
    align-items: center;
    text-decoration: none;
    color: inherit;
    opacity: ${props => props.$isVisible ? 1 : 0};
    animation: ${props => props.$isVisible ? css`${aggressiveUnfold} 0.4s cubic-bezier(0.19, 1, 0.22, 1) 0.2s both` : 'none'};
    
    position: relative; 
    display: block;
    height: 40px;
    
    width: ${props => (props.$isCollapsed ? '40px' : '100%')};
    transition: width ${transitionSpeed} ease-out;
`;

const LogoImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 8px;
    
    position: absolute;
    left: 0;
    top: 0;
`;

const LogoText = styled.span`
    font-size: 1.25rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    display: ${props => (props.$isCollapsed ? 'none' : 'block')};
    clip-path: ${props => (props.$isCollapsed 
        ? 'inset(0 100% 0 0)'
        : 'inset(0 0% 0 0)'
    )};
    transition: clip-path 0.3s ease-out;
    color: ${props => props.theme.logoCaption};
    
    padding-left: 52px;
    line-height: 40px;
`;

const SidebarHeader = ({ isVisible, isCollapsed }) => {
    return (
        <HeaderContainer $isCollapsed={isCollapsed}>
            <LogoWrapper href="#" $isVisible={isVisible} $isCollapsed={isCollapsed}>
                <LogoImage src={logoUrl} alt="Technifly Logo" />
                {!isCollapsed && (
                    <LogoText $isCollapsed={isCollapsed}>Technifly</LogoText>
                )}
            </LogoWrapper>
        </HeaderContainer>
    );
};

export default SidebarHeader; 
import { keyframes, css } from 'styled-components';
import styled from 'styled-components';

export const transitionSpeed = '0.3s';
export const sidebarWidthExpanded = '280px';

// Window control dimensions
export const windowControlSize = '12px';
export const windowControlGap = '8px';
export const windowControlPadding = '20px'; // Consistent padding for both states

// Calculate collapsed width: padding + dots + gaps = 20px + 20px + (12px + 8px + 12px + 8px + 12px) = 92px
export const sidebarWidthCollapsed = `${parseInt(windowControlPadding) * 2 + parseInt(windowControlSize) * 3 + parseInt(windowControlGap) * 2}px`;

// Constants for dynamic sizing
export const chevronSize = '36px';
export const chevronOffset = '40px'; // Distance from right edge

// Calculate the correct chevron movement distance
// The chevron should move RIGHT by about 23px when collapsed
export const chevronMoveDistance = 23; // Move RIGHT by this amount

// Keyframes for page load animations
export const sidebarFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const itemFadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const slideFromBottom = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const activeBarSlide = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const fadeInSlide = keyframes`
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const chevronSlideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50%) translateX(120px);
  }
  to {
    opacity: 1;
    transform: translateY(-50%) translateX(0);
  }
`;

export const slideFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const slideFromUnder = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const tooltipFadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-20px);
  }
`;

export const chevronCollapseMove = keyframes`
  from {
    transform: translateY(-50%) translateX(0) rotate(0deg);
  }
  to {
    transform: translateY(-50%) translateX(${chevronMoveDistance}px) rotate(180deg);
  }
`;

export const chevronExpandMove = keyframes`
  from {
    transform: translateY(-50%) translateX(${chevronMoveDistance}px) rotate(180deg);
  }
  to {
    transform: translateY(-50%) translateX(0) rotate(0deg);
  }
`;

export const slideUpFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const chevronInitialSlideIn = keyframes`
  from {
    left: ${sidebarWidthExpanded};
    opacity: 0;
  }
  to {
    left: calc(${sidebarWidthExpanded} - 18px); /* 18px is half chevron width */
    opacity: 1;
  }
`;

export const unfoldAndFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const slideUpAndFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const chevronEntrance = keyframes`
  from {
    opacity: 0;
    transform: translateX(70px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const aggressiveUnfold = keyframes`
  from {
    opacity: 0;
    transform: translateY(-25px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const SidebarWrapper = styled.div`
  position: relative;
  margin: 2rem;
  
  /* This variable is now available to all children, including the chevron */
  --sidebar-bg-color: ${props => props.theme.bgLight};
`;

export const SidebarNav = styled.nav`
    display: flex;
    flex-direction: column;
    width: ${props => (props.$isCollapsed ? sidebarWidthCollapsed : sidebarWidthExpanded)};
    height: calc(100vh - 4rem);
    background-color: var(--sidebar-bg-color); /* Use the variable */
    border-radius: 1.5rem;
    padding: 0;
    box-shadow: 0 10px 30px rgba(0,0,0,0.07);
    position: relative;
    z-index: 10;
    border: 1px solid ${props => props.theme.borderLight};
    overflow: visible; /* Allow chevron and other elements to extend outside */
    
    /* Stay left-aligned but adjust margin to create symmetric shrink effect */
    margin-left: ${props => props.$isCollapsed 
        ? `calc((${sidebarWidthExpanded} - ${sidebarWidthCollapsed}) / 2)` 
        : '0'};
    transition: width ${transitionSpeed} ease-out, margin-left ${transitionSpeed} ease-out;

    ${props => props.$isLoading && css`
        animation: ${sidebarFadeIn} 0.6s ease-out;
    `}
`;

export const SidebarContent = styled.div`
    flex: 1;
    padding: 3rem ${props => props.$isCollapsed ? '1rem' : '1.5rem'} 1.5rem;
    display: flex;
    flex-direction: column;
    transition: padding ${transitionSpeed} ease-out;
`;

export const ProfileDelimiter = styled.div`
    border-top: 1px solid ${props => props.theme.borderLight};
    opacity: ${props => (props.$isVisible ? 1 : 0)};
    animation: ${props => props.$isVisible && css`${itemFadeIn} 0.4s ease-out 0.46s both`};
    
    /* Full width delimiter that spans the entire sidebar width */
    margin: 1rem ${props => props.$isCollapsed ? '-1rem' : '-1.5rem'} 0;
    width: auto;
`;
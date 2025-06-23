import styled, { css } from 'styled-components';
import {
    LayoutGrid, ChartLine, BarChart3, CreditCard, ChartPie,
    Mail, Settings, CircleHelp
} from 'lucide-react';
import { transitionSpeed, unfoldAndFadeIn, fadeInSlide, itemFadeIn, slideUpAndFadeIn } from '../../Sidebar.styled';

const SidebarLinks = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    width: ${props => (props.$isCollapsed ? '48px' : '100%')};
    margin-left: ${props => (props.$isCollapsed ? 'auto' : '0')};
    margin-right: ${props => (props.$isCollapsed ? 'auto' : '0')};
    transition: width ${transitionSpeed} ease-out, margin-left ${transitionSpeed} ease-out, margin-right ${transitionSpeed} ease-out;

    animation: ${props => props.$isVisible ? css`${unfoldAndFadeIn} 0.4s ease-out ${props.$delay}s both` : 'none'};

    &.bottom {
        animation-name: ${slideUpAndFadeIn};
    }
`;

const NavItem = styled.li`
    opacity: ${props => props.$isVisible ? 1 : 0};
    animation: ${props => props.$isVisible ? css`${unfoldAndFadeIn} 0.4s ease-out ${props.$delay}s both` : 'none'};

    &.bottom {
        animation-name: ${slideUpAndFadeIn};
    }
    overflow: visible;
`;

const NavLink = styled.a`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: ${props => (props.$isCollapsed ? '0' : '0.75rem 0.5rem')};
    border-radius: 1rem;
    color: ${props => props.theme.textSecondary};
    font-weight: 700;
    font-size: 16px;
    text-decoration: none;
    transition: all 0.2s ease, height ${transitionSpeed} ease-out, padding ${transitionSpeed} ease-out;
    position: relative;
    
    justify-content: flex-start;
    width: 100%; 
    height: ${props => (props.$isCollapsed ? '48px' : 'auto')};
    
    &:not(.active):hover {
        background-color: ${props => props.theme.bgLight2};
        color: ${props => props.theme.textPrimary};
    }
    
    &.active {
        color: ${props => props.theme.textPrimary};
        font-weight: 800;
        
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: ${props => props.theme.accentPrimary};
            border-radius: 1rem;
            z-index: -1;
        }
    }

    &:hover .tooltip {
        opacity: 1;
        transform: translateX(0);
        transition-delay: 0.2s;
    }

    .icon-wrapper {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        flex-shrink: 0;
        z-index: 1;
        
        margin-left: ${props => (props.$isCollapsed ? '12px' : '0')};
        transition: margin-left ${transitionSpeed} ease-out;
    }

    .notification-dot {
        position: absolute;
        bottom: -2px;
        right: -2px;
        width: 12px;
        height: 12px;
        background: #EF4444;
        border-radius: 50%;
        border: 2px solid ${props => props.theme.bgLight};
    }
`;

const LinkText = styled.span`
    white-space: nowrap;
    overflow: hidden;
    display: ${props => (props.$isCollapsed ? 'none' : 'block')};
    clip-path: ${props => (props.$isCollapsed 
        ? 'inset(0 100% 0 0)'
        : 'inset(0 0% 0 0)'
    )};
    transition: clip-path 0.3s ease-out;
    z-index: 1;
    position: relative;
`;

const Tooltip = styled.span`
    position: absolute;
    left: calc(100% - 10px);
    top: 5px;
    transform: translateX(-10px);
    
    background-color: ${props => props.theme.tooltipBg};
    color: ${props => props.theme.tooltipText};
    font-size: 16px;
    font-weight: 600;
    padding: 8px 12px;
    border-radius: 8px;
    white-space: nowrap;
    z-index: 100;
    
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease-out, transform 0.2s ease-out;
`;

const SidebarBottom = styled.div`
    margin-top: auto;
    padding-top: 1rem;
    opacity: ${props => (props.$isVisible ? 1 : 0)};
    animation: ${props => props.$isVisible && css`${itemFadeIn} 0.4s ease-out 0.4s both`};
`;

const mainRoutes = [
    { title: 'Dashboard', icon: LayoutGrid, path: '#', delay: 0.3 },
    { title: 'Sales', icon: ChartLine, path: '#', delay: 0.38 },
    { title: 'Costs', icon: BarChart3, path: '#', delay: 0.46 },
    { title: 'Payments', icon: CreditCard, path: '#', delay: 0.54 },
    { title: 'Finances', icon: ChartPie, path: '#', delay: 0.62 },
    { title: 'Messages', icon: Mail, path: '#', hasNotification: true, delay: 0.70 },
];

const bottomRoutes = [
    { title: 'Support', icon: CircleHelp, path: '#', delay: 0.8 },
    { title: 'Settings', icon: Settings, path: '#', delay: 0.88 },
];

const NavigationLinks = ({ 
    isCollapsed, 
    showNavItems, 
    showBottomSection, 
    showBottomItems, 
    activeItem, 
    onItemClick 
}) => {
    return (
        <>
            <SidebarLinks $isCollapsed={isCollapsed}>
                {mainRoutes.map((route) => (
                    <NavItem key={route.title} $isVisible={showNavItems} $delay={route.delay} $isCollapsed={isCollapsed}>
                        <NavLink 
                            href={route.path} 
                            className={activeItem === route.title ? 'active' : ''} 
                            onClick={(e) => onItemClick(route.title, e)}
                            $isCollapsed={isCollapsed}
                        >
                            <div className="icon-wrapper">
                                <route.icon size={20} />
                                {route.hasNotification && <div className="notification-dot" />}
                            </div>
                            <LinkText $isCollapsed={isCollapsed}>
                                {route.title}
                            </LinkText>
                            {isCollapsed && <Tooltip className="tooltip">{route.title}</Tooltip>}
                        </NavLink>
                    </NavItem>
                ))}
            </SidebarLinks>

            <SidebarBottom $isVisible={showBottomSection}>
                <SidebarLinks $isCollapsed={isCollapsed}>
                    {bottomRoutes.map((route) => (
                        <NavItem key={route.title} $isVisible={showBottomItems} $delay={route.delay} $isCollapsed={isCollapsed} className="bottom">
                            <NavLink 
                                href={route.path} 
                                className={activeItem === route.title ? 'active' : ''} 
                                onClick={(e) => onItemClick(route.title, e)}
                                $isCollapsed={isCollapsed}
                            >
                                <div className="icon-wrapper">
                                    <route.icon size={20} />
                                </div>
                                <LinkText $isCollapsed={isCollapsed}>
                                    {route.title}
                                </LinkText>
                                {isCollapsed && <Tooltip className="tooltip">{route.title}</Tooltip>}
                            </NavLink>
                        </NavItem>
                    ))}
                </SidebarLinks>
            </SidebarBottom>
        </>
    );
};

export default NavigationLinks; 
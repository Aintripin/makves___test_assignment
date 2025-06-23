import styled, { css } from 'styled-components';
import { ChevronLeft } from 'lucide-react';
import { 
    sidebarWidthCollapsed, 
    sidebarWidthExpanded, 
    transitionSpeed, 
    chevronSize,
    tooltipFadeOut,
    chevronEntrance
} from '../../Sidebar.styled';
import { useState, useEffect, useRef } from 'react';

const CollapseControlWrapper = styled.div`
    position: absolute; 
    top: 64px; /* Lock vertical position to align with header */
    
    /* Correctly position the control based on sidebar state */
    left: ${props => props.$isCollapsed 
        ? `calc(${sidebarWidthCollapsed} + 100px)` /* 10px to the right of the collapsed bar */
        : `calc(${sidebarWidthExpanded} - (${chevronSize} / 2))` /* Centered on the expanded bar edge */
    };
    
    width: auto; /* Allow wrapper to contain the tooltip */
    height: ${chevronSize};
    
    opacity: ${props => (props.$isVisible ? 1 : 0)};
    
    /* Apply animation only on initial load */
    ${props => props.$applyAnimation && css`
        animation: ${chevronEntrance} 0.8s cubic-bezier(0.42, 0, 0.58, 1) both;
    `}

    transition: 
        left ${transitionSpeed} ease-out,
        opacity 0.4s ease-out;
    z-index: 50; 

    &:hover .shrink-tooltip-wrapper {
        clip-path: inset(0 0 0 0);
    }

    &:hover .shrink-tooltip {
        transform: translate(48px, -50%); /* Slide out to the right */
    }
`;

const CollapseBtn = styled.button`
    --chevron-size: ${chevronSize};
    position: absolute; 
    top: 0;
    left: 0;
    
    background: ${props => props.$isCollapsed 
        ? 'var(--sidebar-bg-color)' 
        : `var(--app-bg-color, ${props.theme.bodyBg})`};
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    color: ${props => props.theme.textSecondary};
    font-size: 14px;
    width: var(--chevron-size);
    height: var(--chevron-size);
    display: flex;
    align-items: center;
    justify-content: center;
    
    transform: rotate(${props => (props.$isCollapsed ? '180deg' : '0deg')});
    transition: transform ${transitionSpeed} ease-out, background ${transitionSpeed} ease-out;

    box-shadow: none;
    z-index: 10; /* High z-index to be on top */
    
    &:hover {
        background: ${props => props.theme.bgLight2};
        box-shadow: none;
    }
    
    &:active {
        box-shadow: none;
    }
`;

const CollapseIcon = styled.div`
    transition: none;
    line-height: 1;
`;

const TooltipWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 200px; /* Give it space for the text */
    height: 100%;
    clip-path: inset(0 100% 0 0); /* Start fully clipped from the right */
    transition: clip-path 0.3s ease-out;
    pointer-events: none;
    z-index: 1; /* Below the button */
`;

const ShrinkTooltip = styled.div`
    color: ${props => props.theme.textPrimary};
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1px;
    white-space: nowrap;
    
    position: absolute;
    left: 0; 
    top: 50%;
    transform: translateY(-50%);
    
    opacity: 1; 
    pointer-events: none;
    transition: transform 0.3s ease-out; 
    
    ${props => props.$isCollapsing && !props.$isCollapsed && css`
        animation: ${tooltipFadeOut} 0.2s ease-out forwards;
    `}
`;

const CollapseControl = ({ 
    isVisible, 
    isCollapsed, 
    isCollapsing, 
    onToggleCollapse 
}) => {
    const [tooltipText, setTooltipText] = useState(isCollapsed ? 'E X P A N D' : 'S H R I N K');
    const hasAnimated = useRef(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTooltipText(isCollapsed ? 'E X P A N D' : 'S H R I N K');
        }, parseFloat(transitionSpeed) * 1000);

        if (!hasAnimated.current && isVisible) {
            hasAnimated.current = true;
        }

        return () => clearTimeout(timer);
    }, [isCollapsed, isVisible]);

    return (
        <CollapseControlWrapper 
            $isVisible={isVisible} 
            $isCollapsed={isCollapsed}
            $applyAnimation={!hasAnimated.current}
        >
            <CollapseBtn 
                onClick={onToggleCollapse} 
                aria-label="Toggle sidebar" 
                $isCollapsed={isCollapsed}
                $isCollapsing={isCollapsing}
            >
                <CollapseIcon>
                    <ChevronLeft />
                </CollapseIcon>
            </CollapseBtn>
            <TooltipWrapper className="shrink-tooltip-wrapper">
                <ShrinkTooltip 
                    className="shrink-tooltip" 
                    $isCollapsing={isCollapsing} 
                    $isCollapsed={isCollapsed}
                >
                    {tooltipText}
                </ShrinkTooltip>
            </TooltipWrapper>
        </CollapseControlWrapper>
    );
};

export default CollapseControl; 
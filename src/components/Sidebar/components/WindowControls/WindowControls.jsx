import styled from 'styled-components';
import { windowControlSize, windowControlGap, windowControlPadding } from '../../Sidebar.styled';

const ControlsContainer = styled.div`
    position: absolute;
    top: ${windowControlPadding};
    left: ${windowControlPadding};
    display: flex;
    gap: ${windowControlGap};
    opacity: ${props => (props.$isVisible ? 1 : 0)};
    transition: opacity 0.3s ease-out;
    z-index: 20; /* Ensure controls are on top */
`;

const ControlDot = styled.div`
    width: ${windowControlSize};
    height: ${windowControlSize};
    border-radius: 50%;
    background-color: ${props => props.color};
    flex-shrink: 0;
`;

const WindowControls = ({ isVisible }) => {
    return (
        <ControlsContainer $isVisible={isVisible}>
            <ControlDot color="#FF5F56" aria-label="close" />
            <ControlDot color="#FFBD2E" aria-label="minimize" />
            <ControlDot color="#27C93F" aria-label="maximize" />
        </ControlsContainer>
    );
};

export default WindowControls; 
import { useState, useRef } from 'react';
import * as S from './Sidebar.styled';

// Custom hooks
import { useSidebarAnimations } from './hooks/useSidebarAnimations';
import { useClickOutside } from './hooks/useClickOutside';

// Modular components
import WindowControls from './components/WindowControls';
import CollapseControl from './components/CollapseControl';
import SidebarHeader from './components/SidebarHeader';
import NavigationLinks from './components/NavigationLinks';
import ProfileSection from './components/ProfileSection';
import UserPopup from './components/UserPopup';

const SidebarComponent = () => {
    // --- Core State ---
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isCollapsing, setIsCollapsing] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [activeItem, setActiveItem] = useState('Sales');
    
    // --- Refs ---
    const popupRef = useRef(null);
    const profileBtnRef = useRef(null);
    
    // --- Custom Hooks for Logic Abstraction ---
    const {
        isLoading,
        showControls,
        showLogo,
        showNavItems,
        showBottomSection,
        showBottomItems,
        showChevron,
        showPopupHeader,
        showPopupLinks,
        showPopupDelimiter,
        showPopupFooter,
        showLogout,
    } = useSidebarAnimations(isPopupVisible);
    
    useClickOutside([popupRef, profileBtnRef], () => {
        if (isPopupVisible) {
            setIsPopupVisible(false);
        }
    });
    
    // --- Event Handlers ---
    const toggleCollapse = () => {
        setIsCollapsing(true);
        setIsPopupVisible(false); // Always close popup on sidebar toggle
        setIsCollapsed(prev => !prev);
        setTimeout(() => setIsCollapsing(false), 300); // Animation duration
    };
    
    const togglePopup = () => setIsPopupVisible(prev => !prev);

    const handleItemClick = (itemTitle, e) => {
        e.preventDefault();
        setActiveItem(itemTitle);
    };

    return (
        <S.SidebarWrapper>
            <S.SidebarNav $isCollapsed={isCollapsed} $isLoading={isLoading}>
                <WindowControls 
                    isVisible={showControls} 
                />
                <S.SidebarContent $isCollapsed={isCollapsed}>
                    <SidebarHeader 
                        isVisible={showLogo}
                        isCollapsed={isCollapsed}
                    />
                    <NavigationLinks 
                        isCollapsed={isCollapsed}
                        showNavItems={showNavItems}
                        showBottomSection={showBottomSection}
                        showBottomItems={showBottomItems}
                        activeItem={activeItem}
                        onItemClick={handleItemClick}
                    />

                    <S.ProfileDelimiter 
                        $isVisible={showBottomSection}
                        $isCollapsed={isCollapsed}
                    />

                    <ProfileSection 
                        isVisible={showBottomSection}
                        isCollapsed={isCollapsed}
                        isActive={isPopupVisible}
                        onClick={togglePopup}
                        profileBtnRef={profileBtnRef}
                    />
                </S.SidebarContent>
            </S.SidebarNav>
            
            <CollapseControl 
                isVisible={showChevron} 
                isCollapsed={isCollapsed}
                hasAnimated={!isLoading}
                isCollapsing={isCollapsing}
                onToggleCollapse={toggleCollapse}
            />
            
            <UserPopup 
                isVisible={isPopupVisible}
                isCollapsed={isCollapsed}
                showHeader={showPopupHeader}
                showLinks={showPopupLinks}
                showDelimiter={showPopupDelimiter}
                showFooter={showPopupFooter}
                showLogout={showLogout}
                popupRef={popupRef}
            />
        </S.SidebarWrapper>
    );
};

export default SidebarComponent;

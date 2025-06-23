import { useState, useEffect } from 'react';

export const useSidebarAnimations = (isPopupVisible) => {
    // State for the initial sidebar load-in animation
    const [isLoading, setIsLoading] = useState(true);
    const [showControls, setShowControls] = useState(false);
    const [showLogo, setShowLogo] = useState(false);
    const [showNavItems, setShowNavItems] = useState(false);
    const [showBottomSection, setShowBottomSection] = useState(false);
    const [showBottomItems, setShowBottomItems] = useState(false);
    const [showChevron, setShowChevron] = useState(false);

    // State for the user popup content animation
    const [showPopupHeader, setShowPopupHeader] = useState(false);
    const [showPopupLinks, setShowPopupLinks] = useState([]);
    const [showPopupDelimiter, setShowPopupDelimiter] = useState(false);
    const [showPopupFooter, setShowPopupFooter] = useState(false);
    const [showLogout, setShowLogout] = useState(false);

    // Effect for the initial page load animation sequence
    useEffect(() => {
        const timeouts = [
            setTimeout(() => setShowControls(true), 100),
            setTimeout(() => setShowLogo(true), 200),
            setTimeout(() => setShowNavItems(true), 300),
            setTimeout(() => setShowBottomSection(true), 400),
            setTimeout(() => setShowBottomItems(true), 500),
            setTimeout(() => setShowChevron(true), 1300),
            setTimeout(() => setIsLoading(false), 2200),
        ];

        return () => timeouts.forEach(clearTimeout);
    }, []); // Empty dependency array; runs only once on mount

    // Effect for the staggered animation for User Popup
    useEffect(() => {
        let timeouts = [];
        if (isPopupVisible) {
            timeouts.push(setTimeout(() => setShowPopupHeader(true), 150));
            
            const linkTimeouts = [
                setTimeout(() => setShowPopupLinks(prev => [...prev, 0]), 250),
                setTimeout(() => setShowPopupLinks(prev => [...prev, 1]), 300),
                setTimeout(() => setShowPopupLinks(prev => [...prev, 2]), 350),
            ];
            timeouts.push(...linkTimeouts);
            
            timeouts.push(setTimeout(() => setShowPopupDelimiter(true), 450));
            timeouts.push(setTimeout(() => setShowLogout(true), 550));
            timeouts.push(setTimeout(() => setShowPopupFooter(true), 650));
        } else {
            // Reset states when popup closes
            setShowPopupHeader(false);
            setShowPopupLinks([]);
            setShowPopupDelimiter(false);
            setShowPopupFooter(false);
            setShowLogout(false);
        }
        return () => timeouts.forEach(clearTimeout);
    }, [isPopupVisible]); // Rerun whenever the popup visibility changes

    return {
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
    };
}; 
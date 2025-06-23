import { useEffect } from 'react';

export const useClickOutside = (refs, handler) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the click is outside all provided refs
            const isOutside = refs.every(ref => 
                ref.current && !ref.current.contains(event.target)
            );

            if (isOutside) {
                handler();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [refs, handler]);
}; 
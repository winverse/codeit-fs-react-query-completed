'use client';

import { useEffect } from 'react';

function useClickOutside({ isActive, onOutsideClick }) {
  useEffect(() => {
    if (!isActive) return;

    const handleClick = () => {
      onOutsideClick();
    };
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [isActive, onOutsideClick]);
}

export default useClickOutside;

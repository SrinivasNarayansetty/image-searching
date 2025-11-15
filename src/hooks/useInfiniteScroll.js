import { useEffect, useCallback, useRef } from 'react';
import { APP_CONFIG } from '../utils/config';

/**
 * Custom hook for infinite scroll
 */
export const useInfiniteScroll = (callback, enabled = true) => {
  const canLoadRef = useRef(true);

  const handleScroll = useCallback(() => {
    if (!enabled || !canLoadRef.current) return;

    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const clientHeight = window.innerHeight;

    // Check if user scrolled near bottom
    if (scrollTop + clientHeight + APP_CONFIG.scrollThreshold >= scrollHeight) {
      canLoadRef.current = false;
      callback();

      // Re-enable after a delay
      setTimeout(() => {
        canLoadRef.current = true;
      }, 1000);
    }
  }, [callback, enabled]);

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll, enabled]);

  return null;
};

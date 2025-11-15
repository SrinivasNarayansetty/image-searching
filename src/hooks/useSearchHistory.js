import { useState, useCallback, useEffect } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/helper';
import { APP_CONFIG, STORAGE_KEYS } from '../utils/config';

/**
 * Custom hook for managing search history
 */
export const useSearchHistory = () => {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const history = getLocalStorage(STORAGE_KEYS.searchHistory, []);
    setSearchHistory(history);
  }, []);

  const addToHistory = useCallback((query) => {
    if (!query?.trim()) return;

    setSearchHistory(prev => {
      let newHistory = [...prev];

      // Remove if already exists
      const index = newHistory.indexOf(query);
      if (index !== -1) {
        newHistory.splice(index, 1);
      }

      // Add to end
      newHistory.push(query);

      // Limit size
      if (newHistory.length > APP_CONFIG.searchListLimit) {
        newHistory = newHistory.slice(-APP_CONFIG.searchListLimit);
      }

      setLocalStorage(STORAGE_KEYS.searchHistory, newHistory);
      return newHistory;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setSearchHistory([]);
    setLocalStorage(STORAGE_KEYS.searchHistory, []);
  }, []);

  return {
    searchHistory,
    addToHistory,
    clearHistory,
  };
};

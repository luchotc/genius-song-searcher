import { useState, useEffect, useCallback } from 'react';

const RECENT_SEARCHES_KEY = 'genius-recent-searches';
const MAX_RECENT_SEARCHES = 8;

export const useRecentSearches = () => {
  const [recentSearches, setRecentSearches] = useState([]);

  // Load recent searches from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) {
        const searches = JSON.parse(stored);
        setRecentSearches(searches);
      }
    } catch (error) {
      console.error('Failed to load recent searches:', error);
    }
  }, []);

  // Save recent searches to localStorage
  const saveToStorage = useCallback((searches) => {
    try {
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches));
    } catch (error) {
      console.error('Failed to save recent searches:', error);
    }
  }, []);

  // Add a new search to recent searches
  const addRecentSearch = useCallback((artist) => {
    const newSearch = {
      id: `${artist.id}-${Date.now()}`,
      artist,
      timestamp: Date.now(),
    };

    setRecentSearches(prevSearches => {
      // Remove existing search for the same artist
      const filteredSearches = prevSearches.filter(search => search.artist.id !== artist.id);
      
      // Add new search at the beginning
      const updatedSearches = [newSearch, ...filteredSearches].slice(0, MAX_RECENT_SEARCHES);
      
      saveToStorage(updatedSearches);
      return updatedSearches;
    });
  }, [saveToStorage]);

  // Remove a specific search
  const removeRecentSearch = useCallback((id) => {
    setRecentSearches(prevSearches => {
      const updatedSearches = prevSearches.filter(search => search.id !== id);
      saveToStorage(updatedSearches);
      return updatedSearches;
    });
  }, [saveToStorage]);

  // Clear all recent searches
  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    saveToStorage([]);
  }, [saveToStorage]);

  return {
    recentSearches,
    addRecentSearch,
    removeRecentSearch,
    clearRecentSearches,
  };
};

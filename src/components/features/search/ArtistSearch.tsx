import { useState, useCallback, useRef, useEffect } from 'react';
import { ErrorMessage, SearchSkeleton } from '../../ui';
import { TEXTS } from '../../../constants/texts';
import { GeniusArtist } from '../../../types';
import AutocompleteResults from './AutocompleteResults';

/**
 * Artist search component with autocomplete
 * @param {Object} props - Component props
 * @param {Function} props.onArtistSelect - Callback when artist is selected
 * @param {Array} props.searchResults - Array of search results
 * @param {boolean} props.loading - Loading state
 * @param {string} props.error - Error message
 * @param {Function} props.onSearch - Function to perform search
 * @returns {JSX.Element} Artist search component
 */
interface ArtistSearchProps {
  onArtistSelect: (artist: GeniusArtist) => void;
  searchResults?: GeniusArtist[];
  loading?: boolean;
  error?: string | null;
  onSearch: (term: string) => void;
}

const ArtistSearch = ({ onArtistSelect, searchResults = [], loading = false, error = null, onSearch }: ArtistSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSearchTermRef = useRef('');

  // Intelligent debounced search
  const debouncedSearch = useCallback((value: string) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    if (value.trim().length < 2) {
      setIsOpen(false);
      return;
    }

    if (value.trim() === lastSearchTermRef.current) {
      return;
    }

    debounceTimeoutRef.current = setTimeout(() => {
      lastSearchTermRef.current = value.trim();
      if (onSearch) {
        onSearch(value.trim());
      }
      setIsOpen(true);
      setSelectedIndex(-1);
    }, 300);
  }, [onSearch]);

  // Handle input change
  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    
    // If input is cleared, immediately clear results and close dropdown
    if (!value.trim()) {
      setIsOpen(false);
      setSelectedIndex(-1);
      lastSearchTermRef.current = '';
      // Call onSearch with empty string to clear results
      if (onSearch) {
        onSearch('');
      }
      return;
    }
    
    debouncedSearch(value);
  }, [debouncedSearch, onSearch]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen) return;

    // If no results, only handle Escape key
    if (searchResults.length === 0) {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
        setSelectedIndex(-1);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : searchResults.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
          handleArtistSelect(searchResults[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  }, [isOpen, searchResults, selectedIndex]);

  const handleArtistSelect = useCallback((artist: GeniusArtist) => {
    onArtistSelect(artist);
    setSearchTerm(''); // Clear search term when artist is selected
    setIsOpen(false);
    setSelectedIndex(-1);
    lastSearchTermRef.current = '';
  }, [onArtistSelect]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

    return (
    <div className="w-full relative px-4" ref={inputRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => searchResults.length > 0 && setIsOpen(true)}
          placeholder={TEXTS.SEARCH_PLACEHOLDER}
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
        />
      </div>

      {error && (
        <div className="mt-4">
          <ErrorMessage message={error} />
        </div>
      )}

      {/* Loading skeleton */}
      {loading && searchTerm.trim().length >= 2 && !error && (
        <SearchSkeleton count={4} />
      )}

      {/* Autocomplete dropdown */}
      <AutocompleteResults
        isOpen={isOpen}
        loading={loading}
        searchResults={searchResults}
        selectedIndex={selectedIndex}
        onArtistSelect={handleArtistSelect}
      />
    </div>
  );
};

export default ArtistSearch;

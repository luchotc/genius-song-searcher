import { TEXTS } from '../../../constants/texts';
import { GeniusArtist } from '../../../types';
import AutocompleteResult from './AutocompleteResult';

interface AutocompleteResultsProps {
  isOpen: boolean;
  loading: boolean;
  searchResults: GeniusArtist[];
  selectedIndex: number;
  onArtistSelect: (artist: GeniusArtist) => void;
}

/**
 * Autocomplete results dropdown component
 */
const AutocompleteResults = ({ 
  isOpen, 
  loading, 
  searchResults, 
  selectedIndex, 
  onArtistSelect 
}: AutocompleteResultsProps) => {
  if (!isOpen || loading) {
    return null;
  }

  return (
    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
      {searchResults.length > 0 ? (
        searchResults.map((artist, index) => (
          <AutocompleteResult
            key={artist.id}
            artist={artist}
            index={index}
            selectedIndex={selectedIndex}
            onSelect={onArtistSelect}
          />
        ))
      ) : (
        <div className="px-4 py-3 text-sm text-gray-500 text-left">
          {TEXTS.SEARCH_NO_RESULTS}
        </div>
      )}
    </div>
  );
};

export default AutocompleteResults;

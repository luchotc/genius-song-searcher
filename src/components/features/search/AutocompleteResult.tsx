import { ImageWithSkeleton } from '../../ui';
import { GeniusArtist } from '../../../types';

interface AutocompleteResultProps {
  artist: GeniusArtist;
  index: number;
  selectedIndex: number;
  onSelect: (artist: GeniusArtist) => void;
}

/**
 * Individual autocomplete result item component
 */
const AutocompleteResult = ({ 
  artist, 
  index, 
  selectedIndex, 
  onSelect 
}: AutocompleteResultProps) => {
  const isSelected = index === selectedIndex;

  return (
    <button
      onClick={() => onSelect(artist)}
      className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg ${
        isSelected ? 'bg-blue-50 border-l-2 border-blue-500' : ''
      }`}
    >
      <div className="flex items-center space-x-3">
        <ImageWithSkeleton
          src={artist.image_url}
          alt={artist.name}
          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
          loading="lazy"
        />
        <span className="text-sm font-medium text-gray-900">
          {artist.name}
        </span>
      </div>
    </button>
  );
};

export default AutocompleteResult;

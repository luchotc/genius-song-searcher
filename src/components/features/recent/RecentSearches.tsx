import { useNavigate } from 'react-router-dom';
import RecentSearch from './RecentSearch';
import RecentSearchesHeader from './RecentSearchesHeader';
import { TEXTS } from '../../../constants/texts';
import { RecentSearch as RecentSearchType, GeniusArtist } from '../../../types';

interface RecentSearchesProps {
  searches?: RecentSearchType[];
  onSelect?: (artist: GeniusArtist) => void;
  onClear?: () => void;
  onRemove?: (searchId: string) => void;
}

/**
 * Recent searches component with improved visual design
 */
const RecentSearches = ({ searches = [], onSelect, onClear, onRemove }: RecentSearchesProps) => {
  const navigate = useNavigate();

  const handleArtistSelect = (artist: GeniusArtist) => {
    if (onSelect) {
      onSelect(artist);
    } else {
      navigate(`/artist/${artist.id}`);
    }
  };

  if (searches.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-[32rem] flex flex-col">
        <RecentSearchesHeader onClear={onClear} hasSearches={false} />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-xs text-gray-500">{TEXTS.RECENT_SEARCHES_EMPTY}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-[32rem] flex flex-col">
      <RecentSearchesHeader onClear={onClear} hasSearches={true} />
      
      {/* Searches List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-1">
          {searches.map((search) => (
            <RecentSearch
              key={search.id}
              search={search}
              onSelect={handleArtistSelect}
              onRemove={onRemove || (() => {})}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentSearches;

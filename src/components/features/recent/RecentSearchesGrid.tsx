import { TEXTS } from '../../../constants/texts';
import { RecentSearch as RecentSearchType } from '../../../types';
import RecentSearchCard from './RecentSearchCard';

interface RecentSearchesGridProps {
  searches: RecentSearchType[];
  onArtistSelect: (artist: RecentSearchType['artist']) => void;
}

/**
 * Grid component displaying recent searches
 */
const RecentSearchesGrid = ({ searches, onArtistSelect }: RecentSearchesGridProps) => {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
        {TEXTS.HOME_RECENT_ARTISTS}
      </h2>
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 content-start">
        {searches.map((search) => (
          <RecentSearchCard
            key={search.id}
            search={search}
            onSelect={onArtistSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentSearchesGrid;

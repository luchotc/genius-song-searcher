import { RecentSearches } from '../features';
import { GeniusArtist } from '../../types';
import { RecentSearch as RecentSearchType } from '../../types';

interface SidebarProps {
  recentSearches: RecentSearchType[];
  onArtistSelect: (artist: GeniusArtist) => void;
  onClear: () => void;
  onRemove: (searchId: string) => void;
}

/**
 * Sidebar component with recent searches
 */
const Sidebar = ({ recentSearches, onArtistSelect, onClear, onRemove }: SidebarProps) => {
  return (
    <div className="hidden md:block w-64 flex-shrink-0">
      <div className="sticky top-8">
        <RecentSearches
          searches={recentSearches}
          onSelect={onArtistSelect}
          onClear={onClear}
          onRemove={onRemove}
        />
      </div>
    </div>
  );
};

export default Sidebar;

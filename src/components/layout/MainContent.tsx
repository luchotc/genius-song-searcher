import { Sidebar } from './';
import { ReactNode } from 'react';
import { useAppContext } from './Layout';
import { useNavigate } from 'react-router-dom';
import { GeniusArtist } from '../../types';

interface MainContentProps {
  children: ReactNode;
}

/**
 * Main content component with sidebar and content area
 */
const MainContent = ({ children }: MainContentProps) => {
  const navigate = useNavigate();
  const { recentSearches, geniusSearch } = useAppContext();

  const handleArtistSelect = (artist: GeniusArtist) => {
    recentSearches.addRecentSearch(artist);
    geniusSearch.clearSearchResults();
    navigate(`/artist/${artist.id}`);
  };

  return (
    <main className="flex-1 flex flex-col">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 flex flex-col w-full">
        <div className="flex gap-8 flex-1">
          <Sidebar
            recentSearches={recentSearches.recentSearches}
            onArtistSelect={handleArtistSelect}
            onClear={recentSearches.clearRecentSearches}
            onRemove={recentSearches.removeRecentSearch}
          />

          {/* Main Content Area */}
          <div className="flex-1 min-w-0 flex flex-col">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainContent;

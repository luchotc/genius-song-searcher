import { useNavigate } from 'react-router-dom';
import { ArtistSearch } from '../features';
import { TEXTS } from '../../constants/texts';
import { useAppContext } from './Layout';
import { GeniusArtist } from '../../types';

/**
 * Navbar component with search functionality
 */
const Navbar = () => {
  const navigate = useNavigate();
  const { geniusSearch, recentSearches } = useAppContext();

  const handleArtistSelect = (artist: GeniusArtist) => {
    recentSearches.addRecentSearch(artist);
    geniusSearch.clearSearchResults();
    navigate(`/artist/${artist.id}`);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <div className="flex items-center mr-6">
            <button
              onClick={() => navigate('/')}
              className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              {TEXTS.APP_NAME}
            </button>
          </div>
          <div className="flex-1">
            <ArtistSearch 
              onArtistSelect={handleArtistSelect}
              searchResults={geniusSearch.searchResults}
              loading={geniusSearch.loading}
              error={geniusSearch.error}
              onSearch={geniusSearch.searchArtists}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

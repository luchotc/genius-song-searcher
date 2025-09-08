import { RecentSearchesSkeleton, EmptyState } from '../components/ui';
import { RecentSearchesGrid } from '../components/features';
import Footer from '../components/layout/Footer';
import { RecentSearch as RecentSearchType, GeniusArtist } from '../types';
import { useAppContext } from '../components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

/**
 * Home page component
 */
const HomePage = () => {
  const navigate = useNavigate();
  const { recentSearches, geniusSearch } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  const handleArtistSelect = (artist: GeniusArtist) => {
    recentSearches.addRecentSearch(artist);
    geniusSearch.clearSearchResults();
    navigate(`/artist/${artist.id}`);
  };

  const hasRecentSearches = recentSearches.recentSearches && recentSearches.recentSearches.length > 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col flex-1">
      {isLoading ? (
        <RecentSearchesSkeleton count={4} />
      ) : hasRecentSearches ? (
        <RecentSearchesGrid 
          searches={recentSearches.recentSearches as RecentSearchType[]}
          onArtistSelect={handleArtistSelect}
        />
      ) : (
        <EmptyState />
      )}

      <Footer />
    </div>
  );
};

export default HomePage;
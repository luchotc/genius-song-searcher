import { useParams } from 'react-router-dom';
import { SongList, ArtistHeader } from '../components/features';
import { ArtistPageSkeleton } from '../components/ui';
import Footer from '../components/layout/Footer';
import { useGeniusSearch } from '../hooks/useGeniusSearch';
import { useEffect } from 'react';

/**
 * Artist page component showing songs for a specific artist
 */
const ArtistPage = () => {
  const { id } = useParams<{ id: string }>();
  const { 
    loading, 
    loadingMore,
    error, 
    artistSongs, 
    selectedArtist, 
    hasMoreSongs, 
    loadMoreSongs,
    loadArtistFromId
  } = useGeniusSearch();

  useEffect(() => {
    if (id) {
      const artistId = parseInt(id, 10);
      if (!isNaN(artistId)) {
        loadArtistFromId(artistId);
      }
    }
  }, [id]);

  if (loading) {
    return <ArtistPageSkeleton />;
  }

  return (
    <>
      {selectedArtist && <ArtistHeader artist={selectedArtist} />}

      <div className="mb-8 sm:mb-12 px-1 sm:px-2 lg:px-3 py-2">
        <SongList
          songs={artistSongs}
          loading={loading}
          loadingMore={loadingMore}
          error={error}
          hasMoreSongs={hasMoreSongs}
          onLoadMore={loadMoreSongs}
        />
      </div>

      <Footer />
    </>
  );
};

export default ArtistPage;
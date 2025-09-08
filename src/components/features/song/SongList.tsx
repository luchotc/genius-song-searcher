import { LoadingSpinner, ErrorMessage } from '../../ui';
import { TEXTS } from '../../../constants/texts';
import { GeniusSong } from '../../../types';
import SongsEmptyState from './SongsEmptyState';
import SongItem from './SongItem';
import LoadMoreButton from './LoadMoreButton';

interface SongListProps {
  songs: GeniusSong[];
  loading: boolean;
  loadingMore: boolean;
  error?: string | null;
  hasMoreSongs: boolean;
  onLoadMore: () => void;
}

/**
 * Song list component with pagination
 */
const SongList = ({ songs, loading, loadingMore, error, hasMoreSongs, onLoadMore }: SongListProps) => {
  if (loading && songs.length === 0) {
    return <LoadingSpinner message={TEXTS.SONGS_LOADING} size="lg" />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onLoadMore} />;
  }

  if (songs.length === 0) {
    return <SongsEmptyState />;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        {songs.map((song, index) => (
          <SongItem key={song.id} song={song} index={index} />
        ))}
      </div>

      <LoadMoreButton 
        hasMoreSongs={hasMoreSongs}
        loading={loadingMore}
        onLoadMore={onLoadMore}
      />
    </div>
  );
};

export default SongList;

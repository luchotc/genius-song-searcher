import { TEXTS } from '../../../constants/texts';
import { GeniusArtist } from '../../../types';

interface ArtistStatsProps {
  artist: GeniusArtist;
}

/**
 * Artist statistics component (songs, followers, verified badge)
 */
const ArtistStats = ({ artist }: ArtistStatsProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 lg:gap-6 text-sm text-gray-600 mb-3">
      {/* Song Count */}
      {artist.song_count && (
        <span className="font-medium">
          {artist.song_count.toLocaleString()} {TEXTS.ARTIST_SONGS}
        </span>
      )}
      
      {/* Followers (if available) */}
      {artist.followers_count && (
        <span className="font-medium">
          {artist.followers_count.toLocaleString()} {TEXTS.ARTIST_FOLLOWERS}
        </span>
      )}
      
      {/* Verified Badge */}
      {artist.is_verified && (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {TEXTS.ARTIST_VERIFIED}
        </span>
      )}
    </div>
  );
};

export default ArtistStats;

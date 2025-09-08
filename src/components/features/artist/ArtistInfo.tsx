import { TEXTS } from '../../../constants/texts';
import { GeniusArtist } from '../../../types';
import ArtistStats from './ArtistStats';
import ArtistProfileButton from './ArtistProfileButton';

interface ArtistInfoProps {
  artist: GeniusArtist;
}

/**
 * Artist information component (name, stats, alternate names, profile button)
 */
const ArtistInfo = ({ artist }: ArtistInfoProps) => {
  return (
    <div className="flex-1 min-w-0 text-center sm:text-left">
      <div className="text-gray-900">
        {/* Artist Name */}
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-2 sm:mb-3 lg:mb-4">
          {artist.name || TEXTS.ARTIST_UNKNOWN}
        </h1>
        
        {/* Artist Stats */}
        <ArtistStats artist={artist} />
        
        {/* Alternate Names (if available) */}
        {artist.alternate_names && Array.isArray(artist.alternate_names) && artist.alternate_names.length > 0 && (
          <div className="mb-4 text-center sm:text-left">
            <span className="text-sm text-gray-500">{TEXTS.ARTIST_ALSO_KNOWN_AS}</span>
            <span className="text-sm text-gray-600 font-medium">
              {artist.alternate_names.slice(0, 3).join(', ')}
              {artist.alternate_names.length > 3 && '...'}
            </span>
          </div>
        )}
        
        {/* View Profile Button */}
        <ArtistProfileButton artist={artist} />
      </div>
    </div>
  );
};

export default ArtistInfo;

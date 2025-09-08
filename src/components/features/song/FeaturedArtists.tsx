import { TEXTS } from '../../../constants/texts';
import { GeniusSong } from '../../../types';

interface FeaturedArtistsProps {
  featuredArtists?: GeniusSong['featured_artists'];
  className?: string;
}

/**
 * Featured artists display component
 */
const FeaturedArtists = ({ featuredArtists, className = '' }: FeaturedArtistsProps) => {
  if (!featuredArtists || featuredArtists.length === 0) {
    return null;
  }

  return (
    <p className={`text-xs text-gray-500 truncate ${className}`}>
      {TEXTS.SONGS_FEATURED_PREFIX}{featuredArtists.map(artist => artist.name).join(', ')}
    </p>
  );
};

export default FeaturedArtists;

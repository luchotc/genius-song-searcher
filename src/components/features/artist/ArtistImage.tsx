import { TEXTS } from '../../../constants/texts';
import { OptimizedImage } from '../../ui';
import { GeniusArtist } from '../../../types';

interface ArtistImageProps {
  artist: GeniusArtist;
  size?: 'small' | 'large';
}

/**
 * Artist image component with different sizes
 */
const ArtistImage = ({ artist, size = 'large' }: ArtistImageProps) => {
  const sizeClasses = {
    small: 'w-8 h-8 rounded-full',
    large: 'w-24 h-24 sm:w-28 sm:h-28 lg:w-40 lg:h-40 rounded-xl shadow-xl'
  };

  const containerClasses = {
    small: 'flex-shrink-0 mr-3',
    large: 'flex-shrink-0 self-center sm:self-center lg:self-end'
  };

  return (
    <div className={containerClasses[size]}>
      <OptimizedImage
        src={artist.image_url || artist.header_image_url || "/placeholder-artist.png"}
        alt={artist.name || TEXTS.ARTIST_DEFAULT_ALT}
        className={`${sizeClasses[size]} object-cover`}
        priority={size === 'large'} // Priority for main artist images
        loading={size === 'small' ? 'lazy' : 'eager'}
        fallbackSrc="/placeholder-artist.png" // Fallback for failed loads
      />
    </div>
  );
};

export default ArtistImage;

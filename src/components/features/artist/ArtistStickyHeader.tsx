import { TEXTS } from '../../../constants/texts';
import { OptimizedImage } from '../../ui';
import { GeniusArtist } from '../../../types';

interface ArtistStickyHeaderProps {
  artist: GeniusArtist;
  isVisible: boolean;
}

/**
 * Sticky header that appears when scrolling past the main header
 */
const ArtistStickyHeader = ({ artist, isVisible }: ArtistStickyHeaderProps) => {
  if (!isVisible) return null;

  return (
    <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center">
            {/* Small Artist Image */}
            <div className="flex-shrink-0 mr-3">
              <OptimizedImage
                src={artist.image_url || artist.header_image_url}
                alt={artist.name || TEXTS.ARTIST_DEFAULT_ALT}
                className="w-8 h-8 rounded-full object-cover"
                loading="eager"
                fallbackSrc="/placeholder-artist.png"
              />
            </div>
            
            {/* Artist Name */}
            <h1 className="text-lg font-bold text-gray-900 truncate">
              {artist.name || TEXTS.ARTIST_UNKNOWN}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistStickyHeader;

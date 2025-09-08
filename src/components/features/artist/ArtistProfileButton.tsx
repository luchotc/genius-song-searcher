import { TEXTS } from '../../../constants/texts';
import { GeniusArtist } from '../../../types';

interface ArtistProfileButtonProps {
  artist: GeniusArtist;
}

/**
 * Artist profile button component
 */
const ArtistProfileButton = ({ artist }: ArtistProfileButtonProps) => {
  if (!artist.url) return null;

  return (
    <div className="mt-4 flex justify-center sm:justify-start">
      <a
        href={artist.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
      >
        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
        {TEXTS.ARTIST_VIEW_PROFILE}
      </a>
    </div>
  );
};

export default ArtistProfileButton;

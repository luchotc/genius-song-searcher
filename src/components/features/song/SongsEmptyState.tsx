import { TEXTS } from '../../../constants/texts';

/**
 * Empty state component when no songs are found
 */
const SongsEmptyState = () => {
  return (
    <div className="text-center py-12">
      <div className="text-gray-400 mb-6">
        <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{TEXTS.SONGS_NOT_FOUND}</h3>
      <p className="text-gray-500 text-lg">{TEXTS.SONGS_EMPTY_MESSAGE}</p>
    </div>
  );
};

export default SongsEmptyState;

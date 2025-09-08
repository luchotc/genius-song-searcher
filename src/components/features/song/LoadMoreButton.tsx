import { TEXTS } from '../../../constants/texts';

interface LoadMoreButtonProps {
  hasMoreSongs: boolean;
  loading: boolean;
  onLoadMore: () => void;
}

/**
 * Load more button component with loading state
 */
const LoadMoreButton = ({ hasMoreSongs, loading, onLoadMore }: LoadMoreButtonProps) => {
  if (!hasMoreSongs) return null;

  return (
    <div className="text-center pt-4">
      <button
        onClick={onLoadMore}
        disabled={loading}
        className="inline-flex items-center px-6 py-2 text-sm font-medium rounded-full text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
            <span className="ml-2">{TEXTS.LOADING}</span>
          </>
        ) : (
          <>
            <span>{TEXTS.SONGS_LOAD_MORE}</span>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </>
        )}
      </button>
    </div>
  );
};

export default LoadMoreButton;

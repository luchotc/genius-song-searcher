import { TEXTS } from '../../../constants/texts';

interface RecentSearchesHeaderProps {
  onClear?: () => void;
  hasSearches: boolean;
}

/**
 * Recent searches header component
 */
const RecentSearchesHeader = ({ onClear, hasSearches }: RecentSearchesHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-3 border-b border-gray-100">
      <div className="flex items-center">
        <h3 className="text-xs font-semibold text-gray-900">{TEXTS.RECENT_SEARCHES_TITLE}</h3>
      </div>
      {hasSearches && (
        <button
          onClick={onClear}
          className="text-xs text-gray-400 hover:text-red-600 transition-colors duration-150 px-1 py-0.5 rounded hover:bg-red-50"
        >
          {TEXTS.RECENT_SEARCHES_CLEAR}
        </button>
      )}
    </div>
  );
};

export default RecentSearchesHeader;

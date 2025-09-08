import { TEXTS } from '../../../constants/texts';

/**
 * Empty state component for when there are no recent searches
 */
const EmptyState = () => {
  return (
    <div className="flex-1 flex items-center justify-center min-h-0">
      <div className="text-center py-16">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">{TEXTS.HOME_EMPTY_TITLE}</h3>
        <p className="text-gray-500">{TEXTS.HOME_EMPTY_DESCRIPTION}</p>
      </div>
    </div>
  );
};

export default EmptyState;

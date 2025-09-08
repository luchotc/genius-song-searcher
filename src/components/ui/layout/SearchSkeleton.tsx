interface SearchSkeletonProps {
  count?: number;
}

/**
 * Skeleton loader component for search results
 */
const SearchSkeleton = ({ count = 3 }: SearchSkeletonProps) => {
  return (
    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="w-full px-4 py-2 first:rounded-t-lg last:rounded-b-lg"
        >
          <div className="flex items-center space-x-3">
            {/* Skeleton image */}
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse flex-shrink-0"></div>
            
            {/* Skeleton text */}
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchSkeleton;

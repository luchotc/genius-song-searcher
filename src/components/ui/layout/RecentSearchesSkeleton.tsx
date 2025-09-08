import React from 'react';

interface RecentSearchesSkeletonProps {
  count?: number;
}

/**
 * Skeleton loader for recent searches grid
 */
const RecentSearchesSkeleton = ({ count = 4 }: RecentSearchesSkeletonProps) => {
  return (
    <div className="mb-16">
      <div className="h-8 bg-gray-200 rounded-lg mb-8 max-w-xs mx-auto animate-pulse"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="group">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Image skeleton */}
              <div className="relative h-48 bg-gray-200 animate-pulse"></div>
              
              {/* Content skeleton */}
              <div className="p-6">
                <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-200 rounded mr-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSearchesSkeleton;

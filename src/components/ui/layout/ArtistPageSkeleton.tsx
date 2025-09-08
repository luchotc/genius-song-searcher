/**
 * Skeleton loader for artist page
 */
const ArtistPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Artist Header Skeleton */}
      <div className="bg-white">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-6">
              {/* Artist Image Skeleton */}
              <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gray-200 rounded-lg animate-pulse flex-shrink-0"></div>
              
              {/* Artist Info Skeleton */}
              <div className="flex-1 min-w-0">
                <div className="text-gray-900">
                  {/* Artist Name Skeleton */}
                  <div className="h-8 lg:h-10 bg-gray-200 rounded animate-pulse mb-2 w-64"></div>
                  
                  {/* Artist Stats Skeleton */}
                  <div className="flex items-center space-x-6 mb-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                  </div>
                  
                  {/* Optional Profile Link Skeleton */}
                  <div className="mt-4">
                    <div className="h-8 bg-gray-200 rounded animate-pulse w-32"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Songs List Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm">
              {/* Song Number */}
              <div className="w-6 h-6 bg-gray-200 rounded animate-pulse flex-shrink-0"></div>
              
              {/* Song Info */}
              <div className="flex-1">
                <div className="h-5 bg-gray-200 rounded animate-pulse mb-2 w-48"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
              </div>
              
              {/* Action Button */}
              <div className="h-8 bg-gray-200 rounded animate-pulse w-24"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistPageSkeleton;

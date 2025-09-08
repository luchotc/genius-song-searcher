import React, { useState } from 'react';

interface ImageWithSkeletonProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  skeletonClassName?: string;
  loading?: 'eager' | 'lazy';
}

/**
 * Image component with skeleton loading state
 */
const ImageWithSkeleton = ({ 
  src, 
  alt, 
  className = '', 
  skeletonClassName = '', 
  loading = 'lazy',
  ...props 
}: ImageWithSkeletonProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="relative">
      {/* Skeleton placeholder */}
      {isLoading && (
        <div 
          className={`bg-gray-200 animate-pulse rounded ${skeletonClassName || className}`}
          aria-hidden="true"
        />
      )}
      
      {/* Actual image */}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0 absolute inset-0' : 'opacity-100'} transition-opacity duration-300`}
        loading={loading}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
      
      {/* Error placeholder */}
      {hasError && (
        <div 
          className={`bg-gray-100 flex items-center justify-center text-gray-400 ${className}`}
          aria-hidden="true"
        >
          <svg className="w-1/2 h-1/2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default ImageWithSkeleton;

import React, { useState, useRef, useEffect } from 'react';
import { preloadAndCacheImage, getCachedImage } from '../../../utils/imageCache';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  skeletonClassName?: string;
  loading?: 'eager' | 'lazy';
  priority?: boolean; // For above-the-fold images
  fallbackSrc?: string; // Fallback image URL
}

/**
 * Optimized image component with better loading strategies
 */
const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  skeletonClassName = '', 
  loading = 'lazy',
  priority = false,
  fallbackSrc,
  ...props 
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const imgRef = useRef<HTMLImageElement>(null);

  // Initialize with original src (temporarily disable caching)
  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  // Preload image for priority images
  useEffect(() => {
    if (priority && src && !getCachedImage(src)) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
      
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [src, priority]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
    
    // Temporarily disable caching
    // preloadAndCacheImage(src).catch(console.warn);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    
    // Try fallback image if available
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setIsLoading(true);
      setHasError(false);
    }
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
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0 absolute inset-0' : 'opacity-100'} transition-opacity duration-300`}
        loading={priority ? 'eager' : loading}
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

export default OptimizedImage;

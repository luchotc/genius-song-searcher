import React, { useState, useEffect } from 'react';

interface ImagePerformanceTestProps {
  imageUrl: string;
  alt: string;
}

/**
 * Component to test image loading performance
 */
const ImagePerformanceTest = ({ imageUrl, alt }: ImagePerformanceTestProps) => {
  const [loadTime, setLoadTime] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const startTime = performance.now();
    
    const img = new Image();
    
    img.onload = () => {
      const endTime = performance.now();
      setLoadTime(endTime - startTime);
      setIsLoading(false);
    };
    
    img.onerror = () => {
      setError('Failed to load image');
      setIsLoading(false);
    };
    
    img.src = imageUrl;
  }, [imageUrl]);

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <h3 className="font-semibold mb-2">Image Performance Test</h3>
      <div className="mb-2">
        <strong>URL:</strong> 
        <span className="text-sm text-gray-600 ml-2 break-all">{imageUrl}</span>
      </div>
      
      {isLoading && (
        <div className="text-blue-600">Loading image...</div>
      )}
      
      {loadTime && (
        <div className="text-green-600">
          <strong>Load Time:</strong> {loadTime.toFixed(2)}ms
        </div>
      )}
      
      {error && (
        <div className="text-red-600">
          <strong>Error:</strong> {error}
        </div>
      )}
      
      <div className="mt-2">
        <img 
          src={imageUrl} 
          alt={alt}
          className="w-32 h-32 object-cover rounded"
          onLoad={() => setIsLoading(false)}
          onError={() => setError('Image failed to display')}
        />
      </div>
    </div>
  );
};

export default ImagePerformanceTest;

/**
 * Image caching utility for better performance
 */

interface CachedImage {
  url: string;
  blob: string;
  timestamp: number;
}

const CACHE_KEY = 'genius-image-cache';
const CACHE_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
const MAX_CACHE_SIZE = 50; // Maximum number of images to cache

/**
 * Get cached image data
 */
export const getCachedImage = (url: string): string | null => {
  try {
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    const cached = cache[url] as CachedImage;
    
    if (cached && Date.now() - cached.timestamp < CACHE_EXPIRY) {
      return cached.blob;
    }
    
    // Remove expired entry
    if (cached) {
      delete cache[url];
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    }
    
    return null;
  } catch (error) {
    console.warn('Failed to get cached image:', error);
    return null;
  }
};

/**
 * Cache image data
 */
export const setCachedImage = (url: string, blob: string): void => {
  try {
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    
    // Remove oldest entries if cache is full
    const entries = Object.entries(cache) as [string, CachedImage][];
    if (entries.length >= MAX_CACHE_SIZE) {
      // Sort by timestamp and remove oldest
      entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
      const toRemove = entries.slice(0, entries.length - MAX_CACHE_SIZE + 1);
      toRemove.forEach(([key]) => delete cache[key]);
    }
    
    cache[url] = {
      url,
      blob,
      timestamp: Date.now()
    };
    
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.warn('Failed to cache image:', error);
  }
};

/**
 * Preload image and cache it
 */
export const preloadAndCacheImage = async (url: string): Promise<string> => {
  // Check if already cached
  const cached = getCachedImage(url);
  if (cached) {
    return cached;
  }
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }
    
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    
    // Cache the blob URL
    setCachedImage(url, blobUrl);
    
    return blobUrl;
  } catch (error) {
    console.warn('Failed to preload image:', error);
    return url; // Return original URL as fallback
  }
};

/**
 * Clear expired cache entries
 */
export const clearExpiredCache = (): void => {
  try {
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    const now = Date.now();
    let hasChanges = false;
    
    Object.keys(cache).forEach(url => {
      const cached = cache[url] as CachedImage;
      if (now - cached.timestamp >= CACHE_EXPIRY) {
        delete cache[url];
        hasChanges = true;
      }
    });
    
    if (hasChanges) {
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    }
  } catch (error) {
    console.warn('Failed to clear expired cache:', error);
  }
};

/**
 * Clear all cached images
 */
export const clearImageCache = (): void => {
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch (error) {
    console.warn('Failed to clear image cache:', error);
  }
};

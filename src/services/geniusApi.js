import axios from 'axios';

// Genius API base URL - using proxy to avoid CORS issues
const GENIUS_API_BASE_URL = '/api/genius';

// Create axios instance with default config
const geniusApi = axios.create({
  baseURL: GENIUS_API_BASE_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for authentication
geniusApi.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
geniusApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          throw new Error('Unauthorized: Please check your API token');
        case 403:
          throw new Error('Forbidden: Access denied');
        case 404:
          throw new Error('Artist not found');
        case 429:
          throw new Error('Rate limit exceeded. Please try again later.');
        case 500:
          throw new Error('Server error. Please try again later.');
        default:
          throw new Error(`API Error: ${error.response.status} - ${error.response.statusText}`);
      }
    } else if (error.request) {
      throw new Error('Network error. Please check your internet connection.');
    } else {
      console.error('An unexpected error occurred:', error);
      throw new Error('An unexpected error occurred.');
    }
  }
);

/**
 * Search for an artist by name
 * @param {string} artistName - The name of the artist to search for
 * @returns {Promise<Array>} Array of artist objects
 */
export const searchArtist = async (artistName) => {
  try {
    const response = await geniusApi.get('/search', {
      params: {
        q: artistName,
      },
    });

    // Extract unique artists from both artist and song results
    const artists = new Map();
    
    response.data.response.hits.forEach(hit => {
      if (hit.type === 'artist') {
        // Direct artist result
        artists.set(hit.result.id, hit.result);
      } else if (hit.type === 'song' && hit.result.primary_artist) {
        // Song result - extract the primary artist
        const artist = hit.result.primary_artist;
        if (!artists.has(artist.id)) {
          artists.set(artist.id, {
            id: artist.id,
            name: artist.name,
            image_url: artist.image_url,
            header_image_url: artist.header_image_url,
            url: artist.url,
            api_path: artist.api_path,
            is_verified: artist.is_verified,
            is_meme_verified: artist.is_meme_verified,
          });
        }
      }
    });

    // Filter results to only include artists whose name contains the search term
    // TODO: This could be expanded to include fuzzy matching, case-insensitive search,
    // and other advanced filtering options in the future
    const filteredArtists = Array.from(artists.values()).filter(artist => 
      artist.name.toLowerCase().includes(artistName.toLowerCase())
    );

    return filteredArtists;
  } catch (error) {
    throw error;
  }
};

/**
 * Get all songs by an artist
 * @param {number} artistId - The Genius artist ID
 * @param {number} page - Page number for pagination (default: 1)
 * @param {number} perPage - Number of songs per page (default: 20)
 * @returns {Promise<Object>} Object containing songs and pagination info
 */
export const getArtistSongs = async (artistId, page = 1, perPage = 20) => {
  try {
    const response = await geniusApi.get(`/artists/${artistId}/songs`, {
      params: {
        page,
        per_page: perPage,
        sort: 'popularity', // TODO: Can be expanded to other sorting options, but popularity is the only one that makes sense for now.
      },
    });

    return {
      songs: response.data.response.songs,
      pagination: response.data.response.next_page,
      totalSongs: response.data.response.songs.length,
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Get detailed information about an artist
 * @param {number} artistId - The Genius artist ID
 * @returns {Promise<Object>} Artist information
 */
export const getArtistDetails = async (artistId) => {
  try {
    const response = await geniusApi.get(`/artists/${artistId}`);
    return response.data.response.artist;
  } catch (error) {
    throw error;
  }
};

export default geniusApi;

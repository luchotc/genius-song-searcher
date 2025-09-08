import { useState, useCallback } from 'react';
import { searchArtist, getArtistSongs, getArtistDetails } from '../services/geniusApi';
import { GeniusArtist, GeniusSong } from '../types';

/**
 * Custom hook for managing Genius API search functionality
 * @returns {Object} Search state and functions
 */
export const useGeniusSearch = () => {
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [artistSongs, setArtistSongs] = useState<GeniusSong[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<GeniusArtist | null>(null);
  const [hasMoreSongs, setHasMoreSongs] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Load artist by ID (for React Router)
  const loadArtistFromId = useCallback(async (artistId: number) => {
    // Prevent loading the same artist multiple times
    if (selectedArtist?.id === artistId && !loading) {
      return;
    }

    setLoading(true);
    setError(null);
    setArtistSongs([]);
    setCurrentPage(1);

    try {
      // Get artist details and songs in parallel
      const [artistDetails, songsData] = await Promise.all([
        getArtistDetails(artistId),
        getArtistSongs(artistId, 1, 20)
      ]);
      
      setSelectedArtist({
        id: artistDetails.id,
        name: artistDetails.name,
        image_url: artistDetails.image_url,
        header_image_url: artistDetails.header_image_url,
        url: artistDetails.url,
        api_path: artistDetails.api_path,
        is_verified: artistDetails.is_verified,
        is_meme_verified: artistDetails.is_meme_verified,
        song_count: artistDetails.song_count,
        followers_count: artistDetails.followers_count,
        description: artistDetails.description,
        alternate_names: artistDetails.alternate_names,
      });
      setArtistSongs(songsData.songs);
      setHasMoreSongs(!!songsData.pagination);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [selectedArtist?.id, loading]);

  // Set artist data from loader
  const setArtistData = useCallback((data: any) => {
    setSelectedArtist(data.artist);
    setArtistSongs(data.songs);
    setHasMoreSongs(data.hasMoreSongs);
    setCurrentPage(data.currentPage);
    setError(null);
  }, []);

  // Clear all state
  const clearResults = useCallback(() => {
    setSearchResults([]);
    setArtistSongs([]);
    setSelectedArtist(null);
    setError(null);
    setHasMoreSongs(false);
    setCurrentPage(1);
    setLoading(false);
  }, []);

  // Clear only search results
  const clearSearchResults = useCallback(() => {
    setSearchResults([]);
    setError(null);
    setLoading(false);
  }, []);

  // Load songs for an artist
  const loadArtistSongs = useCallback(async (artist: GeniusArtist) => {
    setLoading(true);
    setError(null);
    setArtistSongs([]);
    setSelectedArtist(artist);
    setCurrentPage(1);

    try {
      const songsData = await getArtistSongs(artist.id, 1, 20);
      setArtistSongs(songsData.songs);
      setHasMoreSongs(!!songsData.pagination);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Search for artists (autocomplete only)
  const searchArtists = useCallback(async (artistName: string) => {
    if (!artistName.trim()) {
      setError(null); // Clear any previous errors
      setSearchResults([]); // Clear previous results
      setLoading(false); // Ensure loading is false
      return;
    }

    // Don't search if term is too short
    if (artistName.trim().length < 2) {
      setError(null); // Clear any previous errors
      setSearchResults([]); // Clear previous results
      setLoading(false); // Ensure loading is false
      return;
    }

    setLoading(true);
    setError(null);
    // Don't clear results immediately - let the loading state handle it

    try {
      // Add minimum delay to make skeleton visible
      const [artists] = await Promise.all([
        searchArtist(artistName),
        new Promise(resolve => setTimeout(resolve, 500)) // Minimum 500ms delay
      ]);
      
      setSearchResults(artists);
      
      // Don't set error for empty results - just show empty dropdown
    } catch (err: any) {
      setError(err.message);
      setSearchResults([]); // Clear results on error
    } finally {
      setLoading(false);
    }
  }, []);

  // Select an artist and load their songs
  const selectArtist = useCallback(async (artist: GeniusArtist) => {
    await loadArtistSongs(artist);
  }, [loadArtistSongs]);

  // Load more songs (pagination)
  const loadMoreSongs = useCallback(async () => {
    if (!hasMoreSongs || loadingMore || !selectedArtist) return;

    setLoadingMore(true);
    setError(null);

    try {
      const nextPage = currentPage + 1;
      const songsData = await getArtistSongs(selectedArtist.id, nextPage, 20);
      
      setArtistSongs(prev => [...prev, ...songsData.songs]);
      setHasMoreSongs(!!songsData.pagination);
      setCurrentPage(nextPage);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoadingMore(false);
    }
  }, [hasMoreSongs, loadingMore, currentPage, selectedArtist]);

  return {
    // State
    loading,
    loadingMore,
    error,
    searchResults,
    artistSongs,
    selectedArtist,
    hasMoreSongs,
    currentPage,
    
    // Actions
    searchArtists,
    selectArtist,
    loadMoreSongs,
    loadArtistFromId,
    setArtistData,
    clearResults,
    clearSearchResults,
    setLoading,
  };
};

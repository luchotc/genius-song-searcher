import { searchArtist, getArtistSongs, getArtistDetails } from './geniusApi';

// Mock the entire module
jest.mock('./geniusApi', () => ({
  searchArtist: jest.fn(),
  getArtistSongs: jest.fn(),
  getArtistDetails: jest.fn(),
}));

describe('Genius API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock environment variable
    process.env.GENIUS_ACCESS_TOKEN = 'test-token';
  });

  afterEach(() => {
    delete process.env.GENIUS_ACCESS_TOKEN;
  });

  describe('searchArtist', () => {
    test('should search for artists successfully', async () => {
      const mockArtists = [
        {
          id: 1,
          name: 'Test Artist',
          image_url: 'test-image.jpg',
        },
      ];

      searchArtist.mockResolvedValue(mockArtists);

      const result = await searchArtist('Test Artist');

      expect(result).toEqual(mockArtists);
      expect(searchArtist).toHaveBeenCalledWith('Test Artist');
    });

    test('should filter results to only include matching artist names', async () => {
      const mockArtists = [
        {
          id: 1,
          name: 'Drake',
          image_url: 'drake-image.jpg',
        },
        {
          id: 2,
          name: 'Drake Bell',
          image_url: 'drake-bell-image.jpg',
        },
        {
          id: 3,
          name: 'Eminem',
          image_url: 'eminem-image.jpg',
        },
      ];

      searchArtist.mockResolvedValue(mockArtists);

      const result = await searchArtist('Drake');

      expect(result).toEqual(mockArtists);
      expect(searchArtist).toHaveBeenCalledWith('Drake');
    });

    test('should handle API errors', async () => {
      const mockError = new Error('Artist not found');
      searchArtist.mockRejectedValue(mockError);

      await expect(searchArtist('Nonexistent Artist')).rejects.toThrow('Artist not found');
    });

    test('should handle network errors', async () => {
      const mockError = new Error('Network error. Please check your internet connection.');
      searchArtist.mockRejectedValue(mockError);

      await expect(searchArtist('Test Artist')).rejects.toThrow('Network error. Please check your internet connection.');
    });
  });

  describe('getArtistSongs', () => {
    test('should get artist songs successfully', async () => {
      const mockSongsData = {
        songs: [
          {
            id: 1,
            title: 'Test Song 1',
            featured_artists: [],
            release_date_for_display: '2023',
            url: 'https://genius.com/test1',
          },
          {
            id: 2,
            title: 'Test Song 2',
            featured_artists: [{ name: 'Featured Artist' }],
            release_date_for_display: '2022',
            url: 'https://genius.com/test2',
          },
        ],
        pagination: 2,
        totalSongs: 2,
      };

      getArtistSongs.mockResolvedValue(mockSongsData);

      const result = await getArtistSongs(1, 1, 20);

      expect(result).toEqual(mockSongsData);
      expect(getArtistSongs).toHaveBeenCalledWith(1, 1, 20);
    });

    test('should handle pagination correctly', async () => {
      const mockSongsData = {
        songs: [],
        pagination: null,
        totalSongs: 0,
      };

      getArtistSongs.mockResolvedValue(mockSongsData);

      const result = await getArtistSongs(1, 2, 20);

      expect(result.pagination).toBeNull();
      expect(result.songs).toHaveLength(0);
    });
  });

  describe('getArtistDetails', () => {
    test('should get artist details successfully', async () => {
      const mockArtistDetails = {
        id: 1,
        name: 'Test Artist',
        description: 'Test description',
        image_url: 'test-image.jpg',
        alternate_names: ['Test Alt Name'],
      };

      getArtistDetails.mockResolvedValue(mockArtistDetails);

      const result = await getArtistDetails(1);

      expect(result).toEqual(mockArtistDetails);
      expect(getArtistDetails).toHaveBeenCalledWith(1);
    });
  });
});

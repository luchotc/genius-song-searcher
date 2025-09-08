export interface GeniusArtist {
  id: number;
  name: string;
  image_url: string;
  header_image_url?: string;
  url?: string;
  api_path?: string;
  is_verified?: boolean;
  is_meme_verified?: boolean;
  song_count?: number;
  followers_count?: number;
  description?: string;
  alternate_names?: string[];
}

export interface GeniusSong {
  id: number;
  title: string;
  song_art_image_url?: string;
  release_date?: string;
  release_date_for_display?: string;
  url: string;
  featured_artists?: GeniusArtist[];
  primary_artist?: GeniusArtist;
}

export interface RecentSearch {
  id: string;
  artist: GeniusArtist;
  timestamp: number;
}

export interface SearchFilters {
  sort: 'popularity' | 'title';
  include_features: boolean;
  local_filter: string;
}

export interface PaginationInfo {
  next_page?: number;
  previous_page?: number;
}

export interface SongsResponse {
  songs: GeniusSong[];
  pagination?: PaginationInfo;
}

export interface SearchHit {
  type: 'artist' | 'song';
  result: GeniusArtist | GeniusSong;
}

export interface SearchResponse {
  hits: SearchHit[];
}

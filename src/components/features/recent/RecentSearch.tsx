import React from 'react';
import { ArtistAvatar, ArtistInfo, RemoveButton } from '../../ui';
import { RecentSearch as RecentSearchType, GeniusArtist } from '../../../types';

interface RecentSearchProps {
  search: RecentSearchType;
  onSelect: (artist: GeniusArtist) => void;
  onRemove: (searchId: string) => void;
}

/**
 * Individual recent search item component
 */
const RecentSearch = ({ search, onSelect, onRemove }: RecentSearchProps) => {
  const handleArtistSelect = () => {
    onSelect(search.artist);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(search.id);
  };

  return (
    <div className="group flex items-center space-x-2 p-1.5 rounded hover:bg-gray-50 transition-colors duration-150">
      <ArtistAvatar
        src={search.artist.image_url}
        alt={search.artist.name}
        size="sm"
      />
      
      <ArtistInfo
        name={search.artist.name}
        timestamp={search.timestamp}
        onSelect={handleArtistSelect}
      />
      
      <RemoveButton
        onRemove={handleRemove}
        size="sm"
      />
    </div>
  );
};

export default RecentSearch;

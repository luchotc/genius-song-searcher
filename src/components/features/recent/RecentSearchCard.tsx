import { ArtistCardImage, ArtistCardInfo } from '../../ui';
import { RecentSearch as RecentSearchType } from '../../../types';

interface RecentSearchCardProps {
  search: RecentSearchType;
  onSelect: (artist: RecentSearchType['artist']) => void;
}

/**
 * Individual recent search card component
 */
const RecentSearchCard = ({ search, onSelect }: RecentSearchCardProps) => {
  return (
    <div className="group">
      <div 
        onClick={() => onSelect(search.artist)}
        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 cursor-pointer"
      >
        <ArtistCardImage
          src={search.artist.image_url}
          alt={search.artist.name}
        />
        
        <ArtistCardInfo
          name={search.artist.name}
          timestamp={search.timestamp}
        />
      </div>
    </div>
  );
};

export default RecentSearchCard;

import { GeniusSong } from '../../../types';
import SongImage from './SongImage';
import SongDetails from './SongDetails';
import SongActions from './SongActions';

interface SongItemProps {
  song: GeniusSong;
  index: number;
}

/**
 * Individual song item component
 */
const SongItem = ({ song, index }: SongItemProps) => {
  return (
    <div className="group flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200">
      {/* Left side - Song info */}
      <div className="flex items-center space-x-4 flex-1 min-w-0">
        {/* Song number */}
        <div className="w-6 text-center text-sm text-gray-500 group-hover:text-gray-700">
          {index + 1}
        </div>
        
        {/* Song image */}
        <SongImage 
          imageUrl={song.song_art_image_url} 
          title={song.title} 
        />
        
        {/* Song details */}
        <SongDetails 
          title={song.title}
          featuredArtists={song.featured_artists}
        />
      </div>

      {/* Right side - Actions */}
      <SongActions 
        releaseDate={song.release_date_for_display}
        url={song.url}
      />
    </div>
  );
};

export default SongItem;

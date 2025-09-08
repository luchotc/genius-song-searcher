import { GeniusSong } from '../../../types';
import FeaturedArtists from './FeaturedArtists';

interface SongDetailsProps {
  title: string;
  featuredArtists?: GeniusSong['featured_artists'];
}

/**
 * Song details component (title and featured artists)
 */
const SongDetails = ({ title, featuredArtists }: SongDetailsProps) => {
  return (
    <div className="flex-1 min-w-0">
      <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200 truncate">
        {title}
      </h4>
      <FeaturedArtists featuredArtists={featuredArtists} />
    </div>
  );
};

export default SongDetails;

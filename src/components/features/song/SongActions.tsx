import { GeniusSong } from '../../../types';
import ReleaseDate from './ReleaseDate';
import ViewLink from './ViewLink';

interface SongActionsProps {
  releaseDate?: GeniusSong['release_date_for_display'];
  url?: GeniusSong['url'];
}

/**
 * Song actions component (release date and view link)
 */
const SongActions = ({ releaseDate, url }: SongActionsProps) => {
  return (
    <div className="flex items-center space-x-4">
      <ReleaseDate releaseDate={releaseDate} />
      <ViewLink url={url} />
    </div>
  );
};

export default SongActions;

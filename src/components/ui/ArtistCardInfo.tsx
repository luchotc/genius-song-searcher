import { ClockIcon } from './common';
import { formatRelativeTime } from '../../utils/timeUtils';

interface ArtistCardInfoProps {
  name: string;
  timestamp: number;
  className?: string;
}

/**
 * Artist card info component with name and timestamp
 */
const ArtistCardInfo = ({ name, timestamp, className = '' }: ArtistCardInfoProps) => {
  return (
    <div className={`p-6 ${className}`}>
      <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">
        {name}
      </h3>
      <div className="flex items-center text-sm text-gray-500">
        <ClockIcon className="w-4 h-4 mr-2" />
        <span>{formatRelativeTime(timestamp)}</span>
      </div>
    </div>
  );
};

export default ArtistCardInfo;

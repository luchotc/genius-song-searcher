import { ClockIcon } from '../common';
import { formatRelativeTime } from '../../../utils/timeUtils';

interface ArtistInfoProps {
  name: string;
  timestamp: number;
  onSelect: () => void;
  className?: string;
}

/**
 * Reusable artist info component with name and timestamp
 */
const ArtistInfo = ({ 
  name, 
  timestamp, 
  onSelect, 
  className = '' 
}: ArtistInfoProps) => {
  return (
    <div className={`flex-1 min-w-0 ${className}`}>
      <button
        onClick={onSelect}
        className="text-left w-full"
      >
        <h4 className="text-xs font-medium text-gray-900 hover:text-blue-600 transition-colors duration-150 truncate">
          {name}
        </h4>
        <div className="flex items-center text-xs text-gray-400">
          <ClockIcon className="w-3 h-3 mr-1" />
          <span>{formatRelativeTime(timestamp)}</span>
        </div>
      </button>
    </div>
  );
};

export default ArtistInfo;

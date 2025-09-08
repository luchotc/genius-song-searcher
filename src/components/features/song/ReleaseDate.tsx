import { TEXTS } from '../../../constants/texts';

interface ReleaseDateProps {
  releaseDate?: string;
}

/**
 * Release date display component
 */
const ReleaseDate = ({ releaseDate }: ReleaseDateProps) => {
  if (!releaseDate) return null;

  return (
    <span className="text-xs text-gray-400 hidden sm:block">
      {releaseDate}
    </span>
  );
};

export default ReleaseDate;

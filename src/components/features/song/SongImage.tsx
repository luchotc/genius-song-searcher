import { OptimizedImage } from '../../ui';

interface SongImageProps {
  imageUrl?: string | null;
  title: string;
}

/**
 * Song cover image component
 */
const SongImage = ({ imageUrl, title }: SongImageProps) => {
  return (
    <div className="w-10 h-10 flex-shrink-0">
      <OptimizedImage
        src={imageUrl || "/placeholder-song.png"}
        alt={`${title} cover`}
        className="w-full h-full object-cover rounded-md"
        loading="lazy"
        fallbackSrc="/placeholder-song.png"
      />
    </div>
  );
};

export default SongImage;

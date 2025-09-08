import { ImageWithSkeleton } from './media';

interface ArtistCardImageProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * Artist card image component with hover effects
 */
const ArtistCardImage = ({ src, alt, className = '' }: ArtistCardImageProps) => {
  return (
    <div className={`relative h-48 overflow-hidden ${className}`}>
      <ImageWithSkeleton
        src={src}
        alt={alt}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
    </div>
  );
};

export default ArtistCardImage;

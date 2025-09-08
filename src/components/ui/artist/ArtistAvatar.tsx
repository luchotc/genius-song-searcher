import { OptimizedImage } from '../media';

interface ArtistAvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Reusable artist avatar component
 */
const ArtistAvatar = ({ 
  src, 
  alt, 
  size = 'sm', 
  className = '' 
}: ArtistAvatarProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex-shrink-0 relative">
      <OptimizedImage
        src={src}
        alt={alt}
        className={`${sizeClasses[size]} rounded-full object-cover ${className}`}
        loading="lazy"
        fallbackSrc="/placeholder-artist.png"
      />
    </div>
  );
};

export default ArtistAvatar;

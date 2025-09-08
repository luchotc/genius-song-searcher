import { useState, useEffect } from 'react';
import { GeniusArtist } from '../../../types';
import ArtistStickyHeader from './ArtistStickyHeader';
import ArtistImage from './ArtistImage';
import ArtistInfo from './ArtistInfo';

const ArtistHeader = ({ artist }: { artist: GeniusArtist | null }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      // Sticky header appears when main header is out of view by 300px
      setIsScrolled(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!artist) return null;

  return (
    <>
      {/* Sticky Header - Only shows when scrolled by 300px */}
      <ArtistStickyHeader artist={artist} isVisible={isScrolled} />

      {/* Main Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        {/* Artist Info Section */}
        <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center lg:items-end space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6">
              {/* Artist Image */}
              <ArtistImage artist={artist} size="large" />
              
              {/* Artist Info */}
              <ArtistInfo artist={artist} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtistHeader;

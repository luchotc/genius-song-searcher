import { useRouteError, useNavigate } from 'react-router-dom';
import { Footer, ContentContainer } from '../components/layout';

/**
 * Error boundary component for artist page
 */
const ArtistErrorPage = () => {
  const error = useRouteError() as { status?: number };
  const navigate = useNavigate();

  const handleBackToSearch = () => {
    navigate('/');
  };

  return (
    <ContentContainer>
      {/* Error Content */}
      <div className="text-center py-12">
        <div className="text-red-400 mb-6">
          <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">Error loading artist</h3>
        <p className="text-gray-500 text-lg mb-4">
          {error?.status === 404 ? 'Artist not found' : 'Something went wrong while loading the artist data'}
        </p>
        <button
          onClick={handleBackToSearch}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-2xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200"
        >
          Back to Search
        </button>
      </div>

      {/* Footer */}
      <Footer />
    </ContentContainer>
  );
};

export default ArtistErrorPage;
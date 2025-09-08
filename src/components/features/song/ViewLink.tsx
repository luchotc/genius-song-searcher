import { TEXTS } from '../../../constants/texts';

interface ViewLinkProps {
  url?: string;
}

/**
 * View link component with external link icon
 */
const ViewLink = ({ url }: ViewLinkProps) => {
  if (!url) {
    return (
      <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {TEXTS.SONGS_NO_LINK}
      </span>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs text-blue-600 hover:text-blue-800 font-medium hover:underline opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      title={TEXTS.SONGS_VIEW_ON_GENIUS}
    >
      {TEXTS.SONGS_VIEW_ON_GENIUS}
      <svg className="w-3 h-3 ml-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  );
};

export default ViewLink;

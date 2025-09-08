import { TEXTS } from '../../constants/texts';

/**
 * Footer component with Genius API attribution
 */
const Footer = () => {
  return (
    <div className="text-center text-sm text-gray-500 mt-16 sm:mt-20">
      <p className="mb-2">
        {TEXTS.FOOTER_POWERED_BY}{' '}
        <a
          href="https://genius.com/api-clients"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          {TEXTS.FOOTER_GENIUS_API}
        </a>
      </p>
      <p className="text-xs text-gray-400">
        {TEXTS.FOOTER_DESCRIPTION}
      </p>
    </div>
  );
};

export default Footer;

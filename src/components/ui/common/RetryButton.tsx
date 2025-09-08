interface RetryButtonProps {
  onRetry: () => void;
  className?: string;
}

/**
 * Reusable retry button component
 */
const RetryButton = ({ onRetry, className = '' }: RetryButtonProps) => {
  return (
    <button
      onClick={onRetry}
      className={`bg-red-100 hover:bg-red-200 text-red-800 text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-md ${className}`}
    >
      Retry
    </button>
  );
};

export default RetryButton;

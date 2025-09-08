import { TEXTS } from '../../../constants/texts';

interface RemoveButtonProps {
  onRemove: (e: React.MouseEvent) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Reusable remove button component with hover effects
 */
const RemoveButton = ({ 
  onRemove, 
  className = '', 
  size = 'sm' 
}: RemoveButtonProps) => {
  const sizeClasses = {
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  return (
    <button
      onClick={onRemove}
      className={`opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all duration-150 p-0.5 rounded hover:bg-red-50 ${className}`}
      title={TEXTS.RECENT_SEARCHES_REMOVE}
    >
      <svg className={sizeClasses[size]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
};

export default RemoveButton;

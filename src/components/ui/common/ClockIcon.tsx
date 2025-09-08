interface ClockIconProps {
  className?: string;
}

/**
 * Clock icon with backwards arrow component
 */
const ClockIcon = ({ className = "w-4 h-4" }: ClockIconProps) => {
  return (
    <svg 
      className={className} 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Clock circle */}
      <circle cx="12" cy="12" r="10"/>
      
      {/* Clock hands */}
      <path d="M12 6v6l4 4"/>
      
      {/* Backwards arrow */}
      <path d="M3 3l3 3"/>
      <path d="M6 3v6"/>
    </svg>
  );
};

export default ClockIcon;

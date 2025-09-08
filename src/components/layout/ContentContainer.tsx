import { ReactNode } from 'react';

interface ContentContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Reusable content container with consistent max-width and responsive padding
 */
const ContentContainer = ({ children, className = '' }: ContentContainerProps) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 ${className}`}>
      {children}
    </div>
  );
};

export default ContentContainer;

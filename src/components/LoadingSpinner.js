import React from 'react';

const LoadingSpinner = ({ size = 'md', color = 'yellow' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    yellow: 'border-t-accent-yellow border-r-accent-orange',
    blue: 'border-t-accent-blue border-r-accent-purple',
    green: 'border-t-accent-green border-r-accent-blue',
    pink: 'border-t-accent-pink border-r-accent-red'
  };

  return (
    <div className="flex items-center justify-center">
      <div 
        className={`magazine-spinner ${sizeClasses[size]} ${colorClasses[color]}`}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
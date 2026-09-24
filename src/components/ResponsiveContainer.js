import React from 'react';

const ResponsiveContainer = ({ 
  children, 
  className = '', 
  maxWidth = '7xl',
  padding = 'default',
  center = true 
}) => {
  const maxWidthClasses = {
    'sm': 'max-w-sm',
    'md': 'max-w-md',
    'lg': 'max-w-lg',
    'xl': 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    'full': 'max-w-full'
  };

  const paddingClasses = {
    'none': '',
    'sm': 'px-4 sm:px-6',
    'default': 'px-4 sm:px-6 lg:px-8',
    'lg': 'px-6 sm:px-8 lg:px-12',
    'xl': 'px-8 sm:px-12 lg:px-16'
  };

  const centerClass = center ? 'mx-auto' : '';

  return (
    <div 
      className={`
        ${maxWidthClasses[maxWidth]} 
        ${paddingClasses[padding]} 
        ${centerClass} 
        ${className}
      `.trim()}
    >
      {children}
    </div>
  );
};

export default ResponsiveContainer;
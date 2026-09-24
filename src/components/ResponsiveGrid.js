import React from 'react';

const ResponsiveGrid = ({ 
  children, 
  className = '',
  cols = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = 'md',
  autoFit = false,
  minItemWidth = '300px'
}) => {
  const gapClasses = {
    'none': 'gap-0',
    'sm': 'gap-2 sm:gap-4',
    'md': 'gap-4 sm:gap-6 lg:gap-8',
    'lg': 'gap-6 sm:gap-8 lg:gap-12',
    'xl': 'gap-8 sm:gap-12 lg:gap-16'
  };

  const getGridCols = () => {
    if (autoFit) {
      return `grid-cols-[repeat(auto-fit,minmax(${minItemWidth},1fr))]`;
    }

    const colClasses = [];
    if (cols.sm) colClasses.push(`grid-cols-${cols.sm}`);
    if (cols.md) colClasses.push(`md:grid-cols-${cols.md}`);
    if (cols.lg) colClasses.push(`lg:grid-cols-${cols.lg}`);
    if (cols.xl) colClasses.push(`xl:grid-cols-${cols.xl}`);
    if (cols['2xl']) colClasses.push(`2xl:grid-cols-${cols['2xl']}`);

    return colClasses.join(' ');
  };

  return (
    <div 
      className={`
        grid 
        ${getGridCols()} 
        ${gapClasses[gap]} 
        ${className}
      `.trim()}
    >
      {children}
    </div>
  );
};

export default ResponsiveGrid;
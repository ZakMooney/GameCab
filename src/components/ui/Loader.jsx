import React from 'react';

const Loader = ({
  size = 'md',
  className = '',
}) => {

  const outerSizes = {
    xs: 'border-2 w-6 h-6',
    sm: 'border-3 w-12 h-12',
    md: 'border-4 w-20 h-20',
    lg: 'border-6 w-32 h-32',
  };

  const innerSizes = {
    xs: 'border-2 w-4 h-4',
    sm: 'border-3 w-8 h-8',
    md: 'border-4 w-16 h-16',
    lg: 'border-6 w-24 h-24',
  };

  const conClasses = `
    flex-col gap-4 w-full flex items-center justify-center
    ${className}
  `.replace(/\s+/g, ' ').trim();

  const outerClasses = `
    text-cyan-400
    border-transparent border-t-cyan-400
    flex items-center justify-center rounded-full animate-spin
    ${outerSizes[size] || outerSizes.md}
  `.replace(/\s+/g, ' ').trim();

  const innerClasses = `
    text-fuchsia-400
    border-transparent border-t-fuchsia-400
    flex items-center justify-center rounded-full animate-spin
    ${innerSizes[size] || innerSizes.md}
  `.replace(/\s+/g, ' ').trim();

  return (
    <div className={conClasses}>
      <div className={outerClasses}>
        <div className={innerClasses} />
      </div>
    </div>
  );
};

export default Loader;
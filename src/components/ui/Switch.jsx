
import React from 'react';

const Switch = ({
  options = [],
  value,
  onChange,
  size = 'md',
  disabled = false,
  className = '',
  ...props
}) => {
  const containerStyles = `
    w-fit rounded-lg p-1
    bg-gray-100 dark:bg-gray-850
    border border-gray-300 dark:border-gray-600
    transition-all duration-200
    ${disabled ? 'opacity-50 cursor-default' : ''}
    ${className}
  `.trim();

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const baseButtonStyles = `
    cursor-pointer rounded font-medium transition-all duration-200
    focus:outline-none
    disabled:opacity-50 disabled:cursor-default
    ${sizes[size] || sizes.md}
  `.trim();

  const getButtonStyles = (isActive, optionDisabled = false) => {
    const baseStyles = baseButtonStyles;
    
    if (isActive) {
      return `${baseStyles}
        bg-white hover:bg-gray-50 dark:bg-gray-200 dark:hover:bg-gray-100
        text-amber-500 dark:text-blue-400
        shadow-sm
      `.trim();
    }
    
    if (optionDisabled || disabled) {
      return `${baseStyles} text-gray-400 cursor-default`;
    }
    
    return `${baseStyles}
      bg-gray-100 hover:bg-white dark:bg-gray-850 dark:hover:bg-gray-800
      text-gray-300 dark:text-gray-500 hover:text-gray-500 hover:dark:text-gray-300
    `.trim();
  };

  const handleOptionClick = (optionValue, optionDisabled = false) => {
    if (disabled || optionDisabled) return;
    onChange?.(optionValue);
  };

  return (
    <div className={containerStyles} {...props}>
      {options.map((option) => {
        const optionValue = typeof option === 'string' ? option : option.value;
        const optionLabel = typeof option === 'string' ? option : option.label;
        const optionDisabled = typeof option === 'object' ? option.disabled : false;
        const isActive = value === optionValue;
        
        return (
          <button
            key={optionValue}
            onClick={() => handleOptionClick(optionValue, optionDisabled)}
            className={getButtonStyles(isActive, optionDisabled)}
            disabled={disabled || optionDisabled}
            type="button"
          >
            {optionLabel}
          </button>
        );
      })}
    </div>
  );
};

export default Switch;
import React from 'react';

import { ChevronDown } from 'lucide-react';

const Select = ({
  options = [],
  value,
  onChange,
  placeholder = 'Select an option...',
  disabled = false,
  error = false,
  size = 'md',
  fullWidth = false,
  className = '',
  icon,
  label,
  helpText,
  required = false,
  ...props
}) => {
  const baseStyles = `
    bg-transparent hover:bg-gray-500/10 dark:hover:bg-gray-200/10
    text-gray-700 dark:text-gray-200
    focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-300
    rounded-lg transition-all duration-200 cursor-pointer appearance-none 
    disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none
    ${fullWidth ? 'w-full' : ''}
  `.trim();

  const sizes = {
    sm: 'px-3 py-2 pr-8 text-xs',
    md: 'px-4 py-2.5 pr-8 text-sm',
    lg: 'px-5 py-3 pr-10 text-base',
  };

  const stateStyles = error 
    ? 'border border-red-300 focus:ring-red-500 focus:border-red-500'
    : 'border border-gray-400 dark:border-gray-500';

  const selectClasses = `
    ${baseStyles}
    ${sizes[size] || sizes.md}
    ${stateStyles}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  const containerClasses = `
    relative inline-block
    ${fullWidth ? 'w-full' : ''}
  `.trim();

  const handleChange = (e) => {
    onChange?.(e.target.value, e);
  };

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className={containerClasses}>
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-200 pointer-events-none">
            {icon}
          </div>
        )}

        <select
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className={`${selectClasses} ${icon ? 'pl-10' : ''}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          
          {options.map((option) => {
            const optionValue = typeof option === 'string' ? option : option.value;
            const optionLabel = typeof option === 'string' ? option : option.label;
            const optionDisabled = typeof option === 'object' ? option.disabled : false;
            
            return (
              <option 
                key={optionValue} 
                value={optionValue}
                disabled={optionDisabled}
              >
                {optionLabel}
              </option>
            );
          })}
        </select>

        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-200 pointer-events-none">
          <ChevronDown className={size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />
        </div>
      </div>

      {helpText && (
        <p className={`mt-1 text-xs ${error ? 'text-red-600' : 'text-gray-500 dark:text-gray-200'}`}>
          {helpText}
        </p>
      )}
    </div>
  );
};

export default Select;
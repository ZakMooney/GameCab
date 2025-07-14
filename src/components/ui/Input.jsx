import React, { useState } from 'react';
import { X } from 'lucide-react';

import Typography from './Typography';

const Input = ({ 
  value, 
  onChange, 
  placeholder = "Search...", 
  className = "",
  disabled = false,
  onClear,
  showClearButton = true,
  size = "md",
  icon = "",
  label,
  hint,
  required = false,
  id
}) => {
  const [internalValue, setInternalValue] = useState('');
  
  const inputValue = value !== undefined ? value : internalValue;
  
  const handleChange = (e) => {
    const newValue = e.target.value;
    if (onChange) {
      onChange(e);
    } else {
      setInternalValue(newValue);
    }
  };
  
  const handleClear = () => {
    if (onClear) {
      onClear();
    } else if (onChange) {
      const syntheticEvent = {
        target: { value: '' },
        currentTarget: { value: '' }
      };
      onChange(syntheticEvent);
    } else {
      setInternalValue('');
    }
  };
  
  const sizeClasses = {
    sm: `${icon ? 'pl-10' : 'pl-2'} pr-10 py-2 text-sm`,
    md: `${icon ? 'pl-12' : 'pl-3'} pr-12 py-3 text-lg`,
    lg: `${icon ? 'pl-14' : 'pl-4'} pr-14 py-4 text-xl`
  };
  
  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };
  
  const iconPositions = {
    sm: "left-3",
    md: "left-4",
    lg: "left-5"
  };
  
  const clearButtonPositions = {
    sm: "right-3",
    md: "right-4",
    lg: "right-5"
  };
  
  const inputId = id || `search-input-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className={`${className}`}>
      {label && (
        <label 
          htmlFor={inputId}
          className="block mb-2"
        >
          <Typography
            variant="caption"
            align="left"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </Typography>
        </label>
      )}
      
      <div className="relative">
        <input
          id={inputId}
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`
            w-full 
            ${sizeClasses[size]}
            border border-gray-300 
            bg-white dark:bg-gray-700 
            dark:border-gray-600 
            rounded-lg 
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
            outline-none 
            transition-all 
            text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-500
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        />

        {icon && (
          <div className={`absolute ${iconPositions[size]} top-1/2 transform -translate-y-1/2 pointer-events-none`}>
            {icon}
          </div>
        )}

        {showClearButton && inputValue && (
          <button
            type="button"
            onClick={handleClear}
            disabled={disabled}
            className={`
              absolute ${clearButtonPositions[size]} top-1/2 transform -translate-y-1/2 
              text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
              transition-colors cursor-pointer
              p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            <X className={iconSizes[size]} />
          </button>
        )}
      </div>

      {hint && (
        <Typography
          variant="caption"
          align="left"
          color="muted"
          className="mt-2"
        >
          {hint}
        </Typography>      
      )}
    </div>
  );
};

export default Input;
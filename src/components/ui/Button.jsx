import React from 'react';

import {
  LoaderCircle,
} from 'lucide-react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  onClick,
  type = 'button',
  className = '',
  active = false,
  ...props
}) => {
  const baseStyles = `
    cursor-pointer inline-flex items-center justify-center font-medium rounded-lg
    transition-all duration-200 focus:outline-none focus:ring-2
    disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none
    ${loading ? 'cursor-wait' : ''}
    ${fullWidth ? 'w-full' : ''}
  `.trim();

  const variants = {
    primary: `
      bg-primary dark:bg-primary-dark
      text-white
      focus:ring-primary dark:focus:ring-primary-dark
      hover:brightness-[110%]
    `,
    secondary: `
      bg-gray-100 hover:bg-gray-200 dark:bg-gray-850 dark:hover:bg-gray-800
      text-gray-700 dark:text-gray-200
      focus:ring-gray-500 dark:focus:ring-gray-500
      active:bg-gray-500 dark:active:bg-gray-500
      hover:brightness-[110%]
    `,
    ghost: `
      bg-transparent hover:bg-gray-500/10 dark:hover:bg-gray-10/10
      text-base-text dark:text-base-text-dark
      border border-transparent
      focus:ring-gray-500 dark:focus:ring-gray-500
      hover:brightness-[110%]
    `,
    ghostActive: `
      bg-gray-500/10 dark:bg-gray-10/10 hover:bg-gray-500/20 dark:hover:bg-gray-10/20
      text-base-text dark:text-base-text-dark
      border border-transparent
      focus:ring-gray-500 dark:focus:ring-gray-500
      hover:brightness-[110%]
    `,
    danger: `
      bg-danger dark:bg-danger-dark
      text-white
      focus:ring-danger dark:focus:ring-danger-dark
      hover:brightness-[110%]
    `,
    success: `
      bg-success dark:bg-success-dark
      text-white
      focus:ring-success dark:focus:ring-success-dark
      hover:brightness-[110%]
    `,
    warning: `
      bg-warning dark:bg-warning-dark
      text-white
      focus:ring-warning dark:focus:ring-warning-dark
      hover:brightness-[110%]
    `,
    outline: `
      bg-transparent hover:bg-gray-500/10 dark:hover:bg-gray-200/10
      text-gray-700 dark:text-gray-200
      border border-gray-400 dark:border-gray-500
      focus:ring-gray-400 dark:focus:ring-gray-300
      hover:brightness-[110%]
    `,
    outlinePrimary: `
      bg-transparent hover:bg-primary/10 dark:hover:bg-primary-dark/10
      text-primary dark:text-primary-dark
      border border-primary dark:border-primary-dark
      focus:ring-primary dark:focus:ring-primary-dark
      hover:brightness-[110%]
    `,
    outlineDanger: `
      bg-transparent hover:bg-danger/10 dark:hover:bg-danger-dark/10
      text-danger dark:text-danger-dark
      border border-danger dark:border-danger-dark
      focus:ring-danger dark:focus:ring-danger-dark
      hover:brightness-[110%]
    `,
    outlineSuccess: `
      bg-transparent hover:bg-success/10 dark:hover:bg-success-dark/10
      text-success dark:text-success-dark
      border border-success dark:border-success-dark
      focus:ring-success dark:focus:ring-success-dark
      hover:brightness-[110%]
    `,
    outlineWarning: `
      bg-transparent hover:bg-warning/10 dark:hover:bg-warning-dark/10
      text-warning dark:text-warning-dark
      border border-warning dark:border-warning-dark
      focus:ring-warning dark:focus:ring-warning-dark
      hover:brightness-[110%]
    `,
  };

  const sizes = {
    xxs: 'p-1 text-xs gap-1',
    xs: 'px-1.5 md:px-2.5 py-1.5 text-xs gap-1',
    sm: 'px-2 md:px-3 py-2 text-sm gap-1.5',
    md: 'px-2.5 md:px-4 py-2.5 text-sm gap-2',
    lg: 'px-3 md:px-6 py-3 text-base gap-2.5',
    xl: 'px-4 md:px-8 py-4 text-lg gap-3',
  };

  const LoadingSpinner = () => (
    <LoaderCircle className="h-4 w-4 animate-spin" />
  );

  const buttonClasses = `
    ${baseStyles}
    ${variants[variant] || variants.primary}
    ${sizes[size] || sizes.md}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {!loading && icon && iconPosition === 'left' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      {children}
      {!loading && icon && iconPosition === 'right' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </button>
  );
};

export default Button;
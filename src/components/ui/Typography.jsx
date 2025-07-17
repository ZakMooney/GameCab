import React from 'react';

const Typography = ({
  element,
  variant = 'body', 
  color = 'default',
  weight = '',
  align = 'left',
  className = '',
  children,
  ...props
}) => {
  const variantStyles = {
    h1: 'text-4xl @md:text-5xl @lg:text-6xl font-bold leading-none',
    h1Icon: 'text-4xl @md:text-5xl @lg:text-6xl font-bold flex items-center gap-3 leading-none',
    h2: 'text-3xl @md:text-4xl @lg:text-5xl font-semibold leading-none',
    h3: 'text-2xl @md:text-3xl @lg:text-4xl font-semibold leading-none',
    h4: 'text-xl @md:text-2xl @lg:text-3xl font-medium leading-none',
    h5: 'text-lg @md:text-xl @lg:text-2xl font-medium leading-none',
    h6: 'text-base @md:text-lg @lg:text-xl font-medium leading-none',
    body: 'text-base opacity-80',
    small: 'text-sm opacity-80',
    caption: 'text-xs leading-tight opacity-80',
    subtitle: 'text-lg font-medium leading-tight',
    gameTitle: 'text-sm font-bold leading-none',
  };

  const colorStyles = {
    default: 'text-base-text dark:text-base-text-dark',
    heading: 'text-heading-text dark:text-heading-text-dark',
    primary: 'text-primary dark:text-primary-dark',
    secondary: 'text-secondary dark:text-secondary-dark',
    success: 'text-success dark:text-success-dark',
    warning: 'text-warning dark:text-warning-dark',
    error: 'text-error dark:text-error-dark',
    muted: 'text-base-text dark:text-base-text-dark opacity-60',
    white: 'text-white dark:text-white',
  };

  const weightStyles = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  };

  const getElement = () => {
    if (element) return element;
    
    // Default element based on variant
    const elementMap = {
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
      body: 'p',
      caption: 'p',
      small: 'p',
      overline: 'span',
      subtitle: 'h6',
      gameTitle: 'h3',
    };
    
    return elementMap[variant] || 'p';
  };

  const classes = [
    variantStyles[variant],
    colorStyles[color],
    weightStyles[weight],
    alignStyles[align],
    className,
  ].filter(Boolean).join(' ');

  const Component = getElement();

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

export default Typography;
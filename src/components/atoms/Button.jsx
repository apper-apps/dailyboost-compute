import React from 'react';
import { cn } from '@/utils/cn';

const Button = React.forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'medium',
  children,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-opacity-90 focus:ring-primary/50 shadow-lg hover:shadow-xl",
    secondary: "bg-secondary text-white hover:bg-opacity-90 focus:ring-secondary/50 shadow-lg hover:shadow-xl",
    accent: "bg-accent text-gray-900 hover:bg-opacity-90 focus:ring-accent/50 shadow-lg hover:shadow-xl",
    gradient: "premium-button text-white focus:ring-primary/50",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary/50",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-300",
    success: "bg-success text-white hover:bg-opacity-90 focus:ring-success/50 shadow-lg hover:shadow-xl",
    warning: "bg-warning text-gray-900 hover:bg-opacity-90 focus:ring-warning/50 shadow-lg hover:shadow-xl",
    error: "bg-error text-white hover:bg-opacity-90 focus:ring-error/50 shadow-lg hover:shadow-xl",
  };

  const sizes = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-sm",
    large: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
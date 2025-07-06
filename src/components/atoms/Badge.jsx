import React from 'react';
import { cn } from '@/utils/cn';

const Badge = React.forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'medium',
  children,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium";
  
  const variants = {
    primary: "bg-primary text-white",
    secondary: "bg-secondary text-white",
    accent: "bg-accent text-gray-900",
    success: "bg-success text-white",
    warning: "bg-warning text-gray-900",
    error: "bg-error text-white",
    info: "bg-info text-white",
    free: "bg-gray-100 text-gray-700",
    basic: "bg-gradient-to-r from-secondary to-success text-white",
    pro: "bg-gradient-to-r from-primary via-secondary to-accent text-white",
  };

  const sizes = {
    small: "px-2 py-0.5 text-xs",
    medium: "px-3 py-1 text-sm",
    large: "px-4 py-1.5 text-base",
  };

  return (
    <span
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
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;
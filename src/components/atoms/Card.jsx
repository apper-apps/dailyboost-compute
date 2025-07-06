import React from 'react';
import { cn } from '@/utils/cn';

const Card = React.forwardRef(({ 
  className, 
  variant = 'default',
  children,
  ...props 
}, ref) => {
  const baseStyles = "rounded-xl border border-gray-200 bg-white shadow-sm";
  
  const variants = {
    default: "shadow-sm hover:shadow-md transition-shadow duration-200",
    elevated: "shadow-lg hover:shadow-xl transition-shadow duration-200",
    quote: "quote-card border-none",
    sunrise: "sunrise-card border-none",
    gradient: "bg-gradient-to-br from-primary/5 to-secondary/5 border-none",
    pricing: "plan-card shadow-lg hover:shadow-xl",
  };

  return (
    <div
      className={cn(
        baseStyles,
        variants[variant],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;
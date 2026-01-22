import { Button as HeadlessButton } from '@headlessui/react';
import Link from 'next/link';
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white' | 'white-outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  href?: string;
  external?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  href,
  external = false,
  fullWidth = false,
}) => {
  const baseClasses
    = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-bold font-special-gothic';

  const variantClasses = {
    primary: 'bg-primary-600 text-white shadow-sm focus:ring-primary-500',
    secondary: 'bg-secondary-600 text-white shadow-sm focus:ring-secondary-500',
    outline:
      'border-2 border-primary-600 text-primary-600 focus:ring-primary-500',
    ghost: 'text-primary-600 focus:ring-primary-500',
    white: 'bg-white text-gray-900 shadow-sm focus:ring-gray-500 border border-gray-300',
    'white-outline': 'border-2 border-white text-white focus:ring-white',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2 text-base',
    lg: 'px-8 py-3 text-lg',
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? '!w-full' : ''} ${className}`;

  if (href) {
    if (external) {
      return (
        <HeadlessButton as="a" href={href} className={buttonClasses} target="_blank" rel="noopener noreferrer">
          {children}
        </HeadlessButton>
      );
    }

    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    );
  }

  return (
    <HeadlessButton type={type} className={buttonClasses} onClick={onClick} disabled={disabled}>
      {children}
    </HeadlessButton>
  );
};

export default Button;

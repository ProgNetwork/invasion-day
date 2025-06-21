import { Button as HeadlessButton } from "@headlessui/react";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "white" | "white-outline";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  href?: string;
  external?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  type = "button",
  disabled = false,
  className = "",
  href,
  external = false,
  fullWidth = false,
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-semibold";

  const variantClasses = {
    primary: "bg-primary-600 hover:bg-primary-700 text-white shadow-sm hover:shadow-md focus:ring-primary-500",
    secondary: "bg-secondary-600 hover:bg-secondary-700 text-white shadow-sm hover:shadow-md focus:ring-secondary-500",
    outline:
      "border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white focus:ring-primary-500",
    ghost: "text-primary-600 hover:bg-primary-50 focus:ring-primary-500",
    white: "bg-white hover:bg-gray-50 text-gray-900 shadow-sm hover:shadow-md focus:ring-gray-500 border border-gray-300",
    "white-outline": "border-2 border-white text-white hover:bg-white hover:text-gray-900 focus:ring-white",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-2 text-base",
    lg: "px-8 py-3 text-lg",
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? "w-full" : ""} ${className}`;

  if (href) {
    if (external) {
      return (
        <HeadlessButton as="a" href={href} className={buttonClasses} target="_blank" rel="noopener noreferrer">
          {children}
        </HeadlessButton>
      );
    }

    return (
      <HeadlessButton as="a" href={href} className={buttonClasses}>
        {children}
      </HeadlessButton>
    );
  }

  return (
    <HeadlessButton type={type} className={buttonClasses} onClick={onClick} disabled={disabled}>
      {children}
    </HeadlessButton>
  );
};

export default Button;

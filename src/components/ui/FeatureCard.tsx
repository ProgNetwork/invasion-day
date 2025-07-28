import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  colorScheme?: 'primary' | 'secondary';
  align?: 'left' | 'center';
  size?: 'base' | 'large';
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  colorScheme = 'secondary',
  align = 'left',
  size = 'base',
}) => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
  };

  const colorClasses = {
    primary: {
      bg: 'bg-primary-100',
      text: 'text-primary-600',
    },
    secondary: {
      bg: 'bg-secondary-100',
      text: 'text-secondary-600',
    },
  };

  const sizeClasses = {
    base: {
      container: 'p-6',
      iconContainer: 'w-12 h-12 mb-4 rounded-lg',
      title: 'text-xl',
      description: '',
    },
    large: {
      container: 'p-8',
      iconContainer: 'w-16 h-16 mb-6 rounded-full',
      title: 'text-2xl',
      description: 'leading-relaxed',
    },
  };

  const currentSize = sizeClasses[size];
  const currentColor = colorClasses[colorScheme];

  return (
    <div
      className={`h-full rounded-lg border border-gray-200 bg-white transition-shadow duration-300 hover:shadow-lg ${currentSize.container} ${alignmentClasses[align]}`}
    >
      <div
        className={`${currentColor.bg} ${currentColor.text} flex items-center justify-center ${currentSize.iconContainer} ${align === 'center' ? 'mx-auto' : ''}`}
      >
        {icon}
      </div>
      <h3 className={`mb-2 font-bold text-gray-900 ${currentSize.title}`}>{title}</h3>
      <p className={`text-gray-600 ${currentSize.description}`}>{description}</p>
    </div>
  );
};

export default FeatureCard;

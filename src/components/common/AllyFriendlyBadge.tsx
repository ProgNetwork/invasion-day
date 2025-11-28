import React from 'react';
// import Image from 'next/image'; // Removed as image is no longer needed

const AllyFriendlyBadge: React.FC = () => {
  return (
    <div className="inline-flex items-center space-x-1 bg-green-100 px-2 py-1 rounded-full border border-green-200">
      {/* <Image src="/images/ally-friendly-icon.svg" alt="Ally Friendly Icon" width={16} height={16} /> */}
      <span className="text-green-800 font-medium text-xs">Ally Friendly</span>
    </div>
  );
};

export default AllyFriendlyBadge;

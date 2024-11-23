import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-emerald-500 animate-spin-reverse"></div>
        </div>
      </div>
      <div className="absolute mt-32 text-white font-semibold">Loading...</div>
    </div>
  );
};

export default LoadingSpinner;

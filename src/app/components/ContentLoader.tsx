// components/ContentLoader.tsx
import React from "react";

const ContentLoader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[60vh] p-8">
      <div className="relative">
        {/* Outer circle */}
        <div className="w-16 h-16 rounded-full border-4 border-blue-200 dark:border-blue-800 animate-pulse"></div>
        {/* Inner spinner */}
        <div className="absolute top-0 left-0 w-16 h-16">
          <div className="w-16 h-16 rounded-full border-t-4 border-[#2D87FF] animate-spin"></div>
        </div>
        {/* Logo in center */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 bg-[#2D87FF] rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">PB</span>
          </div>
        </div>
      </div>
      <p className="mt-4 text-gray-600 dark:text-gray-300">Loading content...</p>
    </div>
  );
};

export default ContentLoader;
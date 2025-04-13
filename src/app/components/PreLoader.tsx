// Create a new file named Preloader.tsx or Preloader.jsx
import React from "react";

const Preloader = () => {
  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Loading...</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Preparing learning modules</p>
      </div>
    </div>
  );
};

export default Preloader;
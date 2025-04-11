import { useState } from 'react';

export default function CompletedModules() {
  const [completedModules, setCompletedModules] = useState(3);
  const totalModules = 6;
  const progressPercentage = (completedModules / totalModules) * 100;

  return (
    <div className="mt-3 p-4 bg-white rounded-lg shadow-sm">
      <p className="text-md font-medium text-blue-700 mb-2">Completed Modules</p>
      <div className="flex items-center mb-3">
        <span className="text-3xl font-bold text-blue-600">{completedModules}</span>
        <span className="text-md text-gray-600 ml-2">of {totalModules}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div 
          className="bg-blue-600 h-4 rounded-full transition-all duration-500 ease-in-out" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
}
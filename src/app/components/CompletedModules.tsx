"use client";

import { useState, useEffect } from 'react';
import { getCompletedModules } from '../../../lib/moduleDB'; // Adjust this path to match your project structure

export default function CompletedModules() {
  // Initialize with your default values
  const [completedModules, setCompletedModules] = useState(0);
  const totalModules =25; // This should match your actual total number of modules
  
  // Fetch the completed modules from IndexedDB when component mounts
  useEffect(() => {
    const loadCompletedModules = async () => {
      try {
        const modules = await getCompletedModules();
        setCompletedModules(modules.length);
      } catch (error) {
        console.error("Error loading completed modules:", error);
      }
    };
    
    loadCompletedModules();
    
    // Add event listener to update when modules are completed elsewhere
    const handleModuleCompleted = () => {
      loadCompletedModules();
    };
    
    window.addEventListener('moduleCompleted', handleModuleCompleted);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('moduleCompleted', handleModuleCompleted);
    };
  }, []);
  
  const progressPercentage = (completedModules / totalModules) * 100;
  
  // Your original design is preserved exactly
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
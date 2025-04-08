"use client";

import React, { useState, useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const CustomToast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  isVisible,
  onClose,
  duration = 5000,
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  // Clean, subtle styling based on toast type
  const bgColor = 'bg-white';
  
  // Simple, subtle colors that match your UI
  const iconColor = type === 'success' ? 'text-green-600' : 
                   type === 'error' ? 'text-red-600' : 'text-blue-600';
  
  const getIcon = () => {
    if (type === 'success') {
      return (
        <svg className={`h-5 w-5 ${iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      );
    } else if (type === 'error') {
      return (
        <svg className={`h-5 w-5 ${iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      );
    } else {
      return (
        <svg className={`h-5 w-5 ${iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className={`${bgColor} shadow-md rounded-lg max-w-md flex items-center py-3 px-4`}>
        <div className="mr-3 flex-shrink-0">
          {getIcon()}
        </div>
        <div className="flex-1">
          <p className="text-gray-800">{message}</p>
        </div>
        <button 
          onClick={onClose}
          className="ml-4 text-gray-400 hover:text-gray-600 focus:outline-none"
          aria-label="Close notification"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CustomToast;
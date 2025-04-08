"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export type SlideProps = {
  id: string;
  image: string;
  title: string;
  content: string;
};

type CarouselComponentProps = {
  slides: SlideProps[];
  themeColor?: string;
  onModuleComplete?: (moduleId: string) => void;
  completedModules?: string[];
  finishButtonText?: string;
  completedButtonText?: string;
  continueButtonText?: string;
  backButtonText?: string;
  moduleId?: string; // Added to support the parent module ID
};

const CarouselComponent: React.FC<CarouselComponentProps> = ({
  slides,
  themeColor = "blue",
  onModuleComplete,
  completedModules = [], // Expect this to be passed from the parent
  finishButtonText = "Finish Reading",
  completedButtonText = "✓ Completed",
  continueButtonText = "Continue Reading",
  backButtonText = "Back",
  moduleId = "anti-carnapping", // Default module ID
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size on mount and when window resizes
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkScreenSize();

    // Add resize listener
    window.addEventListener('resize', checkScreenSize);

    // Clean up
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleFinish = () => {
    // Use the parent moduleId instead of the individual slide ID
    if (!isModuleCompleted() && onModuleComplete) {
      onModuleComplete(moduleId);
    }
  };

  // Check if the entire module is completed, not just the current slide
  const isModuleCompleted = () => {
    return completedModules.includes(moduleId);
  };

  return (
    <div className="w-full max-w-6xl mx-auto"> 
      {/* Desktop view - Side-by-side layout */}
      {!isMobile && (
        <div className="relative flex items-center h-[500px]">
          {/* Previous button with minimal circle design */}
          <button
            onClick={prevSlide}
            className={`absolute left-4 z-10 bg-white rounded-full w-12 h-12 flex items-center justify-center
            focus:outline-none shadow-md
            hover:bg-gray-50 active:bg-gray-100
            hover:shadow-lg active:shadow-md
            transform transition-all duration-200
            active:scale-95 hover:scale-100
            text-${themeColor}-500 hover:text-${themeColor}-600`}
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Carousel content */}
          <div className="w-full overflow-hidden rounded-2xl shadow-lg">
            <div className="flex transition-transform duration-500 ease-in-out h-[500px]"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {slides.map((slide, index) => (
                <div key={index} className="min-w-full flex bg-white h-full">
                  {/* Image container - left side */}
                  <div className="w-3/5 relative bg-white">
                    <div className="w-full h-full relative">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-contain w-full h-full"
                        priority
                      />
                    </div>
                  </div>

                  {/* Content container - right side */}
                  <div className="w-2/5 p-12 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-5 text-gray-800">{slide.title}</h2>
                    <p className="text-lg text-gray-600 leading-relaxed mb-8">{slide.content}</p>
                    
                    {/* Show Finish Reading button on last slide */}
                    {index === slides.length - 1 && (
                      <button
                        onClick={handleFinish}
                        className={`${isModuleCompleted() 
                          ? 'bg-green-500 hover:bg-green-600 border-green-700' 
                          : `bg-${themeColor}-500 hover:bg-${themeColor}-600 border-${themeColor}-700`
                        } text-white font-medium py-3 px-6 rounded-lg 
                        transition-all w-full border-b-4
                        hover:border-b-2 hover:mb-0.5 hover:translate-y-0.5
                        active:border-b-0 active:mb-1 active:translate-y-1`}
                      >
                        {isModuleCompleted() ? completedButtonText : finishButtonText}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next button with minimal circle design */}
          <button
            onClick={nextSlide}
            className={`absolute right-4 z-10 bg-white rounded-full w-12 h-12 flex items-center justify-center
            focus:outline-none shadow-md
            hover:bg-gray-50 active:bg-gray-100
            hover:shadow-lg active:shadow-md
            transform transition-all duration-200
            active:scale-95 hover:scale-100
            text-${themeColor}-500 hover:text-${themeColor}-600`}
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Progress indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((slide, index) => {
              // Consider the entire module completion status for the indicators
              return (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    currentSlide === index
                      ? `bg-${themeColor}-500 w-6` // Active dot is wider and theme colored
                      : isModuleCompleted()
                        ? 'bg-green-500 w-2' // All dots are green if module is completed
                        : 'bg-gray-300 hover:bg-gray-400 w-2' // Inactive dots
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Mobile view - Reading module layout */}
      {isMobile && (
        <div className="w-full px-4">
          {/* Card container with shadow */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Current slide content */}
            <div className="w-full aspect-square relative bg-white">
              <Image
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Content section */}
            <div className="p-6">
              <h2 className="text-xl font-bold mb-3 text-gray-800">{slides[currentSlide].title}</h2>
              <p className="text-gray-600 text-base mb-6">{slides[currentSlide].content}</p>
              
              {/* Show "Finish Reading" button on last slide */}
              {currentSlide === slides.length - 1 ? (
                <button
                  onClick={handleFinish}
                  className={`w-full ${isModuleCompleted() 
                    ? 'bg-green-500 hover:bg-green-600 border-green-700' 
                    : `bg-${themeColor}-500 hover:bg-${themeColor}-600 border-${themeColor}-700`
                  } text-white font-bold py-3 px-4 rounded-lg 
                  mb-4 transition-all border-b-4
                  hover:border-b-2 hover:mb-[18px] hover:translate-y-0.5
                  active:border-b-0 active:mb-5 active:translate-y-1`}
                >
                  {isModuleCompleted() ? completedButtonText : finishButtonText}
                </button>
              ) : (
                <button
                  onClick={nextSlide}
                  className={`w-full bg-${themeColor}-500 hover:bg-${themeColor}-600 text-white font-bold py-3 px-4 rounded-lg 
                  mb-4 transition-all border-b-4 border-${themeColor}-700
                  hover:border-b-2 hover:mb-[18px] hover:translate-y-0.5
                  active:border-b-0 active:mb-5 active:translate-y-1`}
                >
                  {continueButtonText}
                </button>
              )}

              {/* Back button (not shown on first slide) */}
              {currentSlide > 0 && (
                <button
                  onClick={prevSlide}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg 
                  transition-all border-b-4 border-gray-300
                  hover:border-b-2 hover:mb-0.5 hover:translate-y-0.5
                  active:border-b-0 active:mb-1 active:translate-y-1"
                >
                  {backButtonText}
                </button>
              )}
            </div>

            {/* Progress indicator */}
            <div className="px-6 pb-4">
              <div className="flex justify-between items-center">
                <div className="flex space-x-1 flex-grow">
                  {slides.map((slide, index) => {
                    return (
                      <div
                        key={index}
                        className={`h-2 rounded-full transition-all flex-grow ${
                          index === currentSlide
                            ? `bg-${themeColor}-500` // Current slide
                            : isModuleCompleted()
                              ? 'bg-green-500' // All slides are green if module is completed
                              : index < currentSlide
                                ? `bg-${themeColor}-300` // Past slides
                                : 'bg-gray-200' // Future slides
                        }`}
                      />
                    );
                  })}
                </div>
                <span className="text-xs text-gray-500 ml-2">
                  {currentSlide + 1}/{slides.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarouselComponent;
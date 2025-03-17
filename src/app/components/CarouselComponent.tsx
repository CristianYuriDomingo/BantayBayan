"use client";
import React, { useState } from "react";
import { Carousel } from "flowbite-react";

const CarouselComponent = () => {
  const [isActive, setIsActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (index: number) => {
    setActiveIndex(index);
  };

  const handleManualSlideChange = (direction: string) => {
    if (direction === "<") {
      setActiveIndex((prevIndex) => (prevIndex === 0 ? 4 : prevIndex - 1));
    } else {
      setActiveIndex((prevIndex) => (prevIndex === 4 ? 0 : prevIndex + 1));
    }
  };

  const CustomButton = (direction: string) => (
    <button
      className={`relative inline-block w-auto px-4 py-2 md:px-6 md:py-3 text-sm md:text-lg font-bold uppercase border-2 rounded-lg md:rounded-xl transition-all duration-150 ease-in-out
      text-[#2d87ff] border-[#2d87ff] bg-[#dbe9ff]
      ${isActive ? "translate-y-[0.2em]" : "hover:translate-y-[0.1em]"}`}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onMouseLeave={() => setIsActive(false)}
      onClick={() => handleManualSlideChange(direction)}
    >
      <span
        className={`absolute inset-0 bg-[#5caeff] rounded-lg md:rounded-xl transition-all duration-150 ease-in-out
        ${isActive ? "translate-y-0 shadow-[0_0_0_2px_#4a98e5,0_0.1em_0_0_#4a98e5]" : "translate-y-[0.2em] shadow-[0_0_0_2px_#4a98e5,0_0.3em_0_0_#2d87ff]"}`}
      />
      <span className="relative z-10">{direction}</span>
    </button>
  );

  return (
    <div className="flex justify-center items-center px-4">
      <div className="w-full max-w-4xl">
        <div className="w-full aspect-[16/9] rounded-lg overflow-hidden shadow-2xl relative border-4 border-white bg-white">
          <Carousel
            slideInterval={3000}
            pauseOnHover
            indicators={false}
            onSlideChange={handleSlideChange}
            leftControl={
              <div className="absolute left-2 md:left-[2rem] top-1/2 transform -translate-y-1/2 z-20">
                {CustomButton("<")}
              </div>
            }
            rightControl={
              <div className="absolute right-2 md:right-[2rem] top-1/2 transform -translate-y-1/2 z-20">
                {CustomButton(">")}
              </div>
            }
          >
            <img src="/LessonImage/3.png" alt="Slide 1" className="object-contain w-full h-full border-2 border-white rounded-lg shadow-lg" />
            <img src="/LessonImage/2.png" alt="Slide 2" className="object-contain w-full h-full border-2 border-white rounded-lg shadow-lg" />
            <img src="/LessonImage/3.png" alt="Slide 3" className="object-contain w-full h-full border-2 border-white rounded-lg shadow-lg" />
            <img src="/LessonImage/2.png" alt="Slide 4" className="object-contain w-full h-full border-2 border-white rounded-lg shadow-lg" />
            <img src="/LessonImage/3.png" alt="Slide 5" className="object-contain w-full h-full border-2 border-white rounded-lg shadow-lg" />
          </Carousel>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <div className="flex space-x-2">
              {[0, 1, 2, 3, 4].map((index) => (
                <span
                  key={index}
                  className={`block w-3 h-3 md:w-4 md:h-4 rounded-full ${activeIndex === index ? "bg-blue-500" : "bg-gray-400"}`}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselComponent;

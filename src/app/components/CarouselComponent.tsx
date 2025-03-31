"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Carousel } from "flowbite-react";

const ControlButton = ({
  direction,
  onClick,
  size = "md",
}: {
  direction: string;
  onClick: () => void;
  size?: "sm" | "md" | "lg"; // Button size options
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const buttonSizeClasses = {
    sm: "px-2 py-1 text-xs md:px-3 md:py-2",
    md: "px-4 py-2 text-sm md:px-5 md:py-3",
    lg: "px-6 py-3 text-md md:px-8 md:py-4",
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={`relative inline-block w-auto font-bold uppercase border-2 rounded-lg md:rounded-xl transition-all duration-150 ease-in-out
      text-[#2d87ff] border-[#2d87ff] bg-[#dbe9ff]
      ${isPressed ? "translate-y-[0.2em]" : "hover:translate-y-[0.1em]"} ${buttonSizeClasses[size]}`}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={onClick}
    >
      <span
        className={`absolute inset-0 bg-[#5caeff] rounded-lg md:rounded-xl transition-all duration-150 ease-in-out
        ${isPressed ? "translate-y-0 shadow-[0_0_0_2px_#4a98e5,0_0.1em_0_0_#4a98e5]" : "translate-y-[0.2em] shadow-[0_0_0_2px_#4a98e5,0_0.3em_0_0_#2d87ff]"}`}
      />
      <span className="relative z-10">{direction}</span>
    </div>
  );
};

const CarouselComponent = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [currentModule, setCurrentModule] = useState(0); // Tracks current module

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768); // Set breakpoint for smaller screens
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const modules = ["info1.png", "2.png", "3.png", "2.png", "3.png"];

  return (
    <div className="flex flex-col justify-center items-center px-4 py-6 sm:py-8 md:py-12">
      {/* Progress Display */}
      {isSmallScreen ? (
        <div className="w-full max-w-7xl sticky top-0 bg-white z-10 py-2">
          <p className="text-center text-sm font-semibold text-[#2d87ff]">
            {currentModule + 1}/{modules.length}
          </p>
          <div className="h-[1px] bg-[#2d87ff] mx-auto w-[40px]" /> {/* Smaller underline for small screens */}
        </div>
      ) : (
        <div className="w-full max-w-7xl sticky bottom-0 bg-white z-10 py-2">
          <p className="text-center text-lg font-semibold text-[#2d87ff]">
            {currentModule + 1}/{modules.length}
          </p>
          <div className="h-[2px] bg-[#2d87ff] mx-auto w-[80px]" /> {/* Larger underline for big screens */}
        </div>
      )}

      {/* Responsive Layout */}
      {isSmallScreen ? (
        <div className="space-y-6 max-w-md">
          {modules.map((img, index) => (
            <div
              key={index}
              className={`border-2 border-white rounded-lg shadow-lg overflow-hidden ${
                currentModule === index ? "ring-2 ring-[#2d87ff]" : ""
              }`}
              onClick={() => setCurrentModule(index)} // Update module on click
            >
              <Image
                src={`/LessonImage/${img}`}
                alt={`Module ${index + 1}`}
                width={1280}
                height={720}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full max-w-7xl px-2">
          <div
            className="w-full aspect-[16/9] rounded-lg overflow-hidden shadow-2xl relative border-4 border-white bg-transparent"
            style={{ height: "70vh" }}
          >
            <Carousel
              slideInterval={3000}
              pauseOnHover
              indicators={false}
              leftControl={
                <ControlButton
                  direction="<"
                  size="lg"
                  onClick={() =>
                    setCurrentModule((prev) =>
                      prev === 0 ? modules.length - 1 : prev - 1
                    )
                  }
                />
              }
              rightControl={
                <ControlButton
                  direction=">"
                  size="lg"
                  onClick={() =>
                    setCurrentModule((prev) =>
                      prev === modules.length - 1 ? 0 : prev + 1
                    )
                  }
                />
              }
            >
              {modules.map((img, index) => (
                <Image
                  key={index}
                  src={`/LessonImage/${img}`}
                  alt={`Slide ${index + 1}`}
                  width={1280}
                  height={720}
                  className="object-cover w-full h-full"
                />
              ))}
            </Carousel>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarouselComponent;

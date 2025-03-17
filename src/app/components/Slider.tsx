import React from "react";
import Image from "next/image";

const images = [
  "/Pibi.png",
  "/SliderImage/Neust.png",
  "/SliderImage/PalayanLogo.png",
  "/SliderImage/PNP.png"
];

const Slider: React.FC = () => {
  return (
    <div className="relative w-[960px] h-[80px] overflow-hidden bg-white bg-opacity-50" style={{ boxShadow: 'none' }}>
      {/* Left & Right Gradient Fades */}
      <div className="absolute top-0 left-0 w-[100px] h-full bg-gradient-to-r from-white to-transparent z-10"></div>
      <div className="absolute top-0 right-0 w-[100px] h-full bg-gradient-to-l from-white to-transparent z-10"></div>

      {/* Image Carousel Wrapper */}
      <div className="flex w-max animate-[scroll_20s_linear_infinite]">
        {/* Duplicate images for seamless looping */}
        {[...images, ...images, ...images].map((src, index) => (
          <div key={index} className="w-[150px] h-[80px] flex-shrink-0 mx-4">
            <Image 
              src={src} 
              alt="Slide Image" 
              width={150} 
              height={80} 
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
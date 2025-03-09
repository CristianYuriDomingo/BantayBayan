import React from "react";
import Image from "next/image";

const images = [
    "/Pibi.png",
    "/your-image-2.jpg",
    "/your-image-3.jpg",
    "/your-image-4.jpg",
    "/your-image-5.jpg",
    "/your-image-6.jpg",
    "/your-image-7.jpg",
  ];
  

const Slider: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="relative w-[960px] h-[100px] overflow-hidden bg-white shadow-lg">
        <div className="absolute top-0 left-0 w-[200px] h-[100px] bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute top-0 right-0 w-[200px] h-[100px] bg-gradient-to-l from-white to-transparent z-10"></div>
        <div className="flex w-[3500px] animate-scroll">
          {[...images, ...images].map((src, index) => (
            <div key={index} className="w-[250px] h-[100px] flex-shrink-0">
              <Image src={src} alt="Slide Image" width={250} height={100} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;

"use client";

import React, { useEffect, useState } from "react";
const backgroundImage = "/LessonImage/CyberBG.png";
import CarouselComponent from "../../../components/CarouselComponent";

const MediaLiteracyMisinformation: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {isClient && (
        <div className="w-full max-w-5xl p-4">
          <CarouselComponent />
        </div>
      )}
    </div>
  );
};

export default MediaLiteracyMisinformation;

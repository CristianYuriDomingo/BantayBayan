"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CarouselComponent from "../../../components/CarouselComponent";
import Slider from "@/app/components/Slider";

const MediaLiteracyMisinformation: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center bg-white"
    >
      {/* X Button */}
      <button
        className="absolute top-4 left-4 bg-white text-gray-700 font-bold py-2 px-4 rounded-full shadow-md hover:bg-gray-100 transition"
        onClick={() => router.push("/learn")}
      >
        X
      </button>

      <Slider />
      {isClient && (
        <div className="w-full max-w-5xl p-4">
          <CarouselComponent />
        </div>
      )}
    </div>
  );
};

export default MediaLiteracyMisinformation;
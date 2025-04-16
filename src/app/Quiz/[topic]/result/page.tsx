"use client";

import React from "react";
import QuizResult from "../../../components/QuizResult";
import Image from "next/image";

const page = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center">
      {/* Background decorative elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full opacity-30 transform translate-x-1/3 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-100 rounded-full opacity-20 transform -translate-x-1/3 translate-y-1/4"></div>
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-yellow-200 rounded-full opacity-20"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-green-100 rounded-full opacity-20"></div>
      </div>

      {/* Absolute positioned separator above the fixed position where the component will render */}
      <div className="absolute z-20" style={{ top: '20px' }}>
        <div className="relative w-80 flex items-center justify-center">
          <div className="absolute h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent w-full"></div>
          <div className="relative bg-white p-2 rounded-full shadow-sm z-10">
            <Image
              src="/MainImage/Pibi.png"
              alt="Icon"
              width={20}
              height={20}
              className="h-8 w-auto"
            />
          </div>
        </div>
      </div>

      {/* QuizResult Component */}
      <div className="z-10 mt-100">
        <QuizResult />
      </div>
    </div>
  );
};

export default page;
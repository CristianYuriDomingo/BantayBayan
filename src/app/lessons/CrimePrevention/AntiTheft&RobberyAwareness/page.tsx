"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CarouselComponent, { SlideProps } from "../../../components/CarouselComponent";
import Footer from "../../../components/Footer";
import SpeechBubble from "../../../components/SpeechBubble";
import Image from "next/image";

const AntiTheftRobberyAwareness: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [completedModules, setCompletedModules] = useState<string[]>([]); // Track completed modules
  const router = useRouter();

  const AntiTheftRobberyAwarenessSlides: SlideProps[] = [
    {
      id: "theft-awareness",
      image: "/LearnImage/Theft1.png",
      title: "Understanding Theft Risks",
      content: "Learn how to identify and mitigate risks of theft and robbery in your daily life."
    },
    {
      id: "preventive-measures",
      image: "/LearnImage/Theft2.png",
      title: "Preventive Measures",
      content: "Implement safety measures like securing your belongings and staying alert in public spaces."
    },
    {
      id: "emergency-response",
      image: "/LearnImage/Theft3.png",
      title: "Emergency Response",
      content: "Know how to respond effectively in case of theft or robbery to ensure your safety."
    },
    {
      id: "community-support",
      image: "/LearnImage/Theft4.png",
      title: "Community Support",
      content: "Engage with community programs and law enforcement to reduce theft and robbery incidents."
    }
  ];

  const handleModuleComplete = (moduleId: string) => {
    setCompletedModules((prev) => [...prev, moduleId]);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
        {/* Background decorative elements */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full opacity-30 transform translate-x-1/3 -translate-y-1/4"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-100 rounded-full opacity-20 transform -translate-x-1/3 translate-y-1/4"></div>
          <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-[#7bc8ff] rounded-full opacity-20"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-green-100 rounded-full opacity-20"></div>
        </div>  

        {/* Fixed X Button */}
        <button
          className="fixed top-2 left-4 bg-white rounded-full p-2.5 shadow-md text-gray-500 hover:text-gray-700 hover:shadow-lg transition-all z-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={() => router.push("/Learn")}
          aria-label="Close and return to Learn page"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Main content */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 pt-6 flex flex-col items-center">
          <div className="w-full p-4 mb-2">
            <SpeechBubble
              imageSrc="/MainImage/PibiTeach.png"
              messages={["Be Aware and Stay Prepared", "Enjoy Reading!"]}
            />
          </div>

          <div className="relative w-full mb-2 flex items-center justify-center">
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

          <div className="w-full text-center mb-2">
            <h2 className="text-2xl font-bold text-gray-800">Anti-Theft & Robbery Awareness</h2>
            <p className="text-gray-600">Learn how to protect yourself from theft and robbery</p>
          </div>
        </div>

        {/* Carousel */}
        <div className="flex-grow flex justify-center items-center w-full relative z-10 px-4 mb-6">
          <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg p-4 md:p-0 overflow-hidden">
            {isClient && (
              <CarouselComponent 
                slides={AntiTheftRobberyAwarenessSlides}
                themeColor="blue"
                completedModules={completedModules}
                onModuleComplete={handleModuleComplete}
                finishButtonText="Complete Anti-Theft Module"
                completedButtonText="✓ Module Completed"
                continueButtonText="Next Tip"
                backButtonText="Previous Tip"
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AntiTheftRobberyAwareness;
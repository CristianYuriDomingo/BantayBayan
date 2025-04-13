"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

const QuizInstructions = ({ topic }: { topic: string }) => {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white shadow-lg rounded-2xl border border-blue-100">
      {/* Quiz Rules Image */}
      <div className="flex justify-center mb-5">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-200 to-blue-100 rounded-lg blur opacity-30"></div>
          <Image
            src="/QuizImage/QuizRules.png"
            alt="Quiz Rules"
            width={250}
            height={100}
            className="object-contain relative"
          />
        </div>
      </div>
      
      {/* Topic Title */}
      <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
        {topic} <span className="text-blue-600">Quiz</span>
      </h2>

      {/* Instructions */}
      <p className="text-gray-700 text-center text-base mb-4">
        Welcome to the <strong className="text-blue-600">{topic}</strong> quiz! Here's how it works:
      </p>
      
      <div className="bg-blue-50 rounded-xl p-4 mb-5">
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <div className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>You will have multiple-choice questions.</span>
          </li>
          <li className="flex items-start">
            <div className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span>Choose the correct answer before the time runs out.</span>
          </li>
          <li className="flex items-start">
            <div className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <span>You can't go back to previous questions.</span>
          </li>
          <li className="flex items-start">
            <div className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span>Good luck!</span>
          </li>
        </ul>
      </div>

      {/* Simplified Start Quiz Button with blue theme */}
      <div className="mt-6 flex justify-center">
        <button
          className={`relative px-6 py-2 text-base font-medium text-white bg-[#2d87ff] rounded-xl transition-all duration-150 ease-out ${
            isActive ? 'translate-y-1 shadow-none' : 'shadow-[0_4px_0_0_#2563eb]'
          }`}
          onMouseDown={() => setIsActive(true)}
          onMouseUp={() => {
            setIsActive(false);
            console.log("Navigating to:", `/PlayQuiz/${topic}`);
            router.push(`/PlayQuiz/${topic}`);
          }}
          onMouseLeave={() => setIsActive(false)}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizInstructions;
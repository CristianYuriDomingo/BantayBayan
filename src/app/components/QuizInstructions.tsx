"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

const QuizInstructions = ({ topic }: { topic: string }) => {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
      {/* Quiz Rules Image */}
      <div className="flex justify-center mb-4">
        <Image 
          src="/QuizImage/QuizRules.png" 
          alt="Quiz Rules"
          width={250} 
          height={100} 
          className="object-contain"
        />
      </div>

      {/* Instructions */}
      <p className="text-gray-700 text-center text-base">
        Welcome to the <strong className="text-black">{topic}</strong> quiz! Here’s how it works:
      </p>
      <ul className="mt-3 list-disc pl-5 text-gray-600 text-sm space-y-1">
        <li>You will have multiple-choice questions.</li>
        <li>Choose the correct answer before the time runs out.</li>
        <li>You can’t go back to previous questions.</li>
        <li>Good luck!</li>
      </ul>

      {/* Start Quiz Button */}
      <div className="mt-5 flex justify-center">
        <button
          className={`relative inline-block px-5 py-2.5 text-md font-bold uppercase border-2 rounded-xl transition-all duration-150 ease-in-out
          text-[#2d87ff] border-[#2d87ff] bg-[#dbe9ff]
          ${isActive ? 'translate-y-[0.3em]' : 'hover:translate-y-[0.15em]'}`}
          onMouseDown={() => setIsActive(true)}
          onMouseUp={() => {
            setIsActive(false);
            console.log("Navigating to:", `/PlayQuiz/${topic}`); // Debugging
            router.push(`/PlayQuiz/${topic}`);

          }}
          onMouseLeave={() => setIsActive(false)}
        >
          <span
            className={`absolute inset-0 bg-[#5caeff] rounded-xl transition-all duration-150 ease-in-out
            ${isActive ? 'translate-y-0 shadow-[0_0_0_2px_#4a98e5,0_0.1em_0_0_#4a98e5]' : 'translate-y-[0.3em] shadow-[0_0_0_2px_#4a98e5,0_0.4em_0_0_#2d87ff]'}`}
          />
          <span className="relative z-10">Start Quiz</span>
        </button>
      </div>
    </div>
  );
};

export default QuizInstructions;

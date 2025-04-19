"use client";

import React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { getUsersFromIndexedDB } from "../../../../../lib/userDB";
import { saveResultToIndexedDB } from "../../../../../lib/quizDb";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

const ResultPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [isActive, setIsActive] = useState<"retry" | "back" | null>(null);
  const didSaveResultRef = useRef(false);

  const score = Number(searchParams.get("score"));
  const total = Number(searchParams.get("total"));
  const topic = searchParams.get("topic") || "Unknown Topic";
  const percentage = Math.round((score / total) * 100);

  // Badge progress logic - determine how much of the badge to show
  const getBadgeInfo = () => {
    if (percentage < 50) {
      return {
        label: "1/3 Badge",
        fillPercentage: 33,
        clipPath: "polygon(0 0, 100% 0, 100% 33%, 0 33%)"
      };
    } else if (percentage >= 50 && percentage < 80) {
      return {
        label: "Half Badge",
        fillPercentage: 50,
        clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)"
      };
    } else if (percentage >= 80 && percentage < 100) {
      return {
        label: "Almost Full Badge",
        fillPercentage: 80,
        clipPath: "polygon(0 0, 100% 0, 100% 80%, 0 80%)"
      };
    } else {
      return {
        label: "Full Badge",
        fillPercentage: 100,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
      };
    }
  };

  const badgeInfo = getBadgeInfo();

  useEffect(() => {
    const fetchAndSaveResult = async () => {
      if (didSaveResultRef.current) return;
      didSaveResultRef.current = true;

      const users = await getUsersFromIndexedDB();
      if (users.length > 0) {
        const latestUser = users[users.length - 1];
        setUsername(latestUser.username);

        const resultData = {
          username: latestUser.username,
          topic,
          score,
          total,
          percentage,
          date: new Date().toISOString(),
          badge: badgeInfo.label,
        };
        await saveResultToIndexedDB(resultData);
        console.log("Result saved:", resultData);
      }
    };
    fetchAndSaveResult();
  }, [score, total, percentage, badgeInfo.label, topic]);

  // Format topic string for display
  const formattedTopic = topic
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Get congratulatory message based on score
  const getMessage = () => {
    if (percentage === 100) return `Perfect Score!`;
    if (percentage >= 80) return `Excellent Work!`;
    if (percentage >= 50) return `Good Job!`;
    return `Nice Try!`;
  };

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

      {/* Result Card */}
      <div className="z-10 w-full max-w-lg px-4">
        <div className="w-full bg-white rounded-3xl shadow-lg overflow-hidden">
          {/* Header with badge image */}
          <div className="bg-blue-50 p-6 flex flex-col items-center">
            {/* Badge Container with Visual Fill Level */}
            <div className="relative w-36 h-36 mb-4">
              {/* Background Badge (Gray) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/badges/full.png"
                  alt="Badge Background"
                  width={120}
                  height={120}
                  className="opacity-30"
                />
              </div>
              
              {/* Filled Badge (Colored portion) */}
              <div 
                className="absolute inset-0 flex items-center justify-center overflow-hidden"
                style={{ clipPath: badgeInfo.clipPath }}
              >
                <Image
                  src="/badges/full.png"
                  alt="Badge Achievement"
                  width={120}
                  height={120}
                />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-blue-600 text-center">
              {getMessage()}
            </h1>
            <p className="text-lg text-gray-700 mt-1">
              {username ? `Well done, ${username}!` : "Well done!"}
            </p>
          </div>

          {/* Results section */}
          <div className="p-8">
            <div className="flex flex-col gap-4">
              {/* Topic */}
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Topic:</span>
                <span className="font-medium text-blue-600">{formattedTopic}</span>
              </div>
              
              {/* Divider */}
              <div className="h-px bg-gray-100"></div>
              
              {/* Score */}
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Score:</span>
                <span className="font-bold">{score}/{total}</span>
              </div>
              
              {/* Percentage */}
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Percentage:</span>
                <span className="font-bold text-blue-600">{percentage}%</span>
              </div>
              
              {/* Badge */}
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Badge:</span>
                <span className="font-medium">{badgeInfo.label}</span>
              </div>
              
              {/* Progress bar */}
              <div className="mt-3 mb-2">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Buttons */}
              <div className="flex flex-col gap-3 mt-4">
                <button
                  className={`relative px-6 py-3 text-base font-medium text-white bg-[#2d87ff] rounded-xl transition-all duration-150 ease-out ${
                    isActive === "retry"
                      ? "translate-y-1 shadow-none"
                      : "shadow-[0_4px_0_0_#2563eb]"
                  }`}
                  onMouseDown={() => setIsActive("retry")}
                  onMouseUp={() => {
                    setIsActive(null);
                    router.push(`/Quiz/${topic}`);
                  }}
                  onMouseLeave={() => setIsActive(null)}
                >
                  Retry Quiz
                </button>

                <button
                  className={`relative px-6 py-3 text-base font-medium text-white bg-[#2d87ff] rounded-xl transition-all duration-150 ease-out ${
                    isActive === "back"
                      ? "translate-y-1 shadow-none"
                      : "shadow-[0_4px_0_0_#2563eb]"
                  }`}
                  onMouseDown={() => setIsActive("back")}
                  onMouseUp={() => {
                    setIsActive(null);
                    router.push("/Learn");
                  }}
                  onMouseLeave={() => setIsActive(null)}
                >
                  Back to Learn
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
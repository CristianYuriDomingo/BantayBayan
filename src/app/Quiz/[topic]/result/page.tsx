"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { getUsersFromIndexedDB } from "../../../../../lib/userDB";
import { saveResultToIndexedDB, QUIZ_BADGES } from "../../../../../lib/quizDB";

// Type definitions
interface QuizResult {
  username: string;
  topic: string;
  score: number;
  total: number;
  percentage: number;
  date: string;
  badgeLevel: string;
  badgeCompletion: number;
  badgeTitle: string;
  badgeImage: string;
}

interface BadgeProgressInfo {
  label: string;
  completion: number;
}

interface BadgeInfo {
  label: string;
  completion: number;
  title: string;
  image: string;
}

export default function QuizResult() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [isActive, setIsActive] = useState<"retry" | "back" | null>(null);
  const didSaveResultRef = useRef(false);
  const [badgeInfo, setBadgeInfo] = useState<BadgeInfo>({
    label: "Loading...",
    completion: 0.5,
    title: "Loading badge information...",
    image: "/badges/default.png"
  });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const score = Number(searchParams.get("score") || 0);
  const total = Number(searchParams.get("total") || 1);
  const topic = searchParams.get("topic") || "Unknown Topic";
  const percentage = Math.round((score / total) * 100);

  // Determine badge progress level
  const getBadgeProgressLevel = (): BadgeProgressInfo => {
    if (percentage < 50) {
      return {
        label: "1/3 Badge",
        completion: 0.33,
      };
    } else if (percentage >= 50 && percentage < 80) {
      return {
        label: "Half Badge",
        completion: 0.5,
      };
    } else if (percentage >= 80 && percentage < 100) {
      return {
        label: "Almost Full Badge",
        completion: 0.8,
      };
    } else {
      return {
        label: "Full Badge",
        completion: 1.0,
      };
    }
  };

  useEffect(() => {
    const fetchAndSaveResult = async () => {
      if (didSaveResultRef.current) return;
      didSaveResultRef.current = true;

      try {
        const users = await getUsersFromIndexedDB();
        if (users.length > 0) {
          const latestUser = users[users.length - 1];
          setUsername(latestUser.username);

          // Get topic-specific badge info - normalize the topic key
          const topicKey = topic.toLowerCase().replace(/\s+/g, '-');
          
          // Get badge info for this topic or use default
          const badgeData = (QUIZ_BADGES as Record<string, {title: string, imagePath: string}>)[topicKey] || 
                           (QUIZ_BADGES as Record<string, {title: string, imagePath: string}>)["default"];
          
          // Combine badge progress with topic-specific badge data
          const progressLevel = getBadgeProgressLevel();
          
          setBadgeInfo({
            label: progressLevel.label,
            completion: progressLevel.completion,
            title: badgeData.title,
            image: badgeData.imagePath
          });

          const resultData: QuizResult = {
            username: latestUser.username,
            topic,
            score,
            total,
            percentage,
            date: new Date().toISOString(),
            badgeLevel: progressLevel.label,
            badgeCompletion: progressLevel.completion,
            badgeTitle: badgeData.title,
            badgeImage: badgeData.imagePath
          };
          
          await saveResultToIndexedDB(resultData);
          console.log("Result saved:", resultData);
        }
      } catch (error) {
        console.error("Error saving quiz result:", error);
      }
    };
    
    fetchAndSaveResult();
  }, [score, total, percentage, topic]);

  // Format topic string for display
  const formattedTopic = topic
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Get congratulatory message based on score
  const getMessage = (): string => {
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
                {!imageFailed ? (
                  <Image
                    src={badgeInfo.image}
                    alt="Badge Background"
                    width={120}
                    height={120}
                    className="opacity-30"
                    onLoad={() => setImageLoaded(true)}
                    onError={() => {
                      console.error("Error loading badge image:", badgeInfo.image);
                      setImageFailed(true);
                    }}
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-blue-100 rounded-full opacity-30">
                    <span className="text-blue-600 font-bold text-xl">{Math.round(percentage)}%</span>
                  </div>
                )}
              </div>
              
              {/* Filled Badge (Colored portion) */}
              {!imageFailed && (
                <div 
                  className="absolute inset-0 flex items-center justify-center overflow-hidden"
                  style={{ 
                    clipPath: `polygon(0 0, 100% 0, 100% ${badgeInfo.completion * 100}%, 0 ${badgeInfo.completion * 100}%)`
                  }}
                >
                  <Image
                    src={badgeInfo.image}
                    alt="Badge Achievement"
                    width={120}
                    height={120}
                    onError={() => setImageFailed(true)}
                    priority
                  />
                </div>
              )}
              
              {/* Fallback if images don't load */}
              {(imageFailed || (!imageLoaded && !badgeInfo.image)) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-blue-500 rounded-full w-24 h-24 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">{Math.round(percentage)}%</span>
                  </div>
                </div>
              )}
            </div>
            
            <h1 className="text-3xl font-bold text-blue-600 text-center">
              {getMessage()}
            </h1>
            <p className="text-lg text-gray-700 mt-1">
              {username ? `Well done, ${username}!` : "Well done!"}
            </p>
            
            {/* Display badge title for more context */}
            <p className="text-sm text-blue-500 mt-1">
              {badgeInfo.title}
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
                    router.push(`/PlayQuiz/${topic}`);
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
}
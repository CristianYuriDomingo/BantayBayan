"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { getUsersFromIndexedDB } from "../../../lib/userDB";
import { saveResultToIndexedDB, QUIZ_BADGES } from "../../../lib/quizDb";

// Define the QuizResult type locally
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

interface BadgeDisplayInfo {
  label: string;
  image: string;
  title: string;
}

// Type for the QUIZ_BADGES import
type QuizBadges = Record<string, { title: string; imagePath: string }>;

export default function QuizResult() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [isActive, setIsActive] = useState<"retry" | "back" | null>(null);
  const didSaveResultRef = useRef(false);
  const [badgeInfo, setBadgeInfo] = useState<BadgeDisplayInfo>({
    label: "",
    image: "/badges/default.png",
    title: ""
  });
  const [imageLoaded, setImageLoaded] = useState(false);

  const score = Number(searchParams.get("score"));
  const total = Number(searchParams.get("total"));
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

      const users = await getUsersFromIndexedDB();
      if (users.length > 0) {
        const latestUser = users[users.length - 1];
        setUsername(latestUser.username);

        // Get topic-specific badge info
        const topicKey = topic.toLowerCase();
        
        // Type casting for QUIZ_BADGES
        const badgesMap = QUIZ_BADGES as unknown as QuizBadges;
        
        // Log available badges for debugging
        console.log("Available badges:", Object.keys(badgesMap));
        console.log("Looking for topic:", topicKey);
        
        const topicBadgeInfo = badgesMap[topicKey] || {
          title: 'Quiz Completion Badge',
          imagePath: '/badges/default.png'
        };
        
        console.log("Selected badge info:", topicBadgeInfo);

        // Add badge progress level
        const progressLevel = getBadgeProgressLevel();
        
        const badgeImagePath = topicBadgeInfo.imagePath;
        console.log("Badge image path:", badgeImagePath);
        
        setBadgeInfo({
          label: progressLevel.label,
          image: badgeImagePath,
          title: topicBadgeInfo.title
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
          badgeTitle: topicBadgeInfo.title,
          badgeImage: badgeImagePath
        };
        
        const savedResult = await saveResultToIndexedDB(resultData);
        console.log("Result saved:", savedResult);
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

  // Get badge display style based on completion percentage
  const getBadgeStyle = (): React.CSSProperties => {
    const progressLevel = getBadgeProgressLevel();
    return {
      clipPath: `polygon(0 0, 100% 0, 100% ${progressLevel.completion * 100}%, 0 ${progressLevel.completion * 100}%)`
    };
  };

  return (
    <div className="w-full max-w-lg bg-white rounded-3xl shadow-lg overflow-hidden">
      {/* Header with badge image */}
      <div className="bg-blue-50 p-6 flex flex-col items-center">
        {/* Badge Container with Visual Fill Level */}
        <div className="relative w-36 h-36 mb-4">
          {/* Background Badge (Gray) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src={badgeInfo.image}
              alt="Badge Background"
              width={120}
              height={120}
              className="opacity-30"
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                console.error("Error loading badge image:", e);
                // Fallback to default badge if the image fails to load
                setBadgeInfo(prev => ({
                  ...prev,
                  image: "/badges/default.png"
                }));
              }}
            />
          </div>
          
          {/* Filled Badge (Colored portion) */}
          <div 
            className="absolute inset-0 flex items-center justify-center overflow-hidden"
            style={getBadgeStyle()}
          >
            <Image
              src={badgeInfo.image}
              alt="Badge Achievement"
              width={120}
              height={120}
              onError={(e) => console.error("Error loading colored badge:", e)}
            />
          </div>
          
          {/* Fallback if images don't load */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-blue-100 rounded-full">
              <span className="text-blue-600 font-bold text-xl">{Math.round(percentage)}%</span>
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
        {badgeInfo.title && (
          <p className="text-sm text-blue-500 mt-1">
            {badgeInfo.title}
          </p>
        )}
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
  );
}
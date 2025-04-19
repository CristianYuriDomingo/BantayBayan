"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { getUsersFromIndexedDB } from "../../../lib/userDB";
import { saveResultToIndexedDB } from "../../../lib/quizDb";

export default function QuizResult() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [isActive, setIsActive] = useState<"retry" | "back" | null>(null);
  const didSaveResultRef = useRef(false);

  const score = Number(searchParams.get("score"));
  const total = Number(searchParams.get("total"));
  const topic = searchParams.get("topic") || "Unknown Topic";
  const percentage = Math.round((score / total) * 100);

  let badge = {
    label: "1/3 Badge",
    image: "/badges/one_third.png",
  };
  if (percentage >= 50 && percentage < 80) {
    badge = {
      label: "Half Badge",
      image: "/badges/half.png",
    };
  } else if (percentage >= 80 && percentage < 100) {
    badge = {
      label: "Almost Full Badge",
      image: "/badges/almost.png",
    };
  } else if (percentage === 100) {
    badge = {
      label: "Full Badge",
      image: "/badges/full.png",
    };
  }

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
          badge: badge.label,
        };
        await saveResultToIndexedDB(resultData);
        console.log("Result saved:", resultData);
      }
    };
    fetchAndSaveResult();
  }, [score, total, percentage, badge.label, topic]);

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
    <div className="w-full max-w-lg bg-white rounded-3xl shadow-lg overflow-hidden">
      {/* Header with badge image */}
      <div className="bg-blue-50 p-6 flex flex-col items-center">
        <Image
          src={badge.image}
          alt="Badge"
          width={100}
          height={100}
          className="mb-4"
        />
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
            <span className="font-medium">{badge.label}</span>
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
                router.push(`/PlayQuiz/${topic}`); // Update the route here
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
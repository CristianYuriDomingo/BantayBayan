"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { getUsersFromIndexedDB } from "../../../lib/userDB";
import { saveResultToIndexedDB } from "../../../lib/quizDb";

export default function ResultPage() {
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

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-blue-50 w-full p-6">
      <div className="bg-white border border-blue-100 shadow-lg rounded-2xl p-10 w-full max-w-lg text-center relative z-10">
        {/* Header Image */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-200 to-blue-100 rounded-full blur opacity-30"></div>
            <Image
              src="/QuizImage/QuizRules.png"
              alt="Quiz Result"
              width={200}
              height={200}
              className="object-contain relative"
            />
          </div>
        </div>

        {/* Title and Summary */}
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          {topic} <span className="text-blue-600">Quiz Result</span>
        </h1>

        <p className="text-lg mb-2 text-gray-700">
          {percentage === 100
            ? `Awesome, ${username}! You got a perfect score!`
            : `Well done, ${username}!`}
        </p>
        <p className="text-base text-gray-700 mb-1">
          Score: <strong>{score}</strong> / {total}
        </p>
        <p className="text-base text-gray-700 mb-1">
          Percentage: <strong className="text-blue-600">{percentage}%</strong>
        </p>
        <p className="text-base text-gray-700 mb-6">
          Badge: <strong>{badge.label}</strong>
        </p>

        {/* Badge Image */}
        <div className="w-full flex justify-center mb-6">
          <Image
            src={badge.image}
            alt="Badge"
            width={120}
            height={120}
            className="rounded-full shadow-lg"
          />
        </div>

        {/* Duolingo-style Buttons (matching Start Quiz button) */}
        <div className="flex flex-col items-center gap-4 mt-4">
          <button
            className={`relative px-6 py-2 w-full max-w-[250px] text-base font-medium text-white bg-[#2d87ff] rounded-xl transition-all duration-150 ease-out ${
              isActive === "retry"
                ? "translate-y-1 shadow-none"
                : "shadow-[0_4px_0_0_#2563eb]"
            }`}
            onMouseDown={() => setIsActive("retry")}
            onMouseUp={() => {
              setIsActive(null);
              router.push("/Quiz");
            }}
            onMouseLeave={() => setIsActive(null)}
          >
            Retry Quiz
          </button>

          <button
            className={`relative px-6 py-2 w-full max-w-[250px] text-base font-medium text-white bg-[#2d87ff] rounded-xl transition-all duration-150 ease-out ${
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
  );
}

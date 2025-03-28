"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getUsersFromIndexedDB } from "../../../lib/userDB";
import { saveResultToIndexedDB } from "../../../lib/quizDb";

export default function ResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const score = Number(searchParams.get("score"));
  const total = Number(searchParams.get("total"));
  const percentage = Math.round((score / total) * 100);

  // Badge logic
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
      const users = await getUsersFromIndexedDB();
      if (users.length > 0) {
        const latestUser = users[users.length - 1];
        setUsername(latestUser.username);

        // 💾 Save quiz result
        const resultData = {
          username: latestUser.username,
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
  }, []);

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-100 w-full h-screen p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-3xl text-center relative z-10">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Quiz Result</h1>

        <p className="text-xl mb-4 text-gray-700">
          {percentage === 100
            ? `Awesome, ${username}! You got a perfect score!`
            : `Well done, ${username}!`}
        </p>
        <p className="text-lg mb-4 text-gray-700">
          You scored {score} out of {total}
        </p>
        <p className="text-lg mb-8 text-gray-600">Percentage: {percentage}%</p>

        {/* Badge Image */}
        <div className="w-full flex justify-center mb-8">
          <Image
            src={badge.image}
            alt="Badge"
            width={150}
            height={150}
            className="rounded-full shadow-lg"
          />
        </div>

        <p className="text-lg font-semibold mb-8 text-gray-800">{badge.label}</p>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <button
            className="bg-[#5caeff] text-white font-bold py-3 rounded-2xl shadow-md transition-transform hover:translate-y-[-2px]"
            onClick={() => router.push("/Quiz")}
          >
            Retry Quiz
          </button>
          <button
            className="border-2 border-[#2d87ff] text-[#2d87ff] font-bold py-3 rounded-2xl shadow-md transition-transform hover:translate-y-[-2px]"
            onClick={() => router.push("/Learn")}
          >
            Back to Learn
          </button>
        </div>
      </div>
    </div>
  );
}

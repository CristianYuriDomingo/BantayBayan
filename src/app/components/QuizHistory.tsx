"use client";

import { useState, useEffect } from "react";
import { getAllResults } from "../../../lib/quizDb";

// Define the type for quiz results
interface QuizResult {
  id?: number;
  username: string;
  topic: string;
  score: number;
  total: number;
  percentage: number;
  date: string;
  badge: string;
}

export default function QuizHistory() {
  const [history, setHistory] = useState<QuizResult[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const results: QuizResult[] = await getAllResults();
      setHistory(results);
    };

    fetchHistory();
  }, []);

  return (
    <div className="w-full max-w-sm mx-auto p-4">
      <h2 className="text-  l font-bold mb-4 text-gray-800">Previous Attempts</h2>
      <div className="divide-y divide-gray-300">
        {history.length > 0 ? (
          history.map((entry, index) => (
            <div key={index} className="py-3 flex justify-between items-center">
              <div>
                <p className="text-md font-semibold text-gray-700">{entry.topic}</p>
                <p className="text-sm text-gray-500">
                  {new Date(entry.date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right flex items-center gap-2">
                <p className="text-md font-semibold text-blue-600">
                  {entry.score}/{entry.total}
                </p>
                <img src={entry.badge} alt="Badge" className="w-8 h-8" />
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-4">No quiz history available.</p>
        )}
      </div>
    </div>
  );
}

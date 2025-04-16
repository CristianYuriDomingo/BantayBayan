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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        const results: QuizResult[] = await getAllResults();

        // Sort by newest first
        results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        setHistory(results);
      } catch (error) {
        console.error("Failed to fetch quiz history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const getScoreColorClass = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-blue-600";
    if (percentage >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="w-full p-2">
        <div className="animate-pulse space-y-4">
          <div className="h-5 bg-blue-100 rounded w-1/2 mb-4"></div>
          <div className="h-12 bg-blue-100 rounded w-full"></div>
          <div className="h-12 bg-blue-100 rounded w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-2">
      {history.length > 0 ? (
        <div className="bg-white rounded-lg overflow-hidden">
          {/* Scrollable container for up to 7 items */}
          <div className="max-h-[420px] overflow-y-auto divide-y divide-gray-200">
            {history.map((entry, index) => (
              <div
                key={index}
                className="py-3 px-4 flex justify-between items-center"
              >
                <div>
                  <p className="text-md font-semibold text-gray-800">{entry.topic}</p>
                  <p className="text-sm text-gray-500">{formatDate(entry.date)}</p>
                </div>

                <div className="text-right flex items-center gap-2">
                  <p className={`text-md font-bold ${getScoreColorClass(entry.percentage)}`}>
                    {entry.score}/{entry.total}
                  </p>
                  {entry.badge && (
                    <img
                      src={entry.badge}
                      alt="Badge"
                      className="w-8 h-8 object-contain"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Progress indicator */}
          <div className="px-4 py-3 bg-blue-50 border-t border-gray-200">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">Quizzes Completed</span>
              <span className="text-sm font-bold text-blue-600">{history.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{
                  width: `${Math.min(100, (history.length / 10) * 100)}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg p-6 text-center">
          <div className="mx-auto mb-3 text-3xl">📊</div>
          <h3 className="text-gray-800 font-medium mb-2">No Quiz History</h3>
          <p className="text-sm text-gray-500">
            Complete quizzes to see results here
          </p>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getUserQuizResults } from "../../../lib/quizDB";
import { getUsersFromIndexedDB } from "../../../lib/userDB";

// Type for quiz result
interface QuizResult {
  id?: number;
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

const QuizHistory: React.FC = () => {
  const [results, setResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [uniqueTopicsCount, setUniqueTopicsCount] = useState(0);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const users = await getUsersFromIndexedDB();
        if (users.length > 0) {
          const latestUser = users[users.length - 1];
          const userResults = await getUserQuizResults(latestUser.username);
          
          // Sort by date descending (newest first)
          const sortedResults = userResults.sort((a: QuizResult, b: QuizResult) => 
            new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          
          setResults(sortedResults);
          
          // Count unique topics - add type annotation to result parameter
          const uniqueTopics = new Set(userResults.map((result: QuizResult) => result.topic));
          setUniqueTopicsCount(uniqueTopics.size);
        }
      } catch (error) {
        console.error("Error fetching quiz history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
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

  // Format topic string
  const formatTopic = (topic: string) => {
    return topic
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (loading) {
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

  if (results.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 text-center">
        <div className="mx-auto mb-3 text-3xl">📊</div>
        <h3 className="text-gray-800 font-medium mb-2">No Quiz History</h3>
        <p className="text-sm text-gray-500">
          Complete quizzes to see results here
        </p>
      </div>
    );
  }

  return (
    <div className="w-full p-2">
      <div className="bg-white rounded-lg overflow-hidden">
        {/* Scrollable container for quiz history */}
        <div className="max-h-96 overflow-y-auto divide-y divide-gray-200">
          {results.map((entry, index) => (
            <div
              key={index}
              className="py-3 px-4 flex justify-between items-center"
            >
              <div>
                <p className="text-md font-semibold text-gray-800">{formatTopic(entry.topic)}</p>
                <p className="text-sm text-gray-500">{formatDate(entry.date)}</p>
              </div>

              <div className="text-right flex items-center gap-2">
                <p className={`text-md font-bold ${getScoreColorClass(entry.percentage)}`}>
                  {entry.score}/{entry.total}
                </p>
                {entry.badgeImage && (
                  <div className="relative w-8 h-8">
                    <Image
                      src={entry.badgeImage}
                      alt={entry.badgeTitle || "Badge"}
                      width={32}
                      height={32}
                      className="object-contain"
                      onError={(e) => {
                        // Replace with default if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.src = "/badges/default.png";
                      }}
                    />
                    {/* Show fill level indicator */}
                    <div 
                      className="absolute inset-0 bg-blue-500 opacity-30 rounded-full" 
                      style={{
                        clipPath: `polygon(0 ${100 - (entry.badgeCompletion * 100)}%, 100% ${100 - (entry.badgeCompletion * 100)}%, 100% 100%, 0 100%)`,
                      }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Progress indicator */}
        <div className="px-4 py-3 bg-blue-50 border-t border-gray-200">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700">Unique Topics Completed</span>
            <span className="text-sm font-bold text-blue-600">{uniqueTopicsCount}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{
                width: `${Math.min(100, (uniqueTopicsCount / 10) * 100)}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizHistory;
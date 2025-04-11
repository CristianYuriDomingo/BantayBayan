"use client";

import { useState } from "react";

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  progress: number;
  category: string;
  rarity: string;
  xp: number;
}

interface AchievementProgressProps {
  achievements: Achievement[];
}

const AchievementProgress: React.FC<AchievementProgressProps> = ({ achievements }) => {
  // Calculate stats
  const completedCount = achievements.filter(a => a.progress === 100).length;
  const totalXP = achievements
    .filter(a => a.progress === 100)
    .reduce((sum, a) => sum + a.xp, 0);

  const categoryStats = achievements.reduce((acc, achievement) => {
    if (!acc[achievement.category]) {
      acc[achievement.category] = {
        total: 0,
        completed: 0
      };
    }
    
    acc[achievement.category].total += 1;
    if (achievement.progress === 100) {
      acc[achievement.category].completed += 1;
    }
    
    return acc;
  }, {} as Record<string, { total: number; completed: number }>);

  const categoryNames = {
    learning: "Learning",
    quizzes: "Quizzes",
    quests: "Quests",
    social: "Community"
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 flex flex-col h-full">
      <h2 className="text-lg font-bold text-gray-800 dark:text-white text-center mb-3">
        Achievement Progress
      </h2>
      
      {/* Overall Progress */}
      <div className="mb-6 text-center">
        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
          {completedCount} / {achievements.length}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Achievements Completed
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-3">
          <div 
            className="bg-blue-500 h-2.5 rounded-full"
            style={{ width: `${(completedCount / achievements.length) * 100}%` }}
          ></div>
        </div>
        
        <div className="text-md font-semibold text-gray-700 dark:text-gray-300 mt-3">
          {totalXP} XP Earned
        </div>
      </div>
      
      <div className="border-t border-gray-300 dark:border-gray-600 mt-2 pt-3 flex-grow">
        <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-3">
          Category Progress
        </h3>
        
        {/* Category breakdown */}
        <div className="space-y-3">
          {Object.entries(categoryStats).map(([category, stats]) => (
            <div key={category} className="flex flex-col">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700 dark:text-gray-300">
                  {categoryNames[category as keyof typeof categoryNames] || category}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {stats.completed}/{stats.total}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${(stats.completed / stats.total) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementProgress;
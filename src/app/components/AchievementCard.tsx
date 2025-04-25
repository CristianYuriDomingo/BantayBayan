import React from 'react';
import Image from 'next/image';

const AchievementCard: React.FC = () => {
  return (
    <div className="max-w-full lg:max-w-[90%] mx-auto w-full lg:w-[400px] rounded-2xl border-2 border-gray-400 dark:border-gray-600">
      <div className="p-5 sm:p-4">
        {/* Header */}
        <h2 className="text-sm font-medium text-gray-400 dark:text-gray-300 uppercase mb-3 text-center">
          See all your achievements in quizzes, learning modules, and badges you have earned.
        </h2>

        {/* Main content */}
        <div className="flex flex-col items-center lg:items-start lg:flex-row">
          {/* Character image */}
          <div className="w-22 h-22 lg:w-24 lg:h-24 relative mb-4 lg:mb-0 lg:mr-4">
            <Image
              src="/MainImage/PibiQuiz.png"
              alt="Quiz mascot"
              fill
              sizes="110px"         
              className="object-contain"
              priority
            />
          </div>

          {/* Text Content */}
          <div className="text-center lg:text-left flex-1">
            {/* Bold statement */}
            <h3 className="text-lg sm:text-base lg:text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
              Celebrate Your Achievements
            </h3>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-xs">
              Unlock achievements by completing learning modules, quizzes, and quests. Earn badges like "Quiz Beginner" for scoring 80% or higher, or "Master Scholar" for completing all learning modules. Keep striving to collect them all!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementCard;

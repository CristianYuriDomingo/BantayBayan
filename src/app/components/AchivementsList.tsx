"use client";

import Image from "next/image";

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

interface Category {
  id: string;
  name: string;
}

interface AchievementsListProps {
  filteredAchievements: Achievement[];
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const AchievementsList: React.FC<AchievementsListProps> = ({ 
  filteredAchievements, 
  categories, 
  selectedCategory, 
  setSelectedCategory 
}) => {
  
  const getRarityColor = (rarity: string) => {
    switch(rarity) {
      case "common": return "bg-gray-200 text-gray-800";
      case "rare": return "bg-blue-200 text-blue-800";
      case "epic": return "bg-purple-200 text-purple-800";
      case "legendary": return "bg-yellow-200 text-yellow-800";
      default: return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Achievements</h1>
      
      {/* Category Filter */}
      <div className="flex overflow-x-auto pb-2 mb-6 gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAchievements.map((achievement) => (
          <div 
            key={achievement.id} 
            className={`border rounded-lg p-4 flex flex-col transition-all ${
              achievement.progress === 100
                ? "bg-white dark:bg-gray-800 border-blue-500 dark:border-blue-400"
                : "bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700 opacity-70"
            }`}
          >
            <div className="flex items-start mb-3">
              <div className={`relative w-16 h-16 rounded-lg overflow-hidden ${achievement.progress !== 100 ? "grayscale" : ""}`}>
                <Image
                  src={achievement.icon}
                  alt={achievement.title}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              <div className="ml-4 flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">{achievement.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded ${getRarityColor(achievement.rarity)}`}>
                    {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{achievement.description}</p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
              <div 
                className="bg-blue-500 h-2.5 rounded-full" 
                style={{ width: `${achievement.progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>{achievement.progress}% Complete</span>
              <span>{achievement.xp} XP</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsList;
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
    <div className="bg-white rounded-lg p-5 mt-5 shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700 flex flex-col h-[calc(100vh-280px)]">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">Achievements</h1>
      </div>
      
      {/* Category Filter */}
      <div className="flex overflow-x-auto pb-2 mb-4 gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-1.5 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {/* Scrollable Achievements Cards */}
      <div className="overflow-y-auto flex-1 pr-1 space-y-4">
        {filteredAchievements.map((achievement) => (
          <div 
            key={achievement.id} 
            className={`bg-white dark:bg-gray-800 border rounded-lg p-4 ${
              achievement.progress === 100
                ? "border-blue-300 dark:border-blue-600"
                : "border-gray-200 dark:border-gray-700"
            }`}
          >
            <div className="flex items-center">
              <div className={`relative w-12 h-12 flex-shrink-0 ${achievement.progress !== 100 ? "grayscale opacity-70" : ""}`}>
                <Image
                  src={achievement.icon}
                  alt={achievement.title}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div className="ml-4 flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-base text-gray-900 dark:text-white">{achievement.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded ${getRarityColor(achievement.rarity)}`}>
                    {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5 mb-2">{achievement.description}</p>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-1">
                  <div 
                    className={`${achievement.progress === 100 ? 'bg-green-500' : 'bg-blue-500'} h-2 rounded-full`}
                    style={{ width: `${achievement.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{achievement.progress}% Complete</span>
                  <span>{achievement.xp} XP</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsList;
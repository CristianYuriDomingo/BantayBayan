"use client";

import React from "react";
import Image from "next/image";

// Define badge rarity types
type BadgeRarity = 'common' | 'rare' | 'epic' | 'legendary';

// Define the achievement interface
interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  progress: number;
  category: string;
  rarity: BadgeRarity;
  xp: number;
}

// Simple badge rarity styling
const rarityStyles: Record<BadgeRarity, string> = {
  common: "bg-gray-200 text-gray-700",
  rare: "bg-blue-200 text-blue-700",
  epic: "bg-purple-200 text-purple-700",
  legendary: "bg-yellow-200 text-yellow-700"
};

interface BadgeCollectionProps {
  achievements: Achievement[];
}

const BadgeCollection: React.FC<BadgeCollectionProps> = ({ achievements }) => {
  // Group achievements by completed (100% progress) and in-progress
  const earnedBadges = achievements.filter(a => a.progress === 100);
  const inProgressBadges = achievements.filter(a => a.progress < 100);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">My Badges</h2>
      
      {/* Earned Badges Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Earned Badges</h3>
        <div className="grid grid-cols-3 gap-3">
          {earnedBadges.map(badge => (
            <div 
              key={badge.id} 
              className="border-2 border-gray-200 rounded-lg bg-white p-3 flex flex-col items-center"
            >
              <div className="mb-2 w-16 h-16 flex items-center justify-center bg-white rounded-lg">
                <Image
                  src={badge.icon}
                  alt={badge.title}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-medium text-center text-gray-800 mb-1">{badge.title}</span>
              <span className={`text-xs px-2 py-1 rounded ${rarityStyles[badge.rarity]}`}>
                {badge.rarity}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* In Progress Badges Section */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Badges In Progress</h3>
        <div className="grid grid-cols-3 gap-3">
          {inProgressBadges.map(badge => (
            <div 
              key={badge.id} 
              className="border-2 border-gray-200 rounded-lg bg-white p-3 flex flex-col items-center"
            >
              <div className="mb-2 w-16 h-16 flex items-center justify-center bg-white rounded-lg relative">
                <Image
                  src={badge.icon}
                  alt={badge.title}
                  width={40}
                  height={40}
                  className="object-contain opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-blue-500 text-white text-xs font-bold rounded px-2 py-1">
                    {badge.progress}%
                  </span>
                </div>
              </div>
              <span className="text-sm font-medium text-center text-gray-800 mb-2">{badge.title}</span>
              
              {/* Simple progress bar */}
              <div className="w-full bg-gray-200 h-2 rounded">
                <div 
                  className="bg-blue-500 h-2 rounded" 
                  style={{ width: `${badge.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BadgeCollection;
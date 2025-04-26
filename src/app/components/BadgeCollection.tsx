import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getEarnedBadges, BADGES } from "../../../lib/moduleDB";

// Define badge rarity types
type BadgeRarity = 'common' | 'rare' | 'epic' | 'legendary';

// Define the badge interface
interface Badge {
  moduleId: string;
  moduleName: string;
  badgeTitle: string;
  badgeImage: string;
  completedAt: Date;
  rarity?: BadgeRarity;
  isEarned?: boolean;
}

// Define the Achievement interface (reuse from Achievements.tsx)
interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  progress: number;
  category: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  xp: number;
}

// Props for BadgeCollection
interface BadgeCollectionProps {
  achievements: Achievement[];
}

const BadgeCollection: React.FC<BadgeCollectionProps> = ({ achievements }) => {
  const [earnedBadges, setEarnedBadges] = useState<Badge[]>([]);
  const [allBadges, setAllBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  // Group badges by category based on badge image path directory structure
  const getBadgeCategory = (moduleId: string, badgeImage: string): string => {
    // Extract category from the image path if available
    if (badgeImage) {
      const pathParts = badgeImage.split('/');
      if (pathParts.length >= 3) {
        // The category is the directory name in the third position
        // e.g., from '/BadgeImage/CrimePrevention/anti-theft.png' we extract 'CrimePrevention'
        const categoryFromPath = pathParts[2];
        
        // Format the category name (convert from camelCase/PascalCase to readable format)
        return categoryFromPath
          .replace(/([A-Z])/g, ' $1') // Add space before capital letters
          .trim(); // Remove any leading/trailing spaces
      }
    }
    
    // Fallback logic based on moduleId if image path doesn't provide category
    if (moduleId.startsWith('anti-') && !moduleId.includes('terrorist') && !moduleId.includes('smoking')) 
      return 'Crime Prevention';
    if (moduleId.startsWith('cybersecurity') || moduleId.includes('internet') || 
        moduleId.includes('privacy') || moduleId.includes('scam') || moduleId.includes('media-literacy'))
      return 'Cyber Security';
    if (moduleId.startsWith('emergency') || moduleId.includes('hotlines'))
      return 'Emergency Hotlines';
    if (moduleId.includes('drug'))
      return 'Drug Awareness';
    if (moduleId.includes('report-crime'))
      return 'Report Crime';
    if (moduleId.includes('terrorist'))
      return 'Anti Terrorist';
    if (moduleId.startsWith('traffic') || moduleId.includes('pedestrian') || 
        moduleId.includes('driving') || moduleId.includes('road-safety'))
      return 'Traffic Rules';
    if (moduleId.includes('disaster') || moduleId.includes('evacuation') || 
        moduleId.includes('first-aid') || moduleId.includes('drill'))
      return 'Emergency Preparedness';
    if (moduleId.includes('voter'))
      return 'Voter Education';
    if (moduleId.includes('transport'))
      return 'Public Transport';
    if (moduleId.includes('smoking'))
      return 'Anti Smoking';
    
    return 'General';
  };

  // Define badge rarity (you can adjust this logic as needed)
  const getBadgeRarity = (moduleId: string): BadgeRarity => {
    // This is placeholder logic - adjust based on your requirements
    if (moduleId.includes('first-aid')) return 'legendary';
    if (moduleId.includes('emergency') || moduleId.includes('disaster')) return 'epic';
    if (moduleId.includes('cyber') || moduleId.includes('security')) return 'rare';
    return 'common';
  };

  // Helper function to get module link based on moduleId
  const getModuleLink = (moduleId: string): string => {
    // Map moduleId to the correct lesson path format used in your application
    if (moduleId === "anti-theft") 
      return "/lessons/CrimePrevention/AntiTheft&RobberyAwareness";
    if (moduleId === "anti-carnapping") 
      return "/lessons/CrimePrevention/AntiCarnapping";
    if (moduleId === "illegal-firearms-awareness") 
      return "/lessons/CrimePrevention/IllegalFirearmsAwareness";
    if (moduleId === "anti-gambling") 
      return "/lessons/CrimePrevention/AntiGambling";
    if (moduleId === "anti-rape-and-sexual-assault-prevention") 
      return "/lessons/CrimePrevention/AntiRape&SexualAssaultPrevention";
    
    // Cyber Security modules
    if (moduleId === "cybersecurity-data-protection") 
      return "/lessons/CyberSecurity/CybersecurityDataProtection";
    if (moduleId === "safe-responsible-internet-use") 
      return "/lessons/CyberSecurity/SafeResponsibleInternetUse";
    if (moduleId === "scam-fraud-awareness") 
      return "/lessons/CyberSecurity/ScamFraudAwareness";
    if (moduleId === "identity-privacy-protection") 
      return "/lessons/CyberSecurity/IdentityPrivacyProtection";
    if (moduleId === "media-literacy-misinformation") 
      return "/lessons/CyberSecurity/MediaLiteracyMisinformation";
    
    // Traffic Rules modules
    if (moduleId === "basic-traffic-rules") 
      return "/lessons/TrafficRules/BasicTrafficRules";
    if (moduleId === "road-safety-tips") 
      return "/lessons/TrafficRules/RoadSafetyTips";
    if (moduleId === "pedestrian-safety") 
      return "/lessons/TrafficRules/PedestrianSafety";
    if (moduleId === "driving-under-influence") 
      return "/lessons/TrafficRules/DrivingUnderInfluence";
    
    // Emergency Preparedness modules
    if (moduleId === "emergency-response") 
      return "/lessons/EmergencyPreparedness/EmergencyResponse";
    if (moduleId === "evacuation-procedure") 
      return "/lessons/EmergencyPreparedness/EvacuationProcedure";
    if (moduleId === "fire-earthquake-drills") 
      return "/lessons/EmergencyPreparedness/Fire&EarthquakeDrills";
    if (moduleId === "first-aid-basic") 
      return "/lessons/EmergencyPreparedness/FirstAidBasic";
    if (moduleId === "disaster-awareness") 
      return "/lessons/EmergencyPreparedness/DisasterAwareness";
    
    // Single-lesson modules
    if (moduleId === "emergency-hotlines") 
      return "/lessons/EmergencyHotline";
    if (moduleId === "drug-awareness") 
      return "/lessons/DrugAwareness";
    if (moduleId === "report-crime") 
      return "/lessons/ReportCrime";
    if (moduleId === "anti-terrorist") 
      return "/lessons/AntiTerrorist";
    if (moduleId === "voter-education") 
      return "/lessons/VoterEducation";
    if (moduleId === "public-transport-safety") 
      return "/lessons/PublicTransport";
    if (moduleId === "anti-smoking") 
      return "/lessons/AntiSmoking";

    // Default fallback path if no specific match is found
    return `/lessons/${moduleId}`;
  };

  useEffect(() => {
    async function loadBadges() {
      try {
        setLoading(true);
        
        // Get earned badges
        const earned = await getEarnedBadges();
        setEarnedBadges(earned);
        
        // Create a comprehensive list of all possible badges (earned and unearned)
        const allBadgesObject = BADGES as Record<string, { title: string; imagePath: string; rarity?: BadgeRarity }>;
        const allBadgesList = Object.entries(allBadgesObject).map(([moduleId, badgeInfo]) => {
          // Check if this badge has been earned
          const earnedBadge = earned.find(b => b.moduleId === moduleId);
          
          return {
            moduleId,
            moduleName: earnedBadge?.moduleName || `${badgeInfo.title.replace(' Badge', '')} Module`,
            badgeTitle: badgeInfo.title,
            badgeImage: badgeInfo.imagePath,
            completedAt: earnedBadge?.completedAt || new Date(),
            rarity: badgeInfo.rarity || getBadgeRarity(moduleId),
            isEarned: !!earnedBadge
          };
        });
        
        setAllBadges(allBadgesList);
      } catch (error) {
        console.error("Error loading badges:", error);
        setAllBadges([]);
      } finally {
        setLoading(false);
      }
    }

    loadBadges();
  }, []);

  // Group badges by category
  const groupedBadges = allBadges.reduce((acc, badge) => {
    const category = getBadgeCategory(badge.moduleId, badge.badgeImage);
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(badge);
    return acc;
  }, {} as Record<string, Badge[]>);

  // Format the date nicely
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Sort categories by number of badges (most to least)
  const sortedCategories = Object.entries(groupedBadges).sort((a, b) => {
    return b[1].length - a[1].length;
  });

  return (
    <div className="bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100 p-6 min-h-[400px] rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-200 pb-2">Badge Collection</h2>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : allBadges.length === 0 ? (
        <div className="text-center p-8 bg-white rounded-lg shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-400 mb-4">
            <circle cx="12" cy="8" r="7"></circle>
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
          </svg>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No Badges Available</h3>
          <p className="text-gray-500">Complete learning modules to earn badges and build your collection!</p>
        </div>
      ) : (
        <div>
          {/* Badge Detail Modal */}
          {selectedBadge && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setSelectedBadge(null)}>
              <div className="bg-white rounded-lg p-6 max-w-md w-full m-4" onClick={e => e.stopPropagation()}>
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 mb-4 relative">
                    <Image 
                      src={selectedBadge.badgeImage} 
                      alt={selectedBadge.badgeTitle} 
                      layout="fill"
                      objectFit="contain"
                      className={selectedBadge.isEarned ? "" : "grayscale opacity-50"}
                    />
                    {!selectedBadge.isEarned && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-center mb-2">{selectedBadge.badgeTitle}</h3>
                  <p className="text-gray-600 text-center mb-3">
                    {selectedBadge.isEarned 
                      ? `Earned for completing ${selectedBadge.moduleName}`
                      : `Complete ${selectedBadge.moduleName} to earn this badge`
                    }
                  </p>
                  {selectedBadge.isEarned && (
                    <>
                      <p className="text-sm text-gray-500 mb-4">Earned on {formatDate(selectedBadge.completedAt)}</p>
                      <Link 
                        href={getModuleLink(selectedBadge.moduleId)}
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors mb-4"
                      >
                        Review Module Content
                      </Link>
                    </>
                  )}
                  {!selectedBadge.isEarned && (
                    <Link 
                      href={getModuleLink(selectedBadge.moduleId)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors mb-4"
                    >
                      Complete Module to Earn
                    </Link>
                  )}
                  {selectedBadge.rarity && (
                    <span className={`mt-2 px-3 py-1 text-xs font-semibold rounded-full ${
                      selectedBadge.rarity === 'legendary' ? 'bg-purple-100 text-purple-800' :
                      selectedBadge.rarity === 'epic' ? 'bg-pink-100 text-pink-800' :
                      selectedBadge.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {selectedBadge.rarity.charAt(0).toUpperCase() + selectedBadge.rarity.slice(1)}
                    </span>
                  )}
                </div>
                <div className="mt-6 flex justify-center">
                  <button 
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    onClick={() => setSelectedBadge(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Categories and Badges Display - Sorted by number of badges (most to least) */}
          {sortedCategories.map(([category, categoryBadges]) => (
            <div key={category} className="mb-8 bg-white bg-opacity-60 rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b border-blue-200 pb-2">
                {category} ({categoryBadges.length})
              </h3>
              <div className={`grid ${categoryBadges.length === 1 ? 'grid-cols-1 justify-items-start' : 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6'} gap-4`}>
                {categoryBadges.map((badge) => (
                  <div key={badge.moduleId} className="flex flex-col items-center">
                    {/* Conditional wrapper: if earned, make it a clickable Link, otherwise just a div */}
                    {badge.isEarned ? (
                      <Link 
                        href={getModuleLink(badge.moduleId)}
                        className="group flex flex-col items-center cursor-pointer transform transition-transform hover:scale-105"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedBadge(badge);
                        }}
                      >
                        <div className="relative w-16 h-16 mb-2">
                          <Image
                            src={badge.badgeImage}
                            alt={badge.badgeTitle}
                            layout="fill"
                            objectFit="contain"
                            className="drop-shadow-md"
                          />
                          
                          {/* Rarity indicator dot */}
                          {badge.rarity && (
                            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-white ${
                              badge.rarity === 'legendary' ? 'bg-purple-500' :
                              badge.rarity === 'epic' ? 'bg-pink-500' :
                              badge.rarity === 'rare' ? 'bg-blue-500' :
                              'bg-green-500'
                            }`}></div>
                          )}
                        </div>
                        <span className="text-center text-xs text-gray-700 line-clamp-2 max-w-[80px]">
                          {badge.badgeTitle.replace(' Badge', '')}
                        </span>
                        <span className="mt-1 text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                          View Details
                        </span>
                      </Link>
                    ) : (
                      <div 
                        className="flex flex-col items-center cursor-pointer transform transition-transform hover:scale-105"
                        onClick={() => setSelectedBadge(badge)}
                      >
                        <div className="relative w-16 h-16 mb-2">
                          <Image
                            src={badge.badgeImage}
                            alt={badge.badgeTitle}
                            layout="fill"
                            objectFit="contain"
                            className="grayscale opacity-50 drop-shadow-md"
                          />
                          
                          {/* Lock icon overlay for unearned badges */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                          </div>
                          
                          {/* Rarity indicator dot */}
                          {badge.rarity && (
                            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-white ${
                              badge.rarity === 'legendary' ? 'bg-purple-500' :
                              badge.rarity === 'epic' ? 'bg-pink-500' :
                              badge.rarity === 'rare' ? 'bg-blue-500' :
                              'bg-green-500'
                            }`}></div>
                          )}
                        </div>
                        <span className="text-center text-xs text-gray-700 line-clamp-2 max-w-[80px]">
                          {badge.badgeTitle.replace(' Badge', '')}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {/* Rarity Legend */}
          <div className="mt-6 p-3 bg-white bg-opacity-60 rounded-lg flex flex-wrap justify-center gap-3">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-xs text-gray-700">Common</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-xs text-gray-700">Rare</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-pink-500 mr-2"></div>
              <span className="text-xs text-gray-700">Epic</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
              <span className="text-xs text-gray-700">Legendary</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BadgeCollection;
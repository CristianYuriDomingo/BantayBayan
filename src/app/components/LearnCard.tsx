import React, { useState, useEffect } from "react";
import Image from "next/image";
import Modal from "./Modal";
import { getModuleById, isModuleCompleted, getEarnedBadges } from "../../../lib/moduleDB"; // Adjust path as needed

interface LearnCardProps {
  imageSrc: string;
  title: string;
  lessons: string;
  buttonText: string;
  modalContent: React.ReactNode;
  moduleId?: string | string[]; // Can be a single moduleId or array of moduleIds
}

interface Badge {
  badgeImage: string;
  badgeTitle: string;
}

const LearnCard: React.FC<LearnCardProps> = ({ 
  imageSrc, 
  title, 
  lessons, 
  buttonText, 
  modalContent,
  moduleId
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [badgeModalOpen, setBadgeModalOpen] = useState(false);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [allCompleted, setAllCompleted] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  
  // Check if the modules are completed when component mounts
  useEffect(() => {
    const checkModuleStatus = async () => {
      if (!moduleId) return;

      try {
        // Handle either single moduleId or array of moduleIds
        const moduleIds = Array.isArray(moduleId) ? moduleId : [moduleId];
        const completed: string[] = [];
        const badgesList: Badge[] = [];
        
        // Check each module's completion status
        for (const id of moduleIds) {
          const isCompleted = await isModuleCompleted(id);
          
          if (isCompleted) {
            completed.push(id);
            const moduleData = await getModuleById(id);
            
            if (moduleData && moduleData.badgeImage) {
              badgesList.push({
                badgeImage: moduleData.badgeImage,
                badgeTitle: moduleData.badgeEarned || ""
              });
            }
          }
        }
        
        setCompletedModules(completed);
        setBadges(badgesList);
        
        // Only mark as all completed if every module in the array is completed
        setAllCompleted(moduleIds.length > 0 && completed.length === moduleIds.length);
      } catch (error) {
        console.error("Error checking module status:", error);
      }
    };
    
    checkModuleStatus();
  }, [moduleId]);

  // Function to handle badge click
  const handleBadgeClick = (badge: Badge) => {
    setSelectedBadge(badge);
    setBadgeModalOpen(true);
  };

  return (
    <>
      <div className="group relative w-40 h-56 sm:w-52 sm:h-68 md:w-60 md:h-80 rounded-lg overflow-hidden text-black transform-gpu shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl bg-white">
        <div className="relative w-full h-full">
          {!imageError ? (
            <Image
              src={imageSrc}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-110 hover:-rotate-3"
              onError={() => setImageError(true)}
              unoptimized // Try this if your images are external or not properly processed by Next.js
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-500">Image not available</span>
            </div>
          )}
          
          {/* Badge container - horizontal row at top left */}
          {badges.length > 0 && (
            <div className="absolute top-2 left-2 flex space-x-2 z-20">
              {badges.slice(0, 3).map((badge, index) => (
                <div 
                  key={index} 
                  className="relative w-6 h-6 sm:w-8 sm:h-8 filter drop-shadow-lg transition-transform duration-200 hover:scale-110 cursor-pointer"
                  onClick={() => handleBadgeClick(badge)}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={badge.badgeImage}
                      alt={badge.badgeTitle}
                      layout="fill"
                      objectFit="contain"
                      unoptimized
                    />
                  </div>
                </div>
              ))}
              {badges.length > 3 && (
                <div 
                  className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold text-blue-600 cursor-pointer"
                  onClick={() => setIsModalOpen(true)}
                >
                  +{badges.length - 3}
                </div>
              )}
            </div>
          )}
        </div>

        <span className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#e0f7ff] via-transparent to-transparent backdrop-blur-md h-[35%] grid grid-rows-2 gap-1 p-3 items-center">
          <span className="text-base sm:text-lg font-bold text-[#2d87ff] drop-shadow-md leading-tight line-clamp-2">{title}</span>
          <span className="text-xs sm:text-sm text-[#2d87ff] drop-shadow-md flex items-center">
            {lessons}
            {completedModules.length > 0 && (
              <span className="ml-2 text-green-500 flex-shrink-0" title={`${completedModules.length} out of ${Array.isArray(moduleId) ? moduleId.length : 1} completed`}>
                {completedModules.length}{Array.isArray(moduleId) && `/${moduleId.length}`}
              </span>
            )}
            {allCompleted && <span className="ml-1 text-green-500 flex-shrink-0">✓</span>}
          </span>
        </span>

        <span className="absolute bottom-[35%] right-2 w-20 h-10 bg-[#2d87ff] flex items-center justify-center rounded-full transition-transform duration-300 hover:translate-y-[-30%] hover:bg-[#1a5bbf]">
          <button onClick={() => setIsModalOpen(true)} className="text-xs sm:text-sm font-semibold text-white">
            {completedModules.length > 0 ? "Review" : buttonText}
          </button>
        </span>
      </div>

      {/* Main Content Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {modalContent}
      </Modal>

      {/* Badge Detail Modal */}
      <Modal isOpen={badgeModalOpen} onClose={() => setBadgeModalOpen(false)}>
        {selectedBadge && (
          <div className="p-4 flex flex-col items-center">
            <div className="w-24 h-24 mb-4 relative">
              <Image
                src={selectedBadge.badgeImage}
                alt={selectedBadge.badgeTitle}
                layout="fill"
                objectFit="contain"
                unoptimized
              />
            </div>
            <h2 className="text-xl font-bold mb-2">{selectedBadge.badgeTitle}</h2>
            <p className="text-center">
              You've earned this badge for completing this learning module!
            </p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default LearnCard;
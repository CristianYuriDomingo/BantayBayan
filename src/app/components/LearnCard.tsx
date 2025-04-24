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

const LearnCard: React.FC<LearnCardProps> = ({ 
  imageSrc, 
  title, 
  lessons, 
  buttonText, 
  modalContent,
  moduleId
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [badges, setBadges] = useState<{badgeImage: string, badgeTitle: string}[]>([]);
  const [allCompleted, setAllCompleted] = useState(false);

  // Check if the modules are completed when component mounts
  useEffect(() => {
    const checkModuleStatus = async () => {
      if (!moduleId) return;

      try {
        // Handle either single moduleId or array of moduleIds
        const moduleIds = Array.isArray(moduleId) ? moduleId : [moduleId];
        const completed: string[] = [];
        const badgesList: {badgeImage: string, badgeTitle: string}[] = [];
        
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

  return (
    <>
      <div className="group relative w-40 h-56 sm:w-52 sm:h-68 md:w-60 md:h-80 rounded-lg overflow-hidden text-black transform-gpu shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl bg-white">
        <div className="relative w-full h-full">
          <Image
            src={imageSrc}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-110 hover:-rotate-3"
          />
          
          {/* Badge container - horizontal row at top left */}
          {badges.length > 0 && (
            <div className="absolute top-2 left-2 flex space-x-1 z-10">
              {badges.slice(0, 3).map((badge, index) => (
                <div key={index} className="w-8 h-8 sm:w-10 sm:h-10 filter drop-shadow-lg group-hover:scale-110 transition-transform duration-200">
                  <div className="relative w-full h-full">
                    <Image
                      src={badge.badgeImage}
                      alt={badge.badgeTitle}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full left-0 mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="bg-white text-xs px-2 py-1 rounded shadow-md">
                      {badge.badgeTitle}
                    </div>
                  </div>
                </div>
              ))}
              {badges.length > 3 && (
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold text-blue-600">
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

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {modalContent}
      </Modal>
    </>
  );
};

export default LearnCard;
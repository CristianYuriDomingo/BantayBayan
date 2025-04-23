"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCompletedModules } from '../../../lib/moduleDB';

// Define types for module objects
interface Module {
  id: string;
  title: string;
  category: string;
  path: string;
}

interface CompletedModule {
  moduleId: string;
  moduleName: string;
  completedAt: Date;
  badgeEarned: string | null;
}

export default function RecommendedNext() {
  const router = useRouter();
  const [recommendations, setRecommendations] = useState<Module[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Custom SVG icons as components
  const BookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
    </svg>
  );

  const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );

  // Define all available modules with their paths
  const allModules: Module[] = [
    // Crime Prevention
    { id: 'anti-carnapping', title: 'Anti-Carnapping', category: 'Crime Prevention', path: '/lessons/CrimePrevention/AntiCarnapping' },
    { id: 'anti-theft', title: 'Anti-Theft & Robbery Awareness', category: 'Crime Prevention', path: '/lessons/CrimePrevention/AntiTheft&RobberyAwareness' },
    { id: 'illegal-firearms-awareness', title: 'Illegal Firearms Awareness', category: 'Crime Prevention', path: '/lessons/CrimePrevention/IllegalFirearmsAwareness' },
    { id: 'anti-gambling', title: 'Anti-Gambling', category: 'Crime Prevention', path: '/lessons/CrimePrevention/AntiGambling' },
    { id: 'anti-rape-and-sexual-assault-prevention', title: 'Anti-Rape & Sexual Assault Prevention', category: 'Crime Prevention', path: '/lessons/CrimePrevention/AntiRape&SexualAssaultPrevention' },

    // Cyber Security
    { id: 'cybersecurity-data-protection', title: 'Cybersecurity & Data Protection', category: 'Digital & Cyber Safety', path: '/lessons/CyberSecurity/CybersecurityDataProtection' },
    { id: 'safe-responsible-internet-use', title: 'Safe & Responsible Internet Use', category: 'Digital & Cyber Safety', path: '/lessons/CyberSecurity/SafeResponsibleInternetUse' },
    { id: 'identity-privacy-protection', title: 'Identity & Privacy Protection', category: 'Digital & Cyber Safety', path: '/lessons/CyberSecurity/IdentityPrivacyProtection' },
    { id: 'media-literacy-misinformation', title: 'Media Literacy & Misinformation', category: 'Digital & Cyber Safety', path: '/lessons/CyberSecurity/MediaLiteracyMisinformation' },

    //Emergency Hotline
    { id: 'emergency-hotlines', title: 'Emergency Hotlines', category: 'Emergency Hotlines', path: '/lessons/EmergencyHotline' },

    //Drug Awareness
    { id: 'drug-awareness', title: 'Drug Awareness', category: 'Drug Awareness', path: '/lessons/DrugAwareness' },

    //Crime Report
    { id: 'report-crime', title: 'How to Report Crime', category: 'How To Report Crime', path: '/lessons/ReportCrime' },
    
    //Anti Terrorist
    { id: 'anti-terrorist', title: 'Terrorism Awareness', category: 'Terrorism Awareness', path: '/lessons/AntiTerorist' },
    
    // Traffic Rules
    { id: 'traffic-basic-rules', title: 'Basic Traffic Rules', category: 'Traffic Rules', path: '/lessons/TrafficRules/BasicTrafficRules' },
    { id: 'road-safety-tips', title: 'Road Safety Tips', category: 'Traffic Rules', path: '/lessons/TrafficRules/RoadSafetyTips' },
    { id: 'pedestrian-safety', title: 'Pedestrian Safety', category: 'Traffic Rules', path: '/lessons/TrafficRules/PedestrianSafety' },
    { id: 'driving-under-influence', title: 'Driving Under Influence', category: 'Traffic Rules', path: '/lessons/TrafficRules/PedestrianSafety' },
    
    //Emergency Preparedness 
    { id: 'emergency-response', title: 'Emergency Response', category: 'Emergency Preparedness', path: '/lessons/EmergencyPreparedness/EmergencyResponse' },
    { id: 'evacuation-procedures', title: 'Evacuation Procedure', category: 'Emergency Preparedness', path: '/lessons/EmergencyPreparedness/EvacuationProcedure' },
    { id: 'fire-earthquake-drills', title: 'Fire And Earthquake Drills', category: 'Emergency Preparedness', path: '/lessons/EmergencyPreparedness/Fire&EarthquakeDrills' },
    { id: 'first-aid-basics', title: 'First Aid Basic', category: 'Emergency Preparedness', path: '/lessons/EmergencyPreparedness/FirstAidBasic' },
    { id: 'disaster-awareness', title: 'Disaster Awareness', category: 'Emergency Preparedness', path: '/lessons/EmergencyPreparedness/DisasterAwareness' },

    //Voter Education
    { id: 'voter-education', title: 'Voter Education', category: 'Voter Education', path: '/lessons/VoterEducation' },

    //Public Transport Safety
    { id: 'public-transport-safety', title: 'Public Transport Safety', category: 'Public Transport Safety', path: '/lessons/PublicTransport' },

    //Anti Smoking
    { id: 'anti-smoking', title: 'Anti Smoking', category: 'Anti Smoking', path: '/lessons/AntiSmoking' },
    
    
    
    
    
    
    
    
    // Add more modules as needed...
  ];

  useEffect(() => {
    // Function to get recommendations based on completed modules
    const getRecommendations = async () => {
      try {
        setLoading(true);
        const completed = await getCompletedModules() as CompletedModule[];
        const completedIds = completed.map(module => module.moduleId);

        // Algorithm to select recommendations
        let recs: Module[] = [];

        // First, check if there are any in-progress categories
        const completedCategories = new Set(
          completed.map(module => {
            const foundModule = allModules.find(m => m.id === module.moduleId);
            return foundModule ? foundModule.category : null;
          }).filter(Boolean)
        );

        // Find modules from categories user has started but not completed all
        for (const category of completedCategories) {
          const modulesInCategory = allModules.filter(m => m.category === category);
          const uncompletedInCategory = modulesInCategory.filter(m => !completedIds.includes(m.id));

          if (uncompletedInCategory.length > 0) {
            // Add highest priority from each started category
            recs.push(uncompletedInCategory[0]);
            if (recs.length >= 2) break; // Limit to 2 recommendations
          }
        }

        // If we still need recommendations, add from untouched categories
        if (recs.length < 2) {
          const untouchedCategories = allModules.filter(m =>
            !completedCategories.has(m.category) && !recs.some(r => r.id === m.id)
          );

          // Group by category
          const categorized: Record<string, Module[]> = {};
          untouchedCategories.forEach(module => {
            if (!categorized[module.category]) {
              categorized[module.category] = [];
            }
            categorized[module.category].push(module);
          });

          // Add first module from each untouched category
          for (const category in categorized) {
            if (recs.length < 2) {
              recs.push(categorized[category][0]);
            } else {
              break;
            }
          }
        }

        // If still no recommendations (new user), recommend first few modules
        if (recs.length === 0) {
          recs = allModules.slice(0, 2);
        }

        setRecommendations(recs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        setLoading(false);
      }
    };

    getRecommendations();
  }, []);

  const handleModuleClick = (path: string) => {
    router.push(path);
  };

  if (loading) {
    return (
      <div className="p-4 border-b border-blue-100">
        <h2 className="text-lg font-bold text-blue-800 mb-3">Recommended Next</h2>
        <div className="space-y-3">
          <div className="flex items-start p-3 bg-gray-50 rounded-lg border border-gray-200 animate-pulse h-16"></div>
          <div className="flex items-start p-3 bg-gray-50 rounded-lg border border-gray-200 animate-pulse h-16"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 border-b border-blue-100">
      <h2 className="text-lg font-bold text-blue-800 mb-3">Recommended Next</h2>

      <div className="space-y-3">
        {recommendations.length > 0 ? (
          recommendations.map((module, index) => (
            <div
              key={index}
              onClick={() => handleModuleClick(module.path)}
              className="flex items-start p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer"
            >
              <div className="p-2 bg-blue-200 rounded-full mr-3 text-blue-700">
                <BookIcon />
              </div>
              <div>
                <p className="font-bold text-blue-700">{module.title}</p>
                <p className="text-sm text-blue-600">{module.category}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-500">No recommendations available.</p>
          </div>
        )}
      </div>
    </div>
  );
}
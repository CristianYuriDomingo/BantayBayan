"use client";

import { useState, FormEvent, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  // You can add props if needed
}

interface Lesson {
  title: string;
  path: string;
}

interface LessonCategory {
  category: string;
  image: string;
  lessons: Lesson[];
}

const SearchBar: React.FC<SearchBarProps> = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<LessonCategory[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  // Define your lesson categories with their respective lessons
  const lessonCategories: LessonCategory[] = [
    {
      category: "Crime Prevention",
      image: "/LearnImage/CrimePrevention.png",
      lessons: [
        { title: "Anti-Carnapping", path: "/lessons/CrimePrevention/AntiCarnapping" },
        { title: "Anti-Theft & Robbery Awareness", path: "/lessons/CrimePrevention/AntiTheft&RobberyAwareness" },
        { title: "Illegal Firearms Awareness", path: "/lessons/CrimePrevention/IllegalFirearmsAwareness" },
        { title: "Anti-Gambling", path: "/lessons/CrimePrevention/AntiGambling" },
        { title: "Anti-Rape & Sexual Assault Prevention", path: "/lessons/CrimePrevention/AntiRape&SexualAssaultPrevention" },
      ]
    },
    {
      category: "Digital & Cyber Safety",
      image: "/LearnImage/Cyber.png",
      lessons: [
        { title: "Cybersecurity & Data Protection", path: "/lessons/CyberSecurity/CybersecurityDataProtection" },
        { title: "Safe & Responsible Internet Use", path: "/lessons/CyberSecurity/SafeResponsibleInternetUse" },
        { title: "Scam & Fraud Awareness", path: "/lessons/CyberSecurity/ScamFraudAwareness" },
        { title: "Identity & Privacy Protection", path: "/lessons/CyberSecurity/IdentityPrivacyProtection" },
        { title: "Media Literacy & Misinformation Awareness", path: "/lessons/CyberSecurity/MediaLiteracyMisinformation" },
      ]
    },
    {
      category: "Palayan City Hotlines",
      image: "/LearnImage/EmergencyHotlineNumbers.png",
      lessons: [
        { title: "Palayan City Emergency Hotline", path: "/lessons/EmergencyHotline/PalayanCityEmergencyHotline" },
      ]
    },
    {
      category: "Drug Awareness & Prevention",
      image: "/LearnImage/Drugs.png",
      lessons: [
        { title: "Drug Awareness and Prevention", path: "/lessons/DrugAwareness/DrugAwarenessAndPrevention" },
      ]
    },
    {
      category: "How To Report a Crime",
      image: "/LearnImage/CaseFiling.png",
      lessons: [
        { title: "How to Report Crime", path: "/lessons/HowToReportCrime/HowToReportCrime" },
      ]
    },
    {
      category: "Anti Terrorist Awareness",
      image: "/LearnImage/Terrorist.png",
      lessons: [
        { title: "Anti-Terrorist Awareness", path: "/lessons/AntiTerrorist/AntiTerroristAwareness" },
      ]
    },
    {
      category: "Traffic Rules & Road Safety",
      image: "/LearnImage/Traffic.png",
      lessons: [
        { title: "Basic Traffic Rules", path: "/lessons/TrafficRules/BasicTrafficRules" },
        { title: "Road Safety Tips", path: "/lessons/TrafficRules/RoadSafetyTips" },
        { title: "Pedestrian Safety", path: "/lessons/TrafficRules/PedestrianSafety" },
        { title: "Driving Under Influence", path: "/lessons/TrafficRules/DrivingUnderInfluence" },
      ]
    },
    {
      category: "Emergency Preparedness & Response",
      image: "/LearnImage/Emergency.png",
      lessons: [
        { title: "Emergency Preparedness", path: "/lessons/EmergencyPreparedness/EmergencyPreparedness" },
        { title: "Disaster Response", path: "/lessons/EmergencyPreparedness/DisasterResponse" },
        { title: "First Aid Basics", path: "/lessons/EmergencyPreparedness/FirstAidBasics" },
        { title: "Evacuation Procedures", path: "/lessons/EmergencyPreparedness/EvacuationProcedures" },
      ]
    },
    {
      category: "Voter Education",
      image: "/LearnImage/Vote.png",
      lessons: [
        { title: "Voter Education", path: "/lessons/VoterEducation/VoterEducation" },
      ]
    },
    {
      category: "Public Transport Safety Tips",
      image: "/LearnImage/PublicTransport.png",
      lessons: [
        { title: "Public Transport Safety Tips", path: "/lessons/PublicTransport/PublicTransportSafetyTips" },
      ]
    },
    {
      category: "Anti-Smoking in Public Places",
      image: "/LearnImage/NoSmoking.png",
      lessons: [
        { title: "Smoking Prevention", path: "/lessons/AntiSmoking/SmokingPrevention" },
      ]
    },
  ];

  // Search function that filters both categories and lessons
  const performSearch = (term: string) => {
    if (!term.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const lowercaseTerm = term.toLowerCase();
    
    // Filter categories and their lessons
    const results = lessonCategories.map(category => {
      // Filter lessons within each category
      const matchingLessons = category.lessons.filter(lesson => 
        lesson.title.toLowerCase().includes(lowercaseTerm)
      );
      
      // Return category with filtered lessons if there are matches
      return {
        ...category,
        lessons: matchingLessons
      };
    }).filter(category => 
      // Keep only categories with matching lessons or if category name matches
      category.lessons.length > 0 || category.category.toLowerCase().includes(lowercaseTerm)
    );
    
    setSearchResults(results);
    setShowResults(true);
  };

  useEffect(() => {
    if (searchTerm.length > 0) {
      performSearch(searchTerm);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchTerm]);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    performSearch(searchTerm);
  };

  const handleLessonClick = (path: string) => {
    router.push(path);
    setShowResults(false);
    setSearchTerm('');
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Highlight matching text in search results
  const highlightMatch = (text: string) => {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, i) => 
      regex.test(part) ? <span key={i} className="bg-yellow-200">{part}</span> : part
    );
  };

  return (
    <div ref={searchRef} className="w-full mb-6 px-2">
      <div className={`relative ${isSearchFocused ? 'z-50' : 'z-40'}`}>
        {/* Duolingo-style search bar */}
        <form onSubmit={handleSearch} className="flex justify-center">
          <input
            type="search"
            className="w-3/4 px-4 py-3 rounded-l-full border-2 border-r-0 border-blue-400 text-gray-800 text-lg shadow-md"
            placeholder="Search for lessons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold rounded-r-full px-6 py-3 border-2 border-blue-500 shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </form>

        {/* Search Results Dropdown */}
        {showResults && (
          <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 animate-fadeIn">
            {searchResults.length > 0 ? (
              <div className="max-h-[70vh] overflow-y-auto">
                {searchResults.map((category, index) => (
                  <div key={index} className="border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center p-3 bg-gray-50">
                      <div className="w-8 h-8 mr-3 relative overflow-hidden rounded-md">
                        <Image 
                          src={category.image} 
                          alt={category.category}
                          width={32}
                          height={32}
                          objectFit="cover"
                        />
                      </div>
                      <h3 className="font-medium text-blue-700">{highlightMatch(category.category)}</h3>
                    </div>
                    
                    <ul>
                      {category.lessons.map((lesson, lessonIndex) => (
                        <li key={lessonIndex} className="border-b border-gray-50 last:border-b-0">
                          <button
                            onClick={() => handleLessonClick(lesson.path)}
                            className="w-full px-4 py-3 text-left text-gray-700 hover:bg-blue-50 transition-colors flex items-center group"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3 group-hover:scale-125 transition-transform"></span>
                            <span>{highlightMatch(lesson.title)}</span>
                            
                            {/* Arrow icon */}
                            <svg className="w-4 h-4 ml-auto text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center">
                <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 21a9 9 0 110-18 9 9 0 010 18z"></path>
                  </svg>
                </div>
                <p className="text-gray-500 text-lg">No lessons found for "<span className="font-medium">{searchTerm}</span>"</p>
                <p className="text-gray-400 text-sm mt-2">Try checking your spelling or use different keywords</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
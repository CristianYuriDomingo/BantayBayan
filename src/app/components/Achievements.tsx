"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AchievementsList from "./AchivementsList";
import BadgeCollection from "../components/BadgeCollection";

// Define interfaces for type safety
interface Category {
  id: string;
  name: string;
}

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

const Achievements: React.FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [isDropdownVisible, setDropdownVisible] = useState<boolean>(true);
    const [isClient, setIsClient] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const router = useRouter();

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null; // Render nothing on the server
    }

    const categories: Category[] = [
        { id: "all", name: "All Achievements" },
        { id: "learning", name: "Learning" },
        { id: "quizzes", name: "Quizzes" },
        { id: "quests", name: "Quests" }
    ];
      
    const achievements: Achievement[] = [
        // Learning achievements
        { 
            id: 1, 
            title: "First Module Complete", 
            description: "Finish your first learning module", 
            icon: "/DashboardImage/learn.png", 
            progress: 100, 
            category: "learning",
            rarity: "common",
            xp: 50
        },
        { 
            id: 2, 
            title: "Knowledge Hunter", 
            description: "Complete 10 learning modules", 
            icon: "/DashboardImage/learn.png", 
            progress: 40, 
            category: "learning",
            rarity: "rare",
            xp: 200
        },
        { 
            id: 3, 
            title: "Master Scholar", 
            description: "Complete all learning modules", 
            icon: "/DashboardImage/learn.png", 
            progress: 20, 
            category: "learning",
            rarity: "legendary",
            xp: 500
        },
        
        // Quiz achievements
        { 
            id: 4, 
            title: "Quiz Beginner", 
            description: "Score 80% or higher on your first quiz", 
            icon: "/DashboardImage/quiz.png", 
            progress: 100, 
            category: "quizzes",
            rarity: "common",
            xp: 75
        },
        { 
            id: 5, 
            title: "Quiz Master", 
            description: "Score 100% on 5 different quizzes", 
            icon: "/DashboardImage/quiz.png", 
            progress: 60, 
            category: "quizzes",
            rarity: "epic",
            xp: 300
        },
        
        // Quest achievements
        { 
            id: 6, 
            title: "Quest Starter", 
            description: "Complete your first quest", 
            icon: "/DashboardImage/quest.png", 
            progress: 100, 
            category: "quests",
            rarity: "common",
            xp: 100
        },
        { 
            id: 7, 
            title: "Quest Explorer", 
            description: "Complete 10 different quests", 
            icon: "/DashboardImage/quest.png", 
            progress: 30, 
            category: "quests",
            rarity: "rare",
            xp: 250
        }
    ];

    const filteredAchievements = selectedCategory === "all" 
        ? achievements 
        : achievements.filter(achievement => achievement.category === selectedCategory);

    return (
        <div className="flex h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Background decorative elements */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full opacity-30 transform translate-x-1/3 -translate-y-1/4"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-100 rounded-full opacity-20 transform -translate-x-1/3 translate-y-1/4"></div>
                <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-yellow-200 rounded-full opacity-20"></div>
                <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-green-100 rounded-full opacity-20"></div>
            </div>

            {/* Sidebar */}
            <aside
                id="logo-sidebar"
                className={`fixed top-0 left-0 z-40 w-72 h-full bg-white dark:bg-gray-800 transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } sm:translate-x-0`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto">
                    {/* Close button for mobile - only shows when sidebar is open and on mobile */}
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="absolute top-4 right-4 p-2 text-blue-500 hover:text-white hover:bg-blue-500 rounded-lg transition-colors duration-200 sm:hidden"
                        aria-label="Close sidebar"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    <a href="/" className="flex justify-center items-center mb-5">
                        <Image
                            src="/MainImage/logo.png"
                            className="h-16 sm:h-20"
                            alt="Pibi Logo"
                            width={150}
                            height={110}
                        />
                    </a>
                    <ul className="space-y-4 font-medium">
                        <li>
                            <a
                                href="/Learn"
                                className="flex items-center p-4 text-lg text-gray-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700"
                            >
                                <Image
                                    src="/DashboardImage/learn.png"
                                    className="w-6 h-6"
                                    alt="Learning Modules"
                                    width={24}
                                    height={24}
                                />
                                <span className="ms-3 uppercase">Learning Modules</span>
                            </a>
                        </li>
                        <li>
                        <a
                                href="/Quiz"
                                className="flex items-center p-4 text-lg text-gray-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700"
                            >
                                <Image
                                    src="/DashboardImage/quiz.png"
                                    className="w-6 h-6"
                                    alt="Leaderboard"
                                    width={24}
                                    height={24}
                                />
                                <span className="ms-3 uppercase">Quiz</span>
                            </a>
                        </li>

                        <li>
                        <a
                                href="#"
                                className="flex items-center p-4 text-lg text-gray-900 rounded-lg dark:text-white bg-blue-100 dark:bg-gray-700 border border-blue-300 dark:border-gray-600"
                            >
                                <Image
                                    src="/DashboardImage/achievements.png"
                                    className="w-6 h-6"
                                    alt="Achievements"
                                    width={24}
                                    height={24}
                                />
                                <span className="ms-3 uppercase">Achievements</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="/Quest"
                                className="flex items-center p-4 text-lg text-gray-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700"
                            >
                                <Image
                                    src="/DashboardImage/quest.png"
                                    className="w-6 h-6"
                                    alt="Quest"
                                    width={24}
                                    height={24}
                                />
                                <span className="ms-3 uppercase">Quest</span>
                            </a>
                        </li>

                        <hr className="border-t-2 border-gray-200 dark:border-gray-700 my-4" />
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-4 text-lg text-gray-900 rounded-lg dark:text-white hover:bg-red-100 dark:hover:bg-red-700"
                            >
                                <Image
                                    src="/DashboardImage/station.png"
                                    className="w-6 h-6"
                                    alt="Logout"
                                    width={24}
                                    height={24}
                                />
                                <span className="ms-3 uppercase"> Nearby Stations</span>
                            </a>
                        </li>
                    </ul>
                    {isDropdownVisible && (
                        <div
                            id="dropdown-cta"
                            className="p-4 mt-6 rounded-lg bg-blue-50 dark:bg-blue-900"
                            role="alert"
                        >
                            <div className="flex items-center mb-3">
                                <span className="bg-orange-100 text-orange-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded-sm dark:bg-orange-200 dark:text-orange-900">
                                    Tandaan!
                                </span>
                                <button
                                    type="button"
                                    className="ms-auto -mx-1.5 -my-1.5 bg-blue-50 inline-flex justify-center items-center w-6 h-6 text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800"
                                    data-dismiss-target="#dropdown-cta"
                                    aria-label="Close"
                                    onClick={() => setDropdownVisible(false)}
                                >
                                    <span className="sr-only">Close</span>
                                    <svg
                                        className="w-2.5 h-2.5"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <p className="mb-3 text-sm text-blue-800 dark:text-blue-400">
                                Huwag ipagwalang-bahala ang anumang kahina-hinalang gawain—ipagbigay-alam agad sa otoridad.
                            </p>
                            <a
                                className="text-sm text-blue-800 underline font-medium hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                href="#"
                            >
                                Makipag-ugnayan sa Pulisya
                            </a>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main Content - Added proper spacing */}
            <div className="flex-1 p-4 sm:ml-72 md:ml-80">
                <button
                    onClick={() => setSidebarOpen(!isSidebarOpen)}
                    className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none"
                >
                    <span className="sr-only">Open sidebar</span>
                    <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            clipRule="evenodd"
                            fillRule="evenodd"
                            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                        ></path>
                    </svg>
                </button>
                
                {/* Achievements Content */}
                <div className="flex flex-col lg:flex-row w-full gap-6 pt-2 mt-2">
                    {/* Left column - 60% - Badge Collection */}
                    <div className="w-full lg:w-[60%]">
                        <BadgeCollection achievements={achievements} />
                    </div>

                    {/* Right column - 40% - Achievements List */}
                    <div className="w-full lg:w-[40%]">
                        <AchievementsList 
                            filteredAchievements={filteredAchievements} 
                            categories={categories}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                        />
                    </div>
                </div>
            </div>
        </div>  
    );
};

export default Achievements;
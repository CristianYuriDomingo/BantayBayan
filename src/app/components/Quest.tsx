"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Quest: React.FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isDropdownVisible, setDropdownVisible] = useState(true);
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null; // Render nothing on the server
    }

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">

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
                                href="/Achievements"
                                className="flex items-center p-4 text-lg text-gray-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700"
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
                                href="#"
                                className="flex items-center p-4 text-lg text-gray-900 rounded-lg dark:text-white bg-blue-100 dark:bg-gray-700 border border-blue-300 dark:border-gray-600"
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

            {/* Main Content */}
            <div className="flex-1 p-4 sm:ml-72 sm:pl-8">
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

                {/* Main Content - 70% and 30% Columns */}
                <div className="flex flex-col lg:flex-row w-full gap-6 pt-2 mt-2">
                    {/* Left column - 70% */}
                    <div className="w-full lg:w-[70%]">
                        {/* Quest-specific content */}
                        <div className="space-y-5">
                            {/* Welcome Card */}
                            <div className="bg-blue-500 text-white rounded-lg shadow-sm p-6 flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold mb-2">Welcome to Quests</h2>
                                    <p className="text-sm text-blue-50">Complete daily challenges to earn rewards and track your progress.</p>
                                </div>
                                <div className="bg-white bg-opacity-20 p-3 rounded-full">
                                    <Image
                                        src="/MainImage/PibiQuest.png" // Replace with the actual path to your image
                                        alt="Quest Icon"
                                        width={50} // Adjust the width as needed
                                        height={50} // Adjust the height as needed
                                    />
                                </div>
                            </div>

                            {/* Daily Quests */}
                            <div className="bg-white rounded-lg shadow-sm p-5">
                                <div className="flex justify-between items-center mb-5">
                                    <h3 className="text-lg font-medium text-gray-800">Daily Quests</h3>
                                    <span className="text-xs text-gray-500 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        8 HOURS LEFT
                                    </span>
                                </div>

                                {/* Quest Item */}
                                <div className="flex items-center justify-between p-4 rounded-md border border-gray-100 hover:bg-gray-50 transition-colors mb-4">
                                    <div className="flex items-center">
                                        <Image src="/DashboardImage/bolt.png" alt="XP" width={20} height={20} />
                                        <span className="ml-3 text-gray-800">Earn 10 XP</span>
                                    </div>
                                    <Image src="/DashboardImage/chest.png" alt="Reward" width={20} height={20} />
                                </div>

                                {/* Progress Bar */}
                                <div className="mb-5">
                                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                                        <span>Progress</span>
                                        <span>0/10</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                                    </div>
                                </div>

                                {/* Locked Quest */}
                                <div className="flex items-center p-4 bg-gray-50 text-gray-500 rounded-md border border-gray-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <span className="text-sm">Complete current quest to unlock more</span>
                                </div>
                            </div>

                            {/* Weekly Challenge */}
                            <div className="bg-white rounded-lg shadow-sm p-5 border-l-4 border-indigo-500">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium text-gray-800">Weekly Challenge</h3>
                                    <span className="text-xs text-gray-500">5 DAYS LEFT</span>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md mb-3">
                                    <div className="flex items-center">
                                        <span className="text-lg mr-3">🎯</span>
                                        <span className="text-gray-800">Complete 5 Daily Quests</span>
                                    </div>
                                    <span className="text-blue-500 text-sm font-medium">0/5</span>
                                </div>

                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Right column - 30% */}
                    <div className="w-full lg:w-[30%]">
                        {/* Add your Quest-specific stats or additional content here */}
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-4">Quest Stats</h2>
                            <p>Add your quest-related stats or additional information here.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Quest;
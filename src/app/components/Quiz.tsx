"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import QuizTopicCard from "./QuizTopicCard";
import QuizHistory from "./QuizHistory";
import Image from "next/image";
import QuizCard from "./QuizCard";


const Quiz: React.FC = () => {
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


    const topics = [
        { title: "Cyber Security", link: "/Quiz/cyber-security/start", imageSrc: "/QuizImage/PoliceTape.png" },
        { title: "Drug Prevention", link: "/Quiz/drug-prevention/start", imageSrc: "/QuizImage/PoliceTape.png" },
        { title: "Anti Terrorist", link: "/Quiz/anti-terrorist/start", imageSrc: "/QuizImage/PoliceTape.png" },
        { title: "Vote", link: "/Quiz/vote/start", imageSrc: "/QuizImage/PoliceTape.png" },
        { title: "Case Filing", link: "/Quiz/case-filing/start", imageSrc: "/QuizImage/PoliceTape.png" },
    ];

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
                                href="#"
                                className="flex items-center p-4 text-lg text-gray-900 rounded-lg dark:text-white bg-blue-100 dark:bg-gray-700 border border-blue-300 dark:border-gray-600"
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

            <div className="flex-1 p-4 sm:ml-64">
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
                
                {/* Two-column layout matching Learn page */}
                <div className="flex flex-col lg:flex-row w-full gap-4">
                    {/* Left column - 70% */}
                    <div className="w-full lg:w-[70%]">
                        <div className="flex flex-col items-center gap-6">
                            {/* "Start Your Quiz" Image */}
                            <Image
                                src="/QuizImage/StartYourQuiz.png"
                                alt="Start Your Quiz"
                                width={300}
                                height={170}
                                className="w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] xl:max-w-[400px] h-auto"
                            />

                            {/* Quiz Topic Cards */}
                            <div className="w-full flex flex-col gap-4">
                                {topics.map((topic, index) => (
                                    <QuizTopicCard key={index} title={topic.title} link={topic.link} imageSrc={topic.imageSrc} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right column - 30% */}
                    <div className="w-full lg:w-[30%]">
                       
                        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 flex flex-col h-full">
                        <QuizCard/><br></br>
                            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 text-center mb-3">
                                Quiz History
                            </h2>
                            <div className="border-t border-gray-300 dark:border-gray-600 mt-2 pt-3 flex-grow">
                                <QuizHistory />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Quiz;
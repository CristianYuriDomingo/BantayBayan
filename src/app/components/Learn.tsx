"use client";

import { useState } from "react";
import LearnCard from "./LearnCard";

const Learn: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-72 h-full bg-white dark:bg-gray-800 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <a href="#" className="flex justify-center items-center mb-5">
            <img
              src="/PibiLogo.png"
              className="h-16 sm:h-20"
              alt="Pibi Logo"
            />
          </a>
          <ul className="space-y-4 font-medium">
            <li>
              <a
                href="#"
                className="flex items-center p-4 text-lg text-gray-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700"
              >
                <img
                  src="/DashboardImage/learningModules.png"
                  className="w-6 h-6"
                  alt="Learning Modules"
                />
                <span className="ms-3 uppercase">Learning Modules</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-4 text-lg text-gray-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700"
              >
                <img
                  src="/DashboardImage/profilePage.png"
                  className="w-6 h-6"
                  alt="Profile Page"
                />
                <span className="ms-3 uppercase">Profile Page</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-4 text-lg text-gray-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700"
              >
                <img
                  src="/DashboardImage/achievements.png"
                  className="w-6 h-6"
                  alt="Achievements"
                />
                <span className="ms-3 uppercase">Achievements</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-4 text-lg text-gray-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700"
              >
                <img
                  src="/DashboardImage/quest.png"
                  className="w-6 h-6"
                  alt="Quest"
                />
                <span className="ms-3 uppercase">Quest</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-4 text-lg text-gray-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700"
              >
                <img
                  src="/DashboardImage/leaderboard.png"
                  className="w-6 h-6"
                  alt="Leaderboard"
                />
                <span className="ms-3 uppercase">Quiz</span>
              </a>
            </li>
            <hr className="border-t-2 border-gray-200 dark:border-gray-700 my-4" />
            <li>
              <a
                href="#"
                className="flex items-center p-4 text-lg text-gray-900 rounded-lg dark:text-white hover:bg-red-100 dark:hover:bg-red-700"
              >
                <img
                  src="/DashboardImage/logout.png"
                  className="w-6 h-6"
                  alt="Logout"
                />
                <span className="ms-3 uppercase">Logout</span>
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
        
        <div className="flex flex-wrap justify-center gap-4 p-4">
          <LearnCard
            imageSrc="/LearnImage/Cyber.png"
            title="Cyber Security Campaign"
            lessons="4 Lessons"
            buttonText="Learn"
            modalContent={
              <div>
                <h3 className="text-xl font-semibold">Cyber Security</h3>
                <p className="text-gray-600 mb-4">Pumili ng Lesson</p>
                <ul className="space-y-3">
                  <li>
                    <button className="w-full text-left p-3 bg-[#2d87ff] text-white rounded-md hover:bg-[#1a5bbf] transition-colors duration-300">
                      Internet Safety Tips
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left p-3 bg-[#2d87ff] text-white rounded-md hover:bg-[#1a5bbf] transition-colors duration-300">
                      Online Scams & Phishing Awareness
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left p-3 bg-[#2d87ff] text-white rounded-md hover:bg-[#1a5bbf] transition-colors duration-300">
                      Financial Fraud & Investment Scams
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left p-3 bg-[#2d87ff] text-white rounded-md hover:bg-[#1a5bbf] transition-colors duration-300">
                      Identity Theft Prevention
                    </button>
                  </li>
                </ul>
              </div>
            }
          />
          <LearnCard
            imageSrc="/LearnImage/Traffic.png"
            title="Traffic Rules and Road Safety"
            lessons="5 Lessons"
            buttonText="Learn"
            modalContent={
              <div>
                <h3 className="text-xl font-semibold">Traffic Rules and Road Safety</h3>
                <p className="text-gray-600 mb-4">Pumili ng Lesson</p>
                <ul className="space-y-3">
                  <li>
                    <button className="w-full text-left p-3 bg-[#2d87ff] text-white rounded-md hover:bg-[#1a5bbf] transition-colors duration-300">
                      Basic Traffic Rules
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left p-3 bg-[#2d87ff] text-white rounded-md hover:bg-[#1a5bbf] transition-colors duration-300">
                      Road Safety Tips
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left p-3 bg-[#2d87ff] text-white rounded-md hover:bg-[#1a5bbf] transition-colors duration-300">
                      Pedestrian Safety
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left p-3 bg-[#2d87ff] text-white rounded-md hover:bg-[#1a5bbf] transition-colors duration-300">
                      Driving Under Influence
                    </button>
                  </li>
                </ul>
              </div>
            }
          />
        
           
           <LearnCard
            imageSrc="/LearnImage/CaseFiling.png"
            title="Traffic Rules and Road Safety"
            lessons="5 Lessons"
            buttonText="Learn"
            modalContent={
              <div>
                <h3 className="text-xl font-semibold">Traffic Rules and Road Safety</h3>
                <p className="text-gray-600 mb-4">Pumili ng Lesson</p>
                <ul className="space-y-3">
                  <li>
                    <button className="w-full text-left p-3 bg-[#2d87ff] text-white rounded-md hover:bg-[#1a5bbf] transition-colors duration-300">
                      Basic Traffic Rules
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left p-3 bg-[#2d87ff] text-white rounded-md hover:bg-[#1a5bbf] transition-colors duration-300">
                      Road Safety Tips
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left p-3 bg-[#2d87ff] text-white rounded-md hover:bg-[#1a5bbf] transition-colors duration-300">
                      Pedestrian Safety
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left p-3 bg-[#2d87ff] text-white rounded-md hover:bg-[#1a5bbf] transition-colors duration-300">
                      Driving Under Influence
                    </button>
                  </li>
                </ul>
              </div>
            }
          />
           <LearnCard
            imageSrc="/LearnImage/Drugs.png"
            title="Traffic Rules and Road Safety"
            lessons="5 Lessons"
            buttonText="Learn"
            modalContent={
              <div>
                <h3 className="text-xl font-semibold">Traffic Rules and Road Safety</h3>
                <p className="text-gray-600 mb-4">Pumili ng Lesson</p>
                <ul className="space-y-3">
                  <li>
                    <button className="w-full text-left p-3 bg-[#2d87ff] text-white rounded-md hover:bg-[#1a5bbf] transition-colors duration-300">
                      Basic Traffic Rules
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left p-3 bg-[#2d87ff] text-white rounded-md hover:bg-[#1a5bbf] transition-colors duration-300">
                      Road Safety Tips
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left p-3 bg-[#2d87ff] text-white rounded-md hover:bg-[#1a5bbf] transition-colors duration-300">
                      Pedestrian Safety
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left p-3 bg-[#2d87ff] text-white rounded-md hover:bg-[#1a5bbf] transition-colors duration-300">
                      Driving Under Influence
                    </button>
                  </li>
                </ul>
              </div>
            }
          />
          <LearnCard
            imageSrc="/LearnImage/Terrorist.png"
            title="Traffic Rules and Road Safety"
            lessons="5 Lessons"
            buttonText="Learn"
            modalContent={
              <div>
                <h3 className="text-xl font-semibold">Traffic Rules and Road Safety</h3>
                <p className="text-gray-600 mb-4">Pumili ng Lesson</p>
                <ul className="space-y-3">
                  <li>
                    <button className="w-full text-left p-3 bg-[#2d87ff] text-white rounded-md hover:bg-[#1a5bbf] transition-colors duration-300">
                      Basic Traffic Rules
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left p-3 bg-[#2d87ff] text-white rounded-md hover:bg-[#1a5bbf] transition-colors duration-300">
                      Road Safety Tips
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left p-3 bg-[#2d87ff] text-white rounded-md hover:bg-[#1a5bbf] transition-colors duration-300">
                      Pedestrian Safety
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left p-3 bg-[#2d87ff] text-white rounded-md hover:bg-[#1a5bbf] transition-colors duration-300">
                      Driving Under Influence
                    </button>
                  </li>
                </ul>
              </div>
            }
          />
           <LearnCard
            imageSrc="/LearnImage/Vote.png"
            title="Traffic Rules and Road Safety"
            lessons="5 Lessons"
            buttonText="Learn"
            modalContent={
              <div>
                <h3 className="text-xl font-semibold">Traffic Rules and Road Safety</h3>
                <p className="text-gray-600 mb-4">Pumili ng Lesson</p>
                <ul className="space-y-3">
                  <li>
                    <button className="w-full text-left p-3 bg-[#2d87ff] text-white rounded-md hover:bg-[#1a5bbf] transition-colors duration-300">
                      Basic Traffic Rules
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left p-3 bg-[#2d87ff] text-white rounded-md hover:bg-[#1a5bbf] transition-colors duration-300">
                      Road Safety Tips
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left p-3 bg-[#2d87ff] text-white rounded-md hover:bg-[#1a5bbf] transition-colors duration-300">
                      Pedestrian Safety
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left p-3 bg-[#2d87ff] text-white rounded-md hover:bg-[#1a5bbf] transition-colors duration-300">
                      Driving Under Influence
                    </button>
                  </li>
                </ul>
              </div>
            }
          />
          {/* Add more LearnCard components with different modalContent as needed */}
        </div>
      </div>
    </div>
  );
};

export default Learn;
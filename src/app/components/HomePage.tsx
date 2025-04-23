"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Footer from "./Footer";
import { getUsersFromIndexedDB } from "../../../lib/userDB";

const HomePage = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [isUserExist, setIsUserExist] = useState(false);
  const [activeButton, setActiveButton] = useState<null | 'getStarted' | 'learnMore'>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const users = await getUsersFromIndexedDB();
      // Check if there's at least one valid user with username and age
      if (users.length > 0 && users[0].username && users[0].age) {
        setIsUserExist(true);
      } else {
        setIsUserExist(false);
      }
    };

    fetchUserData();
  }, []);

  const handleGetStarted = () => {
    if (isUserExist) {
      router.push("/Learn"); // Redirect to Dashboard if user exists
    } else {
      router.push("/Form"); // Redirect to Form for new users
    }
  };

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <nav className="fixed w-full h-20 bg-white z-50 shadow-md">
        <div className="flex justify-between items-center h-full w-full px-4 md:px-8 lg:px-16 2xl:px-60">
          {/* Logo Section */}
          <Link href="/">
            <Image
              src="/MainImage/logo.png"
              alt="Logo"
              width={160}
              height={160}
              className="cursor-pointer w-32 md:w-40"
              priority
            />
          </Link>

          {/* Navigation Links (Hidden on Mobile, Shown on Desktop) */}
          <div className="hidden md:flex items-center gap-6">
            {["Learn", "FAQs", "About Us", "Contact"].map((item) => (
              <Link 
                href={`/${item.toLowerCase().replace(" ", "-")}`} 
                key={item}
                className="font-medium text-gray-600 hover:text-blue-500 transition-colors"
              >
                {item}
              </Link>
            ))}
            
            {/* Action Button */}
            <button 
              onClick={handleGetStarted}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              Get Started
            </button>
          </div>

          {/* Hamburger Icon (Right-Aligned) */}
          <div className="md:hidden">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleNav();
              }}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {navOpen ? (
                <svg
                  className="w-6 h-6"
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
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {navOpen && (
          <div className="absolute top-20 left-0 w-full bg-white shadow-md rounded-b-lg overflow-hidden">
            <ul className="flex flex-col items-center gap-4 py-4">
              {["Learn", "FAQs", "About Us", "Contact"].map((item) => (
                <li key={item} className="w-full text-center">
                  <Link 
                    href={`/${item.toLowerCase().replace(" ", "-")}`} 
                    onClick={toggleNav} 
                    className="block py-2 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
              <li className="w-full px-4 pt-2">
                <button 
                  onClick={handleGetStarted}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-all"
                >
                  Get Started
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Hero Section with Duolingo-like Design */}
      <section className="pt-24 pb-10 px-4 md:px-8 lg:px-16 2xl:px-60 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 min-h-[65vh]">
          {/* Left Column: Text Content */}
          <div className="flex-1 max-w-lg flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Learn safety <span className="text-blue-500">the fun way!</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-8">
              Join millions learning to protect themselves and others. Interactive lessons on crime prevention, cybersecurity, and safety awareness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleGetStarted}
                className="relative px-8 py-4 text-lg font-bold rounded-xl text-white bg-blue-500 hover:bg-blue-600 transition-all shadow-lg"
              >
                Get Started
              </button>
            </div>
          </div>
          {/* Right Column: Illustration */}
          <div className="flex-1 flex justify-center md:justify-end mt-8 md:mt-0">
            <div className="relative w-full max-w-xs sm:max-w-md">
              <Image 
                src="/MainImage/PibiMain.png" 
                alt="Bantay Bayan Mascot" 
                width={400} 
                height={400}
                className="drop-shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 px-4 md:px-8 lg:px-16 2xl:px-60 bg-gray-50">
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">How Bantay Bayan Works</h2>
          <p className="text-base text-gray-600 max-w-lg mx-auto">
            Learn safety in three simple steps.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.666 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-gray-800 mb-1">Learn</h3>
            <p className="text-xs text-gray-600">
              Short lessons.
            </p>
          </div>
          {/* Step 2 */}
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
              <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-gray-800 mb-1">Practice</h3>
            <p className="text-xs text-gray-600">
              Quizzes.
            </p>
          </div>
          {/* Step 3 */}
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
              <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-gray-800 mb-1">Earn Badges</h3>
            <p className="text-xs text-gray-600">
              Collect badges.
            </p>
          </div>
        </div>
      </section>

      {/* Value Proposition Sections */}
      <section className="py-24 px-8 md:px-16 lg:px-24 2xl:px-72 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-32 items-center text-center md:text-left">
          {/* Section 1 */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mb-8">
              Safe. Supportive. Life-Changing.
            </h2>
            <p className="text-lg text-gray-700 mb-12 text-justify">
              Bantay Bayan is dedicated to protecting and empowering citizens, ensuring they live in a safe and nurturing environment. Through education, support, and advocacy, we help build brighter futures—one community at a time.
            </p>
          </div>
          <div>
            <Image
              src="/HomePageImage/13.png"
              alt="Safe Community"
              width={400}
              height={300}
              className="mx-auto"
            />
          </div>

          {/* Section 2 */}
          <div>
            <Image
              src="/HomePageImage/14.png"
              alt="Expert Guidance"
              width={400}
              height={300}
              className="mx-auto"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mb-8">
              Guided by Expertise
            </h2>
            <p className="text-lg text-gray-700 mb-12 text-justify">
              Bantay Bayan's programs are built on research-backed approaches to community welfare, ensuring effective protection, education, and support. With expert-driven initiatives, we create safe spaces where citizens can thrive and build brighter futures.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mb-8">
              Stay Empowered
            </h2>
            <p className="text-lg text-gray-700 mb-12 text-justify">
              Bantay Bayan keeps communities engaged through proactive initiatives, interactive programs, and unwavering support. With education, advocacy, and collective action, we help build safer and stronger communities—one step at a time.
            </p>
          </div>
          <div>
            <Image
              src="/HomePageImage/15.png"
              alt="Empowered Community"
              width={400}
              height={300}
              className="mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
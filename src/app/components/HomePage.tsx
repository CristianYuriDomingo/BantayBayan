"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Footer from "./Footer";
import LetterCard from "./LetterCard";
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
              className="cursor-pointer"
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
              {["Learn", "Leaderboard", "Contact", "About Us"].map((item) => (
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
      <section className="pt-32 pb-16 px-4 md:px-8 lg:px-16 2xl:px-60 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Column: Text Content */}
          <div className="flex-1 max-w-lg">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Learn safety <span className="text-blue-500">the fun way!</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Join millions learning to protect themselves and others. Interactive lessons on crime prevention, cybersecurity, and safety awareness.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleGetStarted}
                onMouseDown={() => setActiveButton('getStarted')}
                onMouseUp={() => setActiveButton(null)}
                onMouseLeave={() => setActiveButton(null)}
                className={`relative px-8 py-4 text-lg font-bold rounded-xl text-white bg-blue-500 hover:bg-blue-600 transition-all shadow-lg ${
                  activeButton === 'getStarted' ? 'transform translate-y-1 shadow-md' : ''
                }`}
              >
                Get Started For Free
              </button>
              
              <Link href="/about-us">
                <button 
                  className="px-8 py-4 text-lg font-bold rounded-xl text-blue-500 border-2 border-blue-500 hover:bg-blue-50 transition-all"
                  onMouseDown={() => setActiveButton('learnMore')}
                  onMouseUp={() => setActiveButton(null)}
                  onMouseLeave={() => setActiveButton(null)}
                >
                  Learn More
                </button>
              </Link>
            </div>
          </div>
          
          {/* Right Column: Illustration */}
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="relative w-full max-w-md">
              <Image 
                src="/MainImage/PibiGreet.png" 
                alt="Bantay Bayan Mascot" 
                width={400} 
                height={400}
                className="drop-shadow-xl"
              />
              <div className="absolute -top-6 -right-6 bg-yellow-300 text-blue-800 font-bold px-4 py-2 rounded-full transform rotate-12 shadow-md">
                100% Free!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Modules Section - Duolingo Style */}
      <section className="py-20 px-4 md:px-8 lg:px-16 2xl:px-60 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Featured Learning Modules</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fun, interactive lessons that help you learn essential safety skills in just 5 minutes per day.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Module Card 1 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="h-40 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center p-6">
              <Image 
                src="/MainImage/crime-prevention.png" 
                alt="Crime Prevention" 
                width={120} 
                height={120}
                className="drop-shadow-md"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Crime Prevention</h3>
              <p className="text-gray-600 mb-4">Learn how to stay safe and prevent crime in your community.</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-500">5 Lessons</span>
                <Link href="/learn/crime-prevention">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors">
                    Start Learning
                  </button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Module Card 2 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="h-40 bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center p-6">
              <Image 
                src="/MainImage/cyber-safety.png" 
                alt="Digital & Cyber Safety" 
                width={120} 
                height={120}
                className="drop-shadow-md"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Digital & Cyber Safety</h3>
              <p className="text-gray-600 mb-4">Protect yourself online from scams, hackers, and cyberbullying.</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-500">5 Lessons</span>
                <Link href="/learn/cyber-safety">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors">
                    Start Learning
                  </button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Module Card 3 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="h-40 bg-gradient-to-r from-red-400 to-red-600 flex items-center justify-center p-6">
              <Image 
                src="/MainImage/emergency-contact.png" 
                alt="Palayan City Hotlines" 
                width={120} 
                height={120}
                className="drop-shadow-md"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Palayan City Hotlines</h3>
              <p className="text-gray-600 mb-4">Important emergency contacts and hotlines for quick assistance.</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-500">1 Lesson</span>
                <Link href="/learn/hotlines">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors">
                    Start Learning
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Link href="/learn">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition-all shadow-md hover:shadow-lg">
              See All Modules
            </button>
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 2xl:px-60 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How Bantay Bayan Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform makes learning about safety fun, engaging, and effective.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.666 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Learn</h3>
            <p className="text-gray-600">
              Complete short, interactive lessons about safety and protection in just 5 minutes a day.
            </p>
          </div>
          
          {/* Step 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Practice</h3>
            <p className="text-gray-600">
              Take quizzes and complete challenges to reinforce your knowledge and skills.
            </p>
          </div>
          
          {/* Step 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Earn Badges</h3>
            <p className="text-gray-600">
              Collect badges and certificates as you progress through different safety modules.
            </p>
          </div>
        </div>
      </section>

      {/* Value Proposition Sections */}
      <section className="py-16 px-4 md:px-8 lg:px-16 2xl:px-60 bg-white">
        {/* Section 1 */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-20">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mb-4">Safe. Supportive. Life-Changing.</h2>
            <p className="text-lg text-gray-700 mb-6">
              Bantay Bayan is dedicated to protecting and empowering citizens, ensuring they live in a safe and nurturing environment. Through education, support, and advocacy, we help build brighter futures—one community at a time.
            </p>
            <Link href="/about-us">
              <button className="text-blue-500 font-bold flex items-center gap-2 hover:underline">
                Learn More 
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </Link>
          </div>
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="bg-blue-100 rounded-xl p-6 max-w-md">
              <Image 
                src="/HomePageImage/safe-community.png" 
                alt="Safe Community" 
                width={400} 
                height={300}
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
        
        {/* Section 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 mb-20">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mb-4">Guided by Expertise</h2>
            <p className="text-lg text-gray-700 mb-6">
              Bantay Bayan's programs are built on research-backed approaches to community welfare, ensuring effective protection, education, and support. With expert-driven initiatives, we create safe spaces where citizens can thrive and build brighter futures.
            </p>
            <Link href="/services">
              <button className="text-blue-500 font-bold flex items-center gap-2 hover:underline">
                Our Services 
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </Link>
          </div>
          <div className="flex-1 flex justify-center md:justify-start">
            <div className="bg-blue-100 rounded-xl p-6 max-w-md">
              <Image 
                src="/HomePageImage/expert-guidance.png" 
                alt="Expert Guidance" 
                width={400} 
                height={300}
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
        
        {/* Section 3 */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mb-4">Stay Empowered</h2>
            <p className="text-lg text-gray-700 mb-6">
              Bantay Bayan keeps communities engaged through proactive initiatives, interactive programs, and unwavering support. With education, advocacy, and collective action, we help build safer and stronger communities—one step at a time.
            </p>
            <Link href="/contact">
              <button className="text-blue-500 font-bold flex items-center gap-2 hover:underline">
                Contact Us 
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </Link>
          </div>
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="bg-blue-100 rounded-xl p-6 max-w-md">
              <Image 
                src="/HomePageImage/empowered-community.png" 
                alt="Empowered Community" 
                width={400} 
                height={300}
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 px-4 md:px-8 lg:px-16 2xl:px-60 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Learn and Stay Safe?</h2>
          <p className="text-xl mb-8">
            Join thousands of citizens building safer communities through education and awareness.
          </p>
          <button 
            onClick={handleGetStarted}
            className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-full text-lg transition-all shadow-md hover:shadow-lg"
          >
            Start Learning Now
          </button>
          <p className="mt-4 text-blue-100">No registration required. 100% free.</p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
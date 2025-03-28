"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Slider from "./Slider";
import LetterCard from "./LetterCard";
import { getUsersFromIndexedDB } from "../../../lib/userDB"; // Corrected import


const HomePage = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isUserExist, setIsUserExist] = useState(false);
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
    <>
      {/* Wrapper div to close nav when clicking outside */}
      <div onClick={() => setNavOpen(false)}>
        <nav className="fixed w-full h-24 bg-white z-50 shadow-md">
          <div className="flex justify-between items-center h-full w-full px-4 2xl:px-80">
            {/* Logo Section */}
            <Link href="/">
              <Image
                src="/MainImage/logo.png"
                alt="Logo"
                width={205}
                height={205}
                className="cursor-pointer"
                priority
              />
            </Link>

            {/* Hamburger Icon (Right-Aligned) */}
            <div className="sm:hidden absolute right-4">
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevents closing immediately after clicking the button
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

            {/* Navigation Links (Hidden on Mobile, Shown on Desktop) */}
            <div className="hidden sm:flex gap-10">
              <ul className="flex gap-10">
                {["FAQs", "Services", "Contact", "About"].map((item) => (
                  <li key={item}>
                    <Link href="/Dashboard">
                      <button className="relative inline-block px-6 py-3 text-lg font-bold uppercase border-2 rounded-xl transition-all duration-150 ease-in-out text-[#2d87ff] border-[#2d87ff] bg-[#dbe9ff] hover:bg-[#b0d4ff] hover:border-[#1a6fd1] hover:text-[#1a6fd1] focus:outline-none focus:ring-2 focus:ring-[#1a6fd1] focus:ring-opacity-50">
                        {item}
                      </button>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mobile Menu */}
          {navOpen && (
            <div className="absolute top-24 left-0 w-full bg-white shadow-md">
              <ul className="flex flex-col items-center gap-4 py-4">
                {["Learn", "Leaderboard", "Contact", "About Us"].map((item) => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase()}`} onClick={toggleNav} className="uppercase text-xl">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>
      </div>

      {/* CTA Section */}
      <section
        className="relative flex flex-col items-center justify-center px-6 pt-10 lg:px-16 bg-cover bg-center bg-no-repeat min-h-screen"
        style={{ backgroundImage: "url('/HomePageImage/bg.png')" }}
      >
        <div className="flex flex-col justify-center items-center flex-grow mt-24">
          <div className="relative flex flex-col items-center lg:items-start lg:absolute lg:top-36 lg:right-0">
            <div className="mb-4 lg:mb-0 lg:mr-4">
              <LetterCard />
            </div>
          </div>
          <button
            className={`relative inline-block px-6 py-3 text-lg font-bold uppercase border-2 rounded-xl transition-all duration-150 ease-in-out
            text-[#2d87ff] border-[#2d87ff] bg-[#dbe9ff]
            ${isActive ? 'translate-y-[0.3em]' : 'hover:translate-y-[0.15em]'}`}
            onMouseDown={() => setIsActive(true)}
            onMouseUp={() => setIsActive(false)}
            onMouseLeave={() => setIsActive(false)}
            onClick={handleGetStarted} // Handle redirection logic
          >
            <span
              className={`absolute inset-0 bg-[#5caeff] rounded-xl transition-all duration-150 ease-in-out
              ${isActive ? 'translate-y-0 shadow-[0_0_0_2px_#4a98e5,0_0.1em_0_0_#4a98e5]' : 'translate-y-[0.3em] shadow-[0_0_0_2px_#4a98e5,0_0.4em_0_0_#2d87ff]'}`}
            />
            <span className="relative z-10">Get Started</span>
          </button>
        </div>
      </section>

      {/* New Section */}
      <section className="flex flex-col items-center justify-center px-6 py-10 lg:px-16 bg-white min-h-screen">
        <div className="w-full flex justify-center mb-10">
          <Slider />
        </div>
        <h2 className="text-3xl font-bold mb-6">Dear Sir/Ma&apos;am</h2>
        <p className="text-lg mb-4">This is a new section added below the CTA section.</p>
      </section>
    </>
  );
};

export default HomePage;

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Slider from "./Slider";

const HomePage = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

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
                src="/PibiLogo.png"
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
                <li>
                  <Link href="/about" className="uppercase hover:border-b text-l">
                    Learn
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="uppercase hover:border-b text-l">
                    Leaderboard
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="uppercase hover:border-b text-l">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="uppercase hover:border-b text-l">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Mobile Menu */}
          {navOpen && (
            <div className="absolute top-24 left-0 w-full bg-white shadow-md">
              <ul className="flex flex-col items-center gap-4 py-4">
                <li>
                  <Link href="/about" onClick={toggleNav} className="uppercase text-xl">
                    Learn
                  </Link>
                </li>
                <li>
                  <Link href="/contact" onClick={toggleNav} className="uppercase text-xl">
                    Leaderboard
                  </Link>
                </li>
                <li>
                  <Link href="/blog" onClick={toggleNav} className="uppercase text-xl">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/services" onClick={toggleNav} className="uppercase text-xl">
                    About Us
                  </Link>
                </li>
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
        <img src="/HomePageImage/cloud1.png" alt="Cloud" className="absolute top-20 left-[-20%] w-52 h-auto animate-moveCloud" />
        <img src="/HomePageImage/cloud1.png" alt="Cloud" className="absolute top-20 left-[-20%] w-52 h-auto animate-moveCloud" />
        
        <div className="w-full flex justify-center mt-16 mb-10">
          <Slider />
        </div>

        <div className="flex flex-col justify-center items-center flex-grow mt-24">
          <Link href="/Dashboard">
            <button
              className={`relative inline-block px-6 py-3 text-lg font-bold uppercase border-2 rounded-xl transition-all duration-150 ease-in-out
              text-[#2d87ff] border-[#2d87ff] bg-[#dbe9ff]
              ${isActive ? 'translate-y-[0.3em]' : 'hover:translate-y-[0.15em]'}`}
              onMouseDown={() => setIsActive(true)}
              onMouseUp={() => setIsActive(false)}
              onMouseLeave={() => setIsActive(false)}
            >
              <span
                className={`absolute inset-0 bg-[#5caeff] rounded-xl transition-all duration-150 ease-in-out
                ${isActive ? 'translate-y-0 shadow-[0_0_0_2px_#4a98e5,0_0.1em_0_0_#4a98e5]' : 'translate-y-[0.3em] shadow-[0_0_0_2px_#4a98e5,0_0.4em_0_0_#2d87ff]'}`}
              />
              <span className="relative z-10">Get Started</span>
            </button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default HomePage;
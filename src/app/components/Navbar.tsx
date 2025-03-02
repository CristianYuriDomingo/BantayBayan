"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
    const [navOpen, setNavOpen] = useState(false);

    const toggleNav = () => {
        setNavOpen(!navOpen);
    };

    return (
        <>
        {/* Wrapper div to close nav when clicking outside */}
        <div onClick={() => setNavOpen(false)}>
            <nav className="fixed w-full h-24 bg-white z-50">
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
        <section className="relative px-6 pt-10 lg:px-16">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-16 py-32 sm:py-48 lg:py-56">
        {/* Image Section */}
        <div className="flex justify-center md:order-last">
            <img 
                src="1.png" 
                alt="CTA Image" 
                className="w-full max-w-lg rounded-lg shadow-lg" 
            />
        </div>
        
        {/* Text Content */}
        <div className="text-center md:text-left"> {/* Center on small screens */}
            <h1 className="text-5xl font-semibold tracking-tight text-[#2d87ff] sm:text-6xl uppercase">
            Maging handa, matuto, at umangat 
            </h1>
            
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-x-6">
                <a
                    href="#"
                    className="rounded-md bg-[#2d87ff] px-7 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-[#7ab1f9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Get started
                </a>
                <a href="#" className="text-sm font-semibold text-gray-900">
                    Learn more <span aria-hidden="true">→</span>
                </a>
            </div>
        </div>
    </div>
</section>

        </>
    );
};

export default Navbar;

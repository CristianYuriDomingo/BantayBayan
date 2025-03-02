"use client"
import React from 'react';


const Cta = () => {
  return (
    <section className="relative isolate px-6 pt-14 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-16 py-32 sm:py-48 lg:py-56 flex flex-col-reverse md:flex-row">
        {/* Image Section */}
        <div className="flex justify-center md:order-last">
          <img 
            src="1.png" 
            alt="CTA Image" 
            className="w-full max-w-lg rounded-lg shadow-lg" 
          />
        </div>
        
        {/* Text Content */}
        <div>
          <h1 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
            Data to enrich your online business
          </h1>
          
          <div className="mt-10 flex items-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-[#2d87ff] px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-[#7ab1f9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
  );
};

export default Cta;
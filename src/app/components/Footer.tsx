import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-white mt-20">
      {/* Main Footer Content */}
      <div className="container mx-auto py-12 px-4 md:px-6">
        {/* Top Section with Logo and Description */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-10 pb-8 border-b border-gray-700">
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0 max-w-sm">
            <h2 className="text-2xl font-bold text-blue-400 mb-3">Bantay Bayan</h2>
            <p className="text-gray-300 text-sm text-center md:text-left">
              Dedicated to community safety, transparency, and public service. 
              Together, we keep our neighborhoods secure.
            </p>
          </div>
          <div className="flex gap-4">
            {/* Social Icons */}
            <a href="#" className="bg-gray-700 hover:bg-blue-500 p-2 rounded-full transition-all duration-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12.07c0-5.52-4.48-10-10-10s-10 4.48-10 10c0 4.96 3.66 9.12 8.44 9.88v-6.96h-2.54v-2.92h2.54V9.85c0-2.5 1.5-3.9 3.77-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.92h-2.33v6.96C18.34 21.2 22 17.04 22 12.07z" />
              </svg>
            </a>
            <a href="#" className="bg-gray-700 hover:bg-pink-500 p-2 rounded-full transition-all duration-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.247-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.247 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.684-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.055-.059 1.37-.059 4.04 0 2.67.01 2.986.059 4.04.045.976.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.054.047 1.37.059 4.04.059 2.67 0 2.987-.01 4.04-.059.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.684.748-1.15.137-.353.3-.882.344-1.857.047-1.055.059-1.37.059-4.04 0-2.67-.01-2.986-.059-4.04-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.055-.047-1.37-.059-4.04-.059zm0 3.063a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 8.468a3.333 3.333 0 100-6.666 3.333 3.333 0 000 6.666zm6.538-8.469a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" />
              </svg>
            </a>
            <a href="#" className="bg-gray-700 hover:bg-red-500 p-2 rounded-full transition-all duration-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a href="#" className="bg-gray-700 hover:bg-black p-2 rounded-full transition-all duration-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.298.001.596.033.89.1V9.4a6.33 6.33 0 00-1-.1A6.34 6.34 0 006 20.58a6.34 6.34 0 10.21-12.68 6.33 6.33 0 00-1 .1v3.82a2.92 2.92 0 01.89-.1 2.9 2.9 0 012.31 4.64 2.89 2.89 0 01-5.21-1.74V2H9.4v.47a4.82 4.82 0 01-3.77 4.25 13.34 13.34 0 001.08 2.49 7.5 7.5 0 013.85-3.74v3.45a11.75 11.75 0 00-1.38 5.2h1.73a10 10 0 01.92-4.12 10 10 0 01.92 4.12h1.78a11.75 11.75 0 00-1.38-5.2v-3.45a7.5 7.5 0 013.85 3.74 13.33 13.33 0 001.08-2.49z" />
              </svg>
            </a>
          </div>
        </div>
        
        {/* Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col">
            <h3 className="font-bold text-lg mb-4 text-gray-100">About</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Website</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Developer</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Documentation</Link></li>
            </ul>
          </div>
          
          <div className="flex flex-col">
            <h3 className="font-bold text-lg mb-4 text-gray-100">Stations</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Manacnac</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Caimito</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Bagong Buhay</Link></li>
            </ul>
          </div>
          
          <div className="flex flex-col">
            <h3 className="font-bold text-lg mb-4 text-gray-100">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/learn" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Learn</Link></li>
              <li><Link href="/faqs" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">FAQs</Link></li>
              <li><Link href="/about-us" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Contact</Link></li>
            </ul>
          </div>
          
          <div className="flex flex-col">
            <h3 className="font-bold text-lg mb-4 text-gray-100">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400">
                <svg className="w-4 h-4 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href="mailto:info@bantaybayan.org" className="hover:text-blue-400 transition-colors duration-300">info@bantaybayan.org</a>
              </li>
              <li className="flex items-center text-gray-400">
                <svg className="w-4 h-4 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <a href="tel:+639123456789" className="hover:text-blue-400 transition-colors duration-300">+63 912 345 6789</a>
              </li>
              <li className="flex items-center text-gray-400">
                <svg className="w-4 h-4 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Barangay Hall, Philippines</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom Copyright Section */}
      <div className="bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto py-6 px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {currentYear} Bantay Bayan. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <Link href="/privacy-policy" className="text-xs text-gray-400 hover:text-blue-400 transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-xs text-gray-400 hover:text-blue-400 transition-colors duration-300">
              Terms of Service
            </Link>
            <Link href="/cookie-policy" className="text-xs text-gray-400 hover:text-blue-400 transition-colors duration-300">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
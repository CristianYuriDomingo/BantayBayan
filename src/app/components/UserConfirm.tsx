"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "flowbite-react";
import Image from "next/image";

interface UserConfirmProps {
  open: boolean;
  onClose: () => void;
}

const UserConfirm: React.FC<UserConfirmProps> = ({ open, onClose }) => {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);

  const handleContinue = () => {
    onClose();
    router.push("/Learn");
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm transition-opacity duration-300 ${
        open ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200 text-center w-full max-w-sm">
        {/* Success Image with Bounce Animation */}
        <div className="relative inline-block">
          <Image 
            src="/MainImage/check.png" // Replace with your actual image path
            alt="Success Icon"
            width={70} 
            height={70} 
            className="mx-auto mb-4 animate-bounce"
          />
          <div className="absolute inset-0 rounded-full bg-blue-500 opacity-10 blur-lg"></div>
        </div>

        {/* Title */}
        <h3 className="mb-3 text-xl font-bold text-gray-800">
          🎉 User Created!
        </h3>

        {/* Description */}
        <p className="mb-4 text-gray-600 text-sm">
          Your profile has been successfully created.
        </p>

        {/* Custom Styled Button */}
        <div className="flex justify-center">
          <button
            className={`relative inline-block px-5 py-2 text-sm font-bold uppercase border-2 rounded-lg transition-all duration-150 ease-in-out
            text-[#2d87ff] border-[#2d87ff] bg-[#dbe9ff]
            ${isActive ? "translate-y-[0.2em]" : "hover:translate-y-[0.1em]"}
            `}
            onMouseDown={() => setIsActive(true)}
            onMouseUp={() => setIsActive(false)}
            onMouseLeave={() => setIsActive(false)}
            onClick={handleContinue}
          >
            <span
              className={`absolute inset-0 bg-[#5caeff] rounded-lg transition-all duration-150 ease-in-out
              ${isActive ? "translate-y-0 shadow-[0_0_0_2px_#4a98e5,0_0.1em_0_0_#4a98e5]" : "translate-y-[0.2em] shadow-[0_0_0_2px_#4a98e5,0_0.3em_0_0_#2d87ff]"}`}
            />
            <span className="relative z-10">Continue</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserConfirm;

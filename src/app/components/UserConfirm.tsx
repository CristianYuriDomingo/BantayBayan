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
            className={`relative inline-block px-6 py-3 font-bold text-white rounded-lg transition-all duration-200 ease-in-out w-full
            bg-blue-500 hover:bg-blue-600
            ${isActive ? "translate-y-1" : ""}
            `}
            onMouseDown={() => setIsActive(true)}
            onMouseUp={() => setIsActive(false)}
            onMouseLeave={() => setIsActive(false)}
            onClick={handleContinue}
          >
            <span className="relative inline-flex items-center justify-center">
              Continue
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserConfirm;

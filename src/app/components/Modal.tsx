import React from "react";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        {/* Image */}
        <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
          <Image
            src="/1.png"
            alt="Modal Image"
            width={128}
            height={128}
            className="rounded-full"
          />
        </div>

        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-[#2d87ff] hover:text-gray-900">
          ✖
        </button>

        {/* Modal Header */}
        <div className="flex justify-center items-center mb-4 mt-14">
          <h3 className="text-xl font-semibold">Cyber Security</h3>
        </div>

        {/* Modal Body */}
        <div>
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
      </div>
    </div>
  );
};

export default Modal;

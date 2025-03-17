import React from "react";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        {/* Image - Stays at the top */}
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

        {/* Push content down to accommodate the image */}
        <div className="mt-14">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

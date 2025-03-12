import React, { useState } from "react";
import Image from "next/image";
import Modal from "./Modal"; // Import the modal component

interface LearnCardProps {
  imageSrc: string;
  title: string;
  lessons: string;
  buttonText: string;
  modalContent: React.ReactNode; // Add modalContent prop
}

const LearnCard: React.FC<LearnCardProps> = ({ imageSrc, title, lessons, buttonText, modalContent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="relative w-40 h-56 sm:w-52 sm:h-68 md:w-60 md:h-80 rounded-lg overflow-hidden text-black transform-gpu shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl bg-white">
        <div className="relative w-full h-full">
          <Image
            src={imageSrc}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-110 hover:-rotate-3"
          />
        </div>

        <span className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#e0f7ff] via-transparent to-transparent backdrop-blur-md h-[30%] grid grid-rows-2 gap-1 p-3 items-center">
          <span className="text-base sm:text-lg font-bold text-[#2d87ff] drop-shadow-md leading-tight truncate">{title}</span>
          <span className="text-xs sm:text-sm text-[#2d87ff] drop-shadow-md">{lessons}</span>
        </span>

        <span className="absolute bottom-[35%] right-2 w-20 h-10 bg-[#2d87ff] flex items-center justify-center rounded-full transition-transform duration-300 hover:translate-y-[-30%] hover:bg-[#1a5bbf]">
          <button onClick={() => setIsModalOpen(true)} className="text-xs sm:text-sm font-semibold text-white">
            {buttonText}
          </button>
        </span>
      </div>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {modalContent}
      </Modal>
    </>
  );
};

export default LearnCard;

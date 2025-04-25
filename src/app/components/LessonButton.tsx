import React, { useEffect, useState } from "react";
import { isModuleCompleted } from "../../../lib/moduleDB"; // Adjust path as needed

interface LessonButtonProps {
  moduleId: string;
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}

const LessonButton: React.FC<LessonButtonProps> = ({ 
  moduleId, 
  onClick, 
  className = "w-full text-left p-3 bg-[#2d87ff] text-white rounded-md hover:bg-[#1a5bbf] transition-colors duration-300", 
  children 
}) => {
  const [completed, setCompleted] = useState<boolean>(false);

  useEffect(() => {
    const checkCompletion = async () => {
      try {
        const isCompleted = await isModuleCompleted(moduleId);
        setCompleted(!!isCompleted);
      } catch (error) {
        console.error("Error checking module completion:", error);
      }
    };

    checkCompletion();
  }, [moduleId]);

  return (
    <button
      className={`${className} flex justify-between items-center`}
      onClick={onClick}
    >
      <span>{children}</span>
      {completed && <span className="ml-2 text-white">✓</span>}
    </button>
  );
};

export default LessonButton;
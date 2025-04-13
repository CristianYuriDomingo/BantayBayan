"use client";

import { useEffect, useState } from "react";
import Image from "next/image"; // Import the Image component
import QuizInstructions from "../../../components/QuizInstructions";
import UserGreetings from "@/app/components/UserGreetings";

const QuizStartPage = ({ params }: { params: { topic: string } }) => {
  const [topic, setTopic] = useState<string | null>(null);

  useEffect(() => {
    // Simulate resolving the params promise
    const resolveParams = async () => {
      const resolvedParams = await params; // Assuming params is a promise
      setTopic(resolvedParams.topic);
    };

    resolveParams();
  }, [params]);

  if (!topic) {
    return <div>Loading...</div>; // Show a loading state while the topic is being resolved
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Background decorative elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full opacity-30 transform translate-x-1/3 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-100 rounded-full opacity-20 transform -translate-x-1/3 translate-y-1/4"></div>
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-yellow-200 rounded-full opacity-20"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-green-100 rounded-full opacity-20"></div>
      </div>

      {/* UserGreetings component positioned at the top-left */}
      <div className="absolute top-4 left-4 z-20">
        <UserGreetings />
      </div>

      {/* Content with z-index to appear above background */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        {/* Enhanced separator with icon */}
        <div className="relative w-full flex items-center justify-center">
          <div className="absolute h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent w-full"></div>
          <div className="relative bg-white p-2 rounded-full shadow-sm z-10">
            <Image
              src="/MainImage/Pibi.png"
              alt="Icon"
              width={20}
              height={20}
              className="h-8 w-auto"
            />
          </div>
        </div>

        {/* QuizInstructions component */}
        <QuizInstructions topic={topic} />
      </div>
    </div>
  );
};

export default QuizStartPage;
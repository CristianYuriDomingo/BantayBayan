import { useState, useEffect, useRef } from "react";
import Image from "next/image";

type SpeechBubbleProps = {
  imageSrc: string;
  messages: string[];
  typingSpeed?: number;
  delayBetween?: number;
};

export default function SpeechBubble({ imageSrc, messages, typingSpeed = 50, delayBetween = 1500 }: SpeechBubbleProps) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageIndex < messages.length) {
      let charIndex = 0;
      const typingInterval = setInterval(() => {
        setCurrentMessage(messages[messageIndex].slice(0, charIndex + 1));
        charIndex++;
        if (charIndex === messages[messageIndex].length) {
          clearInterval(typingInterval);
          setTimeout(() => setMessageIndex(messageIndex + 1), delayBetween);
        }
      }, typingSpeed);
      return () => clearInterval(typingInterval);
    }
  }, [messageIndex, messages, typingSpeed, delayBetween]);

  return (
    <div className="flex items-center space-x-4 p-4">
      {/* Character Image - Now wrapped in a fixed div with ref */}
      <div ref={imageRef} className="flex-shrink-0">
        <Image src={imageSrc} alt="Character" width={80} height={80} />
      </div>

      {/* Speech Bubble - Slightly more radius but still boxy like Duolingo */}
      <div className="relative bg-white text-gray-800 px-6 py-4 rounded-lg shadow-md border border-gray-200 max-w-xl">
        <p className="text-lg font-medium">{currentMessage}</p>
        {/* Speech Bubble Tail - Adjusted for the style */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 w-4 h-4 bg-white border-l border-b border-gray-200 rotate-45"></div>
      </div>
    </div>
  );
}

// Usage Example:
// <SpeechBubble 
//   imageSrc="/path-to-image.png" 
//   messages={["How much German do you know?", "Let's get started!"]} 
// />
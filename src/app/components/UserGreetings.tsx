"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { getUsersFromIndexedDB } from "../../../lib/userDB";
import { HiX } from "react-icons/hi";

export default function UserGreetingBubble() {
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const [isTypingDone, setIsTypingDone] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const typingSpeed = 50;
  const delayBetween = 1500;

  useEffect(() => {
    async function fetchUsername() {
      const users = await getUsersFromIndexedDB();
      if (users.length > 0) {
        setUsername(users[0].username);
      }
    }
    fetchUsername();
  }, []);

  useEffect(() => {
    const nameToUse = username || "there";
    const welcomeMessage = ` Hey ${nameToUse}! Welcome to Quiz Games! Are you ready to start learning and playing?`;
    setMessages([welcomeMessage]);
  }, [username]);

  useEffect(() => {
    if (messageIndex < messages.length) {
      let charIndex = 0;
      setIsTypingDone(false); // Reset typing status
      const typingInterval = setInterval(() => {
        setCurrentMessage(messages[messageIndex].slice(0, charIndex + 1));
        charIndex++;
        if (charIndex === messages[messageIndex].length) {
          clearInterval(typingInterval);
          setTimeout(() => {
            setMessageIndex(messageIndex + 1);
            setIsTypingDone(true); // Typing is done
          }, delayBetween);
        }
      }, typingSpeed);
      return () => clearInterval(typingInterval);
    }
  }, [messageIndex, messages]);

  if (!isVisible || !messages.length) return null;

  return (
    <div className="flex items-start space-x-4 p-5 max-w-lg">
      {/* Character Image */}
      <div ref={imageRef} className="flex-shrink-0">
        <Image src="/MainImage/PibiGreet.png" alt="Character" width={80} height={80} />
      </div>

      {/* Speech Bubble */}
      <div className="relative bg-white text-gray-800 px-6 py-4 rounded-lg shadow-md border border-gray-200 max-w-md">
        {/* Close Button - Only when typing is done */}
        {isTypingDone && (
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            <HiX className="w-5 h-5" />
          </button>
        )}

        <p className="text-base font-medium">{currentMessage}</p>

        {/* Speech Bubble Tail */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-3 w-4 h-4 bg-white border-l border-b border-gray-200 rotate-45"></div>
      </div>
    </div>
  );
}
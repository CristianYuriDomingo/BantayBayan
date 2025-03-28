"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Banner } from "flowbite-react";
import { HiX } from "react-icons/hi";
import { getUsersFromIndexedDB } from "../../../lib/userDB";
import { motion } from "framer-motion";

export default function UserGreetings() {
    const [username, setUsername] = useState("");
    const [isOpen, setIsOpen] = useState(true);
    const [text, setText] = useState("");

    const fullText = `👋 Hey ${username ? username : "there"}! Welcome to Bantay Bayan! Are you ready to start learning and playing?`;

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
        let i = 0;
        const interval = setInterval(() => {
            setText(fullText.slice(0, i));
            i++;
            if (i > fullText.length) clearInterval(interval);
        }, 50);
        return () => clearInterval(interval);
    }, [username]);

    if (!isOpen) return null;

    return (
        <Banner>
            <div className="flex flex-wrap items-center justify-between w-full max-w-3xl mx-auto px-4 rounded-lg border border-gray-100 bg-white p-3 shadow-md dark:border-gray-600 dark:bg-gray-700 relative">
                {/* Left side (Image + Animated Text) */}
                <div className="flex items-center gap-3 w-full">
                    <Image 
                        src="/MainImage/ColoredPibi.png" 
                        alt="Banner Image" 
                        width={40} 
                        height={40} 
                        className="object-contain"
                    />
                    <motion.span 
                        className="text-base font-semibold dark:text-white whitespace-normal break-words w-full"
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ duration: 1 }}
                    >
                        {text}
                    </motion.span>
                </div>

                {/* Close button */}
                <div className="absolute top-2 right-2">
                    <Banner.CollapseButton 
                        color="gray" 
                        className="border-0 bg-transparent text-gray-500 dark:text-gray-400" 
                        onClick={() => setIsOpen(false)}
                    >
                        <HiX className="h-4 w-4" />
                    </Banner.CollapseButton>
                </div>
            </div>
        </Banner>
    );
}
    
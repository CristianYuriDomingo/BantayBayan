"use client";

import { useRouter } from "next/navigation";

interface QuizTopicCardProps {
  title: string;
  link: string;
  imageSrc: string;
}

export default function QuizTopicCard({ title, link, imageSrc }: QuizTopicCardProps) {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center w-full px-2 md:px-4">
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-2xl shadow-xl border-4 border-[#d4d4d4] bg-[#eaebe8]
                  transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
        onClick={() => router.push(link)}
      >
        {/* Image with Border */}
        <img
          src={imageSrc}
          alt={`${title} Background`}
          className="w-full h-auto object-cover rounded-2xl border-4 border-[#d4d4d4]"
        />

        {/* Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <h2
            className="text-white font-extrabold uppercase text-center drop-shadow-md"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              lineHeight: "1.1",
              textShadow: "3px 3px 10px rgba(0, 0, 0, 0.8)",
              maxWidth: "90%",
              wordBreak: "break-word"
            }}
          >
            {title}
          </h2>
        </div>
      </div>
    </div>
  );
}
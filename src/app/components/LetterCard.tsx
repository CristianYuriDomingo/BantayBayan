'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function LetterCard() {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div
      className={`relative w-full max-w-[300px] bg-[#6ca9ed] rounded-xl shadow-lg p-2 transition-all duration-400 ease-in-out ${isClicked ? 'h-auto' : 'h-[220px]'}`}
      onClick={() => setIsClicked(!isClicked)}
    >
      <div
        className={`relative mx-auto shadow-md overflow-hidden rounded-xl transition-transform duration-300 ease-in-out ${isClicked ? 'w-[260px] h-[260px] -mt-14' : 'w-[99%] h-[99%] -mt-9'}`}
      >
        <Image
          src="/HomePageImage/envelop.png"
          alt="Card Image"
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
        />
      </div>
      <div
        className={`relative text-center text-gray-900 p-4 transition-all duration-300 ease-in-out overflow-hidden ${isClicked ? 'opacity-100 translate-y-4 mt-0' : 'opacity-0 translate-y-0 mt-0'}`}
      >
        <h3 className="text-lg font-semibold">Dear User</h3>
        <p className="text-sm text-gray-600 break-words">
        Thank you for being part of PNP Bantay Bayan. Your vigilance helps keep our communities safe. Stay alert, stay informed, and together, we build a safer nation.
        </p>
      </div>
    </div>
  );
}
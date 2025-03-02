import React from 'react'
import { Card } from "flowbite-react";
import Image from "next/image";

export function Learn() {
  return (
    <Card
      className="max-w-sm"
      renderImage={() => <Image width={500} height={500} src="/PibiLogo.png" alt="image 1" />}
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        
      </h5>
      <button
        type="button"
        className="inline-flex w-full justify-center rounded-lg bg-[#2d87ff] px-3 py-.5 text-center text-sm font-medium text-white hover:bg-[#7ab1f9]"
      >
        Learn Now
      </button>
    </Card>
  );
}
export default Learn
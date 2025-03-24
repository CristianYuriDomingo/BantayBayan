"use client";

import React, { useState } from "react";
import Image from "next/image";
import { openDB } from "idb";
import { TextInput } from "flowbite-react";

const DB_NAME = "UserDB";
const STORE_NAME = "users";

// Initialize IndexedDB
const initDB = async () => {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
      }
    },
  });
  return db;
};

// Store user in IndexedDB
const addUserToIndexedDB = async (user: { username: string; age: number }) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  await store.add(user);
  await tx.done;
  console.log("User added to IndexedDB:", user);
};

// React Component
interface UsernameAgeFormProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UsernameAgeForm: React.FC<UsernameAgeFormProps> = ({ setIsModalOpen }) => {
  const [username, setUsername] = useState<string>("");
  const [age, setAge] = useState<number | "">("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAge(value === "" ? "" : Number(value));
  };

  const handleSubmit = async () => {
    if (!username.trim()) {
      alert("Username cannot be empty.");
      return;
    }

    if (age === "" || isNaN(age) || age <= 0) {
      alert("Age must be a valid positive number.");
      return;
    }

    setIsSubmitting(true);

    const userData = { username, age };

    try {
      await addUserToIndexedDB(userData);
      setIsModalOpen(true);
    } catch (error) {
      alert("Error saving user data!");
    } finally {
      setUsername("");
      setAge("");
      setIsSubmitting(false);
    }
  };

  const isFormValid = username.trim() !== "" && age !== "" && !isNaN(age) && age > 0;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col items-center space-y-6 p-8 bg-white shadow-lg rounded-xl w-full max-w-md h-[450px]"> 
        {/* Added fixed height of 450px to prevent stretching */}

        {/* Logo Image (Next.js Image) */}
        <div className="relative w-20 h-20"> 
          <Image
            src="/MainImage/Pibi.png"
            alt="App Logo"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800">Enter Your Details</h2>

        {/* Username Input */}
        <TextInput
          id="username"
          type="text"
          sizing="lg"
          placeholder="Enter your username"
          className="w-full rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        {/* Age Input */}
        <TextInput
          id="age"
          type="number"
          sizing="lg"
          placeholder="Enter your age"
          className="w-full rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={age}
          onChange={handleAgeChange}
          required
        />

        {/* Submit Button */}
        <button
          className={`relative inline-block px-5 py-2 text-sm font-bold uppercase border-2 rounded-lg transition-all duration-150 ease-in-out
          text-[#2d87ff] border-[#2d87ff] bg-[#dbe9ff]
          ${isActive ? "translate-y-[0.2em]" : "hover:translate-y-[0.1em]"}
          ${!isFormValid || isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
          onMouseDown={() => setIsActive(true)}
          onMouseUp={() => setIsActive(false)}
          onMouseLeave={() => setIsActive(false)}
          onClick={handleSubmit}
          disabled={!isFormValid || isSubmitting}
        >
          <span
            className={`absolute inset-0 bg-[#5caeff] rounded-lg transition-all duration-150 ease-in-out
            ${isActive ? "translate-y-0 shadow-[0_0_0_2px_#4a98e5,0_0.1em_0_0_#4a98e5]" : "translate-y-[0.2em] shadow-[0_0_0_2px_#4a98e5,0_0.3em_0_0_#2d87ff]"}`}
          />
          <span className="relative z-10">{isSubmitting ? "Submitting..." : "Submit"}</span>
        </button>
      </div>
    </div>
  );
};

export default UsernameAgeForm;

"use client";

import { useState } from "react";
import { openDB } from "idb";
import { TextInput, Button } from "flowbite-react";
import UserConfirm from "./UserConfirm"; // ✅ Import UserConfirm

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
const UsernameAgeForm = () => {
  const [username, setUsername] = useState<string>("");
  const [age, setAge] = useState<number | "">("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // ✅ Modal state

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAge(value === "" ? "" : Number(value));
  };

  const handleSubmit = async () => {
    if (!username.trim()) {
      alert("Username cannot be empty");
      return;
    }

    if (age === "" || isNaN(age) || age <= 0) {
      alert("Age must be a valid positive number");
      return;
    }

    setIsSubmitting(true); // Start submitting

    const userData = { username, age };

    try {
      await addUserToIndexedDB(userData); // ✅ Store in IndexedDB
      setIsModalOpen(true); // ✅ Show modal after successful save
    } catch (error) {
      alert("Error saving user data!");
    } finally {
      setUsername(""); // Clear form fields
      setAge("");
      setIsSubmitting(false); // Reset submitting state
    }
  };

  const isFormValid = username.trim() !== "" && age !== "" && !isNaN(age) && age > 0;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col items-center space-y-6 p-8 bg-white shadow-lg rounded-xl w-full max-w-md">
        <TextInput
          id="username"
          type="text"
          sizing="lg"
          placeholder="Enter your username"
          className="w-full rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextInput
          id="age"
          type="number"
          sizing="lg"
          placeholder="Enter your age"
          className="w-full rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={age}
          onChange={handleAgeChange}
        />

        <Button
          className="w-full bg-blue-500 text-white py-2 rounded-md"
          onClick={handleSubmit}
          disabled={isSubmitting || !isFormValid}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>

      {/* ✅ UserConfirm modal controlled from here */}
      <UserConfirm open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default UsernameAgeForm;

"use client";

import React, { useState, useEffect } from "react";
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
  const [age, setAge] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  
  // Validation states
  const [usernameError, setUsernameError] = useState<string>("");
  const [ageError, setAgeError] = useState<string>("");
  const [touchedFields, setTouchedFields] = useState<{ username: boolean; age: boolean }>({
    username: false,
    age: false
  });

  // Validate username
  const validateUsername = (value: string) => {
    if (!value.trim()) {
      return "Username cannot be empty";
    }
    if (value.trim().length < 3) {
      return "Username must be at least 3 characters";
    }
    return "";
  };

  // Validate age
  const validateAge = (value: string) => {
    if (!value) {
      return "Age is required";
    }
    
    const ageNum = Number(value);
    
    if (isNaN(ageNum)) {
      return "Age must be a number";
    }
    
    if (!Number.isInteger(ageNum)) {
      return "Age must be a whole number";
    }
    
    if (ageNum <= 0) {
      return "Age must be positive";
    }
    
    if (ageNum > 120) {
      return "Please enter a valid age below 120";
    }
    
    return "";
  };

  // Handle username change
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    if (touchedFields.username) {
      setUsernameError(validateUsername(value));
    }
  };

  // Handle age change
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Only allow positive numbers and empty string
    if (value === "" || /^\d+$/.test(value)) {
      setAge(value);
      if (touchedFields.age) {
        setAgeError(validateAge(value));
      }
    }
  };

  // Field blur handlers
  const handleBlur = (field: 'username' | 'age') => {
    setTouchedFields({
      ...touchedFields,
      [field]: true
    });
    
    if (field === 'username') {
      setUsernameError(validateUsername(username));
    } else if (field === 'age') {
      setAgeError(validateAge(age));
    }
  };

  // Check if form is valid
  const isFormValid = username.trim() !== "" && 
                      age !== "" && 
                      !isNaN(Number(age)) && 
                      Number(age) > 0 &&
                      !usernameError && 
                      !ageError;

  const handleSubmit = async () => {
    // Set all fields as touched to show validation errors
    setTouchedFields({ username: true, age: true });
    
    // Validate all fields
    const usernameValidation = validateUsername(username);
    const ageValidation = validateAge(age);
    
    setUsernameError(usernameValidation);
    setAgeError(ageValidation);
    
    // Only proceed if all validations pass
    if (usernameValidation || ageValidation) {
      return;
    }

    setIsSubmitting(true);

    const userData = { username, age: Number(age) };

    try {
      await addUserToIndexedDB(userData);
      setIsModalOpen(true);
    } catch (error) {
      alert("Error saving user data!");
    } finally {
      setUsername("");
      setAge("");
      setIsSubmitting(false);
      // Reset touched state
      setTouchedFields({ username: false, age: false });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50 p-4">
      <div className="flex flex-col items-center space-y-6 p-8 bg-white shadow-lg rounded-2xl w-full max-w-md border-t-8 border-blue-500"> 
        {/* Logo Image (Next.js Image) */}
        <div className="relative w-24 h-24 mb-2"> 
          <Image
            src="/MainImage/Pibi.png"
            alt="App Logo"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-blue-700">Welcome to Bantay Bayan!</h2>
        <p className="text-gray-600 text-center -mt-4">Please enter your details to continue</p>

        {/* Username Input */}
        <div className="w-full">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <TextInput
            id="username"
            type="text"
            sizing="lg"
            placeholder="Enter your username"
            className={`w-full rounded-lg ${usernameError ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-blue-300 focus:ring-blue-500 focus:border-blue-500'}`}
            value={username}
            onChange={handleUsernameChange}
            onBlur={() => handleBlur('username')}
            required
          />
          {touchedFields.username && usernameError && (
            <p className="mt-1 text-sm text-red-600">{usernameError}</p>
          )}
        </div>

        {/* Age Input */}
        <div className="w-full">
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Age</label>
          <TextInput
            id="age"
            type="text" // Changed to text to handle our own validation
            inputMode="numeric" // Better mobile experience for numbers
            pattern="[0-9]*" // Only allow numbers
            sizing="lg"
            placeholder="Enter your age"
            className={`w-full rounded-lg ${ageError ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-blue-300 focus:ring-blue-500 focus:border-blue-500'}`}
            value={age}
            onChange={handleAgeChange}
            onBlur={() => handleBlur('age')}
            required
          />
          {touchedFields.age && ageError && (
            <p className="mt-1 text-sm text-red-600">{ageError}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          className={`relative inline-block px-6 py-3 font-bold text-white rounded-lg transition-all duration-200 ease-in-out w-full
          bg-blue-500 hover:bg-blue-600
          ${isActive ? "translate-y-1" : ""}
          ${!isFormValid || isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
          onMouseDown={() => setIsActive(true)}
          onMouseUp={() => setIsActive(false)}
          onMouseLeave={() => setIsActive(false)}
          onClick={handleSubmit}
          disabled={!isFormValid || isSubmitting}
        >
          <span className="relative inline-flex items-center justify-center">
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Start Learning!"
            )}
          </span>
        </button>
        
        {/* Footer text */}
        <p className="text-xs text-gray-500 text-center mt-4">
          Join our community and learn about safety with Bantay Bayan
        </p>
      </div>
    </div>
  );
};

export default UsernameAgeForm;
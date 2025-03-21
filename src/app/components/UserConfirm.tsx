"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Modal, Button } from "flowbite-react";
import { HiCheckCircle } from "react-icons/hi";

interface UserConfirmProps {
  open: boolean;
  onClose: () => void;
}

const UserConfirm: React.FC<UserConfirmProps> = ({ open, onClose }) => {
  const router = useRouter();

  const handleContinue = () => {
    onClose();
    router.push("/Learn");
  };

  return (
    <Modal show={open} size="md" onClose={onClose} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="relative inline-block">
            <HiCheckCircle className="mx-auto mb-4 h-20 w-20 text-blue-500 animate-bounce drop-shadow-lg" />
            <div className="absolute inset-0 rounded-full bg-blue-500 opacity-10 blur-lg"></div>
          </div>

          <h3 className="mb-4 text-2xl font-bold text-gray-800">
            🎉 User Created!
          </h3>

          <p className="mb-5 text-gray-600">
            Your profile has been successfully created.
          </p>

          <div className="flex justify-center">
            <Button 
              color="blue"
              onClick={handleContinue}
              className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-white font-semibold transition"
            >
              Continue
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UserConfirm;
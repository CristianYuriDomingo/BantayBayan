"use client";

import React, { useState } from "react";
import UsernameAgeForm from "../components/UsernameAgeForm";
import UserConfirm from "../components/UserConfirm";

const Form = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <UsernameAgeForm setIsModalOpen={setIsModalOpen} />
      <UserConfirm open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Form;

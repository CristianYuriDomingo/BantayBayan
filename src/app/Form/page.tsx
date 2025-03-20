import React from "react";
import UsernameAgeForm from "../components/UsernameAgeForm"; // Adjust the import path as needed
import UserConfirm from "../components/UserConfirm";


const Form = () => {
  return (
    <>
      <UsernameAgeForm />
      <UserConfirm/>
    </>
  ); 
};

export default Form;
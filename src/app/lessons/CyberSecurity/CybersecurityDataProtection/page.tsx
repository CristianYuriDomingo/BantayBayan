import React from 'react';

const CybersecurityDataProtection: React.FC = () => {
  // Correct path to reference images in the public folder
  const backgroundImage = "/LessonImage/Cyber.png";

  return (
    <div 
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <h1>Cybersecurity & Data Protection</h1>
    </div>
  );
};

export default CybersecurityDataProtection;

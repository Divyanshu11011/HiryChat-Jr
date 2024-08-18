// src/components/ProfileSetup.tsx
import React, { useState } from 'react';

const avatars = [
  { id: 1, src: '/avatars/boy1.svg', alt: 'Boy Avatar 1' },
  { id: 2, src: '/avatars/boy2.svg', alt: 'Boy Avatar 2' },
  { id: 3, src: '/avatars/girl1.svg', alt: 'Girl Avatar 1' },
  { id: 4, src: '/avatars/girl2.svg', alt: 'Girl Avatar 2' },
];

const ProfileSetup: React.FC<{ onProfileComplete: () => void }> = ({ onProfileComplete }) => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState<number | null>(null);

  const handleSubmit = () => {
    if (!name || avatar === null) {
      alert('Please provide a name and select an avatar');
      return;
    }
    // Save user profile (name and avatar) to the backend
    onProfileComplete();
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">Setup Profile</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="border border-gray-300 p-2 w-full mb-4 rounded-md"
        />
        <div className="flex space-x-4 mb-4">
          {avatars.map((av) => (
            <img
              key={av.id}
              src={av.src}
              alt={av.alt}
              className={`w-16 h-16 rounded-full cursor-pointer ${
                avatar === av.id ? 'border-4 border-blue-500' : ''
              }`}
              onClick={() => setAvatar(av.id)}
            />
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white py-2 px-4 rounded-md w-full"
        >
          Complete Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileSetup;

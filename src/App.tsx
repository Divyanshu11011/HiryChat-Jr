// src/App.tsx
import React, { useState } from 'react';
import SignIn from './components/Signin/SignIn';
import ProfileSetup from './components/Signin/Profilesetup';
import Sidebar from './components/Sidebar/Sidebar';
import ChatHeader from './components/ChatArea/ChatHeader';
import ChatMessages from './components/ChatArea/ChatMessages';
import MessageInput from './components/ChatArea/MessageInput';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [profileComplete, setProfileComplete] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('All');
  const [activeChat, setActiveChat] = useState<string | null>(null);

  const handleSignInSuccess = (user: any) => {
    setUser(user);
    if (!user.profileComplete) {
      setProfileComplete(false);
    } else {
      setProfileComplete(true);
    }
  };

  const handleProfileComplete = () => {
    setProfileComplete(true);
  };

  if (!user) {
    return <SignIn onSignInSuccess={handleSignInSuccess} />;
  }

  if (!profileComplete) {
    return <ProfileSetup onProfileComplete={handleProfileComplete} />;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
      />
      <div className={`w-full md:w-2/3 flex flex-col bg-white h-full ${activeChat ? 'block' : 'hidden md:block'}`}>
        {activeChat ? (
          <>
            <ChatHeader activeChat={activeChat} setActiveChat={setActiveChat} />
            <ChatMessages />
            <MessageInput />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a chat to view conversation
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

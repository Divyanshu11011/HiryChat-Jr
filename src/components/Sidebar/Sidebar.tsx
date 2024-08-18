// src/components/Sidebar/Sidebar.tsx
import React from 'react';
import SearchBar from './SearchBar';
import Tabs from './Tabs';
import UserList from './UserList';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeChat: string | null;
  setActiveChat: (chat: string | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, activeChat, setActiveChat }) => {
  return (
    <div className={`w-full md:w-1/3 bg-white border-r border-gray-300 flex flex-col ${activeChat ? 'hidden md:flex' : ''}`}>
      <SearchBar />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <UserList setActiveChat={setActiveChat} />
    </div>
  );
};

export default Sidebar;

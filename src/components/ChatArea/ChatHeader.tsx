import React from 'react';

const ChatHeader: React.FC<{ activeChat: string; setActiveChat: (chat: string | null) => void }> = ({ activeChat, setActiveChat }) => {
  return (
    <div className="p-4 border-b border-gray-300 bg-gray-100 flex items-center">
      <button
        className="md:hidden text-gray-500 mr-4"
        onClick={() => setActiveChat(null)}
      >
        <i className="fas fa-arrow-left"></i>
      </button>
      <img src="https://placehold.co/50x50" alt="User profile picture" className="w-12 h-12 rounded-full mr-4" />
      <div>
        <div className="font-bold text-gray-800">{activeChat}</div>
        <div className="text-green-500">Typing...</div>
      </div>
    </div>
  );
};

export default ChatHeader;

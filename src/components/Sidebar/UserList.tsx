import React from 'react';

interface UserListProps {
  setActiveChat: (chat: string) => void;
}

const UserList: React.FC<UserListProps> = ({ setActiveChat }) => {
  const users = Array(20).fill(null).map((_, i) => `User ${i + 1}`);
  
  return (
    <div className="overflow-y-auto flex-1 no-scrollbar">
      {users.map((user, i) => (
        <div
          key={i}
          onClick={() => setActiveChat(user)}
          className={`flex items-center p-4 cursor-pointer border-b border-gray-300`}
        >
          <img src="https://placehold.co/50x50" alt="User profile picture" className="w-12 h-12 rounded-full mr-4" />
          <div>
            <div className="flex items-center space-x-2">
              <div className="font-bold">{user}</div>
              <div className="text-gray-500 text-xs">• 11 days</div>
            </div>
            <div className="text-gray-700 text-sm">Message preview...</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;

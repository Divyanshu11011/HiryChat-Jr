import React from 'react';

const MessageInput: React.FC = () => {
  return (
    <div className="p-4 border-t border-gray-300 bg-white">
      <div className="flex items-center w-full p-2 border rounded-md bg-gray-100">
        <input type="text" placeholder="Type your message here" className="w-full bg-gray-100 outline-none px-2" />
        <button className="text-orange-500 mr-2">
          <i className="fas fa-paperclip"></i>
        </button>
        <button className="text-red-500">
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default MessageInput;

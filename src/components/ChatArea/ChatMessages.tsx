import React from 'react';

const ChatMessages: React.FC = () => {
  const chatMessages = [
    "Hello, I wanted to know more about the product design position opened at Atlassian.",
    "Sure, tell us. What do you want to know?",
    // More messages...
  ];
  
  return (
    <div className="flex-1 p-4 overflow-y-auto no-scrollbar">
      {chatMessages.map((message, i) => (
        <div key={i}>
          {i % 2 === 0 ? (
            <div className="bg-gray-100 p-4 rounded-md mb-4 inline-block max-w-lg">
              {message}
            </div>
          ) : (
            <div className="flex justify-end">
              <div className="bg-red-500 text-white p-4 rounded-md mb-4 inline-block max-w-lg text-right">
                {message}
              </div>
            </div>
          )}
        </div>
      ))}
      <div className="flex justify-end text-gray-500 text-sm mt-1">3 days ago</div>
    </div>
  );
};

export default ChatMessages;

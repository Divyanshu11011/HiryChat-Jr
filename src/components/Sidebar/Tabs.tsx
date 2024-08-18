import React from 'react';

const Tabs: React.FC<{ activeTab: string; setActiveTab: (tab: string) => void }> = ({ activeTab, setActiveTab }) => {
  const tabs = ['All', 'Unread', 'Archived', 'Blocked'];
  
  return (
    <div className="p-3 flex space-x-2 items-center border-b border-gray-300">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-3 py-1 rounded-full text-sm ${activeTab === tab ? 'bg-red-500 text-white' : 'bg-white border border-gray-300 text-gray-500'}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;

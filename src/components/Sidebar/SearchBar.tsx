import React from 'react';

const SearchBar: React.FC = () => {
  return (
    <div className="p-4 pb-3.5 border-b border-gray-300">
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-3 pl-10 border rounded-md bg-gray-100"
        />
        <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
      </div>
    </div>
  );
};

export default SearchBar;

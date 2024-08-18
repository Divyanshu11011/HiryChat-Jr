import React, { useState } from 'react';

const SearchBar: React.FC = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    // Get user info from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = () => {
        // Clear session data and reload the page or redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload(); // Or redirect to login page
    };

    return (
        <div className="p-4 pb-3.5 border-b border-gray-300 flex items-center justify-between">
            <div className="relative flex-grow">
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full p-3 pl-10 border rounded-md bg-gray-100"
                />
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
            </div>
            {/* User Avatar with Dropdown */}
            <div className="relative ml-4">
                <img
                    src={user.avatar || '/default-avatar.png'} // Placeholder or actual avatar
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full cursor-pointer"
                    onClick={() => setShowDropdown(!showDropdown)}
                />
                {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                        <button
                            onClick={handleLogout}
                            className="block px-4 py-2 text-gray-700 hover:bg-red-500 hover:text-white w-full text-left rounded-md"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;

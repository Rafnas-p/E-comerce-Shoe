import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsChevronDown } from 'react-icons/bs'; 
import './navbar.css';

function AdminNav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); 
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false); 
  };

  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Dashboard Brand */}
        <div className="text-white text-2xl font-bold cursor-pointer" onClick={() => navigate('/admin/adminhome')}>
          Dashboard
        </div>

        
        <div className="relative">
          <button
            className="flex items-center space-x-2 bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
            onClick={toggleDropdown}
          >
            <span>Admin</span>
            <BsChevronDown className="text-sm" />
          </button>

        
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10">
              <ul className="py-1 text-gray-800">
              <li>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                    onClick={() => {
                      navigate('/admin/adminhome');
                      closeDropdown();
                    }}
                  >
                    HOME
                  </button>
                </li>
                <li>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                    onClick={() => {
                      navigate('/admin');
                      closeDropdown();
                    }}
                  >
                    Product
                  </button>
                </li>
                <li>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                    onClick={() => {
                      navigate('/admin/registerduser');
                      closeDropdown();
                    }}
                  >
                    Users
                  </button>
                </li>
                <li>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                    onClick={() => {
                      navigate('/admin/OrderDetails');
                      closeDropdown();
                    }}
                  >
                    Orders
                  </button>
                </li>
                <li>
                  <hr className="border-gray-300" />
                </li>
                <li>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-red-200 text-red-600"
                    onClick={() => {
                      navigate('/');
                      closeDropdown();
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default AdminNav;


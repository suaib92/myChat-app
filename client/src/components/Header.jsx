import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faUsers, faImages, faUserPlus, faBars, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="flex justify-between items-center px-6 bg-gray-800">
      <div className="logo mr-auto">
        <div className='flex'>
          <h1 className="text-white text-2xl">Secret </h1>
          <h1 className="text-white border border-black border-solid   bg-pink-600 text-2xl ">Desires</h1>
        </div>
        <p className="text-gray-300 text-sm">Open Beta</p>
      </div>
      <nav className="hidden md:flex justify-center flex-grow">
        <NavLink
          to="/chat"
          className="text-white px-3 py-2 rounded-md font-medium"
        >
          <FontAwesomeIcon icon={faComment} className="mr-2" />
          Chat
        </NavLink>
        <NavLink
          to="/my-characters"
          className="text-white px-3 py-2 rounded-md font-medium"
        >
          <FontAwesomeIcon icon={faUsers} className="mr-2" />
          My Characters
        </NavLink>
        <NavLink
          to="/generate-images"
          className="text-white px-3 py-2 rounded-md font-medium"
        >
          <FontAwesomeIcon icon={faImages} className="mr-2" />
          Generate Images
        </NavLink>
        <NavLink
          to="/create-character"
          className="text-white px-3 py-2 font-medium border rounded-full border-pink-600 bg-pink-600"
        >
          <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
          Create Character
        </NavLink>
        
      </nav>
      <NavLink
          to="/my-profile"
          className="text-white px-3 py-2 rounded-md font-medium"
        >
          <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
          My Profile
        </NavLink>
      <div className="md:hidden z ">
        <div className="relative">
          <button
            type="button"
            className="flex items-center text-white px-3 py-2  font-medium border border-pink-600 rounded-full bg-pink-600"
            onClick={() => toggleDropdown()}
          >
            <FontAwesomeIcon icon={faBars} className="mr-2" />
            Menu
          </button>
          <div
            className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${dropdownOpen ? 'block' : 'hidden'}`}
          >
            <NavLink
              to="/chat"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={faComment} className="mr-2" />
              Chat
            </NavLink>
            <NavLink
              to="/my-characters"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={faUsers} className="mr-2" />
              My Characters
            </NavLink>
            <NavLink
              to="/generate-images"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={faImages} className="mr-2" />
              Generate Images
            </NavLink>
            <NavLink
              to="/create-character"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
              Create Character
            </NavLink>
            <NavLink
              to="/my-profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
              My Profile
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

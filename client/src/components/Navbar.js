import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-xl">
          My App
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/login" className="text-white hover:text-gray-300">
              Login
            </Link>
          </li>
          <li>
            <Link to="/signup" className="text-white hover:text-gray-300">
              Signup
            </Link>
          </li>
          <li>
            <Link to="/users" className="text-white hover:text-gray-300">
              User List
            </Link>
          </li>
          <li>
            <Link to="/create-discussion" className="text-white hover:text-gray-300">
              Create Discussion
            </Link>
          </li>
          <li>
            <Link to="/discussions" className="text-white hover:text-gray-300">
              Discussion List
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

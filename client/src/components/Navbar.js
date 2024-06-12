import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Navbar({ isAuthenticated }) {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:5000/api/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserName(response.data.name);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    navigate('/login');
  };
  const name = localStorage.getItem('name');
  return (
    <nav className="bg-gray-800 py-4">

      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-xl">
          Wellcome! {name}
        </Link>
        <ul className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
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
          {isAuthenticated && (
            <>
              <li className="text-white">Welcome, {userName}</li>
              <li>
                <button onClick={handleLogout} className="text-white hover:text-gray-300">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserProfile({ match }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Make a request to your API to fetch user data
        const response = await axios.get(`http://localhost:5000/api/users/${match.params.userId}`);
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [match.params.userId]);

  return (
    <div className="container mx-auto my-8">
      {user ? (
        <div className="bg-white shadow-md rounded-md p-4 max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">{user.name}</h2>
          <p className="text-gray-600 mb-2">
            <span className="font-bold">Email:</span> {user.email}
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-bold">Mobile No:</span> {user.mobileNo}
          </p>
          {/* Add more user details as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserProfile;
// UserList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let response;
        if (searchName) {
          response = await axios.get(`/api/users/search?name=${searchName}`);
        } else {
          response = await axios.get('/api/users');
        }
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, [searchName]);

  const handleSearchNameChange = (e) => {
    setSearchName(e.target.value);
  };

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={handleSearchNameChange}
          className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded"
        />
      </div>
      <ul className="list-disc pl-4">
        {users.map((user) => (
          <li key={user._id}>
            <a href={`/users/${user._id}`}>{user.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
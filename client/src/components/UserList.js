import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [editUser, setEditUser] = useState(null);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNo, setMobileNo] = useState('');

  const userId = localStorage.getItem('id')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let response;
        if (searchName) {
          response = await axios.get(`http://localhost:5000/api/users/search?name=${searchName}`);
        } else {
          response = await axios.get('http://localhost:5000/api/users');
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

  const handleDelete = async (userId) => {
    try {
      await axios.post(`http://localhost:5000/api/users/delete/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setName(user.name);
    setPassword('');
    setMobileNo(user.mobileNo);
  };

  const handleSave = async () => {
    try {
      const updatedUser = {
        name,
        password,
        mobileNo
      };
      const response = await axios.post(`http://localhost:5000/api/users/update/${editUser._id}`, updatedUser);
      setUsers(users.map(user => (user._id === editUser._id ? response.data : user)));
      setEditUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="my-8">
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
            <li key={user._id} className="flex items-center justify-between mb-2">
              <a href={`/users/${user._id}`}>{user.name}</a>
              {
                user._id === userId? (
                  <div>
                <button onClick={() => handleEdit(user)} className="bg-blue-500 text-white px-3 py-1 rounded-full mr-2 hover:bg-blue-600">Edit</button>
                <button onClick={() => handleDelete(user._id)} className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600">Delete</button>
              </div>
                ) : (
                  <div>
                  <button onClick={() => handleEdit(user)} className="bg-blue-500 text-white px-3 py-1 rounded-full mr-2 hover:bg-blue-600">follow</button>
                  </div>
                )
}
             
            </li>
          ))}
        </ul>

        {editUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-md">
              <h2 className="text-xl font-bold mb-4">Edit User</h2>
              <div className="mb-4">
                <label className="block text-gray-700">Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Mobile No:</label>
                <input
                  type="text"
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600">Save</button>
              <button onClick={() => setEditUser(null)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserList;
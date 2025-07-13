import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [editUser, setEditUser] = useState(null);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNo, setMobileNo] = useState('');

  const userId = localStorage.getItem('id');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let response;
        if (searchName) {
          response = await axios.get(`http://localhost:5001/api/users/search?name=${searchName}`);
        } else {
          response = await axios.get('http://localhost:5001/api/users');
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
      await axios.post(`http://localhost:5001/api/users/delete/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
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
        mobileNo,
      };
      const response = await axios.post(`http://localhost:5001/api/users/update/${editUser._id}`, updatedUser);
      setUsers(users.map((user) => (user._id === editUser._id ? response.data : user)));
      setEditUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFollow = async (userToFollowId) => {
    try {
      await axios.post('http://localhost:5001/api/follow', {
        currentUserId: userId,
        userToFollowId,
      });
      const updatedUsers = users.map((user) => {
        if (user._id === userToFollowId) {
          return { ...user, followers: [...user.followers, userId] };
        } else if (user._id === userId) {
          return { ...user, following: [...user.following, userToFollowId] };
        }
        return user;
      });
      setUsers(updatedUsers);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnfollow = async (userToUnfollowId) => {
    try {
      await axios.post('http://localhost:5001/api/unfollow', {
        currentUserId: userId,
        userToUnfollowId,
      });
      const updatedUsers = users.map((user) => {
        if (user._id === userToUnfollowId) {
          return {
            ...user,
            followers: user.followers.filter((followerId) => followerId !== userId),
          };
        } else if (user._id === userId) {
          return {
            ...user,
            following: user.following.filter((followingId) => followingId !== userToUnfollowId),
          };
        }
        return user;
      });
      setUsers(updatedUsers);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="my-8">
        <h2 className="text-2xl font-bold mb-4 text-center">User List</h2>
        <div className="mb-4 flex justify-center">
          <input
            type="text"
            placeholder="Search by name"
            value={searchName}
            onChange={handleSearchNameChange}
            className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <ul className="divide-y divide-gray-300 rounded-md shadow-lg">
          {users.map((user) => (
            <li key={user._id} className="flex items-center justify-between py-4 px-6 bg-white hover:bg-gray-50">
              <div className="flex items-center">
                <a href={`/users/${user._id}`} className="text-blue-500 hover:underline font-semibold">
                  {user.name}
                </a>
              </div>
              <div className="ml-4 flex">
                {user._id === userId ? (
                  <>
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600 transition-colors duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors duration-300"
                    >
                      Delete
                    </button>
                  </>
                ) : user.followers.includes(userId) ? (
                  <button
                    onClick={() => handleUnfollow(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors duration-300"
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => handleFollow(user._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors duration-300"
                  >
                    Follow
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>

        {editUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md w-full md:w-1/2 max-w-lg">
              <h2 className="text-xl font-bold mb-4 text-center">Edit User</h2>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Mobile No:</label>
                <input
                  type="text"
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
/>
</div>
<div className="flex justify-end">
  <button
    onClick={handleSave}
    className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 transition-colors duration-300"
  >
    Save
  </button>
  <button
    onClick={() => setEditUser(null)}
    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-300"
  >
    Cancel
  </button>
</div>
</div>
</div>
)}
</div>
</div>
);
}

export default UserList;
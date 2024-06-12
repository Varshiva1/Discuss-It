// FollowingList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FollowingList({ match }) {
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const response = await axios.get(`/api/users/${match.params.userId}/following`);
        setFollowing(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFollowing();
  }, [match.params.userId]);

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Following</h2>
      <ul className="list-disc pl-4">
        {following.map((user) => (
          <li key={user._id}>
            <a href={`/users/${user._id}`}>{user.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FollowingList;
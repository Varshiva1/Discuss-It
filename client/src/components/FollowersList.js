// FollowersList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FollowersList({ match }) {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await axios.get(`/api/users/${match.params.userId}/followers`);
        setFollowers(response.data);
      } catch (error) {        console.error(error);
      }
    };

    fetchFollowers();
  }, [match.params.userId]);

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Followers</h2>
      <ul className="list-disc pl-4">
        {followers.map((user) => (
          <li key={user._id}>
            <a href={`/users/${user._id}`}>{user.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FollowersList;
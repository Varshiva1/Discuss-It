import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/all');
        setDiscussions(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDiscussions();
  }, []);

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div>
        {discussions.map((discussion) => (
          <div key={discussion._id} className="mb-4">
            <h3 className="text-lg font-bold">{discussion.text}</h3>
            <p>{discussion.hashTags.join(', ')}</p>
            {/* Add more discussion details */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
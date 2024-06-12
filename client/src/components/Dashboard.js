import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        // Make a request to your API to fetch discussions
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {discussions.map((discussion) => (
          <div
            key={discussion._id}
            className="bg-white shadow-md rounded-md p-4"
          >
            <h3 className="text-lg font-bold mb-2">{discussion.text}</h3>
            <p className="text-gray-600">{discussion.createdOn}</p>
            {/* Add more discussion details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
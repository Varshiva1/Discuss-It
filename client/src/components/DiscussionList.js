import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DiscussionList() {
  const [discussions, setDiscussions] = useState([]);
  const [searchTags, setSearchTags] = useState('');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        let response;
        if (searchTags) {
          // Make a request to your API to fetch discussions by tags
          response = await axios.get(`http://localhost:5000/api/tags?tags=${searchTags}`);
        } else if (searchText) {
          // Make a request to your API to fetch discussions by text
          response = await axios.get(`http://localhost:5000/api/text?text=${searchText}`);
        } else {
          // Make a request to your API to fetch all discussions
          response = await axios.get('http://localhost:5000/api/all');
        }
        setDiscussions(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDiscussions();
  }, [searchTags, searchText]);

  const handleSearchTagsChange = (e) => {
    setSearchTags(e.target.value);
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Discussion List</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by tags"
          value={searchTags}
          onChange={handleSearchTagsChange}
          className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded mr-2 mb-2 md:mb-0"
        />
        <input
          type="text"
          placeholder="Search by text"
          value={searchText}
          onChange={handleSearchTextChange}
          className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {discussions.map((discussion) => (
          <div
            key={discussion._id}
            className="bg-white shadow-md rounded-md p-4"
          >
            <h3 className="text-lg font-bold mb-2">{discussion.text}</h3>
            {discussion.image && (
              <img
                src={`/api/discussions/${discussion._id}/image`}
                alt="Discussion"
                className="mb-2"
              />
            )}
            <p className="text-gray-600 mb-2">
              <span className="font-bold">Hash Tags:</span>{' '}
              {discussion.hashTags.join(', ')}
            </p>
            <p className="text-gray-600">
              <span className="font-bold">Created On:</span>{' '}
              {new Date(discussion.createdOn).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DiscussionList;
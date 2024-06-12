import React, { useState } from 'react';
import axios from 'axios';

function CreateDiscussion() {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [hashTags, setHashTags] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('text', text);
      formData.append('image', image);
      formData.append('hashTags', hashTags.split(',').map((tag) => tag.trim()));

      // Make a request to your API to create a new discussion
      const response = await axios.post('http://localhost:5000/api/creatediscussion', formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Create Discussion</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="text" className="block font-bold mb-2">
            Discussion Text
          </label>
          <textarea
            id="text"
            placeholder="Enter discussion text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block font-bold mb-2">
            Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="hashTags" className="block font-bold mb-2">
            Hash Tags (separate by commas)
          </label>
          <input
            type="text"
            id="hashTags"
            placeholder="Enter hash tags"
            value={hashTags}
            onChange={(e) => setHashTags(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Discussion
        </button>
      </form>
    </div>
  );
}

export default CreateDiscussion;
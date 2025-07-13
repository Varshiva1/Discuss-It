import React, { useState } from 'react';
import axios from 'axios';

function CreateDiscussion() {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [hashTags, setHashTags] = useState('');
  const userId = localStorage.getItem('id');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('text', text);
      formData.append('image', image);
      formData.append('userId', userId);
      formData.append('hashTags', hashTags.split(',').map((tag) => tag.trim()));

      // Make a request to your API to create a new discussion
      const response = await axios.post('http://localhost:5001/api/creatediscussion', formData);
      console.log(response.data); // Assuming API returns relevant data upon successful creation

      // Alert message on successful creation
      alert('Discussion created successfully!');

      // Clear form fields after successful submission
      setText('');
      setImage(null);
      setHashTags('');
    } catch (error) {
      console.error(error);
      // Display error message if API call fails
      alert('Failed to create discussion. Please try again.');
    }
  };

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Discussion</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label htmlFor="text" className="block font-bold mb-2">
            Discussion Text
          </label>
          <textarea
            id="text"
            placeholder="Enter discussion text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            rows="4"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block font-bold mb-2">
            Image
          </label>
          <div className="flex items-center justify-center bg-gray-200 rounded-md p-2">
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="hidden"
            />
            <label htmlFor="image" className="cursor-pointer">
              <span className="text-blue-500 hover:text-blue-600 transition-colors duration-300">
                {image ? 'Image selected' : 'Choose Image'}
              </span>
            </label>
          </div>
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
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 w-full"
        >
          Create Discussion
        </button>
      </form>
    </div>
  );
}

export default CreateDiscussion;
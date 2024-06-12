// UpdateDiscussion.js
import React, { useState } from 'react';
import axios from 'axios';

const UpdateDiscussion = ({ discussion, onUpdate }) => {
  const [updatedText, setUpdatedText] = useState(discussion.text);
  const [updatedImage, setUpdatedImage] = useState(discussion.image || '');
  const [updatedHashTags, setUpdatedHashTags] = useState(discussion.hashTags.join(', '));

  const handleTextChange = (e) => {
    setUpdatedText(e.target.value);
  };

  const handleImageChange = (e) => {
    setUpdatedImage(e.target.files[0]);
  };

  const handleHashTagsChange = (e) => {
    setUpdatedHashTags(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('text', updatedText);
      formData.append('image', updatedImage);
      formData.append('hashTags', updatedHashTags.split(',').map((tag) => tag.trim()));

      const response = await axios.put(`/api/discussions/${discussion._id}`, formData);
      onUpdate(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Update Discussion</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="text" className="block font-bold mb-2">
            Discussion Text
          </label>
          <textarea
            id="text"
            value={updatedText}
            onChange={handleTextChange}
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
            onChange={handleImageChange}
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
            value={updatedHashTags}
            onChange={handleHashTagsChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Discussion
        </button>
      </form>
    </div>
  );
};

export default UpdateDiscussion;
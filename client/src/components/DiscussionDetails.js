// DiscussionDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DiscussionDetails({ match }) {
  const [discussion, setDiscussion] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDiscussion = async () => {
      try {
        const response = await axios.get(`/api/discussions/${match.params.discussionId}`);
        setDiscussion(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchDiscussion();
  }, [match.params.discussionId]);

  const handleLikeDiscussion = async () => {
    try {
      const response = await axios.post(`/api/discussions/${match.params.discussionId}/like`, {
        userId: 'YOUR_USER_ID_HERE', // Replace with the actual user ID
      });
      setDiscussion(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnlikeDiscussion = async () => {
    try {
      const response = await axios.post(`/api/discussions/${match.params.discussionId}/unlike`, {
        userId: 'YOUR_USER_ID_HERE', // Replace with the actual user ID
      });
      setDiscussion(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/discussions/${match.params.discussionId}/comment`, {
        text: newComment,
        userId: 'YOUR_USER_ID_HERE', // Replace with the actual user ID
      });
      setDiscussion(response.data);
      setNewComment('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleLikeComment = async (commentIndex) => {
    try {
      const response = await axios.post(`/api/discussions/${match.params.discussionId}/comment/${commentIndex}/like`, {
        userId: 'YOUR_USER_ID_HERE', // Replace with the actual user ID
      });
      setDiscussion(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnlikeComment = async (commentIndex) => {
    try {
      const response = await axios.post(`/api/discussions/${match.params.discussionId}/comment/${commentIndex}/unlike`, {
        userId: 'YOUR_USER_ID_HERE', // Replace with the actual user ID
      });
      setDiscussion(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateComment = async (commentIndex, updatedText) => {
    try {
      const response = await axios.put(`/api/discussions/${match.params.discussionId}/comment/${commentIndex}`, {
        text: updatedText,
      });
      setDiscussion(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteComment = async (commentIndex) => {
    try {
      const response = await axios.delete(`/api/discussions/${match.params.discussionId}/comment/${commentIndex}`);
      setDiscussion(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateDiscussion = async (updatedText, updatedImage, updatedHashTags) => {
    try {
      const formData = new FormData();
      formData.append('text', updatedText);
      formData.append('image', updatedImage);
      formData.append('hashTags', updatedHashTags.split(',').map((tag) => tag.trim()));

      const response = await axios.put(`/api/discussions/${match.params.discussionId}`, formData);
      setDiscussion(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteDiscussion = async () => {
    try {
      await axios.delete(`/api/discussions/${match.params.discussionId}`);
      // Redirect or handle the deletion as needed
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto my-8">
      {isLoading ? (
        <p>Loading...</p>
      ) : discussion ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">{discussion.text}</h2>
          {discussion.image && <img src={discussion.image} alt="Discussion" className="mb-4" />}
          <p className="text-gray-600 mb-4">
            <span className="font-bold">Hash Tags:</span> {discussion.hashTags.join(', ')}
          </p>
          <p className="text-gray-600 mb-4">
            <span className="font-bold">Created On:</span> {new Date(discussion.createdOn).toLocaleString()}
          </p>
          <p className="text-gray-600 mb-4">
            <span className="font-bold">View Count:</span> {discussion.viewCount}
          </p>
          <button onClick={handleLikeDiscussion} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2">
            Like
          </button>
          <button onClick={handleUnlikeDiscussion} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2">
            Unlike
          </button>
          <form onSubmit={handleCommentSubmit} className="mb-4">
            <input
              type="text"
              placeholder="Add a comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded mr-2"
            />
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Comment
            </button>
          </form>
          <div>
            <h3 className="text-xl font-bold mb-2">Comments</h3>
            {discussion.comments.map((comment, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded mb-2">
                <p>{comment.text}</p>
                <p className="text-gray-600">
                  By {comment.user.name} on {new Date(comment.createdOn).toLocaleString()}
                </p>
                <button onClick={() => handleLikeComment(index)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2">
                  Like
                </button>
                <button onClick={() => handleUnlikeComment(index)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2">
                  Unlike
                </button>
                {/* Add update and delete comment functionality */}
              </div>
            ))}
          </div>
          {/* Add update and delete discussion functionality */}
        </div>
      ) : (
        <p>Discussion not found</p>
      )}
    </div>
  );
}

export default DiscussionDetails;

//discussiolist.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DiscussionList() {
  const [discussions, setDiscussions] = useState([]);
  const [searchTags, setSearchTags] = useState('');
  const [searchText, setSearchText] = useState('');
  const [likedDiscussions, setLikedDiscussions] = useState([]);
  const [editDiscussion, setEditDiscussion] = useState(null);
  const [newText, setNewText] = useState('');
  const [newTags, setNewTags] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [editComment, setEditComment] = useState({});
  const [viewCounts, setViewCounts] = useState({});

  const userId = localStorage.getItem('id');
  console.log(userId, "userID");

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        let response;
        if (searchTags) {
          response = await axios.get(`http://localhost:5000/api/tags?tags=${searchTags}`);
        } else if (searchText) {
          response = await axios.get(`http://localhost:5000/api/text?text=${searchText}`);
        } else {
          response = await axios.get('http://localhost:5000/api/all');
        }
        setDiscussions(response.data);
        console.log(response.data,"data");
      } catch (error) {
        console.error(error);
      }
    };

    fetchDiscussions();
  }, [searchTags, searchText]);

  useEffect(() => {
    const fetchLikedDiscussions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/liked-discussions/${userId}`);
        setLikedDiscussions(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchComments = async () => {
      try {
        const commentsData = {};
        for (const discussion of discussions) {
          const response = await axios.get(`http://localhost:5000/api/comments/${discussion.discussionId}`);
          console.log(response.data,"res");
          commentsData[discussion.discussionId] = response.data;
        }
        setComments(commentsData);
      } catch (error) {
        console.error(error);
      }
    };
    

    const fetchViewCounts = async () => {
      try {
        const viewCountsData = {};
        for (const discussion of discussions) {
          const response = await axios.get(`http://localhost:5000/api/view-count/${discussion._id}`);
          viewCountsData[discussion._id] = response.data.viewCount;
        }
        setViewCounts(viewCountsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLikedDiscussions();
    fetchComments();
    fetchViewCounts();
  }, [discussions, userId]);

  const handleSearchTagsChange = (e) => {
    setSearchTags(e.target.value);
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleDeleteDiscussion = async (discussionId) => {
    try {
      await axios.delete(`http://localhost:5000/api/${discussionId}`);
      setDiscussions(discussions.filter((discussion) => discussion._id !== discussionId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditDiscussion = (discussion) => {
    setEditDiscussion(discussion);
    setNewText(discussion.text);
    setNewTags(discussion.hashTags.join(','));
    setNewImage(null);
  };

  const handleSaveEditedDiscussion = async () => {
    try {
      const formData = new FormData();
      formData.append('image', newImage);
      formData.append('text', newText);
      formData.append('hashTags', newTags.split(',').map((tag) => tag.trim()).join(','));

      const response = await axios.put(`http://localhost:5000/api/${editDiscussion._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setDiscussions(discussions.map((d) => (d._id === editDiscussion._id ? response.data : d)));
      setEditDiscussion(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLikeDiscussion = async (discussionId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/like-discussion/${discussionId}/${userId}`);
      if (response.data.liked) {
        setLikedDiscussions([...likedDiscussions, discussionId]);
      } else {
        setLikedDiscussions(likedDiscussions.filter((id) => id !== discussionId));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentDiscussion = async (discussionId) => {
    try {
      await axios.post(`http://localhost:5000/api/${discussionId}/comment`, { text: newComment[discussionId], userId });
      const response = await axios.get(`http://localhost:5000/api/comments/${discussionId}`);
      setDiscussions((prevDiscussions) =>
        prevDiscussions.map((d) => (d._id === discussionId ? { ...d, comments: response.data } : d))
      );
      setNewComment({ ...newComment, [discussionId]: '' });
    } catch (error) {
      console.error(error);
    }
  };

  const handleReplyComment = async (discussionId, commentId, reply) => {
    try {
      await axios.post(`http://localhost:5000/api/reply/${discussionId}/${commentId}`, { reply, userId });
      const response = await axios.get(`http://localhost:5000/api/comments/${discussionId}`);
      setDiscussions((prevDiscussions) =>
        prevDiscussions.map((d) => (d._id === discussionId ? { ...d, comments: response.data } : d))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleLikeComment = async (discussionId, commentId) => {
    try {
      await axios.post(`http://localhost:5000/api/${discussionId}/comment/${commentId}/like`);
      const response = await axios.get(`http://localhost:5000/api/comments/${discussionId}`);
      setDiscussions((prevDiscussions) =>
        prevDiscussions.map((d) => (d._id === discussionId ? { ...d, comments: response.data } : d))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteComment = async (discussionId, commentId) => {
    try {
      await axios.delete(`http://localhost:5000/api/${discussionId}/comment/${commentId}`);
      const response = await axios.get(`http://localhost:5000/api/comments/${discussionId}`);
      setDiscussions((prevDiscussions) =>
        prevDiscussions.map((d) => (d._id === discussionId ? { ...d, comments: response.data } : d))
      );
    } catch (error) {
      console.error(error);
    }
  };
const handleEditComment = async (discussionId, commentId, newCommentText) => {
  try {
    await axios.put(`http://localhost:5000/api/${discussionId}/comment/${commentId}`, { text: newCommentText });
    const response = await axios.get(`http://localhost:5000/api/comments/${discussionId}`);
    setDiscussions((prevDiscussions) =>
      prevDiscussions.map((d) => (d._id === discussionId ? { ...d, comments: response.data } : d))
    );
  } catch (error) {
    console.error(error);
  }
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
        <div key={discussion._id} className="bg-white shadow-md rounded-md p-4 flex flex-col justify-between">
          {editDiscussion?._id === discussion._id ? (
            <div>
              <textarea
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded mb-2"
              />
              <input
                type="text"
                value={newTags}
                onChange={(e) => setNewTags(e.target.value)}
                placeholder="Enter tags separated by commas"
                className="w-full px-3 py-2 border border-gray-300 rounded mb-2"
              />
              <input
                type="file"
                onChange={(e) => setNewImage(e.target.files[0])}
                className="mb-2"
              />
              <button
                onClick={handleSaveEditedDiscussion}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setEditDiscussion(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <p className="text-gray-700">{discussion.text}</p>
              {discussion.image && (
                <img
                  src={`data:image/jpeg;base64,${discussion.image}`}
                  alt="Discussion"
                  className="my-2 max-w-full h-auto object-cover"
                />
              )}
              <p><strong>Hash Tags:</strong> {discussion.hashTags.join(', ')}</p>
              <p><strong>Created On:</strong> {new Date(discussion.createdOn).toLocaleString()}</p>
              <p><strong>View Count:</strong> {viewCounts[discussion._id]}</p>
              <div className="mt-2">
                {discussion.hashTags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-xs font-semibold mr-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleLikeDiscussion(discussion._id)}
                  className={`${
                    likedDiscussions.includes(discussion._id) ? 'bg-red-500' : 'bg-blue-500'
                  } hover:bg-blue-600 text-white font-bold py-2 px-4 rounded`}
                >
                  {likedDiscussions.includes(discussion._id) ? 'Unlike' : 'Like'}
                </button>
                <button
                  onClick={() => handleEditDiscussion(discussion)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteDiscussion(discussion._id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={newComment[discussion._id] || ''}
                  onChange={(e) => setNewComment({ ...newComment, [discussion._id]: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded mb-2"
                />
                <button
                  onClick={() => handleCommentDiscussion(discussion._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Comment
                </button>
              </div>
              <div>
                {comments[discussion._id]?.map((comment) => (
                  <div key={comment._id} className="mt-2">
                    {editComment[comment._id] ? (
                      <div>
                        <input
                          type="text"
                          value={editComment[comment._id]}
                          onChange={(e) => setEditComment({ ...editComment, [comment._id]: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded mb-2"
                        />
                        <button
                          onClick={() => handleEditComment(discussion._id, comment._id, editComment[comment._id])}
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-2 py-1 rounded mr-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditComment({ ...editComment, [comment._id]: null })}
                          className="bg-gray-500 hover:bg-gray-600 text-white font-bold px-2 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div>
                        <p>{comment.text}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <button
                            onClick={() => handleLikeComment(discussion._id, comment._id)}
                            className="bg-gray-200 px-2 py-1 rounded"
                          >
                            Like
                          </button>
                          <button
                            onClick={() => handleReplyComment(discussion._id, comment._id, prompt('Enter your reply:'))}
                            className="bg-gray-200 px-2 py-1 rounded"
                          >
                            Reply
                          </button>
                          <button
                            onClick={() => handleDeleteComment(discussion._id, comment._id)}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold px-2 py-1 rounded"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => setEditComment({ ...editComment, [comment._id]: comment.text })}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-2 py-1 rounded"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);
}

export default DiscussionList;

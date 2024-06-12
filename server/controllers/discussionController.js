import Discussion from '../models/Discussion.js';
import {v4} from 'uuid';

// Create Discussion
export const createDiscussion = async (req, res) => {
  try {
    const { text, image, hashTags, userId } = req.body;
    console.log(text,image,hashTags,userId)
    const newDiscussion = await Discussion.create({
      discussionId:v4(),
      text,
      image,
      hashTags,
      user: userId,
    });
    res.status(201).json(newDiscussion);
  } catch (err) {
    console.log("🚀 ~ createDiscussion ~ err:", err)
    res.status(400).json({ error: err.message });
  }
};

// Update Discussion
export const updateDiscussion = async (req, res) => {
  try {
    const { text, image, hashTags } = req.body;
    const updatedDiscussion = await Discussion.findByIdAndUpdate(
      req.params.id,
      { text, image, hashTags },
      { new: true, runValidators: true }
    );
    res.status(200).json(updatedDiscussion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Discussion
export const deleteDiscussion = async (req, res) => {
  try {
    await Discussion.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Discussion deleted' });
  } catch (err) {
    console.log("🚀 ~ deleteDiscussion ~ err:", err)
    res.status(400).json({ error: err.message });
  }
};

// Get All Discussions
export const getAllDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find();
    res.status(200).json(discussions);
  } catch (err) {
    console.log("🚀 ~ getAllDiscussions ~ err:", err)
    res.status(400).json({ error: err.message });
  }
};

// Get Discussions by Tags
export const getDiscussionsByTags = async (req, res) => {
  try {
    const discussions = await Discussion.find({ hashTags: { $in: req.query.tags } });
    res.status(200).json(discussions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get Discussions by Text
export const getDiscussionsByText = async (req, res) => {
  try {
    const discussions = await Discussion.find({ text: { $regex: req.query.text, $options: 'i' } });
    res.status(200).json(discussions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Like Discussion
export const likeDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    const userId = req.body.userId;

    if (!discussion.likes.includes(userId)) {
      discussion.likes.push(userId);
    } else {
      return res.status(400).json({ error: 'You have already liked this discussion' });
    }

    await discussion.save();
    res.status(200).json(discussion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Unlike Discussion
export const unlikeDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    const userId = req.body.userId;

    if (discussion.likes.includes(userId)) {
      discussion.likes = discussion.likes.filter((id) => id.toString() !== userId);
    } else {
      return res.status(400).json({ error: 'You have not liked this discussion' });
    }

    await discussion.save();
    res.status(200).json(discussion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Comment on Discussion
export const commentOnDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    const { text, userId } = req.body;

    const newComment = {
      text,
      user: userId,
      likes: [],
    };

    discussion.comments.push(newComment);
    await discussion.save();
    res.status(200).json(discussion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Like Comment
export const likeComment = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.discussionId);
    const commentIndex = req.params.commentIndex;
    const userId = req.body.userId;

    const comment = discussion.comments[commentIndex];

    if (!comment.likes.includes(userId)) {
      comment.likes.push(userId);
    } else {
      return res.status(400).json({ error: 'You have already liked this comment' });
    }

    await discussion.save();
    res.status(200).json(discussion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Unlike Comment
export const unlikeComment = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.discussionId);
    const commentIndex = req.params.commentIndex;
    const userId = req.body.userId;

    const comment = discussion.comments[commentIndex];

    if (comment.likes.includes(userId)) {
      comment.likes = comment.likes.filter((id) => id.toString() !== userId);
    } else {
      return res.status(400).json({ error: 'You have not liked this comment' });
    }

    await discussion.save();
    res.status(200).json(discussion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update Comment
export const updateComment = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.discussionId);
    const commentIndex = req.params.commentIndex;
    const { text } = req.body;

    discussion.comments[commentIndex].text = text;
    await discussion.save();
    res.status(200).json(discussion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Comment
export const deleteComment = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.discussionId);
    const commentIndex = req.params.commentIndex;

    discussion.comments.splice(commentIndex, 1);
    await discussion.save();
    res.status(200).json(discussion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Increment View Count
export const incrementViewCount = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    discussion.viewCount++;
    await discussion.save();
    res.status(200).json(discussion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

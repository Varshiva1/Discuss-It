// userRoutes.js
import express from 'express';
import {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUsers,
  searchUserByName,
  followUser,
  unfollowUser,
} from '../controllers/userController.js';

const router = express.Router();

// Signup User Route
router.post('/signup', createUser);

// Login User Route
router.post('/login', loginUser);

// Update User Route
router.post('/users/update', updateUser);

// Delete User Route
router.post('/users/delete', deleteUser);

// Get All Users Route
router.get('/users', getAllUsers);

// Search User by Name Route
router.get('/users/search', searchUserByName);

// Follow User Route
router.post('/follow', followUser);

// Unfollow User Route
router.post('/unfollow', unfollowUser);

export default router;
//usercontroller.js
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const JWT_SECRET = '1234';

// Create User
export const createUser = async (req, res) => {
  try {
    const { name, mobileNo, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    const newUser = await User.create({
      name,
      mobileNo,
      email,
      password,
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log("🚀 ~ loginUser ~ password:", password)
      console.log("🚀 ~ loginUser ~ email:", email)
      const user = await User.findOne({ email });
      console.log("🚀 ~ loginUser ~ user:", user)
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const isMatch = await user.matchPassword(password);
      console.log("🚀 ~ loginUser ~ isMatch:", isMatch)
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: '1d',
      });
      res.status(200).json({ token,email,name:user.name,id:user._id });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  

// Update User
// export const updateUser = async (req, res) => {
//     try {
//       const { email, name, mobileNo, password } = req.body;
//       const user = await User.findOneAndUpdate(
//         { email },
//         { name, mobileNo, password },
//         { new: true, runValidators: true }
//       );
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }
//       res.status(200).json(user);
//     } catch (err) {
//       res.status(400).json({ error: err.message });
//     }
//   };

export const updateUser = async (req, res) => {
  try {
    const { name, password, mobileNo } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, mobileNo },
      { new: true, runValidators: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
  
  // Delete User
  // export const deleteUser = async (req, res) => {
  //   try {
  //     const { email } = req.body;
  //     const user = await User.findOneAndDelete({ email });
  //     if (!user) {
  //       return res.status(404).json({ error: 'User not found' });
  //     }
  //     res.status(200).json({ message: 'User deleted' });
  //   } catch (err) {
  //     res.status(400).json({ error: err.message });
  //   }
  // };
  export const deleteUser = async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'User deleted' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
// Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Search User by Name
export const searchUserByName = async (req, res) => {
  try {
    const users = await User.find({ name: { $regex: req.query.name, $options: 'i' } });
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Follow User
export const followUser = async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.currentUserId);
    const userToFollow = await User.findById(req.body.userToFollowId);

    if (!currentUser.following.includes(req.body.userToFollowId)) {
      currentUser.following.push(req.body.userToFollowId);
      userToFollow.followers.push(req.body.currentUserId);
    } else {
      return res.status(400).json({ error: 'You are already following this user' });
    }

    await currentUser.save();
    await userToFollow.save();

    res.status(200).json({ message: 'User followed successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Unfollow User
export const unfollowUser = async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.currentUserId);
    const userToUnfollow = await User.findById(req.body.userToUnfollowId);

    if (currentUser.following.includes(req.body.userToUnfollowId)) {
      currentUser.following = currentUser.following.filter(
        (userId) => userId.toString() !== req.body.userToUnfollowId
      );
      userToUnfollow.followers = userToUnfollow.followers.filter(
        (userId) => userId.toString() !== req.body.currentUserId
      );
    } else {
      return res.status(400).json({ error: 'You are not following this user' });
    }

    await currentUser.save();
    await userToUnfollow.save();

    res.status(200).json({ message: 'User unfollowed successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
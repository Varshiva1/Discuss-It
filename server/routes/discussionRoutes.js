import express from "express";
import multer from "multer";
import {
  createDiscussion,
  updateDiscussion,
  deleteDiscussion,
  getAllDiscussions,
  getDiscussionsByTags,
  getDiscussionsByText,
  likeDiscussion,
  unlikeDiscussion,
  commentOnDiscussion,
  likeComment,
  unlikeComment,
  updateComment,
  deleteComment,
  incrementViewCount,
  getCommentsByDiscussionId,
} from "../controllers/discussionController.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.post("/creatediscussion", upload.single("image"), createDiscussion);
router.put("/:id", upload.single("image"), updateDiscussion);
router.delete("/:id", deleteDiscussion);
router.get("/all", getAllDiscussions);
router.get("/tags", getDiscussionsByTags);
router.get("/text", getDiscussionsByText);
router.post("'/unlikeDiscussion/:id/:userId'", unlikeDiscussion);
router.post("/:id/comment", commentOnDiscussion);
router.post("/:discussionId/comment/:commentId", updateComment);
router.delete("/:discussionId/comment/:commentId", deleteComment);
router.post("/:id/view", incrementViewCount);
router.get("/comments/:discussionId", getCommentsByDiscussionId);
router.post('/likeDiscussion/:id/:userId', likeDiscussion);
router.post("/:discussionId/comment/:commentId/reply", replyToComment);
export default router;

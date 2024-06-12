import mongoose from 'mongoose';

const discussionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  image: { type: String },
  hashTags: [{ type: String }],
  createdOn: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [
    {
      text: { type: String, required: true },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
  ],
  viewCount: { type: Number, default: 0 },
});

const Discussion = mongoose.model('Discussion', discussionSchema);

export default Discussion;
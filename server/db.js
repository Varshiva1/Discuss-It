// db.js
import mongoose from 'mongoose';

const MONGO_URI = 'mongodb://127.0.0.1:27017/spyne';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
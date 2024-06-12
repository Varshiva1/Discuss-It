// db.js
import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://shivamvarun75:t468ujNMm02i6s22@voosh.5iujpus.mongodb.net/spyne?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error("mongo error:",err.message);
    process.exit(1);
  }
};

export default connectDB;
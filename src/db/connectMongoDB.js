import { setServers } from 'node:dns';
import mongoose from 'mongoose';

setServers(['8.8.8.8', '1.1.1.1']);

export const connectMongoDB = async () => {
  const mongoUrl = process.env.MONGO_URL;

  if (!mongoUrl) {
    throw new Error('MONGO_URL is not defined in .env file');
  }

  console.log('Connecting to MongoDB...');

  await mongoose.connect(mongoUrl, {
    dbName: 'notesdb',
    serverSelectionTimeoutMS: 10000,
  });

  console.log('✅ MongoDB connection established successfully');
};

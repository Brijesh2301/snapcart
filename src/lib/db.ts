import mongoose from "mongoose";


const mongodbUrl = process.env.MONGODB_URL;

if (!mongodbUrl) {
  throw new Error("MONGODB_URL is not defined in environment variables");
}

// Fix global type issue
declare global {
  var mongoose: { conn: mongoose.Connection | null; promise: Promise<mongoose.Connection> | null };
}

let cache = global.mongoose;
if (!cache) {
  cache = global.mongoose = { conn: null, promise: null };
}

const connectDb = async () => {
  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    cache.promise = mongoose
      .connect(mongodbUrl, {
        bufferCommands: false,
      })
      .then((conn) => conn.connection);
  }

  try {
    cache.conn = await cache.promise;
    return cache.conn;
  } catch (error) {
    cache.promise = null; // Reset so it can retry on next call
    throw error;          // Re-throw so the caller knows it failed
  }
};

export default connectDb;
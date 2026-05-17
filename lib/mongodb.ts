import mongoose from "mongoose";
import type { MongooseCache } from "@/types/database";

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cached = globalThis.mongooseCache ?? { conn: null, promise: null };

globalThis.mongooseCache = cached;

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error("Please define the MONGODB_URI environment variable.");
    }

    cached.promise = mongoose.connect(mongoUri, {
      bufferCommands: false,
      ...(process.env.MONGODB_DB ? { dbName: process.env.MONGODB_DB } : {}),
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectToDatabase;

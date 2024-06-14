import mongoose from "mongoose";

let cachedConnection: mongoose.Connection | null = null;

export async function mongooseConnect() {
  if (cachedConnection && cachedConnection.readyState === 1) {
    return cachedConnection;
  } else {
    const uri = process.env.MONGODB_URI as string;
    if (!uri) {
      throw new Error("MongoDB URI is not defined");
    }
    const connection = await mongoose.connect(uri);
    cachedConnection = connection.connection;
    console.log("Connected to MongoDB");
    return cachedConnection;
  }
}

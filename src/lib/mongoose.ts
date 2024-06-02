import mongoose from "mongoose";

export async function mongooseConnect() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  } else {
    const uri = process.env.MONGODB_URI as string;
    if (!uri) {
      throw new Error("MongoDB URI is not defined");
    }
    const connection = await mongoose.connect(uri);
    console.log("Connected to MongoDB");
    return connection;
  }
}

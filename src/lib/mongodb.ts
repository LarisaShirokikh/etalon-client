import { MongoClient } from "mongodb";
import mongoose from "mongoose";

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}


const uri = process.env.MONGODB_URI as string;


let client: MongoClient;
let clientPromise: Promise<MongoClient>;
let mongooseConnection: mongoose.Connection;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

// Подключение Mongoose
mongooseConnection = mongoose.createConnection(uri);

export { clientPromise, mongooseConnection };

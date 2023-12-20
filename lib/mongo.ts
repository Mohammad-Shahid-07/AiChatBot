import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGO_URI) {
    return console.log("MONGO_URI must be defined");
  }
  if (isConnected) {
    console.log("Already connected to database");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "chatwave",
    });
    isConnected = true;
    console.log("MongoDB connection is Made!");
  } catch (error) {
    console.log("=> error while connecting to database:", error);
  }
};

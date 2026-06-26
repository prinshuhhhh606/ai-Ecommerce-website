import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("MONGO_URL =", process.env.MONGO_URL);

    await mongoose.connect(process.env.MONGO_URL as string);

    console.log("MongoDB Connected 🚀");
    console.log("MONGO_URL =", process.env.MONGO_URL);
    console.log("Ready State =", mongoose.connection.readyState);
  } catch (error) {
    console.error("DB CONNECTION ERROR =", error);
    throw error;
  }
};

export default connectDB;

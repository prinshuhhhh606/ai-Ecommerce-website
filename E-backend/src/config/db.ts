import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("MongoDB Connected 🚀");
    console.log("MONGO_URL", process.env.MONGO_URL);
   
  } catch (err) {
    console.log("DB Error:", err);
  }
};

export default connectDB;

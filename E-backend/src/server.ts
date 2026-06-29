import app from "./app";
import dotenv from "dotenv";
dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});

import connectDB from "./config/db";

// NODE_ENV ke hisaab se env file load hogi


const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log("Environment:", process.env.NODE_ENV);
    });
  } catch (error) {
    console.error("Server start error:", error);
  }
};

startServer();

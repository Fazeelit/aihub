import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConnect = async () => {
  // Ensure MONGO_URI exists
  if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI is not defined in .env");
    process.exit(1);
  }

  try {
    // Connect to MongoDB (no deprecated options needed)
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully");

    // Optional: log connection events
    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });
    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB disconnected");
    });
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // Exit the process if DB connection fails
  }
};

export default dbConnect;

import mongoose from "mongoose";
import dns from "node:dns";
import config from "./config.js";

const attachConnectionListeners = () => {
  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected");
  });
};

const dbConnect = async () => {
  const primaryUri = config.mongodbUri;
  const fallbackUri = config.mongodbUriDirect;

  if (!primaryUri && !fallbackUri) {
    throw new Error(
      "MongoDB URI is missing. Set MONGO_URI or MONGO_URI_DIRECT in backend/.env."
    );
  }

  const connectionUris = [primaryUri, fallbackUri].filter(Boolean);
  let lastError = null;

  for (let index = 0; index < connectionUris.length; index += 1) {
    const uri = connectionUris[index];

    try {
      if (uri.startsWith("mongodb+srv://") && config.mongodbDnsServers.length > 0) {
        dns.setServers(config.mongodbDnsServers);
      }

      await mongoose.connect(uri);
      attachConnectionListeners();

      if (index === 0) {
        console.log("✅MongoDB connected successfully");
      } else {
        console.log("MongoDB connected successfully using fallback URI");
      }

      return;
    } catch (error) {
      lastError = error;

      if (index < connectionUris.length - 1) {
        console.warn(
          `Primary MongoDB connection failed: ${error.message}. Trying fallback URI...`
        );
      }
    }
  }

  throw new Error(
    `MongoDB connection failed: ${lastError?.message || "Unknown error"}`
  );
};

export default dbConnect;

import express from "express";
import morgan from "morgan";
import cors from "cors";
import http from "http";

import dbConnect from "./config/database.js";
import config from "./config/config.js";

// ------------------ Routes ------------------
import userRoutes from "./routes/usersroute.js";
import adminRoutes from "./routes/adminroute.js";

const app = express();

// ------------------ CORS ------------------
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173"
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow mobile apps, postman, server-to-server
      if (!origin) return callback(null, true);

      // allow local + vercel
      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app")
      ) {
        return callback(null, true);
      }

      return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Express 5 rejects bare "*" here, so use a regex wildcard instead.
app.options(/.*/, cors());

// ------------------ Middleware ------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ------------------ Root ------------------
app.get("/", (req, res) => {
  res.json({ message: "Backend is running!" });
});

// ------------------ API Routes ------------------
app.use("/api/users", userRoutes);
app.use("/api/admins", adminRoutes);

// ------------------ 404 API ------------------
app.all(/^\/api\/.*$/, (req, res) => {
  res.status(404).json({ message: "API route not found" });
});

// ------------------ Error Handler ------------------
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err);
  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
});

// ------------------ Server ------------------
const PORT = process.env.PORT || config.port || 8080;
const HOST = "0.0.0.0";

const server = http.createServer(app);

// safer timeout for Render
server.timeout = 0;

const startServer = async () => {
  try {
    await dbConnect();

    server.listen(PORT, HOST, () => {
      console.log(`🚀 Server running on http://${HOST}:${PORT}`);
    });
  } catch (error) {
    console.error("❌ DB Connection Error:", error.message);
    process.exit(1);
  }
};

startServer();

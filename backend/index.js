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
const allowedOrigins = ["http://localhost:3000"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) return callback(null, true);

      if (origin.endsWith(".vercel.app")) return callback(null, true);

      return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Preflight handler
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

// ------------------ Middleware ------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ------------------ Root ------------------
app.get("/", (req, res) => {
  res.send("Backend is running!");
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
  console.error("Error:", err);
  res.status(500).json({ message: err.message || "Internal Server Error" });
});

// ------------------ Server ------------------
const PORT = config.port || 8080;
const HOST = "0.0.0.0";

const server = http.createServer(app);
server.timeout = 5 * 60 * 1000;

const startServer = async () => {
  try {
    await dbConnect();

    server.listen(PORT, HOST, () => {
      console.log(`Server running at http://${HOST}:${PORT}`);
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

startServer();

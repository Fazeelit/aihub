// server.js
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";

// Load environment variables
dotenv.config();

// ------------------ Database ------------------
import dbConnect from "./config/database.js";
dbConnect();

// ------------------ Config ------------------
import config from "./config/config.js";

// ------------------ Routes ------------------
import adminRoutes from "./routes/adminroute.js";
import userRoutes from "./routes/usersroute.js";

const app = express();

/*
=====================================================
 CORS Middleware (LAN Safe Production Version)
=====================================================
*/

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || origin === "null") return callback(null, true);

      const allowedOrigins = (process.env.WEBAPP_URL || "")
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);

      const isAllowed =
        allowedOrigins.includes(origin) ||
        /^https?:\/\/(192\.168|10\.|172\.(1[6-9]|2\d|3[0-1]))/.test(origin) ||
        /^https?:\/\/localhost/.test(origin) ||
        /^https?:\/\/127\.0\.0\.1/.test(origin);

      if (isAllowed) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

/*
=====================================================
 Express Middleware
=====================================================
*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

/*
=====================================================
 Root Route
=====================================================
*/

app.get("/", (req, res) => {
  res.send("Backend is running");
});

/*
=====================================================
 API Routes
=====================================================
*/

app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);

/*
=====================================================
 404 API Handler
=====================================================
*/

app.all(/^\/api\/.*/, (req, res) => {
  res.status(404).json({ message: "API route not found" });
});

/*
=====================================================
 Global Error Handler
=====================================================
*/

app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ message: err.message });
  }

  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

/*
=====================================================
 Server Start
=====================================================
*/

const PORT = config.port || 8080;
const HOST = "0.0.0.0";

const server = http.createServer(app);

server.timeout = 5 * 60 * 1000;

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});

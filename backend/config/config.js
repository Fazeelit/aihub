import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const envCandidates = [
  path.join(projectRoot, ".env"),
  path.resolve(process.cwd(), ".env"),
  path.resolve(process.cwd(), "backend/.env"),
];

const resolvedEnvPath = envCandidates.find((candidate) => fs.existsSync(candidate));

if (resolvedEnvPath) {
  dotenv.config({ path: resolvedEnvPath });
} else {
  dotenv.config();
}

console.log(
  `Loaded environment variables from ${resolvedEnvPath || "process environment"}`
);

export default {
  port: process.env.PORT || 8000,
  host: process.env.HOST || "0.0.0.0",

  // MongoDB
  mongodbUri: process.env.MONGO_URI || "",
  mongodbUriDirect: process.env.MONGO_URI_DIRECT || "",
  mongodbDnsServers: (process.env.MONGODB_DNS_SERVERS || "8.8.8.8,1.1.1.1")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean),

  // JWT
  jwtSecret: process.env.JWT_SECRET || "default_secret_key",
  jwtAlgorithm: process.env.JWT_ALGORITHM || "HS256",
  jwtExpiresIn: process.env.JWT_EXPIRE_IN || "1h",
  jwtIssuer: process.env.JWT_ISSUER || "default_issuer",
  jwtAudience: process.env.JWT_AUDIENCE || "default_audience",

  // Email (optional)
  emailHost: process.env.EMAIL_HOST,
  emailPort: process.env.EMAIL_PORT,
  emailUser: process.env.EMAIL_USER,
  emailPassword: process.env.EMAIL_PASSWORD,
  emailFrom: process.env.EMAIL_FROM,

  // Frontend URLs (CORS)
  webAppUrl: process.env.WEBAPP_URL ? process.env.WEBAPP_URL.split(",") : [],

  // Cloudinary
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
};

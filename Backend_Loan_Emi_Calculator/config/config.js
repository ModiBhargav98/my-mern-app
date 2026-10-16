const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

// Env file is chosen by NODE_ENV (NOT by git branch):
//   npm run dev / npm start  -> .env.development
//   npm run start:prod       -> .env.production
const env = process.env.NODE_ENV === "production" ? "production" : "development";
const envFile = path.resolve(__dirname, `../.env.${env}`);

if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
  console.log(`Loaded environment: ${env} (${path.basename(envFile)})`);
} else {
  console.warn(`Warning: ${path.basename(envFile)} not found, using system environment variables`);
}
// Optional fallback (.env) - does not override values already set
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const required = ["MONGO_URI", "JWT_SECRET"];
const missing = required.filter((key) => !process.env[key]);
if (missing.length) {
  console.error(`Error: Missing required environment variables: ${missing.join(", ")}`);
  process.exit(1);
}

const config = {
  NODE_ENV: env,
  PORT: process.env.PORT || 4000,
  DB_URl: process.env.MONGO_URI,
  secretKey: process.env.JWT_SECRET,
  algorithm: "HS256",
};

module.exports = config;

const path = require("path");
const dotenv = require("dotenv");

const env = process.env.NODE_ENV === "production" ? "production" : "development";
dotenv.config({ path: path.resolve(__dirname, `../.env.${env}`) });
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const config = {
  PORT: process.env.PORT || 4000,
  DB_URl: process.env.MONGO_URI,
  secretKey: process.env.JWT_SECRET,
  algorithm: "HS256",
};

module.exports = config;

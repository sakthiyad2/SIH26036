require("dotenv").config();

const config = {
  // =========================
  // SERVER
  // =========================
  PORT: Number(process.env.PORT) || 5000,

  NODE_ENV: process.env.NODE_ENV || "development",

  // =========================
  // RAILWAY MYSQL
  // =========================
  DB_HOST: process.env.MYSQLHOST || process.env.DB_HOST || "127.0.0.1",

  DB_PORT:
    Number(process.env.MYSQLPORT || process.env.DB_PORT) || 3306,

  DB_USER:
    process.env.MYSQLUSER || process.env.DB_USER || "root",

  DB_PASSWORD:
    process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || "",

  DB_NAME:
    process.env.MYSQLDATABASE || process.env.DB_NAME || "railway",

  // =========================
  // JWT
  // =========================
  JWT_SECRET:
    process.env.JWT_SECRET || "change-this-secret",

  JWT_EXPIRES_IN:
    process.env.JWT_EXPIRES_IN || "7d",

  // =========================
  // FRONTEND
  // =========================
  FRONTEND_URL:
    process.env.FRONTEND_URL || "http://localhost:5173",
};

module.exports = config;

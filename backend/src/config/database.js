const mysql = require("mysql2/promise");
const config = require("./config");

const pool = mysql.createPool({
  host: config.DB_HOST,
  port: config.DB_PORT,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection
async function testDatabaseConnection() {
  try {
    const connection = await pool.getConnection();

    console.log("MySQL database connected successfully");

    connection.release();

    return true;
  } catch (error) {
    console.error("MySQL database connection failed:");
    console.error(error.message);

    return false;
  }
}

module.exports = {
  pool,
  testDatabaseConnection
};
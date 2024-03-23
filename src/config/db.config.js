const mysql = require("mysql2");
const { logger } = require("../utils/logger");
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = require("../utils/secrets");

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// pool.getConnection((err, connection) => {
//   if (err) logger.error(err.message);
//   else console.log("Database connected successfully");
//   connection.release();
// });

module.exports = pool;

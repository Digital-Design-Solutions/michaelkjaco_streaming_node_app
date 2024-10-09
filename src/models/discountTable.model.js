const mysql = require("mysql2");
const { logger } = require("../utils/logger");

// Create a connection to the database
const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// Connect to the database
con.connect(err => {
  if (err) throw err;
  logger.info("MySQL Connected");
});

// Create the Discount Table
const createDiscountTable = () => {
  const sql = `CREATE TABLE IF NOT EXISTS Discount (
    discount_id INT AUTO_INCREMENT PRIMARY KEY,
    discount_name VARCHAR(255),
    discount_code VARCHAR(255),
    discount_percentage VARCHAR(50),
    usage_limit INT,
    discount_description VARCHAR(255),
    status Boolean,
    start_date DATETIME,
    end_date DATETIME
  )`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    logger.info("Discount Table created");
  });
};

// Function to insert a new discount
const insertDiscount = (discountData, callback) => {
  const sql = "INSERT INTO Discount SET ?";
  con.query(sql, discountData, (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

// Function to get all discounts
const getAllDiscounts = (callback) => {
  const sql = "SELECT * FROM Discount";
  con.query(sql, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

// Function to get a discount by ID
const getDiscountById = (id, callback) => {
  const sql = `SELECT * FROM Discount WHERE discount_id = ?`;
  con.query(sql, [id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

// Function to update a discount by ID
const updateDiscountById = (id, discountData, callback) => {
  const sql = "UPDATE Discount SET ? WHERE discount_id = ?";
  con.query(sql, [discountData, id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

// Function to delete a discount by ID
const deleteDiscountById = (id, callback) => {
  const sql = `DELETE FROM Discount WHERE discount_id = ?`;
  con.query(sql, [id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

module.exports = {
  createDiscountTable,
  insertDiscount,
  getAllDiscounts,
  getDiscountById,
  updateDiscountById,
  deleteDiscountById
};

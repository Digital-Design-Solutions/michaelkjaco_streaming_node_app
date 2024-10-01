const mysql = require("mysql2");
const { logger } = require("../utils/logger");

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  });

// Function to insert a new users
const insertCustomer = (discountData, callback) => {
  const sql = "INSERT INTO users SET ?";
  con.query(sql, discountData, (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

// Function to get all users
const getAllCustomers = (callback) => {
  const sql = "SELECT * FROM users";
  con.query(sql, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

// Function to get a user by ID
const getCustomerById = (id, callback) => {
  const sql = `SELECT * FROM users WHERE id = ?`;
  con.query(sql, [id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

// Function to update a user by ID
const updateCustomerById = (id, userData, callback) => {
  const sql = "UPDATE users SET ? WHERE id = ?";
  con.query(sql, [userData, id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

// Function to delete a user by ID
const deleteCustomerById = (id, callback) => {
  const sql = `DELETE FROM users WHERE id = ?`;
  con.query(sql, [id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

module.exports = {
  insertCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById
};

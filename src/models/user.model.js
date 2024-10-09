const bcrypt = require("bcrypt");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// Function to register a new user
const registerUser = (userData, callback) => {
  bcrypt.hash(userData.password, 10, (err, hash) => {
    if (err) return callback(err);
    userData.password = hash; // Replace plain password with hashed version

    const sql = "INSERT INTO users SET ?";
    con.query(sql, userData, (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    });
  });
};

// Login function (for later use)
const loginUser = (email, password, callback) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  con.query(sql, [email], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) return callback("User not found");

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return callback(err);
      if (!isMatch) return callback("Incorrect password");

      // Generate a JWT token (optional)
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });

      callback(null, { message: "Login successful", token });
    });
  });
};

module.exports = {
  registerUser,
  loginUser,
};

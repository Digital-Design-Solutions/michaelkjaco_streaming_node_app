const express = require("express");
const router = express.Router();
const { logger } = require("../utils/logger");
const userModel = require("../models/user.model");

// Register a new user
router.post("/api/register", (req, res) => {
  const userData = req.body;

  userModel.registerUser(userData, (err, result) => {
    if (err) {
      logger.error(err);
      return res.status(500).json({ error: "Error registering user" });
    }
    res.json({ message: "User registered successfully" });
  });
});

// Login user API
router.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  userModel.loginUser(email, password, (err, result) => {
    if (err) {
      logger.error(err);
      return res.status(400).json({ error: err });
    }
    res.json(result);
  });
});

module.exports = router;

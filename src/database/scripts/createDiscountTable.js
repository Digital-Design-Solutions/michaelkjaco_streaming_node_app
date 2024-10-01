const Discount = require('../../models/discount.model');

Discount.createTable()
  .then(() => console.log("Discount table created"))
  .catch(err => console.error("Failed to create Discount table:", err));

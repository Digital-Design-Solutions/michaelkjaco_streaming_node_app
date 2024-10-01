const express = require('express');
const router = express.Router();
const { logger } = require('../utils/logger');
const discountModel = require('../models/discountTable.model');

// Initialize the table (if not already created)
discountModel.createDiscountTable();

// Create a new discount (POST)
router.post('/api/discounts', (req, res) => {
    console.log('POST request received at /api/discounts');
  const discountData = req.body;
  discountModel.insertDiscount(discountData, (err, result) => {
    if (err) {
      logger.error(err);
      return res.status(500).send("Error adding discount");
    }
    res.send("Discount added successfully");
  });
});

// Get all discounts (GET)
router.get('/api/discounts', (req, res) => {
  discountModel.getAllDiscounts((err, results) => {
    if (err) {
      logger.error(err);
      return res.status(500).send("Error fetching discounts");
    }
    res.json(results);
  });
});

// Get a discount by ID (GET)
router.get('/api/discounts/:id', (req, res) => {
  discountModel.getDiscountById(req.params.id, (err, result) => {
    if (err) {
      logger.error(err);
      return res.status(500).send("Error fetching discount");
    }
    res.json(result);
  });
});

// Update a discount by ID (PUT)
router.put('/api/discounts/:id', (req, res) => {
  const discountData = req.body;
  discountModel.updateDiscountById(req.params.id, discountData, (err, result) => {
    if (err) {
      logger.error(err);
      return res.status(500).send("Error updating discount");
    }
    res.send("Discount updated successfully");
  });
});

// Delete a discount by ID (DELETE)
router.delete('/api/discounts/:id', (req, res) => {
  discountModel.deleteDiscountById(req.params.id, (err, result) => {
    if (err) {
      logger.error(err);
      return res.status(500).send("Error deleting discount");
    }
    res.send("Discount deleted successfully");
  });
});

module.exports = router;

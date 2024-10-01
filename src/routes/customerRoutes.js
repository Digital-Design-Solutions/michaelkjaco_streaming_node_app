const express = require('express');
const router = express.Router();
const { logger } = require('../utils/logger');
const customerModel = require('../models/customer.model');

// Create a new user (POST)
router.post('/api/customers', (req, res) => {
    console.log('POST request received at /api/customers');
  const customerData = req.body;
  customerModel.insertCustomer(customerData, (err, result) => {
    if (err) {
      logger.error(err);
      return res.status(500).send("Error adding customer");
    }
    res.send("User added successfully");
  });
});

// Get all users (GET)
router.get('/api/customers', (req, res) => {
  customerModel.getAllCustomers((err, results) => {
    if (err) {
      logger.error(err);
      return res.status(500).send("Error fetching customers");
    }
    res.json(results);
  });
});

// Get a user by ID (GET)
router.get('/api/customers/:id', (req, res) => {
  customerModel.getCustomerById(req.params.id, (err, result) => {
    if (err) {
      logger.error(err);
      return res.status(500).send("Error fetching customers");
    }
    res.json(result);
  });
});

// Update a user by ID (PUT)
router.put('/api/customers/:id', (req, res) => {
  const customerData = req.body;
  customerModel.updateCustomerById(req.params.id, customerData, (err, result) => {
    if (err) {
      logger.error(err);
      return res.status(500).send("Error updating customer");
    }
    res.send("Customer updated successfully");
  });
});

// Delete a user by ID (DELETE)
router.delete('/api/customers/:id', (req, res) => {
  customerModel.deleteCustomerById(req.params.id, (err, result) => {
    if (err) {
      logger.error(err);
      return res.status(500).send("Error deleting customer");
    }
    res.send("Customer deleted successfully");
  });
});

module.exports = router;

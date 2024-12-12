const express = require('express');
const mongoose = require('mongoose');
const Restaurant = require('../models/restaurant'); // Import the Restaurant model

const router = express.Router();
router.use(express.json()); // Middleware to parse JSON bodies

// GET /api/restaurants
router.get('/api/restaurants', async (req, res) => {
  const page = req.query.page || 1; // Get the page number from query params, default to 1
  const limit = 10; // Number of items per page
  const skip = (page - 1) * limit; // Calculate the number of items to skip

  try {
    const restaurants = await Restaurant.find()
      .skip(skip)
      .limit(limit); // Fetch restaurants with pagination
    res.json(restaurants); // Send the list of restaurants as JSON
  } catch (err) {
    res.status(500).json({ message: 'Error fetching restaurants' }); // Handle errors
  }
});

// POST /api/restaurants
router.post('/api/restaurants', async (req, res) => {
  try {
    const restaurant = new Restaurant(req.body); // Create a new restaurant from the request body
    await restaurant.save(); // Save the restaurant to the database
    res.json(restaurant); // Send the saved restaurant as JSON
  } catch (err) {
    res.status(400).json({ message: 'Error creating restaurant' }); // Handle errors
  }
});

// DELETE /api/restaurants/:_id
router.delete('/api/restaurants/:_id', async (req, res) => {
  try {
    await Restaurant.findByIdAndRemove(req.params._id); // Find and remove the restaurant by ID
    res.json({ message: 'Restaurant deleted successfully' }); // Send success message
  } catch (err) {
    res.status(404).json({ message: 'Restaurant not found' }); // Handle errors
  }
});

module.exports = router; // Export the router
const express = require('express');
const router = express.Router();
const Breed = require('../models/Breed');

// GET all breeds
router.get('/', async (req, res) => {
  try {
    const breeds = await Breed.find();
    res.render('index', { breeds });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Other routes (POST, DELETE, etc.) should be defined similarly

module.exports = router;


// Get form for creating a new breed
router.get('/new', (req, res) => {
  res.render('form', { breed: {}, action: '/breeds', method: 'POST' });
});

// Create a new breed
router.post('/', async (req, res) => {
  const breed = new Breed(req.body);
  try {
    await breed.save();
    res.redirect('/breeds');
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get form for editing a breed
router.get('/:id/edit', async (req, res) => {
  try {
    const breed = await Breed.findById(req.params.id);
    res.render('form', { breed, action: `/breeds/${req.params.id}`, method: 'POST' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a breed
router.post('/:id', async (req, res) => {
  try {
    await Breed.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/breeds');
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a breed
router.post('/:id/delete', async (req, res) => {
  try {
    await Breed.findByIdAndDelete(req.params.id);
    res.redirect('/breeds');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

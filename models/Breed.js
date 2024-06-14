const mongoose = require('mongoose');

const BreedSchema = new mongoose.Schema({
  breed: { type: String, required: true },
  description: { type: String, required: true },
  origin: { type: String, required: true },
  life_span: { type: String, required: true },
  temperament: { type: String, required: true },
  image_url: { type: String, required: true }
});

module.exports = mongoose.model('Breed', BreedSchema);

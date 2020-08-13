const mongoose = require('mongoose');

// Schemas
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The name for the tour is required'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'The price for the tour is required'],
  },
});
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

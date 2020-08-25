const mongoose = require('mongoose');

// Schemas
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The name for the tour is required'],
    unique: true,
  },
  durations: {
    type: Number,
    required: [true, 'The tour must has a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'The tour must have a group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'The tour must have a difficulty level'],
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

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

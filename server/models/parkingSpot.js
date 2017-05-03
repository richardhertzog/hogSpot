const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const parkingSchema = new Schema({
  location: String,
  paid: Boolean,
});

module.exports = mongoose.model('parkingSpot', parkingSchema);

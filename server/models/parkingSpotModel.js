const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const parkingSchema = new Schema({
  lat: String,
  lng: String,
  paid: Boolean,
});

module.exports = mongoose.model('parkingSpot', parkingSchema);

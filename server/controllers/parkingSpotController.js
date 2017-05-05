const ParkingSpot = require('../models/parkingSpotModel');

exports.createParkingSpot = (req, res) => {
  const { lat, lng, paid } = req.body;
  const parkingSpot = new ParkingSpot({ lat, lng, paid });
  parkingSpot.save()
    .then(response => res.status(200).send(response))
    .catch(() => res.status(422).send({ error: 'could not save parking spot' }));
};

exports.getParkingSpots = (req, res) => {
  ParkingSpot.find()
    .then(parkingSpots => res.status(200).send(parkingSpots))
    .catch(() => res.status(422).send({ error: 'could not get parking spots' }));
};

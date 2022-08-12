const drones = [
    { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
    { name: "Racer 57", propellers: 4, maxSpeed: 20 },
    { name: "Courier 3000i", propellers: 6, maxSpeed: 18 }
  ];

const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/lab-express-drones";
const Drone  = require("../models/Drone.model.js")

mongoose
  .connect(MONGO_URI)
  // .connect(MONGO_URI, {family: 4})
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .then(() => {
    // return Drone.deleteMany()
    return Drone.create(drones)
      .then((results) => console.log('Drones created: ', results))
  })
  .then(() => {
    mongoose.disconnect()
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
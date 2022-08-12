const express = require('express');
const Drone = require('../models/Drone.model')
const router = express.Router();

// require the Drone model here

router.get('/drones', (req, res) => {
  // Iteration #2: List the drones
  // ... your code here
  Drone.find()
    .then((drones) => {
      // console.log(drones)
      res.render('drones/list', {drones})
    })
    .catch((err) => {
      console.log(err)
  })
});

router.get('/drones/create', (req, res) => {
  // Iteration #3: Add a new drone
  // ... your code here
      res.render('drones/create-form')
});

router.post('/drones/create', (req, res) => {
  // Iteration #3: Add a new drone
  // ... your code here
  const { name, propellers, maxSpeed } = req.body;

  Drone.create({ name, propellers, maxSpeed })
    .then(() => res.redirect("/"))
    .catch((error) => `Error while creating a drone: ${error}`);
});

router.get('/drones/:id/edit', (req, res) => {
  // Iteration #4: Update the drone
  // ... your code here
  const { id } = req.params

  Drone.findById(id)
    .then((droneToEdit) => res.render('drones/update-form', droneToEdit))
    .catch((error) =>
        console.log("Error while updating the drone: ", error)
    );
});

router.post('/drones/:id/edit', (req, res) => {
  // Iteration #4: Update the drone
  // ... your code here
  const {id} = req.params
  const {name, propellers, maxSpeed} = req.body

  Drone.findByIdAndUpdate(
    id,
    {name, propellers, maxSpeed},
    {new: true}
  )
    .then(() => res.redirect('/drones'))
    .catch((error) =>
        console.log(`Error while updating a single book: ${error}`)
    );
});

router.post('/drones/:id/delete', (req, res) => {
  // Iteration #5: Delete the drone
  // ... your code here
   const {id} = req.params

   Drone.findByIdAndDelete(id)
     .then(() => res.redirect("/"))
     .catch((error) => console.log(`Error while deleting a drone: ${error}`));

});

module.exports = router;

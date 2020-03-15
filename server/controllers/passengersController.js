const db = require("../config/db");
// @desc    Get all passengers
// @route   GET /api/v1/pasajeros
// @access  Public
exports.getPassengers = (req, res, next) => {
  const { name, address } = req.query;
  db.any("SELECT * FROM info_pasajero_view", [true])
    .then(passengers => {
      if (name) {
        passengers = passengers.filter(p => p.nombre === name);
      }
      if (address) {
        passengers = passengers.filter(p => p.direccion_residencia === address);
      }
      res.status(200).json(
        //passengers.filter(passenger => passenger.nombre === req.user.username)
        { success: true, count: passengers.length, data: passengers }
      );
    })
    .catch(error => {
      res.sendStatus(500).json({ success: false, error: "Server error" });
      console.log("Error: ", error);
    });
};

// @desc    Add passenger
// @route   POST /api/v1/pasajeros
// @access  Public
exports.addPassenger = (req, res, next) => {
  res.send("POST passenger");
};

// @desc    Delete passenger
// @route   DELETE /api/v1/pasajeros/:id
// @access  Public
exports.deletePassenger = (req, res, next) => {
  res.send("DELETE passenger");
};

// @desc    Update passenger
// @route   UPDATE /api/v1/pasajeros/:id
// @access  Public
exports.updatePassenger = (req, res, next) => {
  res.send("UPDATE passenger");
};

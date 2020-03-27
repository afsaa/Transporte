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
      return res.status(200).json(
        //passengers.filter(passenger => passenger.nombre === req.user.username)
        { success: true, count: passengers.length, data: passengers }
      );
    })
    .catch(error => {
      console.log("Error: ", error);
      return res.status(500).json({ success: false, error: "Server error" });
    });
};

// @desc    Add passenger
// @route   POST /api/v1/pasajeros
// @access  Public
exports.addPassenger = (req, res, next) => {
  const { name, address, birthday } = req.body;
  db.any(
    "INSERT INTO pasajero (nombre, direccion_residencia, fecha_nacimiento) VALUES($1, $2, $3)",
    [name, address, birthday]
  )
    .then(() => {
      return res.status(201).json({ success: true, data: req.body });
    })
    .catch(error => {
      console.log("Error: ", error);
      return res.status(500).json({ success: false, error: "Server error" });
    });
};

// @desc    Delete passenger
// @route   DELETE /api/v1/pasajeros/:id
// @access  Public
exports.deletePassenger = (req, res, next) => {
  const { id } = req.params;
  db.any(`DELETE from pasajero WHERE id=${id}`, [true])
    .then(() => {
      return res.status(200).json({
        success: true,
        message: `Passenger with id ${req.params.id} deleted successfully!`
      });
    })
    .catch(error => {
      console.log(error);
      return res
        .status(404)
        .json({ success: false, error: "We couldn't find that passenger" });
    });
};

// @desc    Update passenger
// @route   UPDATE /api/v1/pasajeros/:id
// @access  Public
exports.updatePassenger = (req, res, next) => {
  res.send("UPDATE passenger");
};

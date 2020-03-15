// @desc    Get all passengers
// @route   GET /api/v1/pasajeros
// @access  Public
exports.getPassengers = (req, res, next) => {
  res.send("GET passengers");
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

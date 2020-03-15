const express = require("express");
const router = express.Router();
const {
  getPassengers,
  addPassenger,
  deletePassenger
} = require("../controllers/passengersController");

router
  .route("/")
  .get(getPassengers)
  .delete(deletePassenger);

module.exports = router;

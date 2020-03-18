require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const passengersRoutes = require("./routes/passengers");
const db = require("./config/db");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const apicache = require("apicache");
let cache = apicache.middleware;

//app.use(cache("5 minutes"));
const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 8080;
// Starting the server
app.listen(port, () => {
  console.log("Listening on port 8080...");
});

// Creating API endpoints

// Passengers endpoints
app.use("/api/v1/pasajeros", passengersRoutes);

// Get 10 passengers
app.get("/api/pasajeros", authenticateToken, (req, res) => {
  const { name, address } = req.query;
  db.any("SELECT * FROM info_pasajero_view LIMIT 10", [true])
    .then(passengers => {
      if (name) {
        passengers = passengers.filter(p => p.nombre === name);
      }
      if (address) {
        passengers = passengers.filter(p => p.direccion_residencia === address);
      }
      res.json(
        //passengers.filter(passenger => passenger.nombre === req.user.username)
        { success: true, data: passengers }
      );
    })
    .catch(error => {
      res
        .sendStatus(500)
        .json({ success: false, error: "Internal server error" });
      console.log("Error: ", error);
    });
});

// Add a new passenger
app.post("/api/pasajeros", authenticateToken, (req, res) => {
  const { name, address, birthday } = req.body;

  db.any(
    `INSERT INTO pasajero 
	VALUES('${name}', '${address}', '${birthday}')`,
    [true]
  )
    .then(() => {
      //res.json(data);
      res.sendStatus(200).json({ success: "Passenger created successfully!" });
    })
    .catch(error => {
      res.sendStatus(500).json({ error: "Internal server error" });
      //console.log("Error: ", error);
    });
  res.json(req.body);
});

// Update passenger
app.put("/api/pasajeros/:id", authenticateToken, (req, res) => {
  const { name, address, birthday } = req.body;
  db.any(
    `UPDATE pasajero SET nombre='${name}', direccion_residencia='${address}', fecha_nacimiento='${birthday}' WHERE id=${req.params.id}`,
    [true]
  )
    .then(() => {
      res.sendStatus(200).json({
        success: `Passenger with id ${req.params.id} updated successfully!`
      });
    })
    .catch(error => {
      res.sendStatus(400).json({ error: "We couldn't find that passenger" });
      console.log(error);
    });
});

// Delete a passenger
app.delete("/api/pasajeros/:id", authenticateToken, (req, res) => {
  db.any(`DELETE from pasajero WHERE id=${req.params.id}`, [true])
    .then(() => {
      res.sendStatus(200).json({
        success: `Passenger with id ${req.params.id} deleted successfully!`
      });
    })
    .catch(error => {
      res.sendStatus(400).json({ error: "We couldn't find that passenger" });
      console.log(error);
    });
});

//Authenticate user
app.post("/authentication", (req, res) => {
  const { username, password } = req.body;
  const userCredentials = { username, password };
  const accessToken = jwt.sign(
    userCredentials,
    process.env.ACCESS_TOKEN_SECRET
  );
  res.json({ token: accessToken });
});

// Middleware to verify token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

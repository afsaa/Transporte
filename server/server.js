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

// Passengers endpoints
app.use("/api/v1/pasajeros", authenticateToken, passengersRoutes);

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

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 8080;
const monitor = require("pg-monitor");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

const dbConfig = {
  host: "localhost",
  port: 5432,
  database: "transporte",
  user: "postgres",
  password: "andressaa94"
};

const initOptions = {
  // global event notification;
  error(error, e) {
    if (e.cn) {
      // A connection-related error;
      //
      // Connections are reported back with the password hashed,
      // for safe errors logging, without exposing passwords.
      console.log("CN:", e.cn);
      console.log("EVENT:", error.message || error);
    }
  }
};

monitor.attach(initOptions);
monitor.setTheme("matrix");

const pgp = require("pg-promise")(initOptions);
const db = pgp(dbConfig);

const passengers = [];

// Starting the server
app.listen(port, () => {
  console.log("Listening on port 8080...");
});

// Creating API endpoints
app.get("/api/pasajeros", (req, res) => {
  db.any("SELECT * FROM info_pasajero_view LIMIT 10", [true])
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.json("Something went wrong, please try again.");
      console.log("Error: ", error);
    });
});

app.post("/api/pasajeros", (req, res) => {
  // Add a new passenger
  res.json(req.body);
});

app.put("/api/pasajeros/:id", (req, res) => {
  // Update passenger
  const { name, address, birthday } = req.body;
  db.any(
    `UPDATE pasajero SET nombre='${name}', direccion_residencia='${address}', fecha_nacimiento='${birthday}' WHERE id=${req.params.id}`,
    [true]
  )
    .then(data => {
      res.status(200).json({ success: "Passenger updated successfully!" });
    })
    .catch(error => {
      res.status(400).json({ error: "We couldnt find that passenger" });
      console.log(error);
    });
});

app.delete("/api/pasajeros/:id", (req, res) => {
  // Delete a passenger
  res.json({ deleted: id });
});

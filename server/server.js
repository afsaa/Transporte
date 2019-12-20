const express = require("express");
const app = express();
const port = 8080;
const monitor = require("pg-monitor");

const dbConfig = {
    "host": "localhost",
    "port": 5432,
    "database": "transporte",
    "user": "postgres",
    "password": "andressaa94"
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
            console.log("Error: ", error);
        });
});

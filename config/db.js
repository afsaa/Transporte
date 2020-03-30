const monitor = require("pg-monitor");

const dbConfig = {
  host: "localhost",
  port: 5432,
  database: "transporte",
  user: "postgres",
  password: "andressaa94"
};

const connectionString =
  "postgres://ltcrdtrmtdblde:f2738663ff2857ed67750cd44d49ef60a3f9de1108fcb94b3e94f2a285aae58b@ec2-18-235-20-228.compute-1.amazonaws.com:5432/dcm8ern3k09onn";
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

const pgp = require("pg-promise")(initOptions);
const db = pgp(
  process.env.NODE_ENV === "production" ? connectionString : dbConfig
);

monitor.attach(initOptions);
monitor.setTheme("matrix");

module.exports = db;

const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: "true",
});

const db = mongoose.connection;

db.on("connected", () => console.log("Mongo DB connection successfull"));

db.on("error", (err) => console.log("Mongo DB connection failed"));

module.exports = db;

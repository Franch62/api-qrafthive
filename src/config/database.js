const mongoose = require("mongoose");

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose
      .connect(
        "mongodb+srv://" + process.env.DATABASE_STRING
      )
      .then(() => console.log("Connected to MongoDB"))
      .catch((err) => console.error("Could not connect to MongoDB", err));
  }
}

module.exports = new Database();

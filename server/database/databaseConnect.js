const mongoose = require("mongoose");
require("dotenv").config();

const database = process.env.DATABASE;

const databaseConnect = async () => {
  try {
    await mongoose.connect(database);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed");
  }
};

module.exports = databaseConnect;

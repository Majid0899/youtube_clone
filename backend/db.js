import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const createConnection = () => {
  /*Set up the connection  and Define the mongodb connectin url*/
  const mongoUrl = process.env.MONGO_URL;
  mongoose.connect(mongoUrl);

  /* It define an object which responsible to perform some action */
  const db = mongoose.connection;

  //Define an event listener

  db.on("connected", () => {
    console.log("Connected to Mongodb server");
  });
  db.on("error", (error) => {
    console.error("MongoDB connection error:", error);
  });
  db.on("disconnected", () => {
    console.log("Disconnected from MongoDB");
  });
};
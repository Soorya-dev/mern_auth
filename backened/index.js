import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.log(err);
});
const app = express();

// Define a route for the root path
app.get("/", (req, res) => {
  res.send("Welcome to the Express server!");
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});

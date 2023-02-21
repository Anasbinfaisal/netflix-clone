const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("../netflix-api/routes/UserRoutes");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());


const uri = process.env.MONGODB_URI;

mongoose
  // .connect("mongodb://127.0.0.1:27017/netflix", {
  .connect(!uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected");
  });

app.use("/api/user", userRoutes);

app.listen(5000, console.log("server started"));

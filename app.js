const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const feedRoutes = require("./routes/feed");

const app = express();

app.use(bodyparser.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feed", feedRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

mongoose
  .connect(
    `mongodb+srv://s1kness:Nick736101***@cluster0.hhfdpc6.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));

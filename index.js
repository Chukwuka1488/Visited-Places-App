const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Place = require("./models/Place");

//Set up default mongoose connection
const mongoDB = "mongodb://127.0.0.1/visitedPlaces";
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
//Get the default connection
const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("============================");
  console.log("Hey database is connected!!!");
});

// Load env variables
dotenv.config({ path: "./config/config.env" });

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//middleware
// needed when we want to post a data
app.use(express.urlencoded({ extended: true }));
// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// creating new data or products
app.get("/", (req, res) => {
  res.render("home");
});

// creating new data or products
app.get("/makeplace", async (req, res) => {
  const newPlace = new Place({
    address: "Otto-Röhm straße",
    createdAt: Date.now(),
  });
  await newPlace.save();
  res.send(newPlace);
});

// localhost
app.listen(4005, () => {
  console.log("APP IS LISTENING ON PORT 4005");
});

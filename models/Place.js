//Require Mongoose
const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

const placeSchema = new Schema({
  address: {
    type: String,
    required: [true, "Please add an address"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Place = mongoose.model("Place", placeSchema);

//Export function to create "SomeModel" model class
module.exports = Place;
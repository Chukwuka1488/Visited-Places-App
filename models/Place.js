//Require Mongoose
const mongoose = require("mongoose");
const geoCoder = require("../utils/geocoder");
//Define a schema
const Schema = mongoose.Schema;

const placeSchema = new Schema({
  address: {
    type: String,
    required: [true, "Please add an address"],
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    formattedAddress: String,
    city: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Before saving, convert address to geoCode
placeSchema.pre("save", async function (next) {
  const loc = await geoCoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    city: loc[0].city,
    formattedAddress: loc[0].formattedAddress,
  };

  // Do not save address
  this.address = undefined;
  next();
});

const Place = mongoose.model("Place", placeSchema);
//Export function to create "SomeModel" model class
module.exports = Place;

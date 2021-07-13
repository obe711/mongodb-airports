const mongoose = require("mongoose");


const airportSchema = new mongoose.Schema({
  icao: { type: String },
  iata: { type: String },
  name: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  elevation: { type: Number },
  lat: { type: Number },
  lon: { type: Number },
  tz: { type: String },
}, { timestamps: false });

/** 
 * Auto complete IATA search
 * @return {array} length of 5
*/
airportSchema.statics.iataAutoSearch = function (searchString) {
  return this.find({
    iata: { $ne: '' },
    $or: [
      { city: { $regex: searchString, $options: "i" } },
      { name: { $regex: searchString, $options: "i" } },
      { iata: { $regex: searchString, $options: "i" } },
    ]
  }).sort({ iata: -1, city: -1, name: -1 }).limit(5)
}


/** 
 * Auto complete search
 * @return {array} length of 5
*/
airportSchema.statics.AutoSearch = function (searchString) {
  return this.find({
    $or: [
      { city: { $regex: searchString, $options: "i" } },
      { name: { $regex: searchString, $options: "i" } },
      { iata: { $regex: searchString, $options: "i" } },
    ]
  }).sort({ iata: -1, city: -1, name: -1 }).limit(5)
}


module.exports = airportSchema;
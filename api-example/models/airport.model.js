const mongoose = require("mongoose");
/**
 * Mongoose Schema + Model
 * - example of two differnt static methods
*/
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
    iata: { $ne: '' },  // `iata` must return a value
    $or: [
      { city: { $regex: searchString, $options: "i" } },  // Test city, state & iata paths
      { name: { $regex: searchString, $options: "i" } },  // with the search string
      { iata: { $regex: searchString, $options: "i" } },
    ]
  }).sort({ iata: -1, city: -1, name: -1 })          // Sort desc `iata`,`city` then `name`
    .limit(5)                                        // Limit to the top 5 of sort
    .select({ iata: 1, city: 1, name: 1, _id: 0 })   // Select data properties

  /* Then return to service */
}

/** 
 * Auto complete All Airports search
 * @return {array} length of 5
 * 
 * Same logic, with out the `iata` filter
*/
airportSchema.statics.AutoSearch = function (searchString) {
  return this.find({
    $or: [
      { city: { $regex: searchString, $options: "i" } },
      { name: { $regex: searchString, $options: "i" } },
      { iata: { $regex: searchString, $options: "i" } },
    ]
  }).sort({ iata: -1, city: -1, name: -1 })
    .limit(5)
    .select({ iata: 1, city: 1, name: 1, _id: 0 })
}

const Airport = mongoose.model('Airport', airportSchema);

module.exports = Airport
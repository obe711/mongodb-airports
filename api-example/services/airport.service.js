const { Airport } = require('../models/airport.model');


/** API Service Logic
*/
const findAirportByString = async (searchString) => {

  if (!searchString) return [];

  return await Airport.iataAutoSearch(searchString);

};

module.exports = {

  findAirportByString

};
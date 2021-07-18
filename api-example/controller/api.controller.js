const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const airportService = require('../services/airport.service');


/** API Controller level
*/
const getAirportCodes = catchAsync(async (req, res) => {

  const airports = await airportService.findByString(req.query.search);

  res.status(httpStatus[200]).send(airports);

});

module.exports = {
  getAirportCodes
};
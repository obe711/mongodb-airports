/**
 * 
 * Node JS use examples
 * 
 * 
 */

function iataAutoSearch(DB, searchString) {
  return DB.Airport.iataAutoSearch(searchString)
}

function autoSearch(DB, searchString) {
  return DB.Airport.AutoSearch(searchString)
}

module.exports = {
  iataAutoSearch,
  autoSearch
}



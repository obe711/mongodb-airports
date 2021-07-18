const DBconnect = require("./src/connection/DB");


const iataAutoSearch = (DB, searchString) => {
  return DB.Airport.iataAutoSearch(searchString)
}

const autoSearch = (DB, searchString) => {
  return DB.Airport.AutoSearch(searchString)
}



(async () => {
  /* Mongoose Connection */
  const DB = await DBconnect("mongodb://localhost:27017/tbdoffice");

  /* IATA auto complete search */
  const iataRes = await iataAutoSearch(DB, "dfw");
  console.log(iataRes);

  /* All airports auto complete search */
  const allRes = await autoSearch(DB, "dfw");
  console.log(allRes);
})()

module.exports = {
  iataAutoSearch,
  autoSearch
}


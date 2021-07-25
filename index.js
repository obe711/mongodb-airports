const { iataAutoSearch, autoSearch } = require("./src/index");

const DBconnect = require("./src/connection/DB");

(async () => {
  /* Mongoose Connection */
  const DB = await DBconnect("mongodb://localhost:27017/MyMongoDB");

  /* IATA auto complete search */
  const iataRes = await iataAutoSearch(DB, "dfw");
  console.log(iataRes);

  /* All airports auto complete search */
  const allRes = await autoSearch(DB, "dfw");
  console.log(allRes);

})()




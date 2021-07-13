const DBconnect = require("./connection/DB");
const StreamObject = require('stream-json/streamers/StreamObject');
const fs = require('fs');
const path = require('path');

(async () => {
  DB = await DBconnect("mongodb://localhost:27017/tbdoffice");

  loadData(DB);

})()

/** 
 * Load data to Mongo
 * @param <Mongoose Connection>
*/
const loadData = async (DB) => {
  /* Create path to data */
  const dataPath = path.join(__dirname, "data", "airports.json")

  /* Clear model collection */
  await DB.Airport.deleteMany({});

  /* Create Data stream */
  const pipeline = fs.createReadStream(dataPath)
    .pipe(StreamObject.withParser());

  /* Pipe each data object */
  pipeline.on('data', data => {

    /* Create document from object */
    DB.Airport.create(data.value);
    console.log("saved", data.key);
  });
}


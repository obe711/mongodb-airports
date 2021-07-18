# MongoDB Airport Database + REST API NodeJs Server + React Auto Fill Input Component - FULL STACK

Full stack development that you can use as a foundation to your next big project. This repository contains the data set for every airport and landing strip with an ICAO and/or IATA code in the world. The install will load the data to your locally running instance of Mongo DB. After creating your new airport database go the the “api-example” directory and run yarn install or npm install.

## REST API Server

This will install a scalable REST API Nodejs Server that provides the Mongo Airport data from your new collection to the React component in the client-example directory.

## React

CD into the client-example directory then run yarn install followed by yarn start. Enjoy.

## Mongo DB & Airport Data

A MongoDb database of 28870 entries with basic information about nearly every airport and landing strip in the world. Each entry contains IATA code, airport name, city, two letter ISO country code, elevation above sea level in feet, coordinates in decimal degrees and time zone.

```json
{
    "icao": "KOSH",
    "iata": "OSH",
    "name": "Wittman Regional Airport",
    "city": "Oshkosh",
    "state": "Wisconsin",
    "country": "US",
    "elevation": 808,
    "lat": 43.9844017029,
    "lon": -88.5569992065,
    "tz": "America\/Chicago"
},
```

Time zones sourced from [TimeZoneDB](https://timezonedb.com).

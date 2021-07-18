const express = require('express');
const apiPathRoute = require('./api.route');


/** Main API Router
*/
const router = express.Router();

const defaultRoutes = [
  {
    path: '/api',
    route: apiPathRoute,
  }
];

defaultRoutes.forEach((route) => {

  router.use(route.path, route.route);

});

module.exports = router;
const express = require('express');
const validate = require('../middleware/validate');
const validateApi = require('../validation/api.validation');
const controllerApi = require('../controller/api.controller');


/** API Path Router
*/
const router = express.Router();

router
  .route('/')
  .get(validate(validateApi), controllerApi.getAirportCodes)

module.exports = router;
const Joi = require("joi");


/** API Request Validation
*/
const getApi = Joi.object().keys({
  query: Joi.object().keys({
    search: Joi.string().allow('')
  })
});

module.exports = {

  getApi

}
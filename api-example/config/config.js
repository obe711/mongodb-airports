const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

/* Validate .env
*/
dotenv.config({ path: path.join(__dirname, '../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000), /* Default 3000 to proxy through React Dev */
    MONGODB_URL: Joi.string().required().description('Mongo DB url')
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  console.log(error)
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      autoIndex: true,

      /* Change these for production 
      */
      poolSize: 5, // Default 5 - MAX 10?
      socketTimeoutMS: 45000, // 30000 by Default (30 seconds), you should set this to 2-3x your longest running operation
      family: 4, // Use IP4 instead of trying IP6 first
      serverSelectionTimeoutMS: 30000, // Keep trying to send operations for 5 sec - 30000 by Default (30 seconds) -
      heartbeatFrequencyMS: 30000, // A heartbeat is subject to serverSelectionTimeoutMS
    },
  },
};

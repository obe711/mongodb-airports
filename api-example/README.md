# Airport Code RESTful API Node Server

After creating the Airport Mongo database, simply install and launch this API server to make GET requests to your airport data. This project will allow you to quickly build RESTful APIs using Node.js, Express, and Mongoose.

The app comes with many built-in features, such as unit and integration tests, validation and error handling middleware, a custom logger for development, built in socket server, etc. In development, Nodemon will monitor file changes and refresh the server on every save. In production, I’ve included PM2 with a configuration that allows you to run multiple instances of Node managed as a cluster. This means, instead of your application only running on a single thread, this allows you to take full advantage of a multi-core system and avoid any load handling issues.

## Installation

To install, follow these steps:

Clone the repo:

```bash
git clone --depth 1 https://github.com/obe711/mongodb-airports.git
cd mongodb-airports
```

Install the dependencies:

```bash
yarn install
```

or

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

## Table of Contents

- [Features](#features)
- [Commands](#commands)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Error Handling](#error-handling)
- [Validation](#validation)
- [Authentication](#authentication)
- [Authorization](#authorization)
- [Logging](#logging)
- [Custom Mongoose Plugins](#custom-mongoose-plugins)
- [Linting](#linting)
- [Contributing](#contributing)

## Features

- **ES9**: latest ECMAScript features
- **NoSQL database**: [MongoDB](https://www.mongodb.com) object data modeling using [Mongoose](https://mongoosejs.com)
- **Validation**: request data validation using [Joi](https://github.com/hapijs/joi)
- **Logging**: using [winston](https://github.com/winstonjs/winston) and [morgan](https://github.com/expressjs/morgan)
- **Testing**: unit and integration tests using [Jest](https://jestjs.io)
- **Error handling**: centralized error handling mechanism
- **Process management**: advanced production process management using [PM2](https://pm2.keymetrics.io)
- **Dependency management**: with [Yarn](https://yarnpkg.com)
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv) and [cross-env](https://github.com/kentcdodds/cross-env#readme)
- **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io)
- **Santizing**: sanitize request data against xss and query injection
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- **Compression**: gzip compression with [compression](https://github.com/expressjs/compression)
- **Linting**: with [ESLint](https://eslint.org) and [Prettier](https://prettier.io)
- **Editor config**: consistent editor configuration using [EditorConfig](https://editorconfig.org)

## Commands

Running locally:

```bash
yarn dev
```

Running in production:

```bash
yarn start
```

Testing:

```bash
# run all tests
yarn test

# run all tests in watch mode
yarn test:watch

# run test coverage
yarn coverage
```

Linting:

```bash
# run ESLint
yarn lint

# fix ESLint errors
yarn lint:fix

# run prettier
yarn prettier

# fix prettier errors
yarn prettier:fix
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Port number
PORT=3000

# URL of the Mongo DB
MONGODB_URL=mongodb://127.0.0.1:27017/airportApi

## Project Structure

```

src\
 |--config\ # Environment variables and configuration related things
|--controllers\ # Route controllers (controller layer)
|--middlewares\ # Custom express middlewares
|--models\ # Mongoose models (data layer)
|--routes\ # Routes
|--services\ # Business logic (service layer)
|--utils\ # Utility classes and functions
|--validations\ # Request data validation schemas
|--app.js # Express app
|--index.js # App entry point

````

### API Endpoints

List of available routes:
`GET /api` - search airports

## Error Handling

The app has a centralized error handling mechanism.

Controllers should try to catch the errors and forward them to the error handling middleware (by calling `next(error)`). For convenience, you can also wrap the controller inside the catchAsync utility wrapper, which forwards the error.

```javascript
const catchAsync = require("../utils/catchAsync");

const controller = catchAsync(async (req, res) => {
  // this error will be forwarded to the error handling middleware
  throw new Error("Something wrong happened");
});
````

The error handling middleware sends an error response, which has the following format:

```json
{
  "code": 404,
  "message": "Not found"
}
```

When running in development mode, the error response also contains the error stack.

The app has a utility ApiError class to which you can attach a response code and a message, and then throw it from anywhere (catchAsync will catch it).

For example, if you create a users collection and you are trying to get a user from the DB who is not found, and you want to send a 404 error, the code should look something like:

```javascript
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const User = require("../models/User");

const getUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
};
```

## Validation

Request data is validated using [Joi](https://joi.dev/). Check the [documentation](https://joi.dev/api/) for more details on how to write Joi validation schemas.

The validation schemas are defined in the `src/validations` directory and are used in the routes by providing them as parameters to the `validate` middleware.

```javascript
const express = require("express");
const validate = require("../../middlewares/validate");
const apiValidation = require("../../validations/api.validation");
const apiController = require("../../controllers/api.controller");

const router = express.Router();

router.get("/api", validate(apiValidation.getApi), apiController.getApir);
```

## Logging

Import the logger from `src/config/logger.js`. It is using the [Winston](https://github.com/winstonjs/winston) logging library.

Logging should be done according to the following severity levels (ascending order from most important to least important):

```javascript
const logger = require("<path to src>/config/logger");

logger.error("message"); // level 0
logger.warn("message"); // level 1
logger.info("message"); // level 2
logger.http("message"); // level 3
logger.verbose("message"); // level 4
logger.debug("message"); // level 5
```

In development mode, log messages of all severity levels will be printed to the console.

In production mode, only `info`, `warn`, and `error` logs will be printed to the console.\
It is up to the server (or process manager) to actually read them from the console and store them in log files.\
This app uses pm2 in production mode, which is already configured to store the logs in log files.

Note: API request information (request url, response code, timestamp, etc.) are also automatically logged (using [morgan](https://github.com/expressjs/morgan)).

## Linting

Linting is done using [ESLint](https://eslint.org/) and [Prettier](https://prettier.io).

In this app, ESLint is configured to follow the [Airbnb JavaScript style guide](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base) with some modifications. It also extends [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) to turn off all rules that are unnecessary or might conflict with Prettier.

To modify the ESLint configuration, update the `.eslintrc.json` file. To modify the Prettier configuration, update the `.prettierrc.json` file.

To prevent a certain file or directory from being linted, add it to `.eslintignore` and `.prettierignore`.

To maintain a consistent coding style across different IDEs, the project contains `.editorconfig`

## Contributing

Contributions are more than welcome! Please check out the [contributing guide](CONTRIBUTING.md).

## License

[MIT](LICENSE)

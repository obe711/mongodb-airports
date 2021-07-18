# Airport Auto Fill React Component

Now that you have loaded the airports into your MongoDB database and have a RESTful API server up and running, let’s integrate that data with a simple React component. This component uses what’s called reactive programming. Not because we’re using React, but because we are using a library called RxJS which uses these awesome data types called Observables, They make it easier to compose asynchronous or callback-based code and if you haven’t heard of them yet, it might be because for some reason it’s proposal to ECMA was rejected and it hasn’t became an official part of Javascript yet. But I for one can tell you, they are awesome! You can do so many cool things with them. In this React component we are going to use it to throttle the frequency of api calls to our server, maintain the correct sequence of the “event to api” request behavior and filter our api response from the server.

## Install

To get started run:

```json
yarn install
```

or

```json
npm install
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

import express from 'express';
import compression from 'compression';
import path from 'path';
import cors from 'cors';
import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../reducers/root';
import App from '../components/App';
import template from './template';

const clientAssets = require(KYT.ASSETS_MANIFEST); // eslint-disable-line import/no-dynamic-require
const port = parseInt(KYT.SERVER_PORT, 10);
const app = express();

// Remove annoying Express header addition.
app.disable('x-powered-by');

// Compress (gzip) assets in production.
app.use(compression());
app.use(cors());

// Setup the public directory so that we can server static assets.
app.use(express.static(path.join(process.cwd(), KYT.PUBLIC_DIR)));

app.get('*', (request, response) => {
  // Create a new Redux store instance
  const store = createStore(rootReducer, applyMiddleware(thunk));

  // Render the component to a string
  const html = renderToString(
    <Provider store={store}>
      <App/>
    </Provider>
  );

  // Grab the initial state from our Redux store
  const preloadedState = store.getState();

  response.send(
    template({
      html,
      manifestJSBundle: clientAssets['manifest.js'],
      mainJSBundle: clientAssets['main.js'],
      vendorJSBundle: clientAssets['vendor.js'],
      mainCSSBundle: clientAssets['main.css'],
      preloadedState
    })
  )
});

app.listen(port, () => {
  console.log(`server started on port: ${port}`) // eslint-disable-line no-console
});

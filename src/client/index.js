import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import get from 'lodash.get';

import rootReducer from '../reducers/root';
import App from '../components/App';

const preloadedState = window.PRELOADED_STATE;
delete window.PRELOADED_STATE;

const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk));
const render = get(ReactDOM, module.hot ? 'render' : 'hydrate');

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.querySelector('#root')
);

import React from 'react';
import { render } from 'react-dom';

import store from '../store/store';
import App from '../components/App';

render(
  <App store={store}/>,
  document.querySelector('#root')
);

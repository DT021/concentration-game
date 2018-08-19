import {createStore, combineReducers} from 'redux';

import game from './game';
import options from './options';
import levels from './levels';

const rootReducer = combineReducers({
  game,
  options,
  levels
});

export default createStore(rootReducer);

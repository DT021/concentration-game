import { combineReducers } from 'redux'

import options from './options';
import levels from './levels';


const rootReducer = combineReducers({
  options,
  levels
});

export default rootReducer;


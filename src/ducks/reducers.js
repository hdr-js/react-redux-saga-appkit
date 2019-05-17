import { combineReducers } from 'redux';
import ui from './ui';
import login from './login';

const rootReducer = combineReducers({
  login,
  ui,
});

export default rootReducer;

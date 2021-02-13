import { combineReducers, createStore } from 'redux';
import masuReducer from './Masu/reducer';

const reducers = combineReducers({
  masu: masuReducer,
});

export function getMasu(state) {
  return state.masu;
}

export default createStore(reducers);

import { combineReducers, compose, createStore } from 'redux';
import persistState from 'redux-localstorage';
import masuReducer from './Masu/reducer';

const reducers = combineReducers({
  masu: masuReducer,
});

export function getMasu(state) {
  return state.masu;
}

const enhancers = compose(persistState(null, { key: 'state' }));

export default createStore(reducers, enhancers);

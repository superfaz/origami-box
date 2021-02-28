import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import persistState from 'redux-localstorage';
import thunk from 'redux-thunk';
import masuReducer from './Masu/reducer';
import profileReducer from './Profile/reducer';

const reducers = combineReducers({
  profile: profileReducer,
  masu: masuReducer,
});

export function getMasu(state) {
  return state.masu;
}

export function getProfile(state) {
  return state.profile;
}

const enhancers = compose(
  persistState(['masu'], { key: 'state' }),
  applyMiddleware(thunk));

export default createStore(reducers, enhancers);

import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import persistState from 'redux-localstorage';
import thunk from 'redux-thunk';
import masuReducer from './Masu/reducer';
import profileReducer from './Profile/reducer';
import templatesReducer from './Template/reducer';

const reducers = combineReducers({
  profile: profileReducer,
  masu: masuReducer,
  templates: templatesReducer,
});

export function getMasu(state) {
  return state.masu;
}

export function getProfile(state) {
  return state.profile;
}

export function getTemplates(state) {
  return state.templates;
}

const enhancers = compose(
  persistState(['masu'], { key: 'state' }),
  persistState(['templates'], { key: 'templates' }),
  applyMiddleware(thunk));

export default createStore(reducers, enhancers);

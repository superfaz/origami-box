import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import persistState from 'redux-localstorage';
import thunk from 'redux-thunk';
import profileReducer from './profile';
import templatesReducer from './templates';

const reducers = combineReducers({
  profile: profileReducer,
  templates: templatesReducer,
});

export function getProfile(state) {
  return state.profile;
}

export function getTemplates(state) {
  return state.templates;
}

const enhancers = compose(
  persistState(['templates'], { key: 'templates' }),
  applyMiddleware(thunk));

export default createStore(reducers, enhancers);

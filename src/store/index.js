import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import persistState from "redux-localstorage";
import thunk from "redux-thunk";
import profileReducer from "./profile";
import templatesReducer from "./templates";
import { updateTemplatesVersion } from "./templatesVersion";

const reducers = combineReducers({
  profile: profileReducer,
  templates: templatesReducer,
});

export function getProfile(state) {
  return state.profile;
}

export function getLocalTemplates(state) {
  return state.templates;
}

const enhancers = compose(
  persistState(["templates"], {
    key: "templates",
    deserialize: (data) => updateTemplatesVersion(JSON.parse(data)),
  }),
  applyMiddleware(thunk)
);

export default createStore(reducers, enhancers);

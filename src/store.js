import { combineReducers, createStore } from 'redux';

const initialState = {
};

/* export function changeTheme(theme) {
    if (typeof(theme) == 'object') {
        theme = theme.target.checked ? 'light' : 'dark';
    }

    return ({ type: 'CHANGE_THEME', payload: theme });
}

export function getTheme(store) {
    return store.userPreferences.theme;
}
 */

function userPreferences(state = initialState, action) {
    switch (action.type) {
/*         case 'CHANGE_THEME':
            return {
                ...state,
                theme: action.payload
            };
 */        default:
            return state;
    }
}

const reducers = combineReducers({
    userPreferences,
});

export default createStore(reducers);

import { combineReducers, createStore } from 'redux';

const initialState = {
    theme: 'light'
};

export function changeTheme(theme) {
    return { type: 'CHANGE_THEME', payload: theme };
}

function userPreferences(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_THEME':
            return {
                ...state,
                theme: action.payload
            };
        default:
            return state;
    }
}

const reducers = combineReducers({
    userPreferences,
});

export default createStore(reducers);

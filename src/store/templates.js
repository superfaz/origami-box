const initialState = {};

const initialTemplate = {
  title: '',
  savedate: 0,
  data: {},
};

export function create(key) {
  return {
    type: 'CREATE',
    payload: { key },
  }
}

export function remove(key) {
  return {
    type: 'REMOVE',
    payload: { key },
  }
}

export default function templateReducer(state = initialState, action) {
  switch (action.type) {
    case 'CREATE': {
      const { key } = action.payload;
      return {
        ...state,
        [key]: {
          key,
          ...initialTemplate,
          savedate: new Date().getTime(),
        },
      };
    }

    case 'REMOVE': {
      const { key } = action.payload;
      let result = {
        ...state,
      }

      delete result[key];
      return result;
    }

    default:
      return state;
  }
}

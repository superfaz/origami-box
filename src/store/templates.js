const initialState = {};

const initialTemplate = {
  title: '',
  savedate: 0,
  data: {},
};

export function create(id) {
  return {
    type: 'CREATE',
    payload: { id },
  }
}

export function remove(id) {
  return {
    type: 'REMOVE',
    payload: { id },
  }
}

export default function templateReducer(state = initialState, action) {
  switch (action.type) {
    case 'CREATE': {
      const { id } = action.payload;
      return {
        ...state,
        [id]: {
          id,
          ...initialTemplate,
          savedate: new Date().getTime(),
        },
      };
    }

    case 'REMOVE': {
      const { id } = action.payload;
      let result = {
        ...state,
      }

      delete result[id];
      return result;
    }

    default:
      return state;
  }
}

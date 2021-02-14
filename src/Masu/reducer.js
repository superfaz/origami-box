import { v4 as uuidv4 } from 'uuid';

const initialState = {
  pageFormat: 'A4-p',
  pageLength: 297,
  pageWidth: 210,
  length: '',
  width: '',
  height: '',
  withBackDesign: true,
  withLid: false,
  box: {
    key: 'box',
    background: '#8ED1FC',
    backgroundImage: null,
    texts: {},
  },
  lid: {
    key: 'lid',
    background: '#8ED1FC',
    backgroundImage: null,
    texts: {},
  },
};

export function updateGeneral(name, value) {
  return {
    type: 'UPDATE_GENERAL',
    payload: { name, value },
  };
}

export function updateDetail(detailKey, name, value) {
  return {
    type: 'UPDATE_DETAIL',
    payload: { detailKey, name, value },
  };
}

export function addText(block, text) {
  return {
    type: 'ADD_TEXT',
    payload: { block, text },
  };
}

export function deleteText(block, key) {
  return {
    type: 'DELETE_TEXT',
    payload: { block, key },
  };
}

export default function masuReducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_GENERAL':
      if (action.payload.name === 'pageFormat') {
        const pageLength = action.payload.value === 'A4-p' ? 297 : 210;
        const pageWidth = action.payload.value === 'A4-p' ? 210 : 297;
        return {
          ...state,
          [action.payload.name]: action.payload.value,
          pageLength,
          pageWidth,
        };
      }
      else {
        return {
          ...state,
          [action.payload.name]: action.payload.value,
        };
      }

    case 'UPDATE_DETAIL':
      return {
        ...state,
        [action.payload.detailKey]: {
          ...state[action.payload.detailKey],
          [action.payload.name]: action.payload.value,
        }
      };

    case 'ADD_TEXT':
      let key = uuidv4();
      var result = {
        ...state,
        [action.payload.block]: {
          ...state[action.payload.block],
          texts: {
            ...state[action.payload.block].texts,
            [key]: {
              ...action.payload.text,
              key: key,
            }
          }
        }
      }
      return result;

    case 'DELETE_TEXT':
      var result = {
        ...state,
        [action.payload.block]: {
          ...state[action.payload.block],
          texts: {
            ...state[action.payload.block].texts
          }
        }
      }

      delete result[action.payload.block].texts[action.payload.key];
      return result;

    default:
      return state;
  }
}

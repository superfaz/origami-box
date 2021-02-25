import { v4 as uuidv4 } from 'uuid';

const initialState = {
  pageFormat: 'A4',
  pageLength: 297,
  pageWidth: 210,
  length: '',
  width: '',
  height: '',
  withDesign: true,
  withLid: false,
  base: {
    key: 'base',
    background: '#8ED1FC',
    backgroundImage: null,
    texts: {},
    images: {},
  },
  lid: {
    key: 'lid',
    delta: 2,
    height: '',
    background: '#8ED1FC',
    backgroundImage: null,
    texts: {},
    images: {},
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

export function addOrUpdateText(block, text) {
  return {
    type: 'ADDORUPDATE_TEXT',
    payload: { block, text },
  };
}

export function deleteText(block, key) {
  return {
    type: 'DELETE_TEXT',
    payload: { block, key },
  };
}

export function addOrUpdateImage(block, image) {
  return {
    type: 'ADDORUPDATE_IMAGE',
    payload: { block, image },
  };
}

export function deleteImage(block, key) {
  return {
    type: 'DELETE_IMAGE',
    payload: { block, key },
  };
}

export default function masuReducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_GENERAL': {
      if (action.payload.name === 'pageFormat') {
        const pageLength = action.payload.value === 'A4' ? 297 : 210;
        const pageWidth = action.payload.value === 'A4' ? 210 : 297;
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
    }

    case 'UPDATE_DETAIL': {
      return {
        ...state,
        [action.payload.detailKey]: {
          ...state[action.payload.detailKey],
          [action.payload.name]: action.payload.value,
        }
      };
    }

    case 'ADDORUPDATE_TEXT': {
      let key = action.payload.text.key ?? uuidv4();
      let result = {
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
    }

    case 'DELETE_TEXT': {
      let result = {
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
    }

    case 'ADDORUPDATE_IMAGE': {
      let key = action.payload.image.key ?? uuidv4();
      let result = {
        ...state,
        [action.payload.block]: {
          ...state[action.payload.block],
          images: {
            ...state[action.payload.block].images,
            [key]: {
              ...action.payload.image,
              key: key,
            }
          }
        }
      }
      return result;
    }

    case 'DELETE_IMAGE': {
      let result = {
        ...state,
        [action.payload.block]: {
          ...state[action.payload.block],
          images: {
            ...state[action.payload.block].images
          }
        }
      }

      delete result[action.payload.block].images[action.payload.key];
      return result;
    }

    default:
      return state;
  }
}

import { v4 as uuidv4 } from "uuid";
import { latestVersion } from "./migrations";

const initialState = {};

const initialTemplate = {
  title: "",
  version: latestVersion,
  savedate: 0,
  local: true,
  data: {},
};

const initialMasu = {
  pageFormat: "A4",
  length: "",
  width: "",
  height: "",
  withDesign: true,
  withLid: false,
  base: {
    key: "base",
    background: "#8ED1FC",
    backgroundImage: null,
    texts: {},
    images: {},
  },
  lid: {
    key: "lid",
    delta: 3,
    height: "",
    background: "#8ED1FC",
    backgroundImage: null,
    texts: {},
    images: {},
  },
};

const initialBaggi = {};

const initialData = {
  masu: initialMasu,
  baggi: initialBaggi,
};

export function create(key, templateType) {
  if (templateType !== "masu" && templateType !== "baggi") {
    throw new Error(`template type '${templateType}' is not supported`);
  }

  return {
    type: "CREATE",
    payload: { key, templateType },
  };
}

export function localSave(template) {
  return {
    type: "LOCAL_SAVE",
    payload: { template },
  };
}

export function discard(key) {
  return {
    type: "DISCARD",
    payload: { key },
  };
}

export function removeAll() {
  return {
    type: "REMOVE_ALL",
  };
}

export function updateTemplate(templateKey, field, value) {
  return {
    type: "UPDATE_TEMPLATE",
    payload: { templateKey, field, value },
  };
}

export function updateData(templateKey, field, value) {
  return {
    type: "UPDATE_DATA",
    payload: { templateKey, field, value },
  };
}

export function updateDetail(templateKey, block, field, value) {
  return {
    type: "UPDATE_DETAIL",
    payload: { templateKey, block, field, value },
  };
}

export function addOrUpdateText(templateKey, block, text) {
  return {
    type: "ADDORUPDATE_TEXT",
    payload: { templateKey, block, text },
  };
}

export function deleteText(templateKey, block, key) {
  return {
    type: "DELETE_TEXT",
    payload: { templateKey, block, key },
  };
}

export function addOrUpdateImage(templateKey, block, image) {
  return {
    type: "ADDORUPDATE_IMAGE",
    payload: { templateKey, block, image },
  };
}

export function deleteImage(templateKey, block, key) {
  return {
    type: "DELETE_IMAGE",
    payload: { templateKey, block, key },
  };
}

export default function templateReducer(state = initialState, action) {
  switch (action.type) {
    case "CREATE": {
      const { key, templateType } = action.payload;
      return {
        ...state,
        [key]: {
          key,
          ...initialTemplate,
          type: templateType,
          savedate: new Date().getTime(),
          data: {
            ...initialData[templateType],
          },
        },
      };
    }

    case "LOCAL_SAVE": {
      const { template } = action.payload;
      const key = template.key;
      if (state[key] !== undefined) {
        // Already available on local cache
        return state;
      } else {
        return {
          ...state,
          [key]: template,
        };
      }
    }

    case "DISCARD": {
      const { key } = action.payload;
      let result = {
        ...state,
      };

      delete result[key];
      return result;
    }

    case "REMOVE_ALL": {
      return {};
    }

    case "UPDATE_TEMPLATE": {
      const { templateKey, field, value } = action.payload;
      return {
        ...state,
        [templateKey]: {
          ...state[templateKey],
          savedate: new Date().getTime(),
          local: true,
          [field]: value,
        },
      };
    }

    case "UPDATE_DATA": {
      const { templateKey, field, value } = action.payload;
      return {
        ...state,
        [templateKey]: {
          ...state[templateKey],
          savedate: new Date().getTime(),
          local: true,
          data: {
            ...state[templateKey].data,
            [field]: value,
          },
        },
      };
    }

    case "UPDATE_DETAIL": {
      const { templateKey, block, field, value } = action.payload;
      return {
        ...state,
        [templateKey]: {
          ...state[templateKey],
          savedate: new Date().getTime(),
          local: true,
          data: {
            ...state[templateKey].data,
            [block]: {
              ...state[templateKey].data[block],
              [field]: value,
            },
          },
        },
      };
    }

    case "ADDORUPDATE_TEXT": {
      const { templateKey, block, text } = action.payload;
      let key = text.key ?? uuidv4();
      return {
        ...state,
        [templateKey]: {
          ...state[templateKey],
          savedate: new Date().getTime(),
          local: true,
          data: {
            ...state[templateKey].data,
            [block]: {
              ...state[templateKey].data[block],
              texts: {
                ...state[templateKey].data[block].texts,
                [key]: {
                  ...text,
                  key: key,
                },
              },
            },
          },
        },
      };
    }

    case "DELETE_TEXT": {
      const { templateKey, block, key } = action.payload;
      let result = {
        ...state,
        [templateKey]: {
          ...state[templateKey],
          savedate: new Date().getTime(),
          local: true,
          data: {
            ...state[templateKey].data,
            [block]: {
              ...state[templateKey].data[block],
              texts: {
                ...state[templateKey].data[block].texts,
              },
            },
          },
        },
      };

      delete result[templateKey].data[block].texts[key];
      return result;
    }

    case "ADDORUPDATE_IMAGE": {
      const { templateKey, block, image } = action.payload;
      let key = image.key ?? uuidv4();
      return {
        ...state,
        [templateKey]: {
          ...state[templateKey],
          savedate: new Date().getTime(),
          local: true,
          data: {
            ...state[templateKey].data,
            [block]: {
              ...state[templateKey].data[block],
              images: {
                ...state[templateKey].data[block].images,
                [key]: {
                  ...image,
                  key: key,
                },
              },
            },
          },
        },
      };
    }

    case "DELETE_IMAGE": {
      const { templateKey, block, key } = action.payload;
      let result = {
        ...state,
        [templateKey]: {
          ...state[templateKey],
          savedate: new Date().getTime(),
          local: true,
          data: {
            ...state[templateKey].data,
            [block]: {
              ...state[templateKey].data[block],
              images: {
                ...state[templateKey].data[block].images,
              },
            },
          },
        },
      };

      delete result[templateKey].data[block].images[key];
      return result;
    }

    default:
      return state;
  }
}

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
        texts: [],
    },
    lid: {
        key: 'lid',
        background: '#8ED1FC',
        backgroundImage: null,
        texts: [],
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

export function addText(block, content, face, family) {
    return {
        type: 'ADD_TEXT',
        payload: { block, content, face, family },
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
            var result = {
                ...state,
                [action.payload.block]: {
                    ...state[action.payload.block],
                    texts: [
                        ...state[action.payload.block].texts,
                        {
                            content: action.payload.content,
                            face: action.payload.face,
                            family: action.payload.family,
                        }
                    ]
                }
            }
            return result;

        default:
            return state;
    }
}

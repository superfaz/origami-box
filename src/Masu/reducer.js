const initialState = {
    pageFormat: 'A4-p',
    pageLength: 297,
    pageWidth: 210,
    length: 60,
    width: 30,
    height: 10,
    withLid: false,
    box: {
        key: 'box',
        frontText: '',
        background: '#8ED1FC',
    },
    lid: {
        key: 'lid',
        frontText: '',
        background: '#8ED1FC',
    },
};

export function updateGeneral(name, value) {
    return {
        type: 'UPDATE_GENERAL',
        payload: {name, value},
    };
}

export function updateDetail(detailKey, name, value) {
    return {
        type: 'UPDATE_DETAIL',
        payload: {detailKey, name, value},
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
                [action.payload.detailKey] : {
                    ...state[action.payload.detailKey],
                    [action.payload.name]: action.payload.value,
                }
            };
        default:
            return state;
    }
}

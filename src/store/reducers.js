import actionMaps from "./mappers";

const initialState = {
    token: localStorage.getItem("token") || null,
    result: null,
    visits: null,
    merchant: null,
    message: null,
    variant: null,
    isSnackBarOpen: false
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case actionMaps.ADD_TOKEN:
            return Object.assign({}, state, {
                token: action.payload
            });
        case actionMaps.SET_RESULT:
            return Object.assign({}, state, {
                result: action.payload
            });
        case actionMaps.SET_VISITS:
            return Object.assign({}, state, {
                visits: action.payload
            });
        case actionMaps.SET_MERCHANT:
            return Object.assign({}, state, {
                merchant: action.payload
            });
        case actionMaps.SET_SNACKBAR:
            return Object.assign({}, state, {
                isSnackBarOpen: action.payload.isSnackBarOpen,
                message: action.payload.message,
                variant: action.payload.variant
            });

        default:
            return state;
    }
}

export default rootReducer;

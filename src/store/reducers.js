import actionMaps from "./mappers";

const initialState = {
    token: localStorage.getItem("token") || null,
    result: null,
    visits: null
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

        default:
            return state;
    }
}

export default rootReducer;

import actionMaps from "../mappers";

const initialState = {
    token: localStorage.getItem("token"),
    merchants: [],
    maxCount: null,
    page: 1,
    edit: {}
};

function merchantsReducer(state = initialState, action) {
    switch (action.type) {
        case actionMaps.ADD_TOKEN:
            return Object.assign({}, state, {
                token: action.payload
            });

        case actionMaps.ADD_MERCHANTS:
            let reduced = [];
            if (state.merchants.length === 0) reduced = action.payload;
            else {
                action.payload.forEach(el => {
                    const exists = state.merchants.filter(
                        each => each._id === el._id
                    );
                    if (exists.length === 0) reduced.push(el);
                });
            }
            return Object.assign({}, state, {
                merchants: [...state.merchants, ...reduced]
            });

        case actionMaps.REMOVE_MERCHANT:
            return Object.assign({}, state, {
                merchants: state.merchants.filter(
                    each => each._id !== action.payload
                )
            });

        case actionMaps.EDIT_MERCHANT:
            return Object.assign({}, state, {
                merchants: [
                    ...state.merchants.filter(
                        each => each._id !== action.payload._id
                    ),
                    action.payload
                ]
            });

        case actionMaps.SET_MAXCOUNT:
            return Object.assign({}, state, {
                maxCount: action.payload
            });

        case actionMaps.SET_PAGE:
            return Object.assign({}, state, {
                page: action.payload
            });

        case actionMaps.SET_EDIT:
            return Object.assign({}, state, {
                edit: action.payload
            });

        default:
            return state;
    }
}

export default merchantsReducer;

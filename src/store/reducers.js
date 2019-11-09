const initialState = {
    token: localStorage.getItem("token"),
    merchants: [],
    users: [],
    offers: [],
    maxCount: null,
    page: 1
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_TOKEN":
            return Object.assign({}, state, {
                token: action.payload
            });
        case "ADD_MERCHANTS":
            let reduced = [];
            if (state.merchants.length === 0) reduced = action.payload;
            else
                action.payload.forEach(el => {
                    if (
                        state.merchants.length > 0 &&
                        state.merchants.filter(each => each._id === el._id)
                    )
                        reduced.push(el);
                });
            return Object.assign({}, state, {
                merchants: state.merchants.concat(reduced)
            });
        case "SET_MAXCOUNT":
            return Object.assign({}, state, {
                maxCount: action.payload
            });
        case "SET_PAGE":
            return Object.assign({}, state, {
                page: action.payload
            });
        default:
            return state;
    }
}

export default rootReducer;

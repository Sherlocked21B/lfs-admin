const initialState = {
    token: localStorage.getItem("token"),
    merchants: [],
    users: [],
    offers: [],
    maxCount: null,
    page: 1,
    isEditDialogOpen: false,
    isAddDialogOpen: false,
    isSnackBarOpen: false,
    edit: {},
    message: ""
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
        case "REMOVE_MERCHANT":
            const filtered = state.merchants.filter(each => {
                return each._id !== action.payload;
            });
            return Object.assign({}, state, {
                merchants: filtered
            });
        case "SET_MAXCOUNT":
            return Object.assign({}, state, {
                maxCount: action.payload
            });
        case "SET_PAGE":
            return Object.assign({}, state, {
                page: action.payload
            });
        case "TOGGLE_ADD_DIALOG":
            return Object.assign({}, state, {
                isAddDialogOpen: action.payload
            });
        case "TOGGLE_EDIT_DIALOG":
            return Object.assign({}, state, {
                isEditDialogOpen: action.payload
            });
        case "TOGGLE_SNACKBAR":
            return Object.assign({}, state, {
                isSnackBarOpen: action.payload
            });
        case "SET_EDIT":
            return Object.assign({}, state, {
                edit: action.payload
            });
        case "SET_MESSAGE":
            return Object.assign({}, state, {
                message: action.payload
            });
        default:
            return state;
    }
}

export default rootReducer;

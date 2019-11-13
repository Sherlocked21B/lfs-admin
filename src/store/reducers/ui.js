import actionMaps from "../mappers";

const initialState = {
    isEditDialogOpen: false,
    isAddDialogOpen: false,
    isSnackBarOpen: false,
    message: "",
    variant: "success"
};

function uiReducer(state = initialState, action) {
    switch (action.type) {
        case actionMaps.TOGGLE_ADD_DIALOG:
            return Object.assign({}, state, {
                isAddDialogOpen: action.payload
            });

        case actionMaps.TOGGLE_EDIT_DIALOG:
            return Object.assign({}, state, {
                isEditDialogOpen: action.payload
            });

        case actionMaps.TOGGLE_SNACKBAR:
            return Object.assign({}, state, {
                isSnackBarOpen: action.payload.open,
                message: action.payload.message || state.message,
                variant: action.payload.variant || state.variant
            });
        default:
            return state;
    }
}

export default uiReducer;

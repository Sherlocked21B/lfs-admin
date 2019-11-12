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
        isSnackBarOpen: action.payload
      });

    case actionMaps.SET_MESSAGE:
      return Object.assign({}, state, {
        message: action.payload
      });
    case actionMaps.SET_VARIANT:
      return Object.assign({}, state, {
        variant: action.payload
      });
    default:
      return state;
  }
}

export default uiReducer;

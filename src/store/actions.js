export function addToken(payload) {
    return Object.freeze({ type: "ADD_TOKEN", payload });
}

export function addMerchants(payload) {
    return Object.freeze({ type: "ADD_MERCHANTS", payload });
}

export function addMaxCount(payload) {
    return Object.freeze({ type: "SET_MAXCOUNT", payload });
}

export function setPage(payload) {
    return Object.freeze({ type: "SET_PAGE", payload });
}

export function removeMerchant(payload) {
    return Object.freeze({ type: "REMOVE_MERCHANT", payload });
}

export function toggleSnackBar(payload) {
    return Object.freeze({ type: "TOGGLE_SNACKBAR", payload });
}

export function toggleAddDialog(payload) {
    return Object.freeze({ type: "TOGGLE_ADD_DIALOG", payload });
}

export function toggleEditDialog(payload) {
    return Object.freeze({ type: "TOGGLE_EDIT_DIALOG", payload });
}

export function setEdit(payload) {
    return Object.freeze({ type: "SET_EDIT", payload });
}

export function setMessage(payload) {
    return Object.freeze({ type: "SET_MESSAGE", payload });
}

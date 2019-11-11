import actionMaps from "./mappers";

export function addToken(payload) {
    return Object.freeze({ type: actionMaps.ADD_TOKEN, payload });
}

export function addMerchants(payload) {
    return Object.freeze({ type: actionMaps.ADD_MERCHANTS, payload });
}

export function addMaxCount(payload) {
    return Object.freeze({ type: actionMaps.SET_MAXCOUNT, payload });
}

export function setPage(payload) {
    return Object.freeze({ type: actionMaps.SET_PAGE, payload });
}

export function removeMerchant(payload) {
    return Object.freeze({ type: actionMaps.REMOVE_MERCHANT, payload });
}

export function toggleSnackBar(payload) {
    return Object.freeze({ type: actionMaps.TOGGLE_SNACKBAR, payload });
}

export function toggleAddDialog(payload) {
    return Object.freeze({ type: actionMaps.TOGGLE_ADD_DIALOG, payload });
}

export function toggleEditDialog(payload) {
    return Object.freeze({ type: actionMaps.TOGGLE_EDIT_DIALOG, payload });
}

export function setEdit(payload) {
    return Object.freeze({ type: actionMaps.SET_EDIT, payload });
}

export function setMessage(payload) {
    return Object.freeze({ type: actionMaps.SET_MESSAGE, payload });
}

export function addCards(payload) {
    return Object.freeze({ type: actionMaps.ADD_CARDS, payload });
}

export function setCardPage(payload) {
    return Object.freeze({ type: actionMaps.SET_CARD_PAGE, payload });
}

export function removeCard(payload) {
    return Object.freeze({ type: actionMaps.REMOVE_CARD, payload });
}

export function addCardMaxCount(payload) {
    return Object.freeze({ type: actionMaps.SET_CARDS_MAXCOUNT, payload });
}
